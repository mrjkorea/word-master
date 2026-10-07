#!/usr/bin/env node
"use strict";

global.window = global;
require("../js/progress-merge.js");

const STUDENT_A = "zz_test_scope_student_a";
const STUDENT_B = "zz_test_scope_student_b";
const MARKER_A = "scope_marker_pack_a_only";
const MARKER_B = "scope_marker_pack_b_only";

let currentStudent = STUDENT_A;
let savePackCalls = 0;
let lastSaveProgressJson = "";
const store = {};

function studentStorageKey(id) {
  return String(id || "").trim().toLowerCase().replace(/\s+/g, " ");
}

function progressLsKey(id) {
  return "mrj.wm.progress." + studentStorageKey(id);
}

global.localStorage = {
  getItem: function (key) {
    return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
  },
  setItem: function (key, val) {
    store[key] = String(val);
  },
};

global.fetch = function (_url, opts) {
  const body = JSON.parse(opts.body);
  if (body.action === "save_pack") {
    savePackCalls += 1;
    lastSaveProgressJson = body.progress_json || "";
    return Promise.resolve({
      json: function () {
        return Promise.resolve({ ok: true, saved: true });
      },
    });
  }
  if (body.action === "load_pack") {
    return Promise.resolve({
      json: function () {
        return Promise.resolve({ ok: true, found: false });
      },
    });
  }
  return Promise.resolve({
    json: function () {
      return Promise.resolve({ ok: true, saved: true });
    },
  });
};

global.MRJ_AUTH = {
  student: function () { return currentStudent; },
  token: function () { return "test-token"; },
  ENDPOINT: "https://example.test/mrj-signin",
};

require("../js/progress.js");

const prog = global.MRJ_WM_progress;
const hooks = prog.__testHooks;

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

function payloadForStudent(markerPack, wordId) {
  return JSON.stringify({
    v: 1,
    sets: {
      [markerPack]: {
        winsA: { [wordId]: 2 },
        intro: { [wordId]: true },
        lastPlayedAt: 1,
      },
    },
    scoreRows: [{ at: 1, pack: markerPack, kind: "final", activity: "test", score: 1, total: 1 }],
  });
}

function resetForStudent(student) {
  currentStudent = student;
  savePackCalls = 0;
  lastSaveProgressJson = "";
  hooks.resetThrottleState();
  prog.resetSession();
  hooks.setSaveIntervalMs(0);
  prog.setServerSnapshot(null);
  return prog.load().then(function (res) {
    if (!res || !res.ok) fail("load_pack failed for " + student);
    hooks.markSessionReady();
  });
}

function run() {
  if (!hooks) fail("missing test hooks");

  const payloadA = payloadForStudent(MARKER_A, "word_a_unique");
  const payloadB = payloadForStudent(MARKER_B, "word_b_unique");

  store["mrj.wm.progress"] = JSON.stringify({
    progress_json: payloadA,
    screen: "home",
  });

  return resetForStudent(STUDENT_A).then(function () {
    return prog.save({ progress_json: payloadA, screen: "home", pack_id: MARKER_A }).then(function () {
      if (savePackCalls !== 1) fail("student A first save should post once");
      const keyA = progressLsKey(STUDENT_A);
      if (!store[keyA]) fail("student A keyed local cache missing");
      let cachedA;
      try {
        cachedA = JSON.parse(store[keyA]);
      } catch (e) {
        fail("student A cache not JSON");
      }
      if (cachedA.id !== studentStorageKey(STUDENT_A)) fail("student A cache id mismatch");
      if (String(cachedA.progress_json).indexOf(MARKER_A) === -1) fail("student A cache missing pack");

      return resetForStudent(STUDENT_B).then(function () {
        const slimB = JSON.stringify({
          v: 1,
          sets: { nouns_empty: { lastPlayedAt: 2 } },
          scoreRows: [],
        });
        return prog.save({ progress_json: slimB, screen: "home", pack_id: "nouns_empty" }).then(function () {
          if (savePackCalls !== 1) fail("student B save should post once");
          if (lastSaveProgressJson.indexOf(MARKER_A) !== -1) {
            fail("student B save leaked A pack id");
          }
          if (lastSaveProgressJson.indexOf("word_a_unique") !== -1) {
            fail("student B save leaked A word id");
          }
          if (lastSaveProgressJson.indexOf("scope_marker_pack_a_only") !== -1) {
            fail("student B save leaked A marker");
          }
          let savedB;
          try {
            savedB = JSON.parse(lastSaveProgressJson);
          } catch (e) {
            fail("student B save not JSON");
          }
          if (savedB.scoreRows && savedB.scoreRows.length) {
            const leaked = savedB.scoreRows.some(function (row) {
              return row && row.pack === MARKER_A;
            });
            if (leaked) fail("student B save leaked A scoreRows");
          }

          return resetForStudent(STUDENT_A).then(function () {
            const merged = prog.mergeSaveProgress(payloadForStudent("nouns_fresh", "word_new"));
            const mergedStr = JSON.stringify(merged);
            if (mergedStr.indexOf(MARKER_A) === -1 || mergedStr.indexOf("word_a_unique") === -1) {
              fail("student A signing back in did not restore A local progress");
            }
            console.log("PROGRESS_STUDENT_SCOPE_OK");
            process.exit(0);
          });
        });
      });
    });
  });
}

run().catch(function (e) {
  fail(String(e && e.message ? e.message : e));
});
