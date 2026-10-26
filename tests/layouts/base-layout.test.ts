import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import BaseLayout from "@layouts/BaseLayout.astro";

async function render(lang: "en" | "es", body: string) {
  const container = await AstroContainer.create();
  return container.renderToString(BaseLayout, {
    props: { lang, title: "Test page", description: "Test description", pathname: `/${lang}/` },
    slots: { default: body },
  });
}

describe("BaseLayout", () => {
  it("declares the document language", async () => {
    expect(await render("en", "<h1>Hello</h1>")).toContain('<html lang="en-US"');
    expect(await render("es", "<h1>Hola</h1>")).toContain('<html lang="es-US"');
  });

  it("provides a skip link that targets the main landmark", async () => {
    const html = await render("en", "<h1>Hello</h1>");
    expect(html).toMatch(/class="skip-link"[^>]*href="#main"/);
    expect(html).toContain('id="main"');
  });

  it("renders a single main landmark and keeps page content inside it", async () => {
    const html = await render("en", "<h1>Hello</h1>");
    expect(html.match(/<main/g)?.length).toBe(1);
    expect(html.indexOf("<h1>Hello</h1>")).toBeGreaterThan(
      html.indexOf('id="main"'),
    );
  });

  it("sets title and description metadata", async () => {
    const html = await render("en", "<h1>Hello</h1>");
    expect(html).toContain("<title>Test page | American Chamber of Commerce</title>");
    expect(html).toContain('name="description"');
    expect(html).toContain('name="viewport"');
  });

  it("bootstraps language scroll restoration without animated scrolling", async () => {
    const html = await render("en", "<h1>Hello</h1>");
    expect(html).toContain('"acc:language-scroll"');
    expect(html).toContain("astro:page-load");
    expect(html).toContain('scrollBehavior = "auto"');
    expect(html).toContain("preventScroll: true");
  });
});
