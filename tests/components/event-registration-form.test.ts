import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import EventRegistrationForm from "@components/forms/EventRegistrationForm.astro";

async function render(mode: "registration" | "information") {
  const container = await AstroContainer.create();
  return container.renderToString(EventRegistrationForm, {
    props: {
      lang: "en",
      eventSlug: "annual-gala-2025",
      eventTitle: "2025 Annual Gala",
      mode,
    },
  });
}

describe("EventRegistrationForm", () => {
  it("carries the event context and an accessible error pattern", async () => {
    const html = await render("registration");
    expect(html).toContain('name="eventSlug"');
    expect(html).toContain('value="annual-gala-2025"');
    expect(html).toContain('name="botcheck"');
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain('data-form-status');
  });

  it("changes the submit label for information requests", async () => {
    const html = await render("information");
    expect(html).toContain("Request information");
    expect(html).not.toContain("Register for this event");
  });

  it("always shows an alternative contact channel", async () => {
    const html = await render("registration");
    expect(html).toContain("mailto:info@americanchamberofcommerce.us");
    expect(html).toContain("does not guarantee a place");
  });
});
