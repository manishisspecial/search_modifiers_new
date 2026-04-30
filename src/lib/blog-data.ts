export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "seo-roadmap-2026",
    title: "The 2026 SEO Roadmap: Technical Foundations Still Win",
    excerpt:
      "AI overviews changed CTR curves — here’s how we’re prioritizing crawl health, structured data, and on-SERP brand assets for enterprise teams.",
    date: "2026-03-18",
    author: "Priya Malhotra",
    readTime: "8 min read",
    category: "SEO",
    content: `
## Executive summary

Search is fragmenting across AI answers, short video, and classic ten-blue-links. The teams winning organic share in 2026 doubled down on **technical excellence** and **entity-rich content** while treating AI surfaces as another SERP feature to monitor — not panic over.

## 1. Crawl budget is a product decision

For large sites, every new template is a liability until proven indexable and valuable. We recommend quarterly crawl budget reviews tied to revenue sections — not sitewide vanity crawls.

## 2. Structured data as a trust layer

Product, FAQ, and Organization schema remain high-leverage for rich results where Google still surfaces traditional links. Validate in staging, not just production.

## 3. Refresh vs. net-new

Most enterprises underestimate the ROI of **updating winners**. A disciplined refresh calendar often beats launching thin net-new posts.

## Closing

If you want a prioritized technical and content roadmap, start with our [free website audit](/free-website-audit) — you’ll leave with a dev-ready ticket list.
    `.trim(),
  },
  {
    slug: "google-ads-structure",
    title: "Google Ads Account Structure That Scales Without Chaos",
    excerpt:
      "A practical segmentation model for Search, PMax, and Demand Gen — including naming, negatives, and conversion hygiene.",
    date: "2026-03-02",
    author: "Arjun Mehta",
    readTime: "6 min read",
    category: "Paid Media",
    content: `
## Why structure matters

Poor structure hides waste. Great structure makes optimization **boringly obvious** — which is what you want at scale.

## Segmentation principles

- Match campaign intent to ad group intent — avoid mixing brand and non-brand without intent.
- Use labels for lifecycle: **always-on**, **test**, **seasonal**.
- Keep conversion actions audited monthly — stale goals silently mislead bidding.

## Performance Max guardrails

Feed quality is half the battle. Supplemental feeds, custom labels, and creative asset refresh cadences prevent PMax from drifting toward cheap but irrelevant clicks.

## Takeaway

Structure is strategy made visible. Rebuild once with discipline, then iterate with creative and audience tests — not annual account explosions.
    `.trim(),
  },
  {
    slug: "meta-creative-testing",
    title: "Meta Creative Testing: A Framework That Survives iOS Changes",
    excerpt:
      "How we batch hooks, use Advantage+ responsibly, and pair UGC with landing page message match.",
    date: "2026-02-20",
    author: "Neha Kapoor",
    readTime: "7 min read",
    category: "Social",
    content: `
## Creative is the new targeting

As signals compress, **creative velocity** and **post-click experience** carry more of the load.

## The 3×3 hook matrix

We prototype three offers against three emotional angles (fear, aspiration, proof) — then kill losers within 72 hours of spend.

## CAPI without drama

Event match quality improves with cleaner payloads and consistent customer information parameters. Treat CAPI as an engineering habit, not a one-time pixel install.

## Landing page match

If your ad promises a calculator, the LP above the fold must show the calculator — not a generic brand story.

## Next step

Pair this framework with our [request a quote](/request-quote) flow if you want a channel-specific growth assessment.
    `.trim(),
  },
  {
    slug: "local-seo-multi-location",
    title: "Local SEO for Multi-Location Brands: Templates That Don’t Cannibalize",
    excerpt:
      "GBP hierarchy, localized landing pages, and internal linking patterns that scale to 50+ stores.",
    date: "2026-02-05",
    author: "Priya Malhotra",
    readTime: "9 min read",
    category: "Local SEO",
    content: `
## The cannibalization trap

Franchises often publish near-duplicate city pages. Google consolidates — and nobody ranks.

## Better templates

Unique **local proof** blocks: staff, community partnerships, service area nuances, and reviews pulled per location.

## Internal linking

Use a hub-and-spoke model from state → city → location, with breadcrumbs mirrored in schema.

## Reviews at scale

Ethical review requests triggered post-service — with templated responses and escalation for detractors.

## Work with us

Explore our [local SEO service](/services/local-seo) for a governance kit you can operationalize in Q2.
    `.trim(),
  },
  {
    slug: "content-engine-b2b",
    title: "Building a B2B Content Engine That Sales Actually Uses",
    excerpt:
      "From SME interviews to sales enablement snippets — how we tie editorial calendars to pipeline stages.",
    date: "2026-01-22",
    author: "Vikram Singh",
    readTime: "6 min read",
    category: "Content",
    content: `
## Sales-enabled content

Marketing content fails when sellers can’t find it. We tag assets in the CMS by **deal stage**, **vertical**, and **objection**.

## SME workflows

Biweekly 30-minute interviews beat annual hero shoots. Transcripts become quotes, FAQs, and LinkedIn carousels.

## Measurement

Stop judging content only by pageviews. Track **assisted opportunities** and **sales usage** in your CRM notes.

## CTA

See our [content marketing services](/services/content-marketing) for a 90-day pilot structure.
    `.trim(),
  },
  {
    slug: "website-speed-cro",
    title: "Why Speed Is a CRO Lever — Not Just an SEO Checkbox",
    excerpt:
      "Core Web Vitals, perceived performance, and the micro-interactions that lift form completion rates.",
    date: "2026-01-08",
    author: "Arjun Mehta",
    readTime: "5 min read",
    category: "Web",
    content: `
## Perceived speed wins

Skeleton states, font subsetting, and prioritized LCP images change how **fast** a site feels — even when lab scores are flat.

## Forms are product

Every extra field needs a revenue justification. We instrument drop-off by field and iterate copy inline.

## When to rebuild vs. tune

Sometimes a template fix unlocks 20 points of LCP. Sometimes technical debt warrants a [fresh build](/services/website-development).

## Audit

Book a [free website audit](/free-website-audit) — we include CWV and form friction notes.
    `.trim(),
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Newest first — for homepage and related sections. */
export function getRecentBlogPosts(count: number): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
