import type { Lang } from "./lang";
import {
  consentError,
  emailError,
  messageError,
  nameError,
  phoneError,
  type FormError,
} from "./forms";

export interface EventRegistrationValues {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  guests: string;
  message: string;
  consent: boolean;
  eventSlug: string;
  eventTitle: string;
}

export type EventRegistrationField = keyof EventRegistrationValues;

const GUEST_MESSAGES: Record<Lang, string> = {
  en: "Enter a number of guests between 0 and 10.",
  es: "Ingresa un número de invitados entre 0 y 10.",
};

const EVENT_REQUIRED: Record<Lang, string> = {
  en: "Select an event before sending the form.",
  es: "Selecciona un evento antes de enviar el formulario.",
};

/** Validación del registro de evento reutilizando las primitivas comunes. */
export function validateEventRegistration(
  values: EventRegistrationValues,
  lang: Lang = "en",
): FormError<EventRegistrationField>[] {
  const errors: FormError<EventRegistrationField>[] = [];

  const firstName = nameError(values.firstName, lang);
  if (firstName) errors.push({ field: "firstName", message: firstName });

  const lastName = nameError(values.lastName, lang);
  if (lastName) errors.push({ field: "lastName", message: lastName });

  const email = emailError(values.email, lang);
  if (email) errors.push({ field: "email", message: email });

  const phone = phoneError(values.phone, lang);
  if (phone) errors.push({ field: "phone", message: phone });

  const guests = values.guests.trim();
  if (guests) {
    const parsed = Number(guests);
    if (
      !/^\d+$/.test(guests) ||
      !Number.isInteger(parsed) ||
      parsed < 0 ||
      parsed > 10
    ) {
      errors.push({ field: "guests", message: GUEST_MESSAGES[lang] });
    }
  }

  const message = messageError(values.message, lang);
  if (message) errors.push({ field: "message", message });

  const consent = consentError(values.consent, lang);
  if (consent) errors.push({ field: "consent", message: consent });

  if (!values.eventSlug.trim()) {
    errors.push({ field: "eventSlug", message: EVENT_REQUIRED[lang] });
  }

  return errors;
}

export function readEventRegistrationForm(
  form: HTMLFormElement,
): EventRegistrationValues {
  const data = new FormData(form);
  return {
    firstName: String(data.get("firstName") ?? ""),
    lastName: String(data.get("lastName") ?? ""),
    email: String(data.get("email") ?? ""),
    company: String(data.get("company") ?? ""),
    phone: String(data.get("phone") ?? ""),
    guests: String(data.get("guests") ?? ""),
    message: String(data.get("message") ?? ""),
    consent: data.get("consent") === "yes",
    eventSlug: String(data.get("eventSlug") ?? ""),
    eventTitle: String(data.get("eventTitle") ?? ""),
  };
}

export function buildEventRegistrationPayload(
  values: EventRegistrationValues,
  lang: Lang,
  botcheck = "",
): Record<string, string> {
  const fullName = `${values.firstName.trim()} ${values.lastName.trim()}`.trim();
  return {
    name: fullName,
    email: values.email.trim(),
    phone: values.phone.trim(),
    company: values.company.trim(),
    message: values.message.trim(),
    consent: values.consent ? "yes" : "no",
    form_type: "event_registration",
    language: lang,
    subject:
      lang === "es"
        ? `Solicitud de evento — ${values.eventTitle}`
        : `Event request — ${values.eventTitle}`,
    from_name: "American Chamber of Commerce website",
    botcheck,
    event_slug: values.eventSlug.trim(),
    event_title: values.eventTitle.trim(),
    guests: values.guests.trim(),
  };
}
