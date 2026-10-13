#!/usr/bin/env node
"use strict";

require("../js/progress-merge.js");
require("../js/wm-pack-save.js");

const ps = global.MRJ_WM_packSave;

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

if (!ps) fail("MRJ_WM_packSave missing");

const withScores = {
  v: 1,
  scoreRows: [{ at: 1, pack: "nouns100", kind: "test", score: 8, total: 10 }],
  currentPackId: "nouns100",
  sets: {
    nouns100: {
      title: "Nouns",
      winsA: { time: 2 },
      intro: { time: true },
      meetLock: ["time"],
      winsB: {},
      winsC: {},
      lastPlayedAt: 10,
    },
  },
};

const trimmedNoScores = ps.trimProgress(withScores, false, null);
if (trimmedNoScores.scoreRows) fail("trim without scoreRows arg should omit scoreRows");

const single = ps.packParts(withScores);
if (!single.length || single[0].program !== "word-master") {
  fail("expected single word-master part");
}
const singleObj = JSON.parse(single[0].progress_json);
if (!singleObj.scoreRows || singleObj.scoreRows.length !== 1) {
  fail("single blob must keep scoreRows");
}

const merged = ps.mergedScoreRowsForSave(
  { scoreRows: [{ at: 2, pack: "verbs100", kind: "test", score: 1, total: 1 }] },
  [{ at: 1, pack: "nouns100", kind: "test", score: 8, total: 10 }]
);
if (merged.length !== 2) fail("merge server + local scoreRows");

const hugeSets = {};
for (let i = 0; i < 80; i++) {
  const pid = "nouns" + (100 + i);
  const intro = {};
  const winsA = {};
  for (let w = 0; w < 120; w++) {
    const id = "w" + w;
    intro[id] = true;
    winsA[id] = 2;
  }
  hugeSets[pid] = {
    title: pid,
    intro: intro,
    winsA: winsA,
    winsB: winsA,
    winsC: winsA,
    meetLock: Object.keys(intro),
    lastPlayedAt: i + 1,
  };
}

const big = {
  v: 1,
  currentPackId: "nouns100",
  scoreRows: [{ at: 1, pack: "nouns100", kind: "test", score: 5, total: 10 }],
  sets: hugeSets,
};
const split = ps.packParts(big, { forceSplit: true });
if (split.length < 3) fail("expected shards + shell, got " + split.length);
const last = split[split.length - 1];
if (last.program !== "word-master") fail("shell must be last part");
if (split[0].program === "word-master") fail("first part must not be shell");
const scoresPart = split.find(function (p) { return p.program === ps.SCORES_PROGRAM; });
if (!scoresPart) fail("split must include scores shard");
const scoresObj = JSON.parse(scoresPart.progress_json);
if (!scoresObj.scoreRows || !scoresObj.scoreRows.length) fail("scores shard empty");

const shellObj = JSON.parse(last.progress_json);
if (!shellObj.hasScoresShard) fail("shell should flag scores shard");
if (shellObj.scoreRows) fail("shell should not embed scoreRows when split");

const packShards = split.slice(0, -1).filter(function (p) {
  return ps.isShardProgram(p.program);
});
const mergedLoad = ps.mergeLoadedParts(last.progress_json, split.slice(0, -1));
const obj = JSON.parse(mergedLoad);
if (!obj.sets || Object.keys(obj.sets).length < 2) {
  fail("merge should restore packs");
}
if (!obj.scoreRows || !obj.scoreRows.length) fail("merge should restore scoreRows");
if (obj.packShardIds) fail("packShardIds should be stripped after merge");

const beaconOnly = ps.packParts(big, { forceSplit: true, allowSplit: false });
if (beaconOnly.length !== 1 || beaconOnly[0].program !== "word-master") {
  fail("beacon save must stay one part");
}

console.log("WM_PACK_SAVE_OK");
