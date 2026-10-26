import { describe, expect, it, vi } from "vitest";
import {
  absoluteUrl,
  buildAlternates,
  formatTitle,
  shouldNoIndex,
  SITE_URL,
} from "@lib/seo";

describe("seo", () => {
  it("builds absolute canonical URLs", () => {
    expect(absoluteUrl("/en/about/")).toBe(
      "https://americanchamberofcommerce.us/en/about/",
    );
  });

  it("templates titles without duplicating the site name", () => {
    expect(formatTitle("Membership plans")).toBe(
      "Membership plans | American Chamber of Commerce",
    );
    expect(formatTitle("American Chamber of Commerce")).toBe(
      "American Chamber of Commerce",
    );
  });

  it("emits hreflang only for published equivalents", () => {
    expect(buildAlternates("/en/about/mission/")).toEqual([
      { hreflang: "en", href: `${SITE_URL}/en/about/mission/` },
      { hreflang: "es", href: `${SITE_URL}/es/about/mission/` },
      { hreflang: "x-default", href: `${SITE_URL}/en/about/mission/` },
    ]);
  });

  it("does not emit hreflang for unknown routes", () => {
    expect(buildAlternates("/en/does-not-exist/")).toEqual([]);
  });

  it("marks staging as noindex when the build flag is set", () => {
    vi.stubEnv("PUBLIC_NOINDEX", "true");
    expect(shouldNoIndex()).toBe(true);
    vi.unstubAllEnvs();
    expect(shouldNoIndex()).toBe(false);
  });

  it("limits hreflang to languages that actually have content", () => {
    expect(buildAlternates("/en/events/global-tech-summit-2024/", SITE_URL, ["en"])).toEqual([
      {
        hreflang: "en",
        href: `${SITE_URL}/en/events/global-tech-summit-2024/`,
      },
      {
        hreflang: "x-default",
        href: `${SITE_URL}/en/events/global-tech-summit-2024/`,
      },
    ]);
  });
});
