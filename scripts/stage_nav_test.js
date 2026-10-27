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

function i18nStub(g) {
  g.WordFactoryI18n = {
    setLocale: function (x) { return x || "en"; },
    getLocale: function () { return "en"; },
    fillSelect: function () {},
    applyDom: function () {},
    partName: function (m) { return m; },
    partHint: function () { return ""; },
    t: function (k) { return k; },
  };
}

global.MRJ_AUTH = { student: function () { return "stage-nav-tester"; } };
const api = bootApp({ mode: "student", beforeApp: i18nStub });
const ids = ["w1", "w2"];
const set = {
  id: "nav-set",
  packId: "nouns100",
  title: "Nouns",
  words: wordsOf(10),
  meetLock: ids.slice(),
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  tapmapKey: "w1,w2",
  roundGames: {},
  pathHeld: {},
};
ids.forEach(function (id) {
  set.intro[id] = true;
  set.winsA[id] = 2;
  set.winsB[id] = 2;
  set.winsC[id] = 2;
});
set.roundGames["w1,w2"] = { done: true, game: "snowjump", at: 1 };
set.pathHeld["w1,w2"] = { intro: true, A: true, B: true, C: true, games: true };

api.activateSet(set);
if (api.stageNavLocked(set, "test")) fail("test should be open after game");
if (api.stageNavLocked(set, "intro")) fail("finished meet should allow revisit");
if (api.stageNavLocked(set, "A")) fail("finished learn should allow revisit");
if (api.stageNavLocked(set, "B")) fail("finished dictation should allow revisit");

const fresh = {
  id: "nav-fresh",
  packId: "nouns100",
  title: "Fresh",
  words: wordsOf(10),
  meetLock: ids.slice(),
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  tapmapKey: "",
  roundGames: {},
  pathHeld: {},
};
api.activateSet(fresh);
if (!api.stageNavLocked(fresh, "test")) fail("fresh round should lock test");
if (!api.stageNavLocked(fresh, "B")) fail("fresh round should lock dictation");

api.activateSet(set);
api.onPathJumpClick("intro");
if (api.screenName() !== "intro") fail("jump to Meet should open intro screen");

api.onPathJumpClick("A");
if (api.screenName() !== "learn") fail("jump back to Learn should open learn");

global.confirm = function () { return true; };
api.startEasy();
if (!api.testSessionActive()) fail("easy test should be in progress");
const beforeRows = (api.getState().scoreRows || []).length;
api.onPathJumpClick("games");
const afterRows = (api.getState().scoreRows || []).length;
if (afterRows <= beforeRows) fail("leaving test early should append a score row");
if (api.screenName() !== "games") fail("should land on games after leaving test");

const idx = require("fs").readFileSync(require("path").join(__dirname, "..", "index.html"), "utf8");
if (idx.indexOf('id="path-stage-strip"') === -1) fail("path-stage-strip missing from index");

console.log("STAGE_NAV_OK");
