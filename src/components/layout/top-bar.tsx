import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { getSite } from "@/lib/get-site";

export async function TopBar() {
  const site = await getSite();
  return (
    <div className="fixed inset-x-0 top-0 z-[70] flex h-10 items-center border-b border-white/10 bg-[#0a1628] text-white shadow-sm shadow-black/20">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-5">
          <a
            href={`tel:${site.phoneTel}`}
            className="inline-flex min-w-0 items-center gap-1.5 text-xs font-medium text-white/95 transition hover:text-white sm:text-sm"
          >
            <Phone className="h-3.5 w-3.5 shrink-0 text-[var(--brand)]" strokeWidth={2.25} aria-hidden />
            <span className="truncate tabular-nums">{site.phone}</span>
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-w-0 max-w-[min(100%,14rem)] items-center gap-1.5 text-xs font-medium text-white/95 transition hover:text-white sm:max-w-none sm:text-sm"
          >
            <Mail className="h-3.5 w-3.5 shrink-0 text-[var(--brand)]" strokeWidth={2.25} aria-hidden />
            <span className="truncate">{site.email}</span>
          </a>
        </div>
        <Link
          href="/request-quote"
          className="shrink-0 whitespace-nowrap rounded-md bg-[var(--brand)] px-2 py-1.5 text-[10px] font-semibold leading-none text-white underline decoration-white/80 underline-offset-2 transition hover:bg-orange-500 sm:px-3 sm:text-sm"
        >
          Get a Free Consultation
        </Link>
      </div>
    </div>
  );
}
