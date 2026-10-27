#!/usr/bin/env node
"use strict";

const PathLock = require("../js/path-lock.js");
const { bootApp } = require("./load_app_for_test");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

function wordsOf(n) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    out.push({ id: "w" + i, en: "word" + i, ko: "ko" + i });
  }
  return out;
}

const roundIds = ["w26", "w27", "w28", "w29", "w30"];
const roundKey = roundIds.join(",");
const staleTapmapKey = ["w1", "w2", "w3", "w4", "w5"].join(",");

const set = {
  id: "stale-tapmap",
  packId: "verbs100",
  title: "Verbs",
  words: wordsOf(50),
  meetLock: roundIds.slice(),
  startNumber: 26,
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  tapmapKey: staleTapmapKey,
  roundGames: {},
  pathHeld: {},
};

roundIds.forEach(function (id) {
  set.intro[id] = true;
  set.winsA[id] = 2;
  set.winsB[id] = 2;
  set.winsC[id] = 2;
});
set.roundGames[roundKey] = { done: true, game: "snowjump", at: Date.now() };
set.pathHeld[roundKey] = { A: true, B: true, C: true, games: true };
set.roundGame = { done: true, game: "snowjump", at: Date.now() };
set.roundGameKey = roundKey;

if (!PathLock.can(set, "games").ok) fail("games should be open with stale tapmapKey");
if (!PathLock.can(set, "test").ok) fail("test should open when intro flags match meetLock despite stale tapmapKey");

const held = PathLock.hold(set);
if (!held.intro) fail("hold should treat intro flags as done for current meetLock");
if (set.pathHeld[roundKey].intro !== true) fail("pathHeld intro latch should backfill");

const api = bootApp({ mode: "student" });
api.activateSet(set);
if (api.studentLocked(api.currentSet(), "test")) {
  fail("student test button should unlock without teacher mode");
}
if (!api.pathOpen("test")) fail("pathOpen(test) should succeed for stale tapmap classroom state");
if (api.currentSet().tapmapKey !== roundKey) {
  fail("rememberFinishedMeet should repair tapmapKey to " + roundKey);
}

console.log("STALE_TAPMAP_TEST_UNLOCK_OK");
