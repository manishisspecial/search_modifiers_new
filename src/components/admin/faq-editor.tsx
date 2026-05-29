"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";

type Placement = "PAGE" | "BLOG" | "COUNTRY" | "CITY";

interface FaqFormData {
  q: string;
  a: string;
  placement: Placement;
  targetSlug: string;
  order: number;
}

const PLACEMENT_LABELS: Record<Placement, string> = {
  PAGE: "Page",
  BLOG: "Blog",
  COUNTRY: "Country Pages",
  CITY: "City Pages",
};

// Site pages that can host PAGE-placement FAQs.
const PAGE_OPTIONS = [
  { slug: "faq", label: "FAQ page (/faq)" },
  { slug: "about", label: "About (/about)" },
  { slug: "services", label: "Services (/services)" },
  { slug: "contact", label: "Contact (/contact)" },
  { slug: "team", label: "Team (/team)" },
  { slug: "careers", label: "Careers (/careers)" },
  { slug: "portfolio", label: "Portfolio (/portfolio)" },
];

export function FaqEditor({ id, basePath = "/admin/faq" }: { id?: string; basePath?: string }) {
  const router = useRouter();
  const isEdit = Boolean(id);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEdit);
  const [targetOptions, setTargetOptions] = useState<{ slug: string; label: string }[]>([]);
  const [formData, setFormData] = useState<FaqFormData>({
    q: "",
    a: "",
    placement: "PAGE",
    targetSlug: "",
    order: 0,
  });

  // Load existing item in edit mode
  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const res = await fetch(`/api/admin/faq/${id}`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setFormData({
          q: data.q || "",
          a: data.a || "",
          placement: (data.placement as Placement) || "PAGE",
          targetSlug: data.targetSlug || "",
          order: data.order || 0,
        });
      } catch {
        alert("Failed to load FAQ");
        router.push(basePath);
      } finally {
        setIsFetching(false);
      }
    };
    load();
  }, [id, basePath, router]);

  // Load target options whenever placement changes
  useEffect(() => {
    const loadTargets = async () => {
      if (formData.placement === "PAGE") {
        setTargetOptions(PAGE_OPTIONS);
        return;
      }
      try {
        if (formData.placement === "BLOG") {
          const res = await fetch("/api/admin/blog");
          const data = await res.json();
          setTargetOptions(
            (Array.isArray(data) ? data : []).map((p: { slug: string; title: string }) => ({ slug: p.slug, label: p.title }))
          );
        } else {
          const type = formData.placement; // COUNTRY | CITY
          const res = await fetch(`/api/admin/locations?type=${type}`);
          const data = await res.json();
          setTargetOptions(
            (Array.isArray(data) ? data : []).map((l: { slug: string; title: string }) => ({ slug: l.slug, label: l.title }))
          );
        }
      } catch {
        setTargetOptions([]);
      }
    };
    loadTargets();
  }, [formData.placement]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = isEdit ? `/api/admin/faq/${id}` : "/api/admin/faq";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Save failed");
      const data = await res.json();
      router.push(isEdit ? basePath : `${basePath}/${data.id}`);
    } catch {
      alert("Failed to save FAQ");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface rounded w-1/3" />
          <div className="glass rounded-2xl p-6 h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <FormLayout
        title={isEdit ? "Edit FAQ" : "Add FAQ"}
        description="Question, answer, where to show it, and the order it appears in."
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel={isEdit ? "Update FAQ" : "Add FAQ"}
      >
        <FormField label="Question" required>
          <FormInput
            value={formData.q}
            onChange={(e) => setFormData({ ...formData, q: e.target.value })}
            placeholder="What does a typical engagement look like?"
          />
        </FormField>

        <FormField label="Answer" required>
          <FormTextarea
            value={formData.a}
            onChange={(e) => setFormData({ ...formData, a: e.target.value })}
            placeholder="Detailed answer..."
            rows={6}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Where to insert" required>
            <select
              value={formData.placement}
              onChange={(e) =>
                setFormData({ ...formData, placement: e.target.value as Placement, targetSlug: "" })
              }
              className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
            >
              {(Object.keys(PLACEMENT_LABELS) as Placement[]).map((p) => (
                <option key={p} value={p}>
                  {PLACEMENT_LABELS[p]}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Select exact page">
            <select
              value={formData.targetSlug}
              onChange={(e) => setFormData({ ...formData, targetSlug: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
            >
              <option value="">All {PLACEMENT_LABELS[formData.placement]} (no specific page)</option>
              {targetOptions.map((o) => (
                <option key={o.slug} value={o.slug}>
                  {o.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Sequence">
            <FormInput
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              placeholder="1"
            />
            <span className="text-xs text-muted">Lower numbers appear first (1, 2, 3…).</span>
          </FormField>
        </div>
      </FormLayout>
    </div>
  );
}
