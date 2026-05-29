import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const PageContentSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  fields: z.record(z.unknown()),
});

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const items = await prisma.pageContent.findMany({
      orderBy: { slug: "asc" },
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
    const data = PageContentSchema.parse(body);
    const item = await prisma.pageContent.create({ data });
    revalidatePath("/");
    if (data.slug === "about-hero") revalidatePath("/about");
    if (data.slug === "home") revalidatePath("/");
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
