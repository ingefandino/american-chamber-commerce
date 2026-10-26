import type { Lang } from "@lib/lang";

/** Textos de interfaz compartidos por header y menú móvil. */
export const HEADER_UI = {
  en: {
    primaryNav: "Primary navigation",
    mobileNav: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "American Chamber of Commerce — home",
    logoAlt: "American Chamber of Commerce",
  },
  es: {
    primaryNav: "Navegación principal",
    mobileNav: "Navegación móvil",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    home: "American Chamber of Commerce — inicio",
    logoAlt: "American Chamber of Commerce",
  },
} as const satisfies Record<Lang, Record<string, string>>;
