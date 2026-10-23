#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const LANGS = [
  "en", "ko", "zh-Hans", "ja", "es", "hi", "de", "vi", "pt-BR", "id", "fr", "ar", "tr", "it", "pl",
];
const VOICES = ["us_m", "us_f", "uk_m", "uk_f", "grandma", "grandpa", "leo", "robot", "ww_us_m"];
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/** Edge TTS neural voices (same family as existing Word Master pack audio). */
const TTS_VOICE = {
  us_m: "en-US-GuyNeural",
  us_f: "en-US-JennyNeural",
  uk_m: "en-GB-RyanNeural",
  uk_f: "en-GB-SoniaNeural",
  grandma: "en-US-AriaNeural",
  grandpa: "en-US-AndrewNeural",
  leo: "en-US-BrianNeural",
  robot: "en-US-SteffanNeural",
  ww_us_m: "en-US-GuyNeural",
};

const EDGE_TTS = process.env.EDGE_TTS || path.join(process.env.HOME || "", ".local/bin/edge-tts");

function wordSlug(en) {
  return String(en || "").trim().toLowerCase();
}

function parseWordList(file) {
  const text = fs.readFileSync(file, "utf8");
  const words = [];
  for (const line of text.split("\n")) {
    const m = line.match(/^\s*(\d+)\.\s+(\S+)/);
    if (m) words.push({ rank: Number(m[1]), en: m[2].toLowerCase() });
  }
  return words;
}

function packRange(packNum) {
  const lo = (packNum - 1) * 100 + 1;
  const hi = packNum * 100;
  return { lo, hi, id: "ielts" + String(packNum).padStart(2, "0"), title: `IELTS ${lo}–${hi}` };
}

function scoreEntry(w) {
  if (!w || !w.ww) return 0;
  let s = 10;
  if (w.l1 && typeof w.l1 === "object") s += Object.keys(w.l1).length;
  if (w.ww.def) s += Object.keys(w.ww.def).length;
  if (w.ww.example) s += Object.keys(w.ww.example).length;
  if (w.picture_prompt) s += 5;
  return s;
}

function loadPackWordIndex() {
  const index = new Map();
  const dir = path.join(ROOT, "packs");
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".json")) continue;
    const packId = file.slice(0, -5);
    let data;
    try {
      data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
    } catch (e) {
      continue;
    }
    for (const w of data.words || []) {
      if (!w || !w.en) continue;
      const key = wordSlug(w.en);
      const prev = index.get(key);
      if (!prev || scoreEntry(w) > scoreEntry(prev.word)) {
        index.set(key, { packId, word: w });
      }
    }
  }
  return index;
}

function loadOverrides() {
  const p = path.join(ROOT, "data", "ielts_overrides.json");
  if (!fs.existsSync(p)) return new Map();
  const raw = JSON.parse(fs.readFileSync(p, "utf8"));
  const m = new Map();
  for (const [k, v] of Object.entries(raw)) m.set(wordSlug(k), v);
  return m;
}

function clone(o) {
  return JSON.parse(JSON.stringify(o));
}

function normalizeWord(w, en) {
  const out = clone(w);
  out.en = String(out.en || en).toLowerCase();
  const slug = wordSlug(out.en);
  out.id = slug;
  if (out.ko) out.ko = String(out.ko).replace(/\s*\(T\)\s*/g, "").trim();
  if (out.l1 && out.l1.ko) out.l1.ko = String(out.l1.ko).replace(/\s*\(T\)\s*/g, "").trim();
  const pos = (out.ww && out.ww.pos) || "n";
  if (out.ww) {
    out.ww.sense_id = slug + "." + pos + ".s1";
    if (!out.ww.pos) out.ww.pos = pos;
  }
  if (!out.l1 || typeof out.l1 !== "object") out.l1 = { en: out.en, ko: out.ko || out.en };
  if (!out.l1.en) out.l1.en = out.ww && out.ww.def ? out.ww.def.en : out.en;
  return out;
}

function guessPos(en) {
  if (/^(in|un|re|de|dis)/.test(en) && en.endsWith("ate")) return "v";
  if (en.endsWith("ly")) return "adv";
  if (en.endsWith("ive") || en.endsWith("ent") || en.endsWith("ous") || en.endsWith("ful")) return "adj";
  if (en.endsWith("ate") || en.endsWith("ify") || en.endsWith("ise") || en.endsWith("ize")) return "v";
  return "n";
}

function stubLexicon(en) {
  const pos = guessPos(en);
  const gloss =
    pos === "v"
      ? "to do something related to " + en
      : pos === "adj"
        ? "having the quality of " + en
        : "a word used in academic English: " + en;
  const defEn =
    pos === "v"
      ? "to " + en.replace(/e$/, "") + " (academic sense)"
      : "an academic term: " + en;
  const exEn = "The report uses the word \"" + en + "\" in an academic context.";
  const l1 = {};
  const def = {};
  const example = {};
  for (const lang of LANGS) {
    l1[lang] = lang === "en" ? gloss : gloss;
    def[lang] = lang === "en" ? defEn : defEn;
    example[lang] = lang === "en" ? exEn : exEn;
  }
  l1.ko = en;
  def.ko = "학술 영어 단어: " + en;
  example.ko = "보고서는 학술 맥락에서 \"" + en + "\"(을)를 사용한다.";
  return normalizeWord(
    {
      id: en,
      en,
      ko: en,
      picture_prompt:
        "Photorealistic photo illustrating the idea of " +
        en +
        " in a university study setting, no text, no letters, no logos",
      l1,
      ww: { sense_id: en + "." + pos + ".s1", pos, def, example },
    },
    en
  );
}

function resolveWord(en, packIndex, overrides, opts) {
  const key = wordSlug(en);
  if (overrides.has(key)) return normalizeWord(overrides.get(key), en);
  const hit = packIndex.get(key);
  if (hit) return normalizeWord(hit.word, en);
  if (opts && opts.allowStubLexicon) return stubLexicon(en);
  throw new Error("No lexical entry for: " + en);
}

function buildPackJson(packNum, words) {
  const { id, title, lo, hi } = packRange(packNum);
  return {
    id,
    title,
    band: "IELTS",
    pos: "mixed",
    source: `IELTS Master 1500 (AWL + IELTS academic), ranks ${lo}–${hi} by frequency.`,
    words,
  };
}

function pickWrong(words, idx, n) {
  const wrong = [];
  for (let d = 1; wrong.length < n && d < words.length; d++) {
    const j = (idx + d) % words.length;
    if (j !== idx) wrong.push(words[j].id);
  }
  return wrong.slice(0, n);
}

function buildGames(pack, words) {
  const { id, title } = pack;
  const leap = {
    pack_id: id,
    title,
    module_id: "word_master",
    seconds: 15,
    items: words.map(function (w, i) {
      return {
        item_id: w.id,
        question: String((w.l1 && w.l1.en) || w.en).trim(),
        correct: w.id,
        wrong: pickWrong(words, i, 2),
        word: w.id,
      };
    }),
  };
  const snow = JSON.parse(JSON.stringify(leap));
  snow.pack_id = id;
  const spell = {
    pack_id: id,
    title,
    seconds_per_letter: 5,
    items: words.map(function (w) {
      return { item_id: w.id, word: w.id };
    }),
  };
  return { leap, snow, spell };
}

function walkAudioFiles(dir, acc) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkAudioFiles(p, acc);
    else if (ent.name.endsWith(".mp3")) {
      const parts = p.split(path.sep);
      const vi = parts.indexOf("audio");
      if (vi < 0 || vi + 1 >= parts.length) continue;
      const voice = parts[vi + 1];
      if (!VOICES.includes(voice)) continue;
      const id = ent.name.slice(0, -4).toLowerCase();
      if (!acc[id]) acc[id] = {};
      if (!acc[id][voice]) acc[id][voice] = p;
    }
  }
  return acc;
}

function loadGlobalAudioIndex() {
  return walkAudioFiles(path.join(ROOT, "packs"), {});
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function ffmpegMp3(src, dest) {
  const r = spawnSync(
    "ffmpeg",
    ["-y", "-i", src, "-ac", "1", "-ar", "44100", "-b:a", "128k", dest],
    { encoding: "utf8" }
  );
  if (r.status !== 0) throw new Error("ffmpeg failed: " + (r.stderr || r.stdout));
}

function edgeSpeak(text, voiceName, destRaw) {
  const r = spawnSync(EDGE_TTS, ["--voice", voiceName, "--text", text, "--write-media", destRaw], {
    encoding: "utf8",
  });
  if (r.status !== 0) throw new Error("edge-tts failed for " + voiceName + ": " + (r.stderr || r.stdout));
}

function synthesizeClip(voiceKey, text, dest) {
  ensureDir(path.dirname(dest));
  const raw = dest + ".raw.mp3";
  let voice = TTS_VOICE[voiceKey];
  if (!voice) throw new Error("unknown voice " + voiceKey);
  try {
    edgeSpeak(text, voice, raw);
  } catch (e) {
    if (voiceKey === "grandpa" && voice !== TTS_VOICE.us_m) {
      voice = TTS_VOICE.us_m;
      edgeSpeak(text, voice, raw);
    } else throw e;
  }
  ffmpegMp3(raw, dest);
  try {
    fs.unlinkSync(raw);
  } catch (e) {}
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function ttsTextForVoice(voiceKey, word) {
  if (voiceKey === "ww_us_m") {
    const d = word.ww && word.ww.def && word.ww.def.en;
    return String(d || word.en).trim();
  }
  return String(word.en).trim();
}

function installLetters(packDir) {
  const srcDir = path.join(ROOT, "packs", "nouns100", "audio", "letters");
  const destDir = path.join(packDir, "audio", "letters");
  ensureDir(destDir);
  for (const L of LETTERS) {
    const s = path.join(srcDir, L + ".mp3");
    const d = path.join(destDir, L + ".mp3");
    if (!fs.existsSync(d)) copyFile(s, d);
  }
}

function syncPackAudio(packId, words, audioIndex, opts) {
  const packDir = path.join(ROOT, "packs", packId);
  const missingTts = [];
  installLetters(packDir);
  for (const w of words) {
    const id = w.id;
    for (const v of VOICES) {
      const dest = path.join(packDir, "audio", v, id + ".mp3");
      if (fs.existsSync(dest) && !opts.force) continue;
      const src = audioIndex[id] && audioIndex[id][v];
      if (src && fs.existsSync(src)) {
        copyFile(src, dest);
        continue;
      }
      if (opts.skipTts) {
        missingTts.push(id + "/" + v);
        continue;
      }
      try {
        synthesizeClip(v, ttsTextForVoice(v, w), dest);
      } catch (e) {
        missingTts.push(id + "/" + v + " (" + e.message + ")");
      }
    }
  }
  return missingTts;
}

function pictureGaps(packId, words) {
  const packDir = path.join(ROOT, "packs", packId);
  const missing = [];
  for (const w of words) {
    const pic = path.join(packDir, w.id + ".jpg");
    if (!fs.existsSync(pic)) missing.push(w.id + ".jpg");
  }
  return missing;
}

function writeManifest(packId, pack, words, extra) {
  const packDir = path.join(ROOT, "packs", packId);
  const missingPics = pictureGaps(packId, words);
  const manifest = {
    pack: packId,
    title: pack.title,
    words: words.map((w) => w.id),
    voices: VOICES.filter((v) => v !== "ww_us_m").concat(["ww_us_m"]),
    l1: LANGS,
    missing_files: (extra.missing_files || []).concat(missingPics.map((f) => f)),
    too_small: extra.too_small || [],
    missing_l1: extra.missing_l1 || [],
    ok: missingPics.length === 0 && !(extra.missing_files || []).length,
  };
  ensureDir(packDir);
  fs.writeFileSync(path.join(packDir, "MANIFEST.json"), JSON.stringify(manifest, null, 2) + "\n");
  return manifest;
}

function writePack(packNum, packIndex, overrides, opts) {
  const { id, lo, hi } = packRange(packNum);
  const list = parseWordList(path.join(ROOT, "data", "ielts_1500.txt"));
  const slice = list.filter((w) => w.rank >= lo && w.rank <= hi);
  const words = slice.map((row) => resolveWord(row.en, packIndex, overrides, opts));
  const pack = buildPackJson(packNum, words);
  const packJsonPath = path.join(ROOT, "packs", id + ".json");
  fs.writeFileSync(packJsonPath, JSON.stringify(pack, null, 2) + "\n");

  const games = buildGames(pack, words);
  const gamesDir = path.join(ROOT, "packs", id, "games");
  ensureDir(gamesDir);
  fs.writeFileSync(path.join(gamesDir, "leap-frog.json"), JSON.stringify(games.leap, null, 2) + "\n");
  fs.writeFileSync(path.join(gamesDir, "snow-jump.json"), JSON.stringify(games.snow, null, 2) + "\n");
  fs.writeFileSync(path.join(gamesDir, "spellfire.json"), JSON.stringify(games.spell, null, 2) + "\n");

  const audioIndex = loadGlobalAudioIndex();
  const missingAudio = syncPackAudio(id, words, audioIndex, opts);
  const manifest = writeManifest(id, pack, words, {
    missing_files: missingAudio.map((x) => "audio/" + x),
  });
  return { id, words: words.length, manifest, missingAudio };
}

function fillAudioGaps(packId, words, opts) {
  const audioIndex = loadGlobalAudioIndex();
  return syncPackAudio(packId, words, audioIndex, { force: false, skipTts: false, ...opts });
}

module.exports = {
  ROOT,
  LANGS,
  VOICES,
  TTS_VOICE,
  parseWordList,
  packRange,
  loadPackWordIndex,
  loadOverrides,
  resolveWord,
  buildPackJson,
  writePack,
  writeManifest,
  pictureGaps,
  wordSlug,
  loadGlobalAudioIndex,
  fillAudioGaps,
  syncPackAudio,
};
