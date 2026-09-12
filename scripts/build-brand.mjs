#!/usr/bin/env node
/**
 * Derives every brand asset the site needs from the single supplied logo.
 *
 * The client provided one raster lockup (icon plus "Fintwiz" wordmark). The
 * site needs it at several sizes and needs the icon on its own for the favicon
 * and compact placements, so this script finds the natural gap between the two
 * elements and splits them rather than anyone cropping by hand.
 *
 * Run with: npm run build:brand
 */

import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SRC = "public/media/Logo-Final-scaled.png";
const OUT = "public/brand";
const APP = "app";

mkdirSync(OUT, { recursive: true });

const trimmed = await sharp(SRC).trim({ threshold: 8 }).png().toBuffer();
const { width: W, height: H } = await sharp(trimmed).metadata();

// Column-wise opacity profile, used to find the gutter between the icon and
// the wordmark. Anything below this coverage counts as empty space.
const { data, info } = await sharp(trimmed)
  .raw()
  .toBuffer({ resolveWithObject: true });

const columnHasInk = new Array(info.width).fill(false);
for (let x = 0; x < info.width; x++) {
  for (let y = 0; y < info.height; y++) {
    const alpha = data[(y * info.width + x) * info.channels + 3];
    if (alpha > 40) {
      columnHasInk[x] = true;
      break;
    }
  }
}

// Walk right from the icon until a sustained empty run appears.
let gapStart = -1;
let gapEnd = -1;
let run = 0;
const MIN_GAP = Math.round(info.width * 0.015);
for (let x = Math.round(info.width * 0.1); x < Math.round(info.width * 0.45); x++) {
  if (!columnHasInk[x]) {
    if (run === 0) gapStart = x;
    run += 1;
    if (run >= MIN_GAP) gapEnd = x;
  } else {
    if (gapEnd > 0) break;
    run = 0;
    gapStart = -1;
  }
}

const splitAt = gapEnd > 0 ? Math.round((gapStart + gapEnd) / 2) : Math.round(info.width * 0.22);

console.log(`Trimmed lockup: ${W}x${H}`);
console.log(`Icon / wordmark gutter detected at x=${splitAt}`);

// Full lockup
await sharp(trimmed).png({ compressionLevel: 9 }).toFile(join(OUT, "logo-lockup.png"));

// Icon only, squared with even padding so it can sit in a circle or square.
const markRaw = await sharp(trimmed)
  .extract({ left: 0, top: 0, width: splitAt, height: H })
  .trim({ threshold: 8 })
  .toBuffer();
const markMeta = await sharp(markRaw).metadata();
const side = Math.max(markMeta.width, markMeta.height);

const mark = await sharp({
  create: {
    width: side,
    height: side,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([
    {
      input: markRaw,
      left: Math.round((side - markMeta.width) / 2),
      top: Math.round((side - markMeta.height) / 2),
    },
  ])
  .png()
  .toBuffer();

await sharp(mark).png({ compressionLevel: 9 }).toFile(join(OUT, "logo-mark.png"));

// Wordmark only, for placements where the icon is already present.
await sharp(trimmed)
  .extract({ left: splitAt, top: 0, width: W - splitAt, height: H })
  .trim({ threshold: 8 })
  .png({ compressionLevel: 9 })
  .toFile(join(OUT, "logo-wordmark.png"));

// Favicons. The mark is drawn on the brand navy so it stays legible in a
// browser tab against either a light or a dark tab strip.

async function favicon(size, radius, file) {
  const inner = Math.round(size * 0.74);
  const plate = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="rgb(11,26,46)"/></svg>`,
  );
  const scaled = await sharp(mark).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp(plate)
    .composite([{ input: scaled, left: Math.round((size - inner) / 2), top: Math.round((size - inner) / 2) }])
    .png({ compressionLevel: 9 })
    .toFile(file);
}

await favicon(64, 6, join(APP, "icon.png"));
await favicon(180, 34, join(APP, "apple-icon.png"));

// A flat navy-plate mark for the OG image, which cannot read local CSS.
await favicon(256, 0, join(OUT, "logo-mark-plate.png"));

writeFileSync(
  join(OUT, "README.md"),
  [
    "# Brand assets",
    "",
    "Generated from `public/media/Logo-Final-scaled.png` by `npm run build:brand`.",
    "Do not edit these by hand: replace the source logo and re-run the script.",
    "",
    "| File | Use |",
    "| --- | --- |",
    "| `logo-lockup.png` | Full icon plus wordmark. Header and footer. |",
    "| `logo-mark.png` | Icon only, transparent, squared. Compact placements. |",
    "| `logo-wordmark.png` | Wordmark only. |",
    "| `logo-mark-plate.png` | Icon on the brand navy, for the OG image. |",
    "",
    "`app/icon.png` and `app/apple-icon.png` are also generated here.",
    "",
    `Source lockup trims to ${W}x${H}. Icon/wordmark gutter detected at x=${splitAt}.`,
    "",
  ].join("\n"),
);

console.log("\nWrote:");
console.log("  public/brand/logo-lockup.png");
console.log("  public/brand/logo-mark.png");
console.log("  public/brand/logo-wordmark.png");
console.log("  public/brand/logo-mark-plate.png");
console.log("  app/icon.png");
console.log("  app/apple-icon.png");
