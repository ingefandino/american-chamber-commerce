import { describe, expect, it } from "vitest";
import {
  BACK_TO_TOP_THRESHOLD,
  scrollBehavior,
  shouldShowBackToTop,
} from "@lib/scroll";

describe("scroll helpers", () => {
  it("shows the button only after the threshold", () => {
    expect(shouldShowBackToTop(0)).toBe(false);
    expect(shouldShowBackToTop(BACK_TO_TOP_THRESHOLD)).toBe(false);
    expect(shouldShowBackToTop(BACK_TO_TOP_THRESHOLD + 1)).toBe(true);
    expect(shouldShowBackToTop(100, 50)).toBe(true);
  });

  it("uses instant scrolling when reduced motion is requested", () => {
    expect(scrollBehavior(true)).toBe("auto");
    expect(scrollBehavior(false)).toBe("smooth");
  });
});
