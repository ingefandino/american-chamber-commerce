import { describe, expect, it } from "vitest";
import {
  buildDirectoryQuery,
  clearDirectoryFilters,
  filterMembers,
  getDirectorySectors,
  matchesDirectoryFilters,
  normalizeSearch,
  parseDirectoryParams,
} from "@lib/directory";
import type { PublicMember } from "@data/members";

const members: PublicMember[] = [
  {
    id: "member-1",
    slug: "tecnologia-andina",
    name: "Tecnología Andina",
    description: {
      en: "Software for logistics teams.",
      es: "Software para equipos de logística.",
    },
    sector: { en: "Technology", es: "Tecnología" },
    category: { en: "Small business", es: "Pequeña empresa" },
    location: { city: "Lima", region: "Lima", country: "Peru" },
    services: { en: ["Software"], es: ["Software"] },
    markets: ["Peru", "United States"],
    lastReviewedAt: "2026-10-26",
    status: "active",
    authorized: true,
    translations: ["en", "es"],
  },
  {
    id: "member-2",
    slug: "harbor-bank",
    name: "Harbor Bank",
    description: {
      en: "Business banking.",
      es: "Banca empresarial.",
    },
    sector: { en: "Financial services", es: "Servicios financieros" },
    category: { en: "Corporate", es: "Corporativo" },
    location: { city: "New York", region: "NY", country: "USA" },
    lastReviewedAt: "2026-10-26",
    status: "active",
    authorized: true,
    translations: ["en", "es"],
  },
];

describe("directory search", () => {
  it("normalizes case and accents", () => {
    expect(normalizeSearch("  TECNOLOGÍA  ")).toBe("tecnologia");
    expect(
      matchesDirectoryFilters(members[0], "es", {
        query: "tecnologia",
        sector: "",
      }),
    ).toBe(true);
    expect(
      matchesDirectoryFilters(members[0], "en", {
        query: "LIMA",
        sector: "",
      }),
    ).toBe(true);
  });

  it("matches name, sector, and location", () => {
    expect(
      filterMembers(members, "en", { query: "bank", sector: "" }).map(
        (member) => member.slug,
      ),
    ).toEqual(["harbor-bank"]);
    expect(
      filterMembers(members, "es", {
        query: "",
        sector: "servicios financieros",
      }).map((member) => member.slug),
    ).toEqual(["harbor-bank"]);
  });

  it("returns zero results for an unmatched query", () => {
    expect(filterMembers(members, "en", { query: "zzz", sector: "" })).toEqual(
      [],
    );
  });

  it("builds shareable URLs and clears back to the base listing", () => {
    expect(buildDirectoryQuery({ query: " bank ", sector: "Technology" })).toBe(
      "?q=bank&sector=Technology",
    );
    expect(buildDirectoryQuery({ query: "", sector: "" })).toBe("");
    expect(clearDirectoryFilters("/en/members/")).toBe("/en/members/");
    expect(
      parseDirectoryParams(new URLSearchParams("q=tech&sector=Technology")),
    ).toEqual({ query: "tech", sector: "Technology" });
  });

  it("lists unique sectors alphabetically", () => {
    expect(getDirectorySectors(members, "en")).toEqual([
      "Financial services",
      "Technology",
    ]);
  });
});
