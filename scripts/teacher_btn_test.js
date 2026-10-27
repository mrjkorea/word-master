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

if (index.indexOf('id="btn-teacher"') === -1) fail("missing #btn-teacher");
if (index.indexOf('id="btn-student-name"') === -1) fail("missing #btn-student-name");
const teacherAt = index.indexOf('id="btn-teacher"');
const nameAt = index.indexOf('id="btn-student-name"');
const topbarEnd = index.indexOf("</header>");
if (teacherAt === -1 || nameAt === -1 || topbarEnd === -1) fail("topbar structure");
if (teacherAt > topbarEnd || nameAt > topbarEnd) fail("teacher/name must be in topbar");
if (teacherAt > nameAt) fail("Teacher button should sit before student name");

if (!/study_teacher_check/.test(unlock)) fail("mrj-teacher-unlock must use study_teacher_check");
if (/localStorage/.test(unlock)) fail("mrj-teacher-unlock must not use localStorage");
if (!/isUnlocked/.test(app) || !/bindTeacherButton/.test(app)) {
  fail("app.js must wire teacher unlock");
}
if (!/unlock\.isUnlocked/.test(app)) fail("teacherNow must honor MRJTeacherUnlock.isUnlocked");

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
    body: { classList: { toggle: function () {} }, appendChild: function () {} },
    createElement: function () {
      return {
        hidden: true,
        style: {},
        setAttribute: function () {},
        getAttribute: function () { return null; },
        addEventListener: function () {},
        querySelector: function () { return null; },
        appendChild: function () {},
      };
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
