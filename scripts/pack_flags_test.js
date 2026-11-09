#!/usr/bin/env node
/**
 * Pack flags: noPictures / startAt / uiLang / kind from the pack JSON.
 * Jay's rule for the middle-school test packs: English and Korean only, no
 * pictures, start at Dictation. Sentence packs: no Match game.
 */
"use strict";

const { bootApp } = require("./load_app_for_test.js");
const PackFlags = require("../js/pack-flags.js");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

/* ---- unit: the flags reader ---- */

const flagged = PackFlags.read({
  noPictures: true,
  startAt: "dictation",
  uiLang: "ko",
  kind: "sentence",
});
if (!flagged.noPictures) fail("noPictures not read");
if (flagged.startAt !== "B") fail("startAt dictation should map to B, got " + flagged.startAt);
if (flagged.uiLang !== "ko") fail("uiLang not read");
if (!flagged.sentence) fail("kind sentence not read");
if (!PackFlags.any(flagged)) fail("any() should see flags");

const plain = PackFlags.read({ id: "nouns100", words: [] });
if (PackFlags.any(plain)) fail("a pack without flags must stay plain");
["intro", "A", "B", "C", "games", "test"].forEach(function (step) {
  if (PackFlags.skips(plain, step)) fail("plain pack must not skip " + step);
});
if (PackFlags.firstStep(plain) !== "intro") fail("plain pack starts at Meet");

["intro", "A"].forEach(function (step) {
  if (!PackFlags.skips(flagged, step)) fail("startAt dictation must skip " + step);
});
["B", "C"].forEach(function (step) {
  if (PackFlags.skips(flagged, step)) fail("startAt dictation must keep " + step);
});
if (!PackFlags.skips(flagged, "games")) fail("sentence pack must skip games");
if (PackFlags.firstStep(flagged) !== "B") fail("flagged pack starts at Dictation");

const picturesOnly = PackFlags.read({ noPictures: true });
if (!PackFlags.skips(picturesOnly, "intro")) fail("noPictures must skip the picture step");
if (PackFlags.skips(picturesOnly, "A")) fail("noPictures alone must not skip Learn");

/* ---- integration: the app itself ---- */

const WORDS = [
  { id: "j2neung_u07_reading01_01", en: "Hello, I am Jimin.", ko: "안녕하세요, 저는 지민입니다." },
  { id: "j2neung_u07_reading01_02", en: "Have you ever shared a bike?", ko: "자전거를 나눠 본 적이 있나요?" },
];

const PACKS = {
  "https://mrjkorea.github.io/bekbal-unit-practice/packs/j2neung_u07_reading01.json": {
    id: "j2neung_u07_reading01",
    title: "중2능률 U07 · Reading",
    kind: "sentence",
    noPictures: true,
    startAt: "dictation",
    uiLang: "ko",
    words: WORDS,
  },
  "https://mrjkorea.github.io/news-words/packs/news-test.json": {
    id: "news-test",
    title: "News words",
    words: WORDS,
  },
};

const api = bootApp({
  mode: "student",
  beforeApp: function (g) {
    g.PackFlags = PackFlags;
    g.fetch = function (url) {
      const body = PACKS[url];
      if (!body) return Promise.reject(new Error("offline: " + url));
      return Promise.resolve({
        ok: true,
        json: function () { return Promise.resolve(JSON.parse(JSON.stringify(body))); },
      });
    };
  },
});

if (!api || typeof api.loadExternalPackFromSrc !== "function") fail("app did not expose loadExternalPackFromSrc");

const SRC = "https://mrjkorea.github.io/bekbal-unit-practice/packs/j2neung_u07_reading01.json";
const PLAIN_SRC = "https://mrjkorea.github.io/news-words/packs/news-test.json";

(async function () {
  const ok = await api.loadExternalPackFromSrc(SRC);
  if (!ok) fail("flagged pack did not load");
  const set = api.currentSet();
  if (!set) fail("no current set after load");
  if (!api.packFlagsOf(set).sentence) fail("flags not attached to the set");

  if (!api.packStepSkipped(set, "intro")) fail("picture/Meet step still active for a flagged pack");
  if (!api.packStepSkipped(set, "A")) fail("Learn still gates a Dictation start");
  if (api.packStepSkipped(set, "B")) fail("Dictation itself must not be skipped");
  if (!api.packStepSkipped(set, "games")) fail("games still in a sentence pack");
  if (api.packFirstStep(set) !== "B") fail("first step is not Dictation");

  if (api.tapmapDone(set) !== true) fail("picture step is still pending");
  if (api.studentLocked(set, "B")) fail("Dictation is locked: the student cannot start");
  if (api.stageNavAllowed(set, "B") !== true) fail("path strip blocks Dictation");
  if (api.studentLocked(set, "games")) fail("games locked");
  if (!api.studentLocked(set, "test")) fail("test must still wait for Dictation and Write");
  if (api.studentLocked(set, "intro")) fail("Meet should be open, not locked");

  const state = api.getState();
  if (state.locale !== "ko") fail("uiLang ko was not applied, locale is " + state.locale);

  const plainOk = await api.loadExternalPackFromSrc(PLAIN_SRC);
  if (!plainOk) fail("plain pack did not load");
  const plainSet = api.currentSet();
  ["intro", "A", "B", "C", "games", "test"].forEach(function (step) {
    if (api.packStepSkipped(plainSet, step)) fail("plain pack now skips " + step);
  });
  if (api.packFirstStep(plainSet) !== "intro") fail("plain pack no longer starts at Meet");
  if (api.getState().locale !== "en") fail("locale did not come back to en, it is " + api.getState().locale);

  console.log("PACK_FLAGS_OK");
  process.exit(0);
})().catch(function (e) {
  fail(e && e.stack ? e.stack : String(e));
});
