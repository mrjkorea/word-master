#!/usr/bin/env node
"use strict";

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

const trimmed = ps.trimProgress(withScores);
if (trimmed.scoreRows) fail("scoreRows should be dropped");
if (!trimmed.sets || !trimmed.sets.nouns100) fail("pack data should remain");
if (trimmed.sets.nouns100.winsB) fail("empty winsB should be trimmed");

const parts = ps.packParts(withScores);
if (!parts.length || parts[0].program !== "word-master") {
  fail("expected single word-master part");
}

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

const big = { v: 1, currentPackId: "nouns100", sets: hugeSets };
const split = ps.packParts(big, { forceSplit: true });
if (split.length < 3) fail("expected shell + shards, got " + split.length);
if (split[0].program !== "word-master") fail("first part should be shell");
if (!ps.isShardProgram(split[1].program)) fail("shard program format");

const merged = ps.mergeLoadedParts(split[0].progress_json, split.slice(1));
const obj = JSON.parse(merged);
if (!obj.sets || Object.keys(obj.sets).length < 2) {
  fail("merge should restore packs");
}
if (obj.packShardIds) fail("packShardIds should be stripped after merge");

console.log("WM_PACK_SAVE_OK");
