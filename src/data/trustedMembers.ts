export interface TrustedMember {
  id: string;
  name: string;
  approved: boolean;
  authorized: boolean;
  source?: string;
  reviewedAt?: string;
}

/**
 * Lista editorial de empresas para la franja de confianza.
 *
 * Los nombres fueron confirmados por el cliente como miembros reales el
 * 2026-10-26. Cualquier alta nueva debe repetir la misma verificación.
 */
export const TRUSTED_MEMBERS: TrustedMember[] = [
  {
    id: "harbor-and-co",
    name: "Harbor & Co.",
    approved: true,
    authorized: true,
    source: "Confirmación del cliente",
    reviewedAt: "2026-10-26",
  },
  {
    id: "meridian-group",
    name: "Meridian Group",
    approved: true,
    authorized: true,
    source: "Confirmación del cliente",
    reviewedAt: "2026-10-26",
  },
  {
    id: "union-steelworks",
    name: "Union Steelworks",
    approved: true,
    authorized: true,
    source: "Confirmación del cliente",
    reviewedAt: "2026-10-26",
  },
  {
    id: "ashford-partners",
    name: "Ashford Partners",
    approved: true,
    authorized: true,
    source: "Confirmación del cliente",
    reviewedAt: "2026-10-26",
  },
  {
    id: "beacon-logistics",
    name: "Beacon Logistics",
    approved: true,
    authorized: true,
    source: "Confirmación del cliente",
    reviewedAt: "2026-10-26",
  },
  {
    id: "northgate-foods",
    name: "Northgate Foods",
    approved: true,
    authorized: true,
    source: "Confirmación del cliente",
    reviewedAt: "2026-10-26",
  },
  {
    id: "sterling-capital",
    name: "Sterling Capital",
    approved: true,
    authorized: true,
    source: "Confirmación del cliente",
    reviewedAt: "2026-10-26",
  },
  {
    id: "willow-creek-bank",
    name: "Willow Creek Bank",
    approved: true,
    authorized: true,
    source: "Confirmación del cliente",
    reviewedAt: "2026-10-26",
  },
];

export function isPublicTrustedMember(member: TrustedMember): boolean {
  return Boolean(
    member.approved &&
      member.authorized &&
      member.name.trim() &&
      member.source?.trim() &&
      member.reviewedAt?.trim(),
  );
}

export function getTrustedMemberNames(
  members: TrustedMember[] = TRUSTED_MEMBERS,
): string[] {
  return members
    .filter(isPublicTrustedMember)
    .map((member) => member.name.trim());
}
