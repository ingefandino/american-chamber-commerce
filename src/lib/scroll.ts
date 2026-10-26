export const BACK_TO_TOP_THRESHOLD = 480;

export function shouldShowBackToTop(
  scrollY: number,
  threshold = BACK_TO_TOP_THRESHOLD,
): boolean {
  return scrollY > threshold;
}

export function scrollBehavior(reducedMotion: boolean): ScrollBehavior {
  return reducedMotion ? "auto" : "smooth";
}
