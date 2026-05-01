"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";

export default function EditCareerRolePage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    isOpen: true,
    order: 0,
  });

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch(`/api/admin/careers/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch career role");
        const data = await response.json();
        setFormData({
          title: data.title || "",
          type: data.type || "",
          description: data.description || "",
          isOpen: data.isOpen ?? true,
          order: data.order || 0,
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to load career role");
        router.push("/admin/careers");
      } finally {
        setIsFetching(false);
      }
    };

    if (params.id) {
      fetchRole();
    }
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/careers/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update career role");

      alert("Career role updated successfully");
      router.push("/admin/careers");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update career role");
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
        title="Edit Career Role"
        description="Update career role details"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Update Role"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Title" required>
            <FormInput
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g. Senior Performance Marketing Manager"
            />
          </FormField>

          <FormField label="Type" required>
            <FormInput
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              placeholder="e.g. Full-time · Remote-friendly"
            />
          </FormField>
        </div>

        <FormField label="Description" required>
          <FormTextarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Role description..."
            rows={4}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Status">
            <select
              value={formData.isOpen ? "true" : "false"}
              onChange={(e) =>
                setFormData({ ...formData, isOpen: e.target.value === "true" })
              }
              className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            >
              <option value="true">Open</option>
              <option value="false">Closed</option>
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
