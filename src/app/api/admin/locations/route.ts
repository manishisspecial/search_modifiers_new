import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const LocationSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  type: z.enum(["COUNTRY", "CITY"]).optional().default("COUNTRY"),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  heroEyebrow: z.string(),
  headline: z.string(),
  intro: z.string(),
  sections: z.array(
    z.object({
      heading: z.string(),
      body: z.string(),
    })
  ),
  localStats: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  faqs: z.array(
    z.object({
      q: z.string(),
      a: z.string(),
    })
  ),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const locations = await prisma.location.findMany({
      where: {
        deletedAt: null,
        ...(type === "COUNTRY" || type === "CITY" ? { type } : {}),
      },
      include: {
        sections: { orderBy: { order: "asc" } },
        localStats: { orderBy: { order: "asc" } },
        faqs: { orderBy: { order: "asc" } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(locations);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
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
    const validatedData = LocationSchema.parse(body);

    const location = await prisma.location.create({
      data: {
        slug: validatedData.slug,
        title: validatedData.title,
        type: validatedData.type,
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

    // Auto-add navigation item for the new location
    const existingNavCount = await prisma.navigationItem.count({
      where: { category: "locations" },
    });
    await prisma.navigationItem.create({
      data: {
        category: "locations",
        label: validatedData.title,
        href: `/location/${validatedData.slug}`,
        order: existingNavCount,
      },
    });

    revalidatePath("/");
    revalidatePath(`/location/${validatedData.slug}`);
    return NextResponse.json(location, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create location" },
      { status: 500 }
    );
  }
}
