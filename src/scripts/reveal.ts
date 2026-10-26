export interface RevealOptions {
  root?: ParentNode;
  reducedMotion?: boolean;
  Observer?: typeof IntersectionObserver | null;
}

/**
 * Revela elementos `[data-reveal]` al entrar en viewport. Sin JavaScript,
 * sin IntersectionObserver o con reduced motion, el contenido queda visible.
 */
export function initReveal(options: RevealOptions = {}): void {
  const root = options.root ?? document;
  const elements = Array.from(
    root.querySelectorAll<HTMLElement>("[data-reveal]"),
  );

  if (!elements.length) return;

  const reducedMotion =
    options.reducedMotion ??
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const Observer =
    options.Observer === undefined
      ? globalThis.IntersectionObserver
      : options.Observer;

  if (!Observer) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new Observer(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );

  elements.forEach((element) => observer.observe(element));
}
