#!/usr/bin/env node
"use strict";

/**
 * Metrics fingerprint (Oct 13–27 audit): finished game + intro flags for meetLock,
 * pathHeld[round] missing intro, stale tapmapKey — Test must unlock after heal/load.
 */

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

function buildFingerprint(packId, roundIds, staleTapmapKey) {
  const roundKey = roundIds.join(",");
  const intro = {};
  const winsA = {};
  const winsB = {};
  const winsC = {};
  roundIds.forEach(function (id) {
    intro[id] = true;
    winsA[id] = 2;
    winsB[id] = 2;
    winsC[id] = 2;
  });
  return {
    packId: packId,
    roundKey: roundKey,
    cloud: {
      title: packId,
      meetLock: roundIds.slice(),
      intro: intro,
      winsA: winsA,
      winsB: winsB,
      winsC: winsC,
      tapmapKey: staleTapmapKey,
      pathHeld: { [roundKey]: { A: true, B: true, C: true, games: true } },
      roundGames: { [roundKey]: { done: true, game: "snowjump", at: 1 } },
      testPassed: {},
      lastPlayedAt: Date.now(),
    },
    words: wordsOf(Math.max(100, roundIds.length + 30)),
  };
}

const cases = [
  { label: "soohyeon verbs100", fixture: buildFingerprint("verbs100", ["w46", "w47", "w48", "w49", "w50"], "w1,w2,w3,w4,w5") },
  { label: "mingeon nouns500", fixture: buildFingerprint("nouns500", ["w11", "w12", "w13", "w14", "w15"], "w6,w7,w8,w9,w10") },
  { label: "hyowon nouns500", fixture: buildFingerprint("nouns500", ["w21", "w22", "w23", "w24", "w25"], "w1,w2,w3,w4,w5") },
  { label: "hojun adjectives200", fixture: buildFingerprint("adjectives200", ["w31", "w32", "w33", "w34", "w35"], "w1,w2,w3,w4,w5") },
  { label: "seungyu nouns100 likely", fixture: buildFingerprint("nouns100", ["w6", "w7", "w8", "w9", "w10"], "w1,w2,w3,w4,w5") },
];

const api = bootApp({ mode: "student", beforeApp: i18nStub });

cases.forEach(function (c) {
  const f = c.fixture;
  api.applyRemote({
    v: 1,
    currentPackId: f.packId,
    sets: {},
  });
  api.applyRemote({
    v: 1,
    currentPackId: f.packId,
    sets: { [f.packId]: f.cloud },
  });
  let set = api.currentSet();
  if (!set || set.packId !== f.packId) {
    const st = api.getState();
    Object.keys(st.sets || {}).forEach(function (sid) {
      const s = st.sets[sid];
      if (s && s.packId === f.packId) set = s;
    });
  }
  if (!set) fail(c.label + ": no set for pack");
  set.words = f.words;
  api.healPathProgress(set);
  const held = set.pathHeld && set.pathHeld[f.roundKey];
  if (!held || !held.intro) {
    fail(c.label + ": pathHeld.intro not healed " + JSON.stringify(held));
  }
  if (api.studentLocked(set, "test")) {
    fail(c.label + ": Test still locked after heal");
  }
  if (!api.pathOpen("test")) {
    fail(c.label + ": pathOpen(test) failed");
  }
  if (set.tapmapKey !== f.roundKey) {
    fail(c.label + ": tapmapKey not healed after test open " + set.tapmapKey);
  }
});

console.log("METRICS_PATH_FINGERPRINT_OK");
