#!/usr/bin/env node
import { readdir, stat } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = join(root, "dist");

const BUDGETS = {
  totalJsBytes: 350 * 1024,
  largestJsBytes: 120 * 1024,
  largestHtmlBytes: 350 * 1024,
  largestImageBytes: 700 * 1024,
  totalImagesBytes: 8 * 1024 * 1024,
};

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

const files = await walk(dist);
const rows = [];
for (const file of files) {
  const info = await stat(file);
  rows.push({ file: relative(dist, file), size: info.size, ext: extname(file) });
}

const js = rows.filter((row) => row.ext === ".js");
const html = rows.filter((row) => row.ext === ".html");
const images = rows.filter((row) =>
  [".avif", ".webp", ".png", ".jpg", ".jpeg", ".gif", ".svg"].includes(row.ext),
);

const failures = [];
const totalJs = js.reduce((sum, row) => sum + row.size, 0);
const totalImages = images.reduce((sum, row) => sum + row.size, 0);
const largestJs = js.reduce((max, row) => (row.size > max.size ? row : max), { size: 0, file: "" });
const largestHtml = html.reduce(
  (max, row) => (row.size > max.size ? row : max),
  { size: 0, file: "" },
);
const largestImage = images.reduce(
  (max, row) => (row.size > max.size ? row : max),
  { size: 0, file: "" },
);

if (totalJs > BUDGETS.totalJsBytes) {
  failures.push(
    `Total JS ${(totalJs / 1024).toFixed(1)} KB exceeds ${BUDGETS.totalJsBytes / 1024} KB`,
  );
}
if (largestJs.size > BUDGETS.largestJsBytes) {
  failures.push(
    `Largest JS ${largestJs.file} is ${(largestJs.size / 1024).toFixed(1)} KB`,
  );
}
if (largestHtml.size > BUDGETS.largestHtmlBytes) {
  failures.push(
    `Largest HTML ${largestHtml.file} is ${(largestHtml.size / 1024).toFixed(1)} KB`,
  );
}
if (largestImage.size > BUDGETS.largestImageBytes) {
  failures.push(
    `Largest image ${largestImage.file} is ${(largestImage.size / 1024).toFixed(1)} KB`,
  );
}
if (totalImages > BUDGETS.totalImagesBytes) {
  failures.push(
    `Total image weight ${(totalImages / 1024 / 1024).toFixed(2)} MB exceeds ${BUDGETS.totalImagesBytes / 1024 / 1024} MB`,
  );
}

console.log("Performance budget report");
console.log(`  Total JS:     ${(totalJs / 1024).toFixed(1)} KB`);
console.log(`  Largest JS:   ${(largestJs.size / 1024).toFixed(1)} KB (${largestJs.file})`);
console.log(`  Largest HTML: ${(largestHtml.size / 1024).toFixed(1)} KB (${largestHtml.file})`);
console.log(`  Largest img:  ${(largestImage.size / 1024).toFixed(1)} KB (${largestImage.file})`);
console.log(`  Total images: ${(totalImages / 1024 / 1024).toFixed(2)} MB`);

if (failures.length) {
  console.error(`✖ Budget check failed with ${failures.length} issue(s):`);
  console.error(failures.map((failure) => `  - ${failure}`).join("\n"));
  process.exit(1);
}

console.log("✓ Performance budgets passed.");
