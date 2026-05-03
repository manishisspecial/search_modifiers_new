import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const BlogPostUpdateSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  date: z.string(),
  author: z.string(),
  readTime: z.string().optional().nullable(),
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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const validated = BlogPostUpdateSchema.parse(body);

    // Save current version before updating
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (existing) {
      await prisma.blogPostVersion.create({
        data: {
          blogPostId: id,
          title: existing.title,
          content: existing.content,
          snapshot: {
            slug: existing.slug,
            title: existing.title,
            excerpt: existing.excerpt,
            content: existing.content,
            author: existing.author,
            date: existing.date,
            readTime: existing.readTime,
            metaTitle: existing.metaTitle,
            metaDescription: existing.metaDescription,
            status: existing.status,
          },
        },
      });
    }

    const readTime = validated.readTime || calculateReadTime(validated.content);
    const wasPublished = existing?.status === "PUBLISHED";
    const isNowPublished = validated.status === "PUBLISHED";
    const publishedAt = isNowPublished && !wasPublished
      ? new Date()
      : existing?.publishedAt || null;

    const post = await prisma.blogPost.update({
      where: { id },
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
    revalidatePath(`/blog/${validated.slug}`);
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.blogPost.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    revalidatePath("/blog");
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ message: "Blog post deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
