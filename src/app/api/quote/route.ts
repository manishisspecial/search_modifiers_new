import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/schemas";
import { sendEmail, formatQuoteEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = quoteSchema.safeParse(body);
    if (!parsed.success) {
      const msg = parsed.error.issues.map((i) => i.message).join(" ");
      return NextResponse.json({ ok: false, error: msg }, { status: 400 });
    }

    const { name, email, phone, company, service, budget, timeline, details } = parsed.data;

    const emailHtml = formatQuoteEmail({
      name,
      email,
      phone,
      company,
      service,
      budget,
      timeline,
      details,
    });

    const result = await sendEmail({
      subject: `Quote Request: ${service} - ${name}`,
      html: emailHtml,
      replyTo: email,
    });

    if (!result.success) {
      console.error("[quote] Email send failed");
      return NextResponse.json(
        { ok: false, error: "Failed to send. Please try again or email us directly." },
        { status: 500 }
      );
    }

    console.info("[quote]", parsed.data);

    return NextResponse.json({
      ok: true,
      message: "Quote request received. A strategist will reach out within 24 hours.",
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
