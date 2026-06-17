import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageBody } from "@/components/services/service-page-body";
import {
  getServiceBySlug,
  getServiceMetaBySlug,
  getServiceSlugs,
} from "@/lib/db-queries";
import { getSite } from "@/lib/get-site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [site, s] = await Promise.all([getSite(), getServiceBySlug(slug)]);
  if (!s) return {};
  const keywords = s.metaKeywords
    ? s.metaKeywords.split(",").map((k: string) => k.trim()).filter(Boolean)
    : undefined;
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    ...(keywords && { keywords }),
    alternates: { canonical: `${site.url}/services/${slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDescription, url: `${site.url}/services/${slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = await getServiceBySlug(slug);
  if (!s) notFound();

  const meta = await getServiceMetaBySlug(slug);
  if (!meta) notFound();

  const relatedSlugs: string[] = meta.related ?? [];
  const relatedServices = (
    await Promise.all(relatedSlugs.map((rs) => getServiceBySlug(rs)))
  ).filter(Boolean) as NonNullable<Awaited<ReturnType<typeof getServiceBySlug>>>[];

  return <ServicePageBody service={s} meta={meta} relatedServices={relatedServices} />;
}
