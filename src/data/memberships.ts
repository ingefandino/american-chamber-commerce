import type { Lang } from "@lib/lang";
import { slugify } from "@lib/slug";
import enData from "@assets/data/en-memberships.json";
import esData from "@assets/data/es-memberships.json";

export const MEMBERSHIP_CATEGORIES = [
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
] as const;

export type MembershipCategory = (typeof MEMBERSHIP_CATEGORIES)[number];

type JsonPlan = (typeof enData.memberships)[number] & {
  benefits?: Record<string, string | number | boolean>;
};

const BENEFIT_KEYS = [
  "publications_access",
  "job_portal_access",
  "visa_processing_priority",
  "offers_discounts",
  "fda_advisory",
  "event_invitations",
  "service_discounts",
  "newsletter_announcements",
  "business_promotion",
  "event_guests_allowed",
  "logo_webpage",
  "vip_invitations",
  "newsletter_publications",
  "email_marketing_service",
  "office_space_access",
  "annual_meeting_invitation",
  "custom_webinars",
  "annual_gala_access",
  "event_participation",
] as const;

type BenefitKey = (typeof BENEFIT_KEYS)[number];

const BENEFIT_LABELS: Record<BenefitKey, Record<Lang, string>> = {
  publications_access: {
    en: "Publications access",
    es: "Acceso a publicaciones",
  },
  job_portal_access: {
    en: "Job portal access",
    es: "Acceso al portal de empleo",
  },
  visa_processing_priority: {
    en: "Visa processing assistance",
    es: "Asistencia en procesamiento de visas",
  },
  offers_discounts: {
    en: "Member offers and discounts",
    es: "Ofertas y descuentos para socios",
  },
  fda_advisory: {
    en: "FDA advisory and updates",
    es: "Asesoría y actualizaciones FDA",
  },
  event_invitations: {
    en: "Invitations to Chamber events",
    es: "Invitaciones a eventos de la Cámara",
  },
  service_discounts: {
    en: "Discounts on Chamber services",
    es: "Descuentos en servicios de la Cámara",
  },
  newsletter_announcements: {
    en: "Announcements in the member newsletter",
    es: "Anuncios en el newsletter de socios",
  },
  business_promotion: {
    en: "Promotion at board meetings",
    es: "Promoción en reuniones de directorio",
  },
  event_guests_allowed: {
    en: "Guests allowed per event",
    es: "Invitados permitidos por evento",
  },
  logo_webpage: {
    en: "Company logo on the website",
    es: "Logotipo de la empresa en el sitio web",
  },
  vip_invitations: {
    en: "VIP invitations to exclusive events",
    es: "Invitaciones VIP a eventos exclusivos",
  },
  newsletter_publications: {
    en: "Articles and news in the newsletter",
    es: "Artículos y noticias en el newsletter",
  },
  email_marketing_service: {
    en: "Personalized email marketing",
    es: "Email marketing personalizado",
  },
  office_space_access: {
    en: "Meeting room access in New York",
    es: "Acceso a salas de reuniones en Nueva York",
  },
  annual_meeting_invitation: {
    en: "Annual meeting invitation",
    es: "Invitación a la reunión anual",
  },
  custom_webinars: {
    en: "Custom webinars",
    es: "Webinars personalizados",
  },
  annual_gala_access: {
    en: "Annual Gala access",
    es: "Acceso a la Gala Anual",
  },
  event_participation: {
    en: "Participation in Chamber events",
    es: "Participación en eventos de la Cámara",
  },
};

const AUDIENCE: Record<MembershipCategory, Record<Lang, string>> = {
  Silver: {
    en: "For independent professionals and small teams beginning to build their network.",
    es: "Para profesionales independientes y equipos pequeños que comienzan a construir su red.",
  },
  Gold: {
    en: "For growing companies that want more visibility and priority access.",
    es: "Para empresas en crecimiento que buscan mayor visibilidad y acceso prioritario.",
  },
  Platinum: {
    en: "For established companies that need deeper engagement and VIP access.",
    es: "Para empresas consolidadas que necesitan mayor participación y acceso VIP.",
  },
  Diamond: {
    en: "For organizations seeking maximum visibility and a patron presence.",
    es: "Para organizaciones que buscan máxima visibilidad y presencia como patrocinador.",
  },
};

const HIGHLIGHTS: Record<MembershipCategory, Record<Lang, string[]>> = {
  Silver: {
    en: [
      "Company logo with a direct link on the Chamber website",
      "Invitations to all Chamber-organized events",
      "Up to 5 guests at events",
      "Limited access to meeting rooms in New York",
    ],
    es: [
      "Logotipo con enlace directo en el sitio web de la Cámara",
      "Invitaciones a todos los eventos organizados por la Cámara",
      "Hasta 5 invitados en eventos",
      "Acceso limitado a salas de reuniones en Nueva York",
    ],
  },
  Gold: {
    en: [
      "Priority registration for Chamber events",
      "Company logo with a direct link on the website",
      "Two tickets to the Annual Gala",
      "Up to 5 guests at events",
    ],
    es: [
      "Registro prioritario en eventos de la Cámara",
      "Logotipo con enlace directo en el sitio web",
      "Dos entradas para la Gala Anual",
      "Hasta 5 invitados en eventos",
    ],
  },
  Platinum: {
    en: [
      "VIP invitations to exclusive events",
      "Unlimited access to meeting rooms in New York",
      "Articles and news in the member newsletter",
      "Up to 10 guests at events",
    ],
    es: [
      "Invitaciones VIP a eventos exclusivos",
      "Acceso ilimitado a salas de reuniones en Nueva York",
      "Artículos y noticias en el newsletter de socios",
      "Hasta 10 invitados en eventos",
    ],
  },
  Diamond: {
    en: [
      "Patron table at the Annual Gala",
      "Maximum visa processing priority",
      "No annual limit on custom webinars",
      "Up to 10 guests at events",
    ],
    es: [
      "Mesa Patron en la Gala Anual",
      "Prioridad máxima en procesamiento de visas",
      "Sin límite anual de webinars personalizados",
      "Hasta 10 invitados en eventos",
    ],
  },
};

export interface Benefit {
  key: BenefitKey;
  label: Record<Lang, string>;
  description: Record<Lang, string>;
  value: boolean | number;
}

export interface MembershipPlan {
  id: string;
  slug: string;
  name: MembershipCategory;
  audience: Record<Lang, string>;
  price: number;
  currency: "USD";
  billingCycle: "annual";
  priceEffectiveAt: string;
  priceStatus: "confirmed";
  featured: boolean;
  displayOrder: number;
  status: "published";
  highlights: Record<Lang, string[]>;
  benefits: Benefit[];
  cta: { key: "apply" | "contact"; labels: Record<Lang, string> };
}

function toPlan(category: MembershipCategory, order: number): MembershipPlan {
  const enPlan = enData.memberships.find(
    (plan) => plan.category === category,
  ) as JsonPlan | undefined;
  const esPlan = esData.memberships.find(
    (plan) => plan.category === category,
  ) as JsonPlan | undefined;

  if (!enPlan || !esPlan) {
    throw new Error(`Membership plan "${category}" is missing from local data`);
  }

  const benefits: Benefit[] = BENEFIT_KEYS.map((key) => {
    const boolValue = enPlan.benefits?.[`${key}_bool`];
    return {
      key,
      label: BENEFIT_LABELS[key],
      description: {
        en: String(enPlan.benefits?.[key] ?? ""),
        es: String(esPlan.benefits?.[key] ?? ""),
      },
      value:
        typeof boolValue === "number"
          ? boolValue
          : boolValue === true,
    };
  });

  return {
    id: `membership-${slugify(category)}`,
    slug: slugify(category),
    name: category,
    audience: AUDIENCE[category],
    price: enPlan.price_usd,
    currency: enPlan.currency as "USD",
    billingCycle: enPlan.billing_cycle as "annual",
    priceEffectiveAt: "2026-10-26",
    priceStatus: "confirmed",
    featured: category === "Platinum",
    displayOrder: order,
    status: "published",
    highlights: HIGHLIGHTS[category],
    benefits,
    cta: {
      key: category === "Diamond" ? "contact" : "apply",
      labels:
        category === "Diamond"
          ? { en: "Contact us", es: "Contáctanos" }
          : { en: "Apply for this level", es: "Solicitar este nivel" },
    },
  };
}

export const MEMBERSHIP_PLANS: MembershipPlan[] = MEMBERSHIP_CATEGORIES.map(
  (category, index) => toPlan(category, index + 1),
);

export function getPlanBySlug(slug: string): MembershipPlan | undefined {
  return MEMBERSHIP_PLANS.find((plan) => plan.slug === slug);
}

/** Etiqueta legible para una celda de la tabla comparativa. */
export function formatBenefitValue(
  value: boolean | number,
  lang: Lang,
): string {
  if (typeof value === "number") {
    return lang === "es" ? `${value} invitados` : `${value} guests`;
  }
  if (value) return lang === "es" ? "Incluido" : "Included";
  return lang === "es" ? "No incluido" : "Not included";
}
