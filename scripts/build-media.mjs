#!/usr/bin/env node
/**
 * Builds the ambient hero loop from a still photograph.
 *
 * There is no stock video on this site. The loop is generated here from a
 * Creative Commons still (see public/media/CREDITS.md), given a slow push-in
 * and a colour grade that matches the brand navy, then mirrored so it loops
 * seamlessly with no visible cut.
 *
 * Regenerate with: npm run build:media
 */

import { spawnSync } from "node:child_process";
import { mkdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import ffmpegPath from "ffmpeg-static";

const ROOT = process.cwd();
const MEDIA = join(ROOT, "public", "media");
const TMP = join(ROOT, ".media-tmp");

const SOURCE = join(MEDIA, "bkc-financial-district.jpg");
const FORWARD = join(TMP, "forward.mp4");

const OUT_MP4 = join(MEDIA, "hero-ambient.mp4");
const OUT_WEBM = join(MEDIA, "hero-ambient.webm");
const OUT_POSTER = join(MEDIA, "hero-ambient-poster.jpg");

const FPS = 25;
const SECONDS = 7;
const FRAMES = FPS * SECONDS;

/**
 * Slow push-in, desaturated and pushed toward the brand navy so the footage
 * sits underneath white type without fighting it.
 */
const GRADE =
  "eq=saturation=0.38:contrast=1.05:brightness=-0.07," +
  "colorbalance=rs=-0.14:gs=-0.04:bs=0.16:rm=-0.10:gm=-0.02:bm=0.12," +
  "gblur=sigma=0.6";

const KEN_BURNS =
  `scale=3200:-1,` +
  `zoompan=z='min(zoom+0.00045,1.16)':` +
  `x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':` +
  `d=${FRAMES}:s=1280x720:fps=${FPS},` +
  GRADE;

function run(label, args) {
  process.stdout.write(`  ${label} ... `);
  const result = spawnSync(ffmpegPath, args, { stdio: ["ignore", "pipe", "pipe"] });
  if (result.status !== 0) {
    console.log("FAILED");
    console.error(result.stderr?.toString().split("\n").slice(-25).join("\n"));
    process.exit(1);
  }
  console.log("ok");
}

function kb(file) {
  return `${Math.round(statSync(file).size / 1024)} KB`;
}

if (!existsSync(SOURCE)) {
  console.error(`Source still not found: ${SOURCE}`);
  process.exit(1);
}

mkdirSync(TMP, { recursive: true });

console.log("Building ambient hero loop:");

run("push-in pass", [
  "-y", "-loop", "1", "-i", SOURCE,
  "-t", String(SECONDS),
  "-vf", KEN_BURNS,
  "-c:v", "libx264", "-preset", "slow", "-crf", "30",
  "-pix_fmt", "yuv420p", "-an",
  FORWARD,
]);

// Mirror the clip so the end frame equals the start frame: a seamless loop.
run("mirror for seamless loop (mp4)", [
  "-y", "-i", FORWARD,
  "-filter_complex", "[0:v]reverse[r];[0:v][r]concat=n=2:v=1[v]",
  "-map", "[v]",
  "-c:v", "libx264", "-preset", "slow", "-crf", "31",
  "-movflags", "+faststart", "-pix_fmt", "yuv420p", "-an",
  OUT_MP4,
]);

run("mirror for seamless loop (webm)", [
  "-y", "-i", FORWARD,
  "-filter_complex", "[0:v]reverse[r];[0:v][r]concat=n=2:v=1[v]",
  "-map", "[v]",
  "-c:v", "libvpx-vp9", "-crf", "40", "-b:v", "0",
  "-row-mt", "1", "-deadline", "good", "-cpu-used", "2", "-an",
  OUT_WEBM,
]);

// Poster is the first frame, so there is no flash before playback starts.
run("poster frame", [
  "-y", "-i", OUT_MP4,
  "-vframes", "1", "-q:v", "4",
  OUT_POSTER,
]);

console.log("\nDone:");
console.log(`  hero-ambient.mp4         ${kb(OUT_MP4)}`);
console.log(`  hero-ambient.webm        ${kb(OUT_WEBM)}`);
console.log(`  hero-ambient-poster.jpg  ${kb(OUT_POSTER)}`);
console.log(`\nLoop length: ${SECONDS * 2}s, seamless (forward then mirrored).`);
