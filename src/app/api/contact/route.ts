import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { sendEmail, formatContactEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const msg = parsed.error.issues.map((i) => i.message).join(" ");
      return NextResponse.json({ ok: false, error: msg }, { status: 400 });
    }

    const { name, email, phone, company, message } = parsed.data;

    const emailHtml = formatContactEmail({ name, email, phone, company, message });

    const result = await sendEmail({
      subject: `Contact Form: ${name}`,
      html: emailHtml,
      replyTo: email,
    });

    if (!result.success) {
      console.error("[contact] Email send failed");
      return NextResponse.json(
        { ok: false, error: "Failed to send. Please try again or email us directly." },
        { status: 500 }
      );
    }

    console.info("[contact]", parsed.data);

    return NextResponse.json({ ok: true, message: "Thanks — we'll reply within one business day." });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
