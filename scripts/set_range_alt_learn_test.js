#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { bootApp } = require("./load_app_for_test");

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

const root = path.join(__dirname, "..");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
if (index.indexOf('id="set-range-banner"') === -1) fail("missing set-range-banner in index.html");

const api = bootApp({
  mode: "student",
  beforeApp: function (g) {
    require("../js/score-day-log.js");
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
const packWords = wordsOf(100);
const set = {
  id: "pack6-alt",
  packId: "verbs200",
  title: "Verbs 200",
  words: packWords.slice(0, 50),
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  meetLock: [],
  testPassed: {},
};
// Finish the first aligned block (words 1–5) while meetLock is empty.
["w1", "w2", "w3", "w4", "w5"].forEach(function (id) {
  set.intro[id] = true;
  set.winsA[id] = 2;
  set.winsB[id] = 2;
  set.winsC[id] = 2;
});
api.activateSet(set);
api.setStudySize(5);

if (!api.roundReadyForGame(api.currentSet())) fail("first finished block should still open games when lock empty");

api.chooseStart(set, 26);
if (api.currentSet().startNumber !== 26) fail("startNumber should snap to 26, got " + api.currentSet().startNumber);
const lock = api.currentSet().meetLock.join(",");
if (lock !== "w26,w27,w28,w29,w30") fail("meetLock for 26–30: " + lock);

["w26", "w27", "w28", "w29", "w30"].forEach(function (id) {
  api.currentSet().intro[id] = true;
});
if (api.currentRoundReadyForGame(api.currentSet())) fail("new slice with intro only should not be round-ready");

api.currentSet().tapmapKey = api.currentSet().meetLock.join(",");
api.startTapmap();
if (api.screenName() !== "learn") {
  fail("alt path should open Learn, got screen " + api.screenName());
}

const label = api.setRangeBannerText(api.currentSet());
if (label !== "Verbs 126–130") fail("range banner " + label);

api.paintSetRangeBanner("learn");
const banner = document.querySelector("#set-range-banner");
if (!banner || banner.hidden || banner.textContent !== "Verbs 126–130") {
  fail("banner dom " + (banner && banner.textContent));
}

console.log("SET_RANGE_ALT_LEARN_OK");
