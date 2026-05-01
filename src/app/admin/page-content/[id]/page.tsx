"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  FormLayout,
  FormField,
  FormInput,
  FormTextarea,
} from "@/components/admin/form-layout";

export default function EditPageContentPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    fields: {} as Record<string, unknown>,
  });
  const [fieldsJson, setFieldsJson] = useState("{}");
  const [jsonError, setJsonError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/admin/page-content/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch page content");
        const data = await response.json();
        setFormData({
          slug: data.slug || "",
          title: data.title || "",
          fields: data.fields || {},
        });
        setFieldsJson(JSON.stringify(data.fields || {}, null, 2));
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to load page content");
        router.push("/admin/page-content");
      } finally {
        setIsFetching(false);
      }
    };

    if (params.id) {
      fetchItem();
    }
  }, [params.id, router]);

  const handleFieldsChange = (value: string) => {
    setFieldsJson(value);
    setJsonError("");
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed !== "object" || Array.isArray(parsed) || parsed === null) {
        setJsonError("Fields must be a JSON object");
        return;
      }
      setFormData({ ...formData, fields: parsed });
    } catch {
      setJsonError("Invalid JSON");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (jsonError) {
      alert("Please fix the JSON errors before saving");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/page-content/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update page content");

      alert("Page content updated successfully");
      router.push("/admin/page-content");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update page content");
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
          <div className="glass rounded-2xl p-6 h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <FormLayout
        title="Edit Page Content"
        description={`Editing: ${formData.slug}`}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Update Entry"
      >
        <FormField label="Slug" required>
          <FormInput
            value={formData.slug}
            onChange={(e) =>
              setFormData({ ...formData, slug: e.target.value })
            }
            placeholder="about-hero"
          />
        </FormField>

        <FormField label="Title" required>
          <FormInput
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="About Page — Hero Section"
          />
        </FormField>

        <FormField label="Fields (JSON)" required error={jsonError}>
          <FormTextarea
            value={fieldsJson}
            onChange={(e) => handleFieldsChange(e.target.value)}
            rows={12}
            placeholder='{ "headline": "About Us", "description": "..." }'
            className="font-mono text-sm"
          />
        </FormField>
      </FormLayout>
    </div>
  );
}
