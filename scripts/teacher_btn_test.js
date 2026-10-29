#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

const root = path.join(__dirname, "..");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
const unlock = fs.readFileSync(path.join(root, "js/mrj-teacher-unlock.js"), "utf8");

if (index.indexOf('id="btn-teacher"') !== -1) fail("index must not include #btn-teacher (use mrj-auth chip)");
if (index.indexOf('id="btn-student-name"') === -1) fail("missing #btn-student-name");
const nameAt = index.indexOf('id="btn-student-name"');
const topbarEnd = index.indexOf("</header>");
if (nameAt === -1 || topbarEnd === -1) fail("topbar structure");
if (nameAt > topbarEnd) fail("student name must be in topbar");

if (!/study_teacher_check/.test(unlock)) fail("mrj-teacher-unlock must use study_teacher_check");
if (/localStorage/.test(unlock)) fail("mrj-teacher-unlock must not use localStorage");
if (/openPinPanel/.test(unlock)) fail("mrj-teacher-unlock must not open a second PIN panel");
if (/bindTeacherButton\(btn\)/.test(unlock)) fail("mrj-teacher-unlock must not bind a topbar teacher button");
if (!/isUnlocked/.test(app)) fail("app.js must use MRJTeacherUnlock.isUnlocked");
if (/bindTeacherButton/.test(app)) fail("app.js must not wire #btn-teacher");
if (!/unlock\.isUnlocked/.test(app)) fail("teacherNow must honor MRJTeacherUnlock.isUnlocked");
if (!/mrj-teacher/.test(unlock)) fail("mrj-teacher-unlock must listen for mrj-teacher from auth chip");

const sandbox = {
  console,
  setTimeout,
  clearTimeout,
  fetch: function () {
    return Promise.resolve({
      json: function () {
        return Promise.resolve({ ok: true });
      },
    });
  },
  document: {
    body: {
      classList: {
        toggle: function () {},
        contains: function () { return false; },
      },
    },
    addEventListener: function () {},
    dispatchEvent: function () {},
    createEvent: function () {
      return { initEvent: function () {} };
    },
  },
  CustomEvent: function () {},
  alert: function () {},
  MRJ_AUTH: {
    ENDPOINT: "https://example.test/",
    student: function () { return "stu"; },
    token: function () { return "tok"; },
    isTeacher: function () { return false; },
  },
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;

vm.runInNewContext(unlock, sandbox);
const TU = sandbox.MRJTeacherUnlock;
if (!TU || typeof TU.isUnlocked !== "function") fail("MRJTeacherUnlock export");
if (TU.isUnlocked()) fail("should start locked without PIN or server teacher");

TU.teacherCheck("1234").then(function (r) {
  if (!r || !r.ok) fail("teacherCheck mock should return ok");
  if (TU.isMrjTeacher()) fail("mock student should not be server teacher");
  console.log("TEACHER_BTN_OK");
  process.exit(0);
}).catch(function (e) {
  fail(String(e && e.message ? e.message : e));
});
