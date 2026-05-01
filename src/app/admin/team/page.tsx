"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string | null;
  linkedinUrl: string | null;
  order: number;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch("/api/admin/team");
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error("Failed to fetch team members", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
      setMembers(members.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Failed to delete team member", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">
            Team Members
          </h1>
          <p className="text-muted">Manage your team</p>
        </div>
        <Link href="/admin/team/new">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Member
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 h-32 animate-pulse" />
          ))}
        </div>
      ) : members.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="glass rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="space-y-2 mb-4">
                <p className="font-semibold text-foreground">{member.name}</p>
                <p className="text-xs font-medium text-orange-400/80">{member.role}</p>
                <p className="text-sm text-muted line-clamp-2">{member.bio}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/team/${member.id}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </Link>
                <button
                  onClick={() => handleDelete(member.id)}
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
          <p className="text-muted mb-4">No team members yet</p>
          <Link href="/admin/team/new">
            <Button variant="primary">Add your first team member</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
