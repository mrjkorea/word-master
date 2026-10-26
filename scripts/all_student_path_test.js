#!/usr/bin/env node
"use strict";

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

const api = bootStudent();
const pack = wordsOf(100);
const set = {
  id: "all-path-pack",
  packId: "nouns100",
  title: "Nouns 100",
  words: pack,
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  meetLock: [],
};
api.activateSet(set);
api.setStudySize(0);
api.chooseStart(set, 1);
if (!api.allRoundActive()) fail("All round not active after chooseStart");
if (api.currentSet().meetLock.length !== 100) {
  fail("meetLock length " + api.currentSet().meetLock.length);
}

api.startTapmap();
if (api.screenName() !== "learn") fail("All should skip Meet, got " + api.screenName());
if (!api.pathOpen("B")) fail("Dictation should be open on All");
if (api.pathOpen("intro") || api.pathOpen("A")) fail("Meet/Learn must stay closed on All");
if (api.pathOpen("test")) fail("slice path test should stay locked before games");

api.renderSetHome();
const finalEasy = global.document.querySelector("#btn-final-easy");
const finalHard = global.document.querySelector("#btn-final-hard");
const sliceEasy = global.document.querySelector("#btn-easy");
if (!finalEasy || finalEasy.hidden) fail("final easy hidden");
if (!finalHard || finalHard.hidden) fail("final hard hidden");
if (finalEasy.disabled || finalHard.disabled) fail("final tests should not be path-locked");
if (!sliceEasy || !sliceEasy.hidden) fail("slice easy should hide on All");

api.startEasy(true);
let quiz = api.getQuiz();
if (!quiz.wide || quiz.kind !== "final") fail("wide easy kind " + quiz.kind);
if (quiz.items.length !== 100) fail("wide easy count " + quiz.items.length);

api.startHard(true);
quiz = api.getQuiz();
if (!quiz.wide || quiz.kind !== "hard") fail("wide hard kind " + quiz.kind);
const kindEl = global.document.querySelector("#test-kind");
if (!kindEl || kindEl.textContent !== "ALL") fail("wide hard label " + (kindEl && kindEl.textContent));

quiz.score = 85;
quiz.mistakes = [];
api.finishQuiz();
const fin = api.currentSet().final;
if (!fin || fin.pct !== 85 || fin.total !== 100) fail("wide hard final save " + JSON.stringify(fin));

// Normal slice path unchanged
const api2 = bootStudent();
const sliceSet = {
  id: "slice-path",
  packId: "nouns200",
  title: "Slice",
  words: wordsOf(20),
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  meetLock: [],
};
api2.activateSet(sliceSet);
api2.setStudySize(5);
api2.chooseStart(sliceSet, 1);
if (api2.allRoundActive()) fail("slice should not be all round");
api2.startTapmap();
if (api2.screenName() !== "intro") fail("slice should Meet first, got " + api2.screenName());
if (!api2.studentLocked(sliceSet, "test")) fail("slice test should start locked");

console.log("ALL_STUDENT_PATH_OK");
process.exit(0);
