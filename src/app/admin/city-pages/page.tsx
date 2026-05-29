import { LocationList } from "@/components/admin/location-list";

export default function CityPagesPage() {
  return (
    <LocationList
      type="CITY"
      basePath="/admin/city-pages"
      title="City Pages"
      description="Manage city-level location pages (permalink: /location/slug)"
      addLabel="New City Page"
    />
  );
}
