import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogBody } from "@/components/blog/blog-body";
import { getStaticPageBySlug, getStaticPageSlugs } from "@/lib/db-queries";
import { getSite } from "@/lib/get-site";
import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getStaticPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getStaticPageBySlug(slug);
  if (!page) return {};
  const site = await getSite();
  return {
    title: page.title,
    ...(page.metaDescription && { description: page.metaDescription }),
    alternates: { canonical: `${site.url}/p/${slug}` },
  };
}

export default async function StaticPageRoute({ params }: Props) {
  const { slug } = await params;
  const page = await getStaticPageBySlug(slug);
  if (!page) notFound();

  return (
    <>
      <PageHero eyebrow="Info" title={page.title} />
      <section className="pb-20 sm:pb-28">
        <Container className="max-w-3xl">
          <div className="prose-invert">
            <BlogBody content={page.content} showToc={false} />
          </div>
        </Container>
      </section>
    </>
  );
}
