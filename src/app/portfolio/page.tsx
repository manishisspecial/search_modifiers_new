import type { Metadata } from "next";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { PageHero } from "@/components/pages/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getSite } from "@/lib/get-site";
import { getPortfolioItems } from "@/lib/db-queries";
import { Palette, Layout, Share2, Search, Sparkles } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: "Portfolio",
    description: "Selected brand, web, and campaign work from Search Modifiers across B2B, D2C, and regulated sectors.",
    alternates: { canonical: `${site.url}/portfolio` },
  };
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  palette: Palette,
  layout: Layout,
  share2: Share2,
  search: Search,
  sparkles: Sparkles,
};

export default async function PortfolioPage() {
  const [site, items] = await Promise.all([getSite(), getPortfolioItems()]);

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Craft, performance, and restraint"
        description="A curated slice of visual and narrative work. For detailed metrics, pair with our case studies."
      >
        <Button href="/case-studies">Case studies</Button>
      </PageHero>
      <section className="pb-20 sm:pb-28">
        <Container>
          <Stagger className="grid gap-6 sm:grid-cols-2">
            {items.map((item) => {
              const Icon = iconMap[item.icon] || Sparkles;
              return (
                <StaggerItem key={item.id}>
                  <article className="glass group relative overflow-hidden rounded-2xl p-8 transition hover:border-orange-500/20">
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-orange-500/10 blur-2xl transition group-hover:bg-orange-500/15" />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-rose-500/20 text-orange-500">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="relative mt-6 text-xs font-semibold uppercase tracking-wider text-muted/70">{item.category}</p>
                    <h2 className="relative mt-2 font-display text-xl font-semibold text-foreground">{item.title}</h2>
                    <p className="relative mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
          {items.length === 0 && (
            <FadeIn className="mt-8 text-center">
              <p className="text-muted">No portfolio items yet.</p>
            </FadeIn>
          )}
          <FadeIn className="mt-16 text-center text-sm text-muted/70">
            Full visuals available under NDA during active pitches — contact {site.email} for a tailored deck.
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
