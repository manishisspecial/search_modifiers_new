import type { Metadata } from "next";
import { AnimatedSectionHeading } from "@/components/home/animated-section-heading";
import { HomeApproach } from "@/components/home/home-approach";
import { HomeBlogSection } from "@/components/home/home-blog-section";
import { HomeCaseStudyCard } from "@/components/home/home-case-study-card";
import { HomeConversionBar } from "@/components/home/home-conversion-bar";
import { HomeHero } from "@/components/home/home-hero";
import { HomeImpactRibbon } from "@/components/home/home-impact-ribbon";
import { HomeLogoWall } from "@/components/home/home-logo-wall";
import { HomeMegaCta } from "@/components/home/home-mega-cta";
import { HomeMidCta } from "@/components/home/home-mid-cta";
import { HomeServicesStack } from "@/components/home/home-services-stack";
import { HomeStickyCta } from "@/components/home/home-sticky-cta";
import { HomePortfolio } from "@/components/home/home-portfolio";
import { HomeTestimonialsMarquee } from "@/components/home/home-testimonials-marquee";
import { OfficeInfoSection } from "@/components/layout/office-info-section";
import { BlurFade } from "@/components/motion/blur-fade";
import { FadeIn } from "@/components/motion/fade-in";
import { SpotlightContainer } from "@/components/motion/spotlight-cards";
import { Tilt3D } from "@/components/motion/tilt-3d";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { caseStudies as staticCaseStudies } from "@/lib/case-studies";
import { getCaseStudies, getTestimonials, getPortfolioItems } from "@/lib/db-queries";
import { testimonials as staticTestimonials } from "@/lib/testimonials";
import { getHomeContent } from "@/lib/home-content";
import { getSite } from "@/lib/get-site";
import type { LucideIcon } from "lucide-react";
import { BarChart3, Layers, LineChart, Users } from "lucide-react";

export const dynamic = "force-dynamic";

const whyIcons: LucideIcon[] = [BarChart3, LineChart, Layers, Users];

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: "Digital Marketing & SEO Agency",
    description: site.description,
    alternates: { canonical: site.url },
  };
}

export default async function HomePage() {
  const [dbCaseStudies, dbTestimonials, dbPortfolioItems, homeContent] = await Promise.all([
    getCaseStudies(),
    getTestimonials(),
    getPortfolioItems(),
    getHomeContent(),
  ]);
  const why = homeContent.why.cards.map((card, i) => ({
    title: card.title,
    body: card.body,
    icon: whyIcons[i % whyIcons.length],
  }));
  const dbMapped = dbCaseStudies.map((c) => ({
    slug: c.slug,
    title: c.title,
    industry: c.industry,
    result: c.result,
    summary: c.summary,
    content: c.content,
    metrics: c.metrics.map((m) => ({ label: m.label, value: m.value })),
  }));
  const dbSlugs = new Set(dbMapped.map((c) => c.slug));
  const caseStudies = [
    ...dbMapped,
    ...staticCaseStudies.filter((c) => !dbSlugs.has(c.slug)),
  ];
  const dbTestimonialsMapped = dbTestimonials.map((t) => ({ quote: t.quote, name: t.name, role: t.role, company: t.company }));
  const dbTestimonialKeys = new Set(dbTestimonialsMapped.map((t) => `${t.name}|${t.company}`));
  const testimonials = [
    ...dbTestimonialsMapped,
    ...staticTestimonials.filter((t) => !dbTestimonialKeys.has(`${t.name}|${t.company}`)),
  ];

  const staticPortfolioItems = [
    { title: "Fintech rebrand + site relaunch", category: "Brand & Web", description: "Positioning refresh, design system, and Next.js marketing site with sub-2s LCP globally.", icon: "layout" },
    { title: "D2C skincare — Meta creative OS", category: "Paid Social", description: "UGC factory, hook matrix, and catalog ads that sustained 4× ROAS through scale.", icon: "share2" },
    { title: "B2B SaaS — topical SEO program", category: "SEO & Content", description: "120+ templates indexed; integration hub that drives 40% of demo requests.", icon: "search" },
    { title: "Healthcare group — ORM + local", category: "ORM", description: "GBP governance across 22 clinics; review velocity +4× with ethical prompts.", icon: "palette" },
  ];
  const portfolioMapped = dbPortfolioItems.map((it) => ({
    title: it.title,
    category: it.category,
    description: it.description,
    icon: it.icon || "sparkles",
  }));
  const portfolioTitles = new Set(portfolioMapped.map((it) => it.title));
  const portfolioItems = [
    ...portfolioMapped,
    ...staticPortfolioItems.filter((it) => !portfolioTitles.has(it.title)),
  ];
  return (
    <>
      <HomeStickyCta content={homeContent.stickyCta} />
      <HomeHero content={homeContent.hero} />

      <HomeLogoWall content={homeContent.logoWall} />

      <section className="py-14 sm:py-18">
        <Container>
          <HomeConversionBar content={homeContent.conversionBar} />
        </Container>
      </section>

      <HomeServicesStack content={homeContent.servicesStack} />

      <HomeApproach content={homeContent.approach} />

      <HomeImpactRibbon content={homeContent.impactRibbon} />

      {/* Why us */}
      <section className="relative py-24 sm:py-32">
        <div className="gradient-line absolute inset-x-0 top-0" />
        <Container>
          <AnimatedSectionHeading
            eyebrow={homeContent.why.eyebrow}
            title={homeContent.why.title}
            description={homeContent.why.description}
          />
          <SpotlightContainer className="mt-16 grid gap-6 md:grid-cols-2">
            {why.map((w, idx) => (
              <BlurFade key={w.title} delay={idx * 0.08}>
                <Tilt3D max={6} scale={1.01}>
                  <WhyCard {...w} />
                </Tilt3D>
              </BlurFade>
            ))}
          </SpotlightContainer>
        </Container>
      </section>

      {/* Mid CTA */}
      <section className="py-6 sm:py-8">
        <Container>
          <HomeMidCta content={homeContent.midCta} />
        </Container>
      </section>

      {/* Case studies */}
      <section className="relative py-24 sm:py-32">
        <div className="gradient-line absolute inset-x-0 top-0" />
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <AnimatedSectionHeading
              eyebrow={homeContent.caseStudiesHeading.eyebrow}
              title={homeContent.caseStudiesHeading.title}
              description={homeContent.caseStudiesHeading.description}
            />
            <FadeIn>
              <Button href={homeContent.caseStudiesHeading.ctaHref} variant="outline" className="px-6 py-3">
                {homeContent.caseStudiesHeading.ctaLabel}
              </Button>
            </FadeIn>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {caseStudies.map((c) => (
              <FadeIn key={c.slug}>
                <Tilt3D max={5} scale={1.005}>
                  <div data-cursor="view" data-cursor-label="Read">
                    <HomeCaseStudyCard c={c} />
                  </div>
                </Tilt3D>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Portfolio */}
      <HomePortfolio content={homeContent.portfolioHeading} items={portfolioItems} />

      {/* Testimonials */}
      <section className="relative py-24 sm:py-32">
        <div className="gradient-line absolute inset-x-0 top-0" />
        <Container>
          <AnimatedSectionHeading
            eyebrow={homeContent.testimonialsHeading.eyebrow}
            title={homeContent.testimonialsHeading.title}
            description={homeContent.testimonialsHeading.description}
            align="center"
            className="mx-auto"
          />
        </Container>
        <div className="mt-16">
          <HomeTestimonialsMarquee items={testimonials} />
        </div>
      </section>

      <HomeBlogSection content={homeContent.blogHeading} />

      <OfficeInfoSection className="py-24 sm:py-32" withTopDivider />

      <HomeMegaCta content={homeContent.megaCta} />
    </>
  );
}

function WhyCard({
  title,
  body,
  icon: Icon,
}: {
  title: string;
  body: string;
  icon: LucideIcon;
}) {
  return (
    <div className="spotlight-card holo group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-500 sm:p-9">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/0 to-rose-500/0 opacity-0 transition-opacity duration-500 group-hover:from-orange-500/[0.06] group-hover:to-transparent group-hover:opacity-100" />
      <div className="relative flex gap-5">
        <span className="tilt-layer flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/25 to-rose-500/15 text-orange-500 shadow-lg shadow-orange-500/5 transition-transform duration-500 group-hover:scale-110">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground/80">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}
