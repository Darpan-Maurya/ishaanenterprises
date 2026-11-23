import { describe, expect, it } from "vitest";

import {
  buildContactEmail,
  buildManpowerEmail,
  escapeHtml,
  getSmtpConfig,
  normalizeAppPassword,
  sanitizeHeaderValue,
} from "@/lib/email.server";

describe("Email notification helpers", () => {
  it("strips whitespace from Google App Passwords", () => {
    expect(normalizeAppPassword("abcd efgh ijkl mnop")).toBe("abcdefghijklmnop");
  });

  it("returns null SMTP config when Gmail credentials are missing", () => {
    expect(getSmtpConfig({})).toBeNull();
    expect(getSmtpConfig({ GMAIL_USER: "ishaanenterprises05@gmail.com" })).toBeNull();
  });

  it("defaults ENQUIRY_TO_EMAIL to company email when omitted", () => {
    expect(
      getSmtpConfig({
        GMAIL_USER: "sender@gmail.com",
        GMAIL_APP_PASSWORD: "abcd efgh ijkl mnop",
      }),
    ).toEqual({
      user: "sender@gmail.com",
      pass: "abcdefghijklmnop",
      to: "ishaanenterprises05@gmail.com",
    });
  });

  it("prevents header injection in subject and replyTo", () => {
    expect(sanitizeHeaderValue("Test\r\nBcc: attacker@example.com")).toBe(
      "Test Bcc: attacker@example.com",
    );
  });

  it("escapes HTML characters in enquiry fields", () => {
    expect(escapeHtml(`<script>alert("xss")</script>`)).toBe(
      "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;",
    );
  });

  it("builds a complete contact enquiry email with reply-to and escaped HTML", () => {
    const email = buildContactEmail({
      reference: "IE-123E4567",
      name: "Ravi Kumar",
      email: "ravi@example.com",
      phone: "9876543210",
      company: "Acme Plants",
      service: "Boiler Hot / Cold Insulation",
      message: "Need quote for <b>boiler</b> insulation.",
    });

    expect(email.subject).toBe("[Enquiry IE-123E4567] Boiler Hot / Cold Insulation — Ravi Kumar");
    expect(email.replyTo).toBe("Ravi Kumar <ravi@example.com>");
    expect(email.text).toContain("IE-123E4567");
    expect(email.text).toContain("Acme Plants");
    expect(email.html).toContain("&lt;b&gt;boiler&lt;/b&gt;");
    expect(email.html).not.toContain("<b>boiler</b>");
  });

  it("builds a complete manpower enquiry email", () => {
    const email = buildManpowerEmail({
      reference: "MP-9999AAAA",
      company: "Steel Works Ltd",
      contact_name: "Amit Shah",
      phone: "9820012345",
      email: "amit@steelworks.in",
      trades: "10 welders, 4 fitters",
      workers_needed: 14,
      duration: "3 months",
      site_location: "Taloja MIDC",
      notes: "Urgent shutdown team",
    });

    expect(email.subject).toBe("[Manpower MP-9999AAAA] 14 workers (Taloja MIDC) — Steel Works Ltd");
    expect(email.replyTo).toBe("Amit Shah <amit@steelworks.in>");
    expect(email.text).toContain("10 welders, 4 fitters");
    expect(email.html).toContain("Taloja MIDC");
  });
});
