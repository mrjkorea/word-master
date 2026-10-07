#!/usr/bin/env node
"use strict";

global.window = global;
require("../js/progress-merge.js");

let savePackCalls = 0;
const store = {};

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
    return Promise.resolve({
      json: function () {
        return Promise.resolve({
          ok: false,
          error: "too_large",
          message: "Progress data is too large to store.",
        });
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
  student: function () { return "zz_test_too_large"; },
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

const payload = JSON.stringify({
  v: 1,
  sets: { nouns100: { winsA: { w1: 2 }, intro: { w1: true }, lastPlayedAt: 1 } },
});

function run() {
  if (!hooks) fail("missing test hooks");
  hooks.resetThrottleState();
  hooks.markSessionReady();
  prog.setServerSnapshot("{}");
  hooks.setSaveIntervalMs(0);
  savePackCalls = 0;

  return prog.save({ progress_json: payload, screen: "home", pack_id: "nouns100" }).then(function (res) {
    if (savePackCalls !== 1) fail("expected one save attempt, got " + savePackCalls);
    if (!res || res.error !== "too_large") fail("expected too_large response");
    if (prog.lastSaveError() !== "too_large") fail("lastSaveError should be too_large");
    if (hooks.hasRetryScheduled()) fail("too_large must not schedule retry");

    const cached = store["mrj.wm.progress"];
    if (!cached) fail("local progress should be written on too_large");
    let parsed;
    try {
      parsed = JSON.parse(cached);
    } catch (e) {
      fail("local progress is not JSON");
    }
    if (!parsed.progress_json || parsed.progress_json.indexOf("w1") === -1) {
      fail("local progress_json missing pack data");
    }

    return new Promise(function (resolve) {
      setTimeout(function () {
        if (savePackCalls !== 1) fail("retry should not fire after too_large");
        if (hooks.hasRetryScheduled()) fail("retry timer still set after wait");
        resolve();
      }, 2500);
    }).then(function () {
      global.fetch = function (_url, opts2) {
        const body2 = JSON.parse(opts2.body);
        if (body2.action === "save_pack") {
          savePackCalls += 1;
          return Promise.resolve({
            json: function () {
              return Promise.resolve({ ok: true, saved: true });
            },
          });
        }
        return Promise.resolve({
          json: function () {
            return Promise.resolve({ ok: true, saved: true });
          },
        });
      };
      hooks.resetThrottleState();
      hooks.markSessionReady();
      savePackCalls = 0;
      return prog.save({ progress_json: payload, screen: "home", pack_id: "nouns100" }).then(function (res2) {
        if (!res2 || !res2.ok) fail("save should succeed after too_large cleared");
        if (savePackCalls !== 1) fail("expected one successful save after recovery");
        if (prog.lastSaveError() !== "") fail("lastSaveError should clear after success");
      });
    });
  }).then(function () {
    console.log("PROGRESS_TOO_LARGE_OK");
    process.exit(0);
  });
}

run().catch(function (e) {
  fail(String(e && e.message ? e.message : e));
});
