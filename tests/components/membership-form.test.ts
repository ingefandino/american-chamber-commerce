import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import MembershipForm from "@components/forms/MembershipForm.astro";

async function render(lang: "en" | "es") {
  const container = await AstroContainer.create();
  return container.renderToString(MembershipForm, { props: { lang } });
}

describe("MembershipForm", () => {
  it("labels every field and connects accessible error messages", async () => {
    const html = await render("en");
    expect(html).toContain('for="membership-firstName"');
    expect(html).toContain('id="membership-firstName"');
    expect(html).toContain('name="email"');
    expect(html).toContain('aria-describedby="membership-email-error"');
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain("novalidate");
  });

  it("offers the approved membership levels plus an unsure option", async () => {
    const html = await render("es");
    expect(html).toContain("Silver");
    expect(html).toContain("Gold");
    expect(html).toContain("Platinum");
    expect(html).toContain("Diamond");
    expect(html).toContain("Aún no estoy seguro");
  });

  it("includes consent, a live status region, and a no-JS fallback", async () => {
    const html = await render("en");
    expect(html).toContain('name="consent"');
    expect(html).toContain('data-form-status');
    expect(html).toContain("<noscript>");
    expect(html).toContain("mailto:info@americanchamberofcommerce.us");
  });

  it("does not use browser storage in the rendered markup", async () => {
    const html = await render("en");
    expect(html).not.toContain("localStorage");
    expect(html).not.toContain("sessionStorage");
  });
});
