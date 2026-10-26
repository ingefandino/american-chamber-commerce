import { describe, expect, it } from "vitest";
import {
  EVENTS,
  formatEventDate,
  getEventBySlug,
  getPastEvents,
  getPublicEvents,
  getUpcomingEvents,
  isPublicEvent,
  isUpcoming,
  type ChamberEvent,
} from "@data/events";

const now = new Date("2026-10-26T12:00:00Z");

describe("events data", () => {
  it("never presents archived events as upcoming", () => {
    expect(getUpcomingEvents("en", now)).toEqual([]);
    expect(getPastEvents("en", now).length).toBe(3);
    expect(getPastEvents("es", now).length).toBe(2);
  });

  it("drops events without a translation for the current language", () => {
    const slugs = getPublicEvents("es").map((event) => event.slug);
    expect(slugs).not.toContain("global-tech-summit-2024");
    expect(getEventBySlug("global-tech-summit-2024", "es")).toBeUndefined();
  });

  it("rejects invalid dates and retired events", () => {
    const invalid: ChamberEvent = {
      ...EVENTS[0],
      id: "invalid",
      slug: "invalid",
      date: "not-a-date",
    };
    const retired: ChamberEvent = {
      ...EVENTS[0],
      id: "retired",
      slug: "retired",
      status: "retired",
    };
    expect(isPublicEvent(invalid)).toBe(false);
    expect(isPublicEvent(retired)).toBe(false);
  });

  it("detects a genuinely upcoming event", () => {
    const upcoming: ChamberEvent = {
      ...EVENTS[0],
      id: "future",
      slug: "future",
      date: "2027-06-10",
      status: "upcoming",
    };
    expect(isUpcoming(upcoming, now)).toBe(true);
    expect(getUpcomingEvents("en", now, [upcoming])).toHaveLength(1);
  });

  it("formats the date, time, and time zone as visible text", () => {
    const event = EVENTS[0];
    const formatted = formatEventDate(event, "en");
    expect(formatted).toContain("2025");
    expect(formatted).toContain("EDT");
  });
});
