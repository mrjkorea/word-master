#!/usr/bin/env node
"use strict";

const { bootApp } = require("./load_app_for_test");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

const api = bootApp({ mode: "student" });
const toeic = {
  id: "set_toeic01",
  title: "TOEIC 1-100",
  packId: "toeic01",
  externalPackSrc: "https://mrjkorea.github.io/word-master-toeic/packs/toeic01.json",
  words: [{ id: "mister", en: "mister", ko: "미스터" }],
  intro: {},
  meetLock: ["time"],
  winsA: {},
  winsB: {},
  winsC: {},
};
api.activateSet(toeic);
const base = api.packBase();
if (base.indexOf("word-master-toeic/packs/toeic01") === -1) {
  fail("saved TOEIC pack still uses the wrong media folder: " + base);
}
if (base.indexOf("/word-master/packs/toeic01") !== -1) {
  fail("TOEIC media still points at the Word Master site");
}

const noun = {
  id: "set_nouns400",
  title: "A2 Nouns 301-400",
  packId: "nouns400",
  words: [{ id: "region", en: "region", ko: "지역" }],
  intro: {},
  meetLock: ["time", "year"],
  winsA: {},
  winsB: {},
  winsC: {},
};
api.activateSet(noun);
api.renderPackStanding(api.currentSet());
if (api.currentSet().meetLock.length) {
  fail("a noun pack kept a lock from another pack");
}
if (api.packBase().indexOf("packs/nouns400") === -1) {
  fail("noun media folder " + api.packBase());
}

const empty = {
  id: "set_empty",
  title: "Empty",
  packId: "nouns500",
  words: [],
  intro: {},
  meetLock: [],
  winsA: {},
  winsB: {},
  winsC: {},
};
api.activateSet(empty);
const data = api.renderPackStanding(api.currentSet());
if (!data || data.nextText.indexOf("did not load") === -1) {
  fail("an empty pack still says finished: " + (data && data.nextText));
}

console.log("PACK_MEDIA_OK");
