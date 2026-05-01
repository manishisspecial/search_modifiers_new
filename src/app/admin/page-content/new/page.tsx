"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FormLayout,
  FormField,
  FormInput,
  FormTextarea,
} from "@/components/admin/form-layout";

export default function NewPageContentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    fields: {} as Record<string, unknown>,
  });
  const [fieldsJson, setFieldsJson] = useState("{}");
  const [jsonError, setJsonError] = useState("");

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
      const response = await fetch("/api/admin/page-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create page content");

      const data = await response.json();
      router.push(`/admin/page-content/${data.id}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create page content");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <FormLayout
        title="Add Page Content"
        description="Create a new editable content block for a page"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Create Entry"
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
