import type { Lang } from "@lib/lang";
import type { RouteKey } from "@lib/routes";

export interface HomeContent {
  introEyebrow: string;
  introTitle: string;
  introText: string;
  pillarsEyebrow: string;
  pillarsTitle: string;
  pillars: {
    title: string;
    text: string;
    cta: { key: RouteKey; label: string };
  }[];
  benefitsEyebrow: string;
  benefitsTitle: string;
  benefitsLead: string;
  benefits: {
    title: string;
    text: string;
    cta: { key: RouteKey; label: string };
  }[];
  trustLabel: string;
  trustItems: string[];
  cta: {
    title: string;
    text: string;
    primary: { key: RouteKey; label: string };
    secondary: { key: RouteKey; label: string };
  };
}

export const HOME_CONTENT: Record<Lang, HomeContent> = {
  en: {
    introEyebrow: "Our mission",
    introTitle: "Championing American enterprise, together",
    introText:
      "The American Chamber of Commerce is an independent, member-driven organization dedicated to strengthening the business community. We connect companies of every size with the network, knowledge, and advocacy voice they need to compete confidently.",
    pillarsEyebrow: "What we do",
    pillarsTitle: "A chamber built around your business",
    pillars: [
      {
        title: "Membership",
        text: "Join a network of businesses working together to grow and compete.",
        cta: { key: "membership", label: "Explore membership" },
      },
      {
        title: "Advocacy",
        text: "We press for policy that helps American business succeed.",
        cta: { key: "advocacy", label: "See our priorities" },
      },
      {
        title: "News",
        text: "Stay current on the issues and events shaping our members.",
        cta: { key: "news", label: "Read the latest" },
      },
    ],
    benefitsEyebrow: "Member benefits",
    benefitsTitle: "Practical value from day one",
    benefitsLead:
      "Every membership level is designed around the way companies actually grow: through relationships, visibility, and a stronger voice.",
    benefits: [
      {
        title: "Connections that open doors",
        text: "Meet peers, partners, and decision-makers across industries and markets.",
        cta: { key: "events", label: "Upcoming events" },
      },
      {
        title: "Advocacy that represents you",
        text: "Follow the policy priorities that affect trade, infrastructure, workforce, and taxes.",
        cta: { key: "advocacy", label: "Policy priorities" },
      },
      {
        title: "Visibility for your company",
        text: "Member profiles and directory listings help the right audience find you.",
        cta: { key: "members", label: "Visit the directory" },
      },
      {
        title: "Resources for growth",
        text: "Market information, publications, and guidance for expanding companies.",
        cta: { key: "resources", label: "Browse resources" },
      },
    ],
    trustLabel: "Serving member companies across industries",
    trustItems: [
      "Trade & logistics",
      "Financial services",
      "Technology",
      "Manufacturing",
      "Professional services",
      "Food & agriculture",
    ],
    cta: {
      title: "Ready to get started?",
      text: "Join the Chamber or talk with our team about the right membership level for your company.",
      primary: { key: "plans", label: "Become a member" },
      secondary: { key: "contact", label: "Contact us" },
    },
  },
  es: {
    introEyebrow: "Nuestra misión",
    introTitle: "Impulsamos la empresa americana, juntos",
    introText:
      "American Chamber of Commerce es una organización independiente e impulsada por sus miembros, dedicada a fortalecer la comunidad empresarial. Conectamos empresas de todos los tamaños con la red, el conocimiento y la voz de defensa que necesitan para competir con confianza.",
    pillarsEyebrow: "Qué hacemos",
    pillarsTitle: "Una cámara construida alrededor de tu empresa",
    pillars: [
      {
        title: "Membresía",
        text: "Únete a una red de empresas que trabajan juntas para crecer y competir.",
        cta: { key: "membership", label: "Conoce la membresía" },
      },
      {
        title: "Defensa",
        text: "Promovemos políticas que ayudan a las empresas americanas a prosperar.",
        cta: { key: "advocacy", label: "Nuestras prioridades" },
      },
      {
        title: "Noticias",
        text: "Mantente al día sobre los temas y eventos que afectan a nuestros miembros.",
        cta: { key: "news", label: "Leer lo último" },
      },
    ],
    benefitsEyebrow: "Beneficios para socios",
    benefitsTitle: "Valor práctico desde el primer día",
    benefitsLead:
      "Cada nivel de membresía está diseñado según la forma en que las empresas crecen: mediante relaciones, visibilidad y una voz más fuerte.",
    benefits: [
      {
        title: "Conexiones que abren puertas",
        text: "Conoce colegas, socios y tomadores de decisiones de distintos sectores y mercados.",
        cta: { key: "events", label: "Próximos eventos" },
      },
      {
        title: "Defensa que te representa",
        text: "Sigue las prioridades de política que afectan el comercio, la infraestructura, el talento y los impuestos.",
        cta: { key: "advocacy", label: "Prioridades de política" },
      },
      {
        title: "Visibilidad para tu empresa",
        text: "Los perfiles de socios y el directorio ayudan a que el público correcto te encuentre.",
        cta: { key: "members", label: "Visitar el directorio" },
      },
      {
        title: "Recursos para crecer",
        text: "Información de mercado, publicaciones y orientación para empresas en expansión.",
        cta: { key: "resources", label: "Ver recursos" },
      },
    ],
    trustLabel: "Al servicio de empresas de distintos sectores",
    trustItems: [
      "Comercio y logística",
      "Servicios financieros",
      "Tecnología",
      "Manufactura",
      "Servicios profesionales",
      "Alimentos y agricultura",
    ],
    cta: {
      title: "¿Listo para comenzar?",
      text: "Únete a la Cámara o conversa con nuestro equipo sobre el nivel de membresía adecuado para tu empresa.",
      primary: { key: "plans", label: "Hazte socio" },
      secondary: { key: "contact", label: "Contáctanos" },
    },
  },
};
