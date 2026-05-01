"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";

export default function NewPortfolioItemPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    icon: "sparkles",
    order: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create portfolio item");

      const data = await response.json();
      router.push(`/admin/portfolio/${data.id}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create portfolio item");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <FormLayout
        title="Add Portfolio Item"
        description="Add a new portfolio item"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Add Item"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Title" required>
            <FormInput
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Project title"
            />
          </FormField>

          <FormField label="Category" required>
            <FormInput
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="e.g. Brand & Web"
            />
          </FormField>
        </div>

        <FormField label="Description" required>
          <FormTextarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Project description..."
            rows={4}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Icon">
            <select
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            >
              <option value="sparkles">Sparkles</option>
              <option value="palette">Palette</option>
              <option value="layout">Layout</option>
              <option value="share2">Share2</option>
              <option value="search">Search</option>
            </select>
          </FormField>

          <FormField label="Display Order">
            <FormInput
              type="number"
              value={formData.order}
              onChange={(e) =>
                setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
              }
              placeholder="0"
            />
          </FormField>
        </div>
      </FormLayout>
    </div>
  );
}
