import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Seo from "@components/shared/Seo.astro";

function parseJsonLd(html: string) {
  const match = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(
    html,
  );
  expect(match).not.toBeNull();
  return JSON.parse(match![1].replaceAll("\\u003c", "<"));
}

async function render(noIndex = false) {
  const container = await AstroContainer.create();
  return container.renderToString(Seo, {
    props: {
      lang: "en",
      pathname: "/en/services/market-research/",
      title: "Market research",
      description: "Research tailored to your market questions.",
      noIndex,
      breadcrumbs: [
        { name: "Home", href: "/en/" },
        { name: "Services", href: "/en/services/" },
        {
          name: "Market research",
          href: "/en/services/market-research/",
        },
      ],
      structuredData: {
        "@type": "Service",
        name: "Market research",
      },
    },
  });
}

describe("Seo", () => {
  it("emits complete Open Graph and Twitter metadata", async () => {
    const html = await render();
    expect(html).toContain('property="og:title"');
    expect(html).toContain('property="og:description"');
    expect(html).toContain('property="og:url"');
    expect(html).toContain('property="og:type" content="website"');
    expect(html).toContain('property="og:site_name"');
    expect(html).toContain('property="og:locale" content="en_US"');
    expect(html).toContain('property="og:locale:alternate" content="es_US"');
    expect(html).toContain(
      'property="og:image" content="https://americanchamberofcommerce.us/og-image.jpg"',
    );
    expect(html).toContain('property="og:image:width" content="1200"');
    expect(html).toContain('property="og:image:height" content="630"');
    expect(html).toContain('property="og:image:alt"');
    expect(html).toContain('name="twitter:card"');
    expect(html).toContain('name="twitter:image:alt"');
  });

  it("emits canonical, hreflang, manifest, and icons", async () => {
    const html = await render();
    expect(html).toContain(
      'rel="canonical" href="https://americanchamberofcommerce.us/en/services/market-research/"',
    );
    expect(html).toContain('hreflang="en"');
    expect(html).toContain('hreflang="es"');
    expect(html).toContain('hreflang="x-default"');
    expect(html).toContain('rel="manifest" href="/site.webmanifest"');
    expect(html).toContain('rel="apple-touch-icon"');
    expect(html).toContain('name="robots" content="index, follow');
  });

  it("emits a valid JSON-LD graph with breadcrumbs and page data", async () => {
    const data = parseJsonLd(await render());
    expect(data["@context"]).toBe("https://schema.org");
    const types = data["@graph"].map((node: { "@type": string }) => node["@type"]);
    expect(types).toContain("Organization");
    expect(types).toContain("WebSite");
    expect(types).toContain("BreadcrumbList");
    expect(types).toContain("Service");
  });

  it("can mark a page as noindex without removing metadata", async () => {
    const html = await render(true);
    expect(html).toContain('name="robots" content="noindex, nofollow"');
    expect(html).toContain('property="og:title"');
  });
});
