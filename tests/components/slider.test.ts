import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Slider from "@components/sections/Slider.astro";
import { getSlides } from "@data/slider";

async function render(lang: "en" | "es") {
  const container = await AstroContainer.create();
  return container.renderToString(Slider, {
    props: { slides: getSlides(lang), lang },
  });
}

describe("Slider", () => {
  it("exposes carousel semantics and accessible controls", async () => {
    const html = await render("en");
    expect(html).toContain('aria-roledescription="carousel"');
    expect(html).toContain('aria-label="Previous slide"');
    expect(html).toContain('aria-label="Next slide"');
    expect(html).toContain('aria-label="Pause slideshow"');
    expect(html).toContain('role="tablist"');
  });

  it("renders one dot per slide with the first selected", async () => {
    const html = await render("en");
    expect(html.match(/data-slider-dot/g)?.length).toBe(9);
    expect(html).toContain('aria-selected="true"');
  });

  it("renders exactly one H1 and defers non-visible images", async () => {
    const html = await render("en");
    expect(html.match(/<h1/g)?.length).toBe(1);
    expect(html).toContain('loading="eager"');
    expect(html).toContain('loading="lazy"');
  });

  it("localizes CTA links with the current language", async () => {
    const html = await render("es");
    expect(html).toContain('href="/es/membership/"');
    expect(html).toContain("Diapositiva anterior");
  });
});
