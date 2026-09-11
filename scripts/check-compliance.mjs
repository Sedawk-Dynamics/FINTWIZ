#!/usr/bin/env node
/**
 * Build-time guard for the rules that are not negotiable on this domain.
 *
 * Fails the build on:
 *   1. The fintwiz.com Research Analyst registration number appearing anywhere.
 *   2. Research-analyst style language (target price, stop loss, trade call...).
 *   3. Em dashes in source (house style: use commas, colons or parentheses).
 *   4. Emoji used in source, which the house style bans as iconography.
 *
 * Warns on:
 *   5. `rounded-full` on anything that looks like a button or link, since the
 *      house style bans pill-shaped buttons.
 *
 * Run with: npm run check:compliance
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["app", "components", "lib"];
const EXTENSIONS = new Set([".ts", ".tsx", ".css", ".mjs", ".md"]);
const SELF = join("scripts", "check-compliance.mjs");

/** Registration numbers that belong to a different domain. */
const FORBIDDEN_REGISTRATIONS = [
  { pattern: /INH\s*0{0,3}26026|INH000026026/gi, label: "SEBI Research Analyst registration (belongs to fintwiz.com only)" },
];

const RESEARCH_LANGUAGE = [
  { pattern: /\btarget price\b/gi, label: "target price" },
  { pattern: /\bstop[- ]?loss\b/gi, label: "stop loss" },
  { pattern: /\bbuy call\b|\bsell call\b|\btrade call\b/gi, label: "trade call" },
  { pattern: /\bentry level\b|\bexit level\b/gi, label: "entry/exit level" },
  { pattern: /\btrade setup\b/gi, label: "trade setup" },
  { pattern: /\bintraday tip\b|\bstock tip\b/gi, label: "stock tip" },
];

// Emoji ranges. Deliberately narrow so ordinary punctuation is not flagged.
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{1F1E6}-\u{1F1FF}]/gu;

const EM_DASH = /—/g;

const errors = [];
const warnings = [];

function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry === "node_modules" || entry === ".next") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
    } else if (EXTENSIONS.has(entry.slice(entry.lastIndexOf(".")))) {
      out.push(full);
    }
  }
  return out;
}

function lineOf(content, index) {
  return content.slice(0, index).split("\n").length;
}

function report(list, file, content, pattern, label) {
  pattern.lastIndex = 0;
  let match;
  while ((match = pattern.exec(content)) !== null) {
    list.push({
      file: relative(ROOT, file),
      line: lineOf(content, match.index),
      label,
      text: match[0].trim(),
    });
    if (match.index === pattern.lastIndex) pattern.lastIndex += 1;
  }
}

/**
 * A file may waive a single rule with a `compliance-allow: <rule>` pragma and a
 * written justification. The disclaimer documents use it, because naming a
 * prohibited activity is how you disclaim it. Nothing can waive the forbidden
 * registration rule.
 */
function waives(content, rule) {
  return new RegExp(`compliance-allow:\\s*${rule}\\b`).test(content);
}

const files = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)));

for (const file of files) {
  const rel = relative(ROOT, file);
  if (rel === SELF || rel.split(sep).includes("scripts")) continue;

  const content = readFileSync(file, "utf8");

  // Never waivable: the wrong registration number on this domain.
  for (const { pattern, label } of FORBIDDEN_REGISTRATIONS) {
    report(errors, file, content, pattern, `Forbidden registration number: ${label}`);
  }

  if (!waives(content, "research-language")) {
    for (const { pattern, label } of RESEARCH_LANGUAGE) {
      report(errors, file, content, pattern, `Research-analyst language: ${label}`);
    }
  }

  report(errors, file, content, EM_DASH, "Em dash (house style: use a comma, colon or parentheses)");
  report(errors, file, content, EMOJI, "Emoji in source (house style: use lucide-react icons)");

  // Pill check. Comments are stripped first so that a rule written *about*
  // `rounded-full` does not trip it, and a padded class list is required so
  // decorative circles (blur orbs, dots) are not reported as buttons.
  const codeOnly = content
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");

  codeOnly.split("\n").forEach((line, index) => {
    if (!line.includes("rounded-full")) return;
    if (!/\bp[xy]?-\[?[\d.]/.test(line) && !/\bh-\d|\bsize-\d/.test(line)) return;
    warnings.push({
      file: rel,
      line: index + 1,
      label: "rounded-full on a padded element (house style bans pill buttons)",
      text: line.trim().slice(0, 70),
    });
  });
}

const fmt = (i) => `  ${i.file}:${i.line}  ${i.label}${i.text && i.text !== "—" ? ` -> ${JSON.stringify(i.text)}` : ""}`;

if (warnings.length) {
  console.warn(`\nCompliance warnings (${warnings.length}):`);
  warnings.forEach((w) => console.warn(fmt(w)));
}

if (errors.length) {
  console.error(`\nCompliance check FAILED with ${errors.length} error(s):`);
  errors.forEach((e) => console.error(fmt(e)));
  console.error("\nSee lib/compliance.ts and AGENTS.md for the rules.\n");
  process.exit(1);
}

console.log(`Compliance check passed. Scanned ${files.length} files across ${SCAN_DIRS.join(", ")}.`);
