#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const VOICES = ["us_m", "us_f", "uk_m", "uk_f", "grandma", "grandpa", "leo", "robot", "ww_us_m"];
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

function parseTsv(file) {
  const rows = [];
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    if (!line.trim() || line.startsWith("rank")) continue;
    const p = line.split("\t");
    rows.push({ rank: Number(p[0]), en: p[1], id: p[2] });
  }
  return rows;
}

const tsv = parseTsv(path.join(ROOT, "data", "ielts_frequency_order.tsv"));
if (tsv.length !== 1500) fail("TSV count " + tsv.length);
const ids = new Set(tsv.map((r) => r.id));
if (ids.size !== 1500) fail("TSV duplicate ids");

for (let n = 1; n <= 15; n++) {
  const packId = "ielts" + String(n).padStart(2, "0");
  const pack = JSON.parse(fs.readFileSync(path.join(ROOT, "packs", packId + ".json"), "utf8"));
  if (pack.words.length !== 100) fail(packId + " word count");
  const lo = (n - 1) * 100 + 1;
  const expect = tsv.slice(lo - 1, lo - 1 + 100);
  for (let i = 0; i < 100; i++) {
    if (pack.words[i].id !== expect[i].id) {
      fail(packId + " order mismatch at " + (i + 1) + ": " + pack.words[i].id + " vs " + expect[i].id);
    }
  }
  const dir = path.join(ROOT, "packs", packId);
  for (const w of pack.words) {
    const pic = path.join(dir, w.id + ".jpg");
    if (!fs.existsSync(pic)) fail("missing " + pic);
    if (fs.statSync(pic).size === 0) fail("0-byte " + pic);
    for (const v of VOICES) {
      const mp3 = path.join(dir, "audio", v, w.id + ".mp3");
      if (!fs.existsSync(mp3)) fail("missing " + mp3);
      if (fs.statSync(mp3).size === 0) fail("0-byte " + mp3);
    }
    if (!w.ww || !w.ww.def || !w.ww.def.en) fail("stub lexicon " + w.id);
  }
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.isFile() && ent.name.endsWith(".jpg")) {
      const id = ent.name.slice(0, -4);
      if (!pack.words.some((w) => w.id === id)) fail("orphan jpg " + packId + "/" + ent.name);
    }
  }
  for (const voice of VOICES) {
    const vdir = path.join(dir, "audio", voice);
    if (!fs.existsSync(vdir)) fail("missing voice dir " + vdir);
    for (const f of fs.readdirSync(vdir)) {
      if (!f.endsWith(".mp3")) continue;
      const id = f.slice(0, -4);
      if (!pack.words.some((w) => w.id === id)) fail("orphan mp3 " + packId + "/" + voice + "/" + f);
      if (fs.statSync(path.join(vdir, f)).size === 0) fail("0-byte mp3");
    }
  }
  const lettersDir = path.join(dir, "audio", "letters");
  for (const L of LETTERS) {
    const lp = path.join(lettersDir, L + ".mp3");
    if (!fs.existsSync(lp) || fs.statSync(lp).size === 0) fail("missing letter " + packId + " " + L);
  }
}

console.log("IELTS_FREQUENCY_VERIFY_OK");
