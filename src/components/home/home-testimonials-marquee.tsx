"use client";

import { Quote, Star } from "lucide-react";
import { KineticMarquee } from "@/components/motion/kinetic-marquee";
import type { Testimonial } from "@/lib/testimonials";

export function HomeTestimonialsMarquee({ testimonials }: { testimonials: Testimonial[] }) {
  // Split the testimonials across two rows for visual balance
  const rowA = testimonials.slice(0, Math.ceil(testimonials.length / 2) + 1);
  const rowB = [...testimonials.slice(Math.ceil(testimonials.length / 2)), testimonials[0]];

  return (
    <div
      className="relative -mx-4 space-y-6 sm:-mx-6 lg:-mx-8"
      style={{ perspective: "1400px" }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-32" />

      <KineticMarquee duration={64} rowClassName="gap-6 items-stretch">
        {rowA.map((t, i) => (
          <QuoteCard key={`a-${i}-${t.name}`} {...t} />
        ))}
      </KineticMarquee>

      <KineticMarquee duration={72} direction="reverse" rowClassName="gap-6 items-stretch">
        {rowB.map((t, i) => (
          <QuoteCard key={`b-${i}-${t.name}`} {...t} accent />
        ))}
      </KineticMarquee>
    </div>
  );
}

function QuoteCard({
  quote,
  name,
  role,
  company,
  accent = false,
}: {
  quote: string;
  name: string;
  role: string;
  company: string;
  accent?: boolean;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article
      className={`holo glass relative flex w-[min(88vw,420px)] shrink-0 flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-500 hover:-translate-y-1 hover:border-orange-400/30 sm:p-7 ${
        accent ? "border-rose-500/15" : "border-border"
      }`}
    >
      <Quote
        aria-hidden
        className={`absolute right-4 top-4 h-10 w-10 opacity-[0.18] ${
          accent ? "text-rose-400" : "text-orange-400"
        }`}
      />

      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, si) => (
          <Star
            key={si}
            className="h-3.5 w-3.5 fill-amber-400/90 text-amber-400/90"
            aria-hidden
          />
        ))}
      </div>

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90 sm:text-[0.95rem]">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <footer className="mt-6 flex items-center gap-3 border-t border-border/80 pt-5">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white shadow-lg ${
            accent
              ? "from-rose-400 to-rose-500 shadow-rose-500/20"
              : "from-orange-400 to-amber-500 shadow-orange-500/20"
          }`}
          aria-hidden
        >
          {initials}
        </span>
        <cite className="not-italic">
          <span className="block font-display text-sm font-semibold text-foreground">
            {name}
          </span>
          <span className="mt-0.5 block text-xs text-muted">
            {role}, {company}
          </span>
        </cite>
      </footer>
    </article>
  );
}
