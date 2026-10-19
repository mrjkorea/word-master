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
// Game bundles are Vite builds (3D v2, 2026-10-19): read the bundle named in each game's index.html.
function liveBundle(game) {
  const html = fs.readFileSync(path.join(root, "games/" + game + "/index.html"), "utf8");
  const js = (html.match(/assets\/(index-[\w-]+\.js)/) || [])[1];
  if (!js) fail(game + " index.html has no bundle");
  return fs.readFileSync(path.join(root, "games/" + game + "/assets/" + js), "utf8");
}
const frogJs = liveBundle("leap-frog");
if (frogJs.indexOf('game:"leapfrog"') === -1) fail("leap frog bundle missing WM done message");
if (frogJs.indexOf("mrj.wm.gamepack") === -1) fail("leap frog does not read the Word Master gamepack");

const memJs = liveBundle("memory-match");
if (memJs.indexOf('game:"memorymatch"') === -1) fail("memory match bundle missing WM done message");
if (memJs.indexOf("mrj.wm.gamepack") === -1) fail("memory match does not read the Word Master gamepack");
if (memJs.indexOf("audio_id") === -1) fail("memory match cards missing audio_id");

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
