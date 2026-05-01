import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const UpdateSchema = z.object({
  q: z.string().min(1),
  a: z.string().min(1),
  order: z.number().optional().default(0),
});

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const item = await prisma.faqItem.findUnique({ where: { id } });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const body = await req.json();
    const data = UpdateSchema.parse(body);
    const item = await prisma.faqItem.update({ where: { id }, data });
    revalidatePath("/faq");
    return NextResponse.json(item);
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.errors }, { status: 400 });
    console.error(error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    await prisma.faqItem.update({ where: { id }, data: { deletedAt: new Date() } });
    revalidatePath("/faq");
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
