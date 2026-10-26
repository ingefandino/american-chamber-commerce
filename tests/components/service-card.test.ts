import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import ServiceCard from "@components/services/ServiceCard.astro";
import { SERVICES } from "@data/services";

describe("ServiceCard", () => {
  it("links to the localized detail page with the stable slug", async () => {
    const container = await AstroContainer.create();
    const service = SERVICES.find((item) => item.slug === "market-research")!;
    const html = await container.renderToString(ServiceCard, {
      props: { service, lang: "es" },
    });

    expect(html).toContain('href="/es/services/market-research/"');
    expect(html).toContain("Investigación de mercado");
    expect(html).toContain("Ver servicio");
  });
});
