import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const FooterRatingSchema = z.object({
  platform: z.string().min(1),
  score: z.string().min(1),
  maxScore: z.string().optional(),
  href: z.string().min(1),
});

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const ratings = await prisma.footerRating.findMany();

    return NextResponse.json(ratings);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch footer ratings" },
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
    const validatedData = FooterRatingSchema.parse(body);

    const rating = await prisma.footerRating.upsert({
      where: { platform: validatedData.platform },
      update: {
        score: validatedData.score,
        href: validatedData.href,
      },
      create: validatedData,
    });

    revalidatePath("/");
    return NextResponse.json(rating, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create footer rating" },
      { status: 500 }
    );
  }
}
