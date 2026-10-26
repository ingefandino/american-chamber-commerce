import type { Lang } from "@lib/lang";

export type MemberStatus = "active" | "pending" | "inactive" | "draft" | "retired";

export interface PublicMember {
  id: string;
  slug: string;
  name: string;
  description: Record<Lang, string>;
  sector: Record<Lang, string>;
  category: Record<Lang, string>;
  location: {
    city: string;
    region: string;
    country: string;
  };
  website?: string;
  social?: string[];
  services?: Record<Lang, string[]>;
  markets?: string[];
  membershipLevel?: string;
  lastReviewedAt: string;
  status: MemberStatus;
  authorized: boolean;
  translations: Lang[];
}

/**
 * Campos que el modelo público puede contener. Los documentos de
 * constitución, EIN, DUNS, contratos, notas internas y datos personales
 * de representantes no forman parte de este contrato.
 */
export const PUBLIC_MEMBER_FIELDS = [
  "id",
  "slug",
  "name",
  "description",
  "sector",
  "category",
  "location",
  "website",
  "social",
  "services",
  "markets",
  "membershipLevel",
  "lastReviewedAt",
  "status",
  "authorized",
  "translations",
] as const;

/**
 * Directorio editorial. Está vacío a propósito: no hay nombres de empresas
 * autorizados en las fuentes disponibles. El estado vacío es el resultado
 * honesto; no se inventan perfiles para llenar la página.
 */
export const MEMBERS: PublicMember[] = [];

export function isPublicMember(member: PublicMember): boolean {
  return (
    member.status === "active" &&
    member.authorized === true &&
    member.lastReviewedAt.length > 0
  );
}

export function hasMemberTranslation(
  member: PublicMember,
  lang: Lang,
): boolean {
  return member.translations.includes(lang);
}

export function getPublicMembers(
  lang: Lang,
  members: PublicMember[] = MEMBERS,
): PublicMember[] {
  return members.filter(
    (member) => isPublicMember(member) && hasMemberTranslation(member, lang),
  );
}

export function getMemberBySlug(
  slug: string,
  lang: Lang,
  members: PublicMember[] = MEMBERS,
): PublicMember | undefined {
  return getPublicMembers(lang, members).find(
    (member) => member.slug === slug,
  );
}
