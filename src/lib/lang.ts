export const LANGS = ["en", "es"] as const;

export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "en";

/** Cookie de preferencia declarada en el PLAN (misma fuente que el selector). */
export const LANG_COOKIE = "selectedLanguage";

/** Un año, en segundos, para la cookie de preferencia. */
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}

/**
 * Devuelve el idioma solicitado si es válido; de lo contrario, el fallback
 * explícito. Nunca decide por el contenido disponible.
 */
export function normalizeLang(value: unknown, fallback: Lang = DEFAULT_LANG): Lang {
  return isLang(value) ? value : fallback;
}

/**
 * Extrae el idioma de una ruta prefijada (`/en/...`, `/es/...`).
 * Devuelve `null` cuando la ruta no declara idioma.
 */
export function getLangFromPath(pathname: string): Lang | null {
  const match = /^\/(en|es)(?:\/|$)/.exec(pathname);
  return match ? (match[1] as Lang) : null;
}

/** Valor para el atributo `lang` del documento. */
export function htmlLang(lang: Lang): "en-US" | "es-US" {
  return lang === "es" ? "es-US" : "en-US";
}

/** Valor para `og:locale`. */
export function ogLocale(lang: Lang): "en_US" | "es_US" {
  return lang === "es" ? "es_US" : "en_US";
}

/**
 * Interpreta `document.cookie` sin depender del navegador.
 * Devuelve `null` si no existe una preferencia válida.
 */
export function parseLangCookie(cookieHeader: string | null | undefined): Lang | null {
  if (!cookieHeader) return null;

  for (const part of cookieHeader.split(";")) {
    const [rawName, ...rawValue] = part.split("=");
    if (rawName?.trim() !== LANG_COOKIE) continue;
    const value = decodeURIComponent(rawValue.join("=").trim());
    return isLang(value) ? value : null;
  }

  return null;
}

/**
 * Resuelve el idioma de entrada respetando la preferencia explícita,
 * luego la ruta y, por último, el idioma por defecto.
 */
export function resolveLang(
  preference: string | null | undefined,
  pathname: string,
  fallback: Lang = DEFAULT_LANG,
): Lang {
  if (isLang(preference)) return preference;
  return getLangFromPath(pathname) ?? fallback;
}

/** Etiqueta localizada del idioma, útil para el selector. */
export function langLabel(lang: Lang, inLang: Lang = lang): string {
  const labels: Record<Lang, Record<Lang, string>> = {
    en: { en: "English", es: "English" },
    es: { en: "Spanish", es: "Español" },
  };
  return labels[lang][inLang];
}
