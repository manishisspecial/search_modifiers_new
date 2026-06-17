import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { z } from "zod";

const ManagedLocationSchema = z.object({
  name: z.string().min(1),
  type: z.enum(["COUNTRY", "CITY"]).default("CITY"),
  slug: z.string().min(1),
  country: z.string().optional().nullable(),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const type = req.nextUrl.searchParams.get("type");
    const items = await prisma.managedLocation.findMany({
      where: type === "COUNTRY" || type === "CITY" ? { type } : undefined,
      orderBy: [{ type: "asc" }, { name: "asc" }],
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch managed locations" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const data = ManagedLocationSchema.parse(body);
    const item = await prisma.managedLocation.create({
      data: { name: data.name, type: data.type, slug: data.slug, country: data.country || null },
    });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to create managed location" }, { status: 500 });
  }
}
