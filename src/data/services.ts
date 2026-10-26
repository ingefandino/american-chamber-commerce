import type { Lang } from "@lib/lang";

export type ServiceAccess =
  | "included"
  | "member-discount"
  | "separate"
  | "confirm";

export interface Service {
  id: string;
  slug: string;
  name: Record<Lang, string>;
  summary: Record<Lang, string>;
  description: Record<Lang, string>;
  audience: Record<Lang, string>;
  access: ServiceAccess;
  ctaLabel: Record<Lang, string>;
  editorialStatus: "needs-review" | "approved";
  status: "published" | "retired";
}

export const ACCESS_LABELS: Record<
  ServiceAccess,
  Record<Lang, string>
> = {
  included: { en: "Included in membership", es: "Incluido en la membresía" },
  "member-discount": {
    en: "Member discount available",
    es: "Descuento disponible para socios",
  },
  separate: {
    en: "Quoted separately",
    es: "Cotizado por separado",
  },
  confirm: {
    en: "Terms confirmed on request",
    es: "Condiciones confirmadas al solicitar",
  },
};

export const SERVICES: Service[] = [
  {
    id: "service-market-research",
    slug: "market-research",
    name: { en: "Market research", es: "Investigación de mercado" },
    summary: {
      en: "Research tailored to the questions your company needs to answer before entering or expanding in a market.",
      es: "Investigación adaptada a las preguntas que tu empresa necesita responder antes de entrar o expandirse en un mercado.",
    },
    description: {
      en: "We help companies frame the right questions and gather market context before making a commercial decision. The scope, timeline, and deliverables are agreed in advance so you know what the engagement includes.",
      es: "Ayudamos a las empresas a formular las preguntas correctas y reunir contexto de mercado antes de tomar una decisión comercial. El alcance, los plazos y los entregables se acuerdan de antemano para que sepas qué incluye el servicio.",
    },
    audience: {
      en: "Companies evaluating a new market, product, or customer segment.",
      es: "Empresas que evalúan un nuevo mercado, producto o segmento de clientes.",
    },
    access: "confirm",
    ctaLabel: { en: "Request information", es: "Solicitar información" },
    editorialStatus: "needs-review",
    status: "published",
  },
  {
    id: "service-market-information",
    slug: "market-information",
    name: { en: "Market information", es: "Información de mercado" },
    summary: {
      en: "Updated information and practical support to understand U.S. and international business conditions.",
      es: "Información actualizada y apoyo práctico para comprender las condiciones empresariales de Estados Unidos y los mercados internacionales.",
    },
    description: {
      en: "Access orientation on market conditions, commercial practices, and where to find official sources. We distinguish published data from our own interpretation and tell you when a topic needs specialist advice.",
      es: "Orientación sobre condiciones de mercado, prácticas comerciales y dónde encontrar fuentes oficiales. Distinguimos los datos publicados de nuestra propia interpretación y te indicamos cuándo un tema requiere asesoría especializada.",
    },
    audience: {
      en: "Teams that need a starting point before committing resources.",
      es: "Equipos que necesitan un punto de partida antes de comprometer recursos.",
    },
    access: "confirm",
    ctaLabel: { en: "Request information", es: "Solicitar información" },
    editorialStatus: "needs-review",
    status: "published",
  },
  {
    id: "service-business-center",
    slug: "business-center",
    name: { en: "Business center", es: "Centro de negocios" },
    summary: {
      en: "Meeting rooms and workspaces in our U.S. offices, subject to availability.",
      es: "Salas de reuniones y espacios de trabajo en nuestras oficinas de Estados Unidos, sujetos a disponibilidad.",
    },
    description: {
      en: "Member companies can request access to meeting rooms and workspaces when visiting the United States. Capacity, hours, and any fees depend on the office and must be confirmed in advance.",
      es: "Las empresas socias pueden solicitar acceso a salas de reuniones y espacios de trabajo cuando visiten Estados Unidos. La capacidad, los horarios y cualquier costo dependen de la oficina y deben confirmarse con anticipación.",
    },
    audience: {
      en: "Members traveling to the United States for meetings or short stays.",
      es: "Socios que viajan a Estados Unidos para reuniones o estancias cortas.",
    },
    access: "member-discount",
    ctaLabel: { en: "Check availability", es: "Consultar disponibilidad" },
    editorialStatus: "needs-review",
    status: "published",
  },
  {
    id: "service-promotion-marketing",
    slug: "promotion-and-marketing",
    name: {
      en: "Promotion and marketing",
      es: "Promoción y marketing",
    },
    summary: {
      en: "Promotional support tailored to your company's goals and audience.",
      es: "Apoyo promocional adaptado a los objetivos y la audiencia de tu empresa.",
    },
    description: {
      en: "We discuss the audience you want to reach and the format that fits the message. Deliverables and distribution are agreed before production begins, and we do not guarantee a specific commercial result.",
      es: "Conversamos sobre la audiencia que deseas alcanzar y el formato que mejor se adapta al mensaje. Los entregables y la distribución se acuerdan antes de comenzar la producción, y no garantizamos un resultado comercial específico.",
    },
    audience: {
      en: "Companies that want a clearer presence with a defined audience.",
      es: "Empresas que buscan una presencia más clara ante una audiencia definida.",
    },
    access: "separate",
    ctaLabel: { en: "Request a proposal", es: "Solicitar una propuesta" },
    editorialStatus: "needs-review",
    status: "published",
  },
  {
    id: "service-trade-missions",
    slug: "trade-missions",
    name: { en: "Trade missions", es: "Misiones comerciales" },
    summary: {
      en: "Support for companies exploring expansion and looking for the right commercial partners.",
      es: "Apoyo para empresas que exploran su expansión y buscan los socios comerciales adecuados.",
    },
    description: {
      en: "We help companies prepare for trade missions and identify relevant contacts. Introductions are made based on fit and availability; they do not constitute a guarantee of business or exclusive access.",
      es: "Ayudamos a las empresas a prepararse para misiones comerciales e identificar contactos relevantes. Las presentaciones se realizan según la afinidad y disponibilidad; no constituyen una garantía de negocio ni un acceso exclusivo.",
    },
    audience: {
      en: "Companies planning a market-entry or expansion visit.",
      es: "Empresas que planifican una visita de entrada o expansión de mercado.",
    },
    access: "confirm",
    ctaLabel: { en: "Request information", es: "Solicitar información" },
    editorialStatus: "needs-review",
    status: "published",
  },
  {
    id: "service-trade-fairs",
    slug: "trade-fairs-and-congress-advisory",
    name: {
      en: "Trade fairs and congress advisory",
      es: "Asesoría en ferias y congresos",
    },
    summary: {
      en: "Guidance on attending fairs, congresses, and business events with a clear purpose.",
      es: "Orientación para asistir a ferias, congresos y eventos de negocio con un propósito claro.",
    },
    description: {
      en: "We help you evaluate which events are relevant, plan meetings around the program, and prepare the materials you need. Registration, travel, and exhibitor costs are handled separately.",
      es: "Te ayudamos a evaluar qué eventos son relevantes, planificar reuniones alrededor del programa y preparar los materiales necesarios. El registro, los viajes y los costos de expositor se gestionan por separado.",
    },
    audience: {
      en: "Companies considering a trade show or congress for the first time.",
      es: "Empresas que consideran una feria o congreso por primera vez.",
    },
    access: "separate",
    ctaLabel: { en: "Request information", es: "Solicitar información" },
    editorialStatus: "needs-review",
    status: "published",
  },
  {
    id: "service-fda-agent",
    slug: "fda-agent",
    name: { en: "FDA agent services", es: "Servicios de agente FDA" },
    summary: {
      en: "Registration and U.S. agent support for companies that need to communicate with the FDA.",
      es: "Apoyo de registro y agente en Estados Unidos para empresas que necesitan comunicarse con la FDA.",
    },
    description: {
      en: "We explain the registration and agent steps that may apply to your product and help you prepare the information required. This is not legal advice; regulated companies should confirm obligations with qualified counsel.",
      es: "Explicamos los pasos de registro y agente que pueden aplicar a tu producto y te ayudamos a preparar la información requerida. Esto no constituye asesoría legal; las empresas reguladas deben confirmar sus obligaciones con un asesor calificado.",
    },
    audience: {
      en: "Regulated companies preparing a U.S. market entry.",
      es: "Empresas reguladas que preparan su entrada al mercado estadounidense.",
    },
    access: "separate",
    ctaLabel: { en: "Request information", es: "Solicitar información" },
    editorialStatus: "needs-review",
    status: "published",
  },
  {
    id: "service-publications",
    slug: "publications",
    name: { en: "Publications", es: "Publicaciones" },
    summary: {
      en: "Publications and updates of interest to the business community.",
      es: "Publicaciones y actualizaciones de interés para la comunidad empresarial.",
    },
    description: {
      en: "We share publications and editorial updates on topics relevant to members. Availability depends on the publication and membership level, and archived material may not reflect current rules.",
      es: "Compartimos publicaciones y actualizaciones editoriales sobre temas relevantes para los socios. La disponibilidad depende de la publicación y del nivel de membresía, y el material archivado puede no reflejar las normas vigentes.",
    },
    audience: {
      en: "Members who want a curated view of business topics.",
      es: "Socios que buscan una visión curada de temas empresariales.",
    },
    access: "included",
    ctaLabel: { en: "Request access", es: "Solicitar acceso" },
    editorialStatus: "needs-review",
    status: "published",
  },
];

/** Un servicio retirado o no publicado nunca llega a las rutas ni al listado. */
export function isPublicService(service: Service): boolean {
  return service.status === "published";
}

export function getPublishedServices(
  services: Service[] = SERVICES,
): Service[] {
  return services.filter(isPublicService);
}

export function getServiceBySlug(
  slug: string,
  services: Service[] = SERVICES,
): Service | undefined {
  return getPublishedServices(services).find(
    (service) => service.slug === slug,
  );
}
