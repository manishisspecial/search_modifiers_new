import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const NavigationItemSchema = z.object({
  category: z.string().min(1),
  label: z.string().min(1),
  href: z.string().min(1),
  order: z.number().optional().default(0),
});

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await prisma.navigationItem.findMany({
      orderBy: [{ category: "asc" }, { order: "asc" }],
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch navigation items" },
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
    const validatedData = NavigationItemSchema.parse(body);

    const item = await prisma.navigationItem.create({
      data: validatedData,
    });

    revalidatePath("/");
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create navigation item" },
      { status: 500 }
    );
  }
}
