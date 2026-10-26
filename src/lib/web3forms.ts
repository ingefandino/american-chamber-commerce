import type { Lang } from "./lang";
import type { MembershipFormValues } from "./forms";

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
export const DEFAULT_TIMEOUT_MS = 12_000;

export interface Web3FormsConfig {
  accessKey?: string;
  endpoint?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}

export type SubmitResult =
  | { status: "success" }
  | { status: "ignored" }
  | {
      status: "error";
      reason: "not-configured" | "network" | "timeout" | "rejected";
      httpStatus?: number;
    };

export interface MembershipPayload extends Record<string, string> {
  name: string;
  email: string;
  phone: string;
  company: string;
  membership_level: string;
  message: string;
  consent: string;
  form_type: string;
  language: string;
  subject: string;
  from_name: string;
  botcheck: string;
}

export function buildMembershipPayload(
  values: MembershipFormValues,
  lang: Lang,
  botcheck = "",
): MembershipPayload {
  const fullName = `${values.firstName.trim()} ${values.lastName.trim()}`.trim();
  return {
    name: fullName,
    email: values.email.trim(),
    phone: values.phone.trim(),
    company: values.company.trim(),
    membership_level: values.membershipLevel,
    message: values.message.trim(),
    consent: values.consent ? "yes" : "no",
    form_type: "membership_interest",
    language: lang,
    subject:
      lang === "es"
        ? "Nueva solicitud de membresía — American Chamber of Commerce"
        : "New membership request — American Chamber of Commerce",
    from_name: "American Chamber of Commerce website",
    botcheck,
  };
}

/**
 * Envía el formulario a Web3Forms y solo considera éxito cuando la respuesta
 * contiene `success: true`. Nunca registra el payload en consola.
 */
export async function submitToWeb3Forms(
  payload: Record<string, string>,
  config: Web3FormsConfig = {},
): Promise<SubmitResult> {
  if (payload.botcheck) {
    return { status: "ignored" };
  }

  const accessKey =
    config.accessKey ??
    (import.meta.env.PUBLIC_WEB3FORMS_KEY as string | undefined);

  if (!accessKey) {
    return { status: "error", reason: "not-configured" };
  }

  const controller = new AbortController();
  const timeoutMs = config.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const fetchImpl = config.fetchImpl ?? fetch;

  try {
    const response = await fetchImpl(config.endpoint ?? WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ access_key: accessKey, ...payload }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        status: "error",
        reason: "rejected",
        httpStatus: response.status,
      };
    }

    const data = (await response.json().catch(() => null)) as {
      success?: boolean;
    } | null;

    if (data?.success === true) {
      return { status: "success" };
    }

    return { status: "error", reason: "rejected" };
  } catch (error) {
    if ((error as Error)?.name === "AbortError") {
      return { status: "error", reason: "timeout" };
    }
    return { status: "error", reason: "network" };
  } finally {
    clearTimeout(timeout);
  }
}

export interface SubmitLock {
  isLocked: () => boolean;
  run: <T>(task: () => Promise<T>) => Promise<T | undefined>;
}

/** Evita envíos duplicados mientras una solicitud está en curso. */
export function createSubmitLock(): SubmitLock {
  let locked = false;
  return {
    isLocked: () => locked,
    async run<T>(task: () => Promise<T>): Promise<T | undefined> {
      if (locked) return undefined;
      locked = true;
      try {
        return await task();
      } finally {
        locked = false;
      }
    },
  };
}

export function buildContactPayload(
  values: {
    name: string;
    email: string;
    phone: string;
    topic: string;
    message: string;
    consent: boolean;
  },
  lang: Lang,
  botcheck = "",
): Record<string, string> {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    topic: values.topic,
    message: values.message.trim(),
    consent: values.consent ? "yes" : "no",
    form_type: "contact",
    language: lang,
    subject:
      lang === "es"
        ? "Nuevo mensaje de contacto — American Chamber of Commerce"
        : "New contact message — American Chamber of Commerce",
    from_name: "American Chamber of Commerce website",
    botcheck,
  };
}
