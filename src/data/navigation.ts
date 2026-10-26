import type { Lang } from "@lib/lang";
import type { RouteKey } from "@lib/routes";

export interface NavItem {
  key: RouteKey;
  labels: Record<Lang, string>;
}

/** Una sola definición estructural: las URLs se derivan del idioma actual. */
export const MAIN_NAV: readonly NavItem[] = [
  {
    key: "about",
    labels: { en: "About", es: "Nosotros" },
  },
  {
    key: "services",
    labels: { en: "Services", es: "Servicios" },
  },
  {
    key: "membership",
    labels: { en: "Membership", es: "Membresías" },
  },
  {
    key: "events",
    labels: { en: "Events", es: "Eventos" },
  },
  {
    key: "members",
    labels: { en: "Directory", es: "Directorio" },
  },
  {
    key: "advocacy",
    labels: { en: "Advocacy", es: "Defensa" },
  },
  {
    key: "news",
    labels: { en: "News", es: "Noticias" },
  },
  {
    key: "contact",
    labels: { en: "Contact", es: "Contacto" },
  },
] as const;

export const PRIMARY_CTA = {
  key: "plans" as RouteKey,
  labels: {
    en: "Become a Member",
    es: "Hazte socio",
  } satisfies Record<Lang, string>,
};
