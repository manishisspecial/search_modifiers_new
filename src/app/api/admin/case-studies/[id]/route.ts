import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const CaseStudyUpdateSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  industry: z.string(),
  result: z.string(),
  summary: z.string(),
  content: z.string(),
  metrics: z.array(
    z.object({
      id: z.string().optional(),
      label: z.string(),
      value: z.string(),
    })
  ),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const study = await prisma.caseStudy.findUnique({
      where: { id },
      include: { metrics: { orderBy: { order: "asc" } } },
    });

    if (!study) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(study);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch case study" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const validatedData = CaseStudyUpdateSchema.parse(body);

    await prisma.caseStudyMetric.deleteMany({
      where: { caseStudyId: id },
    });

    const study = await prisma.caseStudy.update({
      where: { id },
      data: {
        slug: validatedData.slug,
        title: validatedData.title,
        industry: validatedData.industry,
        result: validatedData.result,
        summary: validatedData.summary,
        content: validatedData.content,
        metrics: {
          createMany: {
            data: validatedData.metrics.map((metric, index) => ({
              label: metric.label,
              value: metric.value,
              order: index,
            })),
          },
        },
      },
      include: { metrics: true },
    });

    revalidatePath("/case-studies");
    revalidatePath(`/case-studies/${validatedData.slug}`);
    revalidatePath("/");
    return NextResponse.json(study);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update case study" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.caseStudy.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    revalidatePath("/case-studies");
    revalidatePath("/");
    return NextResponse.json({ message: "Case study deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete case study" },
      { status: 500 }
    );
  }
}
