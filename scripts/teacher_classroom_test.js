#!/usr/bin/env node
"use strict";

require("../js/teacher-classroom.js");

const TC = global.MRJ_WM_teacherClassroom;

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

if (!TC) fail("MRJ_WM_teacherClassroom missing");

var meta = TC.incompleteFromSnapshotResponse({
  ok: true,
  incomplete: true,
  missingShards: ["verbs100", "nouns200"],
});
if (!meta.incomplete) fail("expected incomplete");
if (meta.missingShards.length !== 2 || meta.missingShards[0] !== "verbs100") {
  fail("missingShards normalize " + JSON.stringify(meta.missingShards));
}

var msg = TC.formatIncompleteWarning(meta.missingShards);
if (msg.indexOf("verbs100") < 0 || msg.indexOf("nouns200") < 0) {
  fail("warning should list packs: " + msg);
}
if (msg.indexOf("Warning") < 0) fail("warning should be clearly labeled");

var complete = TC.incompleteFromSnapshotResponse({ ok: true, incomplete: false });
if (complete.incomplete || complete.missingShards.length) {
  fail("complete snapshot should not be incomplete");
}

var emptyMissing = TC.formatIncompleteWarning([]);
if (emptyMissing.indexOf("incomplete") < 0) fail("empty missing list still warns");

console.log("TEACHER_CLASSROOM_OK");
