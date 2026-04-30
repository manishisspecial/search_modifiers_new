"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";
import { NestedFieldArray } from "@/components/admin/nested-field-array";
import { MarkdownEditor } from "@/components/admin/markdown-editor";

export default function NewCaseStudyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    industry: "",
    result: "",
    summary: "",
    content: "",
    metrics: [] as { label: string; value: string }[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/case-studies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create case study");

      const data = await response.json();
      router.push(`/admin/case-studies/${data.id}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create case study");
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  return (
    <div className="p-6">
      <FormLayout
        title="Create Case Study"
        description="Add a new case study"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Create Case Study"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Title" required>
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
              placeholder="Case study title"
            />
          </FormField>

          <FormField label="Slug" required>
            <FormInput
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              placeholder="case-study-slug"
            />
          </FormField>

          <FormField label="Industry" required>
            <FormInput
              value={formData.industry}
              onChange={(e) =>
                setFormData({ ...formData, industry: e.target.value })
              }
              placeholder="Healthcare, E-commerce, etc."
            />
          </FormField>

          <FormField label="Result Highlight" required>
            <FormInput
              value={formData.result}
              onChange={(e) =>
                setFormData({ ...formData, result: e.target.value })
              }
              placeholder="150% increase in traffic"
            />
          </FormField>
        </div>

        <FormField label="Summary" required>
          <FormTextarea
            value={formData.summary}
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
            placeholder="Brief summary of the case study"
            rows={3}
          />
        </FormField>

        <FormField label="Content" required>
          <MarkdownEditor
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
        </FormField>

        <NestedFieldArray
          label="Metrics"
          items={formData.metrics}
          onAdd={() =>
            setFormData({
              ...formData,
              metrics: [...formData.metrics, { label: "", value: "" }],
            })
          }
          onRemove={(index) =>
            setFormData({
              ...formData,
              metrics: formData.metrics.filter((_, i) => i !== index),
            })
          }
          onItemChange={(index, field, value) => {
            const updated = [...formData.metrics];
            updated[index] = { ...updated[index], [field]: value };
            setFormData({ ...formData, metrics: updated });
          }}
          fields={[
            { name: "label", label: "Label", placeholder: "Organic Traffic" },
            { name: "value", label: "Value", placeholder: "+150%" },
          ]}
        />
      </FormLayout>
    </div>
  );
}
