import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const posts = await prisma.blogPost.findMany({
      where: { deletedAt: null },
      select: { tags: true },
    });

    const tagSet = new Set<string>();
    for (const post of posts) {
      const tags = post.tags as string[];
      if (Array.isArray(tags)) {
        tags.forEach((t) => t && tagSet.add(t));
      }
    }

    return NextResponse.json(Array.from(tagSet).sort());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
  }
}
