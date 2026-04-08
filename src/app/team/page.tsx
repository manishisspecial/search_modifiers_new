import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { PageHero } from "@/components/pages/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";
import { Linkedin } from "lucide-react";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the strategists, media buyers, and creatives behind Search Modifiers.",
  alternates: { canonical: `${site.url}/team` },
};

const team = [
  {
    name: "Priya Malhotra",
    role: "Founder & CEO",
    bio: "Former enterprise SEO lead; obsessed with crawl budget and board-ready narratives.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    name: "Arjun Mehta",
    role: "Head of Performance",
    bio: "Structured paid search and Meta programs for fintech and SaaS across APAC.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    name: "Neha Kapoor",
    role: "Creative Director",
    bio: "Hooks, motion, and brand systems that survive algorithm changes.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
  {
    name: "Vikram Singh",
    role: "Director, Content & SEO",
    bio: "Editorial engines for B2B — from SME interviews to programmatic landing pages.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
  },
  {
    name: "Ananya Iyer",
    role: "Lead, ORM & PR",
    bio: "Crisis playbooks and reputation programs for regulated industries.",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
  },
  {
    name: "Rohan Khanna",
    role: "Engineering Partner",
    bio: "Next.js, CWV, and analytics instrumentation for marketing sites.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Team"
        title="Senior people on the tools — not B-teams hidden offshore"
        description="Every client gets strategists who’ve shipped at scale. We keep ratios tight so decisions stay fast."
      >
        <Button href="/careers">Join us</Button>
      </PageHero>
      <section className="pb-20 sm:pb-28">
        <Container>
          <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <StaggerItem key={m.name}>
                <article className="glass overflow-hidden rounded-2xl">
                  <div className="relative aspect-square w-full bg-surface">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-lg font-semibold text-foreground">{m.name}</h2>
                    <p className="text-sm font-medium text-cyan-400/90">{m.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{m.bio}</p>
                    <a
                      href={site.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-muted/70 hover:text-foreground"
                    >
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </a>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn className="mt-16 text-center">
            <p className="text-sm text-muted/70">
              Portraits shown are representative; replace with your team photography in <code className="text-muted">public/</code> when ready.
            </p>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
