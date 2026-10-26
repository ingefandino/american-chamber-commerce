import type { Lang } from "@lib/lang";
import type { RouteKey } from "@lib/routes";

export interface ResourceItem {
  id: string;
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
  category: Record<Lang, string>;
  hrefKey: RouteKey;
  hrefSuffix?: string;
  editorialStatus: "needs-review" | "approved";
}

/** Recursos navegacionales que apuntan a servicios y secciones publicadas. */
export const RESOURCES: ResourceItem[] = [
  {
    id: "resource-market-information",
    title: { en: "Market information", es: "Información de mercado" },
    summary: {
      en: "Orientation on market conditions and where to find official sources.",
      es: "Orientación sobre condiciones de mercado y dónde encontrar fuentes oficiales.",
    },
    category: { en: "Research", es: "Investigación" },
    hrefKey: "services",
    hrefSuffix: "market-information/",
    editorialStatus: "needs-review",
  },
  {
    id: "resource-publications",
    title: { en: "Publications", es: "Publicaciones" },
    summary: {
      en: "Publications and editorial updates of interest to members.",
      es: "Publicaciones y actualizaciones editoriales de interés para socios.",
    },
    category: { en: "Publications", es: "Publicaciones" },
    hrefKey: "services",
    hrefSuffix: "publications/",
    editorialStatus: "needs-review",
  },
  {
    id: "resource-business-center",
    title: { en: "Business center", es: "Centro de negocios" },
    summary: {
      en: "Meeting rooms and workspaces in our U.S. offices, subject to availability.",
      es: "Salas de reuniones y espacios de trabajo en nuestras oficinas de EE. UU., sujetos a disponibilidad.",
    },
    category: { en: "Workspace", es: "Espacio de trabajo" },
    hrefKey: "services",
    hrefSuffix: "business-center/",
    editorialStatus: "needs-review",
  },
  {
    id: "resource-trade-missions",
    title: { en: "Trade missions", es: "Misiones comerciales" },
    summary: {
      en: "Support for companies exploring expansion and commercial partners.",
      es: "Apoyo para empresas que exploran expansión y socios comerciales.",
    },
    category: { en: "Trade", es: "Comercio" },
    hrefKey: "services",
    hrefSuffix: "trade-missions/",
    editorialStatus: "needs-review",
  },
];
