import { z } from "zod";

const phoneRegex = /^[\d\s+().-]{10,20}$/;

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(phoneRegex, "Enter a valid phone number"),
  company: z.string().optional(),
  message: z.string().min(10, "Please share a bit more detail (min 10 characters)"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const auditSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(phoneRegex, "Enter a valid phone number"),
  website: z.string().url("Enter a valid URL including https://"),
  goals: z.string().min(20, "Tell us your goals (min 20 characters)"),
});

export type AuditInput = z.infer<typeof auditSchema>;

export const quoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(phoneRegex, "Enter a valid phone number"),
  company: z.string().min(2, "Company name is required"),
  service: z.string().min(1, "Select a service"),
  budget: z.string().min(1, "Select a budget range"),
  timeline: z.string().min(1, "Select a timeline"),
  details: z.string().min(20, "Please describe your project (min 20 characters)"),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
