"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <Link
      href="/"
      aria-label="Search Modifiers home"
      className={cn(
        "flex items-center gap-2 transition-opacity duration-300 hover:opacity-85",
        className
      )}
    >
      {imgOk ? (
        <Image
          src="/logo.png"
          alt="Search Modifiers"
          width={800}
          height={240}
          className={cn(
            // Wide horizontal wordmark — let it run up to ~220px on desktop,
            // ~170px on mobile. Height stays compact so the nav bar doesn't grow.
            "h-9 w-auto max-w-[170px] object-contain sm:h-10 sm:max-w-[210px] md:h-11 md:max-w-[230px]",
            // On dark theme, the full-color logo needs a subtle white wash
            // behind its dark wordmark to stay legible. A tiny inline padding
            // pill keeps the orange mark on-brand without color inversion.
            "dark:rounded-md dark:bg-white/90 dark:px-2 dark:py-1"
          )}
          priority
          onError={() => setImgOk(false)}
        />
      ) : (
        <span className="font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">
          Search{" "}
          <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
            Modifiers
          </span>
        </span>
      )}
    </Link>
  );
}
