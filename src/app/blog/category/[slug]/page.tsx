import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { getCategoryBySlug, getPostsByCategory, getCategories } from "@/lib/db-queries";
import { site } from "@/lib/site";
import { ArrowUpRight, Calendar, FolderTree, ChevronRight } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} — Blog`,
    description: `Browse all blog posts in the ${category.name} category.`,
    alternates: { canonical: `${site.url}/blog/category/${slug}` },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const posts = await getPostsByCategory(category.id);

  return (
    <>
      <PageHero
        eyebrow={
          <span className="inline-flex items-center gap-2 text-orange-400">
            <FolderTree className="h-4 w-4" />
            Category
          </span>
        }
        title={category.name}
        description={`${posts.length} ${posts.length === 1 ? "article" : "articles"} in this category`}
      />

      <section className="pb-20 sm:pb-28">
        <Container>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-muted mb-8" aria-label="Breadcrumb">
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            {category.parent && (
              <>
                <Link
                  href={`/blog/category/${category.parent.slug}`}
                  className="hover:text-foreground transition-colors"
                >
                  {category.parent.name}
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
              </>
            )}
            <span className="text-foreground font-medium">{category.name}</span>
          </nav>

          {/* Sub-categories */}
          {category.children && category.children.length > 0 && (
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Sub-categories</p>
              <div className="flex flex-wrap gap-2">
                {category.children.map((child) => (
                  <Link
                    key={child.id}
                    href={`/blog/category/${child.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm text-muted hover:border-orange-500/50 hover:text-orange-400 transition-colors"
                  >
                    <FolderTree className="h-3.5 w-3.5" />
                    {child.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Posts */}
          {posts.length > 0 ? (
            <Stagger className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <StaggerItem key={post.slug}>
                  <FadeIn>
                    <article className="glass group flex h-full flex-col rounded-2xl p-8 transition hover:border-orange-500/20">
                      {post.featuredImage && (
                        <img
                          src={post.featuredImage}
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
                      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted/70">
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
              <FolderTree className="h-12 w-12 text-muted/30 mx-auto mb-4" />
              <p className="text-muted text-lg">No posts in this category yet.</p>
              <Link href="/blog" className="mt-4 inline-block text-sm text-orange-400 hover:underline">
                Browse all posts
              </Link>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
