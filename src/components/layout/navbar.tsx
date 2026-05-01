"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useNav } from "@/lib/nav-context";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const { mainNav, servicesNav, locationsNav } = useNav();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState<null | "services" | "locations">(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 12);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional UI reset on navigation
    setOpen(false);
    setMega(null);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-10 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-3"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 transition-all duration-500 sm:px-6 lg:px-8",
          scrolled
            ? "rounded-2xl border border-border bg-[var(--nav-bg)] py-2.5 shadow-2xl shadow-black/20 backdrop-blur-2xl backdrop-saturate-[1.6] sm:mx-6 lg:mx-auto"
            : "py-1"
        )}
      >
        <Logo />

        <nav className="hidden items-center gap-0.5 lg:flex">
          {[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300",
                isActive(item.href) ? "text-foreground" : "text-muted hover:text-foreground"
              )}
            >
              {isActive(item.href) ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-foreground/[0.08] ring-1 ring-foreground/[0.06]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : null}
              <span className="relative">{item.label}</span>
            </Link>
          ))}

          <MegaDropdown
            label="Services"
            active={pathname.startsWith("/services")}
            open={mega === "services"}
            onOpen={() => setMega("services")}
            onClose={() => setMega(null)}
            reduce={reduce}
          >
            <div className="grid grid-cols-2 gap-0.5 sm:grid-cols-3">
              {servicesNav.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group rounded-xl px-3 py-2.5 text-sm text-muted transition-all duration-200 hover:bg-surface-hover hover:text-foreground"
                >
                  <span className="hover-underline">{s.label}</span>
                </Link>
              ))}
            </div>
            <div className="mt-3 border-t border-border pt-3 text-center">
              <Link href="/services" className="text-xs font-semibold uppercase tracking-wider text-orange-500 transition hover:text-orange-400">
                View all services →
              </Link>
            </div>
          </MegaDropdown>

          <MegaDropdown
            label="Locations"
            active={pathname.startsWith("/locations")}
            open={mega === "locations"}
            onOpen={() => setMega("locations")}
            onClose={() => setMega(null)}
            reduce={reduce}
            width="w-72"
          >
            {locationsNav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block rounded-xl px-3 py-2.5 text-sm text-muted transition-all duration-200 hover:bg-surface-hover hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </MegaDropdown>

          {mainNav
            .filter((n) => !["Home", "About", "Services"].includes(n.label))
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300",
                  isActive(item.href) ? "text-foreground" : "text-muted hover:text-foreground"
                )}
              >
                {isActive(item.href) ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-foreground/[0.08] ring-1 ring-foreground/[0.06]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </Link>
            ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <ThemeToggle />
          <Button variant="ghost" href="/free-website-audit" className="!px-4 text-muted hover:text-foreground">
            Free audit
          </Button>
          <Button href="/request-quote" className="pulse-ring px-5 py-2">
            Get a quote
          </Button>
        </div>

        <button
          type="button"
          className="rounded-xl p-2 text-muted transition hover:bg-surface-hover lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={reduce ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduce ? undefined : { x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="absolute right-0 top-0 flex h-full w-[min(100vw,380px)] flex-col border-l border-border bg-background p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8 flex justify-between">
                <Logo />
                <button type="button" aria-label="Close" className="rounded-lg p-2 text-muted transition hover:bg-surface-hover" onClick={() => setOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto">
                {[
                  { label: "Home", href: "/" },
                  { label: "About", href: "/about" },
                ].map((item) => (
                  <Link key={item.href} href={item.href} className={cn("rounded-xl px-3 py-3 text-base transition", isActive(item.href) ? "bg-surface-hover text-foreground" : "text-muted")}>
                    {item.label}
                  </Link>
                ))}
                <p className="px-3 pt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted/60">Services</p>
                {servicesNav.map((s) => (
                  <Link key={s.href} href={s.href} className="rounded-xl px-3 py-2 text-sm text-muted transition hover:text-foreground">{s.label}</Link>
                ))}
                <p className="px-3 pt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted/60">Locations</p>
                {locationsNav.map((l) => (
                  <Link key={l.href} href={l.href} className="rounded-xl px-3 py-2 text-sm text-muted transition hover:text-foreground">{l.label}</Link>
                ))}
                {mainNav.filter((n) => !["Home", "About", "Services"].includes(n.label)).map((item) => (
                  <Link key={item.href} href={item.href} className={cn("rounded-xl px-3 py-3 text-base transition", isActive(item.href) ? "bg-surface-hover text-foreground" : "text-muted")}>
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-2.5 border-t border-border pt-6">
                <div className="flex items-center justify-between px-1 pb-2">
                  <span className="text-sm text-muted">Theme</span>
                  <ThemeToggle />
                </div>
                <Button href="/free-website-audit" variant="outline" className="w-full justify-center">Free audit</Button>
                <Button href="/request-quote" className="w-full justify-center">Get a quote</Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function MegaDropdown({
  label,
  active,
  open,
  onOpen,
  onClose,
  reduce,
  width = "w-[min(90vw,640px)]",
  children,
}: {
  label: string;
  active: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  reduce: boolean | null;
  width?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        className={cn(
          "relative flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300",
          active ? "text-foreground" : "text-muted hover:text-foreground"
        )}
      >
        {active ? (
          <motion.span
            layoutId="nav-pill"
            className="absolute inset-0 rounded-full bg-foreground/[0.08] ring-1 ring-foreground/[0.06]"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        ) : null}
        <span className="relative">{label}</span>
        <ChevronDown className={cn("relative h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 rounded-2xl border border-border bg-background/95 p-4 shadow-2xl shadow-black/10 backdrop-blur-2xl",
              width
            )}
          >
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
