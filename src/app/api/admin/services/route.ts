import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const ServiceSchema = z.object({
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
  pill: z.string().optional(),
  related: z.array(z.string()).optional().default([]),
  proof: z.array(z.object({ value: z.string(), label: z.string() })).optional().default([]),
  dashMeta: z.record(z.unknown()).optional(),
  benefits: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),
  process: z.array(
    z.object({
      step: z.string(),
      title: z.string(),
      description: z.string(),
    })
  ),
  faqs: z.array(
    z.object({
      q: z.string(),
      a: z.string(),
    })
  ),
});

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const services = await prisma.service.findMany({
      where: { deletedAt: null },
      include: {
        benefits: { orderBy: { order: "asc" } },
        process: { orderBy: { order: "asc" } },
        faqs: { orderBy: { order: "asc" } },
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
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
    const validatedData = ServiceSchema.parse(body);

    const service = await prisma.service.create({
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
        pill: validatedData.pill,
        related: validatedData.related,
        proof: validatedData.proof,
        dashMeta: validatedData.dashMeta ?? undefined,
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

    revalidatePath("/services");
    revalidatePath("/");
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
