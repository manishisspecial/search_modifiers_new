import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { getPosts, getCategories, getAllTags } from "@/lib/db-queries";
import { toMediaUrl } from "@/lib/media";
import { getSite } from "@/lib/get-site";
import { ArrowUpRight, Calendar, FolderTree } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: "Blog",
    description: "Insights on SEO, paid media, content, and web performance from the Search Modifiers team.",
    alternates: { canonical: `${site.url}/blog` },
  };
}

export default async function BlogPage() {
  const [posts, categories, allTags] = await Promise.all([getPosts(), getCategories(), getAllTags()]);

  // Only root-level categories with posts for the filter nav
  const rootCats = categories.filter((c) => !c.parentId && c._count.posts > 0);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Practical notes from the delivery floor"
        description="No fluff listicles — essays we'd send to a smart colleague who actually runs campaigns."
      />
      <section className="pb-20 sm:pb-28">
        <Container>
          {/* Category filter */}
          {rootCats.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-orange-500/40 bg-orange-500/10 text-orange-400 text-sm font-medium"
              >
                All posts
              </Link>
              {rootCats.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/blog/category/${cat.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm text-muted hover:border-orange-500/40 hover:text-orange-400 transition-colors"
                >
                  <FolderTree className="h-3.5 w-3.5" />
                  {cat.name}
                  <span className="text-xs text-muted/60">({cat._count.posts})</span>
                </Link>
              ))}
            </div>
          )}

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted/70 self-center mr-2">Tags</span>
              {allTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                  className="inline-block px-2.5 py-1 text-xs rounded-full bg-surface text-muted border border-border hover:border-orange-500/30 hover:text-orange-400 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {posts.length > 0 ? (
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
                        {post.category ? (
                          <Link href={`/blog/category/${post.category.slug}`} className="hover:underline">
                            {post.category.name}
                          </Link>
                        ) : (
                          "Uncategorized"
                        )}
                      </p>
                      <h2 className="mt-3 font-display text-xl font-semibold text-foreground group-hover:text-orange-500 sm:text-2xl">
                        <Link href={`/blog/${post.slug}`} className="focus:outline-none focus-visible:text-orange-500">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>

                      {/* Tags */}
                      {Array.isArray(post.tags) && (post.tags as string[]).length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {(post.tags as string[]).slice(0, 4).map((tag) => (
                            <Link
                              key={tag}
                              href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                              className="inline-block px-2 py-0.5 text-xs rounded-full bg-surface text-muted border border-border hover:border-orange-500/30 hover:text-orange-400 transition-colors"
                            >
                              #{tag}
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
          ) : (
            <div className="text-center py-16">
              <p className="text-muted text-lg">No blog posts published yet. Check back soon!</p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
