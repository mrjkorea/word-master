#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const MeetLock = require("../js/meet-lock.js");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

const words = [];
for (let i = 1; i <= 20; i++) words.push({ id: "w" + i, en: "w" + i });
const intro = {};
const winsA = {};
const winsB = {};
const winsC = {};
const lock = MeetLock.batchIds(words, intro, winsA, winsB, winsC, 10, 2);
if (lock.join(",") !== "w1,w2,w3,w4,w5,w6,w7,w8,w9,w10") {
  fail("new lock must be the first 10, got " + lock.join(","));
}

for (let i = 1; i <= 3; i++) {
  const id = "w" + i;
  intro[id] = true;
  winsA[id] = 2;
  winsB[id] = 2;
  winsC[id] = 2;
}
const slid = MeetLock.batchIds(words, intro, winsA, winsB, winsC, 10, 2);
if (slid.indexOf("w11") === -1) fail("unlocked slice should slide to w11; test setup is wrong");

const held = MeetLock.wordsForLock(words, lock).map(function (w) { return w.id; });
if (held.join(",") !== lock.join(",")) fail("locked list changed: " + held.join(","));
if (held.indexOf("w11") !== -1) fail("w11 leaked into the locked Meet list");
if (MeetLock.outsideLock(held, lock).length) fail("dictation queue left the Meet lock");
if (!MeetLock.outsideLock(held.concat(["w11"]), lock).length) {
  fail("a game list with w11 must be caught");
}

const root = path.join(__dirname, "..");
const checks = [
  "games/spellfire/src/engine.js",
  "games/leap-frog/assets/index-DRRBcrLV.js",
  "games/snow-jump/assets/index-DA78ZsQf.js",
];
const banned = ["packs/nouns100.json", "packs/words.txt", "animals.json", "starter-en.json"];
checks.forEach(function (rel) {
  const text = fs.readFileSync(path.join(root, rel), "utf8");
  banned.forEach(function (needle) {
    if (text.indexOf(needle) !== -1) fail(rel + " still loads " + needle);
  });
});

const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
if (index.indexOf("js/meet-lock.js") === -1) fail("index.html does not load meet-lock.js");
if (index.indexOf("meet-lock.js") > index.indexOf("js/app.js")) {
  fail("meet-lock.js must load before app.js");
}

console.log("MEET_LOCK_OK verbs-round stays inside Meet the Words");
process.exit(0);
