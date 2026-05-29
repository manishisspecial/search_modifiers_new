"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";

export default function NewTeamMemberPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    image: "",
    linkedinUrl: "",
    order: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const msg = errorData?.error
          ? typeof errorData.error === "string" ? errorData.error : JSON.stringify(errorData.error)
          : `Failed to create team member (${response.status})`;
        throw new Error(msg);
      }

      const data = await response.json();
      router.push(`/admin/team/${data.id}`);
    } catch (error: any) {
      console.error("Error:", error);
      alert(error?.message || "Failed to create team member");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <FormLayout
        title="Add Team Member"
        description="Add a new team member"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Add Member"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Name" required>
            <FormInput
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Full name"
            />
          </FormField>

          <FormField label="Role" required>
            <FormInput
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              placeholder="e.g. Founder & CEO"
            />
          </FormField>
        </div>

        <FormField label="Bio" required>
          <FormTextarea
            value={formData.bio}
            onChange={(e) =>
              setFormData({ ...formData, bio: e.target.value })
            }
            placeholder="Short bio..."
            rows={3}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Image URL">
            <FormInput
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              placeholder="https://..."
            />
          </FormField>

          <FormField label="LinkedIn URL">
            <FormInput
              value={formData.linkedinUrl}
              onChange={(e) =>
                setFormData({ ...formData, linkedinUrl: e.target.value })
              }
              placeholder="https://linkedin.com/in/..."
            />
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
