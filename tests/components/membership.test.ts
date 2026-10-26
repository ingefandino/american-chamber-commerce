import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import PlanCard from "@components/membership/PlanCard.astro";
import BenefitsTable from "@components/membership/BenefitsTable.astro";
import { MEMBERSHIP_PLANS } from "@data/memberships";

describe("PlanCard", () => {
  it("shows the approved price and a localized CTA", async () => {
    const container = await AstroContainer.create();
    const plan = MEMBERSHIP_PLANS.find((item) => item.name === "Gold")!;
    const html = await container.renderToString(PlanCard, {
      props: { plan, lang: "es" },
    });

    expect(html).toContain("$220");
    expect(html).toContain("por año");
    expect(html).toContain('href="/es/membership/apply/"');
    expect(html).toContain("Solicitar este nivel");
  });

  it("sends Diamond requests to the contact channel", async () => {
    const container = await AstroContainer.create();
    const plan = MEMBERSHIP_PLANS.find((item) => item.name === "Diamond")!;
    const html = await container.renderToString(PlanCard, {
      props: { plan, lang: "en" },
    });

    expect(html).toContain("mailto:info@americanchamberofcommerce.us");
    expect(html).toContain("Contact us");
  });
});

describe("BenefitsTable", () => {
  it("compares every plan with accessible included labels", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(BenefitsTable, {
      props: { lang: "en" },
    });

    expect(html).toContain("Membership benefits by level");
    expect(html).toContain("Silver");
    expect(html).toContain("Diamond");
    expect(html).toContain("Included");
    expect(html).toContain("Not included");
    expect(html).toContain('tabindex="0"');
  });
});
