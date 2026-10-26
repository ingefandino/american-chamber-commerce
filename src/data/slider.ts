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
  slider01,
  slider02,
  slider03,
  slider04,
  slider05,
  slider06,
  slider07,
  slider08,
  slider09,
] as const;

const altByIndex: Record<Lang, readonly string[]> = {
  en: [
    "American Chamber of Commerce logo on a neutral background",
    "Two business professionals shaking hands in a bright office",
    "Business colleagues reviewing information on a phone",
    "Hands writing notes beside printed business charts",
    "Stacks of shipping containers at a commercial port",
    "Three colleagues collaborating around a laptop",
    "Port cranes silhouetted against a sunset",
    "Person holding a payment card",
    "United States one hundred dollar bills",
  ],
  es: [
    "Logotipo de American Chamber of Commerce sobre fondo neutro",
    "Dos profesionales de negocios estrechando la mano en una oficina",
    "Colegas de negocios revisando información en un teléfono",
    "Manos escribiendo notas junto a gráficos de negocio impresos",
    "Pilas de contenedores marítimos en un puerto comercial",
    "Tres colegas colaborando alrededor de una computadora portátil",
    "Grúas portuarias en silueta contra un atardecer",
    "Persona sosteniendo una tarjeta de pago",
    "Billetes de cien dólares estadounidenses",
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
      eyebrow: "Membership",
      title: "Build your network",
      text: "Meet peers, partners, and decision-makers across industries.",
      cta: { key: "events", label: "See upcoming events" },
    },
    {
      eyebrow: "Advocacy",
      title: "Grow the economy",
      text: "A voice for business in the halls of government.",
      cta: { key: "advocacy", label: "Read our priorities" },
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
      eyebrow: "Community",
      title: "Work together",
      text: "A network of businesses that share knowledge and open doors.",
      cta: { key: "members", label: "Browse the directory" },
    },
    {
      eyebrow: "New York",
      title: "Connect with the world",
      text: "A gateway for trade, investment, and international partnership.",
      cta: { key: "about", label: "About the Chamber" },
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
  ],
  es: [
    {
      eyebrow: "American Chamber of Commerce",
      title: "Impulsa tu empresa",
      text: "Una cámara impulsada por sus miembros que conecta empresas con oportunidades.",
      cta: { key: "membership", label: "Conoce la membresía" },
    },
    {
      eyebrow: "Membresía",
      title: "Amplía tu red",
      text: "Conoce colegas, socios y tomadores de decisiones de distintos sectores.",
      cta: { key: "events", label: "Ver próximos eventos" },
    },
    {
      eyebrow: "Defensa",
      title: "Impulsa la economía",
      text: "Una voz para las empresas ante las autoridades.",
      cta: { key: "advocacy", label: "Nuestras prioridades" },
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
      eyebrow: "Comunidad",
      title: "Crecemos juntos",
      text: "Una red de empresas que comparte conocimiento y abre puertas.",
      cta: { key: "members", label: "Ver el directorio" },
    },
    {
      eyebrow: "Nueva York",
      title: "Conecta con el mundo",
      text: "Una puerta para el comercio, la inversión y las alianzas internacionales.",
      cta: { key: "about", label: "Sobre la Cámara" },
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
