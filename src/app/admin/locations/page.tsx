import { LocationList } from "@/components/admin/location-list";

export default function CountryPagesPage() {
  return (
    <LocationList
      type="COUNTRY"
      basePath="/admin/locations"
      title="Country Pages"
      description="Manage country-level location pages (permalink: /location/slug)"
      addLabel="New Country Page"
    />
  );
}
