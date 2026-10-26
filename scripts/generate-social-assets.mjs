#!/usr/bin/env node
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdir } from "node:fs/promises";

const root = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const source = join(root, "src/assets/webp/about/new-york.webp");
const whiteLogo = join(root, "src/assets/webp/logo_blanco.png");
const colorLogo = join(root, "src/assets/webp/logo-acc.png");
const ogDir = join(root, "src/assets/og");
const iconDir = join(root, "public/icons");

await mkdir(ogDir, { recursive: true });
await mkdir(iconDir, { recursive: true });

const width = 1200;
const height = 630;

const background = await sharp(source)
  .resize(width, height, { fit: "cover", position: "centre" })
  .modulate({ brightness: 0.72, saturation: 0.9 })
  .toBuffer();

const overlay = Buffer.from(`
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#071a30" stop-opacity="0.15"/>
        <stop offset="0.55" stop-color="#071a30" stop-opacity="0.45"/>
        <stop offset="1" stop-color="#071a30" stop-opacity="0.92"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#shade)"/>
    <rect x="72" y="440" width="6" height="120" fill="#c8a24a"/>
  </svg>
`);

const logo = await sharp(whiteLogo)
  .resize({ height: 118, fit: "inside" })
  .toBuffer();

const logoMeta = await sharp(logo).metadata();

await sharp(background)
  .composite([
    { input: overlay, top: 0, left: 0 },
    {
      input: logo,
      top: 468,
      left: 104,
    },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(join(ogDir, "og-image.jpg"));

await sharp(join(ogDir, "og-image.jpg"))
  .toFile(join(root, "public/og-image.jpg"));

for (const size of [192, 512]) {
  await sharp(colorLogo)
    .resize(size, size, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .flatten({ background: "#ffffff" })
    .png()
    .toFile(join(iconDir, `icon-${size}.png`));
}

await sharp(colorLogo)
  .resize(180, 180, {
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  .flatten({ background: "#ffffff" })
  .png()
  .toFile(join(root, "public/apple-touch-icon.png"));

console.log(
  `✓ Social assets generated (logo ${logoMeta.width}x${logoMeta.height}, og ${width}x${height}).`,
);
