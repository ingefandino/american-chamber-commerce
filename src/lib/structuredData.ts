import { SITE } from "@data/site";
import type { ChamberEvent } from "@data/events";
import type { PolicyItem } from "@data/policies";
import type { Service } from "@data/services";
import { zonedIso } from "./dates";
import { htmlLang, type Lang } from "./lang";
import {
  absoluteUrl,
  SITE_NAME,
  SITE_URL,
} from "./seo";
import type { BreadcrumbItem } from "./breadcrumbs";

export type JsonLd = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_URL = `${SITE_URL}/icons/icon-512.png`;
const SOCIAL_IMAGE = `${SITE_URL}/og-image.jpg`;

export function organizationSchema(
  lang: Lang,
  site: string = SITE_URL,
): JsonLd {
  return {
    "@type": "Organization",
    "@id": `${site}/#organization`,
    name: SITE_NAME,
    alternateName: "ACC",
    url: site,
    description: SITE.description[lang],
    logo: {
      "@type": "ImageObject",
      url: `${site}/icons/icon-512.png`,
      width: 512,
      height: 512,
    },
    image: `${site}/og-image.jpg`,
    email: SITE.contact.email,
    telephone: SITE.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.contact.address,
      addressLocality: SITE.contact.city,
      addressRegion: SITE.contact.region,
      postalCode: SITE.contact.postalCode,
      addressCountry: SITE.contact.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.contact.phone,
      email: SITE.contact.email,
      contactType: "customer service",
      availableLanguage: ["English", "Spanish"],
    },
    sameAs: Object.values(SITE.social),
  };
}

export function websiteSchema(
  lang: Lang,
  site: string = SITE_URL,
): JsonLd {
  return {
    "@type": "WebSite",
    "@id": `${site}/#website`,
    url: site,
    name: SITE_NAME,
    description: SITE.description[lang],
    inLanguage: htmlLang(lang),
    publisher: { "@id": `${site}/#organization` },
  };
}

export function breadcrumbSchema(
  items: BreadcrumbItem[],
  lang: Lang,
  site: string = SITE_URL,
): JsonLd {
  return {
    "@type": "BreadcrumbList",
    inLanguage: htmlLang(lang),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href, site),
    })),
  };
}

const ATTENDANCE_MODE: Record<ChamberEvent["modality"], string> = {
  "in-person": "https://schema.org/OfflineEventAttendanceMode",
  online: "https://schema.org/OnlineEventAttendanceMode",
  hybrid: "https://schema.org/MixedEventAttendanceMode",
};

const EVENT_STATUS: Record<ChamberEvent["status"], string> = {
  upcoming: "https://schema.org/EventScheduled",
  past: "https://schema.org/EventScheduled",
  "sold-out": "https://schema.org/EventScheduled",
  cancelled: "https://schema.org/EventCancelled",
  postponed: "https://schema.org/EventPostponed",
  draft: "https://schema.org/EventScheduled",
  retired: "https://schema.org/EventScheduled",
};

export function eventSchema(
  event: ChamberEvent,
  lang: Lang,
  site: string = SITE_URL,
): JsonLd {
  return {
    "@type": "Event",
    name: event.title[lang],
    description: event.summary[lang],
    startDate: zonedIso(event.date, event.startTime, event.timezone),
    endDate: zonedIso(event.date, event.endTime, event.timezone),
    eventStatus: EVENT_STATUS[event.status],
    eventAttendanceMode: ATTENDANCE_MODE[event.modality],
    inLanguage: htmlLang(lang),
    url: absoluteUrl(`/${lang}/events/${event.slug}/`, site),
    image: `${site}/og-image.jpg`,
    location: {
      "@type": "Place",
      name: event.location.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.location.address,
        addressLocality: event.location.city,
        addressCountry: "US",
      },
    },
    organizer: { "@id": `${site}/#organization` },
  };
}

export function serviceSchema(
  service: Service,
  lang: Lang,
  site: string = SITE_URL,
): JsonLd {
  return {
    "@type": "Service",
    name: service.name[lang],
    serviceType: service.name[lang],
    description: service.summary[lang],
    url: absoluteUrl(`/${lang}/services/${service.slug}/`, site),
    inLanguage: htmlLang(lang),
    provider: { "@id": `${site}/#organization` },
  };
}

export function policyArticleSchema(
  policy: PolicyItem,
  lang: Lang,
  site: string = SITE_URL,
): JsonLd {
  return {
    "@type": "Article",
    headline: policy.title[lang],
    description: policy.summary[lang],
    datePublished: policy.date,
    dateModified: policy.date,
    inLanguage: htmlLang(lang),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/${lang}/advocacy/${policy.slug}/`, site),
    },
    author: { "@id": `${site}/#organization` },
    publisher: { "@id": `${site}/#organization` },
    image: `${site}/og-image.jpg`,
  };
}

export function newsArticleSchema(
  item: {
    title: Record<Lang, string>;
    summary: Record<Lang, string>;
    publishedAt: string;
    slug: string;
    source: string;
  },
  lang: Lang,
  site: string = SITE_URL,
): JsonLd {
  return {
    "@type": "Article",
    headline: item.title[lang],
    description: item.summary[lang],
    datePublished: item.publishedAt,
    dateModified: item.publishedAt,
    inLanguage: htmlLang(lang),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/${lang}/news/${item.slug}/`, site),
    },
    author: { "@id": `${site}/#organization` },
    publisher: { "@id": `${site}/#organization` },
    image: `${site}/og-image.jpg`,
  };
}

export function buildJsonLdGraph(
  lang: Lang,
  extra: JsonLd | JsonLd[] = [],
  breadcrumbs: BreadcrumbItem[] = [],
  site: string = SITE_URL,
): JsonLd {
  const extras = Array.isArray(extra) ? extra : [extra];
  const graph: JsonLd[] = [
    organizationSchema(lang, site),
    websiteSchema(lang, site),
  ];

  if (breadcrumbs.length > 0) {
    graph.push(breadcrumbSchema(breadcrumbs, lang, site));
  }

  for (const item of extras) {
    const cleaned = { ...item };
    delete cleaned["@context"];
    graph.push(cleaned);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/** Evita cerrar el script si un valor contiene `</script>`. */
export function serializeJsonLd(value: JsonLd): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export const STRUCTURED_DATA_IDS = {
  organization: ORGANIZATION_ID,
  website: WEBSITE_ID,
  logo: LOGO_URL,
  socialImage: SOCIAL_IMAGE,
} as const;
