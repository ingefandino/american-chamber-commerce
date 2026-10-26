import { describe, expect, it } from "vitest";
import { slugify } from "@lib/slug";

describe("slugify", () => {
  it("lowercases and replaces spaces with hyphens", () => {
    expect(slugify("Nivel Gold")).toBe("nivel-gold");
  });

  it("removes diacritics", () => {
    expect(slugify("Membresía Anual")).toBe("membresia-anual");
    expect(slugify("Sao Paulo — São Paulo")).toBe("sao-paulo-sao-paulo");
  });

  it("strips punctuation and collapses separators", () => {
    expect(slugify("  USA & Trade: 2026!  ")).toBe("usa-trade-2026");
  });

  it("returns an empty string for content without alphanumerics", () => {
    expect(slugify("— !!! —")).toBe("");
  });

  it("is stable for already normalized values", () => {
    expect(slugify("annual-gala")).toBe("annual-gala");
  });
});
