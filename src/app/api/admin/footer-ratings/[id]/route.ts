import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const FooterRatingUpdateSchema = z.object({
  platform: z.string().min(1),
  score: z.string().min(1),
  maxScore: z.string().optional(),
  href: z.string().min(1),
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
    const rating = await prisma.footerRating.findUnique({
      where: { id },
    });

    if (!rating) {
      return NextResponse.json(
        { error: "Footer rating not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rating);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch footer rating" },
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
    const validatedData = FooterRatingUpdateSchema.parse(body);

    const rating = await prisma.footerRating.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath("/");
    return NextResponse.json(rating);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update footer rating" },
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
    await prisma.footerRating.delete({ where: { id } });

    revalidatePath("/");
    return NextResponse.json({ message: "Footer rating deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete footer rating" },
      { status: 500 }
    );
  }
}
