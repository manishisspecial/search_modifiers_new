import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const BlogPostSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  date: z.string(),
  author: z.string(),
  readTime: z.string().optional(),
  categoryId: z.string().optional().nullable(),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  metaTags: z.array(z.string()).default([]),
  canonicalUrl: z.string().optional().nullable(),
  customSchema: z.string().optional().nullable(),
  featuredImage: z.string().optional().nullable(),
  featuredImageAlt: z.string().optional().nullable(),
  primaryKeyword: z.string().optional().nullable(),
  status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED"]).default("DRAFT"),
  scheduledAt: z.string().optional().nullable(),
  noindex: z.boolean().default(false),
  nofollow: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

function calculateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await prisma.blogPost.findMany({
      where: { deletedAt: null },
      include: { category: true },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = BlogPostSchema.parse(body);

    const readTime = validated.readTime || calculateReadTime(validated.content);
    const publishedAt = validated.status === "PUBLISHED" ? new Date() : null;

    const post = await prisma.blogPost.create({
      data: {
        slug: validated.slug,
        title: validated.title,
        excerpt: validated.excerpt,
        content: validated.content,
        date: validated.date,
        author: validated.author,
        readTime,
        categoryId: validated.categoryId || null,
        metaTitle: validated.metaTitle || null,
        metaDescription: validated.metaDescription || null,
        metaTags: validated.metaTags,
        canonicalUrl: validated.canonicalUrl || null,
        customSchema: validated.customSchema || null,
        featuredImage: validated.featuredImage || null,
        featuredImageAlt: validated.featuredImageAlt || null,
        primaryKeyword: validated.primaryKeyword || null,
        status: validated.status,
        scheduledAt: validated.scheduledAt ? new Date(validated.scheduledAt) : null,
        publishedAt,
        noindex: validated.noindex,
        nofollow: validated.nofollow,
        tags: validated.tags,
      },
    });

    revalidatePath("/blog");
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
