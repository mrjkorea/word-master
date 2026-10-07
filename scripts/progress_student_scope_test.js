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

function assertBNotLeaked(sentBodies, label) {
  const keyB = progressLsKey(STUDENT_B);
  if (store[keyB]) {
    const raw = store[keyB];
    if (raw.indexOf(MARKER_A) !== -1 || raw.indexOf("word_a_unique") !== -1) {
      fail(label + ": B local cache contains A marker");
    }
  }
  sentBodies.forEach(function (entry) {
    if (entry.id !== studentStorageKey(STUDENT_B) && entry.id !== STUDENT_B) return;
    const pj = entry.progress_json || "";
    if (pj.indexOf(MARKER_A) !== -1 || pj.indexOf("word_a_unique") !== -1) {
      fail(label + ": save under B contains A data");
    }
  });
}

function testLateSaveResponse(order) {
  const sentBodies = [];
  let releaseA = null;
  global.fetch = function (_url, opts) {
    const body = JSON.parse(opts.body);
    if (body.action === "save_pack") {
      sentBodies.push({ id: body.id, progress_json: body.progress_json || "" });
      if (body.id === STUDENT_A && !releaseA) {
        return new Promise(function (resolve) {
          releaseA = function () {
            resolve({
              json: function () {
                return Promise.resolve({ ok: true, saved: true });
              },
            });
          };
        });
      }
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
  currentStudent = STUDENT_A;
  hooks.resetThrottleState();
  prog.resetSession();
  hooks.setSaveIntervalMs(0);
  const payloadA = payloadForStudent(MARKER_A, "word_a_unique");
  const tick = function () {
    return new Promise(function (r) { setTimeout(r, 20); });
  };
  return prog.load().then(function () {
    hooks.markSessionReady();
    const aSave = prog.save({ progress_json: payloadA, screen: "home", pack_id: MARKER_A });
    return tick().then(function () {
      prog.resetSession();
      currentStudent = STUDENT_B;
      hooks.resetThrottleState();
      hooks.setSaveIntervalMs(0);
      const afterSwitch = order === "resp-before-load"
        ? (function () {
          releaseA();
          return aSave.then(tick).then(function () { return prog.load(); });
        }())
        : prog.load().then(function () {
          releaseA();
          return aSave;
        }).then(tick);
      return afterSwitch.then(function () {
        hooks.markSessionReady();
        hooks.resetThrottleState();
        hooks.setSaveIntervalMs(0);
        const slimB = JSON.stringify({
          v: 1,
          sets: { nouns_empty: { lastPlayedAt: 2 } },
          scoreRows: [],
        });
        return prog.save({ progress_json: slimB, screen: "home", pack_id: "nouns_empty" }).then(function () {
          assertBNotLeaked(sentBodies, "late-save-" + order);
        });
      });
    });
  });
}

function testLateSaveFailureRetry() {
  const sentBodies = [];
  let failA = null;
  const realSetTimeout = setTimeout;
  global.setTimeout = function (fn, ms) {
    return realSetTimeout(fn, Math.min(ms, 30));
  };
  global.fetch = function (_url, opts) {
    const body = JSON.parse(opts.body);
    if (body.action === "save_pack") {
      sentBodies.push({ id: body.id, progress_json: body.progress_json || "" });
      if (body.id === STUDENT_A && !failA) {
        return new Promise(function (_res, rej) {
          failA = function () { rej(new Error("net")); };
        });
      }
      return Promise.resolve({
        json: function () {
          return Promise.resolve({ ok: true, saved: true });
        },
      });
    }
    if (body.action === "load_pack") {
      return Promise.resolve({
        json: function () {
          return Promise.resolve({
            ok: true,
            found: true,
            progress_json: JSON.stringify({ v: 1, sets: { verbs_server: { winsA: { b0: 1 } } } }),
          });
        },
      });
    }
    return Promise.resolve({
      json: function () {
        return Promise.resolve({ ok: true, saved: true });
      },
    });
  };
  currentStudent = STUDENT_A;
  hooks.resetThrottleState();
  prog.resetSession();
  hooks.setSaveIntervalMs(0);
  const payloadA = payloadForStudent(MARKER_A, "word_a_unique");
  const tick = function (ms) {
    return new Promise(function (r) { realSetTimeout(r, ms || 50); });
  };
  return prog.load().then(function () {
    hooks.markSessionReady();
    prog.save({ progress_json: payloadA, screen: "home", pack_id: MARKER_A });
    return tick().then(function () {
      prog.resetSession();
      currentStudent = STUDENT_B;
      return prog.load().then(function () {
        hooks.markSessionReady();
        failA();
        return tick(300).then(function () {
          const bSaves = sentBodies.filter(function (e) {
            return e.id === STUDENT_B || e.id === studentStorageKey(STUDENT_B);
          });
          if (bSaves.length) fail("late-fail-retry: save posted under B");
          assertBNotLeaked(sentBodies, "late-fail-retry");
          global.setTimeout = realSetTimeout;
        });
      });
    });
  });
}

function testLateLoad() {
  const sentBodies = [];
  let relA = null;
  global.fetch = function (_url, opts) {
    const body = JSON.parse(opts.body);
    if (body.action === "save_pack") {
      sentBodies.push({ id: body.id, progress_json: body.progress_json || "" });
      return Promise.resolve({
        json: function () {
          return Promise.resolve({ ok: true, saved: true });
        },
      });
    }
    if (body.action === "load_pack" && body.id === STUDENT_A) {
      return new Promise(function (resolve) {
        relA = function () {
          resolve({
            json: function () {
              return Promise.resolve({
                ok: true,
                found: true,
                progress_json: payloadForStudent(MARKER_A, "word_a_unique"),
              });
            },
          });
        };
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
  currentStudent = STUDENT_A;
  hooks.resetThrottleState();
  prog.resetSession();
  hooks.setSaveIntervalMs(0);
  const payloadA = payloadForStudent(MARKER_A, "word_a_unique");
  const tick = function (ms) {
    return new Promise(function (r) { setTimeout(r, ms || 30); });
  };
  const la = prog.load();
  return tick().then(function () {
    prog.resetSession();
    currentStudent = STUDENT_B;
    return prog.load().then(function () {
      hooks.markSessionReady();
      relA();
      return la.then(function () {
        return tick().then(function () {
          const slimB = JSON.stringify({
            v: 1,
            sets: { nouns_empty: { lastPlayedAt: 2 } },
            scoreRows: [],
          });
          return prog.save({ progress_json: slimB, screen: "home", pack_id: "nouns_empty" }).then(function () {
            assertBNotLeaked(sentBodies, "late-load");
          });
        });
      });
    });
  });
}

function runBasicScopeTest() {
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
            return undefined;
          });
        });
      });
    });
  });
}

function run() {
  if (!hooks) fail("missing test hooks");

  return runBasicScopeTest()
    .then(function () {
      return testLateSaveResponse("resp-after-load");
    })
    .then(function () {
      return testLateSaveResponse("resp-before-load");
    })
    .then(function () {
      return testLateSaveFailureRetry();
    })
    .then(function () {
      return testLateLoad();
    })
    .then(function () {
      console.log("PROGRESS_STUDENT_SCOPE_OK");
      process.exit(0);
    });
}

run().catch(function (e) {
  fail(String(e && e.message ? e.message : e));
});
