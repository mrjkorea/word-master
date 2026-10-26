#!/usr/bin/env node
"use strict";

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

function fullyLearned(set, words) {
  words.forEach(function (w) {
    set.intro[w.id] = true;
    set.winsA[w.id] = 2;
    set.winsB[w.id] = 2;
    set.winsC[w.id] = 2;
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

function assertDictationFirst(api, label) {
  api.startTapmap();
  const screen = api.screenName();
  if (screen !== "learn") fail(label + " should open Dictation (learn), got " + screen);
  if (!api.pathOpen("B")) fail(label + " should open Dictation step");
  if (api.pathOpen("intro") || api.pathOpen("A")) fail(label + " must skip Meet/Learn");
}

function assertMeetFirst(api, label) {
  api.startTapmap();
  const screen = api.screenName();
  if (screen !== "intro") fail(label + " should open Meet (intro), got " + screen);
}

// (a) All / 100 on a fully mastered pack must skip Meet and open Dictation.
const apiA = bootStudent();
const verbs100 = wordsOf(100);
const verbsSet = {
  id: "verbs300-all",
  packId: "verbs300",
  title: "Verbs 301–400",
  words: verbs100,
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  meetLock: [],
};
fullyLearned(verbsSet, verbs100);
apiA.activateSet(verbsSet);
apiA.setStudySize(0);
apiA.chooseStart(verbsSet, 1);
if (apiA.currentSet().meetLock.length !== 100) {
  fail("All meetLock length " + apiA.currentSet().meetLock.length);
}
assertDictationFirst(apiA, "All/100 mastered pack");

// (b) Fresh slice after another finished slice: Meet first, not games.
const apiB = bootStudent();
const pack50 = wordsOf(50);
const sliceSet = {
  id: "nouns-alt",
  packId: "nouns200",
  title: "Nouns 200",
  words: pack50,
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  meetLock: [],
};
["w1", "w2", "w3", "w4", "w5"].forEach(function (id) {
  sliceSet.intro[id] = true;
  sliceSet.winsA[id] = 2;
  sliceSet.winsB[id] = 2;
  sliceSet.winsC[id] = 2;
});
apiB.activateSet(sliceSet);
apiB.setStudySize(5);
apiB.chooseStart(sliceSet, 26);
assertMeetFirst(apiB, "new slice 26–30 after 1–5 done");

// (c) Second pack: adverbs-style 100-word pack, All review skips Meet.
const apiC = bootStudent();
const adv100 = wordsOf(100);
const advSet = {
  id: "adv100-all",
  packId: "adverbs100",
  title: "Adverbs 100",
  words: adv100,
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  meetLock: ["w1", "w2", "w3", "w4", "w5"],
  tapmapKey: "w1,w2,w3,w4,w5",
};
fullyLearned(advSet, adv100);
apiC.activateSet(advSet);
apiC.setStudySize(0);
apiC.chooseStart(advSet, 1);
if (apiC.currentSet().meetLock.length !== 100) {
  fail("adverbs All lock " + apiC.currentSet().meetLock.length);
}
assertDictationFirst(apiC, "adverbs All after old 5-word lock");

console.log("ALT_LEARN_ALL_ROUND_OK");
