"use strict";

require("../js/progress-merge.js");

const merge = global.MRJ_WM_merge;
if (!merge) {
  console.error("MRJ_WM_merge missing");
  process.exit(1);
}

const local = {
  v: 1,
  sets: {
    nouns100: {
      winsA: { w1: 1, w2: 2 },
      winsB: {},
      winsC: {},
      intro: { w1: true },
      meetLock: ["w1", "w2"],
      testPassed: { w1: 70 },
      lastPlayedAt: 100,
    },
  },
};

const remote = {
  v: 1,
  sets: {
    nouns100: {
      winsA: { w1: 2, w3: 1 },
      winsB: { w2: 2 },
      winsC: {},
      intro: { w3: true },
      meetLock: ["w2", "w3"],
      testPassed: { w1: 90, w2: 80 },
      lastPlayedAt: 200,
    },
  },
};

const out = merge(local, remote);
const pack = out.sets.nouns100;
if (pack.winsA.w1 !== 2) {
  console.error("winsA merge failed", pack.winsA);
  process.exit(1);
}
if (pack.winsA.w3 !== 1) {
  console.error("winsA w3 missing", pack.winsA);
  process.exit(1);
}
if (!pack.intro.w1 || !pack.intro.w3) {
  console.error("intro union failed", pack.intro);
  process.exit(1);
}
if (pack.testPassed.w1 !== 90 || pack.testPassed.w2 !== 80) {
  console.error("testPassed max failed", pack.testPassed);
  process.exit(1);
}
if (pack.meetLock.length !== 2 || pack.meetLock[0] !== "w2" || pack.meetLock[1] !== "w3") {
  console.error("meetLock should follow newer remote lock", pack.meetLock);
  process.exit(1);
}

const freshPackPick = merge(
  {
    v: 1,
    currentPackId: "verbs100",
    sets: {
      nouns100: {
        winsA: { time: 2 },
        intro: { time: true },
        meetLock: ["time"],
        lastPlayedAt: 5000,
      },
      verbs100: {
        winsA: {},
        winsB: {},
        winsC: {},
        intro: {},
        meetLock: [],
        lastPlayedAt: 9000,
      },
    },
  },
  {
    v: 1,
    currentPackId: "nouns100",
    sets: {
      nouns100: {
        winsA: { time: 2 },
        intro: { time: true },
        meetLock: ["time"],
        lastPlayedAt: 5000,
      },
    },
  }
);
if (freshPackPick.currentPackId !== "verbs100") {
  console.error("fresh pack open should stay on verbs100", freshPackPick.currentPackId);
  process.exit(1);
}

const emptyRemote = {
  v: 1,
  sets: {
    nouns100: { winsA: {}, testPassed: {}, lastPlayedAt: 999 },
  },
};
const richLocal = {
  v: 1,
  sets: {
    nouns100: { winsA: { w1: 2 }, testPassed: { w1: 80 }, lastPlayedAt: 1 },
  },
};
const guarded = merge(richLocal, emptyRemote);
if (!guarded.sets.nouns100 || guarded.sets.nouns100.testPassed.w1 !== 80) {
  console.error("empty remote guard failed", guarded.sets.nouns100);
  process.exit(1);
}

const lockLocal = {
  v: 1,
  studySize: 5,
  sets: {
    nouns100: {
      winsA: {},
      winsB: {},
      winsC: {},
      intro: {},
      meetLock: ["a", "b", "c", "d", "e"],
      startNumber: 11,
      lastPlayedAt: 300,
    },
  },
};
const lockRemote = {
  v: 1,
  studySize: 10,
  sets: {
    nouns100: {
      winsA: {},
      winsB: {},
      winsC: {},
      intro: {},
      meetLock: ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8", "w9", "w10"],
      startNumber: 1,
      lastPlayedAt: 200,
    },
  },
};
const lockOut = merge(lockLocal, lockRemote);
const lockPack = lockOut.sets.nouns100;
if (lockOut.studySize !== 5) {
  console.error("studySize should follow newer local", lockOut.studySize);
  process.exit(1);
}
if (lockPack.startNumber !== 11) {
  console.error("startNumber should follow newer local", lockPack.startNumber);
  process.exit(1);
}
if (
  lockPack.meetLock.length !== 5 ||
  lockPack.meetLock.join(",") !== "a,b,c,d,e"
) {
  console.error("meetLock should be newer local five ids", lockPack.meetLock);
  process.exit(1);
}

const poorer = global.MRJ_WM_progressIsStrictlyPoorer;
const countPacks = global.MRJ_WM_countNonEmptyPacks;
if (!poorer || !countPacks) {
  console.error("richness helpers missing");
  process.exit(1);
}
if (!poorer({ v: 1, sets: {} }, local)) {
  console.error("empty should be poorer than local");
  process.exit(1);
}
if (countPacks(out) < 1) {
  console.error("merged should have packs");
  process.exit(1);
}

const mergeScoreRows = global.MRJ_WM_mergeScoreRows;
if (!mergeScoreRows) {
  console.error("MRJ_WM_mergeScoreRows missing");
  process.exit(1);
}

function scoreRow(at, pack) {
  return {
    at: at,
    pack: pack || "nouns100",
    kind: "test_easy",
    activity: "Easy test",
    score: 8,
    total: 10,
  };
}

const localRows = [];
const remoteRows = [];
for (let i = 1; i <= 500; i += 1) localRows.push(scoreRow(i, "nouns100"));
for (let j = 501; j <= 1000; j += 1) remoteRows.push(scoreRow(j, "verbs100"));

const rowMerged = merge({ v: 1, sets: {}, scoreRows: localRows }, { v: 1, sets: {}, scoreRows: remoteRows });
if (!rowMerged.scoreRows || rowMerged.scoreRows.length !== 1000) {
  console.error("scoreRows union failed", rowMerged.scoreRows ? rowMerged.scoreRows.length : 0);
  process.exit(1);
}

const dupRemote = localRows.slice(250, 260).concat(remoteRows);
const unionMerged = mergeScoreRows(localRows, dupRemote);
if (unionMerged.length !== 1000) {
  console.error("mergeScoreRows should not drop rows on overlap", unionMerged.length);
  process.exit(1);
}

const snapshotRows = mergeScoreRows(rowMerged.scoreRows, []);
if (snapshotRows.length !== 1000) {
  console.error("snapshot merge should keep all score rows", snapshotRows.length);
  process.exit(1);
}

const { bootApp } = require("./load_app_for_test");
const api = bootApp();
api.applyRemote(rowMerged);
const snap = api.slimProgress();
if (!snap.scoreRows || snap.scoreRows.length !== 1000) {
  console.error("slimProgress snapshot dropped score rows", snap.scoreRows ? snap.scoreRows.length : 0);
  process.exit(1);
}

const voiceOut = merge(
  { v: 1, voice: "grandma", voiceAt: 500, sets: {} },
  { v: 1, voice: "us_m", voiceAt: 100, sets: {} }
);
if (voiceOut.voice !== "grandma" || voiceOut.voiceAt !== 500) {
  console.error("voiceAt merge failed", voiceOut);
  process.exit(1);
}

const localeKoLocal = merge(
  {
    v: 1,
    locale: "ko",
    localeAt: 9000,
    sets: { nouns100: { winsA: {}, lastPlayedAt: 100 } },
  },
  {
    v: 1,
    locale: "en",
    localeAt: 100,
    sets: { nouns100: { winsA: { w1: 2 }, lastPlayedAt: 5000 } },
  }
);
if (localeKoLocal.locale !== "ko" || localeKoLocal.localeAt !== 9000) {
  console.error("localeAt should keep newer local ko", localeKoLocal);
  process.exit(1);
}

const localeTiedLegacy = merge(
  { v: 1, locale: "ko", sets: { nouns100: { winsA: {}, lastPlayedAt: 5000 } } },
  { v: 1, locale: "en", sets: { nouns100: { winsA: {}, lastPlayedAt: 5000 } } }
);
if (localeTiedLegacy.locale !== "ko") {
  console.error("legacy tie should prefer non-en local", localeTiedLegacy);
  process.exit(1);
}

const localeRemoteNewer = merge(
  { v: 1, locale: "en", localeAt: 100, sets: {} },
  { v: 1, locale: "ko", localeAt: 500, sets: {} }
);
if (localeRemoteNewer.locale !== "ko" || localeRemoteNewer.localeAt !== 500) {
  console.error("localeAt remote newer should win", localeRemoteNewer);
  process.exit(1);
}

const allLocal = {
  v: 1,
  studySize: 0,
  sets: { nouns100: { winsA: {}, lastPlayedAt: 400 } },
};
const allRemote = {
  v: 1,
  studySize: 10,
  sets: { nouns100: { winsA: {}, lastPlayedAt: 100 } },
};
const allOut = merge(allLocal, allRemote);
if (allOut.studySize !== 0) {
  console.error("studySize 0 should not snap back", allOut.studySize);
  process.exit(1);
}

const mergePack = global.MRJ_WM_mergePack;
const heldMerge = mergePack(
  {
    meetLock: ["w1", "w2"],
    intro: { w1: true, w2: true },
    pathHeld: { "w1,w2": { intro: true } },
    lastPlayedAt: 10,
  },
  {
    meetLock: ["w1", "w2"],
    intro: { w1: true, w2: true },
    pathHeld: { "w1,w2": { A: true, B: true, C: true, games: true } },
    roundGames: { "w1,w2": { done: true, game: "snowjump", at: 20 } },
    lastPlayedAt: 5,
  }
);
const latch = heldMerge.pathHeld && heldMerge.pathHeld["w1,w2"];
if (!latch || !latch.intro || !latch.games) {
  console.error("pathHeld deep merge failed", heldMerge.pathHeld);
  process.exit(1);
}
if (!heldMerge.roundGames || !heldMerge.roundGames["w1,w2"] || !heldMerge.roundGames["w1,w2"].done) {
  console.error("roundGames merge failed", heldMerge.roundGames);
  process.exit(1);
}
if (heldMerge.tapmapKey !== "w1,w2") {
  console.error("tapmap heal failed", heldMerge.tapmapKey);
  process.exit(1);
}

console.log("PROGRESS_MERGE_OK");
process.exit(0);
