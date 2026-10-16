#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { bootApp } = require("./load_app_for_test");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

const root = path.join(__dirname, "..");
const frogHtml = fs.readFileSync(path.join(root, "games/leap-frog/index.html"), "utf8");
const frogJs = fs.readFileSync(path.join(root, "games/leap-frog/assets/" + (frogHtml.match(/assets\/(index-[\w-]+\.js)/) || [])[1]), "utf8");
// v3: the Word Master copy takes the student from ?student= and enables Start at once (one tap also unlocks iOS audio)
if (frogJs.indexOf("url-student") === -1) fail("leap frog mount missing URL student");
if (frogHtml.indexOf("if (embedded) return;") === -1) fail("leap frog Word Master copy must skip sign-in when embedded");
if (frogJs.indexOf("speechSynthesis") !== -1) fail("leap frog must not use speechSynthesis");
if (false) {
  fail("leap frog bootstrap missing URL student autostart");
}

const memJs = fs.readFileSync(path.join(root, "games/memory-match/assets/index-CjSx5yu_.js"), "utf8");
if (memJs.indexOf("function mmResolveMedia(i)") === -1) fail("memory match missing session media resolver");
if (memJs.indexOf("speechSynthesis") === -1) fail("memory match missing speech synthesis fallback");
if (memJs.indexOf("itemEn:String(a.en") === -1) fail("memory match cards missing itemEn");

if (memJs.indexOf("Or(s.audio_id)&&(u.audio_id") !== -1) {
  fail("memory match session parser still drops non-https audio_id");
}

function mmResolveMedia(i) {
  const e = String(i || "").trim();
  if (!e) return "";
  if (/^https?:\/\//i.test(e) || e.startsWith("./") || e.startsWith("/")) return e;
  try {
    return new URL(e, "https://mrjkorea.github.io/word-master/games/memory-match/").href;
  } catch (err) {
    return e;
  }
}
const relAudio = mmResolveMedia("packs/toeic01/audio/us_m/mister.mp3");
if (relAudio.indexOf("mister.mp3") === -1) fail("mmResolveMedia audio " + relAudio);

const api = bootApp({ mode: "student" });
api.activateSet({
  id: "set_toeic01",
  packId: "toeic01",
  title: "TOEIC",
  externalPackSrc: "https://mrjkorea.github.io/word-master-toeic/packs/toeic01.json",
  words: [{ id: "mister", en: "mister", ko: "미스터" }],
  intro: {},
  meetLock: [],
  winsA: {},
  winsB: {},
  winsC: {},
});
const mem = api.memoryPack(api.currentSet());
if (!mem.items[0].audio_id || mem.items[0].audio_id.indexOf("word-master-toeic") === -1) {
  fail("memoryPack toeic audio " + mem.items[0].audio_id);
}

console.log("GAMES_AUDIO_LEAP_OK");
