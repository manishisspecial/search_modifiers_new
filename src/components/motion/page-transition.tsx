"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * CSS-only page-enter animation. Uses a plain div so framer-motion's
 * `initial` prop is never propagated to children — that was breaking
 * `whileInView` animations on all child motion components.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPath.current) {
      const el = ref.current;
      if (el) {
        el.classList.remove("page-enter");
        void el.offsetWidth;
        el.classList.add("page-enter");
      }
      prevPath.current = pathname;
    }
  }, [pathname]);

  return (
    <div ref={ref} className="page-enter">
      {children}
    </div>
  );
}
