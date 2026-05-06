import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { serviceSlugs } from "@/lib/services-data";
import { locationSlugs } from "@/lib/locations-data";
import { getCaseStudySlugs } from "@/lib/case-studies";

const STATIC_ROUTES_COUNT = 13;

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = await prisma.siteSettings.findFirst({
      select: { robotsTxt: true },
    });

    const publishedCount = await prisma.blogPost.count({
      where: { status: "PUBLISHED", deletedAt: null, noindex: false },
    });

    const urlCount =
      STATIC_ROUTES_COUNT +
      serviceSlugs.length +
      locationSlugs.length +
      getCaseStudySlugs().length +
      publishedCount;

    return NextResponse.json({
      robotsTxt: settings?.robotsTxt || null,
      sitemapInfo: { urlCount },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch SEO settings" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { robotsTxt } = await req.json();

    const existing = await prisma.siteSettings.findFirst();
    if (!existing) {
      return NextResponse.json(
        { error: "Site settings have not been initialised yet" },
        { status: 404 }
      );
    }

    await prisma.siteSettings.update({
      where: { id: existing.id },
      data: { robotsTxt },
    });

    revalidatePath("/robots.txt");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update SEO settings" },
      { status: 500 }
    );
  }
}
