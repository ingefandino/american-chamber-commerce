import { describe, expect, it } from "vitest";
import { HOME_CONTENT } from "@data/home";
import { LANGS } from "@lib/lang";
import { localizedHref, ROUTE_PATHS } from "@lib/routes";

describe("home content", () => {
  it("provides localized copy for both languages", () => {
    expect(HOME_CONTENT.en.introTitle).not.toBe(HOME_CONTENT.es.introTitle);
    expect(HOME_CONTENT.en.pillars).toHaveLength(3);
    expect(HOME_CONTENT.es.pillars).toHaveLength(3);
  });

  it("routes every CTA to a published localized page", () => {
    for (const lang of LANGS) {
      const content = HOME_CONTENT[lang];
      const callsToAction = [
        ...content.pillars.map((item) => item.cta),
        ...content.benefits.map((item) => item.cta),
        content.cta.primary,
        content.cta.secondary,
      ];

      for (const cta of callsToAction) {
        const href = localizedHref(cta.key, lang);
        expect(ROUTE_PATHS[cta.key]).toBeDefined();
        expect(href.startsWith(`/${lang}/`)).toBe(true);
      }
    }
  });

  it("describes sectors without inventing member company names", () => {
    for (const lang of LANGS) {
      for (const item of HOME_CONTENT[lang].trustItems) {
        expect(item).not.toMatch(/\b(Inc|LLC|Corp|Co\.)\b/);
      }
    }
  });
});
