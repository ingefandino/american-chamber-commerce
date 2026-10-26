import { describe, expect, it } from "vitest";
import {
  breadcrumbSchema,
  buildJsonLdGraph,
  eventSchema,
  organizationSchema,
  policyArticleSchema,
  serializeJsonLd,
  serviceSchema,
  websiteSchema,
} from "@lib/structuredData";
import { EVENTS } from "@data/events";
import { POLICIES } from "@data/policies";
import { SERVICES } from "@data/services";
import { SITE_URL } from "@lib/seo";

describe("structured data", () => {
  it("builds Organization and WebSite nodes without legal claims", () => {
    const organization = organizationSchema("en");
    expect(organization["@type"]).toBe("Organization");
    expect(organization.url).toBe(SITE_URL);
    expect(organization.logo).toMatchObject({
      url: `${SITE_URL}/icons/icon-512.png`,
      width: 512,
      height: 512,
    });
    expect(organization).not.toHaveProperty("foundingDate");
    expect(organization).not.toHaveProperty("taxID");

    const website = websiteSchema("es");
    expect(website["@type"]).toBe("WebSite");
    expect(website.inLanguage).toBe("es-US");
    expect(website.publisher).toEqual({ "@id": `${SITE_URL}/#organization` });
  });

  it("builds a BreadcrumbList with ordered absolute items", () => {
    const schema = breadcrumbSchema(
      [
        { name: "Home", href: "/en/" },
        { name: "Services", href: "/en/services/" },
        { name: "Research", href: "/en/services/market-research/" },
      ],
      "en",
    );
    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement).toEqual([
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/en/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SITE_URL}/en/services/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Research",
        item: `${SITE_URL}/en/services/market-research/`,
      },
    ]);
  });

  it("builds an Event schema with explicit timezone offsets", () => {
    const event = EVENTS.find((item) => item.slug === "annual-gala-2025")!;
    const schema = eventSchema(event, "en");
    expect(schema["@type"]).toBe("Event");
    expect(schema.startDate).toBe("2025-10-21T19:00:00-04:00");
    expect(schema.endDate).toBe("2025-10-21T23:00:00-04:00");
    expect(schema.eventAttendanceMode).toContain("MixedEventAttendanceMode");
    expect(schema.organizer).toEqual({
      "@id": `${SITE_URL}/#organization`,
    });
  });

  it("builds Service and Article nodes for applicable pages", () => {
    const service = serviceSchema(
      SERVICES.find((item) => item.slug === "market-research")!,
      "es",
    );
    expect(service["@type"]).toBe("Service");
    expect(service.provider).toEqual({ "@id": `${SITE_URL}/#organization` });

    const article = policyArticleSchema(POLICIES[0], "en");
    expect(article["@type"]).toBe("Article");
    expect(article.author).toEqual({ "@id": `${SITE_URL}/#organization` });
  });

  it("assembles a single graph and escapes script-breaking characters", () => {
    const graph = buildJsonLdGraph("en", [
      { "@type": "Service", name: "A </script> B" },
    ]);
    expect(graph["@context"]).toBe("https://schema.org");
    expect((graph["@graph"] as unknown[]).length).toBe(3);

    const serialized = serializeJsonLd(graph);
    expect(serialized).not.toContain("</script>");
    expect(serialized).toContain("\\u003c/script\\u003e");
  });
});
