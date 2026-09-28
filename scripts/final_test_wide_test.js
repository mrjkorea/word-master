#!/usr/bin/env node
"use strict";

const { bootApp } = require("./load_app_for_test.js");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

function sortedIds(items) {
  return items.map(function (w) { return w.id; }).sort().join(",");
}

const api = bootApp();
if (api.PASS_PCT !== 80) fail("PASS_PCT " + api.PASS_PCT);

const words = [];
for (let i = 1; i <= 100; i++) {
  words.push({ id: "w" + i, en: "word" + i, ko: "ko" + i });
}
const set = {
  id: "set_final",
  packId: "nouns100",
  title: "Nouns 100",
  words: words,
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  meetLock: [],
};
api.activateSet(set);

api.startEasy(true);
let quiz = api.getQuiz();
if (!quiz.wide) fail("startEasy(true) did not set quiz.wide");
if (quiz.kind !== "final") fail("wide kind " + quiz.kind);
if (quiz.items.length !== 100) fail("wide queue " + quiz.items.length);
const allIds = words.map(function (w) { return w.id; }).sort().join(",");
if (sortedIds(quiz.items) !== allIds) fail("wide queue is not the whole pack");
if (api.currentSet().meetLock.length !== 10) fail("wide test changed the meet lock size");

const lockIds = api.currentSet().meetLock.slice().sort().join(",");
api.startEasy();
quiz = api.getQuiz();
if (quiz.wide) fail("normal startEasy set quiz.wide");
if (quiz.kind !== "easy") fail("normal kind " + quiz.kind);
if (quiz.items.length !== api.currentSet().meetLock.length) {
  fail("normal queue " + quiz.items.length + " lock " + api.currentSet().meetLock.length);
}
if (sortedIds(quiz.items) !== lockIds) fail("normal queue left the meet lock");
const expectLock = [];
for (let i = 1; i <= 10; i++) expectLock.push("w" + i);
if (lockIds !== expectLock.sort().join(",")) fail("lock batch " + lockIds);

api.startEasy(true);
quiz = api.getQuiz();
const winsBefore = JSON.stringify(api.currentSet().winsA) + JSON.stringify(api.currentSet().winsB) + JSON.stringify(api.currentSet().winsC);
quiz.score = 80;
quiz.mistakes = [];
api.finishQuiz();
const passed = api.currentSet().final;
if (!passed || passed.passed !== true || passed.pct !== 80 || passed.score !== 80 || passed.total !== 100) {
  fail("80% should pass " + JSON.stringify(passed));
}
if (document.querySelector("#test-score-title").textContent !== "80 / 100 — 80%") {
  fail("pass title " + document.querySelector("#test-score-title").textContent);
}
if (document.querySelector("#test-score-line").textContent !== "Passed ✅ Pack finished.") {
  fail("pass line " + document.querySelector("#test-score-line").textContent);
}

quiz.score = 79;
quiz.mistakes = [{ id: "w9", en: "word9", ko: "ko9" }];
api.finishQuiz();
const failed = api.currentSet().final;
if (!failed || failed.passed !== false || failed.pct !== 79) fail("79% should fail " + JSON.stringify(failed));
if (api.currentSet().finalMiss.join(",") !== "w9") fail("finalMiss " + api.currentSet().finalMiss.join(","));
const winsAfter = JSON.stringify(api.currentSet().winsA) + JSON.stringify(api.currentSet().winsB) + JSON.stringify(api.currentSet().winsC);
if (winsAfter !== winsBefore) fail("final test changed wins");
if (document.querySelector("#test-score-line").textContent !== "Needs work — keep learning the words in red.") {
  fail("fail line " + document.querySelector("#test-score-line").textContent);
}
if (document.querySelector("#test-kind").textContent !== "ALL") fail("test-kind " + document.querySelector("#test-kind").textContent);

console.log("FINAL_WIDE_OK all 100 vs lock 10, pass at 80%");
process.exit(0);
