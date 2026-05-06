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
      where: {
        deletedAt: null,
        status: "PUBLISHED",
      },
      include: { category: true },
      orderBy: { date: "desc" },
    });
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await prisma.blogPost.findFirst({
      where: { slug, deletedAt: null, status: "PUBLISHED" },
      include: { category: true },
    });
  } catch {
    return null;
  }
}

export async function getRecentBlogPosts(limit: number = 3) {
  try {
    return await prisma.blogPost.findMany({
      where: {
        deletedAt: null,
        status: "PUBLISHED",
      },
      include: { category: true },
      orderBy: { date: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function getPublishedPostSlugs() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { deletedAt: null, status: "PUBLISHED" },
      select: { slug: true },
    });
    return posts.map((p) => p.slug);
  } catch {
    return [];
  }
}

// Blog Categories
export async function getCategories() {
  try {
    return await prisma.blogCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        children: { orderBy: { order: "asc" } },
        _count: { select: { posts: { where: { deletedAt: null, status: "PUBLISHED" } } } },
      },
    });
  } catch {
    return [];
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    return await prisma.blogCategory.findUnique({
      where: { slug },
      include: {
        parent: true,
        children: { orderBy: { order: "asc" } },
      },
    });
  } catch {
    return null;
  }
}

export async function getPostsByCategory(categoryId: string) {
  try {
    return await prisma.blogPost.findMany({
      where: { deletedAt: null, status: "PUBLISHED", categoryId },
      include: { category: true },
      orderBy: { date: "desc" },
    });
  } catch {
    return [];
  }
}

// Blog Tags
export async function getAllTags(): Promise<string[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { deletedAt: null, status: "PUBLISHED" },
      select: { tags: true },
    });
    const tagSet = new Set<string>();
    for (const post of posts) {
      const tags = post.tags as string[];
      if (Array.isArray(tags)) tags.forEach((t) => t && tagSet.add(t));
    }
    return Array.from(tagSet).sort();
  } catch {
    return [];
  }
}

export async function getPostsByTag(tag: string) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { deletedAt: null, status: "PUBLISHED" },
      include: { category: true },
      orderBy: { date: "desc" },
    });
    return posts.filter((p) => {
      const tags = p.tags as string[];
      return Array.isArray(tags) && tags.some((t) => t.toLowerCase() === tag.toLowerCase());
    });
  } catch {
    return [];
  }
}

export async function getPrimaryKeywords(): Promise<{ slug: string; primaryKeyword: string }[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { deletedAt: null, status: "PUBLISHED", primaryKeyword: { not: null } },
      select: { slug: true, primaryKeyword: true },
    });
    return posts
      .filter((p) => p.primaryKeyword)
      .map((p) => ({ slug: p.slug, primaryKeyword: p.primaryKeyword as string }));
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

// Trust Badges
export async function getTrustBadges() {
  try {
    return await prisma.trustBadge.findMany({
      orderBy: { createdAt: "asc" },
    });
  } catch {
    return [];
  }
}

// Footer Ratings
export async function getFooterRatings() {
  try {
    return await prisma.footerRating.findMany();
  } catch {
    return [];
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
