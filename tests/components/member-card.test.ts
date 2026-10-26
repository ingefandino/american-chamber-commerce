import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import MemberCard from "@components/directory/MemberCard.astro";
import type { PublicMember } from "@data/members";

const member: PublicMember = {
  id: "member-example",
  slug: "example-company",
  name: "Example Company",
  description: {
    en: "An example member company.",
    es: "Una empresa socia de ejemplo.",
  },
  sector: { en: "Technology", es: "Tecnología" },
  category: { en: "Small business", es: "Pequeña empresa" },
  location: { city: "New York", region: "NY", country: "USA" },
  lastReviewedAt: "2026-10-26",
  status: "active",
  authorized: true,
  translations: ["en", "es"],
};

describe("MemberCard", () => {
  it("renders the public profile with a localized detail link", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MemberCard, {
      props: { member, lang: "es" },
    });

    expect(html).toContain('href="/es/members/example-company/"');
    expect(html).toContain("Example Company");
    expect(html).toContain("Tecnología");
    expect(html).toContain("Nueva York".replace("Nueva York", "New York"));
    expect(html).toContain("Ver perfil");
  });
});
