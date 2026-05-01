import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { OfficeInfoSection } from "@/components/layout/office-info-section";
import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { getSite } from "@/lib/get-site";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: "Contact",
    description: `Contact ${site.name} for digital marketing, SEO, and paid media. ${site.phone} · ${site.email}`,
    alternates: { canonical: `${site.url}/contact` },
  };
}

export default async function ContactPage() {
  const site = await getSite();
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you’re building"
        description="We respond within one business day with next steps — usually a 30-minute discovery and a tailored recommendation outline."
      />
      <OfficeInfoSection className="pb-12 sm:pb-16" compactHeading />
      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="glass gradient-border rounded-2xl p-6 sm:p-8">
              <ContactForm />
            </div>
            <p className="mt-8 text-center text-sm text-muted/70">
              For RFPs and security questionnaires, email {site.email} with “RFP” in the subject — we’ll route to our
              solutions team.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
