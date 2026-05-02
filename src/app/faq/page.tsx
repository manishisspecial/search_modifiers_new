import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/fade-in";
import { PageHero } from "@/components/pages/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FAQJsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Search Modifiers — pricing, process, channels, and engagement models.",
  alternates: { canonical: `${site.url}/faq` },
};

const faqs = [
  {
    q: "What does a typical engagement look like?",
    a: "We start with a focused discovery (goals, economics, stack). Week 2–3 is roadmap and instrumentation. Execution runs in weekly sprints with a shared dashboard and monthly executive reviews.",
  },
  {
    q: "Do you work on retainers or projects?",
    a: "Both. Always-on channels (SEO, paid, social) fit retainers. Migrations, audits, and launches are often scoped as fixed phases with optional ongoing optimization.",
  },
  {
    q: "Can you collaborate with our in-house team?",
    a: "Yes — we’re effective as an extension of marketing, growth, or engineering. We adapt to your tools (Slack, Jira, Notion) and meeting cadence.",
  },
  {
    q: "What budgets do you usually work with?",
    a: "Engagements vary by scope. Media spend is separate from our fees; we’ll be candid if your budget can’t reach statistical significance for a channel.",
  },
  {
    q: "How do you report ROI?",
    a: "We align on proxy metrics (SQLs, pipeline, revenue where available) and use platform + analytics data. We avoid reporting that can’t be tied to business outcomes.",
  },
  {
    q: "Are you India-only?",
    a: "Delhi NCR is our hub, but we run campaigns and SEO programs globally — especially for SaaS, D2C, and professional services.",
  },
];

export default function FAQPage() {
  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <PageHero
        eyebrow="FAQ"
        title="Answers before you even book a call"
        description="Still stuck? Email us — a human strategist replies, not a bot."
      >
        <Button href="/contact">Ask a question</Button>
      </PageHero>
      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card">
            {faqs.map((f, i) => (
              <FadeIn key={f.q} delay={i * 0.04}>
                <div className="p-6 sm:p-8">
                  <h2 className="font-display text-lg font-semibold text-foreground">{f.q}</h2>
                  <p className="mt-3 text-muted leading-relaxed">{f.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
