import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import ContactForm from "@components/forms/ContactForm.astro";

async function render(lang: "en" | "es") {
  const container = await AstroContainer.create();
  return container.renderToString(ContactForm, { props: { lang } });
}

describe("ContactForm", () => {
  it("reuses the approved accessible form pattern", async () => {
    const html = await render("en");
    expect(html).toContain('name="email"');
    expect(html).toContain('aria-describedby="contact-email-error"');
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain('name="botcheck"');
    expect(html).toContain("novalidate");
  });

  it("routes the message through the shared Web3Forms adapter", async () => {
    const html = await render("en");
    expect(html).toContain('name="form_type"');
    expect(html).toContain('value="contact"');
    expect(html).toContain("mailto:info@americanchamberofcommerce.us");
  });

  it("localizes labels and topics", async () => {
    const html = await render("es");
    expect(html).toContain("Consulta general");
    expect(html).toContain("Patrocinio o alianza");
    expect(html).toContain("Enviar mensaje");
  });

  it("does not persist data in browser storage", async () => {
    const html = await render("en");
    expect(html).not.toContain("localStorage");
    expect(html).not.toContain("sessionStorage");
  });
});
