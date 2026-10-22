#!/usr/bin/env node
"use strict";
// Fails if any word in any live set (PACK_IDS in js/app.js) lacks a pre-made mp3
// in any selectable voice folder. No TTS: every word needs a real file.
// Also guards the memory-match bundle against the ".mp3 stripped from URL" bug.
// Usage: node scripts/audio_coverage_test.js [--all]   (--all also checks packs not in PACK_IDS)
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const VOICES = ["us_m", "us_f", "uk_m", "uk_f", "grandma", "grandpa", "leo", "robot", "ww_us_m"];

const app = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
const m = app.match(/const PACK_IDS = \[([\s\S]*?)\];/);
if (!m) { console.error("FAIL: PACK_IDS not found in js/app.js"); process.exit(1); }
const live = (m[1].match(/"([^"]+)"/g) || []).map((s) => s.slice(1, -1));
const all = fs.readdirSync(path.join(root, "packs")).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5));
const ids = process.argv.includes("--all") ? all : live;

// Same rule as mediaFile() in js/app.js: word.id (or en), lowercased.
const fileFor = (w) => String(w.id != null && w.id !== "" ? w.id : w.en || "").toLowerCase() + ".mp3";

let missing = 0;
for (const id of ids) {
  const pj = path.join(root, "packs", id + ".json");
  if (!fs.existsSync(pj)) { console.error("FAIL: " + id + ".json missing"); missing++; continue; }
  const words = (JSON.parse(fs.readFileSync(pj, "utf8")).words || []).filter((w) => w && w.en);
  for (const v of VOICES) {
    const dir = path.join(root, "packs", id, "audio", v);
    const have = fs.existsSync(dir) ? new Set(fs.readdirSync(dir)) : new Set();
    const lack = words.filter((w) => !have.has(fileFor(w))).map((w) => w.en);
    if (lack.length) { missing += lack.length; console.error(`MISSING ${id}/${v}: ${lack.length}/${words.length}  ${lack.slice(0, 10).join(", ")}${lack.length > 10 ? " ..." : ""}`); }
  }
}
for (const id of all) if (!live.includes(id) && !ids.includes(id)) console.warn("note: " + id + " is not in PACK_IDS (not checked; run --all)");

const html = fs.readFileSync(path.join(root, "games/memory-match/index.html"), "utf8");
const js = (html.match(/assets\/(index-[\w-]+\.js)/) || [])[1];
const bundle = fs.readFileSync(path.join(root, "games/memory-match/assets", js), "utf8");
if (/audioId\|\|""\)\.replace\(\/\\\.mp3\$\/i/.test(bundle)) { console.error("FAIL: memory-match strips .mp3 from card audio URLs (cards go silent)"); missing++; }
if (bundle.indexOf("word clip failed to load") === -1) { console.error("FAIL: memory-match has no console.warn for failed word clips"); missing++; }

if (missing) { console.error("FAIL: audio coverage problems: " + missing); process.exit(1); }
console.log("PASS: audio coverage OK for " + ids.length + " sets x " + VOICES.length + " voices");
