import type { Metadata } from "next";
import { ServicesIndex } from "@/components/services/services-index";
import { getServices, getAllServiceMetas } from "@/lib/db-queries";
import { getSite } from "@/lib/get-site";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: "Digital Marketing Services",
    description:
      "SEO, paid media, ORM, content, social, and web development — full-funnel services from Search Modifiers.",
    alternates: { canonical: `${site.url}/services` },
  };
}

export default async function ServicesIndexPage() {
  const [services, metas] = await Promise.all([
    getServices(),
    getAllServiceMetas(),
  ]);

  return <ServicesIndex services={services} metas={metas} />;
}
