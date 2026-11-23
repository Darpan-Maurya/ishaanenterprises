import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const enquiryReference = (prefix: "IE" | "MP", id: string) =>
  `${prefix}-${id.replaceAll("-", "").slice(0, 8).toUpperCase()}`;

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  service: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Please write a message").max(2000),
});

export const manpowerSchema = z.object({
  company: z.string().trim().min(1, "Company name is required").max(150),
  contact_name: z.string().trim().min(1, "Contact name is required").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  email: z.string().trim().email("Enter a valid email").max(255),
  trades: z.string().trim().min(1, "Tell us which trades you need").max(500),
  workers_needed: z.coerce.number().int().min(1, "At least 1").max(5000),
  duration: z.string().trim().max(100).optional().or(z.literal("")),
  site_location: z.string().trim().min(1, "Site location is required").max(200),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => contactSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: submission, error } = await supabaseAdmin
      .from("contact_submissions")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        service: data.service || null,
        message: data.message,
      })
      .select("id")
      .single();
    if (error || !submission)
      throw new Error("Could not send your message. Please call us instead.");

    const reference = enquiryReference("IE", submission.id);
    let emailSent = false;
    try {
      const { sendContactEnquiryEmail } = await import("@/lib/email.server");
      const result = await sendContactEnquiryEmail({ reference, ...data });
      emailSent = result.sent;
    } catch (mailError) {
      console.error("[Email] Failed to send contact enquiry notification:", mailError);
    }

    return { ok: true, reference, emailSent };
  });

export const submitManpower = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => manpowerSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: submission, error } = await supabaseAdmin
      .from("manpower_enquiries")
      .insert({
        ...data,
        duration: data.duration || null,
        notes: data.notes || null,
      })
      .select("id")
      .single();
    if (error || !submission)
      throw new Error("Could not send your enquiry. Please call us instead.");

    const reference = enquiryReference("MP", submission.id);
    let emailSent = false;
    try {
      const { sendManpowerEnquiryEmail } = await import("@/lib/email.server");
      const result = await sendManpowerEnquiryEmail({ reference, ...data });
      emailSent = result.sent;
    } catch (mailError) {
      console.error("[Email] Failed to send manpower enquiry notification:", mailError);
    }

    return { ok: true, reference, emailSent };
  });
