import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

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
    const versions = await prisma.blogPostVersion.findMany({
      where: { blogPostId: id },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });

    return NextResponse.json(versions);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch versions" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { versionId } = await req.json();

    const version = await prisma.blogPostVersion.findUnique({
      where: { id: versionId },
    });

    if (!version || version.blogPostId !== id) {
      return NextResponse.json({ error: "Version not found" }, { status: 404 });
    }

    const snapshot = version.snapshot as Record<string, unknown>;

    // Save current state as a new version before reverting
    const current = await prisma.blogPost.findUnique({ where: { id } });
    if (current) {
      await prisma.blogPostVersion.create({
        data: {
          blogPostId: id,
          title: current.title,
          content: current.content,
          snapshot: {
            slug: current.slug,
            title: current.title,
            excerpt: current.excerpt,
            content: current.content,
            author: current.author,
            date: current.date,
            readTime: current.readTime,
            metaTitle: current.metaTitle,
            metaDescription: current.metaDescription,
            status: current.status,
          },
        },
      });
    }

    // Revert to the selected version
    await prisma.blogPost.update({
      where: { id },
      data: {
        title: (snapshot.title as string) || version.title,
        content: (snapshot.content as string) || version.content,
        excerpt: (snapshot.excerpt as string) || undefined,
        slug: (snapshot.slug as string) || undefined,
        author: (snapshot.author as string) || undefined,
        date: (snapshot.date as string) || undefined,
        readTime: (snapshot.readTime as string) || undefined,
      },
    });

    return NextResponse.json({ message: "Reverted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to revert version" },
      { status: 500 }
    );
  }
}
