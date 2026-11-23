import nodemailer from "nodemailer";

import { company } from "@/lib/site";

export interface ContactEnquiryEmailInput {
  reference: string;
  name: string;
  email: string;
  phone?: string | null | undefined;
  company?: string | null | undefined;
  service?: string | null | undefined;
  message: string;
}

export interface ManpowerEnquiryEmailInput {
  reference: string;
  company: string;
  contact_name: string;
  phone: string;
  email: string;
  trades: string;
  workers_needed: number;
  duration?: string | null | undefined;
  site_location: string;
  notes?: string | null | undefined;
}

export interface SmtpConfig {
  user: string;
  pass: string;
  to: string;
}

export interface EmailMessage {
  subject: string;
  replyTo: string;
  text: string;
  html: string;
}

export function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function normalizeAppPassword(password: string): string {
  return password.replace(/\s+/g, "");
}

export function getSmtpConfig(
  env: Record<string, string | undefined> = process.env,
): SmtpConfig | null {
  const user = env["GMAIL_USER"]?.trim();
  const rawPass = env["GMAIL_APP_PASSWORD"]?.trim();
  if (!user || !rawPass) return null;

  const pass = normalizeAppPassword(rawPass);
  if (!pass) return null;

  const to = env["ENQUIRY_TO_EMAIL"]?.trim() || company.email;
  return { user, pass, to };
}

function formatFieldRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #e5ded4;font-weight:600;color:#6B1E2E;width:160px;vertical-align:top;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:8px 12px;border-bottom:1px solid #e5ded4;color:#2c2420;white-space:pre-wrap;">
        ${escapeHtml(value)}
      </td>
    </tr>`;
}

function wrapEmailHtml(title: string, reference: string, rows: Array<[string, string]>): string {
  const tableRows = rows.map(([label, value]) => formatFieldRow(label, value)).join("");
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#2c2420;">
      <div style="background:#6B1E2E;color:#FAF7F2;padding:20px 24px;">
        <p style="margin:0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#e0b48a;">
          ISHAAN Enterprises — Website Enquiry
        </p>
        <h2 style="margin:8px 0 0;font-size:20px;">${escapeHtml(title)}</h2>
        <p style="margin:6px 0 0;font-size:13px;opacity:0.9;">Reference: <strong>${escapeHtml(reference)}</strong></p>
      </div>
      <div style="background:#FAF7F2;padding:20px 24px;border:1px solid #e5ded4;border-top:none;">
        <table style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #e5ded4;">
          <tbody>${tableRows}</tbody>
        </table>
        <p style="margin:16px 0 0;font-size:12px;color:#5C4B43;">
          Reply directly to this email to respond to the customer. This enquiry has also been saved in your Supabase database.
        </p>
      </div>
    </div>`;
}

export function buildContactEmail(input: ContactEnquiryEmailInput): EmailMessage {
  const serviceLabel = input.service?.trim() || "General Enquiry";
  const rows: Array<[string, string]> = [
    ["Reference", input.reference],
    ["Name", input.name],
    ["Email", input.email],
    ["Phone", input.phone?.trim() || "Not provided"],
    ["Company", input.company?.trim() || "Not provided"],
    ["Service", serviceLabel],
    ["Project details", input.message],
  ];

  const subject = sanitizeHeaderValue(
    `[Enquiry ${input.reference}] ${serviceLabel} — ${input.name}`,
  );
  const replyTo = sanitizeHeaderValue(`${input.name} <${input.email}>`);
  const text = [
    `New Contact Enquiry — ISHAAN Enterprises`,
    `========================================`,
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");
  const html = wrapEmailHtml("New Contact Enquiry", input.reference, rows);

  return { subject, replyTo, text, html };
}

export function buildManpowerEmail(input: ManpowerEnquiryEmailInput): EmailMessage {
  const rows: Array<[string, string]> = [
    ["Reference", input.reference],
    ["Company", input.company],
    ["Contact person", input.contact_name],
    ["Phone", input.phone],
    ["Email", input.email],
    ["Trades needed", input.trades],
    ["Total workers", String(input.workers_needed)],
    ["Duration", input.duration?.trim() || "Not specified"],
    ["Site location", input.site_location],
    ["Additional notes", input.notes?.trim() || "None"],
  ];

  const subject = sanitizeHeaderValue(
    `[Manpower ${input.reference}] ${input.workers_needed} workers (${input.site_location}) — ${input.company}`,
  );
  const replyTo = sanitizeHeaderValue(`${input.contact_name} <${input.email}>`);
  const text = [
    `New Manpower Enquiry — ISHAAN Enterprises`,
    `=========================================`,
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");
  const html = wrapEmailHtml("New Manpower Requirement", input.reference, rows);

  return { subject, replyTo, text, html };
}

async function sendGmailMessage(
  message: EmailMessage,
): Promise<{ sent: boolean; reason?: string }> {
  const config = getSmtpConfig();
  if (!config) {
    const reason =
      "Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variable; skipped email notification.";
    console.error(`[Email] ${reason}`);
    return { sent: false, reason };
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${company.name} Website" <${config.user}>`,
      to: config.to,
      replyTo: message.replyTo,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });
    return { sent: true };
  } finally {
    transporter.close();
  }
}

export async function sendContactEnquiryEmail(
  input: ContactEnquiryEmailInput,
): Promise<{ sent: boolean; reason?: string }> {
  return sendGmailMessage(buildContactEmail(input));
}

export async function sendManpowerEnquiryEmail(
  input: ManpowerEnquiryEmailInput,
): Promise<{ sent: boolean; reason?: string }> {
  return sendGmailMessage(buildManpowerEmail(input));
}
