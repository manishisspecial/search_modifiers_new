"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";
import { NestedFieldArray } from "@/components/admin/nested-field-array";
import { MarkdownEditor } from "@/components/admin/markdown-editor";

export default function EditCaseStudyPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    industry: "",
    result: "",
    summary: "",
    content: "",
    metrics: [] as { label: string; value: string }[],
  });

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const response = await fetch(`/api/admin/case-studies/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch case study");
        const data = await response.json();
        setFormData({
          slug: data.slug || "",
          title: data.title || "",
          industry: data.industry || "",
          result: data.result || "",
          summary: data.summary || "",
          content: data.content || "",
          metrics: data.metrics?.map((m: any) => ({ label: m.label, value: m.value })) || [],
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to load case study");
        router.push("/admin/case-studies");
      } finally {
        setIsFetching(false);
      }
    };

    if (params.id) {
      fetchCaseStudy();
    }
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/case-studies/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update case study");

      alert("Case study updated successfully");
      router.push("/admin/case-studies");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update case study");
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
        title="Edit Case Study"
        description="Update case study details"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Update Case Study"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Title" required>
            <FormInput
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
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
