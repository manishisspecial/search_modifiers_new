"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const itemReduced = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

export function AnimatedSectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const reduce = useReducedMotion();

  const item = reduce
    ? itemReduced
    : {
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
        },
      };

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.11 },
    },
  };

  return (
    <motion.div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {eyebrow ? (
        <motion.p variants={item} className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-orange-400/90">
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2
        variants={item}
        className="text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl md:text-[2.5rem] md:leading-[1.15]"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p variants={item} className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
