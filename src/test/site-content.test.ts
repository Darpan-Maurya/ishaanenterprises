import { describe, expect, it } from "vitest";

import { clients, company, stats } from "@/lib/site";

describe("Approved company content", () => {
  it("uses the full Rutu Estate address", () => {
    expect(company.address).toBe("A1 703, Rutu Estate, Patlipada, Thane West, Maharashtra 400607");
  });

  it("shows 40+ years on site", () => {
    expect(stats.find((stat) => stat.label === "Years on site")?.value).toBe("40+");
  });

  it("lists only the four approved clients with verified legal names", () => {
    expect(clients).toEqual([
      "Archroma International (India) Private Limited",
      "Tap Turbo Engineers Private Limited",
      "Kilburn Engineering Limited",
      "Gramercy Trade Industries Private Limited",
    ]);
  });
});
