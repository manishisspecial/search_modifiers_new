import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { LocationPageBody } from "@/components/locations/location-page-body";
import { getLocationBySlug, getLocationSlugs, getFaqs } from "@/lib/db-queries";
import { getLocationBySlug as getStaticLocationBySlug, locationSlugs } from "@/lib/locations-data";
import { getSite } from "@/lib/get-site";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

type LocationView = {
  slug: string;
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

async function resolveLocation(slug: string): Promise<LocationView | null> {
  const db = await getLocationBySlug(slug);
  if (db) {
    return {
      slug: db.slug,
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
  const stat = getStaticLocationBySlug(slug);
  if (stat) return { ...stat, type: "COUNTRY" };
  return null;
}

export async function generateStaticParams() {
  const dbSlugs = await getLocationSlugs();
  const all = Array.from(new Set([...dbSlugs, ...locationSlugs]));
  return all.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const site = await getSite();
  const { slug } = await params;
  const loc = await resolveLocation(slug);
  if (!loc) return {};
  const keywords = loc.metaKeywords
    ? loc.metaKeywords.split(",").map((k: string) => k.trim()).filter(Boolean)
    : undefined;
  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    ...(keywords && { keywords }),
    alternates: { canonical: `${site.url}/location/${slug}` },
    openGraph: { title: loc.metaTitle, description: loc.metaDescription, url: `${site.url}/location/${slug}` },
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;

  // If the DB record has a prefix, redirect to the canonical /{prefix}/{slug} URL
  const dbRecord = await getLocationBySlug(slug);
  if (dbRecord && dbRecord.prefix) {
    redirect(`/${dbRecord.prefix}/${slug}`);
  }

  const loc = await resolveLocation(slug);
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
