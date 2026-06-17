"use client";

import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import { BlogBody } from "@/components/blog/blog-body";
import { FAQJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";
import type { ServiceBlock } from "@/lib/services-data";
import { useSite } from "@/lib/site-context";
import type { ServiceMeta } from "@/lib/services-meta";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceStatRibbon } from "@/components/services/service-stat-ribbon";
import { ServiceBenefitsGrid } from "@/components/services/service-benefits-grid";
import { ServiceProcessTimeline } from "@/components/services/service-process-timeline";
import { ServiceFaq } from "@/components/services/service-faq";
import { ServiceRelated } from "@/components/services/service-related";
import { ServiceFinalCta } from "@/components/services/service-final-cta";

export function ServicePageBody({ service, meta, relatedServices }: {
  service: ServiceBlock;
  meta: ServiceMeta;
  relatedServices: ServiceBlock[];
}) {
  const site = useSite();
  const url = `${site.url}/services/${service.slug}`;

  return (
    <>
      <ServiceJsonLd
        name={service.title}
        description={service.metaDescription}
        url={url}
      />
      {service.faqs.length > 0 ? <FAQJsonLd faqs={service.faqs} /> : null}

      <ServiceHero service={service} meta={meta} />

      <ServiceStatRibbon proof={meta.proof} />

      <section className="py-20 sm:py-24">
        <Container>
          <FadeIn>
            <div className="glass gradient-border relative overflow-hidden rounded-3xl p-8 sm:p-10 md:p-14">
              <div className="noise-overlay rounded-3xl" />
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/10 blur-[100px]" />
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-rose-500/10 blur-[80px]" />
              <div className="relative">
                {service.detailMarkdown ? (
                  service.detailMarkdown.trim().startsWith("<") ? (
                    <div
                      className="prose dark:prose-invert prose-sm sm:prose-base max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-orange-400 prose-strong:text-foreground prose-img:rounded-xl"
                      dangerouslySetInnerHTML={{ __html: service.detailMarkdown }}
                    />
                  ) : (
                    <BlogBody content={service.detailMarkdown} />
                  )
                ) : (
                  <>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-orange-400/90">
                      What this service delivers
                    </p>
                    <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-[2.1rem] md:leading-tight">
                      {service.intro}
                    </h2>
                    <p className="mt-6 max-w-3xl leading-relaxed text-foreground/80 sm:text-lg">
                      {service.explanation}
                    </p>
                  </>
                )}
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <ServiceBenefitsGrid
        benefits={service.benefits}
        eyebrow={service.benefitsEyebrow || undefined}
        title={service.benefitsTitle || undefined}
        description={service.benefitsDescription || undefined}
      />

      <ServiceProcessTimeline
        steps={service.process}
        eyebrow={service.processEyebrow || undefined}
        title={service.processTitle || undefined}
        description={service.processDescription || undefined}
      />

      <ServiceFaq
        faqs={service.faqs}
        eyebrow={service.faqEyebrow || undefined}
        title={service.faqTitle || undefined}
        description={service.faqDescription || undefined}
      />

      <ServiceRelated services={relatedServices} />

      <ServiceFinalCta serviceTitle={service.title} />
    </>
  );
}
