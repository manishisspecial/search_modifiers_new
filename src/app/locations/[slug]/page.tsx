import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationPageBody } from "@/components/locations/location-page-body";
import { getLocationBySlug, locationSlugs } from "@/lib/locations-data";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return locationSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocationBySlug(slug);
  if (!loc) return {};
  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    alternates: { canonical: `${site.url}/locations/${slug}` },
    openGraph: { title: loc.metaTitle, description: loc.metaDescription, url: `${site.url}/locations/${slug}` },
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const loc = getLocationBySlug(slug);
  if (!loc) notFound();
  return <LocationPageBody loc={loc} />;
}
