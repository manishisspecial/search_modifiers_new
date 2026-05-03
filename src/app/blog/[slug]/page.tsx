import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogBody } from "@/components/blog/blog-body";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { getPostBySlug, getPublishedPostSlugs } from "@/lib/db-queries";
import { site } from "@/lib/site";
import { ArrowLeft, Calendar } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPublishedPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  const canonical = post.canonicalUrl || `${site.url}/blog/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: {
      index: !post.noindex,
      follow: !post.nofollow,
    },
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: post.publishedAt?.toISOString() || post.date,
      authors: [post.author],
      url: `${site.url}/blog/${slug}`,
      ...(post.featuredImage && { images: [{ url: post.featuredImage }] }),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const url = `${site.url}/blog/${post.slug}`;

  const jsonLd = post.customSchema
    ? JSON.parse(post.customSchema)
    : null;

  return (
    <>
      {jsonLd ? (
        <ArticleJsonLd
          title={post.metaTitle || post.title}
          description={post.metaDescription || post.excerpt}
          datePublished={post.publishedAt?.toISOString() || post.date}
          url={url}
          authorName={post.author}
          customSchema={jsonLd}
        />
      ) : (
        <ArticleJsonLd
          title={post.metaTitle || post.title}
          description={post.metaDescription || post.excerpt}
          datePublished={post.publishedAt?.toISOString() || post.date}
          url={url}
          authorName={post.author}
        />
      )}
      <article className="pb-20 sm:pb-28">
        <Container className="max-w-3xl">
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted/70 transition hover:text-orange-400"
            >
              <ArrowLeft className="h-4 w-4" /> Back to blog
            </Link>

            {post.featuredImage && (
              <img
                src={post.featuredImage}
                alt={post.featuredImageAlt || post.title}
                className="mt-6 w-full h-64 sm:h-80 object-cover rounded-2xl"
              />
            )}

            <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-orange-400/90">
              {post.category?.name || "Uncategorized"}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted/70">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishedAt || post.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>{post.readTime}</span>
              <span className="text-muted">By {post.author}</span>
            </div>

            {/* Tags */}
            {Array.isArray(post.tags) && (post.tags as string[]).length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {(post.tags as string[]).map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2.5 py-0.5 text-xs rounded-full bg-surface text-muted border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </FadeIn>
          <div className="prose-invert mt-12">
            <BlogBody content={post.content} />
          </div>
          <FadeIn className="mt-16 rounded-2xl border border-border bg-card p-8 text-center">
            <p className="text-muted">Want this level of thinking on your growth program?</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button href="/request-quote">Request a quote</Button>
              <Button href="/free-website-audit" variant="outline">
                Free audit
              </Button>
            </div>
          </FadeIn>
        </Container>
      </article>
    </>
  );
}
