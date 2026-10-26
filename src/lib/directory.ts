import type { Lang } from "./lang";
import type { PublicMember } from "@data/members";

export interface DirectoryFilters {
  query: string;
  sector: string;
}

export function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function memberSearchText(
  member: PublicMember,
  lang: Lang,
): string {
  return [
    member.name,
    member.description[lang],
    member.sector[lang],
    member.category[lang],
    member.location.city,
    member.location.region,
    member.location.country,
    ...(member.services?.[lang] ?? []),
    ...(member.markets ?? []),
  ].join(" ");
}

export function matchesDirectoryFilters(
  member: PublicMember,
  lang: Lang,
  filters: DirectoryFilters,
): boolean {
  const query = normalizeSearch(filters.query);
  if (query) {
    const haystack = normalizeSearch(memberSearchText(member, lang));
    if (!haystack.includes(query)) return false;
  }

  if (filters.sector) {
    if (normalizeSearch(member.sector[lang]) !== normalizeSearch(filters.sector)) {
      return false;
    }
  }

  return true;
}

export function filterMembers(
  members: PublicMember[],
  lang: Lang,
  filters: DirectoryFilters,
): PublicMember[] {
  return members.filter((member) =>
    matchesDirectoryFilters(member, lang, filters),
  );
}

export function parseDirectoryParams(
  params: URLSearchParams,
): DirectoryFilters {
  return {
    query: params.get("q")?.slice(0, 120) ?? "",
    sector: params.get("sector")?.slice(0, 120) ?? "",
  };
}

export function buildDirectoryQuery(filters: DirectoryFilters): string {
  const params = new URLSearchParams();
  if (filters.query.trim()) params.set("q", filters.query.trim());
  if (filters.sector.trim()) params.set("sector", filters.sector.trim());
  const query = params.toString();
  return query ? `?${query}` : "";
}

export function getDirectorySectors(
  members: PublicMember[],
  lang: Lang,
): string[] {
  return [...new Set(members.map((member) => member.sector[lang]))].sort(
    (a, b) => a.localeCompare(b),
  );
}

/** Restaurar filtros significa volver al listado base, sin parámetros. */
export function clearDirectoryFilters(basePath: string): string {
  return basePath;
}
