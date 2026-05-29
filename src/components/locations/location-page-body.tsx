import { PageHero } from "@/components/pages/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { FAQJsonLd } from "@/components/seo/json-ld";
import type { LocationPage } from "@/lib/locations-data";
import { site } from "@/lib/site";
import { MapPin } from "lucide-react";

export function LocationPageBody({
  loc,
  extraFaqs = [],
}: {
  loc: LocationPage;
  extraFaqs?: { q: string; a: string }[];
}) {
  const url = `${site.url}/location/${loc.slug}`;
  const faqs = [...loc.faqs, ...extraFaqs];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: `${site.name} — ${loc.title}`,
            description: loc.metaDescription,
            url,
            areaServed: { "@type": "Place", name: loc.slug.includes("delhi") ? "Delhi NCR" : "India" },
            provider: { "@type": "Organization", name: site.name, url: site.url },
          }),
        }}
      />
      <FAQJsonLd faqs={faqs} />

      <PageHero eyebrow={loc.heroEyebrow} title={loc.headline} description={loc.intro}>
        <Button href="/request-quote">Get a quote</Button>
        <Button href="/contact" variant="outline">
          Contact Delhi team
        </Button>
      </PageHero>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-10">
              {loc.sections.map((s) => (
                <FadeIn key={s.heading}>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">{s.heading}</h2>
                    <p className="mt-4 text-lg leading-relaxed text-muted">{s.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <div>
              <div className="glass sticky top-28 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-orange-400">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Local snapshot</span>
                </div>
                <ul className="mt-6 space-y-4">
                  {loc.localStats.map((st) => (
                    <li key={st.label} className="flex items-baseline justify-between border-b border-border pb-3 last:border-0">
                      <span className="text-sm text-muted/70">{st.label}</span>
                      <span className="font-display text-xl font-bold text-foreground">{st.value}</span>
                    </li>
                  ))}
                </ul>
                <Button href={`tel:${site.phoneTel}`} variant="secondary" className="mt-8 w-full justify-center">
                  Call {site.phone}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-background/80 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="FAQ" title={`Common questions — ${loc.title}`} />
          <div className="mx-auto mt-10 max-w-3xl space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-medium text-foreground">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <FadeIn>
            <div className="glass gradient-border rounded-3xl px-8 py-12 text-center">
              <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Let’s build momentum in your market</h2>
              <p className="mx-auto mt-4 max-w-lg text-muted">
                Share your goals — we’ll propose a channel mix and measurement plan tuned to {loc.heroEyebrow}.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/request-quote">Request a quote</Button>
                <Button href="/free-website-audit" variant="outline">
                  Free audit
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
