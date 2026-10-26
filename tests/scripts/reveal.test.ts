// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from "vitest";
import { initReveal } from "@scripts/reveal";

beforeEach(() => {
  document.body.innerHTML = `
    <div data-reveal="up"></div>
    <div data-reveal="left"></div>
  `;
});

describe("initReveal", () => {
  it("keeps content visible when reduced motion is requested", () => {
    initReveal({ reducedMotion: true });
    for (const element of document.querySelectorAll("[data-reveal]")) {
      expect(element.classList.contains("is-visible")).toBe(true);
    }
  });

  it("keeps content visible when IntersectionObserver is unavailable", () => {
    initReveal({ reducedMotion: false, Observer: null });
    for (const element of document.querySelectorAll("[data-reveal]")) {
      expect(element.classList.contains("is-visible")).toBe(true);
    }
  });

  it("reveals only elements reported as intersecting", () => {
    const observe = vi.fn();
    class FakeObserver {
      constructor(private callback: IntersectionObserverCallback) {}
      observe(element: Element) {
        observe(element);
        this.callback(
          [
            {
              target: element,
              isIntersecting: element === document.body.children[0],
            } as IntersectionObserverEntry,
          ],
          this as unknown as IntersectionObserver,
        );
      }
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }

    initReveal({
      reducedMotion: false,
      Observer: FakeObserver as unknown as typeof IntersectionObserver,
    });

    const [first, second] = document.querySelectorAll("[data-reveal]");
    expect(first.classList.contains("is-visible")).toBe(true);
    expect(second.classList.contains("is-visible")).toBe(false);
    expect(observe).toHaveBeenCalledTimes(2);
  });
});
