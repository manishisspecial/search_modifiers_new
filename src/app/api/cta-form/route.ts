import { NextResponse } from "next/server";
import { ctaFormSchema } from "@/lib/schemas";
import { sendEmail, formatCtaEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ctaFormSchema.safeParse(body);
    
    if (!parsed.success) {
      const msg = parsed.error.issues.map((i) => i.message).join(" ");
      return NextResponse.json({ ok: false, error: msg }, { status: 400 });
    }

    const { name, email, phone, company, interest, source } = parsed.data;

    const emailHtml = formatCtaEmail({
      name,
      email,
      phone,
      company,
      interest,
      source,
    });

    const result = await sendEmail({
      subject: `New Lead: ${interest} - ${name}`,
      html: emailHtml,
      replyTo: email,
    });

    if (!result.success) {
      console.error("[cta-form] Email send failed");
      return NextResponse.json(
        { ok: false, error: "Failed to send. Please try again or email us directly." },
        { status: 500 }
      );
    }

    console.info("[cta-form] Lead captured:", { name, email, interest, source });

    return NextResponse.json({
      ok: true,
      message: "Thanks! We'll get back to you within one business day.",
    });
  } catch (error) {
    console.error("[cta-form] Error:", error);
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
