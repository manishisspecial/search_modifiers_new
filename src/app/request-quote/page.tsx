import type { Metadata } from "next";
import { QuoteForm } from "@/components/forms/quote-form";
import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Request a tailored proposal from Search Modifiers for SEO, paid media, ORM, content, or web projects.",
  alternates: { canonical: `${site.url}/request-quote` },
};

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Quote"
        title="Scope, timeline, and success metrics — in plain language"
        description="The more context you share, the sharper our first pass. Expect a strategist to follow up within 24 hours."
      />
      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="mx-auto max-w-3xl glass gradient-border rounded-2xl p-6 sm:p-10">
            <QuoteForm />
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-slate-500">
            Prefer to talk first? Call {site.phone} or write {site.email} — same SLA.
          </p>
        </Container>
      </section>
    </>
  );
}
