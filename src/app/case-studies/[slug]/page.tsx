import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogBody } from "@/components/blog/blog-body";
import { FadeIn } from "@/components/motion/fade-in";
import { PageHero } from "@/components/pages/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  getCaseStudyBySlug as getStaticCaseStudyBySlug,
  getCaseStudySlugs as getStaticCaseStudySlugs,
} from "@/lib/case-studies";
import { getCaseStudyBySlug as getDbCaseStudyBySlug, getCaseStudySlugs as getDbCaseStudySlugs } from "@/lib/db-queries";
import { site } from "@/lib/site";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

type CaseStudyView = {
  slug: string;
  title: string;
  industry: string;
  result: string;
  summary: string;
  content: string;
  metrics: { label: string; value: string }[];
};

async function resolveCaseStudy(slug: string): Promise<CaseStudyView | null> {
  const db = await getDbCaseStudyBySlug(slug);
  if (db) {
    return {
      slug: db.slug,
      title: db.title,
      industry: db.industry,
      result: db.result,
      summary: db.summary,
      content: db.content,
      metrics: db.metrics.map((m) => ({ label: m.label, value: m.value })),
    };
  }
  return getStaticCaseStudyBySlug(slug) ?? null;
}

export async function generateStaticParams() {
  const dbSlugs = await getDbCaseStudySlugs();
  const slugs = dbSlugs.length > 0 ? dbSlugs : getStaticCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = await resolveCaseStudy(slug);
  if (!c) return {};
  const description = c.summary.length > 155 ? `${c.summary.slice(0, 152)}…` : c.summary;
  return {
    title: `${c.title} | Case study`,
    description,
    alternates: { canonical: `${site.url}/case-studies/${slug}` },
    openGraph: {
      type: "article",
      title: `${c.title} | ${site.name}`,
      description,
      url: `${site.url}/case-studies/${slug}`,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const c = await resolveCaseStudy(slug);
  if (!c) notFound();

  return (
    <>
      <PageHero eyebrow={c.industry} title={c.title} description={c.summary}>
        <Button href="/request-quote">Start a similar program</Button>
        <Button href="/contact" variant="outline">
          Talk to our team
        </Button>
      </PageHero>

      <section className="pb-20 sm:pb-28">
        <Container className="max-w-3xl">
          <FadeIn>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted/70 transition hover:text-orange-400"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All case studies
            </Link>
          </FadeIn>

          <FadeIn className="mt-10" delay={0.04}>
            <div className="glass gradient-border relative overflow-hidden rounded-3xl p-8 sm:p-10">
              <div className="noise-overlay rounded-3xl opacity-50" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-400/90">Primary outcome</p>
                <p className="mt-3 font-display text-2xl font-bold text-emerald-400 sm:text-3xl">{c.result}</p>
                <ul className="mt-8 flex flex-wrap gap-3">
                  {c.metrics.map((m) => (
                    <li
                      key={m.label}
                      className="rounded-xl border border-border bg-card/80 px-4 py-2.5 text-xs backdrop-blur-sm"
                    >
                      <span className="text-muted/70">{m.label}</span>{" "}
                      <span className="font-semibold text-foreground">{m.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="mt-14" delay={0.08}>
            <BlogBody content={c.content} />
          </FadeIn>

          <FadeIn className="mt-16 flex flex-col gap-4 sm:flex-row sm:flex-wrap" delay={0.1}>
            <Button href="/request-quote" className="justify-center px-8">
              Request a quote
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href="/free-website-audit" variant="outline" className="justify-center px-8">
              Free website audit
            </Button>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
