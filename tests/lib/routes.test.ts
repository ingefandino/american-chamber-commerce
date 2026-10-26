import { describe, expect, it } from "vitest";
import {
  equivalentHref,
  hasRoute,
  localizedHref,
  matchRoute,
  routeKeyFromPath,
} from "@lib/routes";

describe("routes", () => {
  it("builds localized hrefs for published routes", () => {
    expect(localizedHref("home", "en")).toBe("/en/");
    expect(localizedHref("home", "es")).toBe("/es/");
    expect(localizedHref("plans", "es")).toBe("/es/membership/plans/");
  });

  it("does not advertise unpublished translations", () => {
    expect(hasRoute("plans", "en")).toBe(true);
    expect(hasRoute("not-a-route" as never, "es")).toBe(false);
  });

  it("keeps the current section when switching language", () => {
    expect(equivalentHref("/en/about/mission/", "es")).toBe(
      "/es/about/mission/",
    );
    expect(equivalentHref("/es/membership/plans/", "en")).toBe(
      "/en/membership/plans/",
    );
  });

  it("preserves slugs for detail pages", () => {
    expect(equivalentHref("/en/services/market-research/", "es")).toBe(
      "/es/services/market-research/",
    );
    expect(equivalentHref("/es/events/annual-gala/", "en")).toBe(
      "/en/events/annual-gala/",
    );
  });

  it("returns null for unknown paths instead of inventing a translation", () => {
    expect(equivalentHref("/en/does-not-exist/", "es")).toBeNull();
    expect(routeKeyFromPath("/en/does-not-exist/")).toBeNull();
  });

  it("matches the section and slug of a detail route", () => {
    expect(matchRoute("/en/news/example/")).toEqual({
      key: "news",
      slug: "example",
    });
  });
});
