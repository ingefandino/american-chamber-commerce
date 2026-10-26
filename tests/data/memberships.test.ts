import { describe, expect, it } from "vitest";
import enData from "@assets/data/en-memberships.json";
import esData from "@assets/data/es-memberships.json";
import {
  formatBenefitValue,
  MEMBERSHIP_PLANS,
} from "@data/memberships";

describe("membership data", () => {
  it("uses the approved local price table", () => {
    for (const plan of MEMBERSHIP_PLANS) {
      const local = enData.memberships.find(
        (item) => item.category === plan.name,
      );
      expect(local).toBeDefined();
      expect(plan.price).toBe(local?.price_usd);
      expect(plan.currency).toBe("USD");
      expect(plan.billingCycle).toBe("annual");
    }
  });

  it("keeps both language versions in sync", () => {
    for (const plan of MEMBERSHIP_PLANS) {
      const local = esData.memberships.find(
        (item) => item.category === plan.name,
      );
      expect(local?.price_usd).toBe(plan.price);
    }
  });

  it("does not use legacy WordPress levels", () => {
    const names = MEMBERSHIP_PLANS.map((plan) => plan.name);
    expect(names).toEqual(["Silver", "Gold", "Platinum", "Diamond"]);
    expect(names).not.toContain("Solopreneur");
    expect(names).not.toContain("Small Business");
  });

  it("exposes every approved benefit in both languages", () => {
    for (const plan of MEMBERSHIP_PLANS) {
      expect(plan.benefits).toHaveLength(19);
      for (const benefit of plan.benefits) {
        expect(benefit.label.en.length).toBeGreaterThan(0);
        expect(benefit.label.es.length).toBeGreaterThan(0);
        expect(benefit.description.en.length).toBeGreaterThan(0);
        expect(benefit.description.es.length).toBeGreaterThan(0);
      }
    }
  });

  it("formats boolean and numeric values for the comparison table", () => {
    expect(formatBenefitValue(true, "en")).toBe("Included");
    expect(formatBenefitValue(false, "es")).toBe("No incluido");
    expect(formatBenefitValue(10, "en")).toBe("10 guests");
  });
});
