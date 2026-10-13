#!/usr/bin/env node
"use strict";

require("../js/class-progress.js");

const CP = global.MRJ_WM_classProgress;

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

if (!CP) fail("MRJ_WM_classProgress missing");

if (!CP.canOpenStudentSnapshot("zz_test_mrjmetrics")) fail("zz_test_mrjmetrics should open");
if (CP.canOpenStudentSnapshot("other_student")) fail("other students locked");

var pack = {
  intro: { time: true, year: true },
  winsA: { time: 2, year: 1 },
  winsB: { time: 2 },
  winsC: { time: 2 },
  testPassed: { time: 90 },
  meetLock: ["time", "year"],
};

var flags = CP.stepFlags(pack, "time");
if (!flags.meet || !flags.learn || !flags.dict || !flags.write || !flags.test) {
  fail("time flags " + JSON.stringify(flags));
}
var flagsYear = CP.stepFlags(pack, "year");
if (!flagsYear.meet || flagsYear.learn) fail("year learn should be false");

var rows = CP.rowsForPack("nouns100", pack, [
  { id: "time", en: "time" },
  { id: "year", en: "year" },
]);
if (rows.length !== 2) fail("expected 2 rows");

console.log("CLASS_PROGRESS_OK");
