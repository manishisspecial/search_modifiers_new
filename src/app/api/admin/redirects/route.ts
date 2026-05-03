import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { z } from "zod";

const RedirectSchema = z.object({
  fromPath: z.string().min(1).startsWith("/"),
  toPath: z.string().min(1),
  type: z.number().refine((v) => [301, 302, 307].includes(v)),
  isActive: z.boolean().default(true),
});

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const redirects = await prisma.redirect.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(redirects);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch redirects" },
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
    const data = RedirectSchema.parse(body);

    const redirect = await prisma.redirect.create({ data });
    return NextResponse.json(redirect, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create redirect" },
      { status: 500 }
    );
  }
}
