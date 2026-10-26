// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import {
  focusFirstError,
  readMembershipForm,
  validateMembershipForm,
  type MembershipFormValues,
} from "@lib/forms";

const valid: MembershipFormValues = {
  firstName: "Ana",
  lastName: "García",
  email: "ana@example.com",
  company: "Example LLC",
  phone: "+1 212 555 0100",
  membershipLevel: "gold",
  message: "We would like to learn more about membership.",
  consent: true,
};

describe("validateMembershipForm", () => {
  it("accepts a complete, valid request", () => {
    expect(validateMembershipForm(valid, "en")).toEqual([]);
  });

  it("returns a clear message for every invalid required field", () => {
    const errors = validateMembershipForm(
      {
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        phone: "",
        membershipLevel: "",
        message: "",
        consent: false,
      },
      "en",
    );

    expect(errors.map((error) => error.field)).toEqual([
      "firstName",
      "lastName",
      "email",
      "company",
      "membershipLevel",
      "consent",
    ]);
    expect(errors.every((error) => error.message.length > 0)).toBe(true);
  });

  it("validates email format and optional phone format", () => {
    const errors = validateMembershipForm(
      { ...valid, email: "not-an-email", phone: "abc" },
      "es",
    );
    expect(errors.map((error) => error.field)).toEqual(["email", "phone"]);
    expect(errors[0].message).toContain("correo válido");
  });

  it("allows an empty optional phone", () => {
    expect(validateMembershipForm({ ...valid, phone: "" }, "en")).toEqual([]);
  });

  it("limits the message length", () => {
    const errors = validateMembershipForm(
      { ...valid, message: "x".repeat(801) },
      "en",
    );
    expect(errors).toEqual([
      {
        field: "message",
        message: "Keep your message under 800 characters.",
      },
    ]);
  });
});

describe("focusFirstError", () => {
  it("focuses the first invalid field in error order", () => {
    document.body.innerHTML = `
      <form>
        <input name="firstName" />
        <input name="email" />
      </form>
    `;
    const form = document.querySelector("form")!;
    focusFirstError(form, [
      { field: "email", message: "Required" },
      { field: "firstName", message: "Required" },
    ]);
    expect(document.activeElement).toBe(
      form.querySelector('[name="email"]'),
    );
  });
});


describe("readMembershipForm", () => {
  it("reads values and the consent checkbox without persisting them", () => {
    document.body.innerHTML = `
      <form>
        <input name="firstName" value="Ana" />
        <input name="lastName" value="García" />
        <input name="email" value="ana@example.com" />
        <input name="company" value="Example LLC" />
        <input name="phone" value="" />
        <select name="membershipLevel"><option value="gold" selected>Gold</option></select>
        <textarea name="message">Hello</textarea>
        <input type="checkbox" name="consent" value="yes" checked />
      </form>
    `;
    const values = readMembershipForm(document.querySelector("form")!);
    expect(values.firstName).toBe("Ana");
    expect(values.membershipLevel).toBe("gold");
    expect(values.consent).toBe(true);
  });
});
