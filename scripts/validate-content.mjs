#!/usr/bin/env node
import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = join(root, "dist");
const site = "https://americanchamberofcommerce.us";

const errors = [];
const warnings = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function routeOf(file) {
  const rel = relative(dist, file).split("\\").join("/");
  if (rel === "index.html") return "/";
  if (rel === "404.html") return "/404";
  return `/${rel.replace(/index\.html$/, "")}`;
}

function fileForHref(href, fromFile) {
  const clean = href.replaceAll("&amp;", "&").split("#")[0].split("?")[0];
  if (!clean) return null;
  let pathname = clean;
  if (!clean.startsWith("/")) {
    const fromRoute = routeOf(fromFile);
    pathname = new URL(clean, `${site}${fromRoute}`).pathname;
  }
  const relativePath = decodeURIComponent(pathname).replace(/^\/+/, "");
  const candidates = [];
  if (pathname.endsWith("/")) {
    candidates.push(join(dist, relativePath, "index.html"));
  } else if (extname(relativePath)) {
    candidates.push(join(dist, relativePath));
  } else {
    candidates.push(join(dist, relativePath), join(dist, relativePath, "index.html"));
  }
  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function htmlFiles(files) {
  return files.filter((file) => file.endsWith(".html"));
}

const expectedStatic = [
  "",
  "about/",
  "about/governance/",
  "about/leadership/",
  "about/mission/",
  "accessibility/",
  "advocacy/",
  "contact/",
  "events/",
  "members/",
  "membership/",
  "membership/apply/",
  "membership/benefits/",
  "membership/plans/",
  "news/",
  "partners/",
  "privacy/",
  "resources/",
  "services/",
  "sponsorship/",
  "terms/",
];

const serviceSlugs = [
  "business-center",
  "fda-agent",
  "market-information",
  "market-research",
  "promotion-and-marketing",
  "publications",
  "trade-fairs-and-congress-advisory",
  "trade-missions",
];

const policySlugs = [
  "infrastructure",
  "tax-and-fiscal-policy",
  "trade",
  "workforce-development",
];

const expectedRoutes = new Set(["/"]);
for (const lang of ["en", "es"]) {
  for (const route of expectedStatic) expectedRoutes.add(`/${lang}/${route}`);
  for (const slug of serviceSlugs) {
    expectedRoutes.add(`/${lang}/services/${slug}/`);
  }
  for (const slug of policySlugs) {
    expectedRoutes.add(`/${lang}/advocacy/${slug}/`);
  }
}
expectedRoutes.add("/en/events/annual-gala-2025/");
expectedRoutes.add("/en/events/global-tech-summit-2024/");
expectedRoutes.add("/en/events/latin-american-business-forum-2025/");
expectedRoutes.add("/es/events/annual-gala-2025/");
expectedRoutes.add("/es/events/latin-american-business-forum-2025/");

const files = await walk(dist);
const pages = htmlFiles(files);
const builtRoutes = new Set(pages.map(routeOf));

for (const asset of ["favicon.svg", "favicon.ico", "apple-touch-icon.png"]) {
  assert(existsSync(join(dist, asset)), `Missing favicon asset: ${asset}`);
}

for (const route of expectedRoutes) {
  assert(builtRoutes.has(route), `Missing expected route: ${route}`);
}

const publicPages = pages.filter((file) => {
  const route = routeOf(file);
  return route !== "/" && route !== "/404";
});

for (const file of pages) {
  const html = await readFile(file, "utf8");
  const route = routeOf(file);

  if (route === "/") {
    assert(/name="robots" content="noindex/.test(html), "/: redirect page must be noindex");
    continue;
  }

  assert(/<html[^>]+lang="(en-US|es-US)"/.test(html), `${route}: missing html lang`);
  assert(/<main[\s>]/.test(html), `${route}: missing <main>`);
  assert(/class="skip-link"/.test(html), `${route}: missing skip link`);
  assert(
    (html.match(/<h1[\s>]/g) ?? []).length === 1,
    `${route}: expected exactly one <h1>`,
  );
  assert(/<link rel="canonical"/.test(html), `${route}: missing canonical link`);

  if (route === "/404") {
    assert(/name="robots" content="noindex/.test(html), "/404: must be noindex");
  } else {
    assert(
      /<link rel="alternate"[^>]+hreflang="es"/.test(html) ||
        /<link rel="alternate"[^>]+hreflang="en"/.test(html),
      `${route}: missing hreflang alternates`,
    );
  }

  const expectedCanonical =
    route === "/404" ? `${site}/404/` : `${site}${route}`;
  assert(
    html.includes(`rel="canonical" href="${expectedCanonical}"`),
    `${route}: canonical does not match the published URL`,
  );
  assert(
    /rel="manifest" href="\/site.webmanifest"/.test(html),
    `${route}: missing web manifest`,
  );
  assert(
    /rel="apple-touch-icon"/.test(html),
    `${route}: missing apple touch icon`,
  );
  assert(
    /rel="icon"[^>]+href="\/favicon\.svg"/.test(html),
    `${route}: missing favicon`,
  );
  assert(
    /rel="alternate icon"[^>]+href="\/favicon\.ico"/.test(html),
    `${route}: missing favicon fallback`,
  );

  for (const property of [
    "og:type",
    "og:site_name",
    "og:title",
    "og:description",
    "og:url",
    "og:locale",
    "og:image",
    "og:image:type",
    "og:image:width",
    "og:image:height",
    "og:image:alt",
  ]) {
    assert(
      new RegExp(`property="${property}"`).test(html),
      `${route}: missing ${property}`,
    );
  }
  assert(
    html.includes(
      'property="og:image" content="https://americanchamberofcommerce.us/og-image.jpg"',
    ),
    `${route}: og:image is not the stable social image`,
  );
  assert(
    html.includes('property="og:image:width" content="1200"') &&
      html.includes('property="og:image:height" content="630"'),
    `${route}: og:image dimensions are not 1200x630`,
  );
  for (const name of [
    "twitter:card",
    "twitter:title",
    "twitter:description",
    "twitter:image",
    "twitter:image:alt",
  ]) {
    assert(
      new RegExp(`name="${name}"`).test(html),
      `${route}: missing ${name}`,
    );
  }

  const jsonLdMatch = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(
    html,
  );
  assert(jsonLdMatch, `${route}: missing JSON-LD`);
  if (jsonLdMatch) {
    try {
      const data = JSON.parse(jsonLdMatch[1]);
      assert(
        data["@context"] === "https://schema.org",
        `${route}: invalid JSON-LD context`,
      );
      const types = (data["@graph"] ?? []).map((node) => node["@type"]);
      assert(types.includes("Organization"), `${route}: missing Organization schema`);
      assert(types.includes("WebSite"), `${route}: missing WebSite schema`);

      const isHome = route === "/en/" || route === "/es/";
      const is404 = route === "/404";
      if (!isHome && !is404) {
        assert(
          types.includes("BreadcrumbList"),
          `${route}: missing BreadcrumbList schema`,
        );
      }
      if (/\/services\/[^/]+\/$/.test(route)) {
        assert(types.includes("Service"), `${route}: missing Service schema`);
      }
      if (/\/events\/[^/]+\/$/.test(route)) {
        assert(types.includes("Event"), `${route}: missing Event schema`);
      }
      if (/\/advocacy\/[^/]+\/$/.test(route)) {
        assert(types.includes("Article"), `${route}: missing Article schema`);
      }
    } catch (error) {
      errors.push(`${route}: invalid JSON-LD (${error.message})`);
    }
  }

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  assert(duplicates.length === 0, `${route}: duplicate ids: ${duplicates.join(", ")}`);

  const hrefs = [...html.matchAll(/<a[^>]+href="([^"]+)"/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (/^(https?:|mailto:|tel:|javascript:)/i.test(href)) continue;
    if (href.startsWith("#")) continue;
    const target = fileForHref(href, file);
    assert(target, `${route}: broken internal link ${href}`);
  }

  const alts = [
    ...html.matchAll(/<link rel="alternate"[^>]+hreflang="[^"]+"[^>]+href="([^"]+)"/g),
  ].map((match) => match[1]);
  for (const href of alts) {
    const target = fileForHref(href.replace(site, ""), file);
    assert(target, `${route}: hreflang points to missing page ${href}`);
  }
}

for (const file of publicPages) {
  const html = await readFile(file, "utf8");
  assert(
    !/PUBLIC_WEB3FORMS_KEY|BEGIN PRIVATE KEY|\bEIN\b|\bDUNS\b|tax_id|routing_number/i.test(
      html,
    ),
    `${routeOf(file)}: possible private data leaked into HTML`,
  );
}

const sitemapPath = join(dist, "sitemap-0.xml");
assert(existsSync(sitemapPath), "Missing sitemap-0.xml");
if (existsSync(sitemapPath)) {
  const sitemap = await readFile(sitemapPath, "utf8");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => new URL(match[1]).pathname,
  );
  const expectedPublic = new Set(
    [...builtRoutes].filter((route) => route !== "/" && route !== "/404"),
  );
  for (const route of expectedPublic) {
    assert(
      locs.includes(route),
      `Sitemap is missing published route: ${route}`,
    );
  }
  for (const loc of locs) {
    assert(expectedPublic.has(loc), `Sitemap contains unexpected route: ${loc}`);
  }
}

if (warnings.length) {
  console.warn(warnings.map((warning) => `⚠ ${warning}`).join("\n"));
}

if (errors.length) {
  console.error(`✖ Content validation failed with ${errors.length} issue(s):`);
  console.error(errors.map((error) => `  - ${error}`).join("\n"));
  process.exit(1);
}

console.log(
  `✓ Content validation passed: ${pages.length} HTML pages, ${expectedRoutes.size} expected routes.`,
);
