export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  result: string;
  summary: string;
  metrics: { label: string; value: string }[];
  /** Markdown body for /case-studies/[slug] */
  content: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "orm-real-estate-reputation",
    title: "ORM framework that rebuilt trust for a real estate brand",
    industry: "ORM · Real estate",
    result: "+325% verified positive reviews in 6 months",
    summary:
      "Structured, KPI-driven ORM: multi-platform review lifecycle, sentiment analysis, and recovery workflows. Google Business Profile tuned for entity signals and conversions; response engineering and review dilution to rebalance sentiment — plus ongoing engagement protocols for trust and social proof.",
    metrics: [
      { label: "Google rating", value: "3.2★ → 4.8★" },
      { label: "Negative sentiment", value: "-72%" },
      { label: "Lead-to-conversion", value: "+58%" },
    ],
    content: `
## Context

A low-trust real estate brand needed a disciplined reputation layer — not ad-hoc responses. We re-engineered their digital presence around **measurable trust signals** and a repeatable review lifecycle.

## Execution

- **Review lifecycle management** across major platforms — acquisition, QA, and escalation paths aligned with brand voice.
- **Sentiment analysis** and **reputation recovery** workflows so negative episodes became structured playbooks instead of one-off fire drills.
- **Google Business Profile (GBP)** optimization: entity signals, **NAP consistency**, and conversion-focused profile modules.
- **Negative feedback mitigation** through response engineering, review dilution, and escalation handling — rebalancing visibility in branded SERPs.
- **Continuous engagement** protocols to compound social proof on high-intent discovery surfaces.

## Outcomes

- **+325%** increase in verified positive reviews within six months.
- Google rating improved from **3.2★ → 4.8★**.
- **72%** reduction in negative sentiment via active response and dilution strategies.
- **+58%** uplift in lead-to-conversion rate driven by stronger credibility signals.
    `.trim(),
  },
  {
    slug: "seo-healthcare-authority",
    title: "Healthcare brand repositioned as a page-one SERP authority",
    industry: "SEO · Healthcare",
    result: "+248% organic traffic in 9 months",
    summary:
      "Full-stack SEO: technical depth (crawl budget, CWV, schema), local SEO with GBP and entities, and YMYL-aligned medical content. Authority link acquisition strengthened domain trust and topical relevance for high-intent patient queries.",
    metrics: [
      { label: "Organic traffic", value: "+248%" },
      { label: "Top 3 keywords", value: "87+" },
      { label: "High-intent visibility", value: "SERP-wide" },
    ],
    content: `
## Context

A healthcare brand faced **low organic visibility** in a crowded, YMYL-heavy landscape. The goal was durable **page-one authority** for high-commercial-intent service clusters — without risking trust or compliance.

## Execution

- **Technical SEO**: crawl budget optimization, Core Web Vitals discipline, rendering/indexation hygiene, and **structured data / schema** where it materially helps eligibility and clarity.
- **Local SEO**: GBP optimization, NAP and entity consistency, and localized relevance for priority markets.
- **E-E-A-T–aligned medical content** mapped to intent and physician oversight workflows.
- **Authority link acquisition** to strengthen domain trust and topical relevance for competitive head and mid-tail queries.

## Outcomes

- **+248%** increase in organic traffic within nine months.
- **Top 3** rankings for **87+** high-commercial-intent keywords.
- Broad **SERP footprint** across priority treatment and service categories — visibility that compounds as authority deepens.
    `.trim(),
  },
  {
    slug: "social-education-growth",
    title: "Education brand re-architected for social-led acquisition",
    industry: "Social media · Education",
    result: "+410% engagement rate in 5 months",
    summary:
      "Full-funnel social growth: short-form Reels, algorithm-aligned distribution, performance funnels for admissions, and community engagement to capture, qualify, and nurture high-intent student cohorts at scale.",
    metrics: [
      { label: "Net followers", value: "+32K" },
      { label: "Admission inquiries", value: "+178%" },
      { label: "Growth scope", value: "Organic + paid" },
    ],
    content: `
## Context

A legacy education institute needed social to do more than “post for presence.” The mandate was a **conversion-centric acquisition engine** — short-form discovery, qualified conversations, and predictable inquiry volume.

## Execution

- **Content architecture** that balanced Reels-first creative with program-level proof and deadlines.
- **Algorithm-aligned distribution** — posting rhythms, hooks, and retention patterns tuned for platform dynamics.
- **Performance marketing funnels** for admissions (lead forms, events, and counselor handoffs).
- **Community-centric engagement** — replies, UGC, and cohort-building that reduced cost-to-conversation over time.

## Outcomes

- **+410%** uplift in engagement rate within five months.
- **+32K** net follower acquisition (**organic + paid**).
- **+178%** increase in qualified admission inquiries.
    `.trim(),
  },
  {
    slug: "pr-startup-launch-visibility",
    title: "Startup launch PR that scaled media visibility and demand",
    industry: "PR · Startup",
    result: "20+ tier-1 & niche media placements",
    summary:
      "Digital PR and positioning: targeted press outreach, high-authority placements, and narrative-driven storytelling to build credibility, amplify awareness, and lift demand across search and referral channels.",
    metrics: [
      { label: "Brand mentions", value: "+260%" },
      { label: "Referral traffic", value: "+88%" },
      { label: "Branded search interest", value: "+47%" },
    ],
    content: `
## Context

A startup launch needed **credible third-party proof** fast — not vanity impressions. We focused on **tier-appropriate placements**, narrative consistency, and demand signals that downstream channels could amplify.

## Execution

- **Digital PR & positioning**: sharpened founder and category storylines for journalist-ready pitching.
- **Targeted outreach** to tier-1 and niche publications aligned with investor and buyer audiences.
- **Narrative-driven storytelling** — proof points, traction hooks, and executive POV assets reusable across site and sales.
- Measurement across **mentions**, **referral traffic**, and **branded search** to validate lift, not just column inches.

## Outcomes

- **20+** tier-1 and niche media placements.
- **+260%** growth in brand mentions across digital ecosystems.
- **+88%** increase in referral traffic from media sources.
- **+47%** uplift in branded search interest and query volume — authority that showed up where buyers actually look.
    `.trim(),
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return caseStudies.map((c) => c.slug);
}
