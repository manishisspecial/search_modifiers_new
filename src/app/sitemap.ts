import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";
import { getCaseStudySlugs } from "@/lib/case-studies";
import { locationSlugs } from "@/lib/locations-data";
import { serviceSlugs } from "@/lib/services-data";
import { site } from "@/lib/site";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");

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
    ...locationSlugs.map((slug) => ({
      url: `${base}/locations/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogPosts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...getCaseStudySlugs().map((slug) => ({
      url: `${base}/case-studies/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.68,
    })),
  ];

  return entries;
}
