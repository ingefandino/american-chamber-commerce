import { afterEach, describe, expect, it, vi } from "vitest";
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

  it("shows the copyright range from 2024 through the current year", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Footer, {
      props: { lang: "en", pathname: "/en/" },
    });

    expect(html).toContain(`© 2024-${new Date().getFullYear()}`);
  });

  it("does not repeat the year when the current year is 2024", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-06-15T12:00:00Z"));
    const container = await AstroContainer.create();
    const html = await container.renderToString(Footer, {
      props: { lang: "es", pathname: "/es/" },
    });

    expect(html).toContain("© 2024 American Chamber of Commerce");
    expect(html).not.toContain("© 2024-2024");
  });

  afterEach(() => {
    vi.useRealTimers();
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
