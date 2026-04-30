import { ppcServicesDetailMarkdown } from "./ppc-services-detail";
import { seoServicesDetailMarkdown } from "./seo-services-detail";
import { socialMediaMarketingDetailMarkdown } from "./social-media-marketing-detail";
import { brandManagementDetailMarkdown } from "./brand-management-detail";

export type ServiceBlock = {
  slug: string;
  title: string;
  /** Long marketing headline shown in the page hero; defaults to `title` when omitted. */
  heroTitle?: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  intro: string;
  explanation: string;
  /** Rich markdown (headings, lists, GFM tables) rendered in the primary service narrative block. */
  detailMarkdown?: string;
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
  "ppc-services",
  "facebook-ads",
  "online-reputation-management",
  "public-relations",
  "brand-management",
  "content-marketing",
  "influencer-marketing",
  "website-development",
  "generative-engine-optimization",
  "answer-engine-optimization",
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
    title: "Search Engine Optimization (SEO)",
    heroTitle: "Best SEO Company in India – Grow Your Business with Search Modifiers",
    shortDescription:
      "Traditional and AI-powered SEO for rankings, visibility, and leads — with mid-month and monthly reporting you can trust.",
    metaTitle: "Best SEO Company in India | SEO Services | Search Modifiers",
    metaDescription:
      "Search Modifiers: trusted SEO company in India — on-page, off-page, technical, local, eCommerce, content, and AI SEO. Data-driven strategy, 9+ years' experience, transparent ROI-focused reporting.",
    heroEyebrow: "Organic growth",
    intro:
      "If you are searching for a reliable and result-driven SEO company in India, Search Modifiers helps you rank higher, earn visibility, and grow qualified organic demand.",
    explanation:
      "We blend proven SEO fundamentals with AI-aware optimization so you stay competitive on Google and emerging search surfaces — always tied to leads and revenue, not vanity metrics.",
    detailMarkdown: seoServicesDetailMarkdown,
    benefits: [
      {
        title: "On-page SEO",
        description:
          "Content, meta tags, headings, URLs, and internal linking aligned with intent and algorithms for stronger relevance and traffic.",
        icon: "file-text",
      },
      {
        title: "Off-page SEO",
        description:
          "High-quality, white-hat backlinks from authoritative sites to grow domain authority and credibility safely.",
        icon: "link-2",
      },
      {
        title: "Technical SEO",
        description:
          "Crawl errors, speed, Core Web Vitals, indexing, and site health so search engines can crawl and users convert.",
        icon: "cpu",
      },
      {
        title: "Local SEO",
        description:
          "Google Business Profile, citations, and local keywords so you show up for nearby, high-intent searches.",
        icon: "map-pin",
      },
      {
        title: "eCommerce SEO",
        description:
          "Product and category visibility, UX improvements, and structured journeys that lift traffic and conversions.",
        icon: "shopping-bag",
      },
      {
        title: "Content writing",
        description:
          "Engaging, keyword-smart content that matches user intent and strengthens topical authority.",
        icon: "pen-tool",
      },
      {
        title: "AI SEO",
        description:
          "AI-informed insights paired with classic SEO so you’re ready for evolving search and answer experiences.",
        icon: "sparkles",
      },
    ],
    process: [
      { step: "01", title: "Website audit", description: "Uncover errors, gaps, and opportunities across your site." },
      { step: "02", title: "Competitor analysis", description: "Learn what competitors do well and where you can outperform." },
      { step: "03", title: "Keyword research", description: "Prioritize high-value terms aligned with your audience." },
      { step: "04", title: "Content creation", description: "Publish SEO-friendly content matched to intent and SERPs." },
      { step: "05", title: "On-page optimization", description: "Tune pages, metadata, and internal links for visibility." },
      { step: "06", title: "Technical optimization", description: "Speed, indexing, crawlability, and UX fixes." },
      { step: "07", title: "Link building", description: "Earn authoritative links that reinforce trust and rankings." },
      { step: "08", title: "Reporting & analysis", description: "Clear reports and ongoing refinement for stronger ROI." },
    ],
    faqs: [
      {
        q: "How long does SEO take to show results?",
        a: "SEO is long-term. Many sites see meaningful movement in 3–6 months, depending on competition, site health, and scope.",
      },
      {
        q: "What is the cost of SEO services in India?",
        a: "Pricing depends on your goals, competition, and deliverables. We offer flexible, tailored plans so you invest at the right level for your business.",
      },
      {
        q: "What is local SEO?",
        a: "Local SEO helps you appear in location-based searches — maps, local packs, and “near me” queries — so nearby customers find you first.",
      },
      {
        q: "Why should I hire an SEO company in India?",
        a: "A professional team applies current best practices, fixes technical issues, builds authority safely, and focuses on traffic and leads — not risky shortcuts.",
      },
      {
        q: "Do you provide reports?",
        a: "Yes — mid-month and monthly reports covering progress, rankings, traffic, and ROI so you always know what’s working.",
      },
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
    heroTitle: "Social Media Marketing Company in India – Drive Real Growth with Search Modifiers",
    shortDescription:
      "Data-driven social strategy across LinkedIn, Facebook, Instagram, X, and Pinterest — engagement, leads, and ROI with mid-month and monthly reporting.",
    metaTitle: "Social Media Marketing Company in India | Search Modifiers",
    metaDescription:
      "Search Modifiers: trusted social media marketing agency in India — B2B and B2C campaigns, platform-specific creative, community management, 9+ years' experience, transparent ROI-focused reporting.",
    heroEyebrow: "Community & creative",
    intro:
      "If you want a social media marketing company in India that delivers measurable results, Search Modifiers combines skilled execution with clear reporting.",
    explanation:
      "We build brand presence, qualified leads, and consistent growth through audience targeting, platform-native creative, and continuous optimization aligned with your business goals.",
    detailMarkdown: socialMediaMarketingDetailMarkdown,
    benefits: [
      {
        title: "LinkedIn marketing",
        description:
          "Professional campaigns for B2B: reach decision-makers, generate leads, and build authority in your category.",
        icon: "users",
      },
      {
        title: "Facebook marketing",
        description:
          "Highly targeted campaigns to drive traffic, engagement, and conversions on one of the largest social platforms.",
        icon: "megaphone",
      },
      {
        title: "Instagram marketing",
        description:
          "Visual storytelling with creatives, Reels, and campaigns that grow visibility and audience interaction.",
        icon: "video",
      },
      {
        title: "X (Twitter) marketing",
        description:
          "Real-time relevance, conversation, and campaigns that strengthen awareness and engagement.",
        icon: "share-2",
      },
      {
        title: "Pinterest marketing",
        description:
          "Strategic pinning and content optimization for niche and product-led brands driving long-term traffic.",
        icon: "palette",
      },
      {
        title: "Analytics & optimization",
        description:
          "Continuous tracking, insights, and refinement so spend and effort compound into better reach and conversions.",
        icon: "bar-chart-3",
      },
    ],
    process: [
      {
        step: "01",
        title: "Goal setting & objectives",
        description: "Define leads, sales, or awareness so every tactic maps to measurable outcomes.",
      },
      {
        step: "02",
        title: "Target audience research",
        description: "Demographics, interests, and behavior so content reaches people likely to engage and convert.",
      },
      { step: "03", title: "Competitor analysis", description: "Learn what works in your space and where you can win." },
      {
        step: "04",
        title: "Platform selection",
        description: "Focus on the channels that fit your business instead of spreading effort too thin.",
      },
      {
        step: "05",
        title: "Content strategy & planning",
        description: "Balanced mix of informational, promotional, and engaging content aligned to brand goals.",
      },
      {
        step: "06",
        title: "Content creation",
        description: "Visuals, video, and copy that capture attention and communicate your message clearly.",
      },
      {
        step: "07",
        title: "Content calendar & scheduling",
        description: "Consistent posting and planning that builds trust and predictable momentum.",
      },
      {
        step: "08",
        title: "Posting & distribution",
        description: "Publish at the right times with optimization for reach and performance.",
      },
      {
        step: "09",
        title: "Engagement & community",
        description: "Respond to comments and messages to build relationships and loyalty.",
      },
      {
        step: "10",
        title: "Performance tracking",
        description: "Measure engagement, clicks, and conversions to guide next decisions.",
      },
      {
        step: "11",
        title: "Optimization & scaling",
        description: "Double down on what works and refine targeting and creative for long-term growth.",
      },
    ],
    faqs: [
      {
        q: "What makes Search Modifiers a top social media marketing company in India?",
        a:
          "A data-driven approach, 9+ years of experience, transparent reporting, and strategies focused on ROI — not just likes.",
      },
      {
        q: "What is the cost of social media marketing services in India?",
        a:
          "Cost depends on your goals, platforms, and scope. We offer flexible pricing tailored to each client.",
      },
      {
        q: "What platforms do you manage?",
        a:
          "We run LinkedIn, Facebook, Instagram, X (Twitter), and Pinterest marketing campaigns — aligned to where your audience is.",
      },
      {
        q: "How long does it take to see results?",
        a:
          "It varies by strategy and goals; many campaigns show stronger engagement and momentum within the first few weeks.",
      },
      {
        q: "Do you provide performance reports?",
        a: "Yes — mid-month and monthly reports for full visibility into performance and results.",
      },
    ],
  },
  {
    slug: "google-ads",
    title: "Paid Advertising (Google & Social Ads)",
    shortDescription:
      "Google and Meta campaigns, precision audiences, and creative systems tuned for ROAS and pipeline.",
    metaTitle: "Paid Advertising — Google & Social Ads | Search Modifiers",
    metaDescription:
      "Google Ads, Meta ads, high-converting creatives, targeting, retargeting, and continuous optimization for measurable ROI.",
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
      { q: "Minimum ad spend?", a: "We recommend budgets that reach statistical significance; we'll advise during discovery." },
    ],
  },
  {
    slug: "ppc-services",
    title: "PPC Services",
    shortDescription:
      "Performance-driven PPC across Search, Display, Video, App campaigns, and Remarketing — built for leads, sales, and ROI with transparent reporting.",
    metaTitle: "Best PPC Company in India | PPC Services | Search Modifiers",
    metaDescription:
      "Search Modifiers delivers high-converting PPC in India: Google Ads, Display, Video, App promotion, remarketing, daily optimization, and mid-month + monthly reporting.",
    heroEyebrow: "Paid search & performance",
    intro:
      "If you are looking for a performance-driven PPC company in India, Search Modifiers is your trusted partner for measurable growth through paid advertising.",
    explanation:
      "With over 9+ years of experience, we specialize in high-converting PPC campaigns that help businesses across India generate targeted traffic, qualified leads, and maximum return on investment.",
    detailMarkdown: ppcServicesDetailMarkdown,
    benefits: [
      {
        title: "Search Ads (Google Ads)",
        description:
          "Highly targeted search campaigns when users actively look for your offer — keyword intent, ad relevance, and conversion optimization.",
        icon: "search",
      },
      {
        title: "Display Ads",
        description:
          "Reach broader audiences across sites and apps with engaging creatives that build awareness and attract prospects.",
        icon: "layout-grid",
      },
      {
        title: "Video Ads",
        description:
          "Video campaigns that engage users, communicate your message clearly, and drive conversions.",
        icon: "video",
      },
      {
        title: "App Promotion Ads",
        description:
          "Grow installs and engagement with targeted app promotion across the right networks.",
        icon: "rocket",
      },
      {
        title: "Remarketing Campaigns",
        description:
          "Re-engage visitors who already know your brand — strategic remarketing that lifts conversion rates.",
        icon: "refresh-cw",
      },
      {
        title: "Transparent reporting",
        description:
          "Mid-month and monthly performance reports — clicks, conversions, ROI, and clear next steps.",
        icon: "line-chart",
      },
    ],
    process: [
      { step: "01", title: "Goal definition", description: "Lead gen, sales, or brand awareness — aligned to your objectives." },
      { step: "02", title: "Audience & intent mapping", description: "Who buys, how they search, and how we match campaigns to intent." },
      { step: "03", title: "Keyword & negative keywords", description: "High-performing keywords and lists that cut wasted spend." },
      { step: "04", title: "Landing page optimization", description: "UX and messaging tuned to improve conversion rates." },
      { step: "05", title: "Tracking setup", description: "Advanced tracking for clicks, conversions, and behavior." },
      { step: "06", title: "Campaign structuring", description: "Account structure for control, clarity, and scale." },
      { step: "07", title: "Ad creation", description: "Copy and creatives built to earn attention and qualified clicks." },
      { step: "08", title: "Budget allocation", description: "Spend deployed where it compounds ROI, not vanity metrics." },
      { step: "09", title: "Launch & optimization", description: "Continuous monitoring, testing, and tuning after go-live." },
    ],
    faqs: [
      {
        q: "What makes Search Modifiers a top PPC company in India?",
        a:
          "A performance-driven approach, data-backed strategies, and strong ROI focus. With 9+ years of experience, we emphasize continuous optimization, transparent reporting, and campaigns tailored to each business.",
      },
      {
        q: "What is the cost of PPC services in India?",
        a: "Cost depends on your industry, competition, and goals. We offer flexible pricing based on your requirements and budget.",
      },
      {
        q: "What PPC services does Search Modifiers offer?",
        a:
          "Google Search Ads, Display Ads, Video Ads, App Promotion Ads, and Remarketing — each designed to reach the right audience and maximize conversions.",
      },
      {
        q: "What is the cost of hiring a PPC company in India?",
        a:
          "It varies by industry, competition, and objectives. Search Modifiers offers flexible pricing aligned with your business needs and ad spend.",
      },
      {
        q: "Do you provide performance reports?",
        a:
          "Yes — mid-month and monthly reports with insights into clicks, impressions, conversions, and ROI so you always have full visibility.",
      },
      {
        q: "What industries do you work with?",
        a:
          "E-commerce, service businesses, startups, high-ticket providers, and more — with PPC strategies customized to each sector.",
      },
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
    title: "Online Reputation Management (ORM)",
    shortDescription:
      "Proactive review ecosystems, suppression strategy, and SERP defense — trust signals that compound.",
    metaTitle: "Online Reputation Management (ORM) | Search Modifiers",
    metaDescription:
      "ORM programs: review management, negative-result suppression, SERP defense, and positive content promotion for brands in India and globally.",
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
    slug: "public-relations",
    title: "Public Relations (Digital PR & Brand Authority)",
    shortDescription:
      "Strategic media positioning and authority-building PR across digital and traditional channels.",
    metaTitle: "Digital PR & Public Relations | Search Modifiers",
    metaDescription:
      "Press releases, media outreach, brand reputation management, and high-authority placements — narrative systems that scale credibility.",
    heroEyebrow: "Authority & coverage",
    intro:
      "PR today is measurable: narratives, placements, and search-visible proof that compound trust.",
    explanation:
      "We combine strategic media positioning, AI-assisted narrative development, and journalist outreach — strengthening brand credibility, visibility, and coverage quality without vanity headlines.",
    benefits: [
      {
        title: "Press & distribution",
        description: "Release strategy, wire and targeted distribution, and follow-through.",
        icon: "newspaper",
      },
      {
        title: "Media relationships",
        description: "Outreach, journalist mapping, and story-fit pitching.",
        icon: "handshake",
      },
      {
        title: "Reputation alignment",
        description: "ORM-safe messaging and escalation when narratives shift.",
        icon: "shield-check",
      },
      {
        title: "Authority placements",
        description: "Tier-1 and niche publications matched to your ICP.",
        icon: "star",
      },
    ],
    process: [
      { step: "01", title: "Narrative audit", description: "Positioning, proof points, and media landscape scan." },
      { step: "02", title: "Story architecture", description: "Angles, timelines, and asset checklist." },
      { step: "03", title: "Outreach & activation", description: "Journalist engagement and content syndication." },
      { step: "04", title: "Measure & iterate", description: "Coverage reports, referral traffic, and SERP impact." },
    ],
    faqs: [
      {
        q: "Do you guarantee media pickups?",
        a: "No ethical firm can guarantee editorial outcomes. We guarantee disciplined outreach, transparent reporting, and narrative quality.",
      },
      {
        q: "B2B vs B2C PR?",
        a: "We tailor publication targets, spokespeople, and proof formats to your buyer motion.",
      },
    ],
  },
  {
    slug: "brand-management",
    title: "Brand Management",
    heroTitle: "Online Reputation Management Services in India for Brand Growth & Trust",
    shortDescription:
      "SEO-driven ORM to build, monitor, recover, and protect your reputation across search, reviews, and social — with mid-month and monthly reporting.",
    metaTitle: "Online Reputation Management (ORM) India | Brand Management | Search Modifiers",
    metaDescription:
      "Search Modifiers: ORM and brand reputation in India — audits, content, review management, suppression, monitoring, 9+ years' experience, Semrush/Ahrefs, transparent reporting.",
    heroEyebrow: "Reputation & trust",
    intro:
      "Your brand is what people find when they search — reviews, articles, and social proof. We help you control that narrative with structured, ethical ORM.",
    explanation:
      "From audits and positive asset creation to review programs and negative-result handling, we align ORM with SEO so trustworthy content earns the visibility you need.",
    detailMarkdown: brandManagementDetailMarkdown,
    benefits: [
      {
        title: "Build & manage reputation",
        description:
          "Optimized narratives and assets that highlight strengths and keep messaging consistent across digital touchpoints.",
        icon: "shield-check",
      },
      {
        title: "Monitor reputation",
        description:
          "Ongoing tracking of mentions and signals so you can respond early and stay ahead of issues.",
        icon: "eye",
      },
      {
        title: "Recover reputation",
        description:
          "Recovery roadmaps after negative exposure — rebuilding trust with content, authority, and time-bound milestones.",
        icon: "refresh-cw",
      },
      {
        title: "Negative content handling",
        description:
          "Ethical analysis, reporting, and suppression strategies — never black-hat tactics that put your domain at risk.",
        icon: "alert-triangle",
      },
      {
        title: "Positive asset development",
        description:
          "Blogs, profiles, PR-style pieces, and branded pages designed to rank and reinforce the story you want told.",
        icon: "file-text",
      },
    ],
    process: [
      {
        step: "01",
        title: "Reputation audit",
        description: "Map how you appear in results, reviews, and mentions — strengths, risks, and priorities.",
      },
      {
        step: "02",
        title: "Keyword & SERP analysis",
        description: "Branded and risk terms traced so we know what must rank and what to counterbalance.",
      },
      {
        step: "03",
        title: "Strategy planning",
        description: "Custom ORM plan: build, recover, or both — with platforms and content mix defined.",
      },
      {
        step: "04",
        title: "Positive content creation",
        description: "SEO-ready assets that earn visibility and push constructive narrative to the top.",
      },
      {
        step: "05",
        title: "Review management",
        description: "Programs and responses that grow trust and show customers you listen.",
      },
      {
        step: "06",
        title: "Social monitoring",
        description: "Watch engagement and keep messaging consistent across social surfaces.",
      },
      {
        step: "07",
        title: "Link building for ORM assets",
        description: "Authority links to strengthen positive pages so they stay durable in SERPs.",
      },
      {
        step: "08",
        title: "Negative content handling",
        description: "Suppression, compliant removal requests, and SEO counterweight where appropriate.",
      },
      {
        step: "09",
        title: "Monitoring & reporting",
        description: "Mid-month and monthly reporting with clear next steps and optimization.",
      },
    ],
    faqs: [
      {
        q: "What are online reputation management services in India?",
        a:
          "They cover monitoring, improving, and maintaining how your brand appears in search, reviews, and social — so users see trustworthy, relevant information.",
      },
      {
        q: "How long does ORM take to show results?",
        a:
          "Early signals often appear within weeks; meaningful, stable movement typically needs roughly 3–6 months depending on starting position and competition.",
      },
      {
        q: "Can negative content be removed?",
        a:
          "Sometimes, if it violates platform rules. Otherwise we use ethical suppression, positive content promotion, and compliant processes — not empty promises.",
      },
      {
        q: "Do you provide ORM for individuals?",
        a:
          "Yes — professionals and public figures can strengthen personal branding and address harmful or irrelevant results responsibly.",
      },
      {
        q: "Why choose Search Modifiers as an ORM company in India?",
        a:
          "9+ years of experience, transparent reporting, and data-driven ORM tied to SEO — focused on sustainable outcomes, not quick fixes.",
      },
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
    shortDescription:
      "Fast, responsive sites and conversion-led experiences — design, performance, and SEO-ready structure.",
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
  {
    slug: "generative-engine-optimization",
    title: "GEO – Generative Engine Optimization",
    shortDescription:
      "Visibility inside ChatGPT, Gemini, Perplexity, and next-gen AI surfaces — citations, entities, and demand before the click.",
    metaTitle: "Generative Engine Optimization (GEO) | Search Modifiers",
    metaDescription:
      "GEO programs: generative-search content systems, AI citation optimization, entity authority, and conversational query visibility.",
    heroEyebrow: "AI discovery",
    intro:
      "Generative engines answer first — brands that engineer citations and entity trust win invisible demand.",
    explanation:
      "We build generative-search visibility systems: content architectures tuned for AI retrieval, citation patterns across major models, and entity maps that increase trusted-source inclusion as answers compound.",
    benefits: [
      {
        title: "AI-native content systems",
        description: "Structures and cues engineered for model-friendly retrieval.",
        icon: "layers",
      },
      {
        title: "Citation optimization",
        description: "Brand presence across ChatGPT, Gemini, Perplexity, and emerging engines.",
        icon: "share-2",
      },
      {
        title: "Entity authority",
        description: "Knowledge graph signals and consistency for inclusion.",
        icon: "target",
      },
      {
        title: "Zero-click demand",
        description: "Conversational queries captured before traditional SERP clicks.",
        icon: "activity",
      },
    ],
    process: [
      { step: "01", title: "AI visibility audit", description: "Model surfaces, competitor citations, and gap map." },
      { step: "02", title: "Entity & source map", description: "Canonical facts, feeds, and third-party proof." },
      { step: "03", title: "Content engineering", description: "Retrieval-friendly pages, FAQs, and structured context." },
      { step: "04", title: "Measure & expand", description: "Citation tracking, prompt tests, and iteration." },
    ],
    faqs: [
      {
        q: "Is GEO the same as SEO?",
        a: "Related but distinct — GEO optimizes for how LLMs synthesize and cite sources, not only classic ranking factors.",
      },
      {
        q: "Can you influence specific AI answers?",
        a: "We improve probability through authoritative sourcing and structure; no one can guarantee fixed responses from third-party models.",
      },
    ],
  },
  {
    slug: "answer-engine-optimization",
    title: "AEO - Answer Engine Optimization",
    shortDescription:
      "Answer boxes, AI Overviews, and entity-rich content — built to become the preferred answer source.",
    metaTitle: "Answer Engine Optimization (AEO) | Search Modifiers",
    metaDescription:
      "AEO: answer-focused content, entity optimization, structured data, and authority signals for Google and AI-powered answer surfaces.",
    heroEyebrow: "Preferred answers",
    intro:
      "Answer engines reward clarity, entities, and structured proof — not keyword stuffing.",
    explanation:
      "We deploy answer-engine architecture: intent-mapped content, schema and entity graphs, and authority expansion so your brand is cited in AI summaries, featured results, and zero-click contexts.",
    benefits: [
      {
        title: "Answer architecture",
        description: "Page types and outlines aligned to answer intent.",
        icon: "file-text",
      },
      {
        title: "Entity & schema",
        description: "Structured data and knowledge signals that models trust.",
        icon: "cpu",
      },
      {
        title: "Zero-click growth",
        description: "Visibility on Google surfaces and third-party answer engines.",
        icon: "eye",
      },
      {
        title: "Authority signals",
        description: "Citations, E-E-A-T, and proof that reinforce preferred-source status.",
        icon: "badge-check",
      },
    ],
    process: [
      { step: "01", title: "Intent & SERP map", description: "Questions, PAA, and AI snapshot patterns." },
      { step: "02", title: "Entity foundations", description: "SameAs, org/person schema, and consistency." },
      { step: "03", title: "Publish & structure", description: "FAQ, HowTo, and modular answer blocks." },
      { step: "04", title: "Iterate on visibility", description: "SERP + AI monitoring with refresh cycles." },
    ],
    faqs: [
      {
        q: "AEO vs traditional SEO?",
        a: "AEO emphasizes becoming the cited answer — often overlapping with SEO but with heavier structured context and entity work.",
      },
      {
        q: "How fast do answer placements move?",
        a: "Depends on competition and authority; early signals often appear within weeks for narrow queries.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceBlock | undefined {
  return services.find((s) => s.slug === slug);
}
