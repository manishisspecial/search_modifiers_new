// This file provides database-backed data fetching for the frontend
// It replaces the hardcoded TypeScript data files

import { prisma } from "@/lib/db";

function logDbError(context: string, error: unknown) {
  console.error(`[db-queries] ${context}:`, error instanceof Error ? error.message : error);
}

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
  } catch (e) {
    logDbError("getServices", e);
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
  } catch (e) {
    logDbError("getServiceBySlug", e);
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
  } catch (e) {
    logDbError("getServiceSlugs", e);
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
  } catch (e) {
    logDbError("getStaticPageSlugs", e);
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
  } catch (e) {
    logDbError("getPosts", e);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await prisma.blogPost.findFirst({
      where: { slug, deletedAt: null, status: "PUBLISHED" },
      include: { category: true },
    });
  } catch (e) {
    logDbError("getPostBySlug", e);
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
  } catch (e) {
    logDbError("getRecentBlogPosts", e);
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
  } catch (e) {
    logDbError("getPublishedPostSlugs", e);
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
  } catch (e) {
    logDbError("getCategories", e);
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
  } catch (e) {
    logDbError("getCategoryBySlug", e);
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
  } catch (e) {
    logDbError("getPostsByCategory", e);
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
  } catch (e) {
    logDbError("getAllTags", e);
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
  } catch (e) {
    logDbError("getPostsByTag", e);
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
  } catch (e) {
    logDbError("getPrimaryKeywords", e);
    return [];
  }
}

// Case Studies
export async function getCaseStudies() {
  try {
    return await prisma.caseStudy.findMany({
      where: { deletedAt: null },
      include: { metrics: { orderBy: { order: "asc" } } },
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    logDbError("getCaseStudies", e);
    return [];
  }
}

export async function getCaseStudyBySlug(slug: string) {
  try {
    return await prisma.caseStudy.findFirst({
      where: { slug, deletedAt: null },
      include: { metrics: { orderBy: { order: "asc" } } },
    });
  } catch (e) {
    logDbError("getCaseStudyBySlug", e);
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
  } catch (e) {
    logDbError("getCaseStudySlugs", e);
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
  } catch (e) {
    logDbError("getTestimonials", e);
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
  } catch (e) {
    logDbError("getLocations", e);
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
  } catch (e) {
    logDbError("getLocationBySlug", e);
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
  } catch (e) {
    logDbError("getLocationSlugs", e);
    return [];
  }
}

export async function getLocationPaths() {
  try {
    const locations = await prisma.location.findMany({
      where: { deletedAt: null },
      select: { slug: true, prefix: true },
    });
    return locations.map((l) => ({
      slug: l.slug,
      prefix: l.prefix || "",
    }));
  } catch (e) {
    logDbError("getLocationPaths", e);
    return [];
  }
}

// Static Pages
export async function getStaticPageBySlug(slug: string) {
  try {
    return await prisma.staticPage.findFirst({
      where: { slug, deletedAt: null },
    });
  } catch (e) {
    logDbError("getStaticPageBySlug", e);
    return null;
  }
}

// Locations by type (Country Pages / City Pages)
export async function getLocationsByType(type: "COUNTRY" | "CITY") {
  try {
    return await prisma.location.findMany({
      where: { deletedAt: null, type },
      include: {
        sections: { orderBy: { order: "asc" } },
        localStats: { orderBy: { order: "asc" } },
        faqs: { orderBy: { order: "asc" } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    logDbError("getLocationsByType", e);
    return [];
  }
}

// Managed Locations (admin-only dropdown source)
export async function getManagedLocations(type?: "COUNTRY" | "CITY") {
  try {
    return await prisma.managedLocation.findMany({
      where: type ? { type } : undefined,
      orderBy: [{ type: "asc" }, { name: "asc" }],
    });
  } catch (e) {
    logDbError("getManagedLocations", e);
    return [];
  }
}

// Team
export async function getTeamMembers() {
  try {
    return await prisma.teamMember.findMany({
      where: { deletedAt: null },
      orderBy: { order: "asc" },
    });
  } catch (e) {
    logDbError("getTeamMembers", e);
    return [];
  }
}

// Careers
export async function getCareerRoles() {
  try {
    return await prisma.careerRole.findMany({
      where: { deletedAt: null },
      orderBy: { order: "asc" },
    });
  } catch (e) {
    logDbError("getCareerRoles", e);
    return [];
  }
}

// Portfolio
export async function getPortfolioItems() {
  try {
    return await prisma.portfolioItem.findMany({
      where: { deletedAt: null },
      orderBy: { order: "asc" },
    });
  } catch (e) {
    logDbError("getPortfolioItems", e);
    return [];
  }
}

// FAQs by placement + optional target slug
export async function getFaqs(
  placement: "PAGE" | "BLOG" | "COUNTRY" | "CITY",
  targetSlug?: string
) {
  try {
    const items = await prisma.faqItem.findMany({
      where: { deletedAt: null, placement },
      orderBy: { order: "asc" },
    });
    return items.filter((f) => !f.targetSlug || (targetSlug && f.targetSlug === targetSlug));
  } catch (e) {
    logDbError("getFaqs", e);
    return [];
  }
}

export async function getAllFaqs() {
  try {
    return await prisma.faqItem.findMany({
      where: { deletedAt: null },
      orderBy: { order: "asc" },
    });
  } catch (e) {
    logDbError("getAllFaqs", e);
    return [];
  }
}

// Page Content (homepage and other editable blocks)
export async function getPageContent(slug: string) {
  try {
    return await prisma.pageContent.findUnique({ where: { slug } });
  } catch (e) {
    logDbError("getPageContent", e);
    return null;
  }
}

// Trust Badges
export async function getTrustBadges() {
  try {
    return await prisma.trustBadge.findMany({
      orderBy: { order: "asc" },
    });
  } catch (e) {
    logDbError("getTrustBadges", e);
    return [];
  }
}

// Footer Ratings
export async function getFooterRatings() {
  try {
    return await prisma.footerRating.findMany();
  } catch (e) {
    logDbError("getFooterRatings", e);
    return [];
  }
}

// Site Settings
export async function getSiteSettings() {
  try {
    return await prisma.siteSettings.findFirst();
  } catch (e) {
    logDbError("getSiteSettings", e);
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
  } catch (e) {
    logDbError("getNavigationItems", e);
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

export async function getFooterNav() {
  return getNavigationItems("footer");
}
