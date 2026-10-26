import { describe, expect, it } from "vitest";
import {
  LANGUAGE_SCROLL_MAX_AGE,
  createLanguageScrollRecord,
  isLanguageScrollRecordFresh,
  parseLanguageScrollRecord,
  scrollRatio,
  scrollTopForRatio,
  shouldRestoreLanguageScroll,
} from "@lib/scrollRestoration";

describe("language scroll restoration", () => {
  it("computes a proportional position from 0 to 1", () => {
    expect(scrollRatio(0, 3000, 1000)).toBe(0);
    expect(scrollRatio(1000, 3000, 1000)).toBe(0.5);
    expect(scrollRatio(2000, 3000, 1000)).toBe(1);
    expect(scrollRatio(4000, 3000, 1000)).toBe(1);
    expect(scrollRatio(500, 900, 1000)).toBe(0);
  });

  it("maps the ratio to the target page height", () => {
    expect(scrollTopForRatio(0.5, 3000, 1000)).toBe(1000);
    expect(scrollTopForRatio(1, 700, 1000)).toBe(0);
    expect(scrollTopForRatio(2, 3000, 1000)).toBe(2000);
    expect(scrollTopForRatio(Number.NaN, 3000, 1000)).toBe(0);
  });

  it("creates a record with the current ratio and timestamp", () => {
    const record = createLanguageScrollRecord({
      from: "/en/about/",
      target: "/es/about/",
      scrollY: 750,
      scrollHeight: 3000,
      viewportHeight: 1000,
      placement: "footer",
      now: 1000,
    });

    expect(record).toEqual({
      from: "/en/about/",
      target: "/es/about/",
      ratio: 0.375,
      placement: "footer",
      createdAt: 1000,
    });
  });

  it("parses valid records and rejects malformed values", () => {
    const record = {
      from: "/en/",
      target: "/es/",
      ratio: 0.4,
      placement: "header",
      createdAt: 1000,
    };

    expect(parseLanguageScrollRecord(JSON.stringify(record))).toEqual(record);
    expect(parseLanguageScrollRecord(null)).toBeNull();
    expect(parseLanguageScrollRecord("nope")).toBeNull();
    expect(
      parseLanguageScrollRecord(JSON.stringify({ ...record, target: "http://x" })),
    ).toBeNull();
    expect(
      parseLanguageScrollRecord(JSON.stringify({ ...record, ratio: 1.2 })),
    ).toBeNull();
    expect(
      parseLanguageScrollRecord(JSON.stringify({ ...record, placement: "" })),
    ).toBeNull();
  });

  it("accepts fresh records for the current path only", () => {
    const record = {
      from: "/en/",
      target: "/es/",
      ratio: 0.4,
      placement: "header",
      createdAt: 1000,
    };

    expect(isLanguageScrollRecordFresh(record, 2000)).toBe(true);
    expect(
      isLanguageScrollRecordFresh(record, 1000 + LANGUAGE_SCROLL_MAX_AGE + 1),
    ).toBe(false);
    expect(isLanguageScrollRecordFresh(record, 999)).toBe(false);
    expect(shouldRestoreLanguageScroll(record, "/es/", 2000)).toBe(true);
    expect(shouldRestoreLanguageScroll(record, "/es/contact/", 2000)).toBe(
      false,
    );
    expect(
      shouldRestoreLanguageScroll(
        record,
        "/es/",
        1000 + LANGUAGE_SCROLL_MAX_AGE + 1,
      ),
    ).toBe(false);
    expect(shouldRestoreLanguageScroll(null, "/es/", 2000)).toBe(false);
  });
});
