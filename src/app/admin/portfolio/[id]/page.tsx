"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";

export default function EditPortfolioItemPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    icon: "sparkles",
    order: 0,
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/admin/portfolio/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch portfolio item");
        const data = await response.json();
        setFormData({
          title: data.title || "",
          category: data.category || "",
          description: data.description || "",
          icon: data.icon || "sparkles",
          order: data.order || 0,
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to load portfolio item");
        router.push("/admin/portfolio");
      } finally {
        setIsFetching(false);
      }
    };

    if (params.id) {
      fetchItem();
    }
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/portfolio/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update portfolio item");

      alert("Portfolio item updated successfully");
      router.push("/admin/portfolio");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update portfolio item");
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
        title="Edit Portfolio Item"
        description="Update portfolio item details"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Update Item"
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
