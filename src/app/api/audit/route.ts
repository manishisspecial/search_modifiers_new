import { NextResponse } from "next/server";
import { auditSchema } from "@/lib/schemas";
import { sendEmail, formatAuditEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = auditSchema.safeParse(body);
    if (!parsed.success) {
      const msg = parsed.error.issues.map((i) => i.message).join(" ");
      return NextResponse.json({ ok: false, error: msg }, { status: 400 });
    }

    const { name, email, phone, website, goals } = parsed.data;

    const emailHtml = formatAuditEmail({ name, email, phone, website, goals });

    const result = await sendEmail({
      subject: `Website Audit Request: ${website} - ${name}`,
      html: emailHtml,
      replyTo: email,
    });

    if (!result.success) {
      console.error("[audit] Email send failed");
      return NextResponse.json(
        { ok: false, error: "Failed to send. Please try again or email us directly." },
        { status: 500 }
      );
    }

    console.info("[audit]", parsed.data);

    return NextResponse.json({
      ok: true,
      message: "Audit request received. Our team will email your prioritized findings within 2 business days.",
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
