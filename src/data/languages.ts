import type { Lang } from "@lib/lang";

export interface LanguageMeta {
  code: Lang;
  label: string;
  shortLabel: string;
  htmlLang: string;
  ogLocale: string;
}

export const LANGUAGES: readonly LanguageMeta[] = [
  {
    code: "en",
    label: "English",
    shortLabel: "EN",
    htmlLang: "en-US",
    ogLocale: "en_US",
  },
  {
    code: "es",
    label: "Español",
    shortLabel: "ES",
    htmlLang: "es-US",
    ogLocale: "es_US",
  },
] as const;

export const LANGUAGE_BY_CODE = Object.fromEntries(
  LANGUAGES.map((language) => [language.code, language]),
) as Record<Lang, LanguageMeta>;
