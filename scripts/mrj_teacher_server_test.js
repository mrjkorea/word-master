"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const app = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
const unlock = fs.readFileSync(path.join(root, "js/mrj-teacher-unlock.js"), "utf8");

if (!/isTeacher\(\)/.test(app) || !/MRJTeacherUnlock/.test(app) || !/isUnlocked/.test(app)) {
  console.error("app.js must use MRJTeacherUnlock.isUnlocked / isTeacher for teacherNow");
  process.exit(1);
}
if (!/isTeacher\(\)/.test(unlock) || /localStorage/.test(unlock)) {
  console.error("mrj-teacher-unlock must not use localStorage for role");
  process.exit(1);
}
if (!/study_teacher_check/.test(unlock)) {
  console.error("mrj-teacher-unlock must post study_teacher_check");
  process.exit(1);
}
console.log("mrj_teacher_server_test: ok");
