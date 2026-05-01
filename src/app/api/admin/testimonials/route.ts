import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const TestimonialSchema = z.object({
  quote: z.string().min(1),
  name: z.string().min(1),
  role: z.string(),
  company: z.string(),
  order: z.number().optional().default(0),
});

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { deletedAt: null },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
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
    const validatedData = TestimonialSchema.parse(body);

    const testimonial = await prisma.testimonial.create({
      data: validatedData,
    });

    revalidatePath("/testimonials");
    revalidatePath("/");
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
