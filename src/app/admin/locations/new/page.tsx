import { LocationEditor } from "@/components/admin/location-editor";

export default function NewCountryPage() {
  return <LocationEditor type="COUNTRY" basePath="/admin/locations" />;
}
