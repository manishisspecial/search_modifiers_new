import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogBody } from "@/components/blog/blog-body";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { blogPosts, getPostBySlug } from "@/lib/blog-data";
import { site } from "@/lib/site";
import { ArrowLeft, Calendar } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${site.url}/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      url: `${site.url}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${site.url}/blog/${post.slug}`;

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        datePublished={post.date}
        url={url}
        authorName={post.author}
      />
      <article className="pb-20 sm:pb-28">
        <Container className="max-w-3xl">
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted/70 transition hover:text-cyan-400"
            >
              <ArrowLeft className="h-4 w-4" /> Back to blog
            </Link>
            <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-cyan-400/90">{post.category}</p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted/70">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>{post.readTime}</span>
              <span className="text-muted">By {post.author}</span>
            </div>
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
