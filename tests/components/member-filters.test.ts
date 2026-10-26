import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import MemberFilters from "@components/directory/MemberFilters.astro";

describe("MemberFilters", () => {
  it("renders a GET search form that works without JavaScript", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MemberFilters, {
      props: {
        lang: "en",
        basePath: "/en/members/",
        sectors: ["Financial services", "Technology"],
      },
    });

    expect(html).toContain('method="get"');
    expect(html).toContain('action="/en/members/"');
    expect(html).toContain('name="q"');
    expect(html).toContain('name="sector"');
    expect(html).toContain("Financial services");
    expect(html).toContain('href="/en/members/"');
    expect(html).toContain('data-directory-status');
  });

  it("localizes the control labels", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MemberFilters, {
      props: {
        lang: "es",
        basePath: "/es/members/",
        sectors: ["Tecnología"],
      },
    });
    expect(html).toContain("Buscar socios");
    expect(html).toContain("Limpiar filtros");
  });
});
