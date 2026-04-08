import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const msg = parsed.error.issues.map((i) => i.message).join(" ");
      return NextResponse.json({ ok: false, error: msg }, { status: 400 });
    }

    // Production: forward to CRM, email, or queue. Here we validate and acknowledge.
    console.info("[contact]", parsed.data);

    return NextResponse.json({ ok: true, message: "Thanks — we’ll reply within one business day." });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
