import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationPageBody } from "@/components/locations/location-page-body";
import { getLocationBySlug, getLocationSlugs } from "@/lib/db-queries";
import { getSite } from "@/lib/get-site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getLocationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [site, loc] = await Promise.all([getSite(), getLocationBySlug(slug)]);
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
  const loc = await getLocationBySlug(slug);
  if (!loc) notFound();
  return <LocationPageBody loc={loc} />;
}
