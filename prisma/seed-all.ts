import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedTeamMembers() {
  const members = [
    {
      name: "Priya Malhotra",
      role: "Founder & CEO",
      bio: "Former enterprise SEO lead; obsessed with crawl budget and board-ready narratives.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      order: 0,
    },
    {
      name: "Arjun Mehta",
      role: "Head of Performance",
      bio: "Structured paid search and Meta programs for fintech and SaaS across APAC.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      order: 1,
    },
    {
      name: "Neha Kapoor",
      role: "Creative Director",
      bio: "Hooks, motion, and brand systems that survive algorithm changes.",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      order: 2,
    },
    {
      name: "Vikram Singh",
      role: "Director, Content & SEO",
      bio: "Editorial engines for B2B — from SME interviews to programmatic landing pages.",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      order: 3,
    },
    {
      name: "Ananya Iyer",
      role: "Lead, ORM & PR",
      bio: "Crisis playbooks and reputation programs for regulated industries.",
      image:
        "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
      order: 4,
    },
    {
      name: "Rohan Khanna",
      role: "Engineering Partner",
      bio: "Next.js, CWV, and analytics instrumentation for marketing sites.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      order: 5,
    },
  ];

  for (const m of members) {
    await prisma.teamMember.upsert({
      where: { id: `seed-team-${m.order}` },
      update: m,
      create: { id: `seed-team-${m.order}`, ...m },
    });
  }
  console.log(`Seeded ${members.length} team members`);
}

async function seedCareerRoles() {
  const roles = [
    {
      title: "Senior Performance Marketing Manager",
      type: "Full-time · Hybrid (Delhi)",
      description:
        "Own Google Ads + Meta for 3–5 accounts; mentor associates; partner with SEO on landing tests.",
      isOpen: true,
      order: 0,
    },
    {
      title: "Technical SEO Lead",
      type: "Full-time · Remote-friendly",
      description:
        "Lead crawls, migrations, and CWV programs for enterprise sites; comfortable in Next.js stacks.",
      isOpen: true,
      order: 1,
    },
    {
      title: "Content Strategist",
      type: "Full-time · Delhi",
      description:
        "Build topical maps, brief writers, and align editorial to pipeline stages for B2B clients.",
      isOpen: true,
      order: 2,
    },
    {
      title: "ORM Specialist",
      type: "Full-time · Delhi",
      description:
        "Review programs, SERP projects, and crisis workflows for regulated and consumer brands.",
      isOpen: true,
      order: 3,
    },
  ];

  for (const r of roles) {
    await prisma.careerRole.upsert({
      where: { id: `seed-career-${r.order}` },
      update: r,
      create: { id: `seed-career-${r.order}`, ...r },
    });
  }
  console.log(`Seeded ${roles.length} career roles`);
}

async function seedFaqItems() {
  const faqs = [
    {
      q: "What does a typical engagement look like?",
      a: "We start with a focused discovery (goals, economics, stack). Week 2–3 is roadmap and instrumentation. Execution runs in weekly sprints with a shared dashboard and monthly executive reviews.",
      order: 0,
    },
    {
      q: "Do you work on retainers or projects?",
      a: "Both. Always-on channels (SEO, paid, social) fit retainers. Migrations, audits, and launches are often scoped as fixed phases with optional ongoing optimization.",
      order: 1,
    },
    {
      q: "Can you collaborate with our in-house team?",
      a: "Yes — we're effective as an extension of marketing, growth, or engineering. We adapt to your tools (Slack, Jira, Notion) and meeting cadence.",
      order: 2,
    },
    {
      q: "What budgets do you usually work with?",
      a: "Engagements vary by scope. Media spend is separate from our fees; we'll be candid if your budget can't reach statistical significance for a channel.",
      order: 3,
    },
    {
      q: "How do you report ROI?",
      a: "We align on proxy metrics (SQLs, pipeline, revenue where available) and use platform + analytics data. We avoid reporting that can't be tied to business outcomes.",
      order: 4,
    },
    {
      q: "Are you India-only?",
      a: "Delhi NCR is our hub, but we run campaigns and SEO programs globally — especially for SaaS, D2C, and professional services.",
      order: 5,
    },
  ];

  for (const f of faqs) {
    await prisma.faqItem.upsert({
      where: { id: `seed-faq-${f.order}` },
      update: f,
      create: { id: `seed-faq-${f.order}`, ...f },
    });
  }
  console.log(`Seeded ${faqs.length} FAQ items`);
}

async function seedPortfolioItems() {
  const items = [
    {
      title: "Fintech rebrand + site relaunch",
      category: "Brand & Web",
      description:
        "Positioning refresh, design system, and Next.js marketing site with sub-2s LCP globally.",
      icon: "layout",
      order: 0,
    },
    {
      title: "D2C skincare — Meta creative OS",
      category: "Paid Social",
      description:
        "UGC factory, hook matrix, and catalog ads that sustained 4× ROAS through scale.",
      icon: "share2",
      order: 1,
    },
    {
      title: "B2B SaaS — topical SEO program",
      category: "SEO & Content",
      description:
        "120+ templates indexed; integration hub that drives 40% of demo requests.",
      icon: "search",
      order: 2,
    },
    {
      title: "Healthcare group — ORM + local",
      category: "ORM",
      description:
        "GBP governance across 22 clinics; review velocity +4× with ethical prompts.",
      icon: "palette",
      order: 3,
    },
  ];

  for (const it of items) {
    await prisma.portfolioItem.upsert({
      where: { id: `seed-portfolio-${it.order}` },
      update: it,
      create: { id: `seed-portfolio-${it.order}`, ...it },
    });
  }
  console.log(`Seeded ${items.length} portfolio items`);
}

async function seedNavigationItems() {
  const navItems = [
    // Main nav
    { category: "main", label: "Home", href: "/", order: 0 },
    { category: "main", label: "About", href: "/about", order: 1 },
    { category: "main", label: "Services", href: "/services", order: 2 },
    { category: "main", label: "Case Studies", href: "/case-studies", order: 3 },
    { category: "main", label: "Blog", href: "/blog", order: 4 },
    { category: "main", label: "Contact", href: "/contact", order: 5 },
    // Services nav
    { category: "services", label: "Digital Marketing", href: "/services/digital-marketing", order: 0 },
    { category: "services", label: "SEO", href: "/services/seo-services", order: 1 },
    { category: "services", label: "ORM", href: "/services/online-reputation-management", order: 2 },
    { category: "services", label: "Public Relations", href: "/services/public-relations", order: 3 },
    { category: "services", label: "Local SEO", href: "/services/local-seo", order: 4 },
    { category: "services", label: "E-commerce SEO", href: "/services/ecommerce-seo", order: 5 },
    { category: "services", label: "Technical SEO", href: "/services/technical-seo", order: 6 },
    { category: "services", label: "Social Media Marketing", href: "/services/social-media-marketing", order: 7 },
    { category: "services", label: "Paid Ads (Google & Social)", href: "/services/google-ads", order: 8 },
    { category: "services", label: "PPC Services", href: "/services/ppc-services", order: 9 },
    { category: "services", label: "Facebook Ads", href: "/services/facebook-ads", order: 10 },
    { category: "services", label: "GEO", href: "/services/generative-engine-optimization", order: 11 },
    { category: "services", label: "AEO", href: "/services/answer-engine-optimization", order: 12 },
    { category: "services", label: "Brand Management", href: "/services/brand-management", order: 13 },
    { category: "services", label: "Content Marketing", href: "/services/content-marketing", order: 14 },
    { category: "services", label: "Influencer Marketing", href: "/services/influencer-marketing", order: 15 },
    { category: "services", label: "Website Development", href: "/services/website-development", order: 16 },
    // Locations nav
    { category: "locations", label: "Delhi", href: "/location/digital-marketing-delhi", order: 0 },
    { category: "locations", label: "Noida", href: "/location/digital-marketing-noida", order: 1 },
    { category: "locations", label: "Gurgaon", href: "/location/digital-marketing-gurgaon", order: 2 },
    { category: "locations", label: "SEO Delhi NCR", href: "/location/seo-delhi-ncr", order: 3 },
    { category: "locations", label: "ORM Delhi", href: "/location/orm-delhi", order: 4 },
  ];

  for (let i = 0; i < navItems.length; i++) {
    const n = navItems[i];
    await prisma.navigationItem.upsert({
      where: { id: `seed-nav-${i}` },
      update: n,
      create: { id: `seed-nav-${i}`, ...n },
    });
  }
  console.log(`Seeded ${navItems.length} navigation items`);
}

async function seedTrustBadges() {
  const badges = [
    {
      label: "Google Partner",
      subtitle: "Premier",
      href: "https://www.google.com/partners/",
    },
    {
      label: "Semrush",
      subtitle: "Certified Agency Partner",
      href: "https://www.semrush.com/agency/partners/",
    },
    {
      label: "Clutch",
      subtitle: "4.5 \u2605\u2605\u2605\u2605\u2605",
      href: "https://clutch.co",
    },
  ];

  for (let i = 0; i < badges.length; i++) {
    const b = badges[i];
    await prisma.trustBadge.upsert({
      where: { id: `seed-badge-${i}` },
      update: b,
      create: { id: `seed-badge-${i}`, ...b },
    });
  }
  console.log(`Seeded ${badges.length} trust badges`);
}

async function seedFooterRatings() {
  const ratings = [
    {
      platform: "google",
      score: "4.1",
      href: "https://www.google.com/maps/search/?api=1&query=Search+Modifiers+New+Delhi",
    },
    {
      platform: "clutch",
      score: "4.5",
      href: "https://clutch.co",
    },
  ];

  for (const r of ratings) {
    await prisma.footerRating.upsert({
      where: { platform: r.platform },
      update: { score: r.score, href: r.href },
      create: r,
    });
  }
  console.log(`Seeded ${ratings.length} footer ratings`);
}

async function seedSiteSettings() {
  const existing = await prisma.siteSettings.findFirst();
  if (existing) {
    console.log("Site settings already exist, skipping");
    return;
  }

  await prisma.siteSettings.create({
    data: {
      name: "Search Modifiers",
      tagline: "Performance-led digital growth for ambitious brands",
      description:
        "Search Modifiers is a results-driven digital marketing agency specializing in online reputation management, PR, SEO, paid media, and web development helping brands control their online presence, build trust, and generate measurable business growth.",
      url: "https://searchmodifiers.com",
      email: "hello@searchmodifiers.com",
      phone: "8851037172",
      phoneTel: "+918851037172",
      whatsapp: "918851037172",
      officeRegion: "Delhi NCR",
      officeBadge: "Corporate office",
      streetAddress: "Poorvi Pitampura",
      city: "Pitampura",
      region: "Delhi",
      postalCode: "110034",
      country: "IN",
      addressDetail: "Poorvi Pitampura, Pitampura, Delhi 110034, India",
      linkedinUrl: "http://linkedin.com/company/search-modifiers/",
      twitterUrl: "https://twitter.com/searchmodifiers",
      instagramUrl: "https://www.instagram.com/searchmodifiers",
      facebookUrl: "https://www.facebook.com/SearchModifiersIndia/",
      youtubeUrl: "https://www.youtube.com/@searchmodifiers",
    },
  });
  console.log("Seeded site settings");
}

async function main() {
  console.log("Starting seed...\n");

  await seedTeamMembers();
  await seedCareerRoles();
  await seedFaqItems();
  await seedPortfolioItems();
  await seedNavigationItems();
  await seedTrustBadges();
  await seedFooterRatings();
  await seedSiteSettings();

  console.log("\nSeed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
