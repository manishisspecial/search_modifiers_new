"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";
import { NestedFieldArray } from "@/components/admin/nested-field-array";
import { MarkdownEditor } from "@/components/admin/markdown-editor";

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    heroTitle: "",
    shortDescription: "",
    metaTitle: "",
    metaDescription: "",
    heroEyebrow: "",
    intro: "",
    explanation: "",
    detailMarkdown: "",
    pill: "",
    related: [] as string[],
    proof: [] as { value: string; label: string }[],
    benefits: [] as { title: string; description: string; icon: string }[],
    process: [] as { step: string; title: string; description: string }[],
    faqs: [] as { q: string; a: string }[],
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/api/admin/services/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch service");
        const data = await response.json();
        setFormData({
          slug: data.slug || "",
          title: data.title || "",
          heroTitle: data.heroTitle || "",
          shortDescription: data.shortDescription || "",
          metaTitle: data.metaTitle || "",
          metaDescription: data.metaDescription || "",
          heroEyebrow: data.heroEyebrow || "",
          intro: data.intro || "",
          explanation: data.explanation || "",
          detailMarkdown: data.detailMarkdown || "",
          pill: data.pill || "",
          related: Array.isArray(data.related) ? data.related : [],
          proof: Array.isArray(data.proof) ? data.proof.map((p: any) => ({ value: p.value || "", label: p.label || "" })) : [],
          benefits: data.benefits?.map((b: any) => ({
            title: b.title,
            description: b.description,
            icon: b.icon,
          })) || [],
          process: data.process?.map((p: any) => ({
            step: p.step,
            title: p.title,
            description: p.description,
          })) || [],
          faqs: data.faqs?.map((f: any) => ({ q: f.q, a: f.a })) || [],
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to load service");
        router.push("/admin/services");
      } finally {
        setIsFetching(false);
      }
    };

    if (params.id) {
      fetchService();
    }
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/services/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update service");

      alert("Service updated successfully");
      router.push("/admin/services");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update service");
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
        title="Edit Service"
        description="Update service offering details"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Update Service"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Slug" required>
            <FormInput
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              placeholder="seo-services"
            />
          </FormField>

          <FormField label="Title" required>
            <FormInput
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="SEO Services"
            />
          </FormField>

          <FormField label="Hero Title (Optional)">
            <FormInput
              value={formData.heroTitle}
              onChange={(e) =>
                setFormData({ ...formData, heroTitle: e.target.value })
              }
              placeholder="Leave blank to use Title"
            />
          </FormField>

          <FormField label="Hero Eyebrow" required>
            <FormInput
              value={formData.heroEyebrow}
              onChange={(e) =>
                setFormData({ ...formData, heroEyebrow: e.target.value })
              }
              placeholder="Our Expertise"
            />
          </FormField>
        </div>

        <FormField label="Short Description" required>
          <FormTextarea
            value={formData.shortDescription}
            onChange={(e) =>
              setFormData({ ...formData, shortDescription: e.target.value })
            }
            placeholder="Brief description for listings"
            rows={2}
          />
        </FormField>

        <FormField label="Meta Title" required>
          <FormInput
            value={formData.metaTitle}
            onChange={(e) =>
              setFormData({ ...formData, metaTitle: e.target.value })
            }
            placeholder="SEO Title"
          />
        </FormField>

        <FormField label="Meta Description" required>
          <FormTextarea
            value={formData.metaDescription}
            onChange={(e) =>
              setFormData({ ...formData, metaDescription: e.target.value })
            }
            placeholder="For search engines"
            rows={2}
          />
        </FormField>

        <FormField label="Intro" required>
          <FormTextarea
            value={formData.intro}
            onChange={(e) =>
              setFormData({ ...formData, intro: e.target.value })
            }
            placeholder="Introduction text"
            rows={3}
          />
        </FormField>

        <FormField label="Explanation" required>
          <FormTextarea
            value={formData.explanation}
            onChange={(e) =>
              setFormData({ ...formData, explanation: e.target.value })
            }
            placeholder="Detailed explanation"
            rows={3}
          />
        </FormField>

        <FormField label="Detail Markdown (Optional)">
          <MarkdownEditor
            value={formData.detailMarkdown}
            onChange={(value) =>
              setFormData({ ...formData, detailMarkdown: value })
            }
          />
        </FormField>

        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Service Meta (Dashboard & Stats)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Pill Text">
              <FormInput
                value={formData.pill}
                onChange={(e) =>
                  setFormData({ ...formData, pill: e.target.value })
                }
                placeholder="e.g. Full-funnel growth"
              />
            </FormField>

            <FormField label="Related Service Slugs (comma-separated)">
              <FormInput
                value={formData.related.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    related: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="seo-services, ppc-services"
              />
            </FormField>
          </div>

          <NestedFieldArray
            label="Proof / Stat Badges"
            items={formData.proof}
            onAdd={() =>
              setFormData({
                ...formData,
                proof: [...formData.proof, { value: "", label: "" }],
              })
            }
            onRemove={(index) =>
              setFormData({
                ...formData,
                proof: formData.proof.filter((_, i) => i !== index),
              })
            }
            onItemChange={(index, field, value) => {
              const updated = [...formData.proof];
              updated[index] = { ...updated[index], [field]: value };
              setFormData({ ...formData, proof: updated });
            }}
            fields={[
              { name: "value", label: "Value", placeholder: "412" },
              { name: "label", label: "Label", placeholder: "Top-3 rankings won" },
            ]}
          />
        </div>

        <NestedFieldArray
          label="Benefits"
          items={formData.benefits}
          onAdd={() =>
            setFormData({
              ...formData,
              benefits: [
                ...formData.benefits,
                { title: "", description: "", icon: "star" },
              ],
            })
          }
          onRemove={(index) =>
            setFormData({
              ...formData,
              benefits: formData.benefits.filter((_, i) => i !== index),
            })
          }
          onItemChange={(index, field, value) => {
            const updated = [...formData.benefits];
            updated[index] = { ...updated[index], [field]: value };
            setFormData({ ...formData, benefits: updated });
          }}
          fields={[
            { name: "title", label: "Title", placeholder: "Benefit title" },
            {
              name: "description",
              label: "Description",
              type: "textarea",
              placeholder: "Benefit description",
            },
            { name: "icon", label: "Icon", placeholder: "lucide-react icon name" },
          ]}
        />

        <NestedFieldArray
          label="Process Steps"
          items={formData.process}
          onAdd={() =>
            setFormData({
              ...formData,
              process: [...formData.process, { step: "", title: "", description: "" }],
            })
          }
          onRemove={(index) =>
            setFormData({
              ...formData,
              process: formData.process.filter((_, i) => i !== index),
            })
          }
          onItemChange={(index, field, value) => {
            const updated = [...formData.process];
            updated[index] = { ...updated[index], [field]: value };
            setFormData({ ...formData, process: updated });
          }}
          fields={[
            { name: "step", label: "Step Number", placeholder: "01" },
            { name: "title", label: "Title", placeholder: "Step title" },
            {
              name: "description",
              label: "Description",
              type: "textarea",
              placeholder: "Step description",
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
