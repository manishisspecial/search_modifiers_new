// This file provides database-backed data fetching for the frontend
// It replaces the hardcoded TypeScript data files

import { prisma } from "@/lib/db";

// Services
export async function getServices() {
  try {
    return await prisma.service.findMany({
      where: { deletedAt: null },
      include: {
        benefits: { orderBy: { order: "asc" } },
        process: { orderBy: { order: "asc" } },
        faqs: { orderBy: { order: "asc" } },
      },
    });
  } catch {
    // Fallback to static data if database is not available
    return [];
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    return await prisma.service.findFirst({
      where: { slug, deletedAt: null },
      include: {
        benefits: { orderBy: { order: "asc" } },
        process: { orderBy: { order: "asc" } },
        faqs: { orderBy: { order: "asc" } },
      },
    });
  } catch {
    return null;
  }
}

export async function getServiceSlugs() {
  try {
    const services = await prisma.service.findMany({
      where: { deletedAt: null },
      select: { slug: true },
    });
    return services.map((s) => s.slug);
  } catch {
    return [];
  }
}

export async function getAllServiceMetas() {
  const { servicesMeta } = await import("@/lib/services-meta");
  return servicesMeta;
}

export async function getServiceMetaBySlug(slug: string) {
  const { getServiceMeta } = await import("@/lib/services-meta");
  return getServiceMeta(slug);
}

export async function getStaticPageSlugs() {
  try {
    const pages = await prisma.staticPage.findMany({
      where: { deletedAt: null },
      select: { slug: true },
    });
    return pages.map((p) => p.slug);
  } catch {
    return [];
  }
}

// Blog Posts
export async function getPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { deletedAt: null },
      orderBy: { date: "desc" },
    });
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await prisma.blogPost.findFirst({
      where: { slug, deletedAt: null },
    });
  } catch {
    return null;
  }
}

export async function getRecentBlogPosts(limit: number = 3) {
  try {
    return await prisma.blogPost.findMany({
      where: { deletedAt: null },
      orderBy: { date: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

// Case Studies
export async function getCaseStudies() {
  try {
    return await prisma.caseStudy.findMany({
      where: { deletedAt: null },
      include: { metrics: { orderBy: { order: "asc" } } },
    });
  } catch {
    return [];
  }
}

export async function getCaseStudyBySlug(slug: string) {
  try {
    return await prisma.caseStudy.findFirst({
      where: { slug, deletedAt: null },
      include: { metrics: { orderBy: { order: "asc" } } },
    });
  } catch {
    return null;
  }
}

export async function getCaseStudySlugs() {
  try {
    const studies = await prisma.caseStudy.findMany({
      where: { deletedAt: null },
      select: { slug: true },
    });
    return studies.map((s) => s.slug);
  } catch {
    return [];
  }
}

// Testimonials
export async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { deletedAt: null },
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

// Locations
export async function getLocations() {
  try {
    return await prisma.location.findMany({
      where: { deletedAt: null },
      include: {
        sections: { orderBy: { order: "asc" } },
        localStats: { orderBy: { order: "asc" } },
        faqs: { orderBy: { order: "asc" } },
      },
    });
  } catch {
    return [];
  }
}

export async function getLocationBySlug(slug: string) {
  try {
    return await prisma.location.findFirst({
      where: { slug, deletedAt: null },
      include: {
        sections: { orderBy: { order: "asc" } },
        localStats: { orderBy: { order: "asc" } },
        faqs: { orderBy: { order: "asc" } },
      },
    });
  } catch {
    return null;
  }
}

export async function getLocationSlugs() {
  try {
    const locations = await prisma.location.findMany({
      where: { deletedAt: null },
      select: { slug: true },
    });
    return locations.map((l) => l.slug);
  } catch {
    return [];
  }
}

// Static Pages
export async function getStaticPageBySlug(slug: string) {
  try {
    return await prisma.staticPage.findFirst({
      where: { slug, deletedAt: null },
    });
  } catch {
    return null;
  }
}

// Site Settings
export async function getSiteSettings() {
  try {
    return await prisma.siteSettings.findFirst();
  } catch {
    return null;
  }
}

// Navigation
export async function getNavigationItems(category: string) {
  try {
    return await prisma.navigationItem.findMany({
      where: { category },
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getMainNav() {
  return getNavigationItems("main");
}

export async function getServicesNav() {
  return getNavigationItems("services");
}

export async function getLocationsNav() {
  return getNavigationItems("locations");
}
