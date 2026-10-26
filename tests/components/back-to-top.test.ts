import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import BackToTop from "@components/shared/BackToTop.astro";

describe("BackToTop", () => {
  it("is hidden initially and has an accessible name", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(BackToTop, {
      props: { lang: "en" },
    });

    expect(html).toContain("data-back-to-top");
    expect(html).toContain('aria-label="Back to top"');
    expect(html).toMatch(/<button[^>]*hidden/);
    expect(html).toMatch(/<img[^>]*\salt(?:\s|>)/);
    expect(html).toContain('aria-hidden="true"');
  });

  it("localizes the Spanish label", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(BackToTop, {
      props: { lang: "es" },
    });
    expect(html).toContain('aria-label="Volver al inicio"');
  });

  it("disables transitions for reduced motion", () => {
    const source = readFileSync(
      new URL("../../src/components/shared/BackToTop.astro", import.meta.url),
      "utf8",
    );
    expect(source).toContain("@media (prefers-reduced-motion: reduce)");
    expect(source).toContain("transition: none;");
  });
});
