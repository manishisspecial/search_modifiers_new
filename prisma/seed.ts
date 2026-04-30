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
  for (const post of blogData.blogPosts) {
    await prisma.blogPost.create({
      data: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        date: post.date,
        author: post.author,
        readTime: post.readTime,
        category: post.category,
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

  // Seed Navigation
  console.log("🗂️ Seeding navigation...");
  const mainNav = [
    { label: "Home", href: "/", category: "main", order: 0 },
    { label: "Services", href: "/services", category: "main", order: 1 },
    { label: "Blog", href: "/blog", category: "main", order: 2 },
    { label: "Case Studies", href: "/case-studies", category: "main", order: 3 },
    { label: "Locations", href: "/locations", category: "main", order: 4 },
    { label: "About", href: "/about", category: "main", order: 5 },
    { label: "Contact", href: "/contact", category: "main", order: 6 },
  ];

  for (const item of mainNav) {
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
