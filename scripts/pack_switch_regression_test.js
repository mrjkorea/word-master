#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { bootApp } = require("./load_app_for_test.js");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

function firstWordEn(api) {
  const set = api.currentSet();
  if (!set || !set.words || !set.words.length) return "";
  return set.words[0].en;
}

function loadPackWords(pid) {
  const raw = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "packs", pid + ".json"), "utf8"));
  return {
    title: raw.title,
    words: raw.words.map(function (w, i) {
      return {
        id: String(w.id || w.en || "w" + i),
        en: String(w.en || ""),
        ko: String(w.ko || (w.l1 && w.l1.ko) || ""),
      };
    }),
  };
}

const api = bootApp({ mode: "student" });
global.MRJ_AUTH = { student: function () { return "packtest"; } };

api.mergeRemoteProgress({
  v: 1,
  currentPackId: "nouns100",
  sets: {
    nouns100: {
      title: "A1 Nouns 1–100",
      winsA: { time: 2 },
      intro: { time: true },
      meetLock: ["time"],
      lastPlayedAt: 5000,
    },
  },
});

if (!api.currentSet() || api.currentSet().packId !== "nouns100") {
  fail("expected nouns100 after remote merge");
}

const verbs = loadPackWords("verbs100");
api.activateSet({
  id: "set_verbs100",
  packId: "verbs100",
  title: verbs.title,
  words: verbs.words,
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  meetLock: [],
});

if (firstWordEn(api) !== verbs.words[0].en) {
  fail("verbs first word wrong: " + firstWordEn(api));
}

api.mergeRemoteProgress({
  v: 1,
  currentPackId: "nouns100",
  sets: {
    nouns100: {
      title: "A1 Nouns 1–100",
      winsA: { time: 2 },
      intro: { time: true },
      meetLock: ["time"],
      lastPlayedAt: 5000,
    },
  },
});

if (!api.currentSet() || api.currentSet().packId !== "verbs100") {
  fail(
    "late server pull switched pack to " +
      (api.currentSet() && api.currentSet().packId) +
      " first=" +
      firstWordEn(api)
  );
}

const slim = api.slimProgress();
if (slim.currentPackId !== "verbs100") {
  fail("slim currentPackId should stay verbs100, got " + slim.currentPackId);
}

console.log("PACK_SWITCH_REGRESSION_OK");
