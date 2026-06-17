import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [services, blogPosts, caseStudies, testimonials, countryPages, cityPages, careerLeads] =
      await Promise.all([
        prisma.service.count({ where: { deletedAt: null } }),
        prisma.blogPost.count({ where: { deletedAt: null } }),
        prisma.caseStudy.count({ where: { deletedAt: null } }),
        prisma.testimonial.count({ where: { deletedAt: null } }),
        prisma.location.count({ where: { deletedAt: null, type: "COUNTRY" } }),
        prisma.location.count({ where: { deletedAt: null, type: "CITY" } }),
        prisma.careerApplication.count(),
      ]);

    return NextResponse.json({
      services,
      blogPosts,
      caseStudies,
      testimonials,
      locations: countryPages,
      cityPages,
      careerLeads,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
