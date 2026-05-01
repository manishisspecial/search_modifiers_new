"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";

export default function EditTeamMemberPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    image: "",
    linkedinUrl: "",
    order: 0,
  });

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(`/api/admin/team/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch team member");
        const data = await response.json();
        setFormData({
          name: data.name || "",
          role: data.role || "",
          bio: data.bio || "",
          image: data.image || "",
          linkedinUrl: data.linkedinUrl || "",
          order: data.order || 0,
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to load team member");
        router.push("/admin/team");
      } finally {
        setIsFetching(false);
      }
    };

    if (params.id) {
      fetchMember();
    }
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/team/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update team member");

      alert("Team member updated successfully");
      router.push("/admin/team");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update team member");
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
        title="Edit Team Member"
        description="Update team member details"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Update Member"
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
