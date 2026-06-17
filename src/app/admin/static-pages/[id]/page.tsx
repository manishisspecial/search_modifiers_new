"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";
import { MarkdownEditor } from "@/components/admin/markdown-editor";

export default function EditStaticPagePage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    metaDescription: "",
    content: "",
  });

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(`/api/admin/static-pages/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch page");
        const data = await response.json();
        setFormData({
          slug: data.slug || "",
          title: data.title || "",
          metaDescription: data.metaDescription || "",
          content: data.content || "",
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to load page");
        router.push("/admin/static-pages");
      } finally {
        setIsFetching(false);
      }
    };

    if (params.id) {
      fetchPage();
    }
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/static-pages/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update page");

      alert("Page updated successfully");
      router.push("/admin/static-pages");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update page");
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
        title="Edit Static Page"
        description={`Permalink: /p/${formData.slug || "your-slug"}`}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Update Page"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Title" required>
            <FormInput
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
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
