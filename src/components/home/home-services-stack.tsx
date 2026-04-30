"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { AnimatedSectionHeading } from "@/components/home/animated-section-heading";
import { Tilt3D } from "@/components/motion/tilt-3d";
import { Container } from "@/components/ui/container";

type StackItem = {
  slug: string;
  index: string;
  title: string;
  description: string;
  bullets: string[];
  gradient: string;
  accent: string;
};

const ITEMS: StackItem[] = [
  {
    slug: "online-reputation-management",
    index: "01",
    title: "Online Reputation Management (ORM)",
    description:
      "Proactive review ecosystems, negative-result suppression, and SERP defense frameworks — building trust signals that compound quietly over time.",
    bullets: [
      "Negative link suppression & removal",
      "Google review management & improvement",
      "Brand monitoring & reputation control",
      "Positive content creation & promotion",
    ],
    gradient: "from-emerald-500/18 via-orange-500/12 to-transparent",
    accent: "text-emerald-400",
  },
  {
    slug: "seo-services",
    index: "02",
    title: "Search Engine Optimization (SEO)",
    description:
      "Technical SEO frameworks, authority growth, and search-intent optimization — driving qualified organic traffic, and consistent lead flow visibility beyond vanity rankings.",
    bullets: [
      "Keyword research & on-page optimization",
      "Technical SEO to improve site performance",
      "High-quality content to boost rankings & traffic",
      "Link building to increase authority",
    ],
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    accent: "text-orange-400",
  },
  {
    slug: "public-relations",
    index: "03",
    title: "Public Relations (Digital PR & Brand Authority)",
    description:
      "Strategic media positioning, AI-driven narrative amplification, and authority-building PR frameworks strengthening brand credibility, increasing visibility, and securing high-impact coverage across digital and traditional media channels.",
    bullets: [
      "Press release creation & distribution",
      "Media outreach & journalist connections",
      "Brand reputation management",
      "High-authority publication placements",
    ],
    gradient: "from-rose-500/22 via-orange-500/10 to-transparent",
    accent: "text-rose-400",
  },
  {
    slug: "google-ads",
    index: "04",
    title: "Paid Advertising (Google & Social Ads)",
    description:
      "AI-optimized ad engines, precision audience mapping, and conversion-reactor campaign systems — activating lead generation, accelerating sales momentum, and maximizing ROAS across every traffic channel.",
    bullets: [
      "Google Ads & Meta Ads campaign setup",
      "High-converting ad creatives & copy",
      "Audience targeting & retargeting strategies",
      "Continuous optimization for better ROI",
    ],
    gradient: "from-amber-500/22 via-rose-500/10 to-transparent",
    accent: "text-amber-400",
  },
  {
    slug: "social-media-marketing",
    index: "05",
    title: "Social Media Marketing",
    description:
      "Content engines, platform-native growth strategies, and real-time audience engagement loops — scaling social presence, increasing follower velocity, and turning attention into loyal communities.",
    bullets: [
      "Content creation & posting strategy",
      "Instagram, Facebook & LinkedIn management",
      "Audience growth & engagement",
      "Influencer & brand collaborations",
    ],
    gradient: "from-orange-600/18 via-rose-500/10 to-transparent",
    accent: "text-orange-500",
  },
  {
    slug: "website-development",
    index: "06",
    title: "Website Development",
    description:
      "High-speed web architecture, modern interface systems, and conversion-optimized digital environments, elevating brand perception, engaging incoming traffic, and transforming visitors into customers.",
    bullets: [
      "Custom website design tailored to your brand",
      "Mobile-friendly & responsive development",
      "SEO-ready structure & fast loading speed",
      "Conversion-focused pages & lead generation setup",
    ],
    gradient: "from-orange-500/20 via-emerald-500/12 to-transparent",
    accent: "text-emerald-400",
  },
  {
    slug: "generative-engine-optimization",
    index: "07",
    title: "GEO – Generative Engine Optimization",
    description:
      "Generative-search visibility systems, AI citation frameworks, and entity-authority optimization — positioning your brand inside ChatGPT, Gemini, Perplexity, and next-gen answer engines to capture demand before clicks happen.",
    bullets: [
      "Generative-search content systems engineered for AI discovery",
      "Brand citation optimization across ChatGPT, Gemini & AI engines",
      "Entity authority mapping for trusted-source inclusion",
      "Conversational query visibility & zero-click demand capture",
    ],
    gradient: "from-violet-500/20 via-orange-500/12 to-transparent",
    accent: "text-violet-400",
  },
  {
    slug: "answer-engine-optimization",
    index: "08",
    title: "AEO - Answer Engine Optimization",
    description:
      "Answer-engine architecture, entity-based content systems, and query-intent optimization frameworks — increasing AI search visibility, capturing zero-click traffic, and positioning your brand as the preferred answer source.",
    bullets: [
      "Answer-focused content architecture aligned with AI search intent",
      "Entity optimization & structured data deployment systems",
      "Zero-click visibility growth across Google & answer engines",
      "Authority signal expansion for preferred-source ranking",
    ],
    gradient: "from-sky-500/20 via-amber-500/10 to-transparent",
    accent: "text-sky-400",
  },
];

/**
 * Sticky stacking service cards. As the user scrolls, each card pins to the
 * top of the viewport and the next card slides over it with a slight scale
 * down to create a paper-stack effect. Cards themselves have 3D tilt + holo
 * sheen on hover.
 */
export function HomeServicesStack() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="gradient-line absolute inset-x-0 top-0" />
      <Container>
        <AnimatedSectionHeading
          eyebrow="Capabilities"
          title="Full-funnel services — one accountable partner"
          description="From ORM, to branding, SEO, PR, social media, paid ads, we engineer a unified growth ecosystem connecting search discovery, brand trust, and conversion performance."
        />
      </Container>

      {/* Sticky stacking region */}
      <div className="mt-14 sm:mt-20">
        {ITEMS.map((item, i) => (
          <StackCard key={item.slug} item={item} index={i} total={ITEMS.length} />
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

  // As this card leaves the top of the viewport, scale & fade it slightly so
  // the next card visually lands on top.
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
      // Each card shares the same sticky top; they stack naturally because
      // each section has enough height to scroll past before the next sticks.
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

                {/* Big index */}
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
                    {item.bullets.map((b) => (
                      <li
                        key={b}
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

      {/* Spacer that gives each card room to be "read" before the next pins */}
      <div className="h-[55vh] sm:h-[70vh]" aria-hidden />
    </div>
  );
}
