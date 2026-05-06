"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, ChevronRight, FolderTree, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, FormInput } from "@/components/admin/form-layout";
import Link from "next/link";

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  order: number;
  children: BlogCategory[];
  _count?: { posts: number };
}

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildTree(categories: BlogCategory[]): BlogCategory[] {
  const map = new Map<string, BlogCategory>();
  const roots: BlogCategory[] = [];

  categories.forEach((c) => map.set(c.id, { ...c, children: [] }));
  categories.forEach((c) => {
    const node = map.get(c.id)!;
    if (c.parentId && map.has(c.parentId)) {
      map.get(c.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

function sortByOrder(cats: BlogCategory[]): BlogCategory[] {
  return [...cats].sort((a, b) => a.order - b.order).map((c) => ({
    ...c,
    children: sortByOrder(c.children),
  }));
}

interface CategoryRowProps {
  category: BlogCategory;
  depth: number;
  allCategories: BlogCategory[];
  onEdit: (cat: BlogCategory) => void;
  onDelete: (id: string) => void;
}

function CategoryRow({ category, depth, allCategories, onEdit, onDelete }: CategoryRowProps) {
  const postCount = category._count?.posts ?? 0;
  return (
    <>
      <div
        className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-surface/60 transition-colors group"
        style={{ paddingLeft: `${16 + depth * 28}px` }}
      >
        <div className="flex items-center gap-3 min-w-0">
          {depth > 0 && (
            <ChevronRight className="w-3.5 h-3.5 text-muted/40 shrink-0" />
          )}
          <FolderTree className={`w-4 h-4 shrink-0 ${depth === 0 ? "text-orange-500" : "text-muted/60"}`} />
          <div className="min-w-0">
            <span className="font-medium text-foreground text-sm truncate block">
              {category.name}
            </span>
            <span className="text-xs text-muted/70 font-mono">/blog/category/{category.slug}</span>
          </div>
          <span className="ml-2 px-1.5 py-0.5 text-[10px] rounded bg-surface text-muted border border-border shrink-0">
            {postCount} {postCount === 1 ? "post" : "posts"}
          </span>
          {category.children.length > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] rounded bg-orange-500/10 text-orange-500 border border-orange-500/20 shrink-0">
              {category.children.length} sub
            </span>
          )}
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(category)}
            className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-surface transition-colors"
            title="Edit"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(category.id)}
            className="p-1.5 rounded-lg text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      {category.children.map((child) => (
        <CategoryRow
          key={child.id}
          category={child}
          depth={depth + 1}
          allCategories={allCategories}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}

interface CategoryFormProps {
  allCategories: BlogCategory[];
  editing: BlogCategory | null;
  onSave: (data: { name: string; slug: string; parentId: string; order: number }) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}

function CategoryForm({ allCategories, editing, onSave, onCancel, isSaving }: CategoryFormProps) {
  const [name, setName] = useState(editing?.name ?? "");
  const [slug, setSlug] = useState(editing?.slug ?? "");
  const [parentId, setParentId] = useState(editing?.parentId ?? "");
  const [order, setOrder] = useState(editing?.order ?? 0);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!editing);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!slugManuallyEdited) setSlug(generateSlug(val));
  };

  // Flat list for parent selector (exclude self and own descendants)
  const getDescendantIds = (id: string, cats: BlogCategory[]): Set<string> => {
    const result = new Set<string>();
    const recurse = (cid: string) => {
      result.add(cid);
      cats.filter((c) => c.parentId === cid).forEach((c) => recurse(c.id));
    };
    recurse(id);
    return result;
  };

  const excluded = editing ? getDescendantIds(editing.id, allCategories) : new Set<string>();

  const flatParentOptions = allCategories
    .filter((c) => !excluded.has(c.id))
    .map((c) => {
      let prefix = "";
      let pid = c.parentId;
      while (pid) {
        prefix += "— ";
        const parent = allCategories.find((p) => p.id === pid);
        pid = parent?.parentId ?? null;
      }
      return { id: c.id, label: prefix + c.name };
    });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ name, slug, parentId, order });
      }}
      className="glass rounded-2xl border border-border p-6 space-y-4"
    >
      <h3 className="font-semibold text-foreground">
        {editing ? "Edit Category" : "New Category"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Name" required>
          <FormInput
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="e.g. SEO Tips"
            required
          />
        </FormField>
        <FormField label="URL Slug" required>
          <FormInput
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setSlugManuallyEdited(true); }}
            placeholder="e.g. seo-tips"
            required
          />
          <span className="text-xs text-muted">/blog/category/{slug || "…"}</span>
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Parent Category">
          <select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-brand text-sm"
          >
            <option value="">— Top level (no parent)</option>
            {flatParentOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Order">
          <FormInput
            type="number"
            value={String(order)}
            onChange={(e) => setOrder(Number(e.target.value))}
            placeholder="0"
          />
          <span className="text-xs text-muted">Lower numbers appear first</span>
        </FormField>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" variant="primary" disabled={isSaving}>
          {isSaving ? "Saving…" : editing ? "Update Category" : "Create Category"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BlogCategory | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/blog/categories");
      if (res.ok) {
        const data: BlogCategory[] = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async (data: { name: string; slug: string; parentId: string; order: number }) => {
    setIsSaving(true);
    try {
      const url = editing
        ? `/api/admin/blog/categories/${editing.id}`
        : "/api/admin/blog/categories";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          slug: data.slug,
          parentId: data.parentId || null,
          order: data.order,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Save failed");
      }

      await fetchCategories();
      setShowForm(false);
      setEditing(null);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to save category");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const cat = categories.find((c) => c.id === id);
    if (!confirm(`Delete "${cat?.name}"? Posts in this category will become uncategorized. Child categories will be promoted to the parent level.`)) return;

    try {
      const res = await fetch(`/api/admin/blog/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await fetchCategories();
    } catch (error) {
      console.error(error);
      alert("Failed to delete category");
    }
  };

  const handleEdit = (cat: BlogCategory) => {
    setEditing(cat);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  const tree = sortByOrder(buildTree(categories));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted mb-1">
            <Link href="/admin/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Categories</span>
          </div>
          <h1 className="text-3xl font-bold font-display text-foreground">Blog Categories</h1>
          <p className="text-muted text-sm mt-1">
            Hierarchical taxonomy for site structure and navigation
          </p>
        </div>
        {!showForm && (
          <Button
            variant="primary"
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Category
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <CategoryForm
          allCategories={categories}
          editing={editing}
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={isSaving}
        />
      )}

      {/* Category Tree */}
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass rounded-xl h-14 animate-pulse" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="glass rounded-2xl border border-border p-12 text-center">
          <FolderTree className="w-12 h-12 text-muted/30 mx-auto mb-4" />
          <p className="text-muted mb-2">No categories yet</p>
          <p className="text-sm text-muted/60">
            Categories help organise your blog posts and create navigable site structure.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 text-sm text-orange-500 hover:underline"
          >
            Create your first category
          </button>
        </div>
      ) : (
        <div className="glass rounded-2xl border border-border overflow-hidden">
          {/* Table Header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface/40 text-xs font-semibold uppercase tracking-wider text-muted">
            <span>Category / Hierarchy</span>
            <span>Actions</span>
          </div>

          {/* Tree */}
          <div className="divide-y divide-border/50 p-1">
            {tree.map((cat) => (
              <CategoryRow
                key={cat.id}
                category={cat}
                depth={0}
                allCategories={categories}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tags info card */}
      <div className="glass rounded-2xl border border-border p-5 flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-surface">
          <Tag className="w-5 h-5 text-muted" />
        </div>
        <div>
          <p className="font-medium text-foreground text-sm">Tags are managed per post</p>
          <p className="text-sm text-muted mt-0.5">
            Tags are non-hierarchical and entered directly on each blog post (Publishing tab).
            They power the <code className="text-xs bg-surface px-1 rounded">/blog/tag/[slug]</code> archive pages.
          </p>
        </div>
      </div>
    </div>
  );
}
