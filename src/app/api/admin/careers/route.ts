import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const CareerRoleSchema = z.object({
  title: z.string().min(1),
  type: z.string().min(1),
  description: z.string().min(1),
  location: z.string().optional().nullable(),
  applyUrl: z.string().optional().nullable(),
  isOpen: z.boolean().optional().default(true),
  order: z.number().optional().default(0),
});

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const items = await prisma.careerRole.findMany({
      where: { deletedAt: null },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const data = CareerRoleSchema.parse(body);
    const item = await prisma.careerRole.create({ data });
    revalidatePath("/careers");
    revalidatePath("/");
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
