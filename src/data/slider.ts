import type { ImageMetadata } from "astro";
import type { Lang } from "@lib/lang";
import type { RouteKey } from "@lib/routes";

import slider01 from "@assets/webp/slider/slider-01.webp";
import slider02 from "@assets/webp/slider/slider-02.webp";
import slider03 from "@assets/webp/slider/slider-03.webp";
import slider04 from "@assets/webp/slider/slider-04.webp";
import slider05 from "@assets/webp/slider/slider-05.webp";
import slider06 from "@assets/webp/slider/slider-06.webp";
import slider07 from "@assets/webp/slider/slider-07.webp";
import slider08 from "@assets/webp/slider/slider-08.webp";
import slider09 from "@assets/webp/slider/slider-09.webp";

export interface Slide {
  id: string;
  image: ImageMetadata;
  alt: string;
  eyebrow: string;
  title: string;
  text: string;
  cta?: {
    key: RouteKey;
    label: string;
  };
}

const images = [
  slider02,
  slider06,
  slider04,
  slider05,
  slider07,
  slider03,
  slider08,
  slider09,
  slider01,
] as const;

const altByIndex: Record<Lang, readonly string[]> = {
  en: [
    "Two business professionals shaking hands in a bright office",
    "Three colleagues collaborating around a laptop",
    "Hands writing notes beside printed business charts",
    "Stacks of shipping containers at a commercial port",
    "Port cranes silhouetted against a sunset",
    "Business colleagues reviewing information on a phone",
    "Person holding a payment card",
    "United States one hundred dollar bills",
    "American Chamber of Commerce logo on a neutral background",
  ],
  es: [
    "Dos profesionales de negocios estrechando la mano en una oficina",
    "Tres colegas colaborando alrededor de una computadora portátil",
    "Manos escribiendo notas junto a gráficos de negocio impresos",
    "Pilas de contenedores marítimos en un puerto comercial",
    "Grúas portuarias en silueta contra un atardecer",
    "Colegas de negocios revisando información en un teléfono",
    "Persona sosteniendo una tarjeta de pago",
    "Billetes de cien dólares estadounidenses",
    "Logotipo de American Chamber of Commerce sobre fondo neutro",
  ],
};

const contentByLang: Record<
  Lang,
  readonly Omit<Slide, "id" | "image" | "alt">[]
> = {
  en: [
    {
      eyebrow: "American Chamber of Commerce",
      title: "Empower your business",
      text: "A member-driven chamber working to connect American businesses with opportunity.",
      cta: { key: "membership", label: "Explore membership" },
    },
    {
      eyebrow: "Community",
      title: "Build your network",
      text: "Meet peers, partners, and decision-makers across industries.",
      cta: { key: "events", label: "See upcoming events" },
    },
    {
      eyebrow: "Resources",
      title: "Plan with confidence",
      text: "Market information and practical guidance for growing companies.",
      cta: { key: "services", label: "Discover our services" },
    },
    {
      eyebrow: "Global trade",
      title: "Trade without borders",
      text: "Support for companies exploring international markets.",
      cta: { key: "services", label: "Trade services" },
    },
    {
      eyebrow: "New York",
      title: "Connect with the world",
      text: "A gateway for trade, investment, and international partnership.",
      cta: { key: "about", label: "About the Chamber" },
    },
    {
      eyebrow: "Advocacy",
      title: "Grow the economy",
      text: "A voice for business in the halls of government.",
      cta: { key: "advocacy", label: "Read our priorities" },
    },
    {
      eyebrow: "Member benefits",
      title: "Make membership work for you",
      text: "Practical benefits designed for companies of every size.",
      cta: { key: "benefits", label: "Compare benefits" },
    },
    {
      eyebrow: "Partnership",
      title: "Invest in growth",
      text: "Sponsorship and partnership opportunities that raise your profile.",
      cta: { key: "sponsorship", label: "Partner with us" },
    },
    {
      eyebrow: "American Chamber of Commerce",
      title: "A chamber built for business",
      text: "Member-driven. Business-focused. Connected to the world.",
      cta: { key: "contact", label: "Talk to our team" },
    },
  ],
  es: [
    {
      eyebrow: "American Chamber of Commerce",
      title: "Impulsa tu empresa",
      text: "Una cámara impulsada por sus miembros que conecta empresas con oportunidades.",
      cta: { key: "membership", label: "Conoce la membresía" },
    },
    {
      eyebrow: "Comunidad",
      title: "Amplía tu red",
      text: "Conoce colegas, socios y tomadores de decisiones de distintos sectores.",
      cta: { key: "events", label: "Ver próximos eventos" },
    },
    {
      eyebrow: "Recursos",
      title: "Planifica con confianza",
      text: "Información de mercado y orientación práctica para empresas en crecimiento.",
      cta: { key: "services", label: "Descubre nuestros servicios" },
    },
    {
      eyebrow: "Comercio global",
      title: "Comercia sin fronteras",
      text: "Acompañamiento para empresas que exploran mercados internacionales.",
      cta: { key: "services", label: "Servicios de comercio" },
    },
    {
      eyebrow: "Nueva York",
      title: "Conecta con el mundo",
      text: "Una puerta para el comercio, la inversión y las alianzas internacionales.",
      cta: { key: "about", label: "Sobre la Cámara" },
    },
    {
      eyebrow: "Defensa",
      title: "Impulsa la economía",
      text: "Una voz para las empresas ante las autoridades.",
      cta: { key: "advocacy", label: "Nuestras prioridades" },
    },
    {
      eyebrow: "Beneficios",
      title: "Aprovecha tu membresía",
      text: "Beneficios prácticos diseñados para empresas de todos los tamaños.",
      cta: { key: "benefits", label: "Comparar beneficios" },
    },
    {
      eyebrow: "Alianzas",
      title: "Invierte en crecimiento",
      text: "Patrocinios y alianzas que aumentan la visibilidad de tu empresa.",
      cta: { key: "sponsorship", label: "Sé nuestro socio" },
    },
    {
      eyebrow: "American Chamber of Commerce",
      title: "Una cámara hecha para los negocios",
      text: "Impulsada por socios. Enfocada en empresas. Conectada con el mundo.",
      cta: { key: "contact", label: "Habla con nuestro equipo" },
    },
  ],
};

export function getSlides(lang: Lang): Slide[] {
  return images.map((image, index) => ({
    id: `slide-${String(index + 1).padStart(2, "0")}`,
    image,
    alt: altByIndex[lang][index],
    ...contentByLang[lang][index],
  }));
}
