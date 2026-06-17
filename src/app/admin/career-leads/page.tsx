"use client";

import { useEffect, useState } from "react";
import { Eye, Trash2, Mail, Phone, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CareerApplication {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  roleTitle: string;
  coverLetter: string | null;
  resumeUrl: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-blue-500/10 text-blue-500",
  REVIEWED: "bg-amber-500/10 text-amber-500",
  SHORTLISTED: "bg-emerald-500/10 text-emerald-500",
  REJECTED: "bg-red-500/10 text-red-500",
  HIRED: "bg-purple-500/10 text-purple-500",
};

const STATUS_OPTIONS = ["ALL", "NEW", "REVIEWED", "SHORTLISTED", "REJECTED", "HIRED"];

export default function CareerLeadsPage() {
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [selectedApp, setSelectedApp] = useState<CareerApplication | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    try {
      const url = filter === "ALL"
        ? "/api/admin/career-leads"
        : `/api/admin/career-leads?status=${filter}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed (${response.status})`);
      const data = await response.json();
      setApplications(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch applications", err);
      setError(err?.message || "Failed to fetch");
      setApplications([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/career-leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Update failed");
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
      if (selectedApp?.id === id) {
        setSelectedApp({ ...selectedApp, status });
      }
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this application permanently?")) return;
    try {
      const res = await fetch(`/api/admin/career-leads/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setApplications((prev) => prev.filter((a) => a.id !== id));
      if (selectedApp?.id === id) setSelectedApp(null);
    } catch (error) {
      console.error("Failed to delete", error);
      alert("Failed to delete application");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">
            Career Leads
          </h1>
          <p className="text-muted">Applications received from candidates</p>
        </div>
        <div className="text-sm text-muted">
          {applications.length} application{applications.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => { setFilter(s); setIsLoading(true); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
              filter === s
                ? "border-orange-500 bg-orange-500/10 text-orange-500"
                : "border-border text-muted hover:border-orange-500/40"
            }`}
          >
            {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 h-24 animate-pulse" />
          ))}
        </div>
      ) : applications.length > 0 ? (
        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="glass rounded-2xl p-5 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-semibold text-foreground">{app.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[app.status] || ""}`}>
                      {app.status}
                    </span>
                  </div>
                  <p className="text-sm text-orange-400/80 mt-1 font-medium">{app.roleTitle}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {app.email}
                    </span>
                    {app.phone && (
                      <span className="inline-flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {app.phone}
                      </span>
                    )}
                    <span>
                      {new Date(app.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    className="text-xs px-2 py-1.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
                  >
                    {STATUS_OPTIONS.filter((s) => s !== "ALL").map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0) + s.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="p-2 rounded-lg border border-border text-muted hover:text-orange-500 transition-colors"
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="p-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-12 border border-border text-center">
          <FileText className="w-12 h-12 text-muted mx-auto mb-4" />
          <p className="text-muted">No applications {filter !== "ALL" ? `with status "${filter.toLowerCase()}"` : "yet"}</p>
          <p className="text-xs text-muted mt-2">Applications submitted through the careers page will appear here.</p>
        </div>
      )}

      {/* Detail modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setSelectedApp(null)}>
          <div
            className="glass rounded-2xl border border-border p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-foreground">{selectedApp.name}</h2>
              <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[selectedApp.status] || ""}`}>
                {selectedApp.status}
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Role Applied</label>
                <p className="text-foreground mt-0.5">{selectedApp.roleTitle}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Email</label>
                <p className="text-foreground mt-0.5">
                  <a href={`mailto:${selectedApp.email}`} className="text-orange-400 hover:underline">{selectedApp.email}</a>
                </p>
              </div>
              {selectedApp.phone && (
                <div>
                  <label className="text-xs font-medium text-muted uppercase tracking-wider">Phone</label>
                  <p className="text-foreground mt-0.5">
                    <a href={`tel:${selectedApp.phone}`} className="text-orange-400 hover:underline">{selectedApp.phone}</a>
                  </p>
                </div>
              )}
              {selectedApp.coverLetter && (
                <div>
                  <label className="text-xs font-medium text-muted uppercase tracking-wider">Cover Letter / Message</label>
                  <p className="text-foreground mt-1 whitespace-pre-wrap bg-surface rounded-lg p-3 text-sm">{selectedApp.coverLetter}</p>
                </div>
              )}
              {selectedApp.resumeUrl && (
                <div>
                  <label className="text-xs font-medium text-muted uppercase tracking-wider">Resume</label>
                  <p className="mt-0.5">
                    <a href={selectedApp.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">
                      View Resume
                    </a>
                  </p>
                </div>
              )}
              <div>
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Applied On</label>
                <p className="text-foreground mt-0.5">
                  {new Date(selectedApp.createdAt).toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedApp(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
