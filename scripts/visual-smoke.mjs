#!/usr/bin/env node
/**
 * Optional visual smoke test. Requires a local Chrome/Chromium.
 * It is not part of CI because the hosted runner does not ship a browser.
 */
import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = join(root, "dist");

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".gif": "image/gif",
  ".woff2": "font/woff2",
};

function safePath(pathname) {
  const decoded = decodeURIComponent(pathname.split("?")[0]);
  const relative = normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  return join(dist, relative);
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", "http://localhost");
  let file = safePath(url.pathname);
  if (url.pathname.endsWith("/")) file = join(file, "index.html");
  if (!file.startsWith(dist)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  try {
    const data = await readFile(file);
    response.writeHead(200, {
      "Content-Type": mime[extname(file)] ?? "application/octet-stream",
    });
    response.end(data);
  } catch {
    const notFound = await readFile(join(dist, "404.html"));
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end(notFound);
  }
});

const candidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const playwrightChromium = chromium.executablePath();
const executablePath =
  candidates.find((candidate) => existsSync(candidate)) ??
  (existsSync(playwrightChromium) ? playwrightChromium : undefined);

if (!executablePath) {
  console.log("⚓ Visual smoke skipped: no Chrome/Chromium executable found.");
  process.exit(0);
}

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const base = `http://127.0.0.1:${port}`;

const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const overlaps = (a, b) =>
  Boolean(
    a &&
      b &&
      !(
        a.x + a.width <= b.x ||
        b.x + b.width <= a.x ||
        a.y + a.height <= b.y ||
        b.y + b.height <= a.y
      ),
  );

const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox"],
});

try {
  const context = await browser.newContext();
  await context.route("**/*", (route) => {
    if (route.request().url().startsWith(base)) return route.continue();
    return route.abort();
  });

  const page = await context.newPage();
  page.on("pageerror", (error) => failures.push(`pageerror: ${error.message}`));

  const routes = [
    "/en/",
    "/es/",
    "/en/about/",
    "/es/membership/plans/",
    "/en/membership/benefits/",
    "/es/contact/",
    "/en/contact/",
    "/en/events/",
    "/es/events/",
    "/en/services/",
    "/es/sponsorship/",
    "/en/members/",
  ];

  for (const width of [320, 360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded" });
      const overflow = await page.evaluate(() => {
        window.scrollTo(9999, 0);
        const scrollX = window.scrollX;
        window.scrollTo(0, 0);
        const html = document.documentElement;
        return {
          scrollX,
          scrollWidth: html.scrollWidth,
          clientWidth: html.clientWidth,
        };
      });
      check(
        overflow.scrollX === 0,
        `${route} @ ${width}px: page can scroll horizontally`,
      );
      if (overflow.scrollWidth > overflow.clientWidth + 1) {
        console.warn(
          `⚠ ${route} @ ${width}px: content width ${overflow.scrollWidth}px is clipped (table scrolls internally).`,
        );
      }
    }
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/en/`, { waitUntil: "domcontentloaded" });

  const whatsapp = page.locator("[data-whatsapp]");
  check(await whatsapp.count() === 1, "WhatsApp: button is missing");
  const whatsappBox = await whatsapp.boundingBox();
  check(
    Boolean(whatsappBox && whatsappBox.width >= 44 && whatsappBox.height >= 44),
    "WhatsApp: touch target is smaller than 44px",
  );
  check(
    (await whatsapp.getAttribute("href"))?.startsWith(
      "https://wa.me/13473012169",
    ),
    "WhatsApp: official number is not used",
  );
  const sliderToggleBox = await page.locator("[data-slider-toggle]").boundingBox();
  check(
    !overlaps(whatsappBox, sliderToggleBox),
    "WhatsApp: button covers the slider pause control",
  );

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForTimeout(50);
  const waveAnimation = await page
    .locator(".whatsapp-button__wave")
    .first()
    .evaluate((element) => getComputedStyle(element).animationName);
  check(
    waveAnimation === "none",
    `WhatsApp: ripple still animates under reduced motion (${waveAnimation})`,
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });

  await page.goto(`${base}/en/`, { waitUntil: "domcontentloaded" });
  const backToTop = page.locator("[data-back-to-top]");
  check(await backToTop.count() === 1, "Back to top: button is missing");
  check(
    await backToTop.evaluate((element) => element.hasAttribute("hidden")),
    "Back to top: visible before scrolling",
  );
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(150);
  check(
    await backToTop.evaluate((element) => !element.hasAttribute("hidden")),
    "Back to top: did not appear after scrolling",
  );
  check(
    !overlaps(await backToTop.boundingBox(), whatsappBox),
    "Back to top: button overlaps the WhatsApp button",
  );
  await backToTop.click();
  await page.waitForTimeout(650);
  check(
    (await page.evaluate(() => window.scrollY)) < 10,
    "Back to top: did not return to the top",
  );
  check(
    (await page.evaluate(() => document.activeElement?.id)) === "main",
    "Back to top: did not move focus to main",
  );

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForTimeout(50);
  const backToTopTransition = await backToTop.evaluate(
    (element) => getComputedStyle(element).transitionDuration,
  );
  check(
    Number.parseFloat(backToTopTransition) <= 0.001,
    `Back to top: transition still active under reduced motion (${backToTopTransition})`,
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });

  const firstDot = page.locator("[data-slider-dot]").first();
  check(
    (await firstDot.getAttribute("aria-selected")) === "true",
    "slider: first dot is not selected",
  );
  await page.locator("[data-slider-dot]").nth(1).click();
  await page.waitForTimeout(400);
  const selectedAfterNext = await page
    .locator('[data-slider-dot][aria-selected="true"]')
    .getAttribute("aria-label");
  check(
    selectedAfterNext === "Build your network",
    `slider: dot navigation did not advance (${selectedAfterNext})`,
  );

  await page.locator("[data-slider-toggle]").click();
  check(
    (await page.locator("[data-slider-toggle]").getAttribute("aria-pressed")) ===
      "true",
    "slider: pause toggle did not report pressed",
  );

  await page.goto(`${base}/en/contact/`, { waitUntil: "domcontentloaded" });
  await page.locator('[data-contact-form] button[type="submit"]').click();
  check(
    (await page.locator('[data-error-for="name"]').textContent())?.includes(
      "required",
    ),
    "contact form: missing first-error message",
  );
  check(
    (await page.evaluate(() => document.activeElement?.getAttribute("name"))) ===
      "name",
    "contact form: first invalid field did not receive focus",
  );

  await page.fill("#contact-name", "Ana García");
  await page.fill("#contact-email", "ana@example.com");
  await page.fill("#contact-message", "I would like more information.");
  await page.check("#contact-consent");
  await page.locator('[data-contact-form] button[type="submit"]').click();
  await page.waitForTimeout(250);
  check(
    (await page.locator("[data-form-status]").textContent())?.includes(
      "not available",
    ),
    "contact form: missing not-configured fallback",
  );
  check(
    (await page.inputValue("#contact-name")) === "Ana García",
    "contact form: data was cleared after failure",
  );

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${base}/en/`, { waitUntil: "domcontentloaded" });

  const scrollState = () =>
    page.evaluate(() => {
      const max = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      return {
        y: window.scrollY,
        ratio: max > 0 ? window.scrollY / max : 0,
        lang: document.documentElement.lang,
        activePlacement:
          document.activeElement?.getAttribute("data-placement") ?? null,
        activeSwitch: document.activeElement?.hasAttribute(
          "data-language-switch",
        ),
      };
    });

  const scrollToRatio = async (ratio) => {
    await page.evaluate((value) => {
      const max = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      window.scrollTo({ top: max * value, left: 0, behavior: "instant" });
    }, ratio);
    await page.waitForTimeout(100);
  };

  const languageLink = (placement) =>
    page
      .locator(
        `.language-switcher [data-language-switch][data-placement="${placement}"]`,
      )
      .first();

  const keyboardSwitch = async (placement, url) => {
    await languageLink(placement).evaluate((element) =>
      element.focus({ preventScroll: true }),
    );
    await page.keyboard.press("Enter");
    await page.waitForURL(url);
    await page.waitForTimeout(150);
  };

  const clickSwitch = async (placement, url) => {
    await languageLink(placement).click();
    await page.waitForURL(url);
    await page.waitForTimeout(150);
  };

  await keyboardSwitch("header-desktop", "**/es/");
  let state = await scrollState();
  check(state.lang === "es-US", "language switch: document language did not change");
  check(
    state.ratio <= 0.02,
    `language switch: top position was not preserved (${state.ratio})`,
  );

  await keyboardSwitch("header-desktop", "**/en/");
  state = await scrollState();
  check(
    state.ratio <= 0.02,
    `language switch: top position was not preserved in English (${state.ratio})`,
  );

  await page.goto(`${base}/en/about/`, { waitUntil: "domcontentloaded" });
  await scrollToRatio(0.45);
  const midpoint = await scrollState();
  await keyboardSwitch("header-desktop", "**/es/about/");
  state = await scrollState();
  check(
    Math.abs(state.ratio - midpoint.ratio) <= 0.06,
    `language switch: midpoint was not preserved (${midpoint.ratio} -> ${state.ratio})`,
  );
  check(
    state.activeSwitch && state.activePlacement === "header-desktop",
    "language switch: focus did not return to the activated control",
  );

  await scrollToRatio(0.6);
  const spanishMidpoint = await scrollState();
  await keyboardSwitch("header-desktop", "**/en/about/");
  state = await scrollState();
  check(
    Math.abs(state.ratio - spanishMidpoint.ratio) <= 0.06,
    `language switch: Spanish midpoint was not preserved (${spanishMidpoint.ratio} -> ${state.ratio})`,
  );

  await scrollToRatio(1);
  await clickSwitch("footer", "**/es/about/");
  state = await scrollState();
  check(
    state.ratio >= 0.9,
    `language switch: footer position was not preserved (${state.ratio})`,
  );
  check(
    state.activeSwitch && state.activePlacement === "footer",
    "language switch: footer control did not regain focus",
  );

  await page.goto(`${base}/es/does-not-exist`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(100);
  check(
    (await page.evaluate(() => document.documentElement.lang)) === "es-US",
    "404: did not keep the Spanish language",
  );
  check(
    (await page.locator("h1").innerText()).includes("Página no encontrada"),
    "404: Spanish heading not visible",
  );
} finally {
  await browser.close();
  server.close();
}

if (failures.length) {
  console.error(`✖ Visual smoke failed with ${failures.length} issue(s):`);
  console.error(failures.map((failure) => `  - ${failure}`).join("\n"));
  process.exit(1);
}

console.log(
  "✓ Visual smoke passed: overflow, slider, forms, language scroll, and 404.",
);
