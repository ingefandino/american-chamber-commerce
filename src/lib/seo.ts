import { DEFAULT_LANG, LANGS, type Lang } from "./lang";
import { equivalentHref } from "./routes";

export const SITE_URL = "https://americanchamberofcommerce.us";
export const SITE_NAME = "American Chamber of Commerce";

export interface AlternateLink {
  hreflang: Lang | "x-default";
  href: string;
}

export function absoluteUrl(pathname: string, site: string | URL = SITE_URL): string {
  return new URL(pathname, site).toString();
}

export function formatTitle(title: string, siteName: string = SITE_NAME): string {
  const clean = title.trim();
  if (!clean) return siteName;
  if (clean.toLowerCase().includes(siteName.toLowerCase())) return clean;
  return `${clean} | ${siteName}`;
}

/**
 * Enlaces alternativos para una ruta publicada. Solo incluye idiomas cuya
 * ruta equivalente existe y añade `x-default` cuando el idioma por defecto
 * tiene una versión publicada.
 */
export function buildAlternates(
  pathname: string,
  site: string | URL = SITE_URL,
  availableLangs: readonly Lang[] = LANGS,
): AlternateLink[] {
  const alternates: AlternateLink[] = [];

  for (const lang of LANGS) {
    if (!availableLangs.includes(lang)) continue;
    const href = equivalentHref(pathname, lang);
    if (href) {
      alternates.push({ hreflang: lang, href: absoluteUrl(href, site) });
    }
  }

  const defaultHref = availableLangs.includes(DEFAULT_LANG)
    ? equivalentHref(pathname, DEFAULT_LANG)
    : null;
  if (defaultHref) {
    alternates.push({
      hreflang: "x-default",
      href: absoluteUrl(defaultHref, site),
    });
  }

  return alternates;
}

/** El staging nunca se indexa, incluso si el build se publica por error. */
export function shouldNoIndex(explicitNoIndex = false): boolean {
  return explicitNoIndex || import.meta.env.PUBLIC_NOINDEX === "true";
}
