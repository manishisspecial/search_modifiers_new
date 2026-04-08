import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} for digital marketing, SEO, and paid media. ${site.phone} · ${site.email}`,
  alternates: { canonical: `${site.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you’re building"
        description="We respond within one business day with next steps — usually a 30-minute discovery and a tailored recommendation outline."
      />
      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-2 space-y-8">
              <div className="glass rounded-2xl p-6">
                <h2 className="font-display text-lg font-semibold text-foreground">Direct lines</h2>
                <ul className="mt-6 space-y-4 text-sm text-muted">
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                    <a href={`tel:${site.phoneTel}`} className="hover:text-foreground">
                      {site.phone}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                    <a href={`mailto:${site.email}`} className="hover:text-foreground">
                      {site.email}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                    <span>
                      {site.address.street}, {site.address.city} {site.address.postalCode}
                    </span>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-muted/70">
                For RFPs and security questionnaires, email {site.email} with “RFP” in the subject — we’ll route to our solutions team.
              </p>
            </div>
            <div className="glass gradient-border rounded-2xl p-6 sm:p-8 lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
