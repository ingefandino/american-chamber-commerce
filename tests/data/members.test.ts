import { describe, expect, it } from "vitest";
import {
  getMemberBySlug,
  getPublicMembers,
  isPublicMember,
  MEMBERS,
  PUBLIC_MEMBER_FIELDS,
  type PublicMember,
} from "@data/members";

const base: PublicMember = {
  id: "member-example",
  slug: "example-company",
  name: "Example Company",
  description: { en: "An example member.", es: "Un socio de ejemplo." },
  sector: { en: "Technology", es: "Tecnología" },
  category: { en: "Small business", es: "Pequeña empresa" },
  location: { city: "New York", region: "NY", country: "USA" },
  website: "https://example.com",
  lastReviewedAt: "2026-10-26",
  status: "active",
  authorized: true,
  translations: ["en", "es"],
};

describe("member directory", () => {
  it("ships an honest empty directory instead of invented profiles", () => {
    expect(MEMBERS).toEqual([]);
    expect(getPublicMembers("en")).toEqual([]);
    expect(getMemberBySlug("anything", "en")).toBeUndefined();
  });

  it("only publishes active, authorized, translated members", () => {
    expect(isPublicMember(base)).toBe(true);
    expect(isPublicMember({ ...base, status: "pending" })).toBe(false);
    expect(isPublicMember({ ...base, authorized: false })).toBe(false);
    expect(getPublicMembers("es", [{ ...base, translations: ["en"] }])).toEqual(
      [],
    );
  });

  it("keeps private data outside the public contract", () => {
    for (const key of Object.keys(base)) {
      expect(PUBLIC_MEMBER_FIELDS).toContain(key);
    }
    expect(PUBLIC_MEMBER_FIELDS).not.toContain("ein");
    expect(PUBLIC_MEMBER_FIELDS).not.toContain("duns");
    expect(PUBLIC_MEMBER_FIELDS).not.toContain("documents");
    expect(PUBLIC_MEMBER_FIELDS).not.toContain("internalNotes");
  });
});
