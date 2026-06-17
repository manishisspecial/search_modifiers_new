import { LocationList } from "@/components/admin/location-list";

export default function CountryPagesPage() {
  return (
    <LocationList
      type="COUNTRY"
      basePath="/admin/locations"
      title="Country Pages"
      description="Manage country-level location pages (permalink: /country/slug e.g. /india/seo-company-india)"
      addLabel="New Country Page"
    />
  );
}
