import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import EventCard from "@components/events/EventCard.astro";
import { EVENTS } from "@data/events";

describe("EventCard", () => {
  it("shows the date, location, status, and localized detail link", async () => {
    const container = await AstroContainer.create();
    const event = EVENTS.find((item) => item.slug === "annual-gala-2025")!;
    const html = await container.renderToString(EventCard, {
      props: { event, lang: "es" },
    });

    expect(html).toContain('href="/es/events/annual-gala-2025/"');
    expect(html).toContain("Gala Anual 2025");
    expect(html).toContain("Evento pasado");
    expect(html).toContain("New York City");
    expect(html).toContain("2025");
  });
});
