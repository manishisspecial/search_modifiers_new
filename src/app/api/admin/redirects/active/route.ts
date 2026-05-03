import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const redirects = await prisma.redirect.findMany({
      where: { isActive: true },
      select: { fromPath: true, toPath: true, type: true },
    });
    return NextResponse.json(redirects);
  } catch (error) {
    console.error(error);
    return NextResponse.json([]);
  }
}
