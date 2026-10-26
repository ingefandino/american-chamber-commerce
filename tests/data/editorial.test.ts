import { describe, expect, it } from "vitest";
import { POLICIES, getPolicyBySlug } from "@data/policies";
import { getPublishedNews, NEWS } from "@data/news";
import { RESOURCES } from "@data/resources";
import { SERVICES } from "@data/services";

describe("advocacy, news, and resources", () => {
  it("gives every policy item a source, date, and editorial status", () => {
    for (const policy of POLICIES) {
      expect(policy.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(policy.source.label.length).toBeGreaterThan(0);
      expect(policy.source.url).toContain("americanchamberofcommerce.us");
      expect(policy.source.observedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(["needs-review", "approved"]).toContain(policy.reviewStatus);
      expect(policy.title.en.length).toBeGreaterThan(0);
      expect(policy.title.es.length).toBeGreaterThan(0);
    }
  });

  it("does not attribute an approved stance to unreviewed policy items", () => {
    for (const policy of POLICIES) {
      if (policy.reviewStatus === "needs-review") {
        expect(policy.approvedPosition).toBeNull();
      }
    }
  });

  it("ships an empty newsroom instead of invented articles", () => {
    expect(NEWS).toEqual([]);
    expect(getPublishedNews("en")).toEqual([]);
    expect(getPublishedNews("es")).toEqual([]);
  });

  it("links resources to published service slugs", () => {
    const slugs = new Set(SERVICES.map((service) => service.slug));
    for (const resource of RESOURCES) {
      expect(resource.hrefKey).toBe("services");
      expect(slugs.has((resource.hrefSuffix ?? "").replace(/\/$/, ""))).toBe(
        true,
      );
    }
  });

  it("finds policies by slug", () => {
    expect(getPolicyBySlug("trade")?.title.en).toBe("Trade");
    expect(getPolicyBySlug("missing")).toBeUndefined();
  });
});
