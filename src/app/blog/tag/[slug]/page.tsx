import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { getAllTags, getPostsByTag } from "@/lib/db-queries";
import { getSite } from "@/lib/get-site";
import { toMediaUrl } from "@/lib/media";
import { ArrowUpRight, Calendar, Tag, ChevronRight } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

function slugToLabel(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ slug: tag.toLowerCase().replace(/\s+/g, "-") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const site = await getSite();
  const { slug } = await params;
  const label = slugToLabel(slug);

  return {
    title: `#${label} — Blog`,
    description: `Browse all blog posts tagged with "${label}".`,
    alternates: { canonical: `${site.url}/blog/tag/${slug}` },
  };
}

export default async function BlogTagPage({ params }: Props) {
  const { slug } = await params;
  // Tags may be stored as-is (e.g. "SEO Tips") or as slugs ("seo-tips")
  // Try space-separated version first, then exact slug
  const tagLabel = slug.replace(/-/g, " ");
  const postsByLabel = await getPostsByTag(tagLabel);
  const posts = postsByLabel.length > 0 ? postsByLabel : await getPostsByTag(slug);

  if (posts.length === 0) notFound();

  const displayTag =
    (posts[0].tags as string[]).find(
      (t) => t.toLowerCase() === tagLabel.toLowerCase() || t.toLowerCase() === slug.toLowerCase()
    ) ?? slugToLabel(slug);

  return (
    <>
      <PageHero
        eyebrow={
          <span className="inline-flex items-center gap-2 text-orange-400">
            <Tag className="h-4 w-4" />
            Tag
          </span>
        }
        title={`#${displayTag}`}
        description={`${posts.length} ${posts.length === 1 ? "article" : "articles"} tagged with this topic`}
      />

      <section className="pb-20 sm:pb-28">
        <Container>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-muted mb-8" aria-label="Breadcrumb">
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">#{displayTag}</span>
          </nav>

          {/* Posts */}
          <Stagger className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <FadeIn>
                  <article className="glass group flex h-full flex-col rounded-2xl p-8 transition hover:border-orange-500/20">
                    {post.featuredImage && (
                      <img
                        src={toMediaUrl(post.featuredImage)}
                        alt={post.featuredImageAlt || post.title}
                        className="w-full h-48 object-cover rounded-xl mb-4"
                      />
                    )}
                    <p className="text-xs font-semibold uppercase tracking-wider text-orange-400/90">
                      {post.category?.name || "Uncategorized"}
                    </p>
                    <h2 className="mt-3 font-display text-xl font-semibold text-foreground group-hover:text-orange-500 sm:text-2xl">
                      <Link href={`/blog/${post.slug}`} className="focus:outline-none focus-visible:text-orange-500">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>

                    {/* Tags on card */}
                    {Array.isArray(post.tags) && (post.tags as string[]).length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {(post.tags as string[]).map((t) => (
                          <Link
                            key={t}
                            href={`/blog/tag/${t.toLowerCase().replace(/\s+/g, "-")}`}
                            className={`inline-block px-2 py-0.5 text-xs rounded-full border transition-colors ${
                              t.toLowerCase() === displayTag.toLowerCase()
                                ? "bg-orange-500/15 text-orange-400 border-orange-500/30"
                                : "bg-surface text-muted border-border hover:border-orange-500/30 hover:text-orange-400"
                            }`}
                          >
                            #{t}
                          </Link>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted/70">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span>{post.readTime}</span>
                      <span>{post.author}</span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-orange-400"
                    >
                      Read article <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </article>
                </FadeIn>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
