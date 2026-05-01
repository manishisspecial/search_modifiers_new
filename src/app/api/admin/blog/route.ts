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
  readTime: z.string(),
  category: z.string(),
});

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await prisma.blogPost.findMany({
      where: { deletedAt: null },
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
    const validatedData = BlogPostSchema.parse(body);

    const post = await prisma.blogPost.create({
      data: validatedData,
    });

    revalidatePath("/blog");
    revalidatePath("/");
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
