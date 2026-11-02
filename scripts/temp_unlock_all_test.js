#!/usr/bin/env node
"use strict";

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

global.WM_TEMP_UNLOCK_ALL = true;

const api = bootApp({ mode: "student" });
const set = {
  id: "unlock-all",
  packId: "nouns100",
  title: "Nouns",
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
api.activateSet(set);

["intro", "A", "B", "C", "games", "test"].forEach(function (step) {
  if (api.studentLocked(set, step)) fail("studentLocked(" + step + ") should be false");
  if (!api.pathOpen(step)) fail("pathOpen(" + step + ") should be true");
});

console.log("TEMP_UNLOCK_ALL_OK");
