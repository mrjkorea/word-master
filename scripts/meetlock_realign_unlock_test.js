#!/usr/bin/env node
"use strict";

const { bootApp } = require("./load_app_for_test");
const PathLock = require("../js/path-lock.js");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

function wordsOf(n) {
  const words = [];
  for (let i = 1; i <= n; i++) {
    words.push({ id: "w" + i, en: "word" + i, ko: "ko" + i });
  }
  return words;
}

function fullyLearnRound(set, ids) {
  ids.forEach(function (id) {
    set.intro[id] = true;
    set.winsA[id] = 2;
    set.winsB[id] = 2;
    set.winsC[id] = 2;
  });
}

function bootStudent() {
  return bootApp({
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
}

const roundIds = ["w26", "w27", "w28", "w29", "w30"];
const roundKey = roundIds.join(",");

// (1) Finished game opens Test on the current meetLock.
const api1 = bootStudent();
const set1 = {
  id: "slice-game-done",
  packId: "nouns200",
  title: "Nouns",
  words: wordsOf(50),
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  meetLock: roundIds.slice(),
  startNumber: 26,
  tapmapKey: roundKey,
};
fullyLearnRound(set1, roundIds);
api1.activateSet(set1);
api1.setStudySize(5);
PathLock.markGameDone(set1, "leapfrog");
if (!api1.pathOpen("test")) fail("finished game should open test before realign");

// (2) ensureRoundLock realign must migrate roundGames, not wipe them.
const api2 = bootStudent();
const set2 = {
  id: "slice-realign",
  packId: "nouns200",
  title: "Nouns",
  words: wordsOf(50),
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  meetLock: ["w1", "w2", "w3", "w4", "w5"],
  startNumber: 26,
  tapmapKey: roundKey,
  roundGames: {},
  pathHeld: {},
};
fullyLearnRound(set2, roundIds);
set2.roundGames[roundKey] = { done: true, game: "leapfrog", at: 1000 };
set2.pathHeld[roundKey] = { intro: true, A: true, B: true, C: true, games: true };
set2.roundGame = { done: true, game: "leapfrog", at: 1000 };
set2.roundGameKey = roundKey;
api2.activateSet(set2);
api2.setStudySize(5);
api2.startTapmap();
if (api2.currentSet().meetLock.join(",") !== roundKey) {
  fail("realign meetLock " + api2.currentSet().meetLock.join(","));
}
if (!api2.pathOpen("test")) fail("test should stay open after meetLock realign");

console.log("MEETLOCK_REALIGN_UNLOCK_OK");
