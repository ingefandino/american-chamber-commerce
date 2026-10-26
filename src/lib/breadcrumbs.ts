import type { Lang } from "./lang";
import {
  localizedHref,
  matchRoute,
  type RouteKey,
} from "./routes";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

const SECTION_LABELS: Record<RouteKey, Record<Lang, string>> = {
  home: { en: "Home", es: "Inicio" },
  about: { en: "About", es: "Nosotros" },
  mission: { en: "Mission", es: "Misión" },
  leadership: { en: "Leadership", es: "Liderazgo" },
  governance: { en: "Governance", es: "Gobernanza" },
  membership: { en: "Membership", es: "Membresía" },
  benefits: { en: "Benefits", es: "Beneficios" },
  plans: { en: "Plans", es: "Planes" },
  apply: { en: "Apply", es: "Solicitud" },
  services: { en: "Services", es: "Servicios" },
  events: { en: "Events", es: "Eventos" },
  members: { en: "Directory", es: "Directorio" },
  advocacy: { en: "Advocacy", es: "Defensa" },
  news: { en: "News", es: "Noticias" },
  resources: { en: "Resources", es: "Recursos" },
  partners: { en: "Partners", es: "Alianzas" },
  sponsorship: { en: "Sponsorship", es: "Patrocinio" },
  contact: { en: "Contact", es: "Contacto" },
  privacy: { en: "Privacy", es: "Privacidad" },
  terms: { en: "Terms", es: "Términos" },
  accessibility: { en: "Accessibility", es: "Accesibilidad" },
};

const SECTION_OF: Record<RouteKey, RouteKey> = {
  home: "home",
  about: "about",
  mission: "about",
  leadership: "about",
  governance: "about",
  membership: "membership",
  benefits: "membership",
  plans: "membership",
  apply: "membership",
  services: "services",
  events: "events",
  members: "members",
  advocacy: "advocacy",
  news: "news",
  resources: "resources",
  partners: "partners",
  sponsorship: "partners",
  contact: "contact",
  privacy: "privacy",
  terms: "terms",
  accessibility: "accessibility",
};

/**
 * Breadcrumbs visibles y JSON-LD. La página actual es el último elemento.
 * No inventa secciones: usa el information architecture publicado.
 */
export function buildBreadcrumbs(
  pathname: string,
  lang: Lang,
  pageTitle: string,
): BreadcrumbItem[] {
  const match = matchRoute(pathname);
  if (!match || match.key === "home") return [];

  const sectionKey = SECTION_OF[match.key];
  if (sectionKey === "home") return [];

  const items: BreadcrumbItem[] = [
    {
      name: SECTION_LABELS.home[lang],
      href: localizedHref("home", lang),
    },
    {
      name: SECTION_LABELS[sectionKey][lang],
      href: localizedHref(sectionKey, lang),
    },
  ];

  const isSectionIndex =
    match.key === sectionKey && match.slug === undefined;

  if (!isSectionIndex) {
    items.push({
      name: pageTitle,
      href: pathname,
    });
  }

  return items;
}
