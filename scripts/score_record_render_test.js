#!/usr/bin/env node
"use strict";

const { bootApp } = require("./load_app_for_test");

const rafQueue = [];
function installRaf() {
  global.requestAnimationFrame = function (cb) {
    rafQueue.push(cb);
    return rafQueue.length;
  };
}

function flushRaf(maxPasses) {
  let passes = 0;
  while (rafQueue.length && passes < (maxPasses || 50)) {
    const batch = rafQueue.splice(0);
    batch.forEach(function (fn) { fn(); });
    passes += 1;
  }
}

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

const api = bootApp();
installRaf();
const list = global.document.querySelector("#score-record-list");
if (!list) fail("missing score-record-list");

const rows = [];
for (let i = 1; i <= 450; i += 1) {
  rows.push({
    at: 1_700_000_000_000 + i,
    pack: "nouns100",
    kind: "test_easy",
    activity: "Easy test",
    score: 8,
    total: 10,
  });
}

api.applyRemote({ v: 1, sets: {}, scoreRows: rows });
api.renderScoreRecord();

if (list.children.length !== 200) {
  fail("expected first batch of 200 rows, got " + list.children.length);
}

flushRaf();
if (list.children.length !== rows.length) {
  fail("expected all " + rows.length + " rows in list, got " + list.children.length);
}

const collected = api.collectScoreRecordRows();
if (collected.length !== rows.length) {
  fail("collectScoreRecordRows dropped rows: " + collected.length);
}

console.log("SCORE_RECORD_RENDER_OK");
process.exit(0);
