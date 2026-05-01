"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/fade-in";
import { Tilt3D } from "@/components/motion/tilt-3d";
import { ServiceBenefitIcon } from "@/components/services/service-benefit-icon";

type Benefit = { title: string; description: string; icon: string };

export function ServiceBenefitsGrid({ benefits }: { benefits: Benefit[] }) {

  return (
    <section className="relative py-20 sm:py-24">
      <div className="gradient-line absolute inset-x-0 top-0" />
      <Container>
        <SectionHeading
          eyebrow="Outcomes"
          title="Benefits that show up in your metrics"
          description="We optimize for pipeline, revenue proxies, and durable organic equity — not vanity dashboards."
        />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <StaggerItem key={b.title}>
              <Tilt3D max={6} scale={1.01}>
                <div className="spotlight-card glass holo group relative h-full overflow-hidden rounded-2xl border border-border p-6 sm:p-7">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-400/0 blur-3xl transition-colors duration-500 group-hover:bg-orange-400/10"
                  />

                  <div className="tilt-layer relative">
                    <div className="relative inline-flex h-12 w-12 items-center justify-center">
                      <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500/25 to-rose-500/15 transition-transform duration-500 group-hover:scale-110" />
                      <span className="absolute inset-0 rounded-xl border border-orange-500/15" />
                      <ServiceBenefitIcon
                        name={b.icon}
                        className="relative h-5 w-5 text-orange-500 transition-transform duration-500 group-hover:rotate-6"
                      />
                    </div>

                    <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                      {b.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground/85">
                      {b.description}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted/60">
                      <span className="h-px w-6 bg-gradient-to-r from-orange-400/60 to-transparent" />
                      {String(i + 1).padStart(2, "0")} / {String(benefits.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </Tilt3D>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
