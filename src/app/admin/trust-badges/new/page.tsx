"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormLayout, FormField, FormInput } from "@/components/admin/form-layout";

export default function NewTrustBadgePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    label: "",
    subtitle: "",
    href: "",
    order: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/trust-badges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create trust badge");

      const data = await response.json();
      router.push(`/admin/trust-badges/${data.id}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create trust badge");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <FormLayout
        title="Add Trust Badge"
        description="Add a new partner or certification badge"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Add Badge"
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
