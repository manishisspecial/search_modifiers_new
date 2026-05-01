import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const TrustBadgeUpdateSchema = z.object({
  label: z.string().min(1),
  subtitle: z.string().min(1),
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
    const badge = await prisma.trustBadge.findUnique({
      where: { id },
    });

    if (!badge) {
      return NextResponse.json(
        { error: "Trust badge not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(badge);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch trust badge" },
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
    const validatedData = TrustBadgeUpdateSchema.parse(body);

    const badge = await prisma.trustBadge.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath("/");
    return NextResponse.json(badge);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update trust badge" },
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
    await prisma.trustBadge.delete({ where: { id } });

    revalidatePath("/");
    return NextResponse.json({ message: "Trust badge deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete trust badge" },
      { status: 500 }
    );
  }
}
