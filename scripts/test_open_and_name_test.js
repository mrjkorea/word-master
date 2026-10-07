#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

const root = path.join(__dirname, "..");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "js/app.js"), "utf8");

if (index.indexOf("css/app.css?v=20261007-allrows-3") === -1) fail("css cache");
if (index.indexOf("js/app.js?v=20261007-allrows-3") === -1) fail("app cache");
if (index.indexOf("js/progress-merge.js?v=20261007-allrows-3") === -1) fail("progress-merge cache");
if (index.indexOf("js/progress.js?v=20261007-allrows-3") === -1) fail("progress cache");
if (index.indexOf('id="btn-student-name"') === -1) fail("missing top-right name button");
if (index.indexOf("data-mrj-own-record") === -1) fail("name button missing data-mrj-own-record");

const topbarEnd = index.indexOf("</header>");
const helloAt = index.indexOf('id="hello-line"');
const nameAt = index.indexOf('id="btn-student-name"');
if (nameAt === -1 || helloAt === -1 || topbarEnd === -1) fail("index structure");
if (nameAt > topbarEnd || nameAt > helloAt) {
  fail("name button must live in the top bar, not on the home hello line");
}

function mustNotGateTest(needle, label) {
  const start = app.indexOf(needle);
  if (start === -1) fail("missing handler for " + label);
  const slice = app.slice(start, start + 700);
  if (slice.indexOf('pathOpen("test")') !== -1) {
    fail(label + " still requires pathOpen(\"test\")");
  }
}

mustNotGateTest('$("#btn-easy").addEventListener("click"', "btn-easy");
mustNotGateTest('$("#btn-hard").addEventListener("click"', "btn-hard");
mustNotGateTest('$("#btn-test-easy")', "btn-test-easy");
mustNotGateTest('$("#btn-test-hard")', "btn-test-hard");

const jumpBlock = app.slice(app.indexOf('$$("[data-jump]")'), app.indexOf('$$("[data-jump]")') + 900);
if (jumpBlock.indexOf('step === "test"') === -1) {
  fail("ribbon Test must bypass pathOpen for students");
}
if (/step === "test"[\s\S]{0,120}pathOpen\("test"\)/.test(jumpBlock)) {
  fail("ribbon Test still calls pathOpen(\"test\") for students");
}

const { bootApp } = require("./load_app_for_test");
const api = bootApp();
if (!api.formatScoreRecordLine || !api.scoreRowHasRealScore) {
  fail("WM_TEST missing score record helpers");
}

const bare = api.formatScoreRecordLine({
  at: Date.now(),
  pack: "nouns100",
  kind: "game",
  activity: "leapfrog game",
});
if (/\d+%/.test(bare)) fail("record line invented a score without totals");

const withScore = api.formatScoreRecordLine({
  at: Date.now(),
  pack: "nouns100",
  kind: "test_easy",
  activity: "Easy test",
  score: 8,
  total: 10,
});
if (!/80%/.test(withScore)) fail("record line should show a real score");

console.log("TEST_OPEN_AND_NAME_OK");
process.exit(0);
