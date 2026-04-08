import type { Metadata } from "next";
import { AuditForm } from "@/components/forms/audit-form";
import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Website Audit",
  description:
    "Request a technical SEO, speed, and CRO audit from Search Modifiers. Prioritized, dev-ready recommendations.",
  alternates: { canonical: `${site.url}/free-website-audit` },
};

const includes = [
  "Crawl & indexation health snapshot",
  "Core Web Vitals and quick-win performance notes",
  "On-page and content gap pointers",
  "Conversion friction observations (forms, CTAs, trust)",
];

export default function FreeAuditPage() {
  return (
    <>
      <PageHero
        eyebrow="Free audit"
        title="A senior review — not an automated PDF spam trap"
        description="Submit your site and goals. We manually review and return prioritized fixes you can ship — usually within two business days."
      />
      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-2">
              <h2 className="font-display text-xl font-semibold text-white">What we review</h2>
              <ul className="mt-6 space-y-4">
                {includes.map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-slate-400">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                    {line}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-slate-500">
                Need an NDA first? Email {site.email} with “Audit NDA” — we’ll send a mutual template.
              </p>
            </div>
            <div className="glass gradient-border rounded-2xl p-6 sm:p-8 lg:col-span-3">
              <AuditForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
