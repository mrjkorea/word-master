#!/usr/bin/env node
"use strict";

const PathLock = require("../js/path-lock.js");
const { bootApp } = require("./load_app_for_test");
require("../js/progress-merge.js");

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

function fillRound(set, ids) {
  ids.forEach(function (id) {
    set.intro[id] = true;
    set.winsA[id] = 2;
    set.winsB[id] = 2;
    set.winsC[id] = 2;
  });
}

// (a) Stale tapmapKey — classroom soohyeon shape.
const roundIds = ["w26", "w27", "w28", "w29", "w30"];
const roundKey = roundIds.join(",");
const stale = {
  words: wordsOf(50),
  meetLock: roundIds.slice(),
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  tapmapKey: "w1,w2,w3,w4,w5",
  roundGames: {},
  pathHeld: {},
};
fillRound(stale, roundIds);
stale.roundGames[roundKey] = { done: true, game: "snowjump", at: 1 };
stale.pathHeld[roundKey] = { A: true, B: true, C: true, games: true };
if (!PathLock.can(stale, "test").ok) fail("(a) stale tapmapKey should open test");

// (b) roundGames + pathHeld stored under reversed meetLock order.
const revKey = roundIds.slice().reverse().join(",");
const reversed = {
  words: wordsOf(50),
  meetLock: roundIds.slice(),
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  tapmapKey: roundKey,
  roundGames: {},
  pathHeld: {},
};
fillRound(reversed, roundIds);
reversed.roundGames[revKey] = { done: true, game: "leapfrog", at: 2 };
reversed.pathHeld[revKey] = { A: true, B: true, C: true, games: true };
PathLock.syncRound(reversed);
if (!PathLock.can(reversed, "test").ok) {
  fail("(b) reversed round key should open test after sync");
}

// (b2) Cloud merge: pathHeld intro on one shard, steps on the other.
const mergePack = global.MRJ_WM_mergePack;
if (!mergePack) fail("MRJ_WM_mergePack missing");
const localPack = {
  meetLock: roundIds,
  intro: Object.fromEntries(roundIds.map(function (id) { return [id, true]; })),
  winsA: {},
  winsB: {},
  winsC: {},
  pathHeld: { [roundKey]: { intro: true } },
  roundGames: {},
  lastPlayedAt: 100,
};
roundIds.forEach(function (id) {
  localPack.winsA[id] = 2;
  localPack.winsB[id] = 2;
  localPack.winsC[id] = 2;
});
const remotePack = {
  meetLock: roundIds,
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  tapmapKey: "w1,w2,w3,w4,w5",
  pathHeld: { [roundKey]: { A: true, B: true, C: true, games: true } },
  roundGames: { [roundKey]: { done: true, game: "snowjump", at: 200 } },
  lastPlayedAt: 50,
};
const merged = mergePack(localPack, remotePack);
const mergedSet = {
  words: wordsOf(50),
  meetLock: merged.meetLock,
  intro: merged.intro,
  winsA: merged.winsA,
  winsB: merged.winsB,
  winsC: merged.winsC,
  tapmapKey: merged.tapmapKey,
  pathHeld: merged.pathHeld,
  roundGames: merged.roundGames,
};
if (merged.tapmapKey !== roundKey) fail("(b2) merge should heal tapmapKey to meetLock");
if (!PathLock.can(mergedSet, "test").ok) fail("(b2) merged cloud pack should open test");

// (c) Normal happy path: meet through game.
const happy = {
  words: wordsOf(10),
  meetLock: ["w1", "w2"],
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  tapmapKey: "",
  roundGames: {},
  pathHeld: {},
};
happy.tapmapKey = "w1,w2";
happy.intro.w1 = true;
happy.intro.w2 = true;
if (!PathLock.can(happy, "A").ok) fail("(c) meet should open learn");
fillRound(happy, ["w1", "w2"]);
PathLock.markGameDone(happy, "leapfrog");
if (!PathLock.can(happy, "test").ok) fail("(c) happy path should open test");

const api = bootApp({ mode: "student" });
api.activateSet({
  id: "happy-app",
  packId: "nouns100",
  title: "Nouns",
  words: happy.words,
  meetLock: happy.meetLock,
  intro: happy.intro,
  winsA: happy.winsA,
  winsB: happy.winsB,
  winsC: happy.winsC,
  tapmapKey: happy.tapmapKey,
  roundGames: happy.roundGames,
  pathHeld: happy.pathHeld,
});
if (!api.pathOpen("test")) fail("(c) app pathOpen(test) on happy path");

// (d) All-pack rules unchanged (Meet/Learn closed; slice Test after game).
const apiAll = bootApp({
  mode: "student",
  beforeApp: function (g) {
    g.WordFactoryI18n = {
      setLocale: function (x) { return x || "en"; },
      getLocale: function () { return "en"; },
      fillSelect: function () {},
      applyDom: function () {},
      partName: function (m) { return m; },
      partHint: function () { return ""; },
      t: function (k) { return k; },
    };
  },
});
const allPackSet = {
  id: "all-unlock",
  packId: "nouns100",
  title: "Nouns",
  words: wordsOf(100),
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  meetLock: [],
};
apiAll.activateSet(allPackSet);
apiAll.setStudySize(0);
apiAll.chooseStart(allPackSet, 1);
if (!apiAll.allRoundActive()) fail("(d) All round not active");
if (apiAll.currentSet().meetLock.length !== 100) fail("(d) All meetLock length");
if (apiAll.pathOpen("intro") || apiAll.pathOpen("A")) fail("(d) All must skip Meet/Learn");
if (apiAll.pathOpen("test")) fail("(d) All slice test locked before game");
const allSet = apiAll.currentSet();
allSet.meetLock.forEach(function (id) {
  allSet.winsB[id] = 2;
  allSet.winsC[id] = 2;
});
PathLock.markGameDone(allSet, "snowjump");
if (!apiAll.pathOpen("test")) fail("(d) All should open slice test after game");

console.log("STUDENT_TEST_UNLOCK_OK");
