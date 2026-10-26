import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Header from "@components/shared/Header.astro";

async function render(lang: "en" | "es", pathname: string) {
  const container = await AstroContainer.create();
  return container.renderToString(Header, { props: { lang, pathname } });
}

describe("Header", () => {
  it("uses a native details menu so links work without JavaScript", async () => {
    const html = await render("en", "/en/");
    expect(html).toContain("<details");
    expect(html).toContain('aria-label="Open menu"');
    expect(html).toContain('aria-label="Primary navigation"');
  });

  it("keeps the current language in every navigation link", async () => {
    const html = await render("es", "/es/about/");
    expect(html).toContain('href="/es/services/"');
    expect(html).toContain('href="/es/membership/"');
    expect(html).toContain('href="/es/events/"');
    expect(html).not.toContain('href="/en/services/"');
  });

  it("marks the active section and links the primary CTA", async () => {
    const html = await render("en", "/en/membership/plans/");
    expect(html).toContain('href="/en/membership/" aria-current="page"');
    expect(html).toContain('class="btn btn--primary site-header__cta"');
    expect(html).toContain('href="/en/membership/plans/"');
  });

  it("exposes a language switch inside the mobile menu", async () => {
    const html = await render("en", "/en/");
    expect(html.match(/class="language-switcher"/g)?.length).toBe(2);
  });
});
