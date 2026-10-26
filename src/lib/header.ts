export const HEADER_HIDE_AFTER = 140;
export const HEADER_DELTA = 6;
export const HEADER_SCROLLED_AFTER = 24;

export interface HeaderStateInput {
  current: number;
  last: number;
  hidden: boolean;
  menuOpen: boolean;
  reducedMotion: boolean;
}

export interface HeaderState {
  scrolled: boolean;
  hidden: boolean;
}

/**
 * Estado del header en función del scroll. El menú abierto y
 * `prefers-reduced-motion` siempre tienen prioridad para mantenerlo visible.
 */
export function nextHeaderState(input: HeaderStateInput): HeaderState {
  const scrolled = input.current > HEADER_SCROLLED_AFTER;

  if (input.menuOpen || input.reducedMotion) {
    return { scrolled, hidden: false };
  }

  if (
    input.current > input.last + HEADER_DELTA &&
    input.current > HEADER_HIDE_AFTER
  ) {
    return { scrolled, hidden: true };
  }

  if (input.current < input.last - HEADER_DELTA) {
    return { scrolled, hidden: false };
  }

  return { scrolled, hidden: input.hidden };
}
