import type { Metadata } from "next";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { PageHero } from "@/components/pages/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";
import { getPortfolioItems } from "@/lib/db-queries";
import { Palette, Layout, Share2, Search, Sparkles, type LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected brand, web, and campaign work from Search Modifiers across B2B, D2C, and regulated sectors.",
  alternates: { canonical: `${site.url}/portfolio` },
};

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  layout: Layout,
  share2: Share2,
  search: Search,
  palette: Palette,
};

const staticItems = [
  {
    title: "Fintech rebrand + site relaunch",
    cat: "Brand & Web",
    desc: "Positioning refresh, design system, and Next.js marketing site with sub-2s LCP globally.",
    icon: Layout,
  },
  {
    title: "D2C skincare — Meta creative OS",
    cat: "Paid Social",
    desc: "UGC factory, hook matrix, and catalog ads that sustained 4× ROAS through scale.",
    icon: Share2,
  },
  {
    title: "B2B SaaS — topical SEO program",
    cat: "SEO & Content",
    desc: "120+ templates indexed; integration hub that drives 40% of demo requests.",
    icon: Search,
  },
  {
    title: "Healthcare group — ORM + local",
    cat: "ORM",
    desc: "GBP governance across 22 clinics; review velocity +4× with ethical prompts.",
    icon: Palette,
  },
];

export default async function PortfolioPage() {
  const dbItems = await getPortfolioItems();
  const items =
    dbItems.length > 0
      ? dbItems.map((it) => ({
          title: it.title,
          cat: it.category,
          desc: it.description,
          icon: iconMap[it.icon?.toLowerCase()] ?? Sparkles,
        }))
      : staticItems;
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
            {items.map((it) => (
              <StaggerItem key={it.title}>
                <article className="glass group relative overflow-hidden rounded-2xl p-8 transition hover:border-orange-500/20">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-orange-500/10 blur-2xl transition group-hover:bg-orange-500/15" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-rose-500/20 text-orange-500">
                    <it.icon className="h-6 w-6" />
                  </div>
                  <p className="relative mt-6 text-xs font-semibold uppercase tracking-wider text-muted/70">{it.cat}</p>
                  <h2 className="relative mt-2 font-display text-xl font-semibold text-foreground">{it.title}</h2>
                  <p className="relative mt-3 text-sm leading-relaxed text-muted">{it.desc}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn className="mt-16 text-center text-sm text-muted/70">
            Full visuals available under NDA during active pitches — contact {site.email} for a tailored deck.
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
