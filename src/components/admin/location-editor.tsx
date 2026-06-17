"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";
import { NestedFieldArray } from "@/components/admin/nested-field-array";

interface ManagedLocation {
  id: string;
  name: string;
  slug: string;
  type: string;
  country?: string | null;
}

interface LocationFormData {
  slug: string;
  prefix: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  heroEyebrow: string;
  headline: string;
  intro: string;
  sections: { heading: string; body: string }[];
  localStats: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
}

const empty: LocationFormData = {
  slug: "",
  prefix: "",
  title: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  heroEyebrow: "",
  headline: "",
  intro: "",
  sections: [],
  localStats: [],
  faqs: [],
};

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function LocationEditor({
  type,
  basePath,
  id,
}: {
  type: "COUNTRY" | "CITY";
  basePath: string;
  id?: string;
}) {
  const router = useRouter();
  const isEdit = Boolean(id);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEdit);
  const [managed, setManaged] = useState<ManagedLocation[]>([]);
  const [formData, setFormData] = useState<LocationFormData>(empty);

  useEffect(() => {
    fetch(`/api/admin/managed-locations?type=${type}`)
      .then((r) => r.json())
      .then((d) => setManaged(Array.isArray(d) ? d : []))
      .catch(() => setManaged([]));
  }, [type]);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const res = await fetch(`/api/admin/locations/${id}`);
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setFormData({
          slug: data.slug || "",
          prefix: data.prefix || "",
          title: data.title || "",
          metaTitle: data.metaTitle || "",
          metaDescription: data.metaDescription || "",
          metaKeywords: data.metaKeywords || "",
          heroEyebrow: data.heroEyebrow || "",
          headline: data.headline || "",
          intro: data.intro || "",
          sections: (data.sections || []).map((s: { heading: string; body: string }) => ({ heading: s.heading, body: s.body })),
          localStats: (data.localStats || []).map((s: { label: string; value: string }) => ({ label: s.label, value: s.value })),
          faqs: (data.faqs || []).map((f: { q: string; a: string }) => ({ q: f.q, a: f.a })),
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load");
        router.push(basePath);
      } finally {
        setIsFetching(false);
      }
    };
    load();
  }, [id, basePath, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = isEdit ? `/api/admin/locations/${id}` : "/api/admin/locations";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        const msg = errorData?.error
          ? typeof errorData.error === "string" ? errorData.error : JSON.stringify(errorData.error)
          : `Save failed (${res.status})`;
        throw new Error(msg);
      }
      const data = await res.json();
      router.push(isEdit ? basePath : `${basePath}/${data.id}`);
    } catch (error: any) {
      console.error(error);
      alert(error?.message || "Failed to save");
    } finally {
      setIsLoading(false);
    }
  };

  const noun = type === "COUNTRY" ? "Country Page" : "City Page";

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
        title={isEdit ? `Edit ${noun}` : `Create ${noun}`}
        description={`Permalink: ${formData.prefix ? `/${formData.prefix}/${formData.slug || "your-slug"}` : `/location/${formData.slug || "your-slug"}`}`}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel={isEdit ? `Update ${noun}` : `Create ${noun}`}
      >
        {/* Permalink preview */}
        {formData.prefix && formData.slug && (
          <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 px-4 py-3">
            <p className="text-xs font-medium text-green-700 dark:text-green-300 mb-1">Live URL Preview</p>
            <p className="text-sm font-mono text-green-900 dark:text-green-100">
              https://www.searchmodifiers.com/{formData.prefix}/{formData.slug}
            </p>
          </div>
        )}
        {managed.length > 0 && (
          <FormField label={`Pick a managed ${type === "COUNTRY" ? "country" : "city"} (optional)`}>
            <select
              value=""
              onChange={(e) => {
                const m = managed.find((x) => x.id === e.target.value);
                if (m) {
                  const newPrefix = m.slug;
                  const newSlug = `seo-company-${m.slug}`;
                  const newTitle = type === "COUNTRY"
                    ? `SEO Company in ${m.name}`
                    : `SEO Company in ${m.name}`;
                  setFormData((prev) => ({
                    ...prev,
                    title: newTitle,
                    slug: newSlug,
                    prefix: newPrefix,
                  }));
                }
              }}
              className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
            >
              <option value="">— Select from managed list —</option>
              {managed.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                  {m.country ? ` (${m.country})` : ""}
                </option>
              ))}
            </select>
            <span className="text-xs text-muted">
              Selecting a {type === "COUNTRY" ? "country" : "city"} will auto-fill the title, slug, and prefix to generate the correct permalink.
            </span>
          </FormField>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Title" required>
            <FormInput
              value={formData.title}
              onChange={(e) => {
                const title = e.target.value;
                setFormData({ ...formData, title, slug: formData.slug || generateSlug(title) });
              }}
              placeholder={type === "COUNTRY" ? "SEO Company in India" : "SEO Company in Delhi"}
            />
          </FormField>

          <FormField label="Slug" required>
            <FormInput
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder={type === "COUNTRY" ? "seo-company-india" : "seo-company-delhi"}
            />
          </FormField>

          <FormField label="URL Prefix" required>
            <FormInput
              value={formData.prefix}
              onChange={(e) => setFormData({ ...formData, prefix: e.target.value })}
              placeholder={type === "COUNTRY" ? "india" : "delhi"}
            />
            <span className="text-xs text-muted">
              First segment in the URL: /{formData.prefix || "prefix"}/{formData.slug || "slug"}
            </span>
          </FormField>

          <FormField label="Meta Title" required>
            <FormInput
              value={formData.metaTitle}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              placeholder="SEO title for this page"
            />
          </FormField>

          <FormField label="Hero Eyebrow" required>
            <FormInput
              value={formData.heroEyebrow}
              onChange={(e) => setFormData({ ...formData, heroEyebrow: e.target.value })}
              placeholder="Local Expertise"
            />
          </FormField>
        </div>

        <FormField label="Meta Description" required>
          <FormTextarea
            value={formData.metaDescription}
            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
            placeholder="SEO description for this page"
            rows={2}
          />
        </FormField>

        <FormField label="Meta Keywords">
          <FormInput
            value={formData.metaKeywords}
            onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
            placeholder="Comma-separated keywords for SEO"
          />
        </FormField>

        <FormField label="Headline" required>
          <FormInput
            value={formData.headline}
            onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
            placeholder="Main headline"
          />
        </FormField>

        <FormField label="Introduction" required>
          <FormTextarea
            value={formData.intro}
            onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
            placeholder="Introduction paragraph"
            rows={3}
          />
        </FormField>

        <NestedFieldArray
          label="Local Stats"
          items={formData.localStats}
          onAdd={() => setFormData({ ...formData, localStats: [...formData.localStats, { label: "", value: "" }] })}
          onRemove={(index) => setFormData({ ...formData, localStats: formData.localStats.filter((_, i) => i !== index) })}
          onItemChange={(index, field, value) => {
            const updated = [...formData.localStats];
            updated[index] = { ...updated[index], [field]: value };
            setFormData({ ...formData, localStats: updated });
          }}
          fields={[
            { name: "label", label: "Label", placeholder: "Businesses Served" },
            { name: "value", label: "Value", placeholder: "500+" },
          ]}
        />

        <NestedFieldArray
          label="Content Sections"
          items={formData.sections}
          onAdd={() => setFormData({ ...formData, sections: [...formData.sections, { heading: "", body: "" }] })}
          onRemove={(index) => setFormData({ ...formData, sections: formData.sections.filter((_, i) => i !== index) })}
          onItemChange={(index, field, value) => {
            const updated = [...formData.sections];
            updated[index] = { ...updated[index], [field]: value };
            setFormData({ ...formData, sections: updated });
          }}
          fields={[
            { name: "heading", label: "Heading", placeholder: "Section heading" },
            { name: "body", label: "Content", type: "textarea", placeholder: "Section content..." },
          ]}
        />

        <NestedFieldArray
          label="FAQs"
          items={formData.faqs}
          onAdd={() => setFormData({ ...formData, faqs: [...formData.faqs, { q: "", a: "" }] })}
          onRemove={(index) => setFormData({ ...formData, faqs: formData.faqs.filter((_, i) => i !== index) })}
          onItemChange={(index, field, value) => {
            const updated = [...formData.faqs];
            updated[index] = { ...updated[index], [field]: value };
            setFormData({ ...formData, faqs: updated });
          }}
          fields={[
            { name: "q", label: "Question", type: "textarea", placeholder: "Frequently asked question" },
            { name: "a", label: "Answer", type: "textarea", placeholder: "Answer to the question" },
          ]}
        />
      </FormLayout>
    </div>
  );
}
