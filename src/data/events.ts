import type { Lang } from "@lib/lang";

export type EventModality = "in-person" | "online" | "hybrid";

export type EventStatus =
  | "upcoming"
  | "past"
  | "cancelled"
  | "postponed"
  | "sold-out"
  | "draft"
  | "retired";

export interface ChamberEvent {
  id: string;
  slug: string;
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
  description: Record<Lang, string>;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  modality: EventModality;
  location: {
    name: string;
    city: string;
    address: string;
  };
  status: EventStatus;
  translations: Lang[];
  editorialStatus: "needs-review" | "approved";
  ctaLabel: Record<Lang, string>;
}

export const MODALITY_LABELS: Record<
  EventModality,
  Record<Lang, string>
> = {
  "in-person": { en: "In person", es: "Presencial" },
  online: { en: "Online", es: "En línea" },
  hybrid: { en: "Hybrid", es: "Híbrido" },
};

export const STATUS_LABELS: Record<EventStatus, Record<Lang, string>> = {
  upcoming: { en: "Upcoming", es: "Próximo" },
  past: { en: "Past event", es: "Evento pasado" },
  cancelled: { en: "Cancelled", es: "Cancelado" },
  postponed: { en: "Postponed", es: "Pospuesto" },
  "sold-out": { en: "Sold out", es: "Agotado" },
  draft: { en: "Draft", es: "Borrador" },
  retired: { en: "Retired", es: "Retirado" },
};

/**
 * Eventos heredados del proyecto local. Todos son pasados y requieren
 * revisión editorial; se muestran como archivo, nunca como próximos.
 */
export const EVENTS: ChamberEvent[] = [
  {
    id: "event-annual-gala-2025",
    slug: "annual-gala-2025",
    title: {
      en: "2025 Annual Gala",
      es: "Gala Anual 2025",
    },
    summary: {
      en: "An evening gathering for members and guests. Archived listing pending editorial confirmation.",
      es: "Una reunión nocturna para socios e invitados. Registro archivado pendiente de confirmación editorial.",
    },
    description: {
      en: "The Annual Gala brings members and guests together for an evening program. Details in this archived listing come from the local project and must be confirmed with the Chamber before being treated as a final record.",
      es: "La Gala Anual reúne a socios e invitados en un programa nocturno. Los detalles de este registro archivado provienen del proyecto local y deben confirmarse con la Cámara antes de tratarse como un registro definitivo.",
    },
    date: "2025-10-21",
    startTime: "19:00",
    endTime: "23:00",
    timezone: "America/New_York",
    modality: "hybrid",
    location: {
      name: "Venue to be confirmed",
      city: "New York City",
      address: "",
    },
    status: "past",
    translations: ["en", "es"],
    editorialStatus: "needs-review",
    ctaLabel: { en: "Ask about this event", es: "Consultar por este evento" },
  },
  {
    id: "event-latin-american-business-forum-2025",
    slug: "latin-american-business-forum-2025",
    title: {
      en: "Latin American Business Forum",
      es: "Foro de Negocios de América Latina",
    },
    summary: {
      en: "A forum on trade and economic opportunities between Latin America and the United States. Archived listing pending editorial confirmation.",
      es: "Un foro sobre comercio y oportunidades económicas entre América Latina y Estados Unidos. Registro archivado pendiente de confirmación editorial.",
    },
    description: {
      en: "Business leaders discuss trade and economic opportunities across the region. This archived listing comes from the local project and requires confirmation before being used as a final event record.",
      es: "Líderes empresariales conversan sobre comercio y oportunidades económicas en la región. Este registro archivado proviene del proyecto local y requiere confirmación antes de usarse como registro definitivo del evento.",
    },
    date: "2025-03-22",
    startTime: "08:00",
    endTime: "14:00",
    timezone: "America/New_York",
    modality: "hybrid",
    location: {
      name: "Miami Convention Center",
      city: "Miami",
      address: "400 SE 2nd Ave, Miami, FL",
    },
    status: "past",
    translations: ["en", "es"],
    editorialStatus: "needs-review",
    ctaLabel: { en: "Ask about this event", es: "Consultar por este evento" },
  },
  {
    id: "event-global-tech-summit-2024",
    slug: "global-tech-summit-2024",
    title: {
      en: "2024 Global Tech Summit",
      es: "Cumbre Global de Tecnología 2024",
    },
    summary: {
      en: "An international summit on technology and innovation. Archived listing pending editorial confirmation.",
      es: "Una cumbre internacional sobre tecnología e innovación. Registro archivado pendiente de confirmación editorial.",
    },
    description: {
      en: "An international summit focused on technology and innovation. This archived listing comes from the local project and requires confirmation before being used as a final event record.",
      es: "Una cumbre internacional enfocada en tecnología e innovación. Este registro archivado proviene del proyecto local y requiere confirmación antes de usarse como registro definitivo del evento.",
    },
    date: "2024-05-15",
    startTime: "09:00",
    endTime: "17:00",
    timezone: "America/Los_Angeles",
    modality: "in-person",
    location: {
      name: "Moscone Center",
      city: "San Francisco",
      address: "747 Howard St, San Francisco, CA",
    },
    status: "past",
    translations: ["en"],
    editorialStatus: "needs-review",
    ctaLabel: { en: "Ask about this event", es: "Consultar por este evento" },
  },
];

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^\d{2}:\d{2}$/;

export function isValidEvent(event: ChamberEvent): boolean {
  if (!DATE_PATTERN.test(event.date)) return false;
  if (Number.isNaN(Date.parse(`${event.date}T00:00:00Z`))) return false;
  if (!TIME_PATTERN.test(event.startTime) || !TIME_PATTERN.test(event.endTime)) {
    return false;
  }
  if (!event.timezone) return false;
  return true;
}

export function isPublicEvent(event: ChamberEvent): boolean {
  return (
    isValidEvent(event) &&
    event.status !== "draft" &&
    event.status !== "retired"
  );
}

export function hasTranslation(event: ChamberEvent, lang: Lang): boolean {
  return event.translations.includes(lang);
}

export function getPublicEvents(
  lang: Lang,
  events: ChamberEvent[] = EVENTS,
): ChamberEvent[] {
  return events.filter(
    (event) => isPublicEvent(event) && hasTranslation(event, lang),
  );
}

export function getEventBySlug(
  slug: string,
  lang: Lang,
  events: ChamberEvent[] = EVENTS,
): ChamberEvent | undefined {
  return getPublicEvents(lang, events).find((event) => event.slug === slug);
}

function startDate(event: ChamberEvent): Date {
  return new Date(`${event.date}T${event.startTime}:00`);
}

export function isUpcoming(event: ChamberEvent, now = new Date()): boolean {
  return event.status === "upcoming" && startDate(event) > now;
}

export function isPast(event: ChamberEvent, now = new Date()): boolean {
  return event.status === "past" || startDate(event) <= now;
}

export function getUpcomingEvents(
  lang: Lang,
  now = new Date(),
  events: ChamberEvent[] = EVENTS,
): ChamberEvent[] {
  return getPublicEvents(lang, events)
    .filter((event) => isUpcoming(event, now))
    .sort((a, b) => startDate(a).getTime() - startDate(b).getTime());
}

export function getPastEvents(
  lang: Lang,
  now = new Date(),
  events: ChamberEvent[] = EVENTS,
): ChamberEvent[] {
  return getPublicEvents(lang, events)
    .filter((event) => isPast(event, now))
    .sort((a, b) => startDate(b).getTime() - startDate(a).getTime());
}

export function formatEventDate(event: ChamberEvent, lang: Lang): string {
  const locale = lang === "es" ? "es-US" : "en-US";
  const start = new Date(`${event.date}T${event.startTime}:00`);
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: event.timezone,
    timeZoneName: "short",
  }).format(start);
}

export function formatEventEndTime(event: ChamberEvent, lang: Lang): string {
  const locale = lang === "es" ? "es-US" : "en-US";
  const end = new Date(`${event.date}T${event.endTime}:00`);
  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: event.timezone,
    timeZoneName: "short",
  }).format(end);
}
