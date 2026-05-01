import { prisma } from "@/lib/db";
import type { ServiceBlock } from "@/lib/services-data";
import type { ServiceMeta, ServiceProof } from "@/lib/services-meta";
import type { BlogPost } from "@/lib/blog-data";
import type { CaseStudy } from "@/lib/case-studies";
import type { LocationPage } from "@/lib/locations-data";
import type { Testimonial } from "@/lib/testimonials";

// ---------------------------------------------------------------------------
// Adapters: Prisma row → existing component types
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toServiceBlock(row: any): ServiceBlock {
  return {
    slug: row.slug,
    title: row.title,
    heroTitle: row.heroTitle ?? undefined,
    shortDescription: row.shortDescription,
    metaTitle: row.metaTitle,
    metaDescription: row.metaDescription,
    heroEyebrow: row.heroEyebrow,
    intro: row.intro,
    explanation: row.explanation,
    detailMarkdown: row.detailMarkdown ?? undefined,
    benefits: (row.benefits ?? []).map((b: { title: string; description: string; icon: string }) => ({
      title: b.title,
      description: b.description,
      icon: b.icon,
    })),
    process: (row.process ?? []).map((p: { step: string; title: string; description: string }) => ({
      step: p.step,
      title: p.title,
      description: p.description,
    })),
    faqs: (row.faqs ?? []).map((f: { q: string; a: string }) => ({
      q: f.q,
      a: f.a,
    })),
  };
}

const DEFAULT_PROOF: [ServiceProof, ServiceProof, ServiceProof, ServiceProof] = [
  { value: "—", label: "Stat" },
  { value: "—", label: "Stat" },
  { value: "—", label: "Stat" },
  { value: "—", label: "Stat" },
];

const DEFAULT_DASH_META = {
  visual: "metrics" as const,
  dashTitle: "dashboard",
  kpis: [
    { label: "Metric", value: "—" },
    { label: "Metric", value: "—" },
    { label: "Metric", value: "—" },
  ],
  headlineLabel: "Key metric",
  headlineValue: "—",
  headlineDelta: "—",
  channels: [
    { label: "Channel 1", pct: 50, tint: "from-orange-400 to-orange-500" },
    { label: "Channel 2", pct: 40, tint: "from-amber-400 to-rose-500" },
    { label: "Channel 3", pct: 30, tint: "from-rose-400 to-rose-500" },
  ],
  callouts: ["—", "—"],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toServiceMeta(row: any): ServiceMeta {
  const proof = Array.isArray(row.proof) && row.proof.length >= 4
    ? (row.proof.slice(0, 4) as [ServiceProof, ServiceProof, ServiceProof, ServiceProof])
    : DEFAULT_PROOF;

  const dm = (row.dashMeta && typeof row.dashMeta === "object") ? row.dashMeta : DEFAULT_DASH_META;

  return {
    pill: row.pill ?? row.title ?? "",
    visual: dm.visual ?? "metrics",
    dashTitle: dm.dashTitle ?? "dashboard",
    kpis: dm.kpis ?? DEFAULT_DASH_META.kpis,
    headlineLabel: dm.headlineLabel ?? "Key metric",
    headlineValue: dm.headlineValue ?? "—",
    headlineDelta: dm.headlineDelta ?? "—",
    channels: dm.channels ?? DEFAULT_DASH_META.channels,
    callouts: dm.callouts ?? DEFAULT_DASH_META.callouts,
    proof,
    related: Array.isArray(row.related) ? row.related : [],
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toBlogPost(row: any): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    date: row.date,
    author: row.author,
    readTime: row.readTime,
    category: row.category,
    content: row.content,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toCaseStudy(row: any): CaseStudy {
  return {
    slug: row.slug,
    title: row.title,
    industry: row.industry,
    result: row.result,
    summary: row.summary,
    content: row.content,
    metrics: (row.metrics ?? []).map((m: { label: string; value: string }) => ({
      label: m.label,
      value: m.value,
    })),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toLocationPage(row: any): LocationPage {
  return {
    slug: row.slug,
    title: row.title,
    metaTitle: row.metaTitle,
    metaDescription: row.metaDescription,
    heroEyebrow: row.heroEyebrow,
    headline: row.headline,
    intro: row.intro,
    sections: (row.sections ?? []).map((s: { heading: string; body: string }) => ({
      heading: s.heading,
      body: s.body,
    })),
    localStats: (row.localStats ?? []).map((s: { label: string; value: string }) => ({
      label: s.label,
      value: s.value,
    })),
    faqs: (row.faqs ?? []).map((f: { q: string; a: string }) => ({
      q: f.q,
      a: f.a,
    })),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toTestimonial(row: any): Testimonial {
  return {
    quote: row.quote,
    name: row.name,
    role: row.role,
    company: row.company,
  };
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

const SERVICE_INCLUDE = {
  benefits: { orderBy: { order: "asc" as const } },
  process: { orderBy: { order: "asc" as const } },
  faqs: { orderBy: { order: "asc" as const } },
};

export async function getServices(): Promise<ServiceBlock[]> {
  try {
    const rows = await prisma.service.findMany({
      where: { deletedAt: null },
      include: SERVICE_INCLUDE,
      orderBy: { createdAt: "asc" },
    });
    return rows.map(toServiceBlock);
  } catch {
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceBlock | null> {
  try {
    const row = await prisma.service.findFirst({
      where: { slug, deletedAt: null },
      include: SERVICE_INCLUDE,
    });
    return row ? toServiceBlock(row) : null;
  } catch {
    return null;
  }
}

export async function getServiceMetaBySlug(slug: string): Promise<ServiceMeta | null> {
  try {
    const row = await prisma.service.findFirst({
      where: { slug, deletedAt: null },
      select: { title: true, pill: true, related: true, proof: true, dashMeta: true },
    });
    return row ? toServiceMeta(row) : null;
  } catch {
    return null;
  }
}

export async function getAllServiceMetas(): Promise<Record<string, ServiceMeta>> {
  try {
    const rows = await prisma.service.findMany({
      where: { deletedAt: null },
      select: { slug: true, title: true, pill: true, related: true, proof: true, dashMeta: true },
    });
    const map: Record<string, ServiceMeta> = {};
    for (const row of rows) {
      map[row.slug] = toServiceMeta(row);
    }
    return map;
  } catch {
    return {};
  }
}

export async function getServiceSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.service.findMany({
      where: { deletedAt: null },
      select: { slug: true },
      orderBy: { createdAt: "asc" },
    });
    return rows.map((r) => r.slug);
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Blog Posts
// ---------------------------------------------------------------------------

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { deletedAt: null },
      orderBy: { date: "desc" },
    });
    return rows.map(toBlogPost);
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const row = await prisma.blogPost.findFirst({
      where: { slug, deletedAt: null },
    });
    return row ? toBlogPost(row) : null;
  } catch {
    return null;
  }
}

export async function getRecentBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { deletedAt: null },
      orderBy: { date: "desc" },
      take: limit,
    });
    return rows.map(toBlogPost);
  } catch {
    return [];
  }
}

export async function getPostSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { deletedAt: null },
      select: { slug: true },
    });
    return rows.map((r) => r.slug);
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Case Studies
// ---------------------------------------------------------------------------

export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const rows = await prisma.caseStudy.findMany({
      where: { deletedAt: null },
      include: { metrics: { orderBy: { order: "asc" } } },
    });
    return rows.map(toCaseStudy);
  } catch {
    return [];
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const row = await prisma.caseStudy.findFirst({
      where: { slug, deletedAt: null },
      include: { metrics: { orderBy: { order: "asc" } } },
    });
    return row ? toCaseStudy(row) : null;
  } catch {
    return null;
  }
}

export async function getCaseStudySlugs(): Promise<string[]> {
  try {
    const rows = await prisma.caseStudy.findMany({
      where: { deletedAt: null },
      select: { slug: true },
    });
    return rows.map((s) => s.slug);
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const rows = await prisma.testimonial.findMany({
      where: { deletedAt: null },
      orderBy: { order: "asc" },
    });
    return rows.map(toTestimonial);
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Locations
// ---------------------------------------------------------------------------

export async function getLocations(): Promise<LocationPage[]> {
  try {
    const rows = await prisma.location.findMany({
      where: { deletedAt: null },
      include: {
        sections: { orderBy: { order: "asc" } },
        localStats: { orderBy: { order: "asc" } },
        faqs: { orderBy: { order: "asc" } },
      },
    });
    return rows.map(toLocationPage);
  } catch {
    return [];
  }
}

export async function getLocationBySlug(slug: string): Promise<LocationPage | null> {
  try {
    const row = await prisma.location.findFirst({
      where: { slug, deletedAt: null },
      include: {
        sections: { orderBy: { order: "asc" } },
        localStats: { orderBy: { order: "asc" } },
        faqs: { orderBy: { order: "asc" } },
      },
    });
    return row ? toLocationPage(row) : null;
  } catch {
    return null;
  }
}

export async function getLocationSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.location.findMany({
      where: { deletedAt: null },
      select: { slug: true },
    });
    return rows.map((l) => l.slug);
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Static Pages
// ---------------------------------------------------------------------------

export async function getStaticPageBySlug(slug: string) {
  try {
    return await prisma.staticPage.findFirst({
      where: { slug, deletedAt: null },
    });
  } catch {
    return null;
  }
}

export async function getStaticPageSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.staticPage.findMany({
      where: { deletedAt: null },
      select: { slug: true },
    });
    return rows.map((r) => r.slug);
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Site Settings
// ---------------------------------------------------------------------------

export async function getSiteSettings() {
  try {
    return await prisma.siteSettings.findFirst();
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Team Members
// ---------------------------------------------------------------------------

export async function getTeamMembers() {
  try {
    const rows = await prisma.teamMember.findMany({
      where: { deletedAt: null },
      orderBy: { order: "asc" },
    });
    return rows;
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Career Roles
// ---------------------------------------------------------------------------

export async function getCareerRoles() {
  try {
    const rows = await prisma.careerRole.findMany({
      where: { deletedAt: null },
      orderBy: { order: "asc" },
    });
    return rows;
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// FAQ Items
// ---------------------------------------------------------------------------

export async function getFaqItems() {
  try {
    const rows = await prisma.faqItem.findMany({
      where: { deletedAt: null },
      orderBy: { order: "asc" },
    });
    return rows;
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Portfolio Items
// ---------------------------------------------------------------------------

export async function getPortfolioItems() {
  try {
    const rows = await prisma.portfolioItem.findMany({
      where: { deletedAt: null },
      orderBy: { order: "asc" },
    });
    return rows;
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Page Content
// ---------------------------------------------------------------------------

export async function getPageContent(slug: string) {
  try {
    return await prisma.pageContent.findUnique({
      where: { slug },
    });
  } catch {
    return null;
  }
}

export async function getAllPageContents() {
  try {
    return await prisma.pageContent.findMany({
      orderBy: { slug: "asc" },
    });
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Trust Badges
// ---------------------------------------------------------------------------

export async function getTrustBadges() {
  try {
    return await prisma.trustBadge.findMany({
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Footer Ratings
// ---------------------------------------------------------------------------

export async function getFooterRatings() {
  try {
    return await prisma.footerRating.findMany();
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Footer Columns (navigation items in "footer-*" categories)
// ---------------------------------------------------------------------------

export async function getFooterNav() {
  try {
    return await prisma.navigationItem.findMany({
      where: { category: { startsWith: "footer" } },
      orderBy: [{ category: "asc" }, { order: "asc" }],
    });
  } catch {
    return [];
  }
}
