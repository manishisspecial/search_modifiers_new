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
  stickyCta: {
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
  };
  logoWall: {
    label: string;
  };
  conversionBar: {
    eyebrow: string;
    title: string;
    items: { text: string }[];
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  servicesStack: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      slug: string;
      index: string;
      title: string;
      description: string;
      bullets: string[];
    }[];
  };
  approach: {
    eyebrow: string;
    title: string;
    description: string;
    steps: {
      step: string;
      title: string;
      description: string;
      deliverables: string[];
    }[];
  };
  impactRibbon: {
    eyebrow: string;
    title: string;
    description: string;
    metrics: {
      label: string;
      value: string;
      prefix: string;
      suffix: string;
      caption: string;
    }[];
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
  caseStudiesHeading: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  testimonialsHeading: {
    eyebrow: string;
    title: string;
    description: string;
  };
  blogHeading: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  portfolioHeading: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  megaCta: {
    headlineTop: string;
    headlineAccent: string;
    subtitle: string;
    orbLabel: string;
    orbHref: string;
    contactTiles: { label: string; value: string; href: string }[];
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
  stickyCta: {
    title: "Free site audit — 2-day turnaround",
    subtitle: "Technical SEO, speed & CRO notes you can ship.",
    ctaLabel: "Claim yours →",
    ctaHref: "/free-website-audit",
  },
  logoWall: {
    label: "Trusted by growth teams at",
  },
  conversionBar: {
    eyebrow: "Start with clarity",
    title: "Get a prioritized growth roadmap — before you sign anything",
    items: [
      { text: "Free ORM + SEO Audit Report" },
      { text: "Strategy call in 48 hours" },
      { text: "Connect Experts - Not Sales Team" },
    ],
    primaryCtaLabel: "Get free website audit",
    primaryCtaHref: "/free-website-audit",
    secondaryCtaLabel: "Request a quote",
    secondaryCtaHref: "/request-quote",
  },
  servicesStack: {
    eyebrow: "Capabilities",
    title: "Full-funnel services — one accountable partner",
    description:
      "From ORM, to branding, SEO, PR, social media, paid ads, we engineer a unified growth ecosystem connecting search discovery, brand trust, and conversion performance.",
    items: [
      {
        slug: "online-reputation-management",
        index: "01",
        title: "Online Reputation Management (ORM)",
        description:
          "Proactive review ecosystems, negative-result suppression, and SERP defense frameworks — building trust signals that compound quietly over time.",
        bullets: [
          "Negative link suppression & removal",
          "Google review management & improvement",
          "Brand monitoring & reputation control",
          "Positive content creation & promotion",
        ],
      },
      {
        slug: "seo-services",
        index: "02",
        title: "Search Engine Optimization (SEO)",
        description:
          "Technical SEO frameworks, authority growth, and search-intent optimization — driving qualified organic traffic, and consistent lead flow visibility beyond vanity rankings.",
        bullets: [
          "Keyword research & on-page optimization",
          "Technical SEO to improve site performance",
          "High-quality content to boost rankings & traffic",
          "Link building to increase authority",
        ],
      },
      {
        slug: "public-relations",
        index: "03",
        title: "Public Relations (Digital PR & Brand Authority)",
        description:
          "Strategic media positioning, AI-driven narrative amplification, and authority-building PR frameworks strengthening brand credibility, increasing visibility, and securing high-impact coverage across digital and traditional media channels.",
        bullets: [
          "Press release creation & distribution",
          "Media outreach & journalist connections",
          "Brand reputation management",
          "High-authority publication placements",
        ],
      },
      {
        slug: "google-ads",
        index: "04",
        title: "Paid Advertising (Google & Social Ads)",
        description:
          "AI-optimized ad engines, precision audience mapping, and conversion-reactor campaign systems — activating lead generation, accelerating sales momentum, and maximizing ROAS across every traffic channel.",
        bullets: [
          "Google Ads & Meta Ads campaign setup",
          "High-converting ad creatives & copy",
          "Audience targeting & retargeting strategies",
          "Continuous optimization for better ROI",
        ],
      },
      {
        slug: "social-media-marketing",
        index: "05",
        title: "Social Media Marketing",
        description:
          "Content engines, platform-native growth strategies, and real-time audience engagement loops — scaling social presence, increasing follower velocity, and turning attention into loyal communities.",
        bullets: [
          "Content creation & posting strategy",
          "Instagram, Facebook & LinkedIn management",
          "Audience growth & engagement",
          "Influencer & brand collaborations",
        ],
      },
      {
        slug: "website-development",
        index: "06",
        title: "Website Development",
        description:
          "High-speed web architecture, modern interface systems, and conversion-optimized digital environments, elevating brand perception, engaging incoming traffic, and transforming visitors into customers.",
        bullets: [
          "Custom website design tailored to your brand",
          "Mobile-friendly & responsive development",
          "SEO-ready structure & fast loading speed",
          "Conversion-focused pages & lead generation setup",
        ],
      },
      {
        slug: "generative-engine-optimization",
        index: "07",
        title: "GEO – Generative Engine Optimization",
        description:
          "Generative-search visibility systems, AI citation frameworks, and entity-authority optimization — positioning your brand inside ChatGPT, Gemini, Perplexity, and next-gen answer engines to capture demand before clicks happen.",
        bullets: [
          "Generative-search content systems engineered for AI discovery",
          "Brand citation optimization across ChatGPT, Gemini & AI engines",
          "Entity authority mapping for trusted-source inclusion",
          "Conversational query visibility & zero-click demand capture",
        ],
      },
      {
        slug: "answer-engine-optimization",
        index: "08",
        title: "AEO - Answer Engine Optimization",
        description:
          "Answer-engine architecture, entity-based content systems, and query-intent optimization frameworks — increasing AI search visibility, capturing zero-click traffic, and positioning your brand as the preferred answer source.",
        bullets: [
          "Answer-focused content architecture aligned with AI search intent",
          "Entity optimization & structured data deployment systems",
          "Zero-click visibility growth across Google & answer engines",
          "Authority signal expansion for preferred-source ranking",
        ],
      },
    ],
  },
  approach: {
    eyebrow: "Our approach",
    title: "Growth Systems Engineered for Consistent Results",
    description:
      "A precision growth framework engineered to convert ideas into measurable momentum — generating qualified traffic, increasing brand value, and scaling brands with data-backed confidence.",
    steps: [
      {
        step: "01",
        title: "Strategic Discovery Meeting",
        description:
          "Mission-alignment session focused on decoding your business model, growth objectives, operational friction points, and success metrics — establishing a precision roadmap from day one.",
        deliverables: [
          "Goal discovery & revenue-target mapping",
          "Business requirement intelligence gathering",
          "Target audience behavior analysis",
          "Initial growth-opportunity identification systems",
        ],
      },
      {
        step: "02",
        title: "Project Intelligence Briefing",
        description:
          "Brand intelligence audit analyzing your products, services, market positioning, and current digital footprint — extracting the data required to engineer a high-performance growth strategy.",
        deliverables: [
          "Brand ecosystem & business model analysis",
          "Current performance diagnostics & channel review",
          "Product/service value architecture mapping",
          "Priority objective synchronization systems",
        ],
      },
      {
        step: "03",
        title: "Research & Strategy Engineering",
        description:
          "Competitive intelligence mapping, market-signal analysis, and strategic growth engineering — building a precision roadmap designed for measurable expansion and scalable performance.",
        deliverables: [
          "Competitor intelligence mapping & market-gap analysis",
          "Audience behavior research & intent profiling",
          "Multi-channel strategy architecture planning",
          "Timeline sequencing & execution roadmap systems",
        ],
      },
      {
        step: "04",
        title: "Launch & Execution Systems",
        description:
          "Precision deployment systems launch, manage, and continuously optimize every campaign layer — using real-time monitoring to maximize performance, efficiency, and measurable results.",
        deliverables: [
          "Campaign or website deployment protocols",
          "Performance tracking & analytics integration",
          "Continuous optimization & scaling systems",
          "Monthly intelligence reports & growth insights",
        ],
      },
    ],
  },
  impactRibbon: {
    eyebrow: "Impact at scale",
    title: "Numbers that move boardrooms — not vanity slides",
    description:
      "A snapshot across our 2022–2025 book of work. We track what compounds: margin, payback period, and retained attention.",
    metrics: [
      {
        label: "Organic revenue lifted",
        value: "₹180Cr+",
        prefix: "₹",
        suffix: "Cr+",
        caption: "attributable to SEO programs over 36 months",
      },
      {
        label: "Paid media spend managed",
        value: "$42M+",
        prefix: "$",
        suffix: "M+",
        caption: "across Google, Meta, LinkedIn & programmatic",
      },
      {
        label: "Avg. ROAS (lifecycle)",
        value: "6.4×",
        prefix: "",
        suffix: "×",
        caption: "measured with incrementality, not last-click",
      },
      {
        label: "Clients retained 24+ mo.",
        value: "92%",
        prefix: "",
        suffix: "%",
        caption: "referrals are our real acquisition channel",
      },
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
  caseStudiesHeading: {
    eyebrow: "Proof",
    title: "Case studies with numbers — not adjectives",
    description:
      "A snapshot of recent engagements. Full narratives live on our case studies hub.",
    ctaLabel: "View all case studies",
    ctaHref: "/case-studies",
  },
  testimonialsHeading: {
    eyebrow: "Voices",
    title: "Trusted by operators who hate fluff",
    description:
      "Retention and referrals are our real KPIs. Here's what clients say — references available on request.",
  },
  blogHeading: {
    eyebrow: "Insights",
    title: "Related blog posts",
    description:
      "Long-form notes on SEO, paid media, social, and web — the same frameworks we ship for clients.",
    ctaLabel: "View all",
    ctaHref: "/blog",
  },
  portfolioHeading: {
    eyebrow: "Portfolio",
    title: "Craft, performance, and restraint",
    description:
      "A curated slice of visual and narrative work. For detailed metrics, pair with our case studies.",
    ctaLabel: "View full portfolio",
    ctaHref: "/portfolio",
  },
  megaCta: {
    headlineTop: "Let's make your growth",
    headlineAccent: "inevitable.",
    subtitle:
      "Send us your site — we'll come back with prioritised opportunities, owners, and effort estimates in two business days. No decks.",
    orbLabel: "Start a project",
    orbHref: "/contact",
    contactTiles: [
      { label: "Email us", value: "", href: "" },
      { label: "Response SLA", value: "< 24 hours", href: "" },
      { label: "Free intro call", value: "20 minutes · no pitch", href: "/contact" },
    ],
  },
};

/** Deep-merge a partial (from DB) over the defaults so missing fields are safe. */
function mergeHomeContent(partial: unknown): HomeContent {
  const p = (partial && typeof partial === "object" ? partial : {}) as Partial<HomeContent>;
  return {
    hero: {
      ...defaultHomeContent.hero,
      ...(p.hero ?? {}),
      stats: p.hero?.stats?.length ? p.hero.stats : defaultHomeContent.hero.stats,
      bullets: p.hero?.bullets?.length ? p.hero.bullets : defaultHomeContent.hero.bullets,
    },
    stickyCta: { ...defaultHomeContent.stickyCta, ...(p.stickyCta ?? {}) },
    logoWall: { ...defaultHomeContent.logoWall, ...(p.logoWall ?? {}) },
    conversionBar: {
      ...defaultHomeContent.conversionBar,
      ...(p.conversionBar ?? {}),
      items: p.conversionBar?.items?.length ? p.conversionBar.items : defaultHomeContent.conversionBar.items,
    },
    servicesStack: {
      ...defaultHomeContent.servicesStack,
      ...(p.servicesStack ?? {}),
      items: p.servicesStack?.items?.length ? p.servicesStack.items : defaultHomeContent.servicesStack.items,
    },
    approach: {
      ...defaultHomeContent.approach,
      ...(p.approach ?? {}),
      steps: p.approach?.steps?.length ? p.approach.steps : defaultHomeContent.approach.steps,
    },
    impactRibbon: {
      ...defaultHomeContent.impactRibbon,
      ...(p.impactRibbon ?? {}),
      metrics: p.impactRibbon?.metrics?.length ? p.impactRibbon.metrics : defaultHomeContent.impactRibbon.metrics,
    },
    why: {
      ...defaultHomeContent.why,
      ...(p.why ?? {}),
      cards: p.why?.cards?.length ? p.why.cards : defaultHomeContent.why.cards,
    },
    midCta: { ...defaultHomeContent.midCta, ...(p.midCta ?? {}) },
    caseStudiesHeading: { ...defaultHomeContent.caseStudiesHeading, ...(p.caseStudiesHeading ?? {}) },
    testimonialsHeading: { ...defaultHomeContent.testimonialsHeading, ...(p.testimonialsHeading ?? {}) },
    blogHeading: { ...defaultHomeContent.blogHeading, ...(p.blogHeading ?? {}) },
    portfolioHeading: { ...defaultHomeContent.portfolioHeading, ...(p.portfolioHeading ?? {}) },
    megaCta: {
      ...defaultHomeContent.megaCta,
      ...(p.megaCta ?? {}),
      contactTiles: p.megaCta?.contactTiles?.length ? p.megaCta.contactTiles : defaultHomeContent.megaCta.contactTiles,
    },
  };
}

export async function getHomeContent(): Promise<HomeContent> {
  const record = await getPageContent("home");
  if (!record || !record.fields) return defaultHomeContent;
  return mergeHomeContent(record.fields);
}
