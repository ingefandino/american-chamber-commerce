import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import MemberMarquee from "@components/sections/MemberMarquee.astro";

async function render(lang: "en" | "es", members: string[]) {
  const container = await AstroContainer.create();
  return container.renderToString(MemberMarquee, {
    props: { lang, members },
  });
}

describe("MemberMarquee", () => {
  it("renders nothing when there are no approved members", async () => {
    expect(await render("en", [])).not.toContain("data-member-marquee");
    expect(await render("es", ["   "])).not.toContain("data-member-marquee");
  });

  it("duplicates the names for a seamless, accessible loop", async () => {
    const html = await render("en", ["Harbor & Co.", "Meridian Group"]);

    expect(html).toContain("data-member-marquee");
    expect(html).toContain("Harbor &amp; Co.");
    expect(html.match(/Harbor &amp; Co\./g)).toHaveLength(2);
    expect(
      html.match(/class="member-marquee__group"[^>]*aria-hidden="true"/g),
    ).toHaveLength(1);
    expect(html).toContain("--marquee-duration:24s");
  });

  it("includes a localized pause control", async () => {
    const html = await render("es", ["Empresa Uno"]);
    expect(html).toContain('aria-label="Pausar la franja de empresas miembro"');
    expect(html).toContain('data-label-play="Reproducir la franja de empresas miembro"');
    expect(html).toContain('aria-pressed="false"');
  });

  it("pauses and respects reduced motion in CSS", () => {
    const source = readFileSync(
      new URL(
        "../../src/components/sections/MemberMarquee.astro",
        import.meta.url,
      ),
      "utf8",
    );
    expect(source).toContain('data-paused="true"');
    expect(source).toContain("animation-play-state: paused;");
    expect(source).toContain("@media (prefers-reduced-motion: reduce)");
    expect(source).toContain("animation: none;");
    expect(source).toContain('group[aria-hidden="true"]');
  });
});
