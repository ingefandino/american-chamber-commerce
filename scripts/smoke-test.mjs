#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { Window } from "happy-dom";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = join(root, "dist");

async function load(route) {
  const file = route.endsWith("/")
    ? join(dist, route, "index.html")
    : join(dist, route);
  const html = await readFile(file, "utf8");
  const window = new Window();
  window.document.write(html);
  return window.document;
}

const failures = [];
function check(condition, message) {
  if (!condition) failures.push(message);
}

const cases = [
  { route: "/en/", lang: "en-US", slider: true },
  { route: "/es/", lang: "es-US", slider: true },
  { route: "/en/membership/plans/", lang: "en-US" },
  { route: "/es/membership/plans/", lang: "es-US" },
  { route: "/en/membership/apply/", lang: "en-US", membershipForm: true },
  { route: "/es/membership/apply/", lang: "es-US", membershipForm: true },
  { route: "/en/contact/", lang: "en-US", contactForm: true },
  { route: "/es/contact/", lang: "es-US", contactForm: true },
  { route: "/en/events/", lang: "en-US" },
  { route: "/es/events/", lang: "es-US" },
  {
    route: "/en/events/annual-gala-2025/",
    lang: "en-US",
    eventForm: true,
  },
  {
    route: "/es/events/annual-gala-2025/",
    lang: "es-US",
    eventForm: true,
  },
  {
    route: "/en/services/market-research/",
    lang: "en-US",
  },
];

for (const item of cases) {
  const document = await load(item.route);
  check(
    document.documentElement.getAttribute("lang") === item.lang,
    `${item.route}: expected lang ${item.lang}`,
  );
  check(document.querySelectorAll("main").length === 1, `${item.route}: main`);
  check(document.querySelectorAll("h1").length === 1, `${item.route}: h1`);
  check(document.querySelector(".skip-link"), `${item.route}: skip link`);
  check(document.querySelector(".site-header"), `${item.route}: header`);
  check(document.querySelector(".site-footer"), `${item.route}: footer`);
  check(
    document.querySelector(".language-switcher"),
    `${item.route}: language switcher`,
  );
  check(
    document.querySelector('link[rel="canonical"]'),
    `${item.route}: canonical`,
  );
  const whatsapp = document.querySelector("[data-whatsapp]");
  check(whatsapp, `${item.route}: WhatsApp button`);
  if (whatsapp) {
    check(
      whatsapp.getAttribute("href")?.startsWith("https://wa.me/13473012169"),
      `${item.route}: WhatsApp official number`,
    );
    check(
      whatsapp.getAttribute("rel") === "noopener noreferrer",
      `${item.route}: WhatsApp rel`,
    );
  }

  if (item.slider) {
    check(document.querySelector("[data-slider]"), `${item.route}: slider`);
    check(
      document.querySelectorAll("[data-slider-dot]").length === 9,
      `${item.route}: 9 slider dots`,
    );
    check(
      document.querySelector("[data-slider-prev]") &&
        document.querySelector("[data-slider-next]"),
      `${item.route}: slider controls`,
    );
  }

  if (item.membershipForm) {
    check(
      document.querySelector("[data-membership-form]"),
      `${item.route}: membership form`,
    );
    check(
      document.querySelector('[name="botcheck"]'),
      `${item.route}: honeypot`,
    );
  }

  if (item.contactForm) {
    check(
      document.querySelector("[data-contact-form]"),
      `${item.route}: contact form`,
    );
  }

  if (item.eventForm) {
    check(
      document.querySelector("[data-event-form]"),
      `${item.route}: event form`,
    );
  }
}

const notFound = await load("/404.html");
check(notFound.querySelector("main"), "404: main");
check(notFound.querySelectorAll("h1").length === 1, "404: one h1");
check(
  notFound.querySelector('[data-lang-block="en"]'),
  "404: English content",
);
check(
  notFound.querySelector('[data-lang-block="es"]'),
  "404: Spanish content",
);

if (failures.length) {
  console.error(`✖ Smoke test failed with ${failures.length} issue(s):`);
  console.error(failures.map((failure) => `  - ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`✓ Smoke test passed: ${cases.length + 1} critical pages.`);
