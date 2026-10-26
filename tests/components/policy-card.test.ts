import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import PolicyCard from "@components/advocacy/PolicyCard.astro";
import { POLICIES } from "@data/policies";

describe("PolicyCard", () => {
  it("labels the level, status, review state, and localized link", async () => {
    const container = await AstroContainer.create();
    const policy = POLICIES[0];
    const html = await container.renderToString(PolicyCard, {
      props: { policy, lang: "es" },
    });

    expect(html).toContain('href="/es/advocacy/tax-and-fiscal-policy/"');
    expect(html).toContain("Política fiscal y tributaria");
    expect(html).toContain("En revisión editorial");
    expect(html).toContain("2026-10-26");
  });
});
