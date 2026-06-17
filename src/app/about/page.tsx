import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/fade-in";
import { PageHero } from "@/components/pages/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSite } from "@/lib/get-site";
import { Target, Heart, Lightbulb } from "lucide-react";
import { getAboutContent } from "@/lib/about-content";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: "About Us",
    description:
      "Search Modifiers is a performance-led digital marketing agency blending strategy, creative, and engineering for brands in India and abroad.",
    alternates: { canonical: `${site.url}/about` },
  };
}

const values = [
  {
    title: "Integrity over optics",
    body: "We say no to gray-hat shortcuts. Your reputation and our sleep matter more than a vanity ranking screenshot.",
    icon: Heart,
  },
  {
    title: "Clarity is kindness",
    body: "Jargon-free updates, transparent trade-offs, and dashboards your leadership can defend in a boardroom.",
    icon: Lightbulb,
  },
  {
    title: "Outcomes own the agenda",
    body: "We align on economic goals first \u2014 then reverse-engineer channel mix, creative, and technical work to match.",
    icon: Target,
  },
];

export default async function AboutPage() {
  const content = await getAboutContent();

  return (
    <>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
      >
        <Button href="/team">Meet the team</Button>
        <Button href="/careers" variant="outline">
          Careers
        </Button>
      </PageHero>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">{content.story.heading}</h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
                {content.story.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <div className="glass gradient-border rounded-3xl p-8 sm:p-10">
                <h3 className="font-display text-xl font-semibold text-foreground">How we hire & train</h3>
                <p className="mt-4 text-muted">
                  Strategists rotate through delivery squads. Media buyers pair with SEO leads on landing page tests. Designers sit in performance reviews.
                  Cross-training isn&apos;t a perk \u2014 it&apos;s how we avoid blind spots.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-foreground/80">
                  <li>\u2022 Weekly learning blocks on platform updates</li>
                  <li>\u2022 Ethical guidelines for ORM and paid claims</li>
                  <li>\u2022 Quarterly client listening tours with leadership</li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-background/50 py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Values"
            title="Principles you'll feel in week one"
            description="Culture shows up in Slack threads, change logs, and how we behave when campaigns dip."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/15 text-orange-500">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <FadeIn>
            <div className="glass gradient-border rounded-3xl px-8 py-12 text-center">
              <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">See if we&apos;re a fit</h2>
              <p className="mx-auto mt-4 max-w-lg text-muted">Two calls: discovery and recommendations. No obligation pitch deck marathon.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/contact">Contact us</Button>
                <Button href="/case-studies" variant="outline">
                  Read case studies
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
