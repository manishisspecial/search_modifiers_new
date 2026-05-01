"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tilt3D } from "@/components/motion/tilt-3d";
import { Stagger, StaggerItem } from "@/components/motion/fade-in";
import type { ServiceBlock } from "@/lib/services-data";

export function ServiceRelated({ services }: { services: ServiceBlock[] }) {
  const reduce = useReducedMotion();

  if (!services.length) return null;
  const items = services;

  return (
    <section className="relative py-20 sm:py-24">
      <div className="gradient-line absolute inset-x-0 top-0" />
      <Container>
        <SectionHeading
          eyebrow="Related services"
          title="Pair this with a complementary motion"
          description="Most clients see compounding gains when channels work as a system. Here's what pairs naturally with what you're exploring."
        />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s) => (
            <StaggerItem key={s.slug}>
              <Tilt3D max={6} scale={1.012}>
                <Link
                  href={`/services/${s.slug}`}
                  className="spotlight-card glass holo group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border p-6 transition-colors duration-500 hover:border-orange-400/30"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-orange-400/0 blur-3xl transition-colors duration-500 group-hover:bg-orange-400/10"
                  />
                  <div className="tilt-layer relative">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-400/80">
                      {s.heroEyebrow}
                    </p>
                    <h3 className="mt-3 font-display text-lg font-semibold text-foreground group-hover:text-orange-500">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {s.shortDescription}
                    </p>

                    <motion.span
                      initial={false}
                      whileHover={reduce ? undefined : { x: 4 }}
                      className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-400/90"
                    >
                      Explore service
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.span>
                  </div>
                </Link>
              </Tilt3D>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
