#!/usr/bin/env node
"use strict";

global.window = global;
require("../js/progress-merge.js");
require("../js/progress.js");

const merge = global.MRJ_WM_merge;
const mergeSave = global.MRJ_WM_progress && global.MRJ_WM_progress.mergeSaveProgress;
const poorer = global.MRJ_WM_progressIsStrictlyPoorer;
const { bootApp } = require("./load_app_for_test.js");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

if (!merge || !mergeSave || !poorer) fail("progress helpers missing");

const richServer = {
  v: 1,
  sets: {
    nouns100: {
      winsA: { w1: 2 },
      intro: { w1: true },
      meetLock: ["w1"],
      testPassed: { w1: 90 },
      lastPlayedAt: 50,
    },
  },
};

const emptyIncoming = { v: 1, currentPackId: "", sets: {} };
if (!poorer(emptyIncoming, richServer)) fail("empty incoming should be poorer than server");

global.MRJ_WM_progress.setServerSnapshot(JSON.stringify(richServer));
const mergedSave = mergeSave(JSON.stringify(emptyIncoming));
if (!mergedSave.sets.nouns100 || mergedSave.sets.nouns100.testPassed.w1 !== 90) {
  fail("mergeSaveProgress should keep server pack: " + JSON.stringify(mergedSave));
}

function simulateKnownCheckup(api, packId, wordIds) {
  const words = wordIds.map(function (id, i) {
    return { id: id, en: "word" + i, ko: "뜻" + i };
  });
  const set = {
    id: "set_" + packId,
    packId: packId,
    title: packId,
    words: words,
    winsA: {},
    winsB: {},
    winsC: {},
    intro: {},
    meetLock: wordIds.slice(),
    testPassed: {},
    lastPlayedAt: Date.now(),
    externalPackSrc: packId === "toeic01"
      ? "https://mrjkorea.github.io/word-master-toeic/packs/toeic01.json"
      : "",
  };
  wordIds.forEach(function (id) {
    api.markPassed(set, [id], 85);
  });
  api.activateSet(set);
  const slimAfterKnown = api.slimProgress();
  if (!slimAfterKnown.sets[packId] || !slimAfterKnown.sets[packId].testPassed[wordIds[0]]) {
    fail("known flow missing testPassed on " + packId);
  }
  set.check = { score: wordIds.length, total: wordIds.length, at: Date.now() };
  const slimAfterCheck = api.slimProgress();
  if (!slimAfterCheck.sets[packId] || !slimAfterCheck.sets[packId].check) {
    fail("checkup stamp missing on " + packId);
  }
  return slimAfterCheck;
}

const api = bootApp();
const verbsSlim = simulateKnownCheckup(api, "verbs200", ["v1", "v2", "v3"]);
api.mergeRemoteProgress({ v: 1, currentPackId: "", sets: {} });
const afterEmptyPull = api.slimProgress();
if (!afterEmptyPull.sets.verbs200) fail("library pack lost after empty server pull");

global.MRJ_WM_progress.setServerSnapshot(JSON.stringify({ v: 1, sets: {} }));
const toeicSlim = simulateKnownCheckup(api, "toeic01", ["airport", "ticket"]);
const freshComputer = bootApp();
freshComputer.mergeRemoteProgress(toeicSlim);
freshComputer.mergeRemoteProgress(verbsSlim);
const loaded = freshComputer.slimProgress();
if (!loaded.sets.verbs200 || !loaded.sets.toeic01) {
  fail("fresh computer missing packs: " + JSON.stringify(Object.keys(loaded.sets || {})));
}
if (loaded.sets.toeic01.testPassed.airport !== 85) {
  fail("toeic01 known state not restored");
}

console.log("PROGRESS_KNOWN_CHECKUP_SAVE_OK");
process.exit(0);
