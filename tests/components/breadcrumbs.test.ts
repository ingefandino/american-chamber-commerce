import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Breadcrumbs from "@components/shared/Breadcrumbs.astro";

describe("Breadcrumbs", () => {
  it("renders links and marks only the last item as current", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Breadcrumbs, {
      props: {
        lang: "en",
        items: [
          { name: "Home", href: "/en/" },
          { name: "Services", href: "/en/services/" },
          { name: "Market research", href: "/en/services/market-research/" },
        ],
      },
    });

    expect(html).toContain('aria-label="Breadcrumb"');
    expect(html).toContain('href="/en/"');
    expect(html).toContain('href="/en/services/"');
    expect(html).toContain('aria-current="page"');
    expect(html.match(/aria-current="page"/g)?.length).toBe(1);
    expect(html).not.toContain(
      '<a href="/en/services/market-research/">Market research</a>',
    );
  });

  it("renders nothing when there are no items", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Breadcrumbs, {
      props: { lang: "es", items: [] },
    });
    expect(html).not.toContain("breadcrumbs");
  });
});
