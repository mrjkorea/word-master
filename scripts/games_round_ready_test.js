#!/usr/bin/env node
"use strict";

const { bootApp } = require("./load_app_for_test");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

function words(ids) {
  return ids.map(function (id) { return { id: id, en: id, ko: id }; });
}

function finished(ids, extra) {
  const set = {
    id: "round-ready",
    title: "Round",
    packId: "nouns100",
    words: words(["w1", "w2", "w3", "w4"]),
    meetLock: ids.slice(),
    intro: {},
    tapmapKey: "old-key",
    winsA: {},
    winsB: {},
    winsC: {},
  };
  ids.forEach(function (id) {
    set.intro[id] = true;
    set.winsA[id] = 2;
    set.winsB[id] = 2;
    set.winsC[id] = 2;
  });
  if (extra) Object.keys(extra).forEach(function (k) { set[k] = extra[k]; });
  return set;
}

const api = bootApp({ mode: "student" });
const done = finished(["w1", "w2"]);
api.activateSet(done);
if (!api.roundReadyForGame(api.currentSet())) fail("finished round was not recognized");
if (!api.pathOpen("games")) fail("finished round did not open games");
if (api.studentLocked(api.currentSet(), "games")) fail("finished round still locked the games button");
const lockBefore = api.currentSet().meetLock.join(",");
api.startTapmap();
if (api.currentSet().meetLock.join(",") !== lockBefore) {
  fail("the jump replaced a finished round with " + api.currentSet().meetLock.join(","));
}

const fresh = finished(["w1", "w2"], {
  intro: { w1: true },
  winsA: {},
  winsB: {},
  winsC: {},
  tapmapKey: "old-key",
});
api.activateSet(fresh);
if (api.roundReadyForGame(api.currentSet())) fail("an unfinished round opened games");
if (api.pathOpen("games")) fail("an unfinished round passed the games gate");

const lostLock = {
  id: "round-ready",
  title: "Round",
  packId: "nouns100",
  words: words(["w1", "w2", "w3", "w4", "w5"]),
  meetLock: [],
  intro: {},
  tapmapKey: "",
  winsA: {},
  winsB: {},
  winsC: {},
};
["w1", "w2", "w3", "w4", "w5"].forEach(function (id) {
  lostLock.intro[id] = true;
  lostLock.winsA[id] = 2;
  lostLock.winsB[id] = 2;
  lostLock.winsC[id] = 2;
});
api.activateSet(lostLock);
api.setStudySize(5);
if (!api.roundReadyForGame(api.currentSet())) fail("a finished slice with no lock was ignored");
if (!api.pathOpen("games")) fail("a finished slice with no lock did not open games");

console.log("GAMES_ROUND_READY_OK");
