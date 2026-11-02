#!/usr/bin/env node
"use strict";

const Algo = require("../js/factory-algo.js");
const { bootApp } = require("./load_app_for_test.js");

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

function assertFullPool(api, label) {
  const set = api.currentSet();
  const pool = api.playWords(set);
  if (pool.length !== 100) fail(label + " playWords " + pool.length);
  if (!api.allRoundActive()) fail(label + " allRoundActive false");
  if (set.meetLock.length !== 100) fail(label + " meetLock " + set.meetLock.length);
  api.startTapmap();
  if (api.screenName() !== "learn") fail(label + " screen " + api.screenName());
  const wins = Algo.bucket(
    { winsA: set.winsA, winsB: set.winsB, winsC: set.winsC },
    "B"
  );
  const rem = Algo.remaining(pool, wins).length;
  if (rem !== 100) fail(label + " dictation remaining " + rem);
}

// Bug shape: All chip on (studySize 0) but tail startNumber → 1-word meetLock.
const api = bootStudent();
const pack = wordsOf(100);
const set = {
  id: "all-pool-bug",
  packId: "nouns100",
  title: "Nouns 100",
  words: pack,
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  meetLock: ["w100"],
  startNumber: 100,
};
api.setStudySize(0);
api.activateSet(set);
assertFullPool(api, "heal on activateSet");

const api2 = bootStudent();
const set2 = {
  id: "all-pool-choose",
  packId: "nouns100",
  title: "Nouns 100",
  words: pack,
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  meetLock: [],
};
api2.activateSet(set2);
api2.setStudySize(0);
api2.chooseStart(set2, 100);
if (api2.currentSet().meetLock.length !== 100) {
  fail("chooseStart(100) in All mode lock " + api2.currentSet().meetLock.length);
}
if (api2.sliceCount(set2, 100) !== 100) fail("sliceCount in All mode " + api2.sliceCount(set2, 100));
assertFullPool(api2, "chooseStart tail");

console.log("ALL_PACK_DICTATION_POOL_OK");
process.exit(0);
