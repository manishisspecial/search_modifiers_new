import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TINT_ORANGE = "from-orange-400 to-orange-500";
const TINT_AMBER = "from-amber-400 to-rose-500";
const TINT_ROSE = "from-rose-400 to-rose-500";
const TINT_VIOLET = "from-violet-400 to-fuchsia-500";
const TINT_EMERALD = "from-emerald-400 to-teal-500";
const TINT_SKY = "from-sky-400 to-indigo-500";

type MetaEntry = {
  pill: string;
  related: string[];
  proof: { value: string; label: string }[];
  dashMeta: Record<string, unknown>;
};

const meta: Record<string, MetaEntry> = {
  "digital-marketing": {
    pill: "Full-funnel growth",
    related: ["seo-services", "ppc-services", "social-media-marketing", "content-marketing"],
    proof: [
      { value: "320+", label: "Campaigns shipped" },
      { value: "6.4×", label: "Avg. ROAS" },
      { value: "37%", label: "CVR uplift (median)" },
      { value: "24h", label: "First response SLA" },
    ],
    dashMeta: {
      visual: "metrics",
      dashTitle: "growth.dash",
      kpis: [
        { label: "Pipeline", value: "+148%", delta: "MoM", icon: "trending-up" },
        { label: "Blended ROAS", value: "6.4×", icon: "target" },
        { label: "MQL → SQL", value: "31%", icon: "users" },
      ],
      headlineLabel: "Weekly sessions",
      headlineValue: "84,921",
      headlineDelta: "▲ 23.4%",
      channels: [
        { label: "Organic search", pct: 78, tint: TINT_ORANGE },
        { label: "Paid media", pct: 62, tint: TINT_AMBER },
        { label: "Owned + email", pct: 41, tint: TINT_ROSE },
      ],
      callouts: ["CVR up 37% MoM", "Pipeline accelerating"],
    },
  },
  "seo-services": {
    pill: "Organic visibility",
    related: ["technical-seo", "local-seo", "ecommerce-seo", "content-marketing"],
    proof: [
      { value: "412", label: "Top-3 rankings won" },
      { value: "186%", label: "Organic traffic lift" },
      { value: "9+", label: "Years in SEO" },
      { value: "Mid-month", label: "Reporting cadence" },
    ],
    dashMeta: {
      visual: "ranking",
      dashTitle: "serp.tracker",
      kpis: [
        { label: "#1–3 rankings", value: "412", icon: "search" },
        { label: "Backlinks (DR60+)", value: "1.2k", icon: "share" },
        { label: "Traffic", value: "+186%", icon: "trending-up" },
      ],
      headlineLabel: "Organic clicks (90d)",
      headlineValue: "312,840",
      headlineDelta: "▲ 41.2%",
      channels: [
        { label: "Brand", pct: 84, tint: TINT_ORANGE },
        { label: "Non-brand", pct: 67, tint: TINT_AMBER },
        { label: "Long-tail", pct: 52, tint: TINT_ROSE },
      ],
      callouts: ["#1 for 42 new keywords", "+186% organic traffic"],
    },
  },
  "local-seo": {
    pill: "Near-me demand",
    related: ["seo-services", "online-reputation-management", "google-ads", "brand-management"],
    proof: [
      { value: "38", label: "Map-pack #1s" },
      { value: "4.9★", label: "Avg. review rating" },
      { value: "212%", label: "Call-volume lift" },
      { value: "Multi-loc", label: "Franchise-ready" },
    ],
    dashMeta: {
      visual: "ranking",
      dashTitle: "local.serp",
      kpis: [
        { label: "Map pack #1", value: "38", icon: "search" },
        { label: "Calls (30d)", value: "+212%", icon: "trending-up" },
        { label: "Direction taps", value: "1,840", icon: "target" },
      ],
      headlineLabel: "GBP impressions (30d)",
      headlineValue: "146,512",
      headlineDelta: "▲ 58.3%",
      channels: [
        { label: "Discovery search", pct: 72, tint: TINT_ORANGE },
        { label: "Maps surface", pct: 65, tint: TINT_AMBER },
        { label: "Branded search", pct: 48, tint: TINT_ROSE },
      ],
      callouts: ["38 map-pack #1 wins", "Reviews up 4.7→4.9★"],
    },
  },
  "ecommerce-seo": {
    pill: "Catalog scale",
    related: ["technical-seo", "seo-services", "ppc-services", "content-marketing"],
    proof: [
      { value: "12.4k", label: "PDPs optimized" },
      { value: "94%", label: "Organic revenue lift" },
      { value: "8.2k", label: "Rich-result eligible URLs" },
      { value: "Shopify+", label: "Magento, custom OK" },
    ],
    dashMeta: {
      visual: "metrics",
      dashTitle: "store.seo",
      kpis: [
        { label: "Indexed PDPs", value: "12.4k", icon: "search" },
        { label: "Revenue/Org.", value: "+94%", icon: "trending-up" },
        { label: "Rich results", value: "8,210", icon: "star" },
      ],
      headlineLabel: "Organic revenue (90d)",
      headlineValue: "₹3.42 Cr",
      headlineDelta: "▲ 94.0%",
      channels: [
        { label: "Category pages", pct: 81, tint: TINT_ORANGE },
        { label: "Product detail", pct: 74, tint: TINT_AMBER },
        { label: "Editorial hubs", pct: 49, tint: TINT_ROSE },
      ],
      callouts: ["94% organic revenue lift", "8.2k rich-result eligible PDPs"],
    },
  },
  "technical-seo": {
    pill: "Engineering SEO",
    related: ["seo-services", "website-development", "ecommerce-seo", "answer-engine-optimization"],
    proof: [
      { value: "98.6%", label: "Pages crawlable" },
      { value: "1.8s", label: "Median LCP" },
      { value: "0%", label: "Migration traffic loss" },
      { value: "Logs", label: "Log-file analysis" },
    ],
    dashMeta: {
      visual: "code",
      dashTitle: "site.health",
      kpis: [
        { label: "LCP", value: "1.8s", delta: "good", icon: "zap" },
        { label: "CWV pass", value: "92%", icon: "shield" },
        { label: "Crawl errors", value: "−87%", icon: "target" },
      ],
      headlineLabel: "Pages crawlable",
      headlineValue: "98.6%",
      headlineDelta: "▲ from 71%",
      channels: [
        { label: "Mobile usability", pct: 96, tint: TINT_EMERALD },
        { label: "Indexable URLs", pct: 91, tint: TINT_ORANGE },
        { label: "Schema coverage", pct: 78, tint: TINT_AMBER },
      ],
      callouts: ["Migration: 0% traffic loss", "INP within budget"],
    },
  },
  "social-media-marketing": {
    pill: "Community & creative",
    related: ["facebook-ads", "influencer-marketing", "content-marketing", "brand-management"],
    proof: [
      { value: "8.4M", label: "Monthly reach" },
      { value: "62%", label: "Engagement lift" },
      { value: "5", label: "Platforms covered" },
      { value: "Daily", label: "Community ops" },
    ],
    dashMeta: {
      visual: "social",
      dashTitle: "social.os",
      kpis: [
        { label: "Reach (30d)", value: "8.4M", icon: "users" },
        { label: "Engagement", value: "+62%", icon: "trending-up" },
        { label: "Followers", value: "+24.1k", icon: "share" },
      ],
      headlineLabel: "Social engagements (90d)",
      headlineValue: "1.42M",
      headlineDelta: "▲ 62.4%",
      channels: [
        { label: "Instagram", pct: 84, tint: TINT_ROSE },
        { label: "LinkedIn", pct: 72, tint: TINT_SKY },
        { label: "X / Threads", pct: 56, tint: TINT_VIOLET },
      ],
      callouts: ["Engagement up 62% MoM", "+24k followers in 90 days"],
    },
  },
  "google-ads": {
    pill: "Paid performance",
    related: ["ppc-services", "facebook-ads", "ecommerce-seo", "social-media-marketing"],
    proof: [
      { value: "8.1×", label: "Blended ROAS" },
      { value: "34%", label: "CPC reduction" },
      { value: "GA4", label: "Server-side tagging" },
      { value: "Daily", label: "Optimization cadence" },
    ],
    dashMeta: {
      visual: "metrics",
      dashTitle: "ads.cockpit",
      kpis: [
        { label: "ROAS", value: "8.1×", icon: "target" },
        { label: "CPC", value: "−34%", icon: "trending-up" },
        { label: "Conversions", value: "1,940", icon: "users" },
      ],
      headlineLabel: "Conversion value (30d)",
      headlineValue: "₹1.86 Cr",
      headlineDelta: "▲ 71.0%",
      channels: [
        { label: "Search", pct: 82, tint: TINT_ORANGE },
        { label: "P-Max / Shopping", pct: 76, tint: TINT_AMBER },
        { label: "YouTube", pct: 48, tint: TINT_ROSE },
      ],
      callouts: ["8.1× blended ROAS", "CPL down 34%"],
    },
  },
  "ppc-services": {
    pill: "Performance media",
    related: ["google-ads", "facebook-ads", "social-media-marketing", "ecommerce-seo"],
    proof: [
      { value: "9+", label: "Years in PPC" },
      { value: "182%", label: "Conv. uplift (avg.)" },
      { value: "Mid-month", label: "Reports + reviews" },
      { value: "Multi", label: "Search · Display · Video" },
    ],
    dashMeta: {
      visual: "metrics",
      dashTitle: "ppc.cockpit",
      kpis: [
        { label: "Conversions", value: "+182%", icon: "trending-up" },
        { label: "Cost / lead", value: "−41%", icon: "target" },
        { label: "Quality score", value: "8.7", icon: "star" },
      ],
      headlineLabel: "Pipeline value (90d)",
      headlineValue: "₹4.12 Cr",
      headlineDelta: "▲ 84.6%",
      channels: [
        { label: "Search ads", pct: 86, tint: TINT_ORANGE },
        { label: "Display + video", pct: 64, tint: TINT_AMBER },
        { label: "Remarketing", pct: 58, tint: TINT_ROSE },
      ],
      callouts: ["CPL down 41% in 60 days", "Daily creative rotation"],
    },
  },
  "facebook-ads": {
    pill: "Meta performance",
    related: ["google-ads", "ppc-services", "influencer-marketing", "social-media-marketing"],
    proof: [
      { value: "5.6×", label: "Avg. ROAS" },
      { value: "9.3", label: "Event match quality" },
      { value: "Weekly", label: "Creative sprints" },
      { value: "B2B+B2C", label: "Funnels delivered" },
    ],
    dashMeta: {
      visual: "metrics",
      dashTitle: "meta.os",
      kpis: [
        { label: "ROAS", value: "5.6×", icon: "target" },
        { label: "EMQ", value: "9.3", icon: "shield" },
        { label: "Hook rate", value: "37%", icon: "trending-up" },
      ],
      headlineLabel: "Purchases (30d)",
      headlineValue: "11,230",
      headlineDelta: "▲ 49.0%",
      channels: [
        { label: "Prospecting", pct: 76, tint: TINT_AMBER },
        { label: "Retargeting", pct: 64, tint: TINT_ROSE },
        { label: "Catalog DABA", pct: 58, tint: TINT_ORANGE },
      ],
      callouts: ["CAPI live + dedupe ✓", "Creative refresh weekly"],
    },
  },
  "online-reputation-management": {
    pill: "Trust engineering",
    related: ["brand-management", "public-relations", "content-marketing", "local-seo"],
    proof: [
      { value: "9/10", label: "Page-1 owned/positive" },
      { value: "4.9★", label: "Average rating" },
      { value: "Ethical", label: "No black-hat tactics" },
      { value: "24/7", label: "Monitoring" },
    ],
    dashMeta: {
      visual: "reputation",
      dashTitle: "trust.signals",
      kpis: [
        { label: "Avg. rating", value: "4.9★", icon: "star" },
        { label: "Reviews (90d)", value: "+612", icon: "trending-up" },
        { label: "SERP page-1", value: "9 / 10", icon: "shield" },
      ],
      headlineLabel: "Brand sentiment",
      headlineValue: "94%",
      headlineDelta: "▲ from 71%",
      channels: [
        { label: "Google reviews", pct: 92, tint: TINT_EMERALD },
        { label: "Industry sites", pct: 78, tint: TINT_ORANGE },
        { label: "Social mentions", pct: 64, tint: TINT_ROSE },
      ],
      callouts: ["9/10 page-1 SERP slots", "Negative URLs suppressed"],
    },
  },
  "public-relations": {
    pill: "Authority & coverage",
    related: ["brand-management", "online-reputation-management", "content-marketing", "social-media-marketing"],
    proof: [
      { value: "24", label: "Tier-1 placements" },
      { value: "62M", label: "Earned reach" },
      { value: "DR70+", label: "Backlinks earned" },
      { value: "Crisis", label: "Playbooks ready" },
    ],
    dashMeta: {
      visual: "press",
      dashTitle: "pr.coverage",
      kpis: [
        { label: "Tier-1 hits", value: "24", icon: "star" },
        { label: "Share of voice", value: "+38%", icon: "trending-up" },
        { label: "Backlinks (DR70+)", value: "146", icon: "share" },
      ],
      headlineLabel: "Estimated reach",
      headlineValue: "62.4M",
      headlineDelta: "▲ 55.9%",
      channels: [
        { label: "National press", pct: 82, tint: TINT_AMBER },
        { label: "Industry trades", pct: 68, tint: TINT_ORANGE },
        { label: "Newsletters / podcasts", pct: 54, tint: TINT_ROSE },
      ],
      callouts: ["Featured: ET, Mint, YourStory", "DR-70+ links earned"],
    },
  },
  "brand-management": {
    pill: "Reputation & trust",
    related: ["online-reputation-management", "public-relations", "content-marketing", "social-media-marketing"],
    proof: [
      { value: "9/10", label: "Owned page-1 slots" },
      { value: "94%", label: "Positive sentiment" },
      { value: "Semrush", label: "Ahrefs, BrandMentions" },
      { value: "9+", label: "Years experience" },
    ],
    dashMeta: {
      visual: "reputation",
      dashTitle: "brand.health",
      kpis: [
        { label: "Brand search", value: "+74%", icon: "trending-up" },
        { label: "Sentiment", value: "94%", icon: "shield" },
        { label: "Share of voice", value: "+28%", icon: "share" },
      ],
      headlineLabel: "Branded SERPs cleaned",
      headlineValue: "9 of 10",
      headlineDelta: "▲ from 4 of 10",
      channels: [
        { label: "Owned assets", pct: 88, tint: TINT_ORANGE },
        { label: "Earned media", pct: 71, tint: TINT_AMBER },
        { label: "Review platforms", pct: 64, tint: TINT_ROSE },
      ],
      callouts: ["Suppression with SEO assets", "Mid-month + monthly reports"],
    },
  },
  "content-marketing": {
    pill: "Editorial ROI",
    related: ["seo-services", "social-media-marketing", "influencer-marketing", "answer-engine-optimization"],
    proof: [
      { value: "186", label: "Top-3 articles" },
      { value: "42%", label: "Assisted conv. lift" },
      { value: "AI+SME", label: "Editorial workflow" },
      { value: "Weekly", label: "Refresh sprints" },
    ],
    dashMeta: {
      visual: "press",
      dashTitle: "editorial.os",
      kpis: [
        { label: "Top-3 articles", value: "186", icon: "search" },
        { label: "Assisted conv.", value: "+42%", icon: "trending-up" },
        { label: "Refresh cadence", value: "Weekly", icon: "target" },
      ],
      headlineLabel: "Pipeline-influenced",
      headlineValue: "₹2.18 Cr",
      headlineDelta: "▲ 64.0%",
      channels: [
        { label: "Pillar guides", pct: 84, tint: TINT_ORANGE },
        { label: "Comparison + how-to", pct: 72, tint: TINT_AMBER },
        { label: "Newsletter / nurture", pct: 58, tint: TINT_ROSE },
      ],
      callouts: ["186 articles ranking top-3", "SME-led, AI-assisted"],
    },
  },
  "influencer-marketing": {
    pill: "Creator partnerships",
    related: ["social-media-marketing", "facebook-ads", "content-marketing", "brand-management"],
    proof: [
      { value: "12.6M", label: "Reach delivered" },
      { value: "5.4%", label: "Avg. engagement" },
      { value: "240+", label: "UGC assets / quarter" },
      { value: "Vetted", label: "Audience auth checks" },
    ],
    dashMeta: {
      visual: "social",
      dashTitle: "creator.os",
      kpis: [
        { label: "Reach", value: "12.6M", icon: "users" },
        { label: "Engagement", value: "5.4%", icon: "trending-up" },
        { label: "UGC assets", value: "+240", icon: "share" },
      ],
      headlineLabel: "Attributed conversions",
      headlineValue: "9,420",
      headlineDelta: "▲ 47.2%",
      channels: [
        { label: "Nano + micro creators", pct: 82, tint: TINT_ROSE },
        { label: "Mid-tier", pct: 64, tint: TINT_AMBER },
        { label: "Whitelisted ads", pct: 51, tint: TINT_ORANGE },
      ],
      callouts: ["240 UGC assets produced", "Whitelisting enabled"],
    },
  },
  "website-development": {
    pill: "Build & ship",
    related: ["technical-seo", "seo-services", "answer-engine-optimization", "ecommerce-seo"],
    proof: [
      { value: "98", label: "Mobile Lighthouse" },
      { value: "1.4s", label: "Median LCP" },
      { value: "WCAG-AA", label: "Accessibility built-in" },
      { value: "Next.js", label: "Headless / WP / custom" },
    ],
    dashMeta: {
      visual: "code",
      dashTitle: "build.lab",
      kpis: [
        { label: "Lighthouse", value: "98", icon: "zap" },
        { label: "LCP", value: "1.4s", icon: "trending-up" },
        { label: "CRO uplift", value: "+38%", icon: "target" },
      ],
      headlineLabel: "Form submits (30d)",
      headlineValue: "3,210",
      headlineDelta: "▲ 38.2%",
      channels: [
        { label: "Performance budget", pct: 96, tint: TINT_EMERALD },
        { label: "Accessibility (AA)", pct: 92, tint: TINT_ORANGE },
        { label: "Schema coverage", pct: 84, tint: TINT_AMBER },
      ],
      callouts: ["Lighthouse 98 on mobile", "GA4 + experimentation in"],
    },
  },
  "generative-engine-optimization": {
    pill: "AI discovery",
    related: ["answer-engine-optimization", "seo-services", "content-marketing", "technical-seo"],
    proof: [
      { value: "5", label: "Engines tracked" },
      { value: "184", label: "Verified citations" },
      { value: "212%", label: "Inclusion uplift" },
      { value: "Entity", label: "Knowledge-graph aware" },
    ],
    dashMeta: {
      visual: "ai",
      dashTitle: "geo.lab",
      kpis: [
        { label: "AI citations", value: "184", icon: "share" },
        { label: "Engines covered", value: "5", icon: "target" },
        { label: "Brand inclusion", value: "+212%", icon: "trending-up" },
      ],
      headlineLabel: "Conversational visibility",
      headlineValue: "73%",
      headlineDelta: "▲ from 18%",
      channels: [
        { label: "ChatGPT", pct: 86, tint: TINT_EMERALD },
        { label: "Gemini", pct: 72, tint: TINT_SKY },
        { label: "Perplexity", pct: 64, tint: TINT_VIOLET },
      ],
      callouts: ["184 verified AI citations", "Entity graph mapped"],
    },
  },
  "answer-engine-optimization": {
    pill: "Preferred answers",
    related: ["generative-engine-optimization", "seo-services", "content-marketing", "technical-seo"],
    proof: [
      { value: "94", label: "Answer-box placements" },
      { value: "62", label: "AI Overview citations" },
      { value: "Schema", label: "FAQ · HowTo · Org" },
      { value: "E-E-A-T", label: "Authority engineered" },
    ],
    dashMeta: {
      visual: "ai",
      dashTitle: "aeo.lab",
      kpis: [
        { label: "Answer boxes", value: "94", icon: "search" },
        { label: "AI Overviews", value: "62", icon: "share" },
        { label: "PAA hits", value: "+148%", icon: "trending-up" },
      ],
      headlineLabel: "Zero-click visibility",
      headlineValue: "68%",
      headlineDelta: "▲ from 22%",
      channels: [
        { label: "Featured snippets", pct: 88, tint: TINT_ORANGE },
        { label: "AI Overviews", pct: 71, tint: TINT_AMBER },
        { label: "People Also Ask", pct: 62, tint: TINT_ROSE },
      ],
      callouts: ["94 answer-box wins", "Schema + entity layer"],
    },
  },
};

async function main() {
  for (const [slug, m] of Object.entries(meta)) {
    const updated = await prisma.service.updateMany({
      where: { slug, deletedAt: null },
      data: {
        pill: m.pill,
        related: m.related,
        proof: m.proof,
        dashMeta: m.dashMeta,
      },
    });
    console.log(`${slug}: ${updated.count} row(s) updated`);
  }
  console.log("Done seeding service meta.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
