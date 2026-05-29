"use client";

import { useParams } from "next/navigation";
import { LocationEditor } from "@/components/admin/location-editor";

export default function EditCountryPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : undefined;
  if (!id) return null;
  return <LocationEditor type="COUNTRY" basePath="/admin/locations" id={id} />;
}
