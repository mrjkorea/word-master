#!/usr/bin/env node
/**
 * Build ielts06–ielts10 pack files (agent 438b). Does not touch js/ or homepage.
 * Run: node scripts/build_ielts_packs_438b.mjs
 * Then: node scripts/ielts_audio_438b.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ieltsSlug } from "./ielts_slug_438b.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PACKS = path.join(ROOT, "packs");
const WORD_LIST_CANDIDATES = [
  path.join(ROOT, "uploads", "ielts_1500.txt"),
  path.join(
    ROOT,
    "..",
    ".cursor",
    "projects",
    "workspace",
    "uploads",
    "ielts_1500_e493.txt"
  ),
];
const WORD_LIST = WORD_LIST_CANDIDATES.find((p) => fs.existsSync(p));
const NEW_WORDS = path.join(__dirname, "ielts_new_words_438b.json");

const LANGS = [
  "en",
  "ko",
  "zh-Hans",
  "ja",
  "es",
  "hi",
  "de",
  "vi",
  "pt-BR",
  "id",
  "fr",
  "ar",
  "tr",
  "it",
  "pl",
];
const VOICES = [
  "us_m",
  "us_f",
  "uk_m",
  "uk_f",
  "grandma",
  "grandpa",
  "leo",
  "robot",
  "ww_us_m",
];

const PACK_RANGES = [
  { id: "ielts06", start: 501, end: 600, title: "IELTS 501–600" },
  { id: "ielts07", start: 601, end: 700, title: "IELTS 601–700" },
  { id: "ielts08", start: 701, end: 800, title: "IELTS 701–800" },
  { id: "ielts09", start: 801, end: 900, title: "IELTS 801–900" },
  { id: "ielts10", start: 901, end: 1000, title: "IELTS 901–1000" },
];

function parseWordList() {
  if (!WORD_LIST) throw new Error("ielts word list file not found");
  const text = fs.readFileSync(WORD_LIST, "utf8");
  const ordered = [];
  for (const line of text.split("\n")) {
    const m = line.match(/^\s*(\d+)\.\s+(\S+)\s*$/);
    if (!m) continue;
    ordered.push({ rank: Number(m[1]), en: m[2] });
  }
  return ordered;
}

function loadPackIndex() {
  const byEn = new Map();
  for (const fn of fs.readdirSync(PACKS)) {
    if (!fn.endsWith(".json")) continue;
    const pid = fn.slice(0, -5);
    const data = JSON.parse(fs.readFileSync(path.join(PACKS, fn), "utf8"));
    for (const w of data.words || []) {
      const en = String(w.en || "").toLowerCase();
      if (!en) continue;
      if (!byEn.has(en)) byEn.set(en, []);
      byEn.get(en).push({ packId: pid, word: w });
    }
  }
  return byEn;
}

function cloneWord(w) {
  return JSON.parse(JSON.stringify(w));
}

function normalizeWord(w) {
  const out = cloneWord(w);
  const slug = ieltsSlug(out.en);
  out.id = slug;
  if (out.ww && out.ww.sense_id) {
    const base = String(out.ww.sense_id).split(".")[0];
    if (base !== slug) out.ww.sense_id = slug + ".s1";
  }
  return out;
}

function resolveWord(en, byEn, newWords) {
  const key = en.toLowerCase();
  if (newWords[key]) return normalizeWord(newWords[key]);
  const hits = byEn.get(key);
  if (hits && hits.length) {
    return normalizeWord(hits[0].word);
  }
  throw new Error("No entry for word: " + en);
}

function findAudioSrc(byEn, en, voice) {
  const hits = byEn.get(en.toLowerCase()) || [];
  const slug = ieltsSlug(en);
  for (const { packId, word } of hits) {
    const ids = [
      String(word.id || "").toLowerCase(),
      slug,
      ieltsSlug(word.en),
    ].filter(Boolean);
    const uniq = [...new Set(ids)];
    for (const wid of uniq) {
      const p = path.join(PACKS, packId, "audio", voice, wid + ".mp3");
      if (fs.existsSync(p)) return { src: p, wid };
    }
  }
  return null;
}

function neighbors(words, i) {
  const n = words.length;
  const pick = (j) => words[((i + j) % n + n) % n];
  return [pick(1), pick(2)];
}

function buildGames(packId, title, words) {
  const spellfire = {
    pack_id: packId,
    title,
    seconds_per_letter: 5,
    items: words.map((w) => ({ item_id: w.id, word: w.en })),
  };
  const leap = {
    pack_id: packId,
    title,
    module_id: "word_master",
    seconds: 15,
    items: words.map((w, i) => {
      const [a, b] = neighbors(words, i);
      return {
        item_id: w.id,
        question: w.l1?.en || w.ww?.def?.en || w.en,
        correct: w.en,
        wrong: [a.en, b.en],
        word: w.en,
      };
    }),
  };
  const snow = { ...leap, module_id: "snow_jump" };
  return { spellfire, leap, snow };
}

function buildManifest(packId, title, words, gaps) {
  return {
    pack: packId,
    title,
    words: words.map((w) => w.id),
    voices: [
      "us_m",
      "us_f",
      "uk_m",
      "uk_f",
      "grandma",
      "leo",
      "grandpa",
      "robot",
      "ww_us_m",
    ],
    l1: LANGS,
    missing_files: gaps.missingAudio,
    too_small: gaps.tooSmall,
    missing_l1: [],
    ok: gaps.missingAudio.length === 0 && gaps.tooSmall.length === 0,
  };
}

function copyLetters(destPack) {
  const src = path.join(PACKS, "verbs900", "audio", "letters");
  const dest = path.join(destPack, "audio", "letters");
  fs.mkdirSync(dest, { recursive: true });
  for (const f of fs.readdirSync(src)) {
    if (!f.endsWith(".mp3")) continue;
    fs.copyFileSync(path.join(src, f), path.join(dest, f));
  }
}

function copyPictures(packId, words, pictureGaps) {
  const picRoot = path.join(PACKS, packId);
  fs.mkdirSync(picRoot, { recursive: true });
  for (const w of words) {
    const slug = ieltsSlug(w.en);
    const candidates = [
      path.join(picRoot, w.id + ".jpg"),
      path.join(picRoot, slug + ".jpg"),
    ];
    if (candidates.some((p) => fs.existsSync(p))) continue;
    pictureGaps.push(`${packId}/${slug}`);
  }
}

function main() {
  const ordered = parseWordList();
  const byEn = loadPackIndex();
  const newWords = JSON.parse(fs.readFileSync(NEW_WORDS, "utf8"));
  const pictureGaps = [];
  const audioTodo = [];

  for (const pr of PACK_RANGES) {
    const slice = ordered.filter((x) => x.rank >= pr.start && x.rank <= pr.end);
    const words = slice.map((x) => resolveWord(x.en, byEn, newWords));

    const pack = {
      id: pr.id,
      title: pr.title,
      band: "IELTS",
      pos: "mixed",
      source:
        "IELTS 1,500 high-frequency words (ranks " +
        pr.start +
        "–" +
        pr.end +
        "), list order preserved.",
      words,
    };

    fs.writeFileSync(
      path.join(PACKS, pr.id + ".json"),
      JSON.stringify(pack, null, 2) + "\n"
    );

    const packDir = path.join(PACKS, pr.id);
    const gamesDir = path.join(packDir, "games");
    fs.mkdirSync(gamesDir, { recursive: true });
    const games = buildGames(pr.id, pr.title, words);
    fs.writeFileSync(
      path.join(gamesDir, "spellfire.json"),
      JSON.stringify(games.spellfire, null, 2) + "\n"
    );
    fs.writeFileSync(
      path.join(gamesDir, "leap-frog.json"),
      JSON.stringify(games.leap, null, 2) + "\n"
    );
    fs.writeFileSync(
      path.join(gamesDir, "snow-jump.json"),
      JSON.stringify(games.snow, null, 2) + "\n"
    );

    copyLetters(packDir);
    copyPictures(pr.id, words, pictureGaps);

    const missingAudio = [];
    const tooSmall = [];
    for (const v of VOICES) {
      const dir = path.join(packDir, "audio", v);
      fs.mkdirSync(dir, { recursive: true });
    }

    for (const w of words) {
      const wid = String(w.id).toLowerCase();
      for (const v of VOICES) {
        const dest = path.join(packDir, "audio", v, wid + ".mp3");
        if (fs.existsSync(dest)) continue;
        const hit = findAudioSrc(byEn, w.en, v);
        if (hit) {
          fs.copyFileSync(hit.src, dest);
        } else {
          audioTodo.push({
            pack: pr.id,
            en: w.en,
            id: wid,
            voice: v,
            def: w.ww?.def?.en || "",
          });
          missingAudio.push(`${pr.id}/${v}/${wid}.mp3`);
        }
      }
    }

    for (const w of words) {
      const wid = String(w.id).toLowerCase();
      for (const v of VOICES) {
        const f = path.join(packDir, "audio", v, wid + ".mp3");
        if (fs.existsSync(f) && fs.statSync(f).size < 2000) {
          tooSmall.push(f);
        }
      }
    }

    const manifest = buildManifest(pr.id, pr.title, words, {
      missingAudio,
      tooSmall,
    });
    fs.writeFileSync(
      path.join(packDir, "MANIFEST.json"),
      JSON.stringify(manifest, null, 2) + "\n"
    );
    console.log(
      pr.id,
      words.length,
      "words",
      missingAudio.length,
      "audio gaps (pre-TTS)"
    );
  }

  fs.writeFileSync(
    path.join(__dirname, "ielts_audio_todo_438b.json"),
    JSON.stringify(audioTodo, null, 2) + "\n"
  );
  fs.writeFileSync(
    path.join(__dirname, "ielts_picture_gaps_438b.json"),
    JSON.stringify({ packs: PACK_RANGES.map((p) => p.id), missing: pictureGaps }, null, 2) +
      "\n"
  );
  console.log("audio todo:", audioTodo.length, "picture gaps:", pictureGaps.length);
}

main();
