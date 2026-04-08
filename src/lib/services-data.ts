export type ServiceBlock = {
  slug: string;
  title: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  intro: string;
  explanation: string;
  benefits: { title: string; description: string; icon: string }[];
  process: { step: string; title: string; description: string }[];
  faqs: { q: string; a: string }[];
};

export const serviceSlugs = [
  "digital-marketing",
  "seo-services",
  "local-seo",
  "ecommerce-seo",
  "technical-seo",
  "social-media-marketing",
  "google-ads",
  "facebook-ads",
  "online-reputation-management",
  "brand-management",
  "content-marketing",
  "influencer-marketing",
  "website-development",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export const services: ServiceBlock[] = [
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortDescription:
      "Full-funnel campaigns that blend search, social, and creative to grow pipeline and revenue.",
    metaTitle: "Digital Marketing Agency | Search Modifiers",
    metaDescription:
      "Strategy-led digital marketing: SEO, paid media, content, and analytics — engineered for measurable growth across India and global markets.",
    heroEyebrow: "Growth systems",
    intro:
      "We architect digital marketing programs that connect brand story to pipeline impact — not vanity metrics.",
    explanation:
      "Our teams align acquisition, retention, and creative so every touchpoint reinforces trust and conversion. From first click to closed deal, we instrument funnels, run disciplined experiments, and report with executive clarity.",
    benefits: [
      {
        title: "Unified strategy",
        description: "One roadmap across channels — fewer silos, faster learning cycles.",
        icon: "layers",
      },
      {
        title: "Revenue-focused reporting",
        description: "Dashboards tied to leads, SQLs, and revenue — not just clicks.",
        icon: "bar-chart-3",
      },
      {
        title: "Creative + performance",
        description: "Brand-grade creative tested against conversion hypotheses.",
        icon: "sparkles",
      },
      {
        title: "Always-on optimization",
        description: "Weekly reviews, sprint-based improvements, and clear next actions.",
        icon: "refresh-cw",
      },
    ],
    process: [
      {
        step: "01",
        title: "Discovery & goals",
        description: "We map ICPs, economics, and success metrics with your leadership team.",
      },
      {
        step: "02",
        title: "Channel mix design",
        description: "We prioritize channels and offers based on data — not trends alone.",
      },
      {
        step: "03",
        title: "Launch & learn",
        description: "Structured experiments with guardrails and rapid iteration.",
      },
      {
        step: "04",
        title: "Scale & compound",
        description: "Double down on winners; retire underperformers with transparency.",
      },
    ],
    faqs: [
      {
        q: "How fast will we see results?",
        a: "Early signals often appear in 4–8 weeks depending on channel mix. SEO compounds over months; paid media can move faster with sufficient data volume.",
      },
      {
        q: "Do you work with startups and enterprises?",
        a: "Yes. We tailor scope, tooling, and cadence to your stage — from seed-stage velocity to enterprise governance.",
      },
    ],
  },
  {
    slug: "seo-services",
    title: "SEO Services",
    shortDescription:
      "Organic visibility that earns qualified demand — technical excellence plus editorial authority.",
    metaTitle: "SEO Services | Technical, Content & Authority | Search Modifiers",
    metaDescription:
      "Enterprise-grade SEO: audits, content strategy, digital PR, and technical fixes that improve crawlability, relevance, and sustainable rankings.",
    heroEyebrow: "Organic growth",
    intro:
      "SEO is a product discipline. We treat your site like an asset that must be crawlable, relevant, and trustworthy.",
    explanation:
      "We combine technical SEO, information architecture, and content engineered for intent. Our playbooks cover everything from JavaScript rendering to entity-rich topical clusters — always aligned with business outcomes.",
    benefits: [
      {
        title: "Sustainable traffic",
        description: "Reduce paid dependency with compounding organic sessions.",
        icon: "trending-up",
      },
      {
        title: "Intent-matched content",
        description: "Pages mapped to stages of the buyer journey.",
        icon: "file-text",
      },
      {
        title: "Technical health",
        description: "Core Web Vitals, indexation, and structured data done right.",
        icon: "cpu",
      },
      {
        title: "Transparent reporting",
        description: "Rankings tied to landing pages, conversions, and revenue proxies.",
        icon: "line-chart",
      },
    ],
    process: [
      { step: "01", title: "Audit & benchmark", description: "Crawl, analytics, and competitive gap analysis." },
      { step: "02", title: "Roadmap", description: "Prioritized fixes and content opportunities by impact." },
      { step: "03", title: "Execution", description: "Technical releases, content production, and internal linking." },
      { step: "04", title: "Measure & iterate", description: "Monthly reviews with clear next experiments." },
    ],
    faqs: [
      { q: "Do you guarantee rankings?", a: "No ethical agency can. We guarantee rigorous process, clear reporting, and strategies aligned with Google’s guidelines." },
      { q: "Can you work with our dev team?", a: "Absolutely. We write tickets, join standups when needed, and QA implementations." },
    ],
  },
  {
    slug: "local-seo",
    title: "Local SEO",
    shortDescription: "Dominate the map pack and local SERPs for high-intent “near me” searches.",
    metaTitle: "Local SEO Services | Maps & Reviews | Search Modifiers",
    metaDescription:
      "Google Business Profile optimization, citations, reviews, and localized landing pages for multi-location brands and regional leaders.",
    heroEyebrow: "Near-me demand",
    intro: "Local SEO turns proximity into revenue — especially for services, retail, and franchises.",
    explanation:
      "We optimize Google Business Profiles, build consistent NAP signals, implement localized schema, and create city/neighborhood pages that rank without cannibalizing your brand site.",
    benefits: [
      { title: "Map pack visibility", description: "Structured data and GBP posts that improve relevance.", icon: "map-pin" },
      { title: "Review velocity", description: "Programs that increase volume and quality of reviews.", icon: "star" },
      { title: "Multi-location scale", description: "Templates and governance for dozens of branches.", icon: "building-2" },
      { title: "Call & direction tracking", description: "Attribution that connects searches to foot traffic.", icon: "phone" },
    ],
    process: [
      { step: "01", title: "Market scan", description: "Competitor GBP and SERP feature analysis." },
      { step: "02", title: "Foundation", description: "NAP cleanup, categories, and on-page local signals." },
      { step: "03", title: "Content & links", description: "Localized pages and relevant local citations." },
      { step: "04", title: "Ongoing hygiene", description: "Posts, Q&A, and review response workflows." },
    ],
    faqs: [
      { q: "How important are reviews?", a: "Critical for local trust and CTR. We help you earn them ethically and respond strategically." },
      { q: "Do you support franchises?", a: "Yes — we design parent/child location hierarchies and brand-safe templates." },
    ],
  },
  {
    slug: "ecommerce-seo",
    title: "E-commerce SEO",
    shortDescription: "Category, facet, and PDP SEO that scales without technical debt.",
    metaTitle: "E-commerce SEO Agency | Search Modifiers",
    metaDescription:
      "Faceted navigation governance, PLP/PDP optimization, and structured data for products — built for large catalogs.",
    heroEyebrow: "Catalog scale",
    intro: "E-commerce SEO is a balancing act between crawl budget, UX, and merchandising goals.",
    explanation:
      "We implement facet rules, canonical strategy, and internal linking models that protect indexation while preserving merchandising flexibility. PDP copy and schema help you win rich results.",
    benefits: [
      { title: "Facet governance", description: "Rules that prevent duplicate and thin URL sprawl.", icon: "filter" },
      { title: "PDP excellence", description: "Unique copy blocks, FAQs, and product schema.", icon: "shopping-bag" },
      { title: "Internal linking", description: "Hub pages and breadcrumbs that distribute equity.", icon: "link-2" },
      { title: "Seasonal readiness", description: "Playbooks for sales peaks and collection launches.", icon: "calendar" },
    ],
    process: [
      { step: "01", title: "Crawl & template audit", description: "Identify duplicate, orphan, and thin templates." },
      { step: "02", title: "IA & rules", description: "Define indexation rules for facets and parameters." },
      { step: "03", title: "Template upgrades", description: "Meta, copy modules, schema, and CRO hooks." },
      { step: "04", title: "Monitor & refine", description: "GSC segments and log file insights when available." },
    ],
    faqs: [
      { q: "Can you work with Shopify, Magento, custom stacks?", a: "Yes — we adapt recommendations to your platform constraints and dev capacity." },
      { q: "How do you handle out-of-stock SKUs?", a: "We recommend 301/410 strategies and UX patterns that preserve equity and trust." },
    ],
  },
  {
    slug: "technical-seo",
    title: "Technical SEO",
    shortDescription: "Crawl budget, rendering, and site architecture tuned for growth.",
    metaTitle: "Technical SEO Consultants | Search Modifiers",
    metaDescription:
      "Deep audits: JavaScript rendering, log files, Core Web Vitals, hreflang, and enterprise migrations with minimal traffic risk.",
    heroEyebrow: "Engineering SEO",
    intro: "Technical SEO removes invisible ceilings on your organic potential.",
    explanation:
      "We partner with engineering to fix crawl traps, improve rendering, harden redirects, and ship structured data. For migrations, we build redirect maps, staging QA, and post-launch monitoring.",
    benefits: [
      { title: "Faster discovery", description: "Clean XML, internal links, and sitemap hygiene.", icon: "search" },
      { title: "Better rendering", description: "JS frameworks handled with SSR/ISR guidance.", icon: "code-2" },
      { title: "Migration safety", description: "Checklists that prevent catastrophic drops.", icon: "shield-check" },
      { title: "CWV uplift", description: "Prioritized fixes with measurable lab + field gains.", icon: "gauge" },
    ],
    process: [
      { step: "01", title: "Technical audit", description: "Crawl, GSC, and code-level findings." },
      { step: "02", title: "Prioritization", description: "Impact × effort scoring with your dev team." },
      { step: "03", title: "Implementation support", description: "PR reviews, QA, and validation." },
      { step: "04", title: "Regression watch", description: "Monitoring alerts and monthly health checks." },
    ],
    faqs: [
      { q: "Do you need server log files?", a: "They help for large sites but aren’t mandatory. We work with what you can provide." },
      { q: "Can you assist with replatforming?", a: "Yes — URL mapping, staging tests, and post-cutover monitoring are core to our process." },
    ],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    shortDescription: "Platform-native creative and community systems that build demand.",
    metaTitle: "Social Media Marketing Agency | Search Modifiers",
    metaDescription:
      "Organic social strategy, creator workflows, and paid social amplification for B2B and B2C brands.",
    heroEyebrow: "Community & creative",
    intro: "Social is where trust is built before the click — if your narrative is sharp and consistent.",
    explanation:
      "We design content pillars, production calendars, and engagement playbooks aligned with your brand voice. Paid social layers accelerate learning and retarget high-intent audiences.",
    benefits: [
      { title: "Brand salience", description: "Consistent storytelling across platforms.", icon: "megaphone" },
      { title: "Creative testing", description: "Hooks, formats, and angles validated quickly.", icon: "flask-conical" },
      { title: "Community care", description: "Response SLAs and escalation paths.", icon: "message-circle" },
      { title: "Creator partnerships", description: "Briefs and measurement that protect brand safety.", icon: "users" },
    ],
    process: [
      { step: "01", title: "Audience & positioning", description: "Personas, competitors, and tone guidelines." },
      { step: "02", title: "Content system", description: "Pillars, templates, and approval workflows." },
      { step: "03", title: "Publish & engage", description: "Cadence, community management, and UGC." },
      { step: "04", title: "Optimize", description: "Weekly performance reviews and creative swaps." },
    ],
    faqs: [
      { q: "Which platforms do you support?", a: "LinkedIn, Instagram, Facebook, X, YouTube, and emerging channels where your ICP spends time." },
      { q: "Do you produce video?", a: "Yes — short-form packages, motion graphics, and UGC-style edits." },
    ],
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    shortDescription: "Search, PMax, and Demand Gen structured for efficiency and scale.",
    metaTitle: "Google Ads Management | Search Modifiers",
    metaDescription:
      "Account structure, feed hygiene, and bidding strategies that improve CPA/ROAS while protecting brand terms.",
    heroEyebrow: "Paid search & beyond",
    intro: "Google Ads rewards discipline: structure, signals, and relentless creative iteration.",
    explanation:
      "We rebuild or refine accounts with clear SKAG/segmentation logic, conversion modeling, and feed-based campaigns where relevant. Reporting ties spend to pipeline, not just platform metrics.",
    benefits: [
      { title: "Clean structure", description: "Campaigns that match intent and simplify optimization.", icon: "layout-grid" },
      { title: "Signal quality", description: "Enhanced conversions, offline imports, and GA4 alignment.", icon: "radio" },
      { title: "Creative excellence", description: "RSA testing and asset coverage that lifts CTR.", icon: "pen-tool" },
      { title: "Budget guardrails", description: "Pacing, anomaly alerts, and transparent change logs.", icon: "wallet" },
    ],
    process: [
      { step: "01", title: "Account audit", description: "Waste analysis, conversion tracking, and competitive SERPs." },
      { step: "02", title: "Rebuild plan", description: "Structure, audiences, and bidding roadmap." },
      { step: "03", title: "Launch", description: "Phased rollout with monitoring." },
      { step: "04", title: "Scale", description: "Budget shifts to winners; neg keywords and placements tightened." },
    ],
    faqs: [
      { q: "Do you manage Shopping / Performance Max?", a: "Yes — including feed optimization and supplemental feeds." },
      { q: "Minimum ad spend?", a: "We recommend budgets that reach statistical significance; we’ll advise during discovery." },
    ],
  },
  {
    slug: "facebook-ads",
    title: "Facebook Ads",
    shortDescription: "Meta campaigns with creative velocity and durable attribution.",
    metaTitle: "Facebook & Instagram Ads | Search Modifiers",
    metaDescription:
      "Prospecting, retargeting, and catalog campaigns on Meta — with creative testing frameworks and CAPI setup.",
    heroEyebrow: "Meta performance",
    intro: "Meta rewards fresh creative and clean event data — we operationalize both.",
    explanation:
      "We implement Conversions API, standardize naming, and run structured creative tests (UGC, static, motion). Retargeting ladders align with your funnel stages.",
    benefits: [
      { title: "Creative OS", description: "Briefs, hooks, and iteration cadence.", icon: "video" },
      { title: "Signal resilience", description: "CAPI + EMQ best practices.", icon: "wifi" },
      { title: "Audience strategy", description: "Broad + advantage+ with guardrails.", icon: "target" },
      { title: "Merchandising sync", description: "Catalogs tuned for dynamic ads.", icon: "package" },
    ],
    process: [
      { step: "01", title: "Pixel & CAPI audit", description: "Event match quality and deduplication." },
      { step: "02", title: "Funnel mapping", description: "TOFU/MOFU/BOFU audiences and offers." },
      { step: "03", title: "Creative sprints", description: "Batch production and testing roadmap." },
      { step: "04", title: "Optimize", description: "Creative fatigue monitoring and budget reallocation." },
    ],
    faqs: [
      { q: "Can you work with our in-house creative team?", a: "Yes — we can brief, test, and feedback collaboratively." },
      { q: "B2B on Meta?", a: "Often effective with lead magnets and webinar funnels; we validate with tests." },
    ],
  },
  {
    slug: "online-reputation-management",
    title: "ORM (Online Reputation Management)",
    shortDescription: "Protect narrative, respond with poise, and earn trust at scale.",
    metaTitle: "Online Reputation Management | Search Modifiers",
    metaDescription:
      "Review strategy, SERP clean-up, crisis workflows, and proactive PR to shape how your brand appears online.",
    heroEyebrow: "Trust engineering",
    intro: "Reputation is a conversion surface — search results and reviews close or kill deals.",
    explanation:
      "We monitor brand SERPs, implement review generation programs, and prepare crisis playbooks. Where appropriate, we pair ORM with content and digital PR to rebalance what people see first.",
    benefits: [
      { title: "SERP balance", description: "Push authoritative assets up; reduce noise.", icon: "eye" },
      { title: "Review systems", description: "Ethical asks, templates, and escalation paths.", icon: "thumbs-up" },
      { title: "Crisis readiness", description: "Holding statements and channel-specific responses.", icon: "alert-triangle" },
      { title: "Executive visibility", description: "Thought leadership that compounds trust.", icon: "user-check" },
    ],
    process: [
      { step: "01", title: "Sentiment audit", description: "SERP inventory, review sites, and social mentions." },
      { step: "02", title: "Playbooks", description: "Response guidelines by scenario." },
      { step: "03", title: "Activation", description: "Content, outreach, and review programs." },
      { step: "04", title: "Monitoring", description: "Alerts, monthly reputation reports." },
    ],
    faqs: [
      { q: "Can you remove negative results?", a: "We can’t guarantee removals. We focus on ethical suppression via stronger assets and compliant requests where applicable." },
      { q: "Do you handle Glassdoor / Indeed?", a: "Yes — employer brand is part of modern ORM." },
    ],
  },
  {
    slug: "brand-management",
    title: "Brand Management",
    shortDescription: "Guidelines, messaging architecture, and creative systems that scale.",
    metaTitle: "Brand Management Services | Search Modifiers",
    metaDescription:
      "Positioning, visual consistency, and campaign frameworks so every touchpoint feels unmistakably you.",
    heroEyebrow: "Brand systems",
    intro: "Strong brands convert more — because clarity reduces friction.",
    explanation:
      "We codify voice, visual rules, and messaging maps. Campaign toolkits empower regional teams and partners without diluting the core story.",
    benefits: [
      { title: "Positioning clarity", description: "Differentiation that sales and marketing can repeat.", icon: "compass" },
      { title: "Design ops", description: "Templates, components, and approval flows.", icon: "palette" },
      { title: "Launch kits", description: "Channel-ready packs for product releases.", icon: "rocket" },
      { title: "Partner alignment", description: "Briefs that keep agencies and creators on-brand.", icon: "handshake" },
    ],
    process: [
      { step: "01", title: "Brand audit", description: "Stakeholder interviews and competitive scan." },
      { step: "02", title: "Architecture", description: "Messaging hierarchy and visual direction." },
      { step: "03", title: "Toolkits", description: "Guidelines, templates, and training." },
      { step: "04", title: "Governance", description: "Review cadence and refresh cycles." },
    ],
    faqs: [
      { q: "Is this only for rebrands?", a: "No — we also tighten existing brands pre-scale or pre-funding milestones." },
      { q: "Do you design logos?", a: "We partner with specialist designers or your in-house team; we lead strategy and systems." },
    ],
  },
  {
    slug: "content-marketing",
    title: "Content Marketing",
    shortDescription: "Editorial engines that rank, nurture, and convert.",
    metaTitle: "Content Marketing Agency | Search Modifiers",
    metaDescription:
      "Topic clusters, long-form guides, newsletters, and gated assets — measured against pipeline impact.",
    heroEyebrow: "Editorial ROI",
    intro: "Content should compound — not clutter.",
    explanation:
      "We build topical authority with research-backed outlines, SME interviews, and distribution plans. Formats span SEO articles, case stories, webinars, and nurture sequences.",
    benefits: [
      { title: "Intent mapping", description: "Content tied to funnel stages and keywords.", icon: "git-branch" },
      { title: "Production velocity", description: "Editorial calendars with QA and legal workflows.", icon: "newspaper" },
      { title: "Distribution", description: "Newsletter, social cuts, and partner syndication.", icon: "share-2" },
      { title: "Measurement", description: "Assisted conversions and content cohort analysis.", icon: "pie-chart" },
    ],
    process: [
      { step: "01", title: "Research", description: "Search data, customer questions, and gaps." },
      { step: "02", title: "Strategy", description: "Clusters, pillars, and conversion paths." },
      { step: "03", title: "Create", description: "Writing, design, and interactive modules." },
      { step: "04", title: "Optimize", description: "Refresh winners; prune losers." },
    ],
    faqs: [
      { q: "Do you ghostwrite for executives?", a: "Yes — we interview, draft, and iterate in your voice." },
      { q: "AI content?", a: "We use AI as an assist, never a substitute for editorial judgment and fact-checking." },
    ],
  },
  {
    slug: "influencer-marketing",
    title: "Influencer Marketing",
    shortDescription: "Partnerships with rigorous vetting, briefs, and attribution.",
    metaTitle: "Influencer Marketing Agency | Search Modifiers",
    metaDescription:
      "Creator sourcing, contracting support, UGC packages, and performance reporting for authentic reach.",
    heroEyebrow: "Creator partnerships",
    intro: "Influencer marketing fails without brand safety and measurement — we bake both in.",
    explanation:
      "We identify creators aligned with your ICP, negotiate deliverables, and run whitelisting where appropriate. UGC libraries fuel paid social and site modules.",
    benefits: [
      { title: "Vetted creators", description: "Audience authenticity checks and brand fit scoring.", icon: "badge-check" },
      { title: "Brief clarity", description: "Dos/don’ts, talking points, and legal guardrails.", icon: "clipboard-list" },
      { title: "UGC library", description: "Repurpose assets across channels.", icon: "film" },
      { title: "Performance view", description: "Codes, UTMs, and lift reads where possible.", icon: "activity" },
    ],
    process: [
      { step: "01", title: "Strategy", description: "Goals, tiers, and creator archetypes." },
      { step: "02", title: "Sourcing", description: "Outreach, vetting, and contracting." },
      { step: "03", title: "Production", description: "Shoots, edits, and approvals." },
      { step: "04", title: "Amplify", description: "Paid boosting and repurposing." },
    ],
    faqs: [
      { q: "Micro vs macro influencers?", a: "We match tier to objective — awareness vs conversion often favors micro/nano with high trust." },
      { q: "B2B influencers?", a: "Yes — practitioners, analysts, and newsletter authors can move pipeline." },
    ],
  },
  {
    slug: "website-development",
    title: "Website Development",
    shortDescription: "Fast, accessible marketing sites on modern stacks — optimized for conversion.",
    metaTitle: "Website Development Agency | Search Modifiers",
    metaDescription:
      "Next.js and headless builds with Core Web Vitals in mind, CRO modules, and analytics instrumentation from day one.",
    heroEyebrow: "Build & ship",
    intro: "Your website is your hardest-working salesperson — we engineer it that way.",
    explanation:
      "We design and develop marketing sites with performance budgets, accessibility checks, and component systems marketing teams can evolve. Integrations include CRM, analytics, and experimentation tools.",
    benefits: [
      { title: "Speed & SEO-ready", description: "Static generation, image optimization, schema.", icon: "zap" },
      { title: "CRO patterns", description: "Above-the-fold clarity, social proof, and trust blocks.", icon: "mouse-pointer-2" },
      { title: "Component CMS", description: "Structured blocks your team can reuse.", icon: "layout-template" },
      { title: "Analytics baked in", description: "GA4 events, form tracking, and heatmap hooks.", icon: "bar-chart-2" },
    ],
    process: [
      { step: "01", title: "Discovery", description: "IA, content needs, and integrations." },
      { step: "02", title: "Design", description: "UX, UI, and motion specs." },
      { step: "03", title: "Build", description: "Component dev, QA, and performance tuning." },
      { step: "04", title: "Launch", description: "DNS, redirects, monitoring, and training." },
    ],
    faqs: [
      { q: "Headless vs WordPress?", a: "We recommend based on your team, content velocity, and performance goals." },
      { q: "Ongoing support?", a: "Yes — retainers for updates, experiments, and security hygiene." },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceBlock | undefined {
  return services.find((s) => s.slug === slug);
}
