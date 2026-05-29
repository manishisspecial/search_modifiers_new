import { prisma } from "@/lib/db";
import { site } from "@/lib/site";

// Always render fresh so admin edits to robots.txt take effect immediately,
// and so the stored text is emitted verbatim (preserving multi-agent rules).
export const dynamic = "force-dynamic";

export async function GET() {
  const base = site.url.replace(/\/$/, "");
  const sitemapLine = `Sitemap: ${base}/sitemap.xml`;

  let body = "";
  try {
    const settings = await prisma.siteSettings.findFirst({ select: { robotsTxt: true } });
    if (settings?.robotsTxt && settings.robotsTxt.trim()) {
      body = settings.robotsTxt.trim();
    }
  } catch {
    // fall through to default
  }

  if (!body) {
    body = ["User-agent: *", "Allow: /", "Disallow: /api/", "Disallow: /admin/"].join("\n");
  }

  // Ensure a Sitemap directive is present without duplicating one.
  if (!/^\s*sitemap\s*:/im.test(body)) {
    body = `${body}\n\n${sitemapLine}`;
  }

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
