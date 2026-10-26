import { describe, expect, it } from "vitest";
import { zonedIso } from "@lib/dates";

describe("zonedIso", () => {
  it("adds the New York offset for an autumn event", () => {
    expect(zonedIso("2025-10-21", "19:00", "America/New_York")).toBe(
      "2025-10-21T19:00:00-04:00",
    );
  });

  it("adds the Los Angeles offset for a spring event", () => {
    expect(zonedIso("2024-05-15", "09:00", "America/Los_Angeles")).toBe(
      "2024-05-15T09:00:00-07:00",
    );
  });

  it("handles UTC", () => {
    expect(zonedIso("2026-01-01", "00:00", "UTC")).toBe(
      "2026-01-01T00:00:00+00:00",
    );
  });
});
