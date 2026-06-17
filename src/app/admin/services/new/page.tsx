"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";
import { NestedFieldArray } from "@/components/admin/nested-field-array";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

export default function NewServicePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    heroTitle: "",
    shortDescription: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    heroEyebrow: "",
    intro: "",
    explanation: "",
    detailMarkdown: "",
    pill: "",
    related: [] as string[],
    proof: [] as { value: string; label: string }[],
    benefitsEyebrow: "",
    benefitsTitle: "",
    benefitsDescription: "",
    processEyebrow: "",
    processTitle: "",
    processDescription: "",
    faqEyebrow: "",
    faqTitle: "",
    faqDescription: "",
    benefits: [] as { title: string; description: string; icon: string }[],
    process: [] as { step: string; title: string; description: string }[],
    faqs: [] as { q: string; a: string }[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const msg = errorData?.error
          ? typeof errorData.error === "string" ? errorData.error : JSON.stringify(errorData.error)
          : `Failed to create service (${response.status})`;
        throw new Error(msg);
      }

      const data = await response.json();
      router.push(`/admin/services/${data.id}`);
    } catch (error: any) {
      console.error("Error:", error);
      alert(error?.message || "Failed to create service");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <FormLayout
        title="Create Service"
        description="Add a new service offering"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Create Service"
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

        <FormField label="Meta Keywords">
          <FormInput
            value={formData.metaKeywords}
            onChange={(e) =>
              setFormData({ ...formData, metaKeywords: e.target.value })
            }
            placeholder="Comma-separated keywords for SEO"
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

        <FormField label="Detail Content (Rich Text)">
          <RichTextEditor
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

        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Section Headings (leave blank for defaults)</h3>

          <p className="text-sm text-muted mb-3 font-medium">Benefits Section</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FormField label="Eyebrow">
              <FormInput
                value={formData.benefitsEyebrow}
                onChange={(e) => setFormData({ ...formData, benefitsEyebrow: e.target.value })}
                placeholder="Outcomes"
              />
            </FormField>
            <FormField label="Title">
              <FormInput
                value={formData.benefitsTitle}
                onChange={(e) => setFormData({ ...formData, benefitsTitle: e.target.value })}
                placeholder="Benefits that show up in your metrics"
              />
            </FormField>
            <FormField label="Description">
              <FormInput
                value={formData.benefitsDescription}
                onChange={(e) => setFormData({ ...formData, benefitsDescription: e.target.value })}
                placeholder="We optimize for pipeline..."
              />
            </FormField>
          </div>

          <p className="text-sm text-muted mb-3 font-medium">Process Section</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FormField label="Eyebrow">
              <FormInput
                value={formData.processEyebrow}
                onChange={(e) => setFormData({ ...formData, processEyebrow: e.target.value })}
                placeholder="Process"
              />
            </FormField>
            <FormField label="Title">
              <FormInput
                value={formData.processTitle}
                onChange={(e) => setFormData({ ...formData, processTitle: e.target.value })}
                placeholder="How we work with your team"
              />
            </FormField>
            <FormField label="Description">
              <FormInput
                value={formData.processDescription}
                onChange={(e) => setFormData({ ...formData, processDescription: e.target.value })}
                placeholder="Transparent phases..."
              />
            </FormField>
          </div>

          <p className="text-sm text-muted mb-3 font-medium">FAQ Section</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Eyebrow">
              <FormInput
                value={formData.faqEyebrow}
                onChange={(e) => setFormData({ ...formData, faqEyebrow: e.target.value })}
                placeholder="FAQ"
              />
            </FormField>
            <FormField label="Title">
              <FormInput
                value={formData.faqTitle}
                onChange={(e) => setFormData({ ...formData, faqTitle: e.target.value })}
                placeholder="Questions clients ask first"
              />
            </FormField>
            <FormField label="Description">
              <FormInput
                value={formData.faqDescription}
                onChange={(e) => setFormData({ ...formData, faqDescription: e.target.value })}
                placeholder="Don't see yours?..."
              />
            </FormField>
          </div>
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
