import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const StaticPageSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  metaDescription: z.string().optional(),
  content: z.string().min(1),
});

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const pages = await prisma.staticPage.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(pages);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch static pages" },
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
    const validatedData = StaticPageSchema.parse(body);

    const page = await prisma.staticPage.create({
      data: {
        slug: validatedData.slug,
        title: validatedData.title,
        metaDescription: validatedData.metaDescription || null,
        content: validatedData.content,
      },
    });

    revalidatePath(`/p/${validatedData.slug}`);
    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create static page" },
      { status: 500 }
    );
  }
}
