#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const stylesDir = path.dirname(scriptPath);
const covenantDir = path.dirname(stylesDir);
const stylerPath = path.join(stylesDir, "styler.css");

const args = new Set(process.argv.slice(2));
const shouldApply = args.has("--apply") || args.has("--push");
const shouldCheck = args.has("--check");
const quiet = args.has("--quiet");

const COLOR_RE = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\([^)]*\)|\b(?:transparent|currentColor)\b/g;
const SOURCE_RE = /--styler-color-\d+\s*:\s*([^;]+);\s*\/\*\s*source:\s*([^|*]+)(?:\|\s*uses:\s*(\d+))?\s*\*\//g;
const COMMENT_RE = /\/\*[\s\S]*?\*\//g;

function targetCssFiles() {
  return fs.globSync(path.join(covenantDir, "**/*.css"))
    .filter((file) => {
      const rel = path.relative(covenantDir, file).replaceAll(path.sep, "/");
      return rel !== "Styles/styler.css" &&
        !/^Styles\/.+-styler\.css$/.test(rel) &&
        !rel.includes("app.grow.bak/") &&
        !rel.includes("app.multiply.bak/");
    })
    .sort((a, b) => a.localeCompare(b));
}

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function stripComments(css) {
  return css.replace(COMMENT_RE, (comment) => " ".repeat(comment.length));
}

function expandShortHex(hex) {
  return [...hex].map((char) => char + char).join("");
}

function cleanNumber(value) {
  const trimmed = String(value).trim();
  if (trimmed.endsWith("%")) return `${cleanNumber(trimmed.slice(0, -1))}%`;
  const numeric = Number(trimmed);
  if (!Number.isFinite(numeric)) return trimmed.toLowerCase();
  return String(Math.round(numeric * 1000) / 1000)
    .replace(/^0\./, ".")
    .replace(/^-0\./, "-.");
}

function normalizeColor(value) {
  let color = String(value).trim();

  if (color.startsWith("#")) {
    let hex = color.slice(1).toLowerCase();
    if (hex.length === 3 || hex.length === 4) hex = expandShortHex(hex);
    return `#${hex}`;
  }

  const fn = color.match(/^(rgba?|hsla?)\((.*)\)$/i);
  if (fn) {
    const name = fn[1].toLowerCase();
    const body = fn[2].replace(/\//g, ",");
    const parts = body.split(",")
      .map((part) => part.trim())
      .filter(Boolean)
      .map(cleanNumber);
    return `${name}(${parts.join(",")})`;
  }

  return color.toLowerCase();
}

function colorSortKey(color) {
  if (color === "transparent") return "z-1";
  if (color === "currentcolor") return "z-2";
  if (color.startsWith("#")) return `a-${color}`;
  if (color.startsWith("rgb")) return `b-${color}`;
  if (color.startsWith("hsl")) return `c-${color}`;
  return `y-${color}`;
}

function parseExistingPalette() {
  const existing = readText(stylerPath);
  const palette = new Map();

  for (const match of existing.matchAll(SOURCE_RE)) {
    const value = match[1].trim();
    const source = normalizeColor(match[2].trim());
    palette.set(source, value);
  }

  return palette;
}

function existingGeneratedAt() {
  return readText(stylerPath).match(/Generated:\s*([^\n]+)/)?.[1]?.trim() || "";
}

function collectColors(files) {
  const colors = new Map();

  for (const filePath of files) {
    const rel = path.relative(covenantDir, filePath).replaceAll(path.sep, "/");
    const css = stripComments(readText(filePath));

    for (const match of css.matchAll(COLOR_RE)) {
      const source = normalizeColor(match[0]);
      if (!colors.has(source)) {
        colors.set(source, { count: 0, files: new Set() });
      }
      const entry = colors.get(source);
      entry.count += 1;
      entry.files.add(rel);
    }
  }

  return colors;
}

function buildStylerCss(files, colors, existingPalette, generatedAt = new Date().toISOString()) {
  const entries = [...colors.entries()].sort((a, b) => {
    const countDelta = b[1].count - a[1].count;
    return countDelta || colorSortKey(a[0]).localeCompare(colorSortKey(b[0]));
  });

  const lines = [
    "/*",
    "  STYLER - editable New Covenant color palette",
    "",
    "  Change the values below, then run:",
    "    node New_Covenant/Styles/sync-styler.mjs --apply",
    "",
    "  Refresh this palette from current CSS without applying:",
    "    node New_Covenant/Styles/sync-styler.mjs",
    "",
    `  Generated: ${generatedAt}`,
    `  CSS files scanned: ${files.length}`,
    `  Unique colors: ${entries.length}`,
    "*/",
    "",
    ":root {",
  ];

  entries.forEach(([source, entry], index) => {
    const token = `--styler-color-${String(index + 1).padStart(4, "0")}`;
    const value = existingPalette.get(source) || source;
    lines.push(`  ${token}: ${value}; /* source: ${source} | uses: ${entry.count} */`);
  });

  lines.push("}", "");
  return `${lines.join("\n")}\n`;
}

function parseStylerPalette() {
  const content = readText(stylerPath);
  const replacements = new Map();

  for (const match of content.matchAll(SOURCE_RE)) {
    const value = match[1].trim();
    const source = normalizeColor(match[2].trim());
    if (normalizeColor(value) !== source) replacements.set(source, value);
  }

  return replacements;
}

function replaceColors(css, replacements) {
  return css.replace(COMMENT_RE, "\0$&\0")
    .split("\0")
    .map((part) => {
      if (part.startsWith("/*")) return part;
      return part.replace(COLOR_RE, (raw) => {
        const source = normalizeColor(raw);
        return replacements.get(source) || raw;
      });
    })
    .join("");
}

function refreshPalette() {
  const files = targetCssFiles();
  const colors = collectColors(files);
  const existingPalette = parseExistingPalette();
  const generatedAt = shouldCheck ? existingGeneratedAt() || new Date().toISOString() : new Date().toISOString();
  const next = buildStylerCss(files, colors, existingPalette, generatedAt);

  if (shouldCheck) {
    const current = readText(stylerPath);
    if (current !== next) {
      console.error("styler.css is out of date. Run node New_Covenant/Styles/sync-styler.mjs");
      process.exit(1);
    }
  } else {
    fs.writeFileSync(stylerPath, next);
  }

  return { files, colors };
}

function applyPalette() {
  const replacements = parseStylerPalette();
  if (replacements.size === 0) {
    if (!quiet) console.log("No edited styler colors to apply.");
    return 0;
  }

  let changed = 0;
  for (const filePath of targetCssFiles()) {
    const before = readText(filePath);
    const after = replaceColors(before, replacements);
    if (before !== after) {
      if (!shouldCheck) fs.writeFileSync(filePath, after);
      changed += 1;
    }
  }

  return changed;
}

function main() {
  if (shouldApply) {
    const changed = applyPalette();
    if (!quiet) {
      console.log(`Applied edited styler colors to ${changed} CSS files.`);
      console.log("Run node New_Covenant/Styles/sync-styler.mjs to refresh the palette after applying.");
    }
    return;
  }

  const { files, colors } = refreshPalette();
  if (!quiet) {
    console.log(`Scanned ${files.length} CSS files.`);
    if (shouldCheck) {
      console.log(`styler.css is current with ${colors.size} editable color entries.`);
    } else {
      console.log(`Wrote ${colors.size} editable color entries to New_Covenant/Styles/styler.css.`);
    }
  }
}

main();
