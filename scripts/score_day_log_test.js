#!/usr/bin/env node
"use strict";

require("../js/score-day-log.js");

const SDL = global.MRJ_WM_scoreDayLog || require("../js/score-day-log.js");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

const words = [
  { id: "apple", en: "apple" },
  { id: "banana", en: "banana" },
  { id: "cherry", en: "cherry" },
];
const packWords = words.concat([{ id: "date", en: "date" }]);

const progress = { v: 1, sets: {} };
SDL.recordWords(progress, "nouns100", words.slice(0, 2), packWords, Date.UTC(2026, 9, 14, 12));
SDL.recordWords(progress, "nouns100", [words[2]], packWords, Date.UTC(2026, 9, 14, 15));

const entry = progress.dailyWordLog.days["2026-10-14|nouns100"];
if (!entry || entry.from !== 1 || entry.to !== 3) {
  fail("range " + JSON.stringify(entry));
}
const line = SDL.formatDayLine(entry);
if (line.indexOf("Words 1–3") === -1 || line.indexOf("apple") === -1) {
  fail("line " + line);
}

const merged = SDL.mergeDailyLogs(
  progress.dailyWordLog,
  {
    v: 1,
    days: {
      "2026-10-14|nouns100": {
        pack: "nouns100",
        date: "2026-10-14",
        ids: ["date"],
        ens: ["date"],
        from: 4,
        to: 4,
      },
    },
  }
);
const mEntry = merged.days["2026-10-14|nouns100"];
if (!mEntry || mEntry.from !== 1 || mEntry.to !== 4 || mEntry.ids.length !== 4) {
  fail("merge " + JSON.stringify(mEntry));
}

const panels = SDL.panelRowsFromLog(merged);
if (!panels.length || panels[0].label.indexOf("Words") === -1) {
  fail("panel rows " + JSON.stringify(panels[0]));
}

console.log("SCORE_DAY_LOG_OK");
