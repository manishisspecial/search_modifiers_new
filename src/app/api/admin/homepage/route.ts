import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { defaultHomeContent } from "@/lib/home-content";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const record = await prisma.pageContent.findUnique({ where: { slug: "home" } });
    return NextResponse.json(record?.fields ?? defaultHomeContent);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch homepage content" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const record = await prisma.pageContent.upsert({
      where: { slug: "home" },
      update: { fields: body, title: "Homepage" },
      create: { slug: "home", title: "Homepage", fields: body },
    });
    revalidatePath("/");
    return NextResponse.json(record);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save homepage content" }, { status: 500 });
  }
}
