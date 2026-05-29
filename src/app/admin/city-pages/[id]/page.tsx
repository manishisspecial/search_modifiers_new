"use client";

import { useParams } from "next/navigation";
import { LocationEditor } from "@/components/admin/location-editor";

export default function EditCityPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : undefined;
  if (!id) return null;
  return <LocationEditor type="CITY" basePath="/admin/city-pages" id={id} />;
}
