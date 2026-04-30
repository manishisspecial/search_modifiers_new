"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";
import { NestedFieldArray } from "@/components/admin/nested-field-array";

export default function EditLocationPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    metaTitle: "",
    metaDescription: "",
    heroEyebrow: "",
    headline: "",
    intro: "",
    sections: [] as { heading: string; body: string }[],
    localStats: [] as { label: string; value: string }[],
    faqs: [] as { q: string; a: string }[],
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`/api/admin/locations/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch location");
        const data = await response.json();
        setFormData({
          slug: data.slug || "",
          title: data.title || "",
          metaTitle: data.metaTitle || "",
          metaDescription: data.metaDescription || "",
          heroEyebrow: data.heroEyebrow || "",
          headline: data.headline || "",
          intro: data.intro || "",
          sections: data.sections?.map((s: any) => ({ heading: s.heading, body: s.body })) || [],
          localStats: data.localStats?.map((s: any) => ({ label: s.label, value: s.value })) || [],
          faqs: data.faqs?.map((f: any) => ({ q: f.q, a: f.a })) || [],
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to load location");
        router.push("/admin/locations");
      } finally {
        setIsFetching(false);
      }
    };

    if (params.id) {
      fetchLocation();
    }
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/locations/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update location");

      alert("Location updated successfully");
      router.push("/admin/locations");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update location");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface rounded w-1/3" />
          <div className="h-4 bg-surface rounded w-1/4" />
          <div className="glass rounded-2xl p-6 h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <FormLayout
        title="Edit Location"
        description="Update location page details"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Update Location"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Title" required>
            <FormInput
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Digital Marketing in Delhi"
            />
          </FormField>

          <FormField label="Slug" required>
            <FormInput
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              placeholder="digital-marketing-delhi"
            />
          </FormField>

          <FormField label="Meta Title" required>
            <FormInput
              value={formData.metaTitle}
              onChange={(e) =>
                setFormData({ ...formData, metaTitle: e.target.value })
              }
              placeholder="SEO title for this location page"
            />
          </FormField>

          <FormField label="Hero Eyebrow" required>
            <FormInput
              value={formData.heroEyebrow}
              onChange={(e) =>
                setFormData({ ...formData, heroEyebrow: e.target.value })
              }
              placeholder="Local Expertise"
            />
          </FormField>
        </div>

        <FormField label="Meta Description" required>
          <FormTextarea
            value={formData.metaDescription}
            onChange={(e) =>
              setFormData({ ...formData, metaDescription: e.target.value })
            }
            placeholder="SEO description for this location page"
            rows={2}
          />
        </FormField>

        <FormField label="Headline" required>
          <FormInput
            value={formData.headline}
            onChange={(e) =>
              setFormData({ ...formData, headline: e.target.value })
            }
            placeholder="Main headline for the location page"
          />
        </FormField>

        <FormField label="Introduction" required>
          <FormTextarea
            value={formData.intro}
            onChange={(e) =>
              setFormData({ ...formData, intro: e.target.value })
            }
            placeholder="Introduction paragraph"
            rows={3}
          />
        </FormField>

        <NestedFieldArray
          label="Local Stats"
          items={formData.localStats}
          onAdd={() =>
            setFormData({
              ...formData,
              localStats: [...formData.localStats, { label: "", value: "" }],
            })
          }
          onRemove={(index) =>
            setFormData({
              ...formData,
              localStats: formData.localStats.filter((_, i) => i !== index),
            })
          }
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
          onAdd={() =>
            setFormData({
              ...formData,
              sections: [...formData.sections, { heading: "", body: "" }],
            })
          }
          onRemove={(index) =>
            setFormData({
              ...formData,
              sections: formData.sections.filter((_, i) => i !== index),
            })
          }
          onItemChange={(index, field, value) => {
            const updated = [...formData.sections];
            updated[index] = { ...updated[index], [field]: value };
            setFormData({ ...formData, sections: updated });
          }}
          fields={[
            { name: "heading", label: "Heading", placeholder: "Section heading" },
            {
              name: "body",
              label: "Content",
              type: "textarea",
              placeholder: "Section content...",
            },
          ]}
        />

        <NestedFieldArray
          label="FAQs"
          items={formData.faqs}
          onAdd={() =>
            setFormData({
              ...formData,
              faqs: [...formData.faqs, { q: "", a: "" }],
            })
          }
          onRemove={(index) =>
            setFormData({
              ...formData,
              faqs: formData.faqs.filter((_, i) => i !== index),
            })
          }
          onItemChange={(index, field, value) => {
            const updated = [...formData.faqs];
            updated[index] = { ...updated[index], [field]: value };
            setFormData({ ...formData, faqs: updated });
          }}
          fields={[
            {
              name: "q",
              label: "Question",
              type: "textarea",
              placeholder: "Frequently asked question",
            },
            {
              name: "a",
              label: "Answer",
              type: "textarea",
              placeholder: "Answer to the question",
            },
          ]}
        />
      </FormLayout>
    </div>
  );
}
