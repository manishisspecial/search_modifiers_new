"use client";

import { useParams } from "next/navigation";
import { FaqEditor } from "@/components/admin/faq-editor";

export default function EditFaqPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : undefined;
  if (!id) return null;
  return <FaqEditor id={id} />;
}
