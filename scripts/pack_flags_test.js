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

/* Jay's full field set, as Middle School Tests sends it. */
const full = PackFlags.read({
  noPictures: true,
  startAt: "dictation",
  steps: ["dictation", "writing", "test"],
  skipSteps: ["meet", "learn", "match"],
  uiLang: "ko",
  langs: ["en", "ko"],
});
if (full.allow.join(",") !== "B,C,test") fail("steps should map to B,C,test, got " + full.allow.join(","));
if (full.skip.join(",") !== "intro,A,games") fail("skipSteps should map to intro,A,games, got " + full.skip.join(","));
if (full.langs.join(",") !== "en,ko") fail("langs not read");
if (!PackFlags.langLocked(full)) fail("langs en+ko must lock the picker");
if (!PackFlags.langAllowed(full, "ko")) fail("ko must be allowed");
if (PackFlags.langAllowed(full, "ja")) fail("ja must not be allowed");
if (PackFlags.language(full) !== "ko") fail("language should be ko");
["intro", "A", "games"].forEach(function (step) {
  if (!PackFlags.skips(full, step)) fail("skipSteps/steps must skip " + step);
});
["B", "C", "test"].forEach(function (step) {
  if (PackFlags.skips(full, step)) fail("jay field set must keep " + step);
});
if (PackFlags.firstStep(full) !== "B") fail("first step should be Dictation");

/* A steps list alone, with no startAt, still hides every other step. */
const allowOnly = PackFlags.read({ steps: ["writing", "test"] });
if (!PackFlags.skips(allowOnly, "intro")) fail("steps list must hide Meet");
if (!PackFlags.skips(allowOnly, "B")) fail("steps list must hide Dictation when it is not listed");
if (PackFlags.skips(allowOnly, "C")) fail("steps list must keep Write");
if (PackFlags.firstStep(allowOnly) !== "C") fail("first step should be the first listed step");
if (!PackFlags.skips(allowOnly, "games")) fail("steps list without games must hide games");

const skipOnly = PackFlags.read({ skipSteps: ["meet", "match"] });
if (!PackFlags.skips(skipOnly, "intro")) fail("skipSteps meet must skip Meet");
if (!PackFlags.skips(skipOnly, "games")) fail("skipSteps match must skip games");
if (PackFlags.skips(skipOnly, "B")) fail("skipSteps must not touch Dictation");
if (PackFlags.langLocked(skipOnly)) fail("no language field must keep the picker");

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
    steps: ["dictation", "writing", "test"],
    skipSteps: ["meet", "learn", "match"],
    uiLang: "ko",
    langs: ["en", "ko"],
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
  if (!api.packFlagsOf(set).allow.length) fail("steps list was not kept on the set");

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
