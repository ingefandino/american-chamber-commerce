import { describe, expect, it } from "vitest";
import { HEADER_HIDE_AFTER, nextHeaderState } from "@lib/header";

const base = {
  last: 0,
  hidden: false,
  menuOpen: false,
  reducedMotion: false,
};

describe("nextHeaderState", () => {
  it("hides when scrolling down past the threshold", () => {
    expect(
      nextHeaderState({ ...base, current: HEADER_HIDE_AFTER + 40 }),
    ).toEqual({ scrolled: true, hidden: true });
  });

  it("shows again when scrolling up", () => {
    expect(
      nextHeaderState({
        ...base,
        current: 120,
        last: 220,
        hidden: true,
      }),
    ).toEqual({ scrolled: true, hidden: false });
  });

  it("never hides while the mobile menu is open", () => {
    expect(
      nextHeaderState({
        ...base,
        current: 800,
        last: 300,
        menuOpen: true,
      }),
    ).toEqual({ scrolled: true, hidden: false });
  });

  it("never hides when reduced motion is requested", () => {
    expect(
      nextHeaderState({
        ...base,
        current: 800,
        last: 300,
        reducedMotion: true,
      }),
    ).toEqual({ scrolled: true, hidden: false });
  });

  it("keeps the compact state independent from visibility", () => {
    expect(nextHeaderState({ ...base, current: 30 })).toEqual({
      scrolled: true,
      hidden: false,
    });
  });
});
