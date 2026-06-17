import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationPageBody } from "@/components/locations/location-page-body";
import { getFaqs } from "@/lib/db-queries";
import { getSite } from "@/lib/get-site";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ prefix: string; slug: string }> };

type LocationView = {
  slug: string;
  prefix: string;
  title: string;
  type: "COUNTRY" | "CITY";
  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string;
  heroEyebrow: string;
  headline: string;
  intro: string;
  sections: { heading: string; body: string }[];
  localStats: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
};

async function resolveLocation(prefix: string, slug: string): Promise<LocationView | null> {
  const db = await prisma.location.findFirst({
    where: { prefix, slug, deletedAt: null },
    include: {
      sections: { orderBy: { order: "asc" } },
      localStats: { orderBy: { order: "asc" } },
      faqs: { orderBy: { order: "asc" } },
    },
  });
  if (!db) return null;
  return {
    slug: db.slug,
    prefix: db.prefix,
    title: db.title,
    type: (db.type as "COUNTRY" | "CITY") ?? "COUNTRY",
    metaTitle: db.metaTitle,
    metaDescription: db.metaDescription,
    metaKeywords: db.metaKeywords ?? undefined,
    heroEyebrow: db.heroEyebrow,
    headline: db.headline,
    intro: db.intro,
    sections: db.sections.map((s) => ({ heading: s.heading, body: s.body })),
    localStats: db.localStats.map((s) => ({ label: s.label, value: s.value })),
    faqs: db.faqs.map((f) => ({ q: f.q, a: f.a })),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const site = await getSite();
  const { prefix, slug } = await params;
  const loc = await resolveLocation(prefix, slug);
  if (!loc) return {};
  const keywords = loc.metaKeywords
    ? loc.metaKeywords.split(",").map((k: string) => k.trim()).filter(Boolean)
    : undefined;
  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    ...(keywords && { keywords }),
    alternates: { canonical: `${site.url}/${prefix}/${slug}` },
    openGraph: { title: loc.metaTitle, description: loc.metaDescription, url: `${site.url}/${prefix}/${slug}` },
  };
}

export default async function PrefixedLocationPage({ params }: Props) {
  const { prefix, slug } = await params;
  const loc = await resolveLocation(prefix, slug);
  if (!loc) notFound();

  const placement = loc.type === "CITY" ? "CITY" : "COUNTRY";
  const injected = await getFaqs(placement, slug);

  return (
    <LocationPageBody
      loc={loc}
      extraFaqs={injected.map((f) => ({ q: f.q, a: f.a }))}
    />
  );
}
