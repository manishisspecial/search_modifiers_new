import Link from "next/link";
import { Container } from "@/components/ui/container";
import { footerColumns } from "@/lib/navigation";
import { site } from "@/lib/site";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="relative bg-background">
      <div className="gradient-line" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_100%,rgba(34,211,238,0.06),transparent)]" />
      <div className="noise-overlay" />

      <Container className="relative pt-20 pb-12 sm:pt-24 sm:pb-16">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-lg">
            <p className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Search <span className="gradient-text">Modifiers</span>
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted">
              {site.tagline}. Performance-led SEO, paid media, and creative — engineered for clarity and conversion.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/request-quote" className="px-6 py-2.5">Get a quote</Button>
            <Button href="/free-website-audit" variant="outline" className="px-6 py-2.5">Free audit</Button>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted/70">Get in touch</h3>
            <ul className="mt-5 space-y-4 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400/70" />
                <span>{site.address.street}, {site.address.city} {site.address.postalCode}, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-cyan-400/70" />
                <a href={`tel:${site.phoneTel}`} className="hover-underline transition hover:text-foreground">{site.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-cyan-400/70" />
                <a href={`mailto:${site.email}`} className="hover-underline transition hover:text-foreground">{site.email}</a>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {[
                { label: "LinkedIn", href: site.social.linkedin },
                { label: "X", href: site.social.twitter },
                { label: "Instagram", href: site.social.instagram },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border bg-surface-hover px-4 py-2 text-xs font-medium text-muted transition-all duration-300 hover:border-cyan-500/20 hover:bg-surface-hover hover:text-foreground"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {footerColumns.slice(0, 4).map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted/70">{col.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1 text-sm text-muted transition-colors duration-300 hover:text-cyan-500"
                    >
                      <span className="hover-underline">{l.label}</span>
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="gradient-line mt-16" />
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center text-xs text-muted/60 sm:flex-row sm:text-left">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p className="max-w-md sm:text-right">
            Crafted for speed, accessibility, and search visibility.
          </p>
        </div>
      </Container>
    </footer>
  );
}
