export type LocationPage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  headline: string;
  intro: string;
  sections: { heading: string; body: string }[];
  localStats: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
};

export const locationSlugs = [
  "digital-marketing-delhi",
  "digital-marketing-noida",
  "digital-marketing-gurgaon",
  "seo-delhi-ncr",
  "orm-delhi",
] as const;

export const locations: LocationPage[] = [
  {
    slug: "digital-marketing-delhi",
    title: "Digital Marketing Company in Delhi",
    metaTitle: "Digital Marketing Company in Delhi | Search Modifiers",
    metaDescription:
      "Delhi’s performance marketing partner for SEO, paid media, and growth creative. Search Modifiers helps brands across CP, Saket, and NCR scale with clarity.",
    heroEyebrow: "Delhi & NCR",
    headline: "Digital marketing built for Delhi’s pace",
    intro:
      "From Connaught Place enterprises to Saket D2C brands, we run disciplined acquisition programs that respect your margins and brand standards.",
    sections: [
      {
        heading: "Why Delhi brands choose Search Modifiers",
        body: "We combine global playbooks with local nuance — Hindi–English creative, festival calendars, and metro-wide targeting that actually maps to your stores and service areas.",
      },
      {
        heading: "What we deliver on the ground",
        body: "Weekly performance reviews, on-site workshops when needed, and squads aligned to your OKRs. Whether you’re in Lutyens’ Delhi or expanding across the capital region, we keep execution tight.",
      },
    ],
    localStats: [
      { label: "Avg. client NPS", value: "72" },
      { label: "Campaign experiments / quarter", value: "120+" },
      { label: "Delhi NCR clients", value: "45+" },
    ],
    faqs: [
      {
        q: "Do you meet clients in person in Delhi?",
        a: "Yes — we schedule quarterly business reviews and workshops across Delhi NCR.",
      },
      {
        q: "Can you support Hindi creatives?",
        a: "Absolutely. We produce bilingual assets and landing pages tuned for local intent.",
      },
    ],
  },
  {
    slug: "digital-marketing-noida",
    title: "Digital Marketing Company in Noida",
    metaTitle: "Digital Marketing Company in Noida | Search Modifiers",
    metaDescription:
      "Growth marketing for Noida’s tech corridor: SEO, Google Ads, Meta, and content for SaaS, edtech, and e-commerce teams based in Sector 62, 18, and Film City.",
    heroEyebrow: "Noida",
    headline: "Marketing velocity for Noida’s product teams",
    intro:
      "Noida’s density of SaaS and D2C operators demands fast feedback loops. We embed with your growth pod and ship experiments weekly.",
    sections: [
      {
        heading: "Built for Noida’s operator culture",
        body: "Slack-first communication, shared dashboards, and engineering-friendly SEO that doesn’t block releases.",
      },
      {
        heading: "Sector coverage",
        body: "We actively support teams across Sector 62, 18, Film City, and Greater Noida West — with localized campaigns where it moves the needle.",
      },
    ],
    localStats: [
      { label: "B2B SaaS retainers", value: "18" },
      { label: "Median CPL improvement", value: "34%" },
      { label: "Experiment velocity", value: "2× baseline" },
    ],
    faqs: [
      { q: "Do you understand long sales cycles?", a: "Yes — we map content and paid programs to pipeline stages and CRM stages." },
      { q: "Can you align with our dev sprints?", a: "We write tickets, join grooming when helpful, and QA releases." },
    ],
  },
  {
    slug: "digital-marketing-gurgaon",
    title: "Digital Marketing Company in Gurgaon",
    metaTitle: "Digital Marketing Company in Gurgaon | Search Modifiers",
    metaDescription:
      "Premium digital marketing for Gurgaon HQ brands: performance creative, executive reporting, and global-ready campaigns from Cyber City to Golf Course Road.",
    heroEyebrow: "Gurugram",
    headline: "Board-ready marketing for Gurgaon HQs",
    intro:
      "Gurgaon teams expect polish and precision. We deliver agency-grade creative with consultant-level narrative for leadership updates.",
    sections: [
      {
        heading: "Enterprise cadence",
        body: "Security reviews, vendor onboarding, and procurement-friendly SOWs — we’ve done it for financial services, consulting, and luxury retail HQs.",
      },
      {
        heading: "Cyber City to Sohna Road",
        body: "We support brands across Udyog Vihar, DLF Cyber City, and Golf Course Extension with hybrid engagement models.",
      },
    ],
    localStats: [
      { label: "Fortune 500 adjacency clients", value: "12" },
      { label: "Avg. exec deck refresh", value: "Monthly" },
      { label: "Languages supported", value: "EN + HI" },
    ],
    faqs: [
      { q: "Can you sign NDAs and MSAs quickly?", a: "Yes — we maintain standard templates and can adapt to your legal team’s clauses." },
      { q: "Global campaigns from Gurgaon?", a: "We run multi-region paid and SEO programs with localized landing pages." },
    ],
  },
  {
    slug: "seo-delhi-ncr",
    title: "SEO Company in Delhi NCR",
    metaTitle: "SEO Company in Delhi NCR | Search Modifiers",
    metaDescription:
      "Technical SEO, content clusters, and digital PR for Delhi NCR brands competing in India and abroad. Audits, retainers, and migration support.",
    heroEyebrow: "Delhi NCR SEO",
    headline: "SEO that respects your roadmap",
    intro:
      "Delhi NCR companies need SEO partners who speak both marketing and engineering. We bridge GSC data with Jira tickets and ship fixes that stick.",
    sections: [
      {
        heading: "Technical depth",
        body: "JavaScript rendering, Core Web Vitals, internationalization, and faceted navigation — we’ve solved these for large Indian publishers and e-commerce catalogs.",
      },
      {
        heading: "Content with teeth",
        body: "Topical clusters informed by Search Console, competitor gap analysis, and SME interviews — not generic blog filler.",
      },
    ],
    localStats: [
      { label: "Enterprise SEO audits", value: "90+" },
      { label: "Avg. indexed page lift (Y1)", value: "2.1×" },
      { label: "Migration success rate", value: "100%" },
    ],
    faqs: [
      { q: "Do you offer one-time audits?", a: "Yes — with prioritized tickets and dev-ready documentation." },
      { q: "Hindi SEO?", a: "We optimize for Devanagari queries and bilingual SERP features where relevant." },
    ],
  },
  {
    slug: "orm-delhi",
    title: "ORM Company in Delhi",
    metaTitle: "ORM Company in Delhi | Search Modifiers",
    metaDescription:
      "Online reputation management for Delhi brands: review programs, SERP shaping, crisis response, and executive visibility — discreet and compliant.",
    heroEyebrow: "Reputation",
    headline: "Shape what Delhi sees first",
    intro:
      "In a dense market, your first page of Google is a balance sheet item. We help Delhi leaders manage narrative with ethical, durable strategies.",
    sections: [
      {
        heading: "Delhi-specific sensitivities",
        body: "We understand regional forums, local news cycles, and high-velocity social chatter — and we respond with pre-approved playbooks.",
      },
      {
        heading: "Reviews & listings",
        body: "GBP optimization for multi-location Delhi businesses, plus vertical-specific review sites that matter in India.",
      },
    ],
    localStats: [
      { label: "Crisis simulations run", value: "30+" },
      { label: "Avg. review response time", value: "< 4h" },
      { label: "SERP projects", value: "55+" },
    ],
    faqs: [
      { q: "Is ORM the same as PR?", a: "Overlapping but distinct — ORM focuses on searchable surfaces and reviews; we partner with PR when needed." },
      { q: "Can you train our comms team?", a: "Yes — workshops and tabletop exercises are part of our retainers." },
    ],
  },
];

export function getLocationBySlug(slug: string): LocationPage | undefined {
  return locations.find((l) => l.slug === slug);
}
