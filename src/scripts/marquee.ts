export function initMarquee(root: ParentNode = document): void {
  root
    .querySelectorAll<HTMLButtonElement>("[data-marquee-toggle]")
    .forEach((button) => {
      const section = button.closest<HTMLElement>("[data-member-marquee]");
      const text = button.querySelector<HTMLElement>(
        "[data-marquee-toggle-text]",
      );
      if (!section) return;

      button.addEventListener("click", () => {
        const paused = section.dataset.paused !== "true";
        section.dataset.paused = String(paused);
        button.setAttribute("aria-pressed", String(paused));

        const label = paused
          ? button.dataset.labelPlay
          : button.dataset.labelPause;
        if (label) button.setAttribute("aria-label", label);

        if (text) {
          const visibleLabel = paused
            ? button.dataset.labelPlayShort
            : button.dataset.labelPauseShort;
          if (visibleLabel) text.textContent = visibleLabel;
        }
      });
    });
}
