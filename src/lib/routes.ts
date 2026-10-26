import { DEFAULT_LANG, type Lang } from "./lang";

/** Rutas lógicas (sin prefijo de idioma) definidas en el information architecture. */
export const ROUTE_PATHS = {
  home: "/",
  about: "/about/",
  mission: "/about/mission/",
  leadership: "/about/leadership/",
  governance: "/about/governance/",
  membership: "/membership/",
  benefits: "/membership/benefits/",
  plans: "/membership/plans/",
  apply: "/membership/apply/",
  services: "/services/",
  events: "/events/",
  members: "/members/",
  advocacy: "/advocacy/",
  news: "/news/",
  resources: "/resources/",
  partners: "/partners/",
  sponsorship: "/sponsorship/",
  contact: "/contact/",
  privacy: "/privacy/",
  terms: "/terms/",
  accessibility: "/accessibility/",
} as const;

export type RouteKey = keyof typeof ROUTE_PATHS;

/** Secciones que además tienen páginas de detalle con slug. */
export const DYNAMIC_ROUTE_KEYS = [
  "services",
  "events",
  "members",
  "advocacy",
  "news",
] as const satisfies readonly RouteKey[];

export type DynamicRouteKey = (typeof DYNAMIC_ROUTE_KEYS)[number];

/**
 * Rutas publicadas por idioma. Se mantiene explícito para que el build pueda
 * validar equivalencias y para no anunciar traducciones inexistentes.
 */
export const AVAILABLE_ROUTES: Record<Lang, readonly RouteKey[]> = {
  en: Object.keys(ROUTE_PATHS) as RouteKey[],
  es: Object.keys(ROUTE_PATHS) as RouteKey[],
};

export function hasRoute(key: RouteKey, lang: Lang = DEFAULT_LANG): boolean {
  return AVAILABLE_ROUTES[lang].includes(key);
}

/** Construye la URL localizada de una ruta lógica publicada. */
export function localizedHref(key: RouteKey, lang: Lang = DEFAULT_LANG): string {
  const path = ROUTE_PATHS[key];
  const target = hasRoute(key, lang) ? lang : DEFAULT_LANG;
  return path === "/" ? `/${target}/` : `/${target}${path}`;
}

export interface RouteMatch {
  key: RouteKey;
  slug?: string;
}

const normalizedRest = (pathname: string): string => {
  const match = /^\/(?:en|es)(?=\/|$)/.exec(pathname);
  const rest = match ? pathname.slice(match[0].length) : pathname;
  if (!rest.startsWith("/")) return `/${rest}`;
  return rest;
};

/** Identifica la ruta lógica de un pathname, incluidos los detalles con slug. */
export function matchRoute(pathname: string): RouteMatch | null {
  const rest = normalizedRest(pathname).replace(/\/+$/, "") || "/";

  for (const [key, path] of Object.entries(ROUTE_PATHS) as [
    RouteKey,
    string,
  ][]) {
    const normalizedPath = path.replace(/\/+$/, "") || "/";
    if (normalizedPath === rest) return { key };
  }

  const segments = rest.split("/").filter(Boolean);
  if (segments.length === 2) {
    const base = segments[0];
    const slug = segments[1];
    if ((DYNAMIC_ROUTE_KEYS as readonly string[]).includes(base)) {
      return { key: base as DynamicRouteKey, slug };
    }
  }

  return null;
}

export function routeKeyFromPath(pathname: string): RouteKey | null {
  return matchRoute(pathname)?.key ?? null;
}

/**
 * Devuelve la ruta equivalente en otro idioma conservando la sección y el slug.
 * Devuelve `null` si la ruta no existe o la traducción no está publicada.
 */
export function equivalentHref(
  pathname: string,
  targetLang: Lang,
): string | null {
  const match = matchRoute(pathname);
  if (!match || !hasRoute(match.key, targetLang)) return null;

  const base = localizedHref(match.key, targetLang);
  if (!match.slug) return base;
  return `${base}${match.slug}/`;
}
