import type { Metadata } from "next";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { PageHero } from "@/components/pages/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";
import { MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Search Modifiers — strategists, media buyers, creatives, and SEO specialists in Delhi NCR and remote.",
  alternates: { canonical: `${site.url}/careers` },
};

const roles = [
  {
    title: "Senior Performance Marketing Manager",
    type: "Full-time · Hybrid (Delhi)",
    desc: "Own Google Ads + Meta for 3–5 accounts; mentor associates; partner with SEO on landing tests.",
  },
  {
    title: "Technical SEO Lead",
    type: "Full-time · Remote-friendly",
    desc: "Lead crawls, migrations, and CWV programs for enterprise sites; comfortable in Next.js stacks.",
  },
  {
    title: "Content Strategist",
    type: "Full-time · Delhi",
    desc: "Build topical maps, brief writers, and align editorial to pipeline stages for B2B clients.",
  },
  {
    title: "ORM Specialist",
    type: "Full-time · Delhi",
    desc: "Review programs, SERP projects, and crisis workflows for regulated and consumer brands.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Do the best work of your career — with adults in the room"
        description="Small teams, high standards, and zero tolerance for black-hat nonsense. We invest in training, tools, and mental health days."
      >
        <Button href={`mailto:${site.email}?subject=General%20application`}>Email your CV</Button>
      </PageHero>
      <section className="pb-20 sm:pb-28">
        <Container>
          <FadeIn>
            <div className="flex flex-wrap gap-6 text-sm text-muted">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-400" /> {site.address.city} HQ + remote
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-400" /> Flexible hours for deep work
              </span>
            </div>
          </FadeIn>
          <Stagger className="mt-12 space-y-5">
            {roles.map((r) => (
              <StaggerItem key={r.title}>
                <article className="glass flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-display text-lg font-semibold text-foreground">{r.title}</h2>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-orange-400/80">{r.type}</p>
                    <p className="mt-3 max-w-2xl text-sm text-muted">{r.desc}</p>
                  </div>
                  <Button
                    href={`mailto:${site.email}?subject=${encodeURIComponent("Application: " + r.title)}`}
                    variant="outline"
                    className="shrink-0"
                  >
                    Apply
                  </Button>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn className="mt-16 rounded-2xl border border-dashed border-border p-8 text-center">
            <p className="text-muted">
              Don’t see a fit? Send a note anyway — we’re always meeting strong strategists and specialists for upcoming pods.
            </p>
            <Button href={`mailto:${site.email}`} variant="secondary" className="mt-6">
              hello@searchmodifiers.com
            </Button>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
