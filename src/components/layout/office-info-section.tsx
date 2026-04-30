import Link from "next/link";
import { ExternalLink, Landmark, Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

function formatPhoneDisplay() {
  const raw = site.phone.replace(/\D/g, "");
  if (raw.length === 10) {
    return `+91 ${raw.slice(0, 5)} ${raw.slice(5)}`;
  }
  return site.phone;
}

function mapsEmbedSrc() {
  if (site.googleMapsEmbedSrc) return site.googleMapsEmbedSrc;
  const q = encodeURIComponent(site.address.detail);
  return `https://maps.google.com/maps?q=${q}&hl=en&z=14&output=embed`;
}

function mapsExternalUrl() {
  const q = encodeURIComponent(site.address.detail);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function OfficeInfoSection({
  className,
  compactHeading = false,
  withTopDivider = false,
}: {
  className?: string;
  /** Slightly smaller title for nested contexts */
  compactHeading?: boolean;
  /** Show the standard full-width gradient rule above this block */
  withTopDivider?: boolean;
}) {
  const waHref = `https://wa.me/${site.whatsapp}`;
  const phoneDisplay = formatPhoneDisplay();

  return (
    <section className={cn("relative", className)}>
      {withTopDivider ? <div className="gradient-line absolute inset-x-0 top-0" /> : null}
      <Container>
        <h2
          className={cn(
            "font-display font-bold tracking-tight text-foreground",
            compactHeading ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"
          )}
        >
          Our office in {site.officeRegion}
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Contact card */}
          <div className="glass gradient-border relative flex flex-col overflow-hidden rounded-2xl border border-border p-6 sm:p-8">
            <div className="noise-overlay rounded-2xl opacity-50" />
            <div className="relative flex gap-4 sm:gap-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-rose-500/15 text-orange-500 shadow-inner shadow-orange-500/5">
                <Landmark className="h-7 w-7" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <span className="inline-flex rounded-full border border-dashed border-orange-400/45 bg-orange-500/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-orange-500/95 dark:text-orange-300">
                  {site.officeBadge}
                </span>
                <p className="mt-4 font-display text-xl font-semibold text-foreground sm:text-2xl">
                  {site.address.city}
                </p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                  {site.address.detail}
                </p>
              </div>
            </div>

            <div className="relative mt-8 space-y-5 border-t border-border pt-8">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface-hover text-orange-500">
                  <Mail className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted/80">Email us</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1 inline-block text-sm font-semibold text-orange-500 transition hover:text-orange-400"
                  >
                    {site.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface-hover text-emerald-500">
                  <MessageCircle className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted/80">WhatsApp</p>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-sm font-semibold text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    {phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="glass gradient-border relative overflow-hidden rounded-2xl border border-border">
            <div className="noise-overlay absolute inset-0 z-[1] pointer-events-none opacity-30" />
            <div className="relative aspect-[4/3] min-h-[280px] w-full lg:aspect-auto lg:min-h-[420px]">
              <iframe
                title={`${site.name} office location`}
                src={mapsEmbedSrc()}
                className="absolute inset-0 z-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="absolute left-4 top-4 z-10">
                <Link
                  href={mapsExternalUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-xs font-semibold text-foreground shadow-lg shadow-black/5 backdrop-blur-md transition hover:border-orange-400/40 hover:bg-surface-hover"
                >
                  Open in Maps
                  <ExternalLink className="h-3.5 w-3.5 text-orange-400" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
