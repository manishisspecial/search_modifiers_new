"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";
import { defaultHomeContent, type HomeContent } from "@/lib/home-content";

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl border border-border p-6 space-y-4">
      <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  );
}

export default function HomepageEditsPage() {
  const [data, setData] = useState<HomeContent>(defaultHomeContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/homepage")
      .then((r) => r.json())
      .then((d) => {
        setData({
          hero: { ...defaultHomeContent.hero, ...(d?.hero ?? {}) },
          why: { ...defaultHomeContent.why, ...(d?.why ?? {}), cards: d?.why?.cards?.length ? d.why.cards : defaultHomeContent.why.cards },
          midCta: { ...defaultHomeContent.midCta, ...(d?.midCta ?? {}) },
        });
      })
      .catch(() => setData(defaultHomeContent))
      .finally(() => setIsLoading(false));
  }, []);

  const save = async () => {
    setIsSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
    } catch {
      alert("Failed to save homepage content");
    } finally {
      setIsSaving(false);
    }
  };

  const setHero = (patch: Partial<HomeContent["hero"]>) =>
    setData((d) => ({ ...d, hero: { ...d.hero, ...patch } }));
  const setWhy = (patch: Partial<HomeContent["why"]>) =>
    setData((d) => ({ ...d, why: { ...d.why, ...patch } }));
  const setMid = (patch: Partial<HomeContent["midCta"]>) =>
    setData((d) => ({ ...d, midCta: { ...d.midCta, ...patch } }));

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface rounded w-1/3" />
          <div className="glass rounded-2xl p-6 h-64" />
        </div>
      </div>
    );
  }

  const { hero, why, midCta } = data;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">Homepage Edits</h1>
          <p className="text-muted text-sm">Edit the headings, paragraphs, buttons, stats, and cards on the home page.</p>
        </div>
        <Button onClick={save} variant="primary" disabled={isSaving} className="flex items-center gap-2 shrink-0">
          <Save className="w-4 h-4" />
          {isSaving ? "Saving…" : "Save changes"}
        </Button>
      </div>
      {saved && <p className="text-sm text-emerald-500">Saved. Changes are live on the homepage.</p>}

      <SectionCard title="Hero">
        <FormField label="Badge text">
          <FormInput value={hero.badge} onChange={(e) => setHero({ badge: e.target.value })} />
        </FormField>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Headline — prefix">
            <FormInput value={hero.titlePrefix} onChange={(e) => setHero({ titlePrefix: e.target.value })} />
          </FormField>
          <FormField label="Headline — accent word">
            <FormInput value={hero.titleAccent} onChange={(e) => setHero({ titleAccent: e.target.value })} />
          </FormField>
          <FormField label="Headline — suffix">
            <FormInput value={hero.titleSuffix} onChange={(e) => setHero({ titleSuffix: e.target.value })} />
          </FormField>
        </div>
        <FormField label="Subtitle paragraph">
          <FormTextarea value={hero.subtitle} onChange={(e) => setHero({ subtitle: e.target.value })} rows={3} />
        </FormField>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Feature bullets</label>
            <button
              type="button"
              onClick={() => setHero({ bullets: [...hero.bullets, ""] })}
              className="text-xs text-orange-500 inline-flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add bullet
            </button>
          </div>
          <div className="space-y-2">
            {hero.bullets.map((b, i) => (
              <div key={i} className="flex gap-2">
                <FormInput
                  value={b}
                  onChange={(e) => {
                    const next = [...hero.bullets];
                    next[i] = e.target.value;
                    setHero({ bullets: next });
                  }}
                />
                <button
                  type="button"
                  onClick={() => setHero({ bullets: hero.bullets.filter((_, idx) => idx !== i) })}
                  className="px-3 rounded-lg border border-border text-muted hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Primary button label">
            <FormInput value={hero.primaryCtaLabel} onChange={(e) => setHero({ primaryCtaLabel: e.target.value })} />
          </FormField>
          <FormField label="Primary button link">
            <FormInput value={hero.primaryCtaHref} onChange={(e) => setHero({ primaryCtaHref: e.target.value })} />
          </FormField>
          <FormField label="Secondary button label">
            <FormInput value={hero.secondaryCtaLabel} onChange={(e) => setHero({ secondaryCtaLabel: e.target.value })} />
          </FormField>
          <FormField label="Secondary button link">
            <FormInput value={hero.secondaryCtaHref} onChange={(e) => setHero({ secondaryCtaHref: e.target.value })} />
          </FormField>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Stats (e.g. &quot;320+&quot;, &quot;4.9&quot;)</label>
            <button
              type="button"
              onClick={() => setHero({ stats: [...hero.stats, { value: "", label: "" }] })}
              className="text-xs text-orange-500 inline-flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add stat
            </button>
          </div>
          <div className="space-y-2">
            {hero.stats.map((s, i) => (
              <div key={i} className="flex gap-2">
                <FormInput
                  value={s.value}
                  placeholder="Value"
                  onChange={(e) => {
                    const next = [...hero.stats];
                    next[i] = { ...next[i], value: e.target.value };
                    setHero({ stats: next });
                  }}
                />
                <FormInput
                  value={s.label}
                  placeholder="Label"
                  onChange={(e) => {
                    const next = [...hero.stats];
                    next[i] = { ...next[i], label: e.target.value };
                    setHero({ stats: next });
                  }}
                />
                <button
                  type="button"
                  onClick={() => setHero({ stats: hero.stats.filter((_, idx) => idx !== i) })}
                  className="px-3 rounded-lg border border-border text-muted hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="“Why us” section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Eyebrow">
            <FormInput value={why.eyebrow} onChange={(e) => setWhy({ eyebrow: e.target.value })} />
          </FormField>
          <FormField label="Title">
            <FormInput value={why.title} onChange={(e) => setWhy({ title: e.target.value })} />
          </FormField>
        </div>
        <FormField label="Description">
          <FormTextarea value={why.description} onChange={(e) => setWhy({ description: e.target.value })} rows={2} />
        </FormField>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Cards</label>
            <button
              type="button"
              onClick={() => setWhy({ cards: [...why.cards, { title: "", body: "" }] })}
              className="text-xs text-orange-500 inline-flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add card
            </button>
          </div>
          <div className="space-y-3">
            {why.cards.map((card, i) => (
              <div key={i} className="rounded-xl border border-border p-3 space-y-2">
                <div className="flex gap-2">
                  <FormInput
                    value={card.title}
                    placeholder="Card title"
                    onChange={(e) => {
                      const next = [...why.cards];
                      next[i] = { ...next[i], title: e.target.value };
                      setWhy({ cards: next });
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setWhy({ cards: why.cards.filter((_, idx) => idx !== i) })}
                    className="px-3 rounded-lg border border-border text-muted hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <FormTextarea
                  value={card.body}
                  placeholder="Card body"
                  rows={2}
                  onChange={(e) => {
                    const next = [...why.cards];
                    next[i] = { ...next[i], body: e.target.value };
                    setWhy({ cards: next });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Mid-page CTA">
        <FormField label="Title">
          <FormInput value={midCta.title} onChange={(e) => setMid({ title: e.target.value })} />
        </FormField>
        <FormField label="Description">
          <FormTextarea value={midCta.description} onChange={(e) => setMid({ description: e.target.value })} rows={2} />
        </FormField>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Button label">
            <FormInput value={midCta.ctaLabel} onChange={(e) => setMid({ ctaLabel: e.target.value })} />
          </FormField>
          <FormField label="Button link">
            <FormInput value={midCta.ctaHref} onChange={(e) => setMid({ ctaHref: e.target.value })} />
          </FormField>
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <Button onClick={save} variant="primary" disabled={isSaving} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          {isSaving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
