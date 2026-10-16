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
const frogJs = fs.readFileSync(path.join(root, "games/leap-frog/assets/index-Bs4ORQ3Y.js"), "utf8");
if (frogJs.indexOf("studentId:st") === -1) fail("leap frog mount missing studentId param");
if (frogJs.indexOf("autostart:as") === -1) fail("leap frog mount missing autostart param");
if (frogJs.indexOf("studentId:lfEmbedStudent,autostart:!!lfEmbedStudent") === -1) {
  fail("leap frog bootstrap missing URL student autostart");
}
if (frogJs.indexOf("as&&st&&S(st)") === -1) fail("leap frog missing autostart call");

// Memory Game is a Vite build now (rebuilt 2026-10): read the bundle named in index.html. Baked audio only, no TTS.
const memHtml = fs.readFileSync(path.join(root, "games/memory-match/index.html"), "utf8");
const memJs = fs.readFileSync(path.join(root, "games/memory-match/assets/" + ((memHtml.match(/assets\/(index-[\w-]+\.js)/) || [])[1] || "missing.js")), "utf8");
if (memHtml.indexOf('<meta name="mrj-host" content="word-master"') === -1) fail("memory match is not the Word Master build");
if (memJs.indexOf("mrj.wm.gamepack") === -1) fail("memory match missing session pack");
if (memJs.indexOf("speechSynthesis") !== -1) fail("memory match still uses speech synthesis");
if (memJs.indexOf("itemEn:String(") === -1) fail("memory match cards missing itemEn");
if (memJs.indexOf("blob:") === -1 || memJs.indexOf("new URL(") === -1) fail("memory match missing session media resolver");

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
