import type { Lang } from "@lib/lang";

export type PolicyLevel = "federal" | "state" | "local" | "international";
export type PolicyStatus = "priority" | "monitoring" | "position";

export interface PolicyItem {
  id: string;
  slug: string;
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
  level: PolicyLevel;
  status: PolicyStatus;
  date: string;
  source: {
    label: string;
    url: string;
    observedAt: string;
  };
  reviewStatus: "needs-review" | "approved";
  approvedPosition: Record<Lang, string> | null;
}

export const POLICY_LEVEL_LABELS: Record<
  PolicyLevel,
  Record<Lang, string>
> = {
  federal: { en: "Federal", es: "Federal" },
  state: { en: "State", es: "Estatal" },
  local: { en: "Local", es: "Local" },
  international: { en: "International", es: "Internacional" },
};

export const POLICY_STATUS_LABELS: Record<
  PolicyStatus,
  Record<Lang, string>
> = {
  priority: { en: "Policy priority", es: "Prioridad de política" },
  monitoring: { en: "Monitoring", es: "En seguimiento" },
  position: { en: "Approved position", es: "Posición aprobada" },
};

/**
 * Temas observados en el sitio público el 26 de octubre de 2026. No se
 * atribuye una postura legislativa concreta a la Cámara sin aprobación.
 */
export const POLICIES: PolicyItem[] = [
  {
    id: "policy-tax-fiscal",
    slug: "tax-and-fiscal-policy",
    title: {
      en: "Tax and fiscal policy",
      es: "Política fiscal y tributaria",
    },
    summary: {
      en: "The Chamber follows tax and fiscal proposals that affect business competitiveness and predictability. A specific legislative position has not been approved for publication.",
      es: "La Cámara sigue las propuestas fiscales y tributarias que afectan la competitividad y previsibilidad empresarial. No se ha aprobado una postura legislativa específica para publicación.",
    },
    level: "federal",
    status: "priority",
    date: "2026-10-26",
    source: {
      label: "American Chamber of Commerce public website",
      url: "https://americanchamberofcommerce.us/",
      observedAt: "2026-10-26",
    },
    reviewStatus: "needs-review",
    approvedPosition: null,
  },
  {
    id: "policy-infrastructure",
    slug: "infrastructure",
    title: { en: "Infrastructure", es: "Infraestructura" },
    summary: {
      en: "Transportation and digital infrastructure are tracked as conditions for business growth. The Chamber has not published an approved position on a specific project.",
      es: "La infraestructura de transporte y digital se sigue como condición para el crecimiento empresarial. La Cámara no ha publicado una postura aprobada sobre un proyecto específico.",
    },
    level: "federal",
    status: "priority",
    date: "2026-10-26",
    source: {
      label: "American Chamber of Commerce public website",
      url: "https://americanchamberofcommerce.us/",
      observedAt: "2026-10-26",
    },
    reviewStatus: "needs-review",
    approvedPosition: null,
  },
  {
    id: "policy-workforce",
    slug: "workforce-development",
    title: {
      en: "Workforce development",
      es: "Desarrollo de talento",
    },
    summary: {
      en: "Training and talent pipelines are a stated area of focus. No specific program endorsement or funding position is published.",
      es: "La capacitación y las rutas de talento son un área de enfoque declarada. No se publica un respaldo a un programa específico ni una postura sobre financiamiento.",
    },
    level: "federal",
    status: "priority",
    date: "2026-10-26",
    source: {
      label: "American Chamber of Commerce public website",
      url: "https://americanchamberofcommerce.us/",
      observedAt: "2026-10-26",
    },
    reviewStatus: "needs-review",
    approvedPosition: null,
  },
  {
    id: "policy-trade",
    slug: "trade",
    title: { en: "Trade", es: "Comercio" },
    summary: {
      en: "Open, fair international trade is presented as a general priority. The Chamber has not published an approved position on a specific agreement.",
      es: "El comercio internacional abierto y justo se presenta como una prioridad general. La Cámara no ha publicado una postura aprobada sobre un acuerdo específico.",
    },
    level: "international",
    status: "priority",
    date: "2026-10-26",
    source: {
      label: "American Chamber of Commerce public website",
      url: "https://americanchamberofcommerce.us/",
      observedAt: "2026-10-26",
    },
    reviewStatus: "needs-review",
    approvedPosition: null,
  },
];

export function getPolicyBySlug(
  slug: string,
  policies: PolicyItem[] = POLICIES,
): PolicyItem | undefined {
  return policies.find((policy) => policy.slug === slug);
}
