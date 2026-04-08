export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  result: string;
  summary: string;
  metrics: { label: string; value: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "fintech-pipeline",
    title: "Tripling SQL volume for a Series B fintech",
    industry: "Fintech",
    result: "+214% SQLs in 9 months",
    summary:
      "Rebuilt paid search structure, launched topical SEO clusters, and aligned landing pages to risk-aware messaging for Indian regulators and retail users.",
    metrics: [
      { label: "CPL", value: "-38%" },
      { label: "Organic sessions", value: "+2.4×" },
      { label: "Demo rate", value: "+22%" },
    ],
  },
  {
    slug: "d2c-launch",
    title: "Category launch for a premium D2C home brand",
    industry: "E-commerce",
    result: "Sold out first drop in 11 days",
    summary:
      "Meta creative sprints, micro-influencer pods, and CRO on collection pages — with feed-driven catalog ads and post-purchase review loops.",
    metrics: [
      { label: "ROAS", value: "4.2×" },
      { label: "CTR uplift", value: "+61%" },
      { label: "Repeat purchase", value: "28%" },
    ],
  },
  {
    slug: "b2b-saas",
    title: "Enterprise SEO for a B2B SaaS platform",
    industry: "SaaS",
    result: "Page-one visibility for 140 head terms",
    summary:
      "Technical remediation on a Next.js app, programmatic integration pages, and digital PR that earned product-led backlinks.",
    metrics: [
      { label: "Signups from organic", value: "+89%" },
      { label: "Indexed templates", value: "+12k" },
      { label: "CWV pass", value: "94%" },
    ],
  },
  {
    slug: "healthcare-trust",
    title: "ORM & local SEO for a multi-clinic healthcare group",
    industry: "Healthcare",
    result: "4.8★ average across 22 locations",
    summary:
      "GBP governance, ethical review programs, and localized landing pages with medical disclaimers and schema.",
    metrics: [
      { label: "Map pack visibility", value: "+47%" },
      { label: "Call tracking", value: "+31%" },
      { label: "Negative mention decay", value: "-62%" },
    ],
  },
];
