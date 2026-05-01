"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormLayout, FormField, FormInput } from "@/components/admin/form-layout";

export default function EditTrustBadgePage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    label: "",
    subtitle: "",
    href: "",
    order: 0,
  });

  useEffect(() => {
    const fetchBadge = async () => {
      try {
        const response = await fetch(`/api/admin/trust-badges/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch trust badge");
        const data = await response.json();
        setFormData({
          label: data.label || "",
          subtitle: data.subtitle || "",
          href: data.href || "",
          order: data.order || 0,
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to load trust badge");
        router.push("/admin/trust-badges");
      } finally {
        setIsFetching(false);
      }
    };

    if (params.id) {
      fetchBadge();
    }
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/trust-badges/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update trust badge");

      alert("Trust badge updated successfully");
      router.push("/admin/trust-badges");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update trust badge");
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
        title="Edit Trust Badge"
        description="Update trust badge details"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Update Badge"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Label" required>
            <FormInput
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="e.g. Google Partner"
            />
          </FormField>

          <FormField label="Subtitle" required>
            <FormInput
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="e.g. Premier"
            />
          </FormField>

          <FormField label="Link (href)" required>
            <FormInput
              value={formData.href}
              onChange={(e) => setFormData({ ...formData, href: e.target.value })}
              placeholder="https://..."
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
