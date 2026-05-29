"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, FormInput } from "@/components/admin/form-layout";

interface ManagedLocation {
  id: string;
  name: string;
  type: "COUNTRY" | "CITY";
  slug: string;
  country: string | null;
}

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ManagedLocationsPage() {
  const [items, setItems] = useState<ManagedLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editing, setEditing] = useState<ManagedLocation | null>(null);
  const [form, setForm] = useState({ name: "", type: "CITY" as "COUNTRY" | "CITY", slug: "", country: "" });
  const [slugTouched, setSlugTouched] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/managed-locations");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch managed locations", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const resetForm = () => {
    setEditing(null);
    setForm({ name: "", type: "CITY", slug: "", country: "" });
    setSlugTouched(false);
  };

  const handleEdit = (item: ManagedLocation) => {
    setEditing(item);
    setForm({ name: item.name, type: item.type, slug: item.slug, country: item.country || "" });
    setSlugTouched(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const url = editing ? `/api/admin/managed-locations/${editing.id}` : "/api/admin/managed-locations";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.[0]?.message || err.error || "Save failed");
      }
      await fetchItems();
      resetForm();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this location from the directory?")) return;
    try {
      await fetch(`/api/admin/managed-locations/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-foreground">Manage Locations</h1>
        <p className="text-muted text-sm mt-1">
          An admin-only directory of countries & cities. These are <strong>not</strong> shown on the site —
          they populate the dropdowns used by Country Pages & City Pages.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass rounded-2xl border border-border p-6 space-y-4">
        <h3 className="font-semibold text-foreground">{editing ? "Edit location" : "Add location"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField label="Name" required>
            <FormInput
              value={form.name}
              onChange={(e) => {
                const name = e.target.value;
                setForm((f) => ({ ...f, name, slug: slugTouched ? f.slug : generateSlug(name) }));
              }}
              placeholder="e.g. Delhi"
              required
            />
          </FormField>
          <FormField label="Type" required>
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as "COUNTRY" | "CITY" }))}
              className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
            >
              <option value="CITY">City</option>
              <option value="COUNTRY">Country</option>
            </select>
          </FormField>
          <FormField label="Slug" required>
            <FormInput
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                setForm((f) => ({ ...f, slug: e.target.value }));
              }}
              placeholder="e.g. delhi"
              required
            />
          </FormField>
          <FormField label="Country (for cities)">
            <FormInput
              value={form.country}
              onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
              placeholder="e.g. India"
            />
          </FormField>
        </div>
        <div className="flex gap-3">
          <Button type="submit" variant="primary" disabled={isSaving} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            {isSaving ? "Saving…" : editing ? "Update" : "Add"}
          </Button>
          {editing && (
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass rounded-xl h-14 animate-pulse" />
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="glass rounded-2xl border border-border divide-y divide-border/60">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3 min-w-0">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm">
                    {item.name}
                    <span className="ml-2 px-1.5 py-0.5 text-[10px] rounded bg-surface text-muted border border-border">
                      {item.type}
                    </span>
                  </p>
                  <p className="text-xs text-muted font-mono">
                    {item.slug}
                    {item.country ? ` · ${item.country}` : ""}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-lg text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl border border-border p-12 text-center">
          <p className="text-muted">No locations in the directory yet.</p>
        </div>
      )}
    </div>
  );
}
