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

export interface FormError {
  field: MembershipField;
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

/**
 * Validación pura del formulario de interés de membresía. No accede al DOM
 * ni a la red: el envío solo puede ejecutarse cuando devuelve cero errores.
 */
export function validateMembershipForm(
  values: MembershipFormValues,
  lang: Lang = "en",
): FormError[] {
  const errors: FormError[] = [];
  const messages = MESSAGES[lang];

  if (trimmed(values.firstName).length < 2) {
    errors.push({
      field: "firstName",
      message:
        trimmed(values.firstName).length === 0
          ? messages.required
          : messages.nameLength,
    });
  }

  if (trimmed(values.lastName).length < 2) {
    errors.push({
      field: "lastName",
      message:
        trimmed(values.lastName).length === 0
          ? messages.required
          : messages.nameLength,
    });
  }

  const email = trimmed(values.email);
  if (!email) {
    errors.push({ field: "email", message: messages.required });
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.push({ field: "email", message: messages.email });
  }

  if (trimmed(values.company).length < 2) {
    errors.push({
      field: "company",
      message:
        trimmed(values.company).length === 0
          ? messages.required
          : messages.companyLength,
    });
  }

  const phone = trimmed(values.phone);
  if (phone && !PHONE_PATTERN.test(phone)) {
    errors.push({ field: "phone", message: messages.phone });
  }

  if (!trimmed(values.membershipLevel)) {
    errors.push({ field: "membershipLevel", message: messages.level });
  }

  if (trimmed(values.message).length > 800) {
    errors.push({ field: "message", message: messages.messageLength });
  }

  if (!values.consent) {
    errors.push({ field: "consent", message: messages.consent });
  }

  return errors;
}

/** Mueve el foco al primer campo inválido en el orden de los errores. */
export function focusFirstError(
  form: HTMLFormElement,
  errors: FormError[],
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
