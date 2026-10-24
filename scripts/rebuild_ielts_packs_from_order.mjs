#!/usr/bin/env node
/**
 * Rebuild ielts01–ielts15 from data/ielts_frequency_order.tsv.
 * Moves existing jpg + voice mp3 assets; regenerates pack JSON, games, MANIFEST.
 * Does not regenerate pictures, lexicon, or TTS.
 */
import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const common = require("./ielts_pack_common.js");

const ROOT = common.ROOT;
const VOICES = common.VOICES;
const TSV = path.join(ROOT, "data", "ielts_frequency_order.tsv");

function parseTsv(file) {
  const text = fs.readFileSync(file, "utf8");
  const rows = [];
  for (const line of text.split("\n")) {
    if (!line.trim() || line.startsWith("rank")) continue;
    const [rank, en, id, zipf, old_pack] = line.split("\t");
    if (!id) continue;
    rows.push({
      rank: Number(rank),
      en: en.trim(),
      id: id.trim(),
      zipf: zipf.trim(),
      old_pack: old_pack.trim(),
    });
  }
  return rows;
}

function loadWordById() {
  const byId = new Map();
  for (let n = 1; n <= 15; n++) {
    const packId = "ielts" + String(n).padStart(2, "0");
    const data = JSON.parse(fs.readFileSync(path.join(ROOT, "packs", packId + ".json"), "utf8"));
    for (const w of data.words || []) {
      if (!byId.has(w.id)) byId.set(w.id, w);
    }
  }
  return byId;
}

function stageAllAssets() {
  const staging = path.join(ROOT, ".ielts-reorder-staging");
  fs.rmSync(staging, { recursive: true, force: true });
  const jpg = new Map();
  const audio = new Map();
  for (let n = 1; n <= 15; n++) {
    const packId = "ielts" + String(n).padStart(2, "0");
    const dir = path.join(ROOT, "packs", packId);
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (ent.isFile() && ent.name.endsWith(".jpg")) {
        const id = ent.name.slice(0, -4).toLowerCase();
        if (!jpg.has(id)) {
          const dest = path.join(staging, "jpg", ent.name);
          copyFile(path.join(dir, ent.name), dest);
          jpg.set(id, dest);
        }
      }
    }
    const audioRoot = path.join(dir, "audio");
    if (!fs.existsSync(audioRoot)) continue;
    for (const voice of VOICES) {
      const vdir = path.join(audioRoot, voice);
      if (!fs.existsSync(vdir)) continue;
      for (const f of fs.readdirSync(vdir)) {
        if (!f.endsWith(".mp3")) continue;
        const id = f.slice(0, -4).toLowerCase();
        if (!audio.has(id)) audio.set(id, {});
        if (!audio.get(id)[voice]) {
          const dest = path.join(staging, "audio", voice, f);
          copyFile(path.join(vdir, f), dest);
          audio.get(id)[voice] = dest;
        }
      }
    }
  }
  return { jpg, audio, staging };
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function cleanPackMedia(packId, wordIds) {
  const dir = path.join(ROOT, "packs", packId);
  const keep = new Set(wordIds);
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.isFile() && ent.name.endsWith(".jpg")) {
      const id = ent.name.slice(0, -4).toLowerCase();
      if (!keep.has(id)) fs.unlinkSync(path.join(dir, ent.name));
    }
  }
  for (const voice of VOICES) {
    const vdir = path.join(dir, "audio", voice);
    if (!fs.existsSync(vdir)) continue;
    for (const f of fs.readdirSync(vdir)) {
      if (!f.endsWith(".mp3")) continue;
      const id = f.slice(0, -4).toLowerCase();
      if (!keep.has(id)) fs.unlinkSync(path.join(vdir, f));
    }
  }
}

function rebuild() {
  const order = parseTsv(TSV);
  if (order.length !== 1500) {
    console.error("TSV must have 1500 rows, got", order.length);
    process.exit(1);
  }
  const byId = loadWordById();
  if (byId.size !== 1500) {
    console.error("expected 1500 unique words in packs, got", byId.size);
    process.exit(1);
  }
  const { jpg, audio, staging } = stageAllAssets();

  for (let packNum = 1; packNum <= 15; packNum++) {
    const { id } = common.packRange(packNum);
    const slice = order.filter((r) => r.rank >= (packNum - 1) * 100 + 1 && r.rank <= packNum * 100);
    if (slice.length !== 100) {
      console.error(id, "slice size", slice.length);
      process.exit(1);
    }
    const words = slice.map((r) => {
      const w = byId.get(r.id);
      if (!w) throw new Error("missing word " + r.id);
      return JSON.parse(JSON.stringify(w));
    });
    const pack = common.buildPackJson(packNum, words);
    fs.writeFileSync(path.join(ROOT, "packs", id + ".json"), JSON.stringify(pack, null, 2) + "\n");

    const packDir = path.join(ROOT, "packs", id);
    for (const w of words) {
      const picSrc = jpg.get(w.id);
      if (!picSrc) throw new Error("missing jpg for " + w.id);
      copyFile(picSrc, path.join(packDir, w.id + ".jpg"));
      const voices = audio.get(w.id) || {};
      for (const v of VOICES) {
        const src = voices[v];
        if (!src) throw new Error("missing audio " + w.id + "/" + v);
        copyFile(src, path.join(packDir, "audio", v, w.id + ".mp3"));
      }
    }
    cleanPackMedia(id, words.map((w) => w.id));
    common.installLetters(packDir);

    const games = common.buildGames(pack, words);
    const gamesDir = path.join(packDir, "games");
    fs.mkdirSync(gamesDir, { recursive: true });
    fs.writeFileSync(path.join(gamesDir, "leap-frog.json"), JSON.stringify(games.leap, null, 2) + "\n");
    fs.writeFileSync(path.join(gamesDir, "snow-jump.json"), JSON.stringify(games.snow, null, 2) + "\n");
    fs.writeFileSync(path.join(gamesDir, "spellfire.json"), JSON.stringify(games.spell, null, 2) + "\n");

    const manifest = common.writeManifest(id, pack, words, { missing_files: [], too_small: [], missing_l1: [] });
    if (!manifest.ok) {
      console.error(id, "manifest not ok", manifest.missing_files.slice(0, 5));
      process.exit(1);
    }
    console.log("OK", id, words[0].en, "…", words[words.length - 1].en);
  }
  fs.rmSync(staging, { recursive: true, force: true });
}

rebuild();
