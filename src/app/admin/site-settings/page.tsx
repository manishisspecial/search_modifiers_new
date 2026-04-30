"use client";

import { useEffect, useState } from "react";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";

interface SiteSettings {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  phoneTel: string;
  whatsapp?: string;
  officeRegion: string;
  officeBadge: string;
  streetAddress: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  addressDetail: string;
  googleMapsEmbedSrc?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
}

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/site-settings");
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error("Failed to fetch settings", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error("Failed to save settings");

      const data = await response.json();
      setSettings(data);
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="glass rounded-2xl p-12 animate-pulse" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="p-6">
        <div className="glass rounded-2xl p-12 text-center text-muted">
          Failed to load settings
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <FormLayout
        title="Site Settings"
        description="Manage your global site configuration"
        onSubmit={handleSubmit}
        isLoading={isSaving}
        submitLabel="Save Settings"
      >
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-4">Brand</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Site Name" required>
                <FormInput
                  value={settings.name}
                  onChange={(e) =>
                    setSettings({ ...settings, name: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Tagline" required>
                <FormInput
                  value={settings.tagline}
                  onChange={(e) =>
                    setSettings({ ...settings, tagline: e.target.value })
                  }
                />
              </FormField>
            </div>
            <FormField label="Description" required>
              <FormTextarea
                value={settings.description}
                onChange={(e) =>
                  setSettings({ ...settings, description: e.target.value })
                }
                rows={3}
              />
            </FormField>
            <FormField label="Site URL" required>
              <FormInput
                value={settings.url}
                onChange={(e) =>
                  setSettings({ ...settings, url: e.target.value })
                }
              />
            </FormField>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Email" required>
                <FormInput
                  type="email"
                  value={settings.email}
                  onChange={(e) =>
                    setSettings({ ...settings, email: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Phone" required>
                <FormInput
                  value={settings.phone}
                  onChange={(e) =>
                    setSettings({ ...settings, phone: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Phone Tel" required>
                <FormInput
                  value={settings.phoneTel}
                  onChange={(e) =>
                    setSettings({ ...settings, phoneTel: e.target.value })
                  }
                />
              </FormField>
              <FormField label="WhatsApp" >
                <FormInput
                  value={settings.whatsapp || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, whatsapp: e.target.value })
                  }
                />
              </FormField>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-semibold text-foreground mb-4">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Street Address" required>
                <FormInput
                  value={settings.streetAddress}
                  onChange={(e) =>
                    setSettings({ ...settings, streetAddress: e.target.value })
                  }
                />
              </FormField>
              <FormField label="City" required>
                <FormInput
                  value={settings.city}
                  onChange={(e) =>
                    setSettings({ ...settings, city: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Region" required>
                <FormInput
                  value={settings.region}
                  onChange={(e) =>
                    setSettings({ ...settings, region: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Postal Code" required>
                <FormInput
                  value={settings.postalCode}
                  onChange={(e) =>
                    setSettings({ ...settings, postalCode: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Country" required>
                <FormInput
                  value={settings.country}
                  onChange={(e) =>
                    setSettings({ ...settings, country: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Office Region" required>
                <FormInput
                  value={settings.officeRegion}
                  onChange={(e) =>
                    setSettings({ ...settings, officeRegion: e.target.value })
                  }
                />
              </FormField>
            </div>
            <FormField label="Address Detail">
              <FormTextarea
                value={settings.addressDetail}
                onChange={(e) =>
                  setSettings({ ...settings, addressDetail: e.target.value })
                }
                rows={2}
              />
            </FormField>
            <FormField label="Office Badge">
              <FormInput
                value={settings.officeBadge}
                onChange={(e) =>
                  setSettings({ ...settings, officeBadge: e.target.value })
                }
              />
            </FormField>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-semibold text-foreground mb-4">Social Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="LinkedIn URL">
                <FormInput
                  value={settings.linkedinUrl || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, linkedinUrl: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Twitter URL">
                <FormInput
                  value={settings.twitterUrl || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, twitterUrl: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Instagram URL">
                <FormInput
                  value={settings.instagramUrl || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, instagramUrl: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Facebook URL">
                <FormInput
                  value={settings.facebookUrl || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, facebookUrl: e.target.value })
                  }
                />
              </FormField>
              <FormField label="YouTube URL">
                <FormInput
                  value={settings.youtubeUrl || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, youtubeUrl: e.target.value })
                  }
                />
              </FormField>
            </div>
          </div>
        </div>
      </FormLayout>
    </div>
  );
}
