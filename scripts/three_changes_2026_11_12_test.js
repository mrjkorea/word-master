#!/usr/bin/env node
"use strict";
/* Jay 2026-11-12, three changes on every word pack:
   1. Meet the Words shows the set's words and their meanings under the pictures.
   2. Dictation plays the word 1, 5 or 10 times, chosen by the student.
   3. A two-word expression needs its space typed. */

const { bootApp } = require("./load_app_for_test.js");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

function boot() {
  return bootApp({
    mode: "student",
    beforeApp: function (g) {
      g.WordFactoryI18n = {
        setLocale: function (x) { return x || "en"; },
        getLocale: function () { return "en"; },
        fillSelect: function () {},
        applyDom: function () {},
        partName: function (m) { return m; },
        partHint: function () { return ""; },
        t: function (k) { return k; },
      };
    },
  });
}

const api = boot();

/* 3. spaces */
const norm = api.normText;
if (norm("get up") !== "get up") fail("norm keeps the space: " + JSON.stringify(norm("get up")));
if (norm("GET  UP") !== "get up") fail("norm collapses spaces: " + JSON.stringify(norm("GET  UP")));
if (norm("getup") !== "getup") fail("norm drops nothing else: " + JSON.stringify(norm("getup")));
if (norm("get up") === norm("getup")) fail("a missing space must be wrong");
if (norm("o'clock") !== "oclock") fail("apostrophe stays forgiving: " + JSON.stringify(norm("o'clock")));
if (norm("well-known") !== "wellknown") fail("hyphen stays forgiving: " + JSON.stringify(norm("well-known")));
if (norm("take   off") !== "take off") fail("many spaces fold to one");

/* the build pool and the letter rail keep a real space */
if (api.buildTargetText("get up") !== "GET UP") fail("buildTarget: " + api.buildTargetText("get up"));
if (api.buildTargetText("get-up") !== "GETUP") fail("hyphen is not a space in the pool");
if (api.buildTargetText("up") !== "UP") fail("single word unchanged");
if (api.shownTileText(" ") === " ") fail("the space tile needs a visible glyph");

/* 2. repeats */
if (api.dictRepeat() !== 1) fail("default repeat must be 1");
api.getState().dictRepeat = 5;
if (api.dictRepeat() !== 5) fail("repeat 5 not read");
api.getState().dictRepeat = 10;
if (api.dictRepeat() !== 10) fail("repeat 10 not read");
api.getState().dictRepeat = 7;
if (api.dictRepeat() !== 1) fail("a stray count must fall back to 1");
api.getState().dictRepeat = 5;
api.renderRepeatRow();

/* 1. the list opens from one button and never squeezes the pictures */
const html = require("fs").readFileSync(require("path").join(__dirname, "..", "index.html"), "utf8");
if (html.indexOf('id="meet-list" hidden') < 0) fail("the sheet must ship hidden in index.html");
if (html.indexOf('id="btn-meet-words"') < 0) fail("the Words button must be in index.html");
global.document.querySelector("#meet-list").hidden = true;   // as the page ships it
api.renderMeetList([
  { id: "a", en: "get up", ko: "일어나다" },
  { id: "b", en: "contest", ko: "대회" },
]);
const box = global.document.querySelector("#meet-list");
if (!box) fail("meet-sheet element missing");
if (!box.hidden) fail("the sheet must start closed so the pictures keep the screen");
const btn = global.document.querySelector("#btn-meet-words");
if (!btn) fail("Words button missing");
if (btn.hidden) fail("Words button must show when the set has words");
if (btn.getAttribute("data-count") !== "2") fail("button must carry the count: " + btn.getAttribute("data-count"));
const ul = global.document.querySelector("#meet-list-ul");
if (!ul) fail("meet-list-ul missing");
if (ul.children.length !== 2) fail("one row per word, got " + ul.children.length);
const row0 = ul.children[0];
if (String(row0.children[0].textContent) !== "get up") fail("English cell: " + row0.children[0].textContent);
if (!String(row0.children[1].textContent)) fail("meaning cell empty");

api.openMeetList();
if (box.hidden) fail("the button must open the sheet");
api.closeMeetList();
if (!box.hidden) fail("Close must hide the sheet again");

/* an empty set hides button and sheet */
api.renderMeetList([]);
if (!box.hidden) fail("sheet must hide with no words");
if (!btn.hidden) fail("Words button must hide with no words");

/* a hundred words still get one row each, in the sheet that scrolls */
const hundred = [];
for (let i = 1; i <= 100; i++) hundred.push({ id: "w" + i, en: "word " + i, ko: "뜻 " + i });
api.renderMeetList(hundred);
if (ul.children.length !== 100) fail("100 words must list 100 rows, got " + ul.children.length);
if (btn.getAttribute("data-count") !== "100") fail("button must say 100: " + btn.getAttribute("data-count"));

console.log("PASS three changes: list under pictures, repeat 1/5/10, space needed");
