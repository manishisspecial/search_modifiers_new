import { prisma } from "../src/lib/db";
import * as servicesData from "../src/lib/services-data";
import * as blogData from "../src/lib/blog-data";
import * as caseStudiesData from "../src/lib/case-studies";
import * as testimonialsData from "../src/lib/testimonials";
import * as locationsData from "../src/lib/locations-data";
import * as siteData from "../src/lib/site";

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data (be careful with this in production!)
  await prisma.navigationItem.deleteMany();
  await prisma.footerRating.deleteMany();
  await prisma.trustBadge.deleteMany();
  await prisma.staticPage.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.caseStudy.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.location.deleteMany();
  await prisma.service.deleteMany();

  // Seed Site Settings
  console.log("📝 Seeding site settings...");
  await prisma.siteSettings.create({
    data: {
      name: siteData.site.name,
      tagline: siteData.site.tagline,
      description: siteData.site.description,
      url: siteData.site.url,
      email: siteData.site.email,
      phone: siteData.site.phone,
      phoneTel: siteData.site.phoneTel,
      whatsapp: siteData.site.whatsapp,
      officeRegion: siteData.site.officeRegion,
      officeBadge: siteData.site.officeBadge,
      streetAddress: siteData.site.address.street,
      city: siteData.site.address.city,
      region: siteData.site.address.region,
      postalCode: siteData.site.address.postalCode,
      country: siteData.site.address.country,
      addressDetail: siteData.site.address.detail,
      linkedinUrl: siteData.site.social.linkedin,
      twitterUrl: siteData.site.social.twitter,
      instagramUrl: siteData.site.social.instagram,
      facebookUrl: siteData.site.social.facebook,
      youtubeUrl: siteData.site.social.youtube,
    },
  });

  // Seed Services
  console.log("🔧 Seeding services...");
  for (const service of servicesData.services) {
    await prisma.service.create({
      data: {
        slug: service.slug,
        title: service.title,
        heroTitle: service.heroTitle,
        shortDescription: service.shortDescription,
        metaTitle: service.metaTitle,
        metaDescription: service.metaDescription,
        heroEyebrow: service.heroEyebrow,
        intro: service.intro,
        explanation: service.explanation,
        detailMarkdown: service.detailMarkdown,
        benefits: {
          createMany: {
            data: service.benefits.map((benefit, index) => ({
              title: benefit.title,
              description: benefit.description,
              icon: benefit.icon,
              order: index,
            })),
          },
        },
        process: {
          createMany: {
            data: service.process.map((step, index) => ({
              step: step.step,
              title: step.title,
              description: step.description,
              order: index,
            })),
          },
        },
        faqs: {
          createMany: {
            data: service.faqs.map((faq, index) => ({
              q: faq.q,
              a: faq.a,
              order: index,
            })),
          },
        },
      },
    });
  }

  // Seed Blog Posts
  console.log("📚 Seeding blog posts...");
  const categoryCache = new Map<string, string>();
  for (const post of blogData.blogPosts) {
    let categoryId: string | undefined;
    if (post.category) {
      if (categoryCache.has(post.category)) {
        categoryId = categoryCache.get(post.category);
      } else {
        const slug = post.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const cat = await prisma.blogCategory.upsert({
          where: { slug },
          update: {},
          create: { name: post.category, slug },
        });
        categoryCache.set(post.category, cat.id);
        categoryId = cat.id;
      }
    }
    await prisma.blogPost.create({
      data: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        date: post.date,
        author: post.author,
        readTime: post.readTime,
        status: "PUBLISHED",
        publishedAt: new Date(post.date),
        ...(categoryId ? { categoryId } : {}),
      },
    });
  }

  // Seed Case Studies
  console.log("📊 Seeding case studies...");
  for (const study of caseStudiesData.caseStudies) {
    await prisma.caseStudy.create({
      data: {
        slug: study.slug,
        title: study.title,
        industry: study.industry,
        result: study.result,
        summary: study.summary,
        content: study.content,
        metrics: {
          createMany: {
            data: study.metrics.map((metric, index) => ({
              label: metric.label,
              value: metric.value,
              order: index,
            })),
          },
        },
      },
    });
  }

  // Seed Testimonials
  console.log("💬 Seeding testimonials...");
  for (const testimonial of testimonialsData.testimonials) {
    await prisma.testimonial.create({
      data: {
        quote: testimonial.quote,
        name: testimonial.name,
        role: testimonial.role,
        company: testimonial.company,
      },
    });
  }

  // Seed Locations
  console.log("📍 Seeding locations...");
  for (const location of locationsData.locations) {
    await prisma.location.create({
      data: {
        slug: location.slug,
        title: location.title,
        metaTitle: location.metaTitle,
        metaDescription: location.metaDescription,
        heroEyebrow: location.heroEyebrow,
        headline: location.headline,
        intro: location.intro,
        sections: {
          createMany: {
            data: location.sections.map((section, index) => ({
              heading: section.heading,
              body: section.body,
              order: index,
            })),
          },
        },
        localStats: {
          createMany: {
            data: location.localStats.map((stat, index) => ({
              label: stat.label,
              value: stat.value,
              order: index,
            })),
          },
        },
        faqs: {
          createMany: {
            data: location.faqs.map((faq, index) => ({
              q: faq.q,
              a: faq.a,
              order: index,
            })),
          },
        },
      },
    });
  }

  // Seed Static Pages (demo content)
  console.log("📄 Seeding static pages...");
  const staticPages = [
    {
      slug: "privacy-policy",
      title: "Privacy Policy",
      metaDescription: "Privacy Policy for Search Modifiers - Learn how we collect, use, and protect your personal information.",
      content: `## Privacy Policy\n\nLast updated: June 2026\n\n### Information We Collect\n\nWe collect information you provide directly to us, such as when you fill out a contact form, request a quote, or sign up for our newsletter.\n\n### How We Use Your Information\n\nWe use the information we collect to:\n- Provide, maintain, and improve our services\n- Send you technical notices and support messages\n- Respond to your comments and questions\n- Send marketing communications (with your consent)\n\n### Data Security\n\nWe implement appropriate security measures to protect your personal information against unauthorized access, alteration, or destruction.\n\n### Contact Us\n\nIf you have questions about this Privacy Policy, please contact us at info@searchmodifiers.com.`,
    },
    {
      slug: "terms-of-service",
      title: "Terms of Service",
      metaDescription: "Terms of Service for Search Modifiers - Read our terms and conditions for using our digital marketing services.",
      content: `## Terms of Service\n\nLast updated: June 2026\n\n### Agreement to Terms\n\nBy accessing our website and using our services, you agree to be bound by these Terms of Service.\n\n### Our Services\n\nSearch Modifiers provides digital marketing services including SEO, PPC management, social media marketing, and web development.\n\n### Payment Terms\n\nPayment terms are outlined in individual service agreements. All fees are non-refundable unless otherwise stated in the contract.\n\n### Intellectual Property\n\nAll content, designs, and strategies created by Search Modifiers remain our intellectual property until full payment is received and ownership is transferred as per the service agreement.\n\n### Limitation of Liability\n\nSearch Modifiers shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.\n\n### Contact\n\nFor questions regarding these terms, reach out to legal@searchmodifiers.com.`,
    },
    {
      slug: "disclaimer",
      title: "Disclaimer",
      metaDescription: "Disclaimer for Search Modifiers - Important information about our website content and digital marketing services.",
      content: `## Disclaimer\n\nLast updated: June 2026\n\n### General Information\n\nThe information provided on this website is for general informational purposes only. While we strive to keep the information up to date and accurate, we make no representations or warranties of any kind.\n\n### Results Disclaimer\n\nDigital marketing results vary based on many factors including industry, competition, budget, and market conditions. Past performance does not guarantee future results.\n\n### External Links\n\nOur website may contain links to external sites. We are not responsible for the content or privacy practices of these sites.\n\n### Professional Advice\n\nThe content on this website does not constitute professional advice. Please consult with our team for personalized recommendations for your business.`,
    },
  ];

  for (const page of staticPages) {
    await prisma.staticPage.create({ data: page });
  }

  // Seed Navigation
  console.log("🗂️ Seeding navigation...");
  const navItems = [
    { label: "Home", href: "/", category: "main", order: 0 },
    { label: "About", href: "/about", category: "main", order: 1 },
    { label: "Services", href: "/services", category: "main", order: 2 },
    { label: "Case Studies", href: "/case-studies", category: "main", order: 3 },
    { label: "Blog", href: "/blog", category: "main", order: 4 },
    { label: "Contact", href: "/contact", category: "main", order: 5 },
    { label: "Delhi", href: "/location/digital-marketing-delhi", category: "locations", order: 0 },
    { label: "Noida", href: "/location/digital-marketing-noida", category: "locations", order: 1 },
    { label: "Gurgaon", href: "/location/digital-marketing-gurgaon", category: "locations", order: 2 },
    { label: "SEO Delhi NCR", href: "/location/seo-delhi-ncr", category: "locations", order: 3 },
    { label: "ORM Delhi", href: "/location/orm-delhi", category: "locations", order: 4 },
  ];

  for (const item of navItems) {
    await prisma.navigationItem.create({
      data: item,
    });
  }

  console.log("✅ Database seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
