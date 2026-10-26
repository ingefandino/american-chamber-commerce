import type { Lang } from "@lib/lang";

export const SITE = {
  name: "American Chamber of Commerce",
  shortName: "ACC",
  url: "https://americanchamberofcommerce.us",
  tagline: {
    en: "Connecting businesses, building the future",
    es: "Conectamos empresas, construimos futuro",
  },
  description: {
    en: "An international organization that connects businesses with customers and facilitates legal and business solutions to drive growth.",
    es: "Una entidad internacional que conecta empresas con clientes y facilita soluciones legales y empresariales para impulsar su crecimiento.",
  },
  mission: {
    en: "At the American Chamber of Commerce we are the bridge that connects businesses with their customers and with the world, facilitating legal and business solutions that strengthen the present and project growth without borders.",
    es: "En American Chamber of Commerce somos el puente que conecta empresas con sus clientes y con el mundo, facilitando soluciones legales y empresariales que fortalecen el presente y proyectan un crecimiento sin fronteras.",
  },
  vision: {
    en: "We are a global community that inspires, connects, and drives business development without limits, where every business — large or small — already lives the future it imagines.",
    es: "Somos una comunidad global que inspira, conecta e impulsa el desarrollo empresarial sin límites, donde cada negocio —grande o pequeño— ya vive el futuro que imagina.",
  },
  values: {
    en: [
      "Unwavering integrity",
      "Strict compliance",
      "Trust and responsibility",
      "Professional excellence",
      "Commitment to business ethics",
      "Security and protection",
    ],
    es: [
      "Integridad inquebrantable",
      "Cumplimiento estricto",
      "Confianza y responsabilidad",
      "Excelencia profesional",
      "Compromiso con la ética empresarial",
      "Seguridad y protección",
    ],
  },
  contact: {
    phone: "+1 (904) 397-3437",
    phoneHref: "tel:+19043973437",
    email: "info@americanchamberofcommerce.us",
    emailHref: "mailto:info@americanchamberofcommerce.us",
    address: "753 East Tremont, Bronx, New York 10457, USA",
    addressSecondary: "111 E Monument Ave Ste 327, Bronx, New York, USA",
    city: "Bronx",
    region: "NY",
    country: "USA",
    postalCode: "10457",
    timezone: "America/New_York",
  },
  whatsapp: {
    number: "13473012169",
    display: "+1 (347) 301-2169",
    href: "https://wa.me/13473012169",
    message: {
      en: "Hello, I would like information about the American Chamber of Commerce.",
      es: "Hola, deseo información sobre American Chamber of Commerce.",
    },
  },
  /** Datos heredados del proyecto local: requieren revisión del cliente. */
  reviewStatus: "needs-review" as const,
} satisfies {
  name: string;
  shortName: string;
  url: string;
  tagline: Record<Lang, string>;
  description: Record<Lang, string>;
  mission: Record<Lang, string>;
  vision: Record<Lang, string>;
  values: Record<Lang, string[]>;
  contact: Record<string, string>;
  whatsapp: {
    number: string;
    display: string;
    href: string;
    message: Record<Lang, string>;
  };
  reviewStatus: "needs-review";
};

export const CONTACT = SITE.contact;
