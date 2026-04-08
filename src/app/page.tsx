import type { Metadata } from "next";
import { AnimatedSectionHeading } from "@/components/home/animated-section-heading";
import { HomeCaseStudyCard } from "@/components/home/home-case-study-card";
import { HomeConversionBar } from "@/components/home/home-conversion-bar";
import { HomeFinalCta } from "@/components/home/home-final-cta";
import { HomeHero } from "@/components/home/home-hero";
import { HomeLogoWall } from "@/components/home/home-logo-wall";
import { HomeMidCta } from "@/components/home/home-mid-cta";
import { HomeServiceCard } from "@/components/home/home-service-card";
import { HomeStickyCta } from "@/components/home/home-sticky-cta";
import { HomeTestimonials } from "@/components/home/home-testimonials";
import { BlurFade } from "@/components/motion/blur-fade";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { SpotlightContainer } from "@/components/motion/spotlight-cards";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { caseStudies } from "@/lib/case-studies";
import { services } from "@/lib/services-data";
import { site } from "@/lib/site";
import { Shield, Zap, LineChart, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing & SEO Agency",
  description: site.description,
  alternates: { canonical: site.url },
};

const why = [
  {
    title: "Operator mindset",
    body: "We run weekly experiments, document learnings, and protect your brand like it's our own P&L.",
    icon: Zap,
  },
  {
    title: "Executive-ready reporting",
    body: "Dashboards your CFO understands — pipeline proxies, cohort views, and channel efficiency.",
    icon: LineChart,
  },
  {
    title: "Engineering-friendly SEO",
    body: "Tickets, repro steps, and QA — not vague PDFs that gather dust in Jira.",
    icon: Shield,
  },
  {
    title: "Embedded squads",
    body: "Strategists, media buyers, and creatives in one pod — fewer handoffs, faster shipping.",
    icon: Users,
  },
];

export default function HomePage() {
  return (
    <>
      <HomeStickyCta />
      <HomeHero />

      {/* Logo wall */}
      <HomeLogoWall />

      {/* Conversion bar */}
      <section className="py-14 sm:py-18">
        <Container>
          <HomeConversionBar />
        </Container>
      </section>

      {/* Services */}
      <section className="relative py-24 sm:py-32">
        <div className="gradient-line absolute inset-x-0 top-0" />
        <Container>
          <AnimatedSectionHeading
            eyebrow="Capabilities"
            title="Full-funnel services — one accountable partner"
            description="From technical SEO to paid social, we connect the dots between discovery, trust, and conversion."
          />
          <SpotlightContainer className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Stagger className="contents" stagger={0.07}>
              {services.slice(0, 6).map((s) => (
                <StaggerItem key={s.slug}>
                  <HomeServiceCard href={`/services/${s.slug}`} title={s.title} description={s.shortDescription} />
                </StaggerItem>
              ))}
            </Stagger>
          </SpotlightContainer>
          <FadeIn className="mt-14 text-center">
            <Button href="/services" variant="secondary" className="px-8 py-3 text-base">
              Explore all 13 services
            </Button>
          </FadeIn>
        </Container>
      </section>

      {/* Why us */}
      <section className="relative py-24 sm:py-32">
        <div className="gradient-line absolute inset-x-0 top-0" />
        <Container>
          <AnimatedSectionHeading
            eyebrow="Why Search Modifiers"
            title="Built for brands that outgrow fragmented agencies"
            description="We're obsessive about craft, speed, and integrity — the trifecta that compounds into unfair advantages."
          />
          <SpotlightContainer className="mt-16 grid gap-6 md:grid-cols-2">
            {why.map((w, idx) => (
              <BlurFade key={w.title} delay={idx * 0.08}>
                <WhyCard {...w} />
              </BlurFade>
            ))}
          </SpotlightContainer>
        </Container>
      </section>

      {/* Mid CTA */}
      <section className="py-6 sm:py-8">
        <Container>
          <HomeMidCta />
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
            {caseStudies.slice(0, 2).map((c) => (
              <FadeIn key={c.slug}>
                <HomeCaseStudyCard c={c} />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 sm:py-32">
        <div className="gradient-line absolute inset-x-0 top-0" />
        <Container>
          <AnimatedSectionHeading
            eyebrow="Testimonials"
            title="Trusted by operators who hate fluff"
            description="Retention and referrals are our real KPIs. Here's what clients say — references available on request."
            align="center"
            className="mx-auto"
          />
          <div className="mt-16">
            <HomeTestimonials />
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="pb-28 sm:pb-36">
        <Container>
          <HomeFinalCta />
        </Container>
      </section>
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
  icon: typeof Zap;
}) {
  return (
    <div className="spotlight-card group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-500 sm:p-9">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-violet-500/0 opacity-0 transition-opacity duration-500 group-hover:from-cyan-500/[0.06] group-hover:to-transparent group-hover:opacity-100" />
      <div className="relative flex gap-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/25 to-violet-500/15 text-cyan-500 shadow-lg shadow-cyan-500/5 transition-transform duration-500 group-hover:scale-110">
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
