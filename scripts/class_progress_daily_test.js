#!/usr/bin/env node
"use strict";

require("../js/score-day-log.js");
require("../js/class-progress.js");

const SDL = global.MRJ_WM_scoreDayLog;
const CP = global.MRJ_WM_classProgress;

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

const snap = CP.parseProgressJson({
  v: 1,
  sets: { nouns100: { intro: { time: true } } },
  dailyWordLog: {
    v: 1,
    days: {
      "2026-10-14|nouns100": {
        pack: "nouns100",
        date: "2026-10-14",
        from: 200,
        to: 210,
        ens: ["apple", "banana"],
        ids: ["apple", "banana"],
      },
    },
  },
});

const days = SDL.summariesByDate(snap.dailyWordLog);
if (days.length !== 1 || days[0].date !== "2026-10-14") fail("days " + JSON.stringify(days));
if (days[0].packs[0].line.indexOf("200") === -1 || days[0].packs[0].line.indexOf("apple") === -1) {
  fail("line " + days[0].packs[0].line);
}

console.log("CLASS_PROGRESS_DAILY_OK");
