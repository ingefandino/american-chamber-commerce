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
 * Debe permanecer vacía hasta recibir nombres reales, autorización de uso y
 * evidencia de membresía. Los nombres candidatos del backlog no se publican
 * como miembros mientras no exista esa verificación.
 */
export const TRUSTED_MEMBERS: TrustedMember[] = [];

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
