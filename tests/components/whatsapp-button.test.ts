import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import WhatsAppButton from "@components/shared/WhatsAppButton.astro";

describe("WhatsAppButton", () => {
  it("uses the official number and a safe external link", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(WhatsAppButton, {
      props: { lang: "en" },
    });

    expect(html).toContain("https://wa.me/13473012169?text=");
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain(
      'aria-label="Contact the American Chamber of Commerce on WhatsApp (opens in a new tab)"',
    );
    expect(html).toContain("whatsapp-button__wave");
  });

  it("localizes the accessible label and prefilled message", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(WhatsAppButton, {
      props: { lang: "es" },
    });

    expect(html).toContain("Contactar a American Chamber of Commerce por WhatsApp");
    expect(html).toContain(
      encodeURIComponent(
        "Hola, deseo información sobre American Chamber of Commerce.",
      ),
    );
  });

  it("disables the ripple animation for reduced motion", () => {
    const source = readFileSync(
      new URL("../../src/components/shared/WhatsAppButton.astro", import.meta.url),
      "utf8",
    );
    expect(source).toContain("@media (prefers-reduced-motion: reduce)");
    expect(source).toContain("animation: none;");
  });
});
