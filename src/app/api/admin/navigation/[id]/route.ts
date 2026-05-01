import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const NavigationItemUpdateSchema = z.object({
  category: z.string().min(1),
  label: z.string().min(1),
  href: z.string().min(1),
  order: z.number().optional().default(0),
});

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
    const item = await prisma.navigationItem.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json(
        { error: "Navigation item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch navigation item" },
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
    const validatedData = NavigationItemUpdateSchema.parse(body);

    const item = await prisma.navigationItem.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath("/");
    return NextResponse.json(item);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update navigation item" },
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
    await prisma.navigationItem.delete({ where: { id } });

    revalidatePath("/");
    return NextResponse.json({ message: "Navigation item deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete navigation item" },
      { status: 500 }
    );
  }
}
