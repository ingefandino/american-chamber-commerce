import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import LanguageSwitcher from "@components/shared/LanguageSwitcher.astro";

async function render(lang: "en" | "es", pathname: string) {
  const container = await AstroContainer.create();
  return container.renderToString(LanguageSwitcher, {
    props: { lang, pathname },
  });
}

describe("LanguageSwitcher", () => {
  it("links to the equivalent route with an accessible name", async () => {
    const html = await render("en", "/en/about/mission/");
    expect(html).toContain('href="/es/about/mission/"');
    expect(html).toContain('hreflang="es"');
    expect(html).toContain('aria-label="View this page in Spanish"');
    expect(html).toContain('aria-current="page"');
    expect(html).toContain('data-placement="header"');
  });

  it("does not render when the translation is not published", async () => {
    const html = await render("en", "/en/does-not-exist/");
    expect(html).not.toContain("data-language-switch");
    expect(html).not.toContain("language-switcher");
  });

  it("localizes the switch label for Spanish visitors", async () => {
    const html = await render("es", "/es/membership/plans/");
    expect(html).toContain('href="/en/membership/plans/"');
    expect(html).toContain('aria-label="Ver esta página en inglés"');
  });

  it("labels the switcher placement for scroll restoration", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(LanguageSwitcher, {
      props: {
        lang: "en",
        pathname: "/en/",
        placement: "footer",
      },
    });
    expect(html).toContain('data-placement="footer"');
  });

  it("stores the scroll position before navigating", () => {
    const source = readFileSync(
      new URL("../../src/components/shared/LanguageSwitcher.astro", import.meta.url),
      "utf8",
    );
    expect(source).toContain("createLanguageScrollRecord");
    expect(source).toContain("sessionStorage.setItem");
    expect(source).toContain("event.metaKey");
    expect(source).toContain("event.ctrlKey");
  });

  it("hides the switch when the target language is not available", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(LanguageSwitcher, {
      props: {
        lang: "en",
        pathname: "/en/events/global-tech-summit-2024/",
        availableLangs: ["en"],
      },
    });
    expect(html).not.toContain("data-language-switch");
  });
});
