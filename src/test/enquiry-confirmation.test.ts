import { describe, expect, it } from "vitest";

import { enquiryReference } from "@/lib/enquiries.functions";

describe("Enquiry confirmation references", () => {
  it("creates a short uppercase contact enquiry reference from the saved id", () => {
    expect(enquiryReference("IE", "123e4567-e89b-42d3-a456-426614174000")).toBe("IE-123E4567");
  });

  it("creates a distinct manpower enquiry reference from the same saved id", () => {
    expect(enquiryReference("MP", "123e4567-e89b-42d3-a456-426614174000")).toBe("MP-123E4567");
  });
});
