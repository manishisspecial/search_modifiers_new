"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Redirect {
  id: string;
  fromPath: string;
  toPath: string;
  type: number;
  isActive: boolean;
}

export default function RedirectsPage() {
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fromPath: "",
    toPath: "",
    type: 301,
    isActive: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchRedirects();
  }, []);

  const fetchRedirects = async () => {
    try {
      const res = await fetch("/api/admin/redirects");
      const data = await res.json();
      setRedirects(data);
    } catch (error) {
      console.error("Failed to fetch redirects", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to create redirect");
      const created = await res.json();
      setRedirects([created, ...redirects]);
      setFormData({ fromPath: "", toPath: "", type: 301, isActive: true });
      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Failed to create redirect");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (id: string, isActive: boolean) => {
    try {
      await fetch(`/api/admin/redirects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });
      setRedirects(
        redirects.map((r) =>
          r.id === id ? { ...r, isActive: !isActive } : r
        )
      );
    } catch (error) {
      console.error("Failed to toggle redirect", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this redirect?")) return;
    try {
      await fetch(`/api/admin/redirects/${id}`, { method: "DELETE" });
      setRedirects(redirects.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Failed to delete redirect", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">
            Redirect Manager
          </h1>
          <p className="text-muted">Manage URL redirects (301/302/307)</p>
        </div>
        <Button
          variant="primary"
          className="flex items-center gap-2"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="w-4 h-4" />
          Add Redirect
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="glass rounded-2xl p-6 border border-border mb-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                From Path
              </label>
              <input
                type="text"
                value={formData.fromPath}
                onChange={(e) =>
                  setFormData({ ...formData, fromPath: e.target.value })
                }
                placeholder="/old-page"
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                To Path
              </label>
              <input
                type="text"
                value={formData.toPath}
                onChange={(e) =>
                  setFormData({ ...formData, toPath: e.target.value })
                }
                placeholder="/new-page or https://..."
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: Number(e.target.value) })
                }
                className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
              >
                <option value={301}>301 - Permanent</option>
                <option value={302}>302 - Temporary</option>
                <option value={307}>307 - Temporary (Strict)</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Create Redirect"}
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 h-16 animate-pulse" />
          ))}
        </div>
      ) : redirects.length > 0 ? (
        <div className="space-y-3">
          {redirects.map((r) => (
            <div
              key={r.id}
              className={`glass rounded-2xl p-5 border transition-all ${
                r.isActive
                  ? "border-border"
                  : "border-border opacity-60"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div>
                    <span className="text-xs text-muted block">From</span>
                    <code className="text-sm text-foreground font-mono">
                      {r.fromPath}
                    </code>
                  </div>
                  <div>
                    <span className="text-xs text-muted block">To</span>
                    <code className="text-sm text-foreground font-mono">
                      {r.toPath}
                    </code>
                  </div>
                  <div>
                    <span className="text-xs text-muted block">Type</span>
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-surface text-foreground">
                      {r.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggle(r.id, r.isActive)}
                    className={`p-2 rounded-lg transition-colors ${
                      r.isActive
                        ? "text-emerald-500 hover:bg-emerald-500/10"
                        : "text-muted hover:bg-surface"
                    }`}
                    title={r.isActive ? "Deactivate" : "Activate"}
                  >
                    {r.isActive ? (
                      <ToggleRight className="w-5 h-5" />
                    ) : (
                      <ToggleLeft className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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
          <p className="text-muted mb-4">No redirects configured</p>
          <Button variant="primary" onClick={() => setShowForm(true)}>
            Add your first redirect
          </Button>
        </div>
      )}
    </div>
  );
}
