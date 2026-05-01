import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { PageHero } from "@/components/pages/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getSite } from "@/lib/get-site";
import { getTeamMembers } from "@/lib/db-queries";
import { Linkedin } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: "Team",
    description: "Meet the strategists, media buyers, and creatives behind Search Modifiers.",
    alternates: { canonical: `${site.url}/team` },
  };
}

export default async function TeamPage() {
  const [site, team] = await Promise.all([getSite(), getTeamMembers()]);

  return (
    <>
      <PageHero
        eyebrow="Team"
        title="Senior people on the tools — not B-teams hidden offshore"
        description="Every client gets strategists who've shipped at scale. We keep ratios tight so decisions stay fast."
      >
        <Button href="/careers">Join us</Button>
      </PageHero>
      <section className="pb-20 sm:pb-28">
        <Container>
          <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <StaggerItem key={m.id}>
                <article className="glass overflow-hidden rounded-2xl">
                  <div className="relative aspect-square w-full bg-surface">
                    {m.image ? (
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-muted/30">
                        {m.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-lg font-semibold text-foreground">{m.name}</h2>
                    <p className="text-sm font-medium text-orange-400/90">{m.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{m.bio}</p>
                    <a
                      href={m.linkedinUrl || site.social.linkedin}
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
          {team.length === 0 && (
            <FadeIn className="mt-16 text-center">
              <p className="text-muted">No team members to display yet.</p>
            </FadeIn>
          )}
        </Container>
      </section>
    </>
  );
}
