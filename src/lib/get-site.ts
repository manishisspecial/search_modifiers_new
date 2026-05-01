import { cache } from "react";
import { getSiteSettings } from "@/lib/db-queries";
import { siteDefaults } from "@/lib/site-defaults";

export type SiteConfig = typeof siteDefaults;

export const getSite = cache(async (): Promise<SiteConfig> => {
  try {
    const db = await getSiteSettings();
    if (!db) return siteDefaults;

    return {
      name: db.name || siteDefaults.name,
      tagline: db.tagline || siteDefaults.tagline,
      description: db.description || siteDefaults.description,
      url: siteDefaults.url,
      email: db.email || siteDefaults.email,
      phone: db.phone || siteDefaults.phone,
      phoneTel: db.phoneTel || siteDefaults.phoneTel,
      whatsapp: db.whatsapp || siteDefaults.whatsapp,
      officeRegion: db.officeRegion || siteDefaults.officeRegion,
      officeBadge: db.officeBadge || siteDefaults.officeBadge,
      address: {
        street: db.streetAddress || siteDefaults.address.street,
        city: db.city || siteDefaults.address.city,
        region: db.region || siteDefaults.address.region,
        postalCode: db.postalCode || siteDefaults.address.postalCode,
        country: db.country || siteDefaults.address.country,
        detail: db.addressDetail || siteDefaults.address.detail,
      },
      googleMapsEmbedSrc: db.googleMapsEmbedSrc || siteDefaults.googleMapsEmbedSrc,
      social: {
        linkedin: db.linkedinUrl || siteDefaults.social.linkedin,
        twitter: db.twitterUrl || siteDefaults.social.twitter,
        instagram: db.instagramUrl || siteDefaults.social.instagram,
        facebook: db.facebookUrl || siteDefaults.social.facebook,
        youtube: db.youtubeUrl || siteDefaults.social.youtube,
      },
      trustBadges: siteDefaults.trustBadges,
      footerRatings: siteDefaults.footerRatings,
    };
  } catch {
    return siteDefaults;
  }
});
