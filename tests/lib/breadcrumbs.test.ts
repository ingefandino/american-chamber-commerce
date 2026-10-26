import { describe, expect, it } from "vitest";
import { buildBreadcrumbs } from "@lib/breadcrumbs";

describe("buildBreadcrumbs", () => {
  it("returns nothing on the home page", () => {
    expect(buildBreadcrumbs("/en/", "en", "Home")).toEqual([]);
    expect(buildBreadcrumbs("/es/", "es", "Inicio")).toEqual([]);
  });

  it("keeps the section and current page for subpages", () => {
    expect(
      buildBreadcrumbs("/en/membership/plans/", "en", "Membership levels"),
    ).toEqual([
      { name: "Home", href: "/en/" },
      { name: "Membership", href: "/en/membership/" },
      { name: "Membership levels", href: "/en/membership/plans/" },
    ]);
  });

  it("uses localized labels in Spanish", () => {
    expect(
      buildBreadcrumbs("/es/about/mission/", "es", "Misión, visión y valores"),
    ).toEqual([
      { name: "Inicio", href: "/es/" },
      { name: "Nosotros", href: "/es/about/" },
      {
        name: "Misión, visión y valores",
        href: "/es/about/mission/",
      },
    ]);
  });

  it("handles detail pages without duplicating the section", () => {
    expect(
      buildBreadcrumbs("/en/services/market-research/", "en", "Market research"),
    ).toEqual([
      { name: "Home", href: "/en/" },
      { name: "Services", href: "/en/services/" },
      {
        name: "Market research",
        href: "/en/services/market-research/",
      },
    ]);
  });

  it("uses the section for index pages", () => {
    expect(buildBreadcrumbs("/en/contact/", "en", "Contact")).toEqual([
      { name: "Home", href: "/en/" },
      { name: "Contact", href: "/en/contact/" },
    ]);
  });

  it("does not invent breadcrumbs for unknown paths", () => {
    expect(buildBreadcrumbs("/en/not-a-page/", "en", "Not found")).toEqual([]);
  });
});
