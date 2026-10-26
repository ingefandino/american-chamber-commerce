import { describe, expect, it } from "vitest";
import {
  buildEventRegistrationPayload,
  validateEventRegistration,
  type EventRegistrationValues,
} from "@lib/eventRegistration";

const valid: EventRegistrationValues = {
  firstName: "Ana",
  lastName: "García",
  email: "ana@example.com",
  company: "Example LLC",
  phone: "",
  guests: "2",
  message: "Looking forward to it.",
  consent: true,
  eventSlug: "annual-gala-2025",
  eventTitle: "2025 Annual Gala",
};

describe("validateEventRegistration", () => {
  it("accepts a valid request and shares primitives with membership", () => {
    expect(validateEventRegistration(valid, "en")).toEqual([]);
  });

  it("reuses the same email, consent, and name messages", () => {
    const errors = validateEventRegistration(
      { ...valid, firstName: "", email: "bad", consent: false },
      "es",
    );
    expect(errors.map((error) => error.field)).toEqual([
      "firstName",
      "email",
      "consent",
    ]);
    expect(errors[0].message).toBe("Este campo es obligatorio.");
    expect(errors[1].message).toContain("correo válido");
  });

  it("rejects guest counts outside 0–10", () => {
    expect(
      validateEventRegistration({ ...valid, guests: "11" }, "en"),
    ).toEqual([
      {
        field: "guests",
        message: "Enter a number of guests between 0 and 10.",
      },
    ]);
    expect(
      validateEventRegistration({ ...valid, guests: "abc" }, "en"),
    ).toHaveLength(1);
  });

  it("requires the event identifier", () => {
    const errors = validateEventRegistration(
      { ...valid, eventSlug: "" },
      "en",
    );
    expect(errors[0].field).toBe("eventSlug");
  });
});

describe("buildEventRegistrationPayload", () => {
  it("maps event context and shared contact fields", () => {
    const payload = buildEventRegistrationPayload(valid, "es");
    expect(payload.form_type).toBe("event_registration");
    expect(payload.event_slug).toBe("annual-gala-2025");
    expect(payload.event_title).toBe("2025 Annual Gala");
    expect(payload.guests).toBe("2");
    expect(payload.subject).toContain("Solicitud de evento");
  });
});
