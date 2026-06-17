"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Trash2, Save, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";
import { defaultHomeContent, type HomeContent } from "@/lib/home-content";

function SectionCard({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="glass rounded-2xl border border-border overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-6 py-4 text-left hover:bg-surface-hover transition-colors"
      >
        <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
        {open ? <ChevronDown className="w-5 h-5 text-muted shrink-0" /> : <ChevronRight className="w-5 h-5 text-muted shrink-0" />}
      </button>
      {open && <div className="px-6 pb-6 space-y-4 border-t border-border pt-4">{children}</div>}
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="text-xs text-orange-500 inline-flex items-center gap-1">
      <Plus className="w-3 h-3" /> {label}
    </button>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="px-3 rounded-lg border border-border text-muted hover:text-red-500 shrink-0">
      <Trash2 className="w-4 h-4" />
    </button>
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
        const merge = (key: keyof HomeContent) => ({
          ...defaultHomeContent[key],
          ...(d?.[key] ?? {}),
        });
        setData({
          hero: {
            ...defaultHomeContent.hero,
            ...(d?.hero ?? {}),
            stats: d?.hero?.stats?.length ? d.hero.stats : defaultHomeContent.hero.stats,
            bullets: d?.hero?.bullets?.length ? d.hero.bullets : defaultHomeContent.hero.bullets,
          },
          stickyCta: merge("stickyCta") as HomeContent["stickyCta"],
          logoWall: merge("logoWall") as HomeContent["logoWall"],
          conversionBar: {
            ...defaultHomeContent.conversionBar,
            ...(d?.conversionBar ?? {}),
            items: d?.conversionBar?.items?.length ? d.conversionBar.items : defaultHomeContent.conversionBar.items,
          },
          servicesStack: {
            ...defaultHomeContent.servicesStack,
            ...(d?.servicesStack ?? {}),
            items: d?.servicesStack?.items?.length ? d.servicesStack.items : defaultHomeContent.servicesStack.items,
          },
          approach: {
            ...defaultHomeContent.approach,
            ...(d?.approach ?? {}),
            steps: d?.approach?.steps?.length ? d.approach.steps : defaultHomeContent.approach.steps,
          },
          impactRibbon: {
            ...defaultHomeContent.impactRibbon,
            ...(d?.impactRibbon ?? {}),
            metrics: d?.impactRibbon?.metrics?.length ? d.impactRibbon.metrics : defaultHomeContent.impactRibbon.metrics,
          },
          why: {
            ...defaultHomeContent.why,
            ...(d?.why ?? {}),
            cards: d?.why?.cards?.length ? d.why.cards : defaultHomeContent.why.cards,
          },
          midCta: merge("midCta") as HomeContent["midCta"],
          caseStudiesHeading: merge("caseStudiesHeading") as HomeContent["caseStudiesHeading"],
          testimonialsHeading: merge("testimonialsHeading") as HomeContent["testimonialsHeading"],
          blogHeading: merge("blogHeading") as HomeContent["blogHeading"],
          portfolioHeading: merge("portfolioHeading") as HomeContent["portfolioHeading"],
          megaCta: {
            ...defaultHomeContent.megaCta,
            ...(d?.megaCta ?? {}),
            contactTiles: d?.megaCta?.contactTiles?.length ? d.megaCta.contactTiles : defaultHomeContent.megaCta.contactTiles,
          },
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

  const set = useCallback(
    <K extends keyof HomeContent>(section: K, patch: Partial<HomeContent[K]>) =>
      setData((d) => ({ ...d, [section]: { ...d[section], ...patch } })),
    [],
  );

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

  const { hero, stickyCta, logoWall, conversionBar, servicesStack, approach, impactRibbon, why, midCta, caseStudiesHeading, testimonialsHeading, blogHeading, portfolioHeading, megaCta } = data;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">Homepage Edits</h1>
          <p className="text-muted text-sm">Edit every section on the home page — headings, paragraphs, buttons, stats, cards, CTAs, and more.</p>
        </div>
        <Button onClick={save} variant="primary" disabled={isSaving} className="flex items-center gap-2 shrink-0">
          <Save className="w-4 h-4" />
          {isSaving ? "Saving…" : "Save changes"}
        </Button>
      </div>
      {saved && <p className="text-sm text-emerald-500">Saved. Changes are live on the homepage.</p>}

      {/* ── Hero ── */}
      <SectionCard title="Hero" defaultOpen>
        <FormField label="Badge text">
          <FormInput value={hero.badge} onChange={(e) => set("hero", { badge: e.target.value })} />
        </FormField>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Headline — prefix">
            <FormInput value={hero.titlePrefix} onChange={(e) => set("hero", { titlePrefix: e.target.value })} />
          </FormField>
          <FormField label="Headline — accent word">
            <FormInput value={hero.titleAccent} onChange={(e) => set("hero", { titleAccent: e.target.value })} />
          </FormField>
          <FormField label="Headline — suffix">
            <FormInput value={hero.titleSuffix} onChange={(e) => set("hero", { titleSuffix: e.target.value })} />
          </FormField>
        </div>
        <FormField label="Subtitle paragraph">
          <FormTextarea value={hero.subtitle} onChange={(e) => set("hero", { subtitle: e.target.value })} rows={3} />
        </FormField>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Feature bullets</label>
            <AddButton label="Add bullet" onClick={() => set("hero", { bullets: [...hero.bullets, ""] })} />
          </div>
          <div className="space-y-2">
            {hero.bullets.map((b, i) => (
              <div key={i} className="flex gap-2">
                <FormInput
                  value={b}
                  onChange={(e) => {
                    const next = [...hero.bullets];
                    next[i] = e.target.value;
                    set("hero", { bullets: next });
                  }}
                />
                <RemoveButton onClick={() => set("hero", { bullets: hero.bullets.filter((_, idx) => idx !== i) })} />
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Primary button label">
            <FormInput value={hero.primaryCtaLabel} onChange={(e) => set("hero", { primaryCtaLabel: e.target.value })} />
          </FormField>
          <FormField label="Primary button link">
            <FormInput value={hero.primaryCtaHref} onChange={(e) => set("hero", { primaryCtaHref: e.target.value })} />
          </FormField>
          <FormField label="Secondary button label">
            <FormInput value={hero.secondaryCtaLabel} onChange={(e) => set("hero", { secondaryCtaLabel: e.target.value })} />
          </FormField>
          <FormField label="Secondary button link">
            <FormInput value={hero.secondaryCtaHref} onChange={(e) => set("hero", { secondaryCtaHref: e.target.value })} />
          </FormField>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Stats (e.g. &quot;320+&quot;, &quot;4.9&quot;)</label>
            <AddButton label="Add stat" onClick={() => set("hero", { stats: [...hero.stats, { value: "", label: "" }] })} />
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
                    set("hero", { stats: next });
                  }}
                />
                <FormInput
                  value={s.label}
                  placeholder="Label"
                  onChange={(e) => {
                    const next = [...hero.stats];
                    next[i] = { ...next[i], label: e.target.value };
                    set("hero", { stats: next });
                  }}
                />
                <RemoveButton onClick={() => set("hero", { stats: hero.stats.filter((_, idx) => idx !== i) })} />
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* ── Sticky CTA ── */}
      <SectionCard title="Sticky CTA (Floating Banner)">
        <FormField label="Title">
          <FormInput value={stickyCta.title} onChange={(e) => set("stickyCta", { title: e.target.value })} />
        </FormField>
        <FormField label="Subtitle">
          <FormInput value={stickyCta.subtitle} onChange={(e) => set("stickyCta", { subtitle: e.target.value })} />
        </FormField>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Button label">
            <FormInput value={stickyCta.ctaLabel} onChange={(e) => set("stickyCta", { ctaLabel: e.target.value })} />
          </FormField>
          <FormField label="Button link">
            <FormInput value={stickyCta.ctaHref} onChange={(e) => set("stickyCta", { ctaHref: e.target.value })} />
          </FormField>
        </div>
      </SectionCard>

      {/* ── Logo Wall ── */}
      <SectionCard title="Logo Wall (Client Logos Marquee)">
        <FormField label="Label text above logos">
          <FormInput value={logoWall.label} onChange={(e) => set("logoWall", { label: e.target.value })} />
        </FormField>
        <p className="text-xs text-muted">Logo images are defined in the component code. This controls the label text only.</p>
      </SectionCard>

      {/* ── Conversion Bar ── */}
      <SectionCard title="Conversion Bar">
        <FormField label="Eyebrow">
          <FormInput value={conversionBar.eyebrow} onChange={(e) => set("conversionBar", { eyebrow: e.target.value })} />
        </FormField>
        <FormField label="Title">
          <FormInput value={conversionBar.title} onChange={(e) => set("conversionBar", { title: e.target.value })} />
        </FormField>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Bullet items</label>
            <AddButton label="Add item" onClick={() => set("conversionBar", { items: [...conversionBar.items, { text: "" }] })} />
          </div>
          <div className="space-y-2">
            {conversionBar.items.map((item, i) => (
              <div key={i} className="flex gap-2">
                <FormInput
                  value={item.text}
                  onChange={(e) => {
                    const next = [...conversionBar.items];
                    next[i] = { text: e.target.value };
                    set("conversionBar", { items: next });
                  }}
                />
                <RemoveButton onClick={() => set("conversionBar", { items: conversionBar.items.filter((_, idx) => idx !== i) })} />
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Primary button label">
            <FormInput value={conversionBar.primaryCtaLabel} onChange={(e) => set("conversionBar", { primaryCtaLabel: e.target.value })} />
          </FormField>
          <FormField label="Primary button link">
            <FormInput value={conversionBar.primaryCtaHref} onChange={(e) => set("conversionBar", { primaryCtaHref: e.target.value })} />
          </FormField>
          <FormField label="Secondary button label">
            <FormInput value={conversionBar.secondaryCtaLabel} onChange={(e) => set("conversionBar", { secondaryCtaLabel: e.target.value })} />
          </FormField>
          <FormField label="Secondary button link">
            <FormInput value={conversionBar.secondaryCtaHref} onChange={(e) => set("conversionBar", { secondaryCtaHref: e.target.value })} />
          </FormField>
        </div>
      </SectionCard>

      {/* ── Services Stack ── */}
      <SectionCard title="Capabilities (Services Stack)">
        <FormField label="Eyebrow">
          <FormInput value={servicesStack.eyebrow} onChange={(e) => set("servicesStack", { eyebrow: e.target.value })} />
        </FormField>
        <FormField label="Section title">
          <FormInput value={servicesStack.title} onChange={(e) => set("servicesStack", { title: e.target.value })} />
        </FormField>
        <FormField label="Section description">
          <FormTextarea value={servicesStack.description} onChange={(e) => set("servicesStack", { description: e.target.value })} rows={3} />
        </FormField>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Service cards</label>
            <AddButton
              label="Add service"
              onClick={() =>
                set("servicesStack", {
                  items: [
                    ...servicesStack.items,
                    { slug: "", index: String(servicesStack.items.length + 1).padStart(2, "0"), title: "", description: "", bullets: ["", "", "", ""] },
                  ],
                })
              }
            />
          </div>
          <div className="space-y-4">
            {servicesStack.items.map((item, i) => (
              <div key={i} className="rounded-xl border border-border p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-muted uppercase tracking-wider">Service {item.index}</span>
                  <RemoveButton onClick={() => set("servicesStack", { items: servicesStack.items.filter((_, idx) => idx !== i) })} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <FormField label="Index (01, 02…)">
                    <FormInput
                      value={item.index}
                      onChange={(e) => {
                        const next = [...servicesStack.items];
                        next[i] = { ...next[i], index: e.target.value };
                        set("servicesStack", { items: next });
                      }}
                    />
                  </FormField>
                  <FormField label="Slug (URL path)">
                    <FormInput
                      value={item.slug}
                      onChange={(e) => {
                        const next = [...servicesStack.items];
                        next[i] = { ...next[i], slug: e.target.value };
                        set("servicesStack", { items: next });
                      }}
                    />
                  </FormField>
                  <FormField label="Title">
                    <FormInput
                      value={item.title}
                      onChange={(e) => {
                        const next = [...servicesStack.items];
                        next[i] = { ...next[i], title: e.target.value };
                        set("servicesStack", { items: next });
                      }}
                    />
                  </FormField>
                </div>
                <FormField label="Description">
                  <FormTextarea
                    value={item.description}
                    rows={2}
                    onChange={(e) => {
                      const next = [...servicesStack.items];
                      next[i] = { ...next[i], description: e.target.value };
                      set("servicesStack", { items: next });
                    }}
                  />
                </FormField>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-muted">Bullets</label>
                    <AddButton
                      label="Add bullet"
                      onClick={() => {
                        const next = [...servicesStack.items];
                        next[i] = { ...next[i], bullets: [...next[i].bullets, ""] };
                        set("servicesStack", { items: next });
                      }}
                    />
                  </div>
                  <div className="space-y-1.5">
                    {item.bullets.map((b, bi) => (
                      <div key={bi} className="flex gap-2">
                        <FormInput
                          value={b}
                          placeholder={`Bullet ${bi + 1}`}
                          onChange={(e) => {
                            const next = [...servicesStack.items];
                            const bullets = [...next[i].bullets];
                            bullets[bi] = e.target.value;
                            next[i] = { ...next[i], bullets };
                            set("servicesStack", { items: next });
                          }}
                        />
                        <RemoveButton
                          onClick={() => {
                            const next = [...servicesStack.items];
                            next[i] = { ...next[i], bullets: next[i].bullets.filter((_, idx) => idx !== bi) };
                            set("servicesStack", { items: next });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* ── Approach ── */}
      <SectionCard title="Our Approach (Process Journey)">
        <FormField label="Eyebrow">
          <FormInput value={approach.eyebrow} onChange={(e) => set("approach", { eyebrow: e.target.value })} />
        </FormField>
        <FormField label="Section title">
          <FormInput value={approach.title} onChange={(e) => set("approach", { title: e.target.value })} />
        </FormField>
        <FormField label="Section description">
          <FormTextarea value={approach.description} onChange={(e) => set("approach", { description: e.target.value })} rows={3} />
        </FormField>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Steps</label>
            <AddButton
              label="Add step"
              onClick={() =>
                set("approach", {
                  steps: [
                    ...approach.steps,
                    { step: String(approach.steps.length + 1).padStart(2, "0"), title: "", description: "", deliverables: ["", "", "", ""] },
                  ],
                })
              }
            />
          </div>
          <div className="space-y-4">
            {approach.steps.map((step, i) => (
              <div key={i} className="rounded-xl border border-border p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-muted uppercase tracking-wider">Step {step.step}</span>
                  <RemoveButton onClick={() => set("approach", { steps: approach.steps.filter((_, idx) => idx !== i) })} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormField label="Step number">
                    <FormInput
                      value={step.step}
                      onChange={(e) => {
                        const next = [...approach.steps];
                        next[i] = { ...next[i], step: e.target.value };
                        set("approach", { steps: next });
                      }}
                    />
                  </FormField>
                  <FormField label="Title">
                    <FormInput
                      value={step.title}
                      onChange={(e) => {
                        const next = [...approach.steps];
                        next[i] = { ...next[i], title: e.target.value };
                        set("approach", { steps: next });
                      }}
                    />
                  </FormField>
                </div>
                <FormField label="Description">
                  <FormTextarea
                    value={step.description}
                    rows={2}
                    onChange={(e) => {
                      const next = [...approach.steps];
                      next[i] = { ...next[i], description: e.target.value };
                      set("approach", { steps: next });
                    }}
                  />
                </FormField>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-muted">Deliverables</label>
                    <AddButton
                      label="Add deliverable"
                      onClick={() => {
                        const next = [...approach.steps];
                        next[i] = { ...next[i], deliverables: [...next[i].deliverables, ""] };
                        set("approach", { steps: next });
                      }}
                    />
                  </div>
                  <div className="space-y-1.5">
                    {step.deliverables.map((d, di) => (
                      <div key={di} className="flex gap-2">
                        <FormInput
                          value={d}
                          placeholder={`Deliverable ${di + 1}`}
                          onChange={(e) => {
                            const next = [...approach.steps];
                            const deliverables = [...next[i].deliverables];
                            deliverables[di] = e.target.value;
                            next[i] = { ...next[i], deliverables };
                            set("approach", { steps: next });
                          }}
                        />
                        <RemoveButton
                          onClick={() => {
                            const next = [...approach.steps];
                            next[i] = { ...next[i], deliverables: next[i].deliverables.filter((_, idx) => idx !== di) };
                            set("approach", { steps: next });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* ── Impact Ribbon ── */}
      <SectionCard title="Impact at Scale (Metrics Ribbon)">
        <FormField label="Eyebrow">
          <FormInput value={impactRibbon.eyebrow} onChange={(e) => set("impactRibbon", { eyebrow: e.target.value })} />
        </FormField>
        <FormField label="Title">
          <FormInput value={impactRibbon.title} onChange={(e) => set("impactRibbon", { title: e.target.value })} />
        </FormField>
        <FormField label="Description">
          <FormTextarea value={impactRibbon.description} onChange={(e) => set("impactRibbon", { description: e.target.value })} rows={2} />
        </FormField>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Metrics</label>
            <AddButton
              label="Add metric"
              onClick={() => set("impactRibbon", { metrics: [...impactRibbon.metrics, { label: "", value: "", prefix: "", suffix: "", caption: "" }] })}
            />
          </div>
          <div className="space-y-3">
            {impactRibbon.metrics.map((m, i) => (
              <div key={i} className="rounded-xl border border-border p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-muted">Metric {i + 1}</span>
                  <RemoveButton onClick={() => set("impactRibbon", { metrics: impactRibbon.metrics.filter((_, idx) => idx !== i) })} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <FormField label="Display value">
                    <FormInput
                      value={m.value}
                      placeholder="₹180Cr+"
                      onChange={(e) => {
                        const next = [...impactRibbon.metrics];
                        next[i] = { ...next[i], value: e.target.value };
                        set("impactRibbon", { metrics: next });
                      }}
                    />
                  </FormField>
                  <FormField label="Prefix (₹, $)">
                    <FormInput
                      value={m.prefix}
                      placeholder="₹"
                      onChange={(e) => {
                        const next = [...impactRibbon.metrics];
                        next[i] = { ...next[i], prefix: e.target.value };
                        set("impactRibbon", { metrics: next });
                      }}
                    />
                  </FormField>
                  <FormField label="Suffix (Cr+, %)">
                    <FormInput
                      value={m.suffix}
                      placeholder="Cr+"
                      onChange={(e) => {
                        const next = [...impactRibbon.metrics];
                        next[i] = { ...next[i], suffix: e.target.value };
                        set("impactRibbon", { metrics: next });
                      }}
                    />
                  </FormField>
                  <FormField label="Label">
                    <FormInput
                      value={m.label}
                      placeholder="Organic revenue lifted"
                      onChange={(e) => {
                        const next = [...impactRibbon.metrics];
                        next[i] = { ...next[i], label: e.target.value };
                        set("impactRibbon", { metrics: next });
                      }}
                    />
                  </FormField>
                </div>
                <FormField label="Caption">
                  <FormInput
                    value={m.caption}
                    onChange={(e) => {
                      const next = [...impactRibbon.metrics];
                      next[i] = { ...next[i], caption: e.target.value };
                      set("impactRibbon", { metrics: next });
                    }}
                  />
                </FormField>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* ── Why Us ── */}
      <SectionCard title="&ldquo;Why Us&rdquo; Section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Eyebrow">
            <FormInput value={why.eyebrow} onChange={(e) => set("why", { eyebrow: e.target.value })} />
          </FormField>
          <FormField label="Title">
            <FormInput value={why.title} onChange={(e) => set("why", { title: e.target.value })} />
          </FormField>
        </div>
        <FormField label="Description">
          <FormTextarea value={why.description} onChange={(e) => set("why", { description: e.target.value })} rows={2} />
        </FormField>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Cards</label>
            <AddButton label="Add card" onClick={() => set("why", { cards: [...why.cards, { title: "", body: "" }] })} />
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
                      set("why", { cards: next });
                    }}
                  />
                  <RemoveButton onClick={() => set("why", { cards: why.cards.filter((_, idx) => idx !== i) })} />
                </div>
                <FormTextarea
                  value={card.body}
                  placeholder="Card body"
                  rows={2}
                  onChange={(e) => {
                    const next = [...why.cards];
                    next[i] = { ...next[i], body: e.target.value };
                    set("why", { cards: next });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* ── Mid CTA ── */}
      <SectionCard title="Mid-page CTA">
        <FormField label="Title">
          <FormInput value={midCta.title} onChange={(e) => set("midCta", { title: e.target.value })} />
        </FormField>
        <FormField label="Description">
          <FormTextarea value={midCta.description} onChange={(e) => set("midCta", { description: e.target.value })} rows={2} />
        </FormField>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Button label">
            <FormInput value={midCta.ctaLabel} onChange={(e) => set("midCta", { ctaLabel: e.target.value })} />
          </FormField>
          <FormField label="Button link">
            <FormInput value={midCta.ctaHref} onChange={(e) => set("midCta", { ctaHref: e.target.value })} />
          </FormField>
        </div>
      </SectionCard>

      {/* ── Case Studies Heading ── */}
      <SectionCard title="Case Studies Section (Headings)">
        <p className="text-xs text-muted mb-2">Controls the section headings and CTA button. Actual case study cards are managed via the Case Studies admin.</p>
        <FormField label="Eyebrow">
          <FormInput value={caseStudiesHeading.eyebrow} onChange={(e) => set("caseStudiesHeading", { eyebrow: e.target.value })} />
        </FormField>
        <FormField label="Title">
          <FormInput value={caseStudiesHeading.title} onChange={(e) => set("caseStudiesHeading", { title: e.target.value })} />
        </FormField>
        <FormField label="Description">
          <FormTextarea value={caseStudiesHeading.description} onChange={(e) => set("caseStudiesHeading", { description: e.target.value })} rows={2} />
        </FormField>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="CTA button label">
            <FormInput value={caseStudiesHeading.ctaLabel} onChange={(e) => set("caseStudiesHeading", { ctaLabel: e.target.value })} />
          </FormField>
          <FormField label="CTA button link">
            <FormInput value={caseStudiesHeading.ctaHref} onChange={(e) => set("caseStudiesHeading", { ctaHref: e.target.value })} />
          </FormField>
        </div>
      </SectionCard>

      {/* ── Testimonials Heading ── */}
      <SectionCard title="Testimonials Section (Headings)">
        <p className="text-xs text-muted mb-2">Controls the section headings. Actual testimonial cards are managed via the Testimonials admin.</p>
        <FormField label="Eyebrow">
          <FormInput value={testimonialsHeading.eyebrow} onChange={(e) => set("testimonialsHeading", { eyebrow: e.target.value })} />
        </FormField>
        <FormField label="Title">
          <FormInput value={testimonialsHeading.title} onChange={(e) => set("testimonialsHeading", { title: e.target.value })} />
        </FormField>
        <FormField label="Description">
          <FormTextarea value={testimonialsHeading.description} onChange={(e) => set("testimonialsHeading", { description: e.target.value })} rows={2} />
        </FormField>
      </SectionCard>

      {/* ── Blog Heading ── */}
      <SectionCard title="Blog Section (Headings)">
        <p className="text-xs text-muted mb-2">Controls the section headings and &quot;View all&quot; button. Actual blog posts are managed via the Blog admin.</p>
        <FormField label="Eyebrow">
          <FormInput value={blogHeading.eyebrow} onChange={(e) => set("blogHeading", { eyebrow: e.target.value })} />
        </FormField>
        <FormField label="Title">
          <FormInput value={blogHeading.title} onChange={(e) => set("blogHeading", { title: e.target.value })} />
        </FormField>
        <FormField label="Description">
          <FormTextarea value={blogHeading.description} onChange={(e) => set("blogHeading", { description: e.target.value })} rows={2} />
        </FormField>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="CTA button label">
            <FormInput value={blogHeading.ctaLabel} onChange={(e) => set("blogHeading", { ctaLabel: e.target.value })} />
          </FormField>
          <FormField label="CTA button link">
            <FormInput value={blogHeading.ctaHref} onChange={(e) => set("blogHeading", { ctaHref: e.target.value })} />
          </FormField>
        </div>
      </SectionCard>

      {/* ── Portfolio Section ── */}
      <SectionCard title="Portfolio Section (Headings)">
        <p className="text-xs text-muted mb-2">Controls the portfolio section headings and CTA on the homepage. Actual portfolio items are managed via the Portfolio admin.</p>
        <FormField label="Eyebrow">
          <FormInput value={portfolioHeading.eyebrow} onChange={(e) => set("portfolioHeading", { eyebrow: e.target.value })} />
        </FormField>
        <FormField label="Title">
          <FormInput value={portfolioHeading.title} onChange={(e) => set("portfolioHeading", { title: e.target.value })} />
        </FormField>
        <FormField label="Description">
          <FormTextarea value={portfolioHeading.description} onChange={(e) => set("portfolioHeading", { description: e.target.value })} rows={2} />
        </FormField>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="CTA button label">
            <FormInput value={portfolioHeading.ctaLabel} onChange={(e) => set("portfolioHeading", { ctaLabel: e.target.value })} />
          </FormField>
          <FormField label="CTA button link">
            <FormInput value={portfolioHeading.ctaHref} onChange={(e) => set("portfolioHeading", { ctaHref: e.target.value })} />
          </FormField>
        </div>
      </SectionCard>

      {/* ── Mega CTA ── */}
      <SectionCard title="Mega CTA (Footer Closer)">
        <FormField label="Headline — top line">
          <FormInput value={megaCta.headlineTop} onChange={(e) => set("megaCta", { headlineTop: e.target.value })} />
        </FormField>
        <FormField label="Headline — accent word (gradient)">
          <FormInput value={megaCta.headlineAccent} onChange={(e) => set("megaCta", { headlineAccent: e.target.value })} />
        </FormField>
        <FormField label="Subtitle">
          <FormTextarea value={megaCta.subtitle} onChange={(e) => set("megaCta", { subtitle: e.target.value })} rows={2} />
        </FormField>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Orb button label">
            <FormInput value={megaCta.orbLabel} onChange={(e) => set("megaCta", { orbLabel: e.target.value })} />
          </FormField>
          <FormField label="Orb button link">
            <FormInput value={megaCta.orbHref} onChange={(e) => set("megaCta", { orbHref: e.target.value })} />
          </FormField>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Contact tiles</label>
            <AddButton
              label="Add tile"
              onClick={() => set("megaCta", { contactTiles: [...megaCta.contactTiles, { label: "", value: "", href: "" }] })}
            />
          </div>
          <div className="space-y-3">
            {megaCta.contactTiles.map((tile, i) => (
              <div key={i} className="rounded-xl border border-border p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-muted">Tile {i + 1}</span>
                  <RemoveButton onClick={() => set("megaCta", { contactTiles: megaCta.contactTiles.filter((_, idx) => idx !== i) })} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <FormField label="Label">
                    <FormInput
                      value={tile.label}
                      onChange={(e) => {
                        const next = [...megaCta.contactTiles];
                        next[i] = { ...next[i], label: e.target.value };
                        set("megaCta", { contactTiles: next });
                      }}
                    />
                  </FormField>
                  <FormField label="Value text">
                    <FormInput
                      value={tile.value}
                      placeholder="Leave empty to use site email"
                      onChange={(e) => {
                        const next = [...megaCta.contactTiles];
                        next[i] = { ...next[i], value: e.target.value };
                        set("megaCta", { contactTiles: next });
                      }}
                    />
                  </FormField>
                  <FormField label="Link (optional)">
                    <FormInput
                      value={tile.href}
                      onChange={(e) => {
                        const next = [...megaCta.contactTiles];
                        next[i] = { ...next[i], href: e.target.value };
                        set("megaCta", { contactTiles: next });
                      }}
                    />
                  </FormField>
                </div>
              </div>
            ))}
          </div>
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
