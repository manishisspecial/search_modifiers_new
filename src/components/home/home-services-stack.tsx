"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { AnimatedSectionHeading } from "@/components/home/animated-section-heading";
import { Tilt3D } from "@/components/motion/tilt-3d";
import { Container } from "@/components/ui/container";
import type { HomeContent } from "@/lib/home-content";

type StackItem = {
  slug: string;
  index: string;
  title: string;
  description: string;
  bullets: string[];
  gradient: string;
  accent: string;
};

const GRADIENTS = [
  { gradient: "from-emerald-500/18 via-orange-500/12 to-transparent", accent: "text-emerald-400" },
  { gradient: "from-orange-500/20 via-amber-500/10 to-transparent", accent: "text-orange-400" },
  { gradient: "from-rose-500/22 via-orange-500/10 to-transparent", accent: "text-rose-400" },
  { gradient: "from-amber-500/22 via-rose-500/10 to-transparent", accent: "text-amber-400" },
  { gradient: "from-orange-600/18 via-rose-500/10 to-transparent", accent: "text-orange-500" },
  { gradient: "from-orange-500/20 via-emerald-500/12 to-transparent", accent: "text-emerald-400" },
  { gradient: "from-violet-500/20 via-orange-500/12 to-transparent", accent: "text-violet-400" },
  { gradient: "from-sky-500/20 via-amber-500/10 to-transparent", accent: "text-sky-400" },
];

export function HomeServicesStack({ content }: { content?: HomeContent["servicesStack"] }) {
  const c = content ?? {
    eyebrow: "Capabilities",
    title: "Full-funnel services — one accountable partner",
    description:
      "From ORM, to branding, SEO, PR, social media, paid ads, we engineer a unified growth ecosystem connecting search discovery, brand trust, and conversion performance.",
    items: [],
  };

  const items: StackItem[] = c.items.map((item, i) => ({
    ...item,
    gradient: GRADIENTS[i % GRADIENTS.length].gradient,
    accent: GRADIENTS[i % GRADIENTS.length].accent,
  }));

  return (
    <section className="relative py-24 sm:py-32">
      <div className="gradient-line absolute inset-x-0 top-0" />
      <Container>
        <AnimatedSectionHeading
          eyebrow={c.eyebrow}
          title={c.title}
          description={c.description}
        />
      </Container>

      <div className="mt-14 sm:mt-20">
        {items.map((item, i) => (
          <StackCard key={item.slug || i} item={item} index={i} total={items.length} />
        ))}
      </div>
    </section>
  );
}

function StackCard({
  item,
  index,
  total,
}: {
  item: StackItem;
  index: number;
  total: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1, 0.92]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    reduce ? [1, 1, 1] : [1, 0.85, 0.6]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, -1.5]
  );

  return (
    <div
      ref={ref}
      className="relative"
      style={{ marginBottom: index === total - 1 ? 0 : "4vh" }}
    >
      <div className="sticky top-24 sm:top-28">
        <Container>
          <motion.div
            style={{ scale, opacity, rotate }}
            className="stack-card"
          >
            <Tilt3D max={5} scale={1.005}>
              <article
                data-cursor="view"
                data-cursor-label="Explore"
                className={`holo glass relative grid overflow-hidden rounded-[2rem] border border-border p-6 sm:p-10 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10 md:p-14`}
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.gradient}`}
                />
                <div className="noise-overlay" />

                <div className="relative flex shrink-0 items-start">
                  <span
                    className="num-stamp text-[6rem] leading-[0.85] sm:text-[8rem] md:text-[10rem] lg:text-[12rem]"
                    aria-hidden
                  >
                    {item.index}
                  </span>
                </div>

                <div className="relative flex flex-col justify-center">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-[2.25rem] md:leading-[1.1]">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                    {item.description}
                  </p>

                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {item.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="flex items-start gap-2.5 text-sm text-foreground/80"
                      >
                        <span
                          className={`mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${item.accent}`}
                          style={{ backgroundColor: "currentColor" }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/services/${item.slug}`}
                      className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface-hover px-5 py-2.5 text-sm font-semibold text-foreground transition-all duration-400 hover:border-orange-400/40 hover:bg-orange-500/10"
                    >
                      Explore service
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-rose-400 text-white transition-transform duration-400 group-hover:rotate-45">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                    <Link
                      href="/services"
                      className="hover-underline text-sm text-muted hover:text-foreground"
                    >
                      See related capabilities
                    </Link>
                  </div>
                </div>
              </article>
            </Tilt3D>
          </motion.div>
        </Container>
      </div>

      <div className="h-[55vh] sm:h-[70vh]" aria-hidden />
    </div>
  );
}
