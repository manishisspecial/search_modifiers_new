import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { z } from "zod";

const ServiceUpdateSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  heroTitle: z.string().optional(),
  shortDescription: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  heroEyebrow: z.string().min(1),
  intro: z.string().min(1),
  explanation: z.string().min(1),
  detailMarkdown: z.string().optional(),
  benefits: z.array(
    z.object({
      id: z.string().optional(),
      title: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),
  process: z.array(
    z.object({
      id: z.string().optional(),
      step: z.string(),
      title: z.string(),
      description: z.string(),
    })
  ),
  faqs: z.array(
    z.object({
      id: z.string().optional(),
      q: z.string(),
      a: z.string(),
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
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        benefits: { orderBy: { order: "asc" } },
        process: { orderBy: { order: "asc" } },
        faqs: { orderBy: { order: "asc" } },
      },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch service" },
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
    const validatedData = ServiceUpdateSchema.parse(body);

    // Delete old related records
    await Promise.all([
      prisma.serviceBenefit.deleteMany({ where: { serviceId: id } }),
      prisma.serviceProcess.deleteMany({ where: { serviceId: id } }),
      prisma.serviceFAQ.deleteMany({ where: { serviceId: id } }),
    ]);

    const service = await prisma.service.update({
      where: { id },
      data: {
        slug: validatedData.slug,
        title: validatedData.title,
        heroTitle: validatedData.heroTitle,
        shortDescription: validatedData.shortDescription,
        metaTitle: validatedData.metaTitle,
        metaDescription: validatedData.metaDescription,
        heroEyebrow: validatedData.heroEyebrow,
        intro: validatedData.intro,
        explanation: validatedData.explanation,
        detailMarkdown: validatedData.detailMarkdown,
        benefits: {
          createMany: {
            data: validatedData.benefits.map((benefit, index) => ({
              title: benefit.title,
              description: benefit.description,
              icon: benefit.icon,
              order: index,
            })),
          },
        },
        process: {
          createMany: {
            data: validatedData.process.map((step, index) => ({
              step: step.step,
              title: step.title,
              description: step.description,
              order: index,
            })),
          },
        },
        faqs: {
          createMany: {
            data: validatedData.faqs.map((faq, index) => ({
              q: faq.q,
              a: faq.a,
              order: index,
            })),
          },
        },
      },
      include: {
        benefits: true,
        process: true,
        faqs: true,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update service" },
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
    // Soft delete
    await prisma.service.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({ message: "Service deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
