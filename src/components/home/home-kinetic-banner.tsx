"use client";

import { Asterisk } from "lucide-react";
import { KineticMarquee } from "@/components/motion/kinetic-marquee";

const WORDS = [
  "SEO",
  "Paid Media",
  "Content",
  "Brand Systems",
  "CRO",
  "Analytics",
  "Performance",
  "Reputation",
  "Social",
  "Influencer",
];

/**
 * Two contra-rotating kinetic rows:
 * - Top row is solid gradient text.
 * - Bottom row is outlined (chromatic-style) text going the other direction.
 * Together they create a brand-strong kinetic banner that physically reacts
 * to the user's scroll velocity.
 */
export function HomeKineticBanner() {
  return (
    <section
      aria-label="Capabilities"
      className="relative isolate overflow-hidden border-y border-border py-10 sm:py-14"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background/0" />

      <KineticMarquee duration={38} rowClassName="gap-6 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]">
        <KineticRow />
      </KineticMarquee>

      <div className="h-3" />

      <KineticMarquee
        duration={44}
        direction="reverse"
        rowClassName="gap-6 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]"
      >
        <KineticRow variant="outline" />
      </KineticMarquee>
    </section>
  );
}

function KineticRow({ variant = "solid" }: { variant?: "solid" | "outline" }) {
  return (
    <>
      {WORDS.map((w) => (
        <span
          key={`${variant}-${w}`}
          className="inline-flex shrink-0 items-center gap-6 font-display font-extrabold leading-none tracking-[-0.03em]"
        >
          <span
            className={
              variant === "solid" ? "gradient-text" : "text-outline text-foreground"
            }
          >
            {w}
          </span>
          <Asterisk
            className="h-7 w-7 shrink-0 text-orange-400/80 sm:h-9 sm:w-9 md:h-12 md:w-12"
            strokeWidth={2.2}
          />
        </span>
      ))}
    </>
  );
}
