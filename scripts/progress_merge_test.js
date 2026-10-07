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

console.log("PROGRESS_MERGE_OK");
process.exit(0);
