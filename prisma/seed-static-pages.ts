import { prisma } from "../src/lib/db";

async function main() {
  console.log("📄 Seeding static pages...");

  const existing = await prisma.staticPage.count();
  if (existing > 0) {
    console.log(`  Already have ${existing} static page(s), skipping.`);
    return;
  }

  const staticPages = [
    {
      slug: "privacy-policy",
      title: "Privacy Policy",
      metaDescription:
        "Privacy Policy for Search Modifiers - Learn how we collect, use, and protect your personal information.",
      content: `## Privacy Policy\n\nLast updated: June 2026\n\n### Information We Collect\n\nWe collect information you provide directly to us, such as when you fill out a contact form, request a quote, or sign up for our newsletter.\n\n### How We Use Your Information\n\nWe use the information we collect to:\n- Provide, maintain, and improve our services\n- Send you technical notices and support messages\n- Respond to your comments and questions\n- Send marketing communications (with your consent)\n\n### Data Security\n\nWe implement appropriate security measures to protect your personal information against unauthorized access, alteration, or destruction.\n\n### Contact Us\n\nIf you have questions about this Privacy Policy, please contact us at info@searchmodifiers.com.`,
    },
    {
      slug: "terms-of-service",
      title: "Terms of Service",
      metaDescription:
        "Terms of Service for Search Modifiers - Read our terms and conditions for using our digital marketing services.",
      content: `## Terms of Service\n\nLast updated: June 2026\n\n### Agreement to Terms\n\nBy accessing our website and using our services, you agree to be bound by these Terms of Service.\n\n### Our Services\n\nSearch Modifiers provides digital marketing services including SEO, PPC management, social media marketing, and web development.\n\n### Payment Terms\n\nPayment terms are outlined in individual service agreements. All fees are non-refundable unless otherwise stated in the contract.\n\n### Intellectual Property\n\nAll content, designs, and strategies created by Search Modifiers remain our intellectual property until full payment is received and ownership is transferred as per the service agreement.\n\n### Limitation of Liability\n\nSearch Modifiers shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.\n\n### Contact\n\nFor questions regarding these terms, reach out to legal@searchmodifiers.com.`,
    },
    {
      slug: "disclaimer",
      title: "Disclaimer",
      metaDescription:
        "Disclaimer for Search Modifiers - Important information about our website content and digital marketing services.",
      content: `## Disclaimer\n\nLast updated: June 2026\n\n### General Information\n\nThe information provided on this website is for general informational purposes only. While we strive to keep the information up to date and accurate, we make no representations or warranties of any kind.\n\n### Results Disclaimer\n\nDigital marketing results vary based on many factors including industry, competition, budget, and market conditions. Past performance does not guarantee future results.\n\n### External Links\n\nOur website may contain links to external sites. We are not responsible for the content or privacy practices of these sites.\n\n### Professional Advice\n\nThe content on this website does not constitute professional advice. Please consult with our team for personalized recommendations for your business.`,
    },
  ];

  for (const page of staticPages) {
    await prisma.staticPage.create({ data: page });
  }

  console.log("✅ Static pages seeded: privacy-policy, terms-of-service, disclaimer");
  console.log("   View them at /p/privacy-policy, /p/terms-of-service, /p/disclaimer");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
