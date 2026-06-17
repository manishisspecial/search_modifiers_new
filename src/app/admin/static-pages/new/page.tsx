"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";
import { MarkdownEditor } from "@/components/admin/markdown-editor";

export default function NewStaticPagePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    metaDescription: "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/static-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create page");

      const data = await response.json();
      router.push(`/admin/static-pages/${data.id}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create page");
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
        title="Create Static Page"
        description={`Permalink: /p/${formData.slug || "your-slug"}`}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Create Page"
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
              placeholder="Page title"
            />
          </FormField>

          <FormField label="Slug" required>
            <FormInput
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              placeholder="page-slug"
            />
          </FormField>
        </div>

        <FormField label="Meta Description">
          <FormTextarea
            value={formData.metaDescription}
            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
            placeholder="SEO description for this page"
            rows={2}
          />
        </FormField>

        <FormField label="Content (Markdown)" required>
          <MarkdownEditor
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
        </FormField>
      </FormLayout>
    </div>
  );
}
