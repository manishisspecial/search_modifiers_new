import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { z } from "zod";

const UpdateSchema = z.object({
  name: z.string().min(1),
  type: z.enum(["COUNTRY", "CITY"]).default("CITY"),
  slug: z.string().min(1),
  country: z.string().optional().nullable(),
});

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const body = await req.json();
    const data = UpdateSchema.parse(body);
    const item = await prisma.managedLocation.update({
      where: { id },
      data: { name: data.name, type: data.type, slug: data.slug, country: data.country || null },
    });
    return NextResponse.json(item);
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.issues }, { status: 400 });
    console.error(error);
    return NextResponse.json({ error: "Failed to update managed location" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    await prisma.managedLocation.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete managed location" }, { status: 500 });
  }
}
