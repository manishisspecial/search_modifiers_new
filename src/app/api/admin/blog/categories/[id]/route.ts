import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { z } from "zod";

const UpdateCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  parentId: z.string().optional().nullable(),
  order: z.number().default(0),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const category = await prisma.blogCategory.findUnique({
      where: { id },
      include: { children: true, parent: true },
    });
    if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();
    const data = UpdateCategorySchema.parse(body);

    // Prevent setting a category as its own parent or creating cycles
    if (data.parentId === id) {
      return NextResponse.json({ error: "A category cannot be its own parent" }, { status: 400 });
    }

    const category = await prisma.blogCategory.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        parentId: data.parentId || null,
        order: data.order,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    // Reassign child categories to the parent being deleted (promote children)
    const category = await prisma.blogCategory.findUnique({
      where: { id },
      select: { parentId: true },
    });

    if (category) {
      await prisma.blogCategory.updateMany({
        where: { parentId: id },
        data: { parentId: category.parentId },
      });
      // Unassign posts from this category
      await prisma.blogPost.updateMany({
        where: { categoryId: id },
        data: { categoryId: null },
      });
    }

    await prisma.blogCategory.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
