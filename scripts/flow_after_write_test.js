#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

const app = fs.readFileSync(path.join(__dirname, "..", "js", "app.js"), "utf8");

function fnBody(name) {
  const start = app.indexOf("function " + name + "(");
  if (start < 0) fail("missing " + name);
  const brace = app.indexOf("{", start);
  let depth = 0;
  for (let i = brace; i < app.length; i++) {
    const ch = app.charAt(i);
    if (ch === "{") depth += 1;
    else if (ch === "}") {
      depth -= 1;
      if (depth === 0) return app.slice(start, i + 1);
    }
  }
  fail("unclosed " + name);
}

const advance = fnBody("advanceLearn");
const partAt = advance.indexOf("if (nxt.partDone)");
if (partAt < 0) fail("advanceLearn missing part-done branch");
const part = advance.slice(partAt);
if (part.indexOf("showTestPick") !== -1) {
  fail("advanceLearn part-done branch calls showTestPick");
}
const modeC = part.indexOf('learn.mode === "C"');
if (modeC < 0) fail("mode C part-done path missing");
if (part.slice(modeC, modeC + 180).indexOf("goGames()") === -1) {
  fail("mode C part-done path does not call goGames");
}

const deliver = fnBody("deliverGameDone");
const marked = deliver.indexOf("markGameDone");
if (marked < 0) fail("deliverGameDone missing game-done mark");
const afterMark = deliver.slice(marked);
if (afterMark.indexOf("showTestPick()") === -1) {
  fail("deliverGameDone does not call showTestPick after a finished game");
}
if (afterMark.indexOf('showScreen("set")') !== -1) {
  fail('deliverGameDone calls showScreen("set") after a finished game');
}

console.log("FLOW_AFTER_WRITE_OK");
process.exit(0);
