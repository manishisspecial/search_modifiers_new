"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CareerRole {
  id: string;
  title: string;
  type: string;
  description: string;
  isOpen: boolean;
  order: number;
}

export default function CareersAdminPage() {
  const [roles, setRoles] = useState<CareerRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch("/api/admin/careers");
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error("Failed to fetch career roles", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      await fetch(`/api/admin/careers/${id}`, { method: "DELETE" });
      setRoles(roles.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Failed to delete career role", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">
            Career Roles
          </h1>
          <p className="text-muted">Manage open positions</p>
        </div>
        <Link href="/admin/careers/new">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Role
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 h-32 animate-pulse" />
          ))}
        </div>
      ) : roles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className="glass rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-foreground">{role.title}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      role.isOpen
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {role.isOpen ? "Open" : "Closed"}
                  </span>
                </div>
                <p className="text-xs font-medium text-orange-400/80">{role.type}</p>
                <p className="text-sm text-muted line-clamp-2">{role.description}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/careers/${role.id}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </Link>
                <button
                  onClick={() => handleDelete(role.id)}
                  className="px-4 py-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-12 border border-border text-center">
          <p className="text-muted mb-4">No career roles yet</p>
          <Link href="/admin/careers/new">
            <Button variant="primary">Add your first role</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
