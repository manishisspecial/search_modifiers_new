import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { PageHero } from "@/components/pages/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { caseStudies } from "@/lib/case-studies";
import { site } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Selected growth stories from Search Modifiers — SEO, paid media, ORM, and full-funnel programs.",
  alternates: { canonical: `${site.url}/case-studies` },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Outcomes we can talk about"
        description="Anonymized where needed — but always grounded in metrics your CFO would recognize."
      >
        <Button href="/request-quote">Start a similar engagement</Button>
      </PageHero>
      <section className="pb-20 sm:pb-28">
        <Container>
          <Stagger className="grid gap-8 lg:grid-cols-2">
            {caseStudies.map((c, i) => (
              <StaggerItem key={c.slug}>
                <FadeIn delay={i * 0.04}>
                  <article className="glass gradient-border h-full rounded-2xl p-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-orange-400/90">{c.industry}</p>
                    <h2 className="mt-3 font-display text-2xl font-semibold text-foreground">
                      <Link href={`/case-studies/${c.slug}`} className="transition hover:text-orange-500">
                        {c.title}
                      </Link>
                    </h2>
                    <p className="mt-4 text-muted">{c.summary}</p>
                    <p className="mt-4 text-lg font-semibold text-emerald-400">{c.result}</p>
                    <ul className="mt-6 flex flex-wrap gap-3">
                      {c.metrics.map((m) => (
                        <li key={m.label} className="rounded-lg bg-card px-3 py-2 text-xs">
                          <span className="text-muted/70">{m.label}</span>{" "}
                          <span className="font-semibold text-foreground">{m.value}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/case-studies/${c.slug}`}
                      className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-orange-400 hover:text-orange-500"
                    >
                      Read the full story <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </article>
                </FadeIn>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
