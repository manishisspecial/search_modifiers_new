"use client";

import { PageHero } from "@/components/pages/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { SpotlightContainer } from "@/components/motion/spotlight-cards";
import { BlogBody } from "@/components/blog/blog-body";
import { ServiceBenefitIcon } from "@/components/services/service-benefit-icon";
import { FAQJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";
import type { ServiceBlock } from "@/lib/services-data";
import { site } from "@/lib/site";
import { CheckCircle2 } from "lucide-react";

export function ServicePageBody({ service }: { service: ServiceBlock }) {
  const url = `${site.url}/services/${service.slug}`;

  return (
    <>
      <ServiceJsonLd name={service.title} description={service.metaDescription} url={url} />
      {service.faqs.length > 0 ? <FAQJsonLd faqs={service.faqs} /> : null}

      <PageHero eyebrow={service.heroEyebrow} title={service.heroTitle ?? service.title} description={service.shortDescription}>
        <Button href="/request-quote">Request a quote</Button>
        <Button href="/free-website-audit" variant="outline">Free website audit</Button>
      </PageHero>

      <section className="py-20 sm:py-24">
        <Container>
          <FadeIn>
            <div className="glass gradient-border relative overflow-hidden rounded-3xl p-8 sm:p-10 md:p-14">
              <div className="noise-overlay rounded-3xl" />
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/10 blur-[100px]" />
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-rose-500/10 blur-[80px]" />
              <div className="relative">
                {service.detailMarkdown ? (
                  <BlogBody content={service.detailMarkdown} />
                ) : (
                  <>
                    <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">What this service delivers</h2>
                    <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">{service.intro}</p>
                    <p className="mt-6 max-w-3xl leading-relaxed text-foreground/80">{service.explanation}</p>
                  </>
                )}
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="relative py-20 sm:py-24">
        <div className="gradient-line absolute inset-x-0 top-0" />
        <Container>
          <SectionHeading
            eyebrow="Outcomes"
            title="Benefits that show up in your metrics"
            description="We optimize for pipeline, revenue proxies, and durable organic equity — not vanity dashboards."
          />
          <SpotlightContainer className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Stagger className="contents">
              {service.benefits.map((b) => (
                <StaggerItem key={b.title}>
                  <div className="spotlight-card glass group h-full rounded-2xl border border-border p-6 transition-all duration-500">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-rose-500/15 text-orange-500 transition-transform duration-500 group-hover:scale-110">
                      <ServiceBenefitIcon name={b.icon} className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{b.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground/80">{b.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </SpotlightContainer>
        </Container>
      </section>

      <section className="relative py-20 sm:py-24">
        <div className="gradient-line absolute inset-x-0 top-0" />
        <Container>
          <SectionHeading
            eyebrow="Process"
            title="How we work with your team"
            description="Transparent phases, clear owners, and weekly momentum — whether you're in Delhi NCR or fully remote."
          />
          <div className="relative mt-14">
            <div className="pointer-events-none absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-orange-500/30 via-amber-500/20 to-transparent lg:block" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, i) => (
                <FadeIn key={step.title} delay={i * 0.08}>
                  <div className="spotlight-card group relative h-full rounded-2xl border border-border bg-card p-6 transition-all duration-500">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/25 to-rose-500/15 font-mono text-xs font-bold text-orange-500 transition-transform duration-500 group-hover:scale-110">
                      {step.step}
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">{step.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative bg-background/80 py-20 sm:py-24">
        <div className="gradient-line absolute inset-x-0 top-0" />
        <Container>
          <SectionHeading eyebrow="FAQ" title="Questions clients ask first" />
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {service.faqs.map((f) => (
              <FadeIn key={f.q}>
                <div className="group rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:border-border hover:bg-card sm:p-8">
                  <div className="flex gap-3.5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-400/80 transition-colors duration-300 group-hover:text-orange-400" />
                    <div>
                      <h3 className="font-display font-medium text-foreground">{f.q}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <FadeIn>
            <div className="glass gradient-border relative overflow-hidden rounded-3xl px-8 py-14 text-center sm:px-14">
              <div className="noise-overlay rounded-3xl" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-orange-500/8 via-transparent to-rose-500/8" />
              <div className="relative">
                <h2 className="font-display text-3xl font-bold text-foreground text-balance sm:text-4xl">Ready to ship outcomes?</h2>
                <p className="mx-auto mt-5 max-w-xl text-muted">
                  Tell us your goals — we&apos;ll respond with a clear scope, timeline, and success definition.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Button href="/request-quote">Request a quote</Button>
                  <Button href="/contact" variant="secondary">Talk to us</Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
