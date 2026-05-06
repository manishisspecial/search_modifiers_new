"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { FeaturedImagePicker } from "@/components/admin/featured-image-picker";
import { Clock, Eye, Search, FileText, Settings2, CheckCircle2, XCircle } from "lucide-react";
import { computeSeoScore } from "@/lib/seo-score";

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  order: number;
  children?: BlogCategory[];
}

function flattenCategories(
  cats: BlogCategory[],
  depth = 0
): { id: string; label: string }[] {
  return cats.flatMap((c) => [
    { id: c.id, label: "—".repeat(depth) + (depth > 0 ? " " : "") + c.name },
    ...flattenCategories(c.children ?? [], depth + 1),
  ]);
}

function buildCategoryTree(cats: BlogCategory[]): BlogCategory[] {
  const map = new Map<string, BlogCategory>();
  const roots: BlogCategory[] = [];
  cats.forEach((c) => map.set(c.id, { ...c, children: [] }));
  cats.forEach((c) => {
    const node = map.get(c.id)!;
    if (c.parentId && map.has(c.parentId)) {
      map.get(c.parentId)!.children!.push(node);
    } else {
      roots.push(node);
    }
  });
  return [...roots].sort((a, b) => a.order - b.order);
}

const TABS = [
  { id: "content", label: "Content", icon: FileText },
  { id: "seo", label: "SEO", icon: Search },
  { id: "publishing", label: "Publishing", icon: Settings2 },
  { id: "metadata", label: "Metadata", icon: Clock },
] as const;

type TabId = (typeof TABS)[number]["id"];

function calculateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function extractHeadings(content: string): { level: number; text: string }[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: { level: number; text: string }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({ level: match[1].length, text: match[2] });
  }
  return headings;
}

export default function NewBlogPostPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("content");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [metaTagInput, setMetaTagInput] = useState("");
  const [allTags, setAllTags] = useState<string[]>([]);
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);

  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    author: "",
    readTime: "",
    categoryId: "",
    metaTitle: "",
    metaDescription: "",
    metaTags: [] as string[],
    canonicalUrl: "",
    customSchema: "",
    featuredImage: "",
    featuredImageAlt: "",
    primaryKeyword: "",
    status: "DRAFT" as "DRAFT" | "SCHEDULED" | "PUBLISHED",
    scheduledAt: "",
    noindex: false,
    nofollow: false,
    tags: [] as string[],
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/blog/categories").then((r) => (r.ok ? r.json() : [])),
      fetch("/api/admin/blog/tags").then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([cats, tags]) => { setCategories(cats); setAllTags(tags); })
      .catch(() => {});
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        scheduledAt: formData.scheduledAt ? new Date(formData.scheduledAt).toISOString() : null,
        readTime: formData.readTime || calculateReadTime(formData.content),
      };

      const response = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to create blog post");
      const data = await response.json();
      router.push(`/admin/blog/${data.id}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create blog post");
    } finally {
      setIsLoading(false);
    }
  };

  const addTag = (tag: string, field: "tags" | "metaTags") => {
    const trimmed = tag.trim();
    if (trimmed && !formData[field].includes(trimmed)) {
      setFormData({ ...formData, [field]: [...formData[field], trimmed] });
    }
  };

  const removeTag = (tag: string, field: "tags" | "metaTags") => {
    setFormData({ ...formData, [field]: formData[field].filter((t) => t !== tag) });
  };

  const autoReadTime = useMemo(() => calculateReadTime(formData.content), [formData.content]);
  const headings = useMemo(() => extractHeadings(formData.content), [formData.content]);
  const seoScore = useMemo(
    () => computeSeoScore(formData),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formData.title, formData.metaTitle, formData.metaDescription, formData.primaryKeyword, formData.featuredImageAlt, formData.content]
  );

  return (
    <div className="p-6">
      <FormLayout
        title="Create Blog Post"
        description="Add a new blog article"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Create Post"
      >
        {/* Tabs */}
        <div className="flex gap-1 border-b border-border mb-6 -mt-2 overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Tab */}
        {activeTab === "content" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="H1 Title" required>
                <FormInput
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData({
                      ...formData,
                      title,
                      slug: formData.slug || generateSlug(title),
                    });
                  }}
                  placeholder="Blog post title"
                />
              </FormField>
              <FormField label="URL Slug" required>
                <FormInput
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="blog-post-slug"
                />
              </FormField>
            </div>

            <FormField label="Excerpt / Summary" required>
              <FormTextarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Short description for listings and previews"
                rows={3}
              />
            </FormField>

            <FormField label="Content" required>
              <MarkdownEditor
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
              />
            </FormField>

            <div className="grid grid-cols-1 gap-4">
              <FormField label="Featured Image">
                <FeaturedImagePicker
                  value={formData.featuredImage}
                  onChange={(url) => setFormData({ ...formData, featuredImage: url })}
                  altValue={formData.featuredImageAlt}
                  onAltChange={(alt) => setFormData({ ...formData, featuredImageAlt: alt })}
                />
              </FormField>
              <FormField label="Image Alt Text">
                <FormInput
                  value={formData.featuredImageAlt}
                  onChange={(e) => setFormData({ ...formData, featuredImageAlt: e.target.value })}
                  placeholder="Descriptive alt text for accessibility"
                />
              </FormField>
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === "seo" && (
          <div className="space-y-4">
            <div className={`rounded-xl p-4 border ${seoScore.score >= 80 ? "border-emerald-500/30 bg-emerald-500/5" : seoScore.score >= 50 ? "border-yellow-500/30 bg-yellow-500/5" : "border-red-500/30 bg-red-500/5"}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">SEO Score</span>
                <span className={`text-2xl font-bold ${seoScore.score >= 80 ? "text-emerald-500" : seoScore.score >= 50 ? "text-yellow-500" : "text-red-500"}`}>
                  {seoScore.score}/100
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-surface rounded-full h-1.5 mb-3">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${seoScore.score >= 80 ? "bg-emerald-500" : seoScore.score >= 50 ? "bg-yellow-500" : "bg-red-500"}`}
                  style={{ width: `${seoScore.score}%` }}
                />
              </div>
              {/* Issues */}
              {seoScore.issues.length > 0 && (
                <ul className="space-y-1 mb-2">
                  {seoScore.issues.map((issue, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-red-400">
                      <XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              )}
              {/* Passes */}
              {seoScore.passes.length > 0 && (
                <ul className="space-y-1">
                  {seoScore.passes.map((pass, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span>{pass}</span>
                    </li>
                  ))}
                </ul>
              )}
              {seoScore.issues.length === 0 && seoScore.passes.length === 0 && (
                <p className="text-xs text-muted">Fill in the SEO fields below to see your score.</p>
              )}
            </div>

            <FormField label="Meta Title">
              <FormInput
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                placeholder="SEO title (defaults to H1 if empty)"
              />
              <span className={`text-xs ${(formData.metaTitle || "").length > 60 ? "text-red-500" : "text-muted"}`}>
                {(formData.metaTitle || "").length}/60 characters
              </span>
            </FormField>

            <FormField label="Meta Description">
              <FormTextarea
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                placeholder="SEO description for search engine results"
                rows={3}
              />
              <span className={`text-xs ${(formData.metaDescription || "").length > 160 ? "text-red-500" : (formData.metaDescription || "").length > 0 && (formData.metaDescription || "").length < 50 ? "text-yellow-500" : "text-muted"}`}>
                {(formData.metaDescription || "").length}/160 characters
                {(formData.metaDescription || "").length > 0 && (formData.metaDescription || "").length < 50 && " — too short"}
                {(formData.metaDescription || "").length > 160 && " — too long"}
              </span>
            </FormField>

            <FormField label="Meta Tags / Keywords">
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.metaTags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-surface text-sm text-foreground">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag, "metaTags")} className="text-muted hover:text-red-500">&times;</button>
                  </span>
                ))}
              </div>
              <FormInput
                value={metaTagInput}
                onChange={(e) => setMetaTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { e.preventDefault(); addTag(metaTagInput, "metaTags"); setMetaTagInput(""); }
                }}
                placeholder="Type and press Enter"
              />
            </FormField>

            <FormField label="Canonical Link">
              <FormInput
                value={formData.canonicalUrl}
                onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                placeholder="Leave empty for auto (live blog URL)"
              />
            </FormField>

            <FormField label="Custom Schema (JSON-LD)">
              <FormTextarea
                value={formData.customSchema}
                onChange={(e) => setFormData({ ...formData, customSchema: e.target.value })}
                placeholder='Leave empty for auto Article schema. Paste valid JSON-LD here.'
                rows={5}
              />
            </FormField>

            <FormField label="Primary Keyword">
              <FormInput
                value={formData.primaryKeyword}
                onChange={(e) => setFormData({ ...formData, primaryKeyword: e.target.value })}
                placeholder="Main keyword for internal linking"
              />
            </FormField>

            <div className="rounded-xl border border-border bg-card p-4 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Noindex</p>
                  <p className="text-xs text-muted mt-0.5">
                    Prevents search engines from indexing this post in search results.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={formData.noindex}
                    onChange={(e) => setFormData({ ...formData, noindex: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-orange-500 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Nofollow</p>
                  <p className="text-xs text-muted mt-0.5">
                    Tells search engines not to follow outbound links on this post.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={formData.nofollow}
                    onChange={(e) => setFormData({ ...formData, nofollow: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-orange-500 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>

              {(formData.noindex || formData.nofollow) && (
                <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-3 text-xs text-amber-400">
                  <strong>Warning:</strong>{" "}
                  {formData.noindex && formData.nofollow
                    ? "Search engines will not index this post or follow its links."
                    : formData.noindex
                    ? "This post will be excluded from search engine results."
                    : "Search engines will not follow links on this post."}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Publishing Tab */}
        {activeTab === "publishing" && (
          <div className="space-y-4">
            <FormField label="Status" required>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "DRAFT" | "SCHEDULED" | "PUBLISHED" })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
              >
                <option value="DRAFT">Draft</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </FormField>

            {formData.status === "SCHEDULED" && (
              <FormField label="Scheduled Publish Date">
                <FormInput
                  type="datetime-local"
                  value={formData.scheduledAt}
                  onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                />
              </FormField>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Author" required>
                <FormInput
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="John Doe"
                />
              </FormField>
              <FormField label="Date" required>
                <FormInput
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </FormField>
            </div>

            <FormField label="Category">
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
              >
                <option value="">No category</option>
                {flattenCategories(buildCategoryTree(categories)).map((opt) => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
            </FormField>

            <FormField label="Tags">
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-surface text-sm text-foreground">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag, "tags")} className="text-muted hover:text-red-500">&times;</button>
                  </span>
                ))}
              </div>
              <div className="relative">
                <FormInput
                  value={tagInput}
                  onChange={(e) => { setTagInput(e.target.value); setShowTagSuggestions(true); }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") { e.preventDefault(); addTag(tagInput, "tags"); setTagInput(""); setShowTagSuggestions(false); }
                    if (e.key === "Escape") setShowTagSuggestions(false);
                  }}
                  onFocus={() => setShowTagSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowTagSuggestions(false), 150)}
                  placeholder="Type and press Enter to add tags"
                />
                {showTagSuggestions && tagInput && (
                  <div className="absolute top-full left-0 right-0 z-10 mt-1 rounded-lg border border-border bg-card shadow-lg overflow-hidden max-h-40 overflow-y-auto">
                    {allTags
                      .filter((t) => t.toLowerCase().includes(tagInput.toLowerCase()) && !formData.tags.includes(t))
                      .map((t) => (
                        <button
                          key={t}
                          type="button"
                          onMouseDown={() => { addTag(t, "tags"); setTagInput(""); setShowTagSuggestions(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-surface transition-colors"
                        >
                          {t}
                        </button>
                      ))}
                    {allTags.filter((t) => t.toLowerCase().includes(tagInput.toLowerCase()) && !formData.tags.includes(t)).length === 0 && (
                      <p className="px-4 py-2 text-sm text-muted">Press Enter to add &ldquo;{tagInput}&rdquo;</p>
                    )}
                  </div>
                )}
              </div>
            </FormField>
          </div>
        )}

        {/* Metadata Tab */}
        {activeTab === "metadata" && (
          <div className="space-y-6">
            <div className="glass rounded-xl p-4 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-foreground">Read Time</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted">
                  Auto-calculated: <strong>{autoReadTime}</strong>
                </span>
                <FormInput
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  placeholder="Override (e.g. 5 min read)"
                  className="max-w-48"
                />
              </div>
            </div>

            <div className="glass rounded-xl p-4 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-foreground">
                  Table of Contents (auto-generated)
                </span>
              </div>
              {headings.length > 0 ? (
                <ul className="space-y-1">
                  {headings.map((h, i) => (
                    <li key={i} className="text-sm text-muted" style={{ paddingLeft: `${(h.level - 1) * 16}px` }}>
                      <span className="text-xs text-orange-500/70 mr-2">H{h.level}</span>
                      {h.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted">No headings found. Use ## and ### in your content.</p>
              )}
            </div>
          </div>
        )}
      </FormLayout>
    </div>
  );
}
