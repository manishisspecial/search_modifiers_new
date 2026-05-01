import Link from "next/link";
import { Container } from "@/components/ui/container";
import { footerColumns } from "@/lib/navigation";
import { getSite } from "@/lib/get-site";
import { getTrustBadges, getFooterRatings } from "@/lib/db-queries";
import { siteDefaults } from "@/lib/site-defaults";
import { ArrowUpRight, Mail, MapPin, Phone, Facebook, Youtube, Linkedin, X } from "lucide-react";
import { Button } from "@/components/ui/button";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.006c-1.579 0-3.051.485-4.313 1.4-.957.663-1.734 1.587-2.314 2.72C3.06 11.495 2.8 13.061 2.8 14.718c0 .6.052 1.193.154 1.77l.015.087-.562 2.05 2.148-.558.09.014c.555.103 1.121.155 1.688.155 1.579 0 3.051-.485 4.313-1.4.957-.664 1.734-1.588 2.314-2.721 1.149-2.269 1.409-4.835 1.409-6.492 0-.6-.052-1.193-.154-1.77l-.015-.087.562-2.05-2.148.558-.09-.014a6.47 6.47 0 0 0-1.688-.155m5.421 7.403c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 0C5.373 0 0 5.373 0 12c0 2.11.54 4.104 1.54 5.84L0 24l6.305-1.512C8.104 23.43 10.025 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0Z" />
    </svg>
  );
}

export async function Footer() {
  const [site, dbTrustBadges, dbFooterRatings] = await Promise.all([
    getSite(),
    getTrustBadges(),
    getFooterRatings(),
  ]);

  const trustBadges =
    dbTrustBadges.length > 0
      ? dbTrustBadges.map((b) => ({ label: b.label, subtitle: b.subtitle, href: b.href }))
      : siteDefaults.trustBadges;

  const googleRating = dbFooterRatings.find((r) => r.platform === "google");
  const clutchRating = dbFooterRatings.find((r) => r.platform === "clutch");

  const footerRatings = {
    google: googleRating
      ? { score: googleRating.score, maxScore: "5", href: googleRating.href }
      : siteDefaults.footerRatings.google,
    clutch: clutchRating
      ? { score: clutchRating.score, href: clutchRating.href }
      : siteDefaults.footerRatings.clutch,
  };

  const footerSocialIcons = [
    {
      name: "Facebook",
      href: site.social.facebook,
      Icon: Facebook,
      className: "bg-[#1877F2] text-white hover:brightness-110",
    },
    {
      name: "X",
      href: site.social.twitter,
      Icon: X,
      className: "bg-foreground text-background hover:bg-foreground/90",
    },
    {
      name: "YouTube",
      href: site.social.youtube,
      Icon: Youtube,
      className: "bg-[#FF0000] text-white hover:brightness-110",
    },
    {
      name: "LinkedIn",
      href: site.social.linkedin,
      Icon: Linkedin,
      className: "bg-[#0A66C2] text-white hover:brightness-110",
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Search Modifiers — I'd like to discuss a growth project.")}`,
      Icon: WhatsAppIcon,
      className: "bg-[#25D366] text-white hover:brightness-110",
    },
  ] as const;

  return (
    <footer className="relative bg-background">
      <div className="gradient-line" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_100%,rgba(251, 146, 60,0.06),transparent)]" />
      <div className="noise-overlay" />

      <Container className="relative pt-20 pb-12 sm:pt-24 sm:pb-16">
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-lg">
            <p className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Search <span className="gradient-text">Modifiers</span>
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted">
              {site.tagline}. Performance-led SEO, paid media, and creative — engineered for clarity and conversion.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/request-quote" className="px-6 py-2.5">
              Get a quote
            </Button>
            <Button href="/free-website-audit" variant="outline" className="px-6 py-2.5">
              Free audit
            </Button>
          </div>
        </div>

        {/* Trust badges — partner / ratings strip */}
        <div className="mb-14 flex flex-wrap gap-3 sm:gap-4">
          {trustBadges.map((b) => (
            <a
              key={b.label}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[4.25rem] min-w-[10rem] flex-1 flex-col justify-center rounded-xl border border-border bg-card/90 px-4 py-3 shadow-sm backdrop-blur-sm transition duration-300 hover:border-orange-500/35 hover:bg-surface-hover sm:min-w-[8.5rem] sm:flex-1"
            >
              <span className="text-[11px] font-bold uppercase tracking-wide text-foreground">{b.label}</span>
              <span className="mt-1 text-xs leading-snug text-muted transition group-hover:text-foreground/85">
                {b.subtitle}
              </span>
            </a>
          ))}
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted/70">Get in touch</h3>
            <ul className="mt-5 space-y-4 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-400/70" />
                <span>{site.address.detail}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-orange-400/70" />
                <a href={`tel:${site.phoneTel}`} className="hover-underline transition hover:text-foreground">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-orange-400/70" />
                <a href={`mailto:${site.email}`} className="hover-underline transition hover:text-foreground">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          {footerColumns.slice(0, 4).map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted/70">{col.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1 text-sm text-muted transition-colors duration-300 hover:text-orange-500"
                    >
                      <span className="hover-underline">{l.label}</span>
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="gradient-line mt-16" />

        {/* Bottom strip: social icons · legal · review badges */}
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="order-1 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            {footerSocialIcons.map(({ name, href, Icon, className }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${className}`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
              </a>
            ))}
          </div>

          <div className="order-3 text-center lg:order-2 lg:flex-1 lg:px-6">
            <p className="text-xs text-muted/70">
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <p className="mt-1 text-[11px] text-muted/55">Crafted for speed, accessibility, and search visibility.</p>
          </div>

          <div className="order-2 flex flex-wrap items-center justify-center gap-3 sm:justify-end lg:order-3">
            <a
              href={footerRatings.google.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-sm transition hover:border-orange-500/25"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-[#4285F4] shadow-sm ring-1 ring-border dark:bg-white">
                G
              </span>
              <span className="text-muted">
                <span className="font-semibold text-foreground">{footerRatings.google.score}</span>
                /{footerRatings.google.maxScore} rating
              </span>
            </a>
            <a
              href={footerRatings.clutch.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-sm transition hover:border-orange-500/25"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded bg-[#e62415] text-[11px] font-extrabold text-white">
                C
              </span>
              <span className="text-muted">
                <span className="font-semibold text-foreground">{footerRatings.clutch.score}</span> rating
              </span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
