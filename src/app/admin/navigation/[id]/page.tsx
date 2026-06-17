"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormLayout, FormField, FormInput } from "@/components/admin/form-layout";

const CATEGORIES = [
  { value: "main", label: "Main Nav" },
  { value: "services", label: "Services" },
  { value: "locations", label: "Country Pages" },
  { value: "footer", label: "Footer" },
];

export default function EditNavigationItemPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    category: "main",
    label: "",
    href: "",
    order: 0,
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/admin/navigation/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch navigation item");
        const data = await response.json();
        setFormData({
          category: data.category || "main",
          label: data.label || "",
          href: data.href || "",
          order: data.order || 0,
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to load navigation item");
        router.push("/admin/navigation");
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
      const response = await fetch(`/api/admin/navigation/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update navigation item");

      alert("Navigation item updated successfully");
      router.push("/admin/navigation");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update navigation item");
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
        title="Edit Navigation Item"
        description="Update navigation link details"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Update Item"
      >
        <FormField label="Category" required>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Label" required>
            <FormInput
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="e.g. About Us"
            />
          </FormField>

          <FormField label="Link (href)" required>
            <FormInput
              value={formData.href}
              onChange={(e) => setFormData({ ...formData, href: e.target.value })}
              placeholder="/about"
            />
          </FormField>

          <FormField label="Display Order">
            <FormInput
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              placeholder="0"
            />
          </FormField>
        </div>
      </FormLayout>
    </div>
  );
}
