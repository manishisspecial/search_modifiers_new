import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const ReorderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string().min(1),
      order: z.number(),
    })
  ),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { items } = ReorderSchema.parse(body);

    await prisma.$transaction(
      items.map((item) =>
        prisma.navigationItem.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );

    revalidatePath("/");
    return NextResponse.json({ message: "Reordered" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to reorder" }, { status: 500 });
  }
}
