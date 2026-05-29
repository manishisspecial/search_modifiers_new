import { getPageContent } from "@/lib/db-queries";
import { siteDefaults } from "@/lib/site-defaults";

/**
 * Editable homepage content. Stored as JSON in PageContent (slug "home").
 * Every field has a sensible default that matches the current design, so the
 * site renders correctly even before anything is edited in the admin panel.
 */
export type HomeContent = {
  hero: {
    badge: string;
    titlePrefix: string;
    titleAccent: string;
    titleSuffix: string;
    subtitle: string;
    bullets: string[];
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    stats: { value: string; label: string }[];
  };
  why: {
    eyebrow: string;
    title: string;
    description: string;
    cards: { title: string; body: string }[];
  };
  midCta: {
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
};

export const defaultHomeContent: HomeContent = {
  hero: {
    badge: "Delhi NCR · Remote-first · Global campaigns",
    titlePrefix: "Growth marketing that feels",
    titleAccent: "inevitable",
    titleSuffix: "— not improvised",
    subtitle: siteDefaults.description,
    bullets: [
      "Dedicated marketing strategist for every account",
      "Fast response times with clear communication",
      "ROI-focused campaigns across SEO, Ads & Social",
      "Transparent monthly reporting & insights",
    ],
    primaryCtaLabel: "Get a custom proposal",
    primaryCtaHref: "/request-quote",
    secondaryCtaLabel: "Free website audit",
    secondaryCtaHref: "/free-website-audit",
    stats: [
      { value: "14+", label: "Years collective exp." },
      { value: "320+", label: "Campaigns shipped" },
      { value: "4.9", label: "Avg. client rating" },
      { value: "24h", label: "First response SLA" },
    ],
  },
  why: {
    eyebrow: "Why Search Modifiers",
    title: "Built for brands that outgrow fragmented agencies",
    description:
      "We're obsessive about craft, speed, and integrity — the trifecta that compounds into unfair advantages.",
    cards: [
      {
        title: "Data-Driven Strategy",
        body: "Every move powered by analytics, market intelligence, and performance data — engineered to maximize ROI.",
      },
      {
        title: "Transparent Reporting",
        body: "Clear monthly dashboards with verified metrics, campaign progress, and expansion opportunities.",
      },
      {
        title: "Full-Service Expertise",
        body: "From web systems and SEO to paid media and social growth, a complete performance ecosystem under one roof.",
      },
      {
        title: "Dedicated Support",
        body: "Rapid communication, proactive updates, and a growth-focused team aligned with your success.",
      },
    ],
  },
  midCta: {
    title: "20-minute fit call — zero pitch deck",
    description:
      "We'll tell you honestly if we're not the right fit. If we are, you'll leave with 2–3 high-leverage ideas either way.",
    ctaLabel: "Book the call",
    ctaHref: "/contact",
  },
};

/** Deep-merge a partial (from DB) over the defaults so missing fields are safe. */
function mergeHomeContent(partial: unknown): HomeContent {
  const p = (partial && typeof partial === "object" ? partial : {}) as Partial<HomeContent>;
  return {
    hero: { ...defaultHomeContent.hero, ...(p.hero ?? {}) },
    why: {
      ...defaultHomeContent.why,
      ...(p.why ?? {}),
      cards: p.why?.cards?.length ? p.why.cards : defaultHomeContent.why.cards,
    },
    midCta: { ...defaultHomeContent.midCta, ...(p.midCta ?? {}) },
  };
}

export async function getHomeContent(): Promise<HomeContent> {
  const record = await getPageContent("home");
  if (!record || !record.fields) return defaultHomeContent;
  return mergeHomeContent(record.fields);
}
