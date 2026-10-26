// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vitest";
import { initMarquee } from "@scripts/marquee";

beforeEach(() => {
  document.body.innerHTML = `
    <section data-member-marquee>
      <button
        type="button"
        data-marquee-toggle
        aria-pressed="false"
        aria-label="Pause member marquee"
        data-label-pause="Pause member marquee"
        data-label-play="Play member marquee"
        data-label-pause-short="Pause"
        data-label-play-short="Play"
      >
        <span data-marquee-toggle-text>Pause</span>
      </button>
    </section>
  `;
  initMarquee(document);
});

describe("initMarquee", () => {
  it("pauses and resumes the marquee", () => {
    const section = document.querySelector<HTMLElement>(
      "[data-member-marquee]",
    )!;
    const button = document.querySelector<HTMLButtonElement>(
      "[data-marquee-toggle]",
    )!;
    const text = document.querySelector<HTMLElement>(
      "[data-marquee-toggle-text]",
    )!;

    button.click();
    expect(section.dataset.paused).toBe("true");
    expect(button.getAttribute("aria-pressed")).toBe("true");
    expect(button.getAttribute("aria-label")).toBe("Play member marquee");
    expect(text.textContent).toBe("Play");

    button.click();
    expect(section.dataset.paused).toBe("false");
    expect(button.getAttribute("aria-pressed")).toBe("false");
    expect(button.getAttribute("aria-label")).toBe("Pause member marquee");
    expect(text.textContent).toBe("Pause");
  });
});
