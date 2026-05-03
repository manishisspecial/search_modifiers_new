import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { z } from "zod";

const RedirectUpdateSchema = z.object({
  fromPath: z.string().min(1).startsWith("/").optional(),
  toPath: z.string().min(1).optional(),
  type: z
    .number()
    .refine((v) => [301, 302, 307].includes(v))
    .optional(),
  isActive: z.boolean().optional(),
});

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
    const data = RedirectUpdateSchema.parse(body);

    const redirect = await prisma.redirect.update({
      where: { id },
      data,
    });
    return NextResponse.json(redirect);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update redirect" },
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
    await prisma.redirect.delete({ where: { id } });
    return NextResponse.json({ message: "Redirect deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete redirect" },
      { status: 500 }
    );
  }
}
