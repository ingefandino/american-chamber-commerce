export const LANGUAGE_SCROLL_KEY = "acc:language-scroll";
export const LANGUAGE_SCROLL_MAX_AGE = 60_000;

export interface LanguageScrollRecord {
  from: string;
  target: string;
  ratio: number;
  placement: string;
  createdAt: number;
}

export interface LanguageScrollInput {
  from: string;
  target: string;
  scrollY: number;
  scrollHeight: number;
  viewportHeight: number;
  placement: string;
  now?: number;
}

const clampRatio = (value: number): number =>
  Math.min(1, Math.max(0, value));

const isLocalPath = (value: unknown): value is string =>
  typeof value === "string" && value.startsWith("/") && !value.startsWith("//");

export function scrollRatio(
  scrollY: number,
  scrollHeight: number,
  viewportHeight: number,
): number {
  const max = Math.max(0, scrollHeight - viewportHeight);
  if (max === 0 || !Number.isFinite(scrollY)) return 0;
  return clampRatio(scrollY / max);
}

export function scrollTopForRatio(
  ratio: number,
  scrollHeight: number,
  viewportHeight: number,
): number {
  const max = Math.max(0, scrollHeight - viewportHeight);
  const safeRatio = Number.isFinite(ratio) ? clampRatio(ratio) : 0;
  return Math.round(safeRatio * max);
}

export function createLanguageScrollRecord({
  from,
  target,
  scrollY,
  scrollHeight,
  viewportHeight,
  placement,
  now = Date.now(),
}: LanguageScrollInput): LanguageScrollRecord {
  return {
    from,
    target,
    ratio: scrollRatio(scrollY, scrollHeight, viewportHeight),
    placement,
    createdAt: now,
  };
}

export function parseLanguageScrollRecord(
  raw: string | null,
): LanguageScrollRecord | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<LanguageScrollRecord>;
    if (
      !isLocalPath(parsed.from) ||
      !isLocalPath(parsed.target) ||
      typeof parsed.ratio !== "number" ||
      !Number.isFinite(parsed.ratio) ||
      parsed.ratio < 0 ||
      parsed.ratio > 1 ||
      typeof parsed.placement !== "string" ||
      parsed.placement.length === 0 ||
      typeof parsed.createdAt !== "number" ||
      !Number.isFinite(parsed.createdAt)
    ) {
      return null;
    }

    return parsed as LanguageScrollRecord;
  } catch {
    return null;
  }
}

export function isLanguageScrollRecordFresh(
  record: LanguageScrollRecord,
  now = Date.now(),
  maxAge = LANGUAGE_SCROLL_MAX_AGE,
): boolean {
  const age = now - record.createdAt;
  return age >= 0 && age <= maxAge;
}

export function shouldRestoreLanguageScroll(
  record: LanguageScrollRecord | null,
  currentPath: string,
  now = Date.now(),
  maxAge = LANGUAGE_SCROLL_MAX_AGE,
): record is LanguageScrollRecord {
  return Boolean(
    record &&
      record.target === currentPath &&
      isLanguageScrollRecordFresh(record, now, maxAge),
  );
}
