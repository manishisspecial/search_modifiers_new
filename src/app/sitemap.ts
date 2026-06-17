import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { getCaseStudySlugs as getStaticCaseStudySlugs } from "@/lib/case-studies";
import { locationSlugs } from "@/lib/locations-data";
import { serviceSlugs } from "@/lib/services-data";
import { getLocationSlugs, getLocationPaths, getCaseStudySlugs } from "@/lib/db-queries";
import { getSite } from "@/lib/get-site";

const staticRoutes = [
  "/",
  "/about",
  "/contact",
  "/team",
  "/careers",
  "/services",
  "/case-studies",
  "/portfolio",
  "/testimonials",
  "/blog",
  "/faq",
  "/free-website-audit",
  "/request-quote",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSite();
  const base = site.url.replace(/\/$/, "");

  const publishedPosts = await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      deletedAt: null,
      noindex: false,
    },
    select: { slug: true, updatedAt: true, publishedAt: true },
  });

  const dbLocationPaths = await getLocationPaths();
  const dbLocationSlugs = dbLocationPaths.map((l) => l.slug);
  const effectiveLocationSlugs = dbLocationSlugs.length > 0 ? dbLocationSlugs : [...locationSlugs];

  const dbCaseStudySlugs = await getCaseStudySlugs();
  const effectiveCaseStudySlugs = dbCaseStudySlugs.length > 0 ? dbCaseStudySlugs : getStaticCaseStudySlugs();

  const entries: MetadataRoute.Sitemap = [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...serviceSlugs.map((slug) => ({
      url: `${base}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...effectiveLocationSlugs.map((slug) => {
      const loc = dbLocationPaths.find((l) => l.slug === slug);
      const path = loc?.prefix ? `/${loc.prefix}/${slug}` : `/location/${slug}`;
      return {
        url: `${base}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    }),
    ...publishedPosts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.publishedAt || p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...effectiveCaseStudySlugs.map((slug) => ({
      url: `${base}/case-studies/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.68,
    })),
  ];

  return entries;
}
