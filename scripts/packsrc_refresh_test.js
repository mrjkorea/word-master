#!/usr/bin/env node
"use strict";

require("../js/progress-merge.js");

const merge = global.MRJ_WM_merge;
const mergePack = global.MRJ_WM_mergePack;
const packEmpty = global.MRJ_WM_packProgressEmpty;
const { bootApp } = require("./load_app_for_test.js");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

if (!merge || !mergePack || !packEmpty) fail("merge helpers missing");

const local = {
  v: 1,
  sets: {
    toeic01: {
      title: "TOEIC 1–100",
      winsA: { airport: 2 },
      winsB: { airport: 2 },
      winsC: { airport: 2 },
      intro: { airport: true },
      testPassed: { airport: 85 },
      lastPlayedAt: 100,
    },
  },
};

const emptyServer = {
  v: 1,
  sets: {
    toeic01: {
      title: "TOEIC 1–100",
      winsA: {},
      winsB: {},
      winsC: {},
      intro: {},
      testPassed: {},
      lastPlayedAt: 200,
    },
  },
};

if (!packEmpty(emptyServer.sets.toeic01)) fail("empty server pack should be empty");
if (packEmpty(local.sets.toeic01)) fail("local pack should have progress");

const merged = merge(local, emptyServer);
const toeic = merged.sets.toeic01;
if (!toeic || toeic.testPassed.airport !== 85) {
  fail("empty server overwrote testPassed: " + JSON.stringify(toeic && toeic.testPassed));
}
if (!toeic.winsA || toeic.winsA.airport !== 2) fail("wins lost");

const dupA = { winsA: { w1: 2 }, testPassed: { w1: 80 }, lastPlayedAt: 50 };
const dupB = { winsA: {}, testPassed: {}, lastPlayedAt: 99 };
const slimMerged = mergePack(dupA, dupB);
if (!slimMerged.testPassed || slimMerged.testPassed.w1 !== 80) {
  fail("duplicate slim merge failed");
}

const api = bootApp();
const words = [{ id: "airport", en: "airport", ko: "공항" }];
const good = {
  id: "set_toeic01_a",
  packId: "toeic01",
  title: "TOEIC",
  words: words,
  winsA: { airport: 2 },
  winsB: { airport: 2 },
  winsC: { airport: 2 },
  intro: { airport: true },
  meetLock: ["airport"],
  testPassed: { airport: 85 },
  lastPlayedAt: 100,
  externalPackSrc: "https://mrjkorea.github.io/word-master-toeic/packs/toeic01.json",
};
api.activateSet(good);

const emptyDup = {
  id: "set_toeic01_b",
  packId: "toeic01",
  title: "TOEIC",
  words: words,
  winsA: {},
  winsB: {},
  winsC: {},
  intro: {},
  testPassed: {},
  lastPlayedAt: 300,
};
api.activateSet(emptyDup);
api.dedupeSetsByPackId();
const after = api.findSetByPackId("toeic01");
if (!after || !after.testPassed || after.testPassed.airport !== 85) {
  fail("dedupe lost testPassed");
}
if (!after.externalPackSrc) fail("dedupe should keep externalPackSrc from sibling");

api.mergeRemoteProgress(emptyServer);
const afterRemote = api.findSetByPackId("toeic01");
if (!afterRemote || !afterRemote.testPassed || afterRemote.testPassed.airport !== 85) {
  fail("mergeRemoteProgress empty server wiped progress");
}

api.applyRemote(emptyServer);
const afterApply = api.findSetByPackId("toeic01");
if (!afterApply || !afterApply.testPassed || afterApply.testPassed.airport !== 85) {
  fail("applyRemote empty server wiped progress");
}

const slim = api.slimProgress();
if (!slim.sets.toeic01 || slim.sets.toeic01.testPassed.airport !== 85) {
  fail("slimProgress after refresh scenario");
}

console.log("PACKSRC_REFRESH_OK");
process.exit(0);
