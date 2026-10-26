import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Footer from "@components/shared/Footer.astro";

describe("Footer", () => {
  it("shows the approved contact details and legal navigation", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Footer, {
      props: { lang: "en", pathname: "/en/contact/" },
    });

    expect(html).toContain("info@americanchamberofcommerce.us");
    expect(html).toContain("+1 (904) 397-3437");
    expect(html).toContain('href="/en/privacy/"');
    expect(html).toContain('href="/en/terms/"');
    expect(html).toContain('href="/en/accessibility/"');
    expect(html).toContain('href="/es/contact/"');
  });

  it("localizes the navigation and legal labels", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Footer, {
      props: { lang: "es", pathname: "/es/" },
    });
    expect(html).toContain("Contacto");
    expect(html).toContain("Privacidad");
    expect(html).toContain('href="/en/"');
  });
});
