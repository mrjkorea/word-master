#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { bootApp } = require("./load_app_for_test");
const WMTeacherStart = require("../js/teacher-start-unlock.js");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

const index = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
if (index.indexOf("teacher-start-unlock.js") === -1) fail("index must load teacher-start-unlock.js");
if (index.indexOf("teacher-start-panel.js") === -1) fail("index must load teacher-start-panel.js");
if (index.indexOf("20261102-teacher-start-here") === -1) fail("build id bump missing");

global.WM_TEMP_UNLOCK_ALL = false;

function wordsOf(n) {
  const out = [];
  for (let i = 1; i <= n; i++) out.push({ id: "w" + i, en: "word" + i, ko: "ko" + i });
  return out;
}

const api = bootApp({ mode: "student" });
const set = {
  id: "tu-set",
  packId: "nouns100",
  title: "Nouns",
  words: wordsOf(30),
  meetLock: ["w1", "w2", "w3", "w4", "w5"],
  intro: {},
  winsA: {},
  winsB: {},
  winsC: {},
  tapmapKey: "",
  roundGames: {},
  pathHeld: {},
};
api.activateSet(set);

if (!api.studentLocked(set, "test")) fail("fresh student test should stay locked without temp unlock");
WMTeacherStart.unlockPathStep(set, "test");
if (api.studentLocked(set, "test")) fail("teacher path unlock should open test for student view");

if (api.chooseStart(set, 21)) fail("chooseStart(21) should block before group unlock");
WMTeacherStart.unlockGroup(set, 21);
if (!api.chooseStart(set, 21)) fail("chooseStart(21) after teacher group unlock");
if (set.startNumber !== 21) fail("startNumber should be 21, got " + set.startNumber);
if (set.meetLock.indexOf("w21") === -1) fail("meetLock should include w21");

const aligned = WMTeacherStart.alignedStart(22);
if (aligned !== 21) fail("alignedStart(22) should be 21");

WMTeacherStart.relockGroup(set, 21);
if (WMTeacherStart.isGroupUnlocked(set, 21)) fail("relockGroup should clear group 21");

console.log("TEACHER_START_UNLOCK_OK");
