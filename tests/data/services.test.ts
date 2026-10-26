import { describe, expect, it } from "vitest";
import {
  getPublishedServices,
  getServiceBySlug,
  isPublicService,
  SERVICES,
  type Service,
} from "@data/services";

describe("services data", () => {
  it("publishes a stable, unique slug for every service", () => {
    const slugs = getPublishedServices().map((service) => service.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs).toContain("market-research");
    expect(slugs).toContain("fda-agent");
  });

  it("provides both language versions for every published service", () => {
    for (const service of getPublishedServices()) {
      expect(service.name.en.length).toBeGreaterThan(0);
      expect(service.name.es.length).toBeGreaterThan(0);
      expect(service.summary.en.length).toBeGreaterThan(0);
      expect(service.summary.es.length).toBeGreaterThan(0);
      expect(service.description.en.length).toBeGreaterThan(0);
      expect(service.description.es.length).toBeGreaterThan(0);
      expect(service.audience.en.length).toBeGreaterThan(0);
      expect(service.audience.es.length).toBeGreaterThan(0);
    }
  });

  it("never publishes a retired service", () => {
    const retired = {
      ...SERVICES[0],
      id: "service-retired",
      slug: "retired-service",
      status: "retired" as const,
    };
    const fixture: Service[] = [...SERVICES, retired];
    expect(isPublicService(retired)).toBe(false);
    expect(getPublishedServices(fixture)).toHaveLength(SERVICES.length);
    expect(getServiceBySlug("retired-service", fixture)).toBeUndefined();
  });
});
