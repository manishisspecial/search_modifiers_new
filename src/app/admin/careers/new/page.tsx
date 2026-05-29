"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";

export default function NewCareerRolePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    location: "",
    applyUrl: "",
    isOpen: true,
    order: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const msg = errorData?.error
          ? typeof errorData.error === "string" ? errorData.error : JSON.stringify(errorData.error)
          : `Failed to create career role (${response.status})`;
        throw new Error(msg);
      }

      const data = await response.json();
      router.push(`/admin/careers/${data.id}`);
    } catch (error: any) {
      console.error("Error:", error);
      alert(error?.message || "Failed to create career role");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <FormLayout
        title="Add Career Role"
        description="Add a new open position"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Add Role"
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
          <FormField label="Location">
            <FormInput
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="e.g. Delhi NCR / Remote"
            />
          </FormField>

          <FormField label="Apply URL">
            <FormInput
              value={formData.applyUrl}
              onChange={(e) =>
                setFormData({ ...formData, applyUrl: e.target.value })
              }
              placeholder="https://… (external form). Leave blank to use the contact page."
            />
          </FormField>
        </div>

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
