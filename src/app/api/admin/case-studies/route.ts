import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { z } from "zod";

const CaseStudySchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  industry: z.string(),
  result: z.string(),
  summary: z.string(),
  content: z.string(),
  metrics: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
});

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const studies = await prisma.caseStudy.findMany({
      where: { deletedAt: null },
      include: { metrics: { orderBy: { order: "asc" } } },
    });

    return NextResponse.json(studies);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch case studies" },
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
    const validatedData = CaseStudySchema.parse(body);

    const study = await prisma.caseStudy.create({
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

    return NextResponse.json(study, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create case study" },
      { status: 500 }
    );
  }
}
