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
import { HomeTestimonialsMarquee } from "@/components/home/home-testimonials-marquee";
import { OfficeInfoSection } from "@/components/layout/office-info-section";
import { BlurFade } from "@/components/motion/blur-fade";
import { FadeIn } from "@/components/motion/fade-in";
import { SpotlightContainer } from "@/components/motion/spotlight-cards";
import { Tilt3D } from "@/components/motion/tilt-3d";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { caseStudies as staticCaseStudies } from "@/lib/case-studies";
import { getCaseStudies, getTestimonials } from "@/lib/db-queries";
import { getHomeContent } from "@/lib/home-content";
import { site } from "@/lib/site";
import type { LucideIcon } from "lucide-react";
import { BarChart3, Layers, LineChart, Users } from "lucide-react";

const whyIcons: LucideIcon[] = [BarChart3, LineChart, Layers, Users];

export const metadata: Metadata = {
  title: "Digital Marketing & SEO Agency",
  description: site.description,
  alternates: { canonical: site.url },
};

export default async function HomePage() {
  const [dbCaseStudies, dbTestimonials, homeContent] = await Promise.all([
    getCaseStudies(),
    getTestimonials(),
    getHomeContent(),
  ]);
  const why = homeContent.why.cards.map((card, i) => ({
    title: card.title,
    body: card.body,
    icon: whyIcons[i % whyIcons.length],
  }));
  const caseStudies =
    dbCaseStudies.length > 0
      ? dbCaseStudies.map((c) => ({
          slug: c.slug,
          title: c.title,
          industry: c.industry,
          result: c.result,
          summary: c.summary,
          content: c.content,
          metrics: c.metrics.map((m) => ({ label: m.label, value: m.value })),
        }))
      : staticCaseStudies;
  const testimonials =
    dbTestimonials.length > 0
      ? dbTestimonials.map((t) => ({ quote: t.quote, name: t.name, role: t.role, company: t.company }))
      : undefined;
  return (
    <>
      <HomeStickyCta />
      <HomeHero content={homeContent.hero} />

      {/* Logo marquee */}
      <HomeLogoWall />

      {/* Conversion bar */}
      <section className="py-14 sm:py-18">
        <Container>
          <HomeConversionBar />
        </Container>
      </section>

      {/* Sticky stacking services */}
      <HomeServicesStack />

      {/* Horizontally-pinned approach journey */}
      <HomeApproach />

      {/* Impact metrics ribbon */}
      <HomeImpactRibbon />

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
              eyebrow="Proof"
              title="Case studies with numbers — not adjectives"
              description="A snapshot of recent engagements. Full narratives live on our case studies hub."
            />
            <FadeIn>
              <Button href="/case-studies" variant="outline" className="px-6 py-3">
                View all case studies
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

      {/* Testimonials — dual kinetic marquee */}
      <section className="relative py-24 sm:py-32">
        <div className="gradient-line absolute inset-x-0 top-0" />
        <Container>
          <AnimatedSectionHeading
            eyebrow="Voices"
            title="Trusted by operators who hate fluff"
            description="Retention and referrals are our real KPIs. Here's what clients say — references available on request."
            align="center"
            className="mx-auto"
          />
        </Container>
        <div className="mt-16">
          <HomeTestimonialsMarquee items={testimonials} />
        </div>
      </section>

      {/* Blog — featured + stack (match reference layout) */}
      <HomeBlogSection />

      <OfficeInfoSection className="py-24 sm:py-32" withTopDivider />

      {/* Signature mega CTA closer */}
      <HomeMegaCta />
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
