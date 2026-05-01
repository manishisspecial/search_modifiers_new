import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@searchmodifiers.com";
const TO_EMAIL = process.env.CONTACT_EMAIL || "hello@searchmodifiers.com";

interface EmailOptions {
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ subject, html, replyTo }: EmailOptions) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("[email] SMTP not configured, logging email instead:");
    console.info({ subject, html, replyTo });
    return { success: true, simulated: true };
  }

  try {
    await transporter.sendMail({
      from: `"Search Modifiers" <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      subject,
      html,
      replyTo,
    });
    return { success: true };
  } catch (error) {
    console.error("[email] Failed to send:", error);
    return { success: false, error };
  }
}

export function formatContactEmail(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Name:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
            <a href="mailto:${data.email}">${data.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
            <a href="tel:${data.phone}">${data.phone}</a>
          </td>
        </tr>
        ${data.company ? `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.company}</td>
        </tr>
        ` : ""}
      </table>
      <div style="margin-top: 20px;">
        <h3 style="color: #374151;">Message:</h3>
        <p style="background: #f9fafb; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${data.message}</p>
      </div>
      <p style="margin-top: 30px; color: #6b7280; font-size: 12px;">
        This email was sent from the Search Modifiers website contact form.
      </p>
    </div>
  `;
}

export function formatQuoteEmail(data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  details: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
        New Quote Request
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Name:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
            <a href="mailto:${data.email}">${data.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
            <a href="tel:${data.phone}">${data.phone}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.company}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Service:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.service}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Budget:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.budget}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Timeline:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.timeline}</td>
        </tr>
      </table>
      <div style="margin-top: 20px;">
        <h3 style="color: #374151;">Project Details:</h3>
        <p style="background: #f9fafb; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${data.details}</p>
      </div>
      <p style="margin-top: 30px; color: #6b7280; font-size: 12px;">
        This email was sent from the Search Modifiers website quote form.
      </p>
    </div>
  `;
}

export function formatAuditEmail(data: {
  name: string;
  email: string;
  phone: string;
  website: string;
  goals: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
        New Website Audit Request
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Name:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
            <a href="mailto:${data.email}">${data.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
            <a href="tel:${data.phone}">${data.phone}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Website:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
            <a href="${data.website}" target="_blank">${data.website}</a>
          </td>
        </tr>
      </table>
      <div style="margin-top: 20px;">
        <h3 style="color: #374151;">Goals:</h3>
        <p style="background: #f9fafb; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${data.goals}</p>
      </div>
      <p style="margin-top: 30px; color: #6b7280; font-size: 12px;">
        This email was sent from the Search Modifiers website audit request form.
      </p>
    </div>
  `;
}

export function formatCtaEmail(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  interest: string;
  source?: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
        New Lead from CTA
      </h2>
      ${data.source ? `<p style="color: #6b7280; margin-bottom: 20px;">Source: ${data.source}</p>` : ""}
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Name:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
            <a href="mailto:${data.email}">${data.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
            <a href="tel:${data.phone}">${data.phone}</a>
          </td>
        </tr>
        ${data.company ? `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.company}</td>
        </tr>
        ` : ""}
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Interest:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.interest}</td>
        </tr>
      </table>
      <p style="margin-top: 30px; color: #6b7280; font-size: 12px;">
        This lead was captured from a CTA form on the Search Modifiers website.
      </p>
    </div>
  `;
}
