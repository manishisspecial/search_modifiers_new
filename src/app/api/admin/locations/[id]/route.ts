import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const LocationUpdateSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  heroEyebrow: z.string(),
  headline: z.string(),
  intro: z.string(),
  sections: z.array(
    z.object({
      id: z.string().optional(),
      heading: z.string(),
      body: z.string(),
    })
  ),
  localStats: z.array(
    z.object({
      id: z.string().optional(),
      label: z.string(),
      value: z.string(),
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
    const location = await prisma.location.findUnique({
      where: { id },
      include: {
        sections: { orderBy: { order: "asc" } },
        localStats: { orderBy: { order: "asc" } },
        faqs: { orderBy: { order: "asc" } },
      },
    });

    if (!location) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    return NextResponse.json(location);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch location" },
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
    const validatedData = LocationUpdateSchema.parse(body);

    await Promise.all([
      prisma.locationSection.deleteMany({ where: { locationId: id } }),
      prisma.locationStat.deleteMany({ where: { locationId: id } }),
      prisma.locationFAQ.deleteMany({ where: { locationId: id } }),
    ]);

    const location = await prisma.location.update({
      where: { id },
      data: {
        slug: validatedData.slug,
        title: validatedData.title,
        metaTitle: validatedData.metaTitle,
        metaDescription: validatedData.metaDescription,
        heroEyebrow: validatedData.heroEyebrow,
        headline: validatedData.headline,
        intro: validatedData.intro,
        sections: {
          createMany: {
            data: validatedData.sections.map((section, index) => ({
              heading: section.heading,
              body: section.body,
              order: index,
            })),
          },
        },
        localStats: {
          createMany: {
            data: validatedData.localStats.map((stat, index) => ({
              label: stat.label,
              value: stat.value,
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
        sections: true,
        localStats: true,
        faqs: true,
      },
    });

    revalidatePath(`/locations/${validatedData.slug}`);
    revalidatePath("/");
    return NextResponse.json(location);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update location" },
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
    await prisma.location.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    revalidatePath("/");
    return NextResponse.json({ message: "Location deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete location" },
      { status: 500 }
    );
  }
}
