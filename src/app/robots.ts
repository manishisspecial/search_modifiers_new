import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { site } from "@/lib/site";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = site.url.replace(/\/$/, "");

  try {
    const settings = await prisma.siteSettings.findFirst({
      select: { robotsTxt: true },
    });

    if (settings?.robotsTxt) {
      const lines = settings.robotsTxt.split("\n");
      const rules: { userAgent: string; allow?: string[]; disallow?: string[] } = {
        userAgent: "*",
        allow: [],
        disallow: [],
      };

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.toLowerCase().startsWith("allow:")) {
          rules.allow!.push(trimmed.slice(6).trim());
        } else if (trimmed.toLowerCase().startsWith("disallow:")) {
          rules.disallow!.push(trimmed.slice(9).trim());
        } else if (trimmed.toLowerCase().startsWith("user-agent:")) {
          rules.userAgent = trimmed.slice(11).trim();
        }
      }

      return {
        rules,
        sitemap: `${base}/sitemap.xml`,
      };
    }
  } catch {
    // Fallback to defaults on DB error
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
