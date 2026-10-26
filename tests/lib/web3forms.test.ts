import { describe, expect, it, vi } from "vitest";
import {
  buildMembershipPayload,
  createSubmitLock,
  submitToWeb3Forms,
} from "@lib/web3forms";
import type { MembershipFormValues } from "@lib/forms";

const values: MembershipFormValues = {
  firstName: "Ana",
  lastName: "García",
  email: "ana@example.com",
  company: "Example LLC",
  phone: "",
  membershipLevel: "gold",
  message: "Hello",
  consent: true,
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("buildMembershipPayload", () => {
  it("maps public fields and metadata without sensitive extras", () => {
    const payload = buildMembershipPayload(values, "es");
    expect(payload.name).toBe("Ana García");
    expect(payload.membership_level).toBe("gold");
    expect(payload.form_type).toBe("membership_interest");
    expect(payload.language).toBe("es");
    expect(payload.consent).toBe("yes");
  });
});

describe("submitToWeb3Forms", () => {
  it("requires semantic confirmation from the provider", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ success: true }));
    const result = await submitToWeb3Forms(
      { email: "ana@example.com" },
      { accessKey: "test-key", fetchImpl },
    );
    expect(result).toEqual({ status: "success" });
    expect(fetchImpl).toHaveBeenCalledOnce();
  });

  it("does not treat HTTP 200 without success:true as success", async () => {
    const fetchImpl = vi.fn(async () =>
      jsonResponse({ success: false, message: "Invalid key" }),
    );
    const result = await submitToWeb3Forms(
      { email: "ana@example.com" },
      { accessKey: "test-key", fetchImpl },
    );
    expect(result).toEqual({ status: "error", reason: "rejected" });
  });

  it("reports HTTP errors as rejected", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({}, 500));
    const result = await submitToWeb3Forms(
      { email: "ana@example.com" },
      { accessKey: "test-key", fetchImpl },
    );
    expect(result).toEqual({
      status: "error",
      reason: "rejected",
      httpStatus: 500,
    });
  });

  it("reports timeouts", async () => {
    const fetchImpl = vi.fn(
      (_input: RequestInfo | URL, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            reject(new DOMException("Aborted", "AbortError"));
          });
        }),
    );

    const result = await submitToWeb3Forms(
      { email: "ana@example.com" },
      { accessKey: "test-key", fetchImpl, timeoutMs: 5 },
    );
    expect(result).toEqual({ status: "error", reason: "timeout" });
  });

  it("reports network failures", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new TypeError("Failed to fetch");
    });
    const result = await submitToWeb3Forms(
      { email: "ana@example.com" },
      { accessKey: "test-key", fetchImpl },
    );
    expect(result).toEqual({ status: "error", reason: "network" });
  });

  it("does not call the provider without an access key", async () => {
    const fetchImpl = vi.fn();
    const result = await submitToWeb3Forms(
      { email: "ana@example.com" },
      { accessKey: "", fetchImpl },
    );
    expect(result).toEqual({ status: "error", reason: "not-configured" });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("silently ignores honeypot submissions", async () => {
    const fetchImpl = vi.fn();
    const result = await submitToWeb3Forms(
      { email: "bot@example.com", botcheck: "filled" },
      { accessKey: "test-key", fetchImpl },
    );
    expect(result).toEqual({ status: "ignored" });
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});

describe("createSubmitLock", () => {
  it("prevents a second submission while one is in flight", async () => {
    const lock = createSubmitLock();
    let release!: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const first = lock.run(async () => {
      await gate;
      return "first";
    });
    const second = lock.run(async () => "second");

    expect(await second).toBeUndefined();
    expect(lock.isLocked()).toBe(true);
    release();
    expect(await first).toBe("first");
    expect(lock.isLocked()).toBe(false);
  });
});
