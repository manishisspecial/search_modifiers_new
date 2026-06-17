import { AnimatedSectionHeading } from "@/components/home/animated-section-heading";
import { BlurFade } from "@/components/motion/blur-fade";
import { FadeIn } from "@/components/motion/fade-in";
import { Tilt3D } from "@/components/motion/tilt-3d";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Palette, Layout, Share2, Search, Sparkles, type LucideIcon } from "lucide-react";
import type { HomeContent } from "@/lib/home-content";

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  layout: Layout,
  share2: Share2,
  search: Search,
  palette: Palette,
};

interface PortfolioItem {
  title: string;
  category: string;
  description: string;
  icon: string;
}

export function HomePortfolio({
  content,
  items,
}: {
  content: HomeContent["portfolioHeading"];
  items: PortfolioItem[];
}) {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="gradient-line absolute inset-x-0 top-0" />
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <AnimatedSectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />
          <FadeIn>
            <Button href={content.ctaHref} variant="outline" className="px-6 py-3">
              {content.ctaLabel}
            </Button>
          </FadeIn>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {items.map((item, idx) => {
            const Icon = iconMap[item.icon?.toLowerCase()] ?? Sparkles;
            return (
              <BlurFade key={item.title} delay={idx * 0.08}>
                <Tilt3D max={5} scale={1.005}>
                  <article className="spotlight-card group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/0 to-rose-500/0 opacity-0 transition-opacity duration-500 group-hover:from-orange-500/[0.06] group-hover:to-transparent group-hover:opacity-100" />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-rose-500/20 text-orange-500 transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="relative mt-6 text-xs font-semibold uppercase tracking-wider text-muted/70">
                      {item.category}
                    </p>
                    <h3 className="relative mt-2 font-display text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="relative mt-3 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground/80">
                      {item.description}
                    </p>
                  </article>
                </Tilt3D>
              </BlurFade>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
