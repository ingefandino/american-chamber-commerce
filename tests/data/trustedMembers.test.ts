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
  it("publishes no company names without evidence", () => {
    expect(getTrustedMemberNames()).toEqual([]);
    const serialized = JSON.stringify(TRUSTED_MEMBERS);
    for (const pendingName of [
      "Harbor & Co.",
      "Meridian Group",
      "Union Steelworks",
      "Ashford Partners",
      "Beacon Logistics",
      "Northgate Foods",
      "Sterling Capital",
      "Willow Creek Bank",
    ]) {
      expect(serialized).not.toContain(pendingName);
    }
  });

  it("only publishes approved and authorized members with a source", () => {
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
  });

  it("returns the approved names in editorial order", () => {
    const names = getTrustedMemberNames([
      verified,
      { ...verified, id: "second", name: "Second Company" },
      { ...verified, id: "draft", name: "Draft Company", approved: false },
    ]);
    expect(names).toEqual(["Verified Company", "Second Company"]);
  });
});
