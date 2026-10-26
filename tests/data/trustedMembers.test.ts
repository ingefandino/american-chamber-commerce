import { describe, expect, it } from "vitest";
import {
  TRUSTED_MEMBERS,
  getTrustedMemberNames,
  isPublicTrustedMember,
  type TrustedMember,
} from "@data/trustedMembers";

const verified: TrustedMember = {
  id: "verified",
  name: "Verified Company",
  approved: true,
  authorized: true,
  source: "Signed authorization",
  reviewedAt: "2026-10-26",
};

describe("trusted members", () => {
  it("publishes the eight client-confirmed members in order", () => {
    expect(getTrustedMemberNames()).toEqual([
      "Harbor & Co.",
      "Meridian Group",
      "Union Steelworks",
      "Ashford Partners",
      "Beacon Logistics",
      "Northgate Foods",
      "Sterling Capital",
      "Willow Creek Bank",
    ]);
    expect(TRUSTED_MEMBERS).toHaveLength(8);
  });

  it("requires approval, authorization, source, and review date", () => {
    expect(isPublicTrustedMember(verified)).toBe(true);
    expect(
      isPublicTrustedMember({ ...verified, approved: false }),
    ).toBe(false);
    expect(
      isPublicTrustedMember({ ...verified, authorized: false }),
    ).toBe(false);
    expect(
      isPublicTrustedMember({ ...verified, source: "" }),
    ).toBe(false);
    expect(
      isPublicTrustedMember({ ...verified, reviewedAt: "" }),
    ).toBe(false);
    expect(isPublicTrustedMember({ ...verified, name: "   " })).toBe(false);
  });

  it("returns only the approved names in editorial order", () => {
    const names = getTrustedMemberNames([
      verified,
      { ...verified, id: "second", name: "Second Company" },
      { ...verified, id: "draft", name: "Draft Company", approved: false },
    ]);
    expect(names).toEqual(["Verified Company", "Second Company"]);
  });
});
