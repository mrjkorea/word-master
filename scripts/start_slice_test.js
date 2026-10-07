#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const StartSlice = require("../js/start-slice.js");
const { bootApp } = require("./load_app_for_test.js");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

function wordsOf(n) {
  const words = [];
  for (let i = 1; i <= n; i++) {
    let en = "word" + i;
    if (i === 10) en = "apple";
    if (i === 11) en = "bread";
    if (i === 12) en = "carrot";
    if (i === 13) en = "donut";
    if (i === 14) en = "egg";
    words.push({ id: "w" + i, en: en, ko: "ko" + i });
  }
  return words;
}

function expectIds(label, got, expect) {
  const line = got.join(",");
  if (line !== expect) fail(label + " " + line);
}

const words = wordsOf(100);
const ten = StartSlice.sliceFrom(words, 10, 5);
expectIds("word 10 + 5", ten.ids, "w10,w11,w12,w13,w14");
if (ten.startNumber !== 10 || ten.words.length !== 5) fail("slice 10 length");
if (ten.ids.indexOf("w15") !== -1) fail("word 10 + 5 included an extra word");

const mid = StartSlice.sliceFrom(words, 22, 5);
expectIds("word 22 + 5", mid.ids, "w22,w23,w24,w25,w26");
if (mid.words.length !== 5) fail("slice 22 length");

const tail = StartSlice.sliceFrom(words, 98, 5);
expectIds("word 98 + 5", tail.ids, "w98,w99,w100");
if (tail.words.length !== 3) fail("tail length " + tail.words.length);
if (tail.ids.indexOf("w1") !== -1 || tail.ids.indexOf("w97") !== -1) {
  fail("tail wrapped or pulled an earlier word");
}

const fresh = { intro: {}, winsA: {}, winsB: {}, winsC: {}, testPassed: {} };
StartSlice.markPassed(fresh, ["w10", "w11"], 79);
if (Object.keys(fresh.testPassed).length) fail("79 wrote testPassed");
if (StartSlice.isGreen({ id: "w10" }, fresh)) fail("79 painted green");

StartSlice.markPassed(fresh, ["w10", "w11", "w12", "w13", "w14"], 80);
["w10", "w11", "w12", "w13", "w14"].forEach(function (id) {
  if (fresh.testPassed[id] !== 80) fail("80 did not mark " + id);
  if (!StartSlice.isGreen({ id: id }, fresh)) fail("80 did not green " + id);
});
if (StartSlice.isGreen({ id: "w9" }, fresh)) fail("w9 greened");

StartSlice.markPassed(fresh, ["w10", "w11", "w12", "w13", "w14"], 70);
["w10", "w11", "w12", "w13", "w14"].forEach(function (id) {
  if (fresh.testPassed[id] !== 80) fail("70 removed or changed " + id);
  if (!StartSlice.isGreen({ id: id }, fresh)) fail("70 removed green " + id);
});

const learned = {
  intro: { w3: true },
  winsA: { w3: 2 },
  winsB: { w3: 2 },
  winsC: { w3: 2 },
  testPassed: {},
};
if (!StartSlice.isGreen({ id: "w3" }, learned)) fail("learn-complete should stay green");

const root = path.join(__dirname, "..");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
if (index.indexOf("js/start-slice.js") === -1) fail("index.html does not load start-slice.js");
if (index.indexOf("js/start-slice.js") > index.indexOf("js/app.js")) {
  fail("start-slice.js must load before app.js");
}
if (index.indexOf("Tap a number to start there.") === -1) fail("missing tap hint");
if (index.indexOf("css/app.css?v=20261007-allrows-2") === -1) fail("css cache");
if (index.indexOf("js/app.js?v=20261007-allrows-2") === -1) fail("app cache");
if (index.indexOf("js/start-slice.js?v=20260930-start") === -1) fail("start-slice cache");

const api = bootApp();
if (!api.chooseStart || !api.markPassed || !api.renderPackStanding) {
  fail("WM_TEST missing chooseStart, markPassed, or renderPackStanding");
}

const held = [];
for (let i = 1; i <= 10; i++) held.push("w" + i);
const set = {
  id: "set_start",
  packId: "nouns100",
  title: "Nouns 100",
  words: words,
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  meetLock: held.slice(),
  testPassed: {},
};
api.activateSet(set);
if (api.currentSet().meetLock.join(",") !== held.join(",")) fail("setup lock");
api.chooseStart(set, 22);
const chosen = api.currentSet().meetLock.join(",");
if (chosen !== "w22,w23,w24,w25,w26,w27,w28,w29,w30,w31") {
  fail("chooseStart lock " + chosen);
}
if (api.currentSet().startNumber !== 22) fail("startNumber " + api.currentSet().startNumber);
if (chosen.indexOf("w1") !== -1) fail("old lock survived the tap");
["w22", "w23"].forEach(function (id) {
  const wins = (api.currentSet().winsA[id] || 0) + (api.currentSet().winsB[id] || 0) + (api.currentSet().winsC[id] || 0);
  if (wins) fail("chooseStart faked wins");
});

api.startEasy();
let quiz = api.getQuiz();
if (quiz.wide) fail("chosen batch opened the wide test");
if (quiz.items.map(function (w) { return w.id; }).sort().join(",") !==
    ["w22", "w23", "w24", "w25", "w26", "w27", "w28", "w29", "w30", "w31"].sort().join(",")) {
  fail("easy test left the chosen slice");
}
quiz.score = 8;
quiz.mistakes = [];
api.finishQuiz();
["w22", "w23", "w24", "w25", "w26", "w27", "w28", "w29", "w30", "w31"].forEach(function (id) {
  if (api.currentSet().testPassed[id] !== 80) fail("finishQuiz did not mark " + id);
});

let data = api.renderPackStanding(api.currentSet());
["w22", "w31"].forEach(function (id) {
  const seat = data.seats.filter(function (s) { return s.id === id; })[0];
  if (!seat || seat.state !== "done doing") fail(id + " seat " + (seat && seat.state));
});
const before = data.seats.filter(function (s) { return s.id === "w21"; })[0];
if (!before || before.state !== "todo") fail("w21 " + (before && before.state));

api.markPassed(api.currentSet(), api.currentSet().meetLock.slice(), 70);
api.startEasy();
quiz = api.getQuiz();
quiz.score = 7;
quiz.mistakes = [{ id: "w22", en: "word22", ko: "ko22" }];
api.finishQuiz();
["w22", "w31"].forEach(function (id) {
  if (api.currentSet().testPassed[id] !== 80) fail("later 70 cleared " + id);
  if (!StartSlice.isGreen({ id: id }, api.currentSet())) fail("later 70 unpainted " + id);
  const wins = api.currentSet().winsA[id] || 0;
  if (wins >= 2) fail("fail path faked wins on " + id);
});
data = api.renderPackStanding(api.currentSet());
const still = data.seats.filter(function (s) { return s.id === "w22"; })[0];
if (!still || still.state.indexOf("done") === -1) fail("seat lost green after 70");

const passedKeys = Object.keys(api.currentSet().testPassed).sort().join(",");
api.startEasy(true);
quiz = api.getQuiz();
if (!quiz.wide || quiz.items.length !== 100) fail("wide test did not use the whole pack");
quiz.score = 100;
quiz.mistakes = [];
api.finishQuiz();
if (Object.keys(api.currentSet().testPassed).sort().join(",") !== passedKeys) {
  fail("wide test painted seats");
}

const five = {
  id: "set_five",
  packId: "nouns100",
  title: "Nouns 100",
  words: words,
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  meetLock: ["w10", "w11", "w12", "w13", "w14"],
  startNumber: 10,
  testPassed: { w10: 80, w11: 80, w12: 80, w13: 80, w14: 80 },
};
data = api.renderPackStanding(five);
if (data.sliceText !== "Starting at 10 · 5 words: apple · bread · carrot · donut · egg") {
  fail("slice line " + data.sliceText);
}
const seat10 = data.seats.filter(function (s) { return s.id === "w10"; })[0];
if (!seat10 || seat10.state !== "done doing") fail("w10 both " + (seat10 && seat10.state));
const host = document.querySelector("#stand-seats");
const node10 = host.children[9];
if (!node10 || node10.getAttribute("aria-label") !== "Start at word 10, apple") {
  fail("aria " + (node10 && node10.getAttribute("aria-label")));
}
if (node10.className.indexOf("done") === -1 || node10.className.indexOf("doing") === -1) {
  fail("dom class " + node10.className);
}
const nextLine = data.nextIds.join(",");
if (nextLine !== "w1,w2,w3,w4,w5,w6,w7,w8,w9,w15") fail("next skipped wrong " + nextLine);

if (typeof api.slimProgress === "function" && typeof api.applyRemote === "function") {
  api.activateSet(five);
  const slim = JSON.parse(JSON.stringify(api.slimProgress()));
  const pack = slim.sets.nouns100;
  if (!pack || pack.startNumber !== 10) fail("slim startNumber " + (pack && pack.startNumber));
  if (!pack.testPassed || pack.testPassed.w10 !== 80 || pack.testPassed.w14 !== 80) {
    fail("slim testPassed " + JSON.stringify(pack && pack.testPassed));
  }
  api.applyRemote(slim);
  const back = api.currentSet();
  if (!back || back.startNumber !== 10) fail("round-trip startNumber");
  if (!back.testPassed || back.testPassed.w10 !== 80 || back.testPassed.w14 !== 80) {
    fail("round-trip testPassed " + JSON.stringify(back && back.testPassed));
  }
}

console.log("START_SLICE_OK");
process.exit(0);
