import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const SiteSettingsSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  url: z.string(),
  robotsTxt: z.string().optional().nullable(),
  email: z.string(),
  phone: z.string(),
  phoneTel: z.string(),
  whatsapp: z.string().optional(),
  officeRegion: z.string(),
  officeBadge: z.string(),
  streetAddress: z.string(),
  city: z.string(),
  region: z.string(),
  postalCode: z.string(),
  country: z.string(),
  addressDetail: z.string(),
  googleMapsEmbedSrc: z.string().optional(),
  linkedinUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  youtubeUrl: z.string().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let settings = await prisma.siteSettings.findFirst();

    if (!settings) {
      settings = await prisma.siteSettings.create({
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
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch site settings" },
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
    const body = await req.json();
    const validatedData = SiteSettingsSchema.parse(body);

    const settings = await prisma.siteSettings.update({
      where: { id: body.id },
      data: validatedData,
    });

    // Reflect updated settings (incl. robots.txt) across the public site.
    revalidatePath("/", "layout");
    revalidatePath("/robots.txt");

    return NextResponse.json(settings);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update site settings" },
      { status: 500 }
    );
  }
}
