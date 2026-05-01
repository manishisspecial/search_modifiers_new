import type { MetadataRoute } from "next";
import { getSite } from "@/lib/get-site";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSite();
  const base = site.url.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
