import type { Metadata } from "next";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/fade-in";
import { PageHero } from "@/components/pages/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { services } from "@/lib/services-data";
import { site } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing Services",
  description:
    "SEO, paid media, ORM, content, social, and web development — full-funnel services from Search Modifiers.",
  alternates: { canonical: `${site.url}/services` },
};

export default function ServicesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything growth — one accountable partner"
        description="Pick a lane to explore playbooks, process, and FAQs. Every engagement ships with clear metrics and weekly momentum."
      >
        <Button href="/request-quote">Request a quote</Button>
      </PageHero>
      <section className="pb-20 sm:pb-28">
        <Container>
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <StaggerItem key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group glass gradient-border flex h-full flex-col rounded-2xl p-6 transition hover:border-cyan-500/25"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-display text-lg font-semibold text-foreground group-hover:text-cyan-500">{s.title}</h2>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted/70 group-hover:text-cyan-400" />
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.shortDescription}</p>
                  <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-cyan-400/80">View service →</span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
