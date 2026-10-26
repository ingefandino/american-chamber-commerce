import type { Lang } from "@lib/lang";

export interface NewsItem {
  id: string;
  slug: string;
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
  body: Record<Lang, string>;
  publishedAt: string;
  source: string;
  reviewStatus: "needs-review" | "approved";
  translations: Lang[];
}

/**
 * No hay noticias verificadas en las fuentes disponibles. Publicar textos
 * de relleno aquí contradiría la regla editorial del proyecto.
 */
export const NEWS: NewsItem[] = [];

export function getPublishedNews(
  lang: Lang,
  news: NewsItem[] = NEWS,
): NewsItem[] {
  return news.filter(
    (item) =>
      item.reviewStatus === "approved" && item.translations.includes(lang),
  );
}

export function getNewsBySlug(
  slug: string,
  lang: Lang,
  news: NewsItem[] = NEWS,
): NewsItem | undefined {
  return getPublishedNews(lang, news).find((item) => item.slug === slug);
}
