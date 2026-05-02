import type { Metadata } from "next";
import { HomeTestimonials } from "@/components/home/home-testimonials";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { PageHero } from "@/components/pages/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { testimonials } from "@/lib/testimonials";
import { site } from "@/lib/site";
import { Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What clients say about working with Search Modifiers — performance, communication, and integrity.",
  alternates: { canonical: `${site.url}/testimonials` },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Word-of-mouth is our true north star"
        description="We’re proud of retention and referrals. Here’s a sample of recent feedback — more references available on request."
      >
        <Button href="/contact">Request references</Button>
      </PageHero>
      <section className="border-y border-border bg-background/40 py-16">
        <Container>
          <h2 className="text-center font-display text-xl font-semibold text-foreground">Featured slider</h2>
          <div className="mt-10">
            <HomeTestimonials />
          </div>
        </Container>
      </section>
      <section className="pb-20 sm:pb-28">
        <Container>
          <Stagger className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <StaggerItem key={t.name + t.company}>
                <FadeIn>
                  <blockquote className="glass relative h-full rounded-2xl p-8">
                    <Quote className="absolute right-6 top-6 h-10 w-10 text-orange-500/10" />
                    <p className="text-foreground/90">&ldquo;{t.quote}&rdquo;</p>
                    <footer className="mt-6 border-t border-border pt-6">
                      <cite className="not-italic">
                        <span className="font-semibold text-foreground">{t.name}</span>
                        <span className="mt-1 block text-sm text-muted/70">
                          {t.role}, {t.company}
                        </span>
                      </cite>
                    </footer>
                  </blockquote>
                </FadeIn>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
