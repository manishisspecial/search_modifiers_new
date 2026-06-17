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
    let settings = await prisma.siteSettings.findFirst({
      select: { robotsTxt: true },
    });

    if (!settings) {
      await prisma.siteSettings.create({
        data: {
          name: "Search Modifiers",
          tagline: "Digital Marketing Agency",
          description: "Professional digital marketing services",
          url: "https://searchmodifiers.com",
          email: "info@searchmodifiers.com",
          phone: "+91",
          phoneTel: "+91",
          officeRegion: "India",
          officeBadge: "Based in India",
          streetAddress: "",
          city: "",
          region: "",
          postalCode: "",
          country: "India",
          addressDetail: "",
        },
      });
      settings = { robotsTxt: null };
    }

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

    let existing = await prisma.siteSettings.findFirst();
    if (!existing) {
      existing = await prisma.siteSettings.create({
        data: {
          name: "Search Modifiers",
          tagline: "Digital Marketing Agency",
          description: "Professional digital marketing services",
          url: "https://searchmodifiers.com",
          email: "info@searchmodifiers.com",
          phone: "+91",
          phoneTel: "+91",
          officeRegion: "India",
          officeBadge: "Based in India",
          streetAddress: "",
          city: "",
          region: "",
          postalCode: "",
          country: "India",
          addressDetail: "",
          robotsTxt,
        },
      });
    } else {
      await prisma.siteSettings.update({
        where: { id: existing.id },
        data: { robotsTxt },
      });
    }

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
