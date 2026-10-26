import type { Lang } from "./lang";

export interface MembershipFormValues {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  membershipLevel: string;
  message: string;
  consent: boolean;
}

export type MembershipField = keyof MembershipFormValues;

export interface FormError<TField extends string = string> {
  field: TField;
  message: string;
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_PATTERN = /^[+()\d\s.-]{7,25}$/;

type Messages = Record<
  | "required"
  | "email"
  | "phone"
  | "level"
  | "consent"
  | "messageLength"
  | "nameLength"
  | "companyLength",
  string
>;

const MESSAGES: Record<Lang, Messages> = {
  en: {
    required: "This field is required.",
    email: "Enter a valid email address, for example name@company.com.",
    phone: "Enter a valid phone number or leave this field empty.",
    level: "Select a membership level or choose “Not sure yet”.",
    consent: "Please confirm that we may contact you about your request.",
    messageLength: "Keep your message under 800 characters.",
    nameLength: "Use at least 2 characters.",
    companyLength: "Enter your company name (at least 2 characters).",
  },
  es: {
    required: "Este campo es obligatorio.",
    email: "Ingresa un correo válido, por ejemplo nombre@empresa.com.",
    phone: "Ingresa un teléfono válido o deja el campo vacío.",
    level: "Selecciona un nivel de membresía o elige “Aún no estoy seguro”.",
    consent: "Confirma que podemos contactarte sobre tu solicitud.",
    messageLength: "Mantén tu mensaje por debajo de 800 caracteres.",
    nameLength: "Usa al menos 2 caracteres.",
    companyLength: "Ingresa el nombre de tu empresa (al menos 2 caracteres).",
  },
};

const trimmed = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

export function nameError(
  value: string,
  lang: Lang = "en",
): string | null {
  const messages = MESSAGES[lang];
  const clean = trimmed(value);
  if (!clean) return messages.required;
  if (clean.length < 2) return messages.nameLength;
  return null;
}

export function emailError(
  value: string,
  lang: Lang = "en",
): string | null {
  const messages = MESSAGES[lang];
  const clean = trimmed(value);
  if (!clean) return messages.required;
  if (!EMAIL_PATTERN.test(clean)) return messages.email;
  return null;
}

export function phoneError(
  value: string,
  lang: Lang = "en",
): string | null {
  const clean = trimmed(value);
  if (!clean) return null;
  return PHONE_PATTERN.test(clean) ? null : MESSAGES[lang].phone;
}

export function messageError(
  value: string,
  lang: Lang = "en",
): string | null {
  return trimmed(value).length > 800 ? MESSAGES[lang].messageLength : null;
}

export function consentError(
  value: boolean,
  lang: Lang = "en",
): string | null {
  return value ? null : MESSAGES[lang].consent;
}

/**
 * Validación pura del formulario de interés de membresía. No accede al DOM
 * ni a la red: el envío solo puede ejecutarse cuando devuelve cero errores.
 */
export function validateMembershipForm(
  values: MembershipFormValues,
  lang: Lang = "en",
): FormError<MembershipField>[] {
  const errors: FormError<MembershipField>[] = [];
  const messages = MESSAGES[lang];

  const firstName = nameError(values.firstName, lang);
  if (firstName) errors.push({ field: "firstName", message: firstName });

  const lastName = nameError(values.lastName, lang);
  if (lastName) errors.push({ field: "lastName", message: lastName });

  const email = emailError(values.email, lang);
  if (email) errors.push({ field: "email", message: email });

  const company = trimmed(values.company);
  if (!company) {
    errors.push({ field: "company", message: messages.required });
  } else if (company.length < 2) {
    errors.push({ field: "company", message: messages.companyLength });
  }

  const phone = phoneError(values.phone, lang);
  if (phone) errors.push({ field: "phone", message: phone });

  if (!trimmed(values.membershipLevel)) {
    errors.push({ field: "membershipLevel", message: messages.level });
  }

  const message = messageError(values.message, lang);
  if (message) errors.push({ field: "message", message });

  const consent = consentError(values.consent, lang);
  if (consent) errors.push({ field: "consent", message: consent });

  return errors;
}

/** Mueve el foco al primer campo inválido en el orden de los errores. */
export function focusFirstError(
  form: HTMLFormElement,
  errors: ReadonlyArray<FormError>,
): void {
  for (const error of errors) {
    const field = form.querySelector<HTMLElement>(`[name="${error.field}"]`);
    if (field) {
      field.focus();
      return;
    }
  }
}

/** Lee los valores del formulario sin persistir nada en el navegador. */
export function readMembershipForm(form: HTMLFormElement): MembershipFormValues {
  const data = new FormData(form);
  return {
    firstName: String(data.get("firstName") ?? ""),
    lastName: String(data.get("lastName") ?? ""),
    email: String(data.get("email") ?? ""),
    company: String(data.get("company") ?? ""),
    phone: String(data.get("phone") ?? ""),
    membershipLevel: String(data.get("membershipLevel") ?? ""),
    message: String(data.get("message") ?? ""),
    consent: data.get("consent") === "yes",
  };
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  consent: boolean;
}

export type ContactField = keyof ContactFormValues;

export function validateContactForm(
  values: ContactFormValues,
  lang: Lang = "en",
): FormError<ContactField>[] {
  const errors: FormError<ContactField>[] = [];
  const messages = MESSAGES[lang];

  const name = nameError(values.name, lang);
  if (name) errors.push({ field: "name", message: name });

  const email = emailError(values.email, lang);
  if (email) errors.push({ field: "email", message: email });

  const phone = phoneError(values.phone, lang);
  if (phone) errors.push({ field: "phone", message: phone });

  if (!trimmed(values.message)) {
    errors.push({ field: "message", message: messages.required });
  } else {
    const message = messageError(values.message, lang);
    if (message) errors.push({ field: "message", message });
  }

  const consent = consentError(values.consent, lang);
  if (consent) errors.push({ field: "consent", message: consent });

  return errors;
}

export function readContactForm(form: HTMLFormElement): ContactFormValues {
  const data = new FormData(form);
  return {
    name: String(data.get("name") ?? ""),
    email: String(data.get("email") ?? ""),
    phone: String(data.get("phone") ?? ""),
    topic: String(data.get("topic") ?? "general"),
    message: String(data.get("message") ?? ""),
    consent: data.get("consent") === "yes",
  };
}
