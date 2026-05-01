import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const TrustBadgeSchema = z.object({
  label: z.string().min(1),
  subtitle: z.string().min(1),
  href: z.string().min(1),
  order: z.number().optional().default(0),
});

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const badges = await prisma.trustBadge.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(badges);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch trust badges" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = TrustBadgeSchema.parse(body);

    const badge = await prisma.trustBadge.create({
      data: validatedData,
    });

    revalidatePath("/");
    return NextResponse.json(badge, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create trust badge" },
      { status: 500 }
    );
  }
}
