import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/fade-in";
import { PageHero } from "@/components/pages/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FAQJsonLd } from "@/components/seo/json-ld";
import { getSite } from "@/lib/get-site";
import { getFaqItems } from "@/lib/db-queries";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: "FAQ",
    description: "Frequently asked questions about Search Modifiers — pricing, process, channels, and engagement models.",
    alternates: { canonical: `${site.url}/faq` },
  };
}

export default async function FAQPage() {
  const faqs = await getFaqItems();

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
              <FadeIn key={f.id} delay={i * 0.04}>
                <div className="p-6 sm:p-8">
                  <h2 className="font-display text-lg font-semibold text-foreground">{f.q}</h2>
                  <p className="mt-3 text-muted leading-relaxed">{f.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          {faqs.length === 0 && (
            <FadeIn className="mt-8 text-center">
              <p className="text-muted">No FAQs yet. Check back soon!</p>
            </FadeIn>
          )}
        </Container>
      </section>
    </>
  );
}
