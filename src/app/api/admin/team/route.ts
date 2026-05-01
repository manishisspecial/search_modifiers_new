import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const TeamMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1),
  image: z.string().optional(),
  linkedinUrl: z.string().optional(),
  order: z.number().optional().default(0),
});

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const items = await prisma.teamMember.findMany({
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
    const data = TeamMemberSchema.parse(body);
    const item = await prisma.teamMember.create({ data });
    revalidatePath("/team");
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
