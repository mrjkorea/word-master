#!/usr/bin/env node
"use strict";

global.window = global;
require("../js/progress-merge.js");
require("../js/wm-pack-save.js");

let savePackCalls = 0;
let rejectFirstSave = true;
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
    if (rejectFirstSave) {
      rejectFirstSave = false;
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
  student: function () { return "zz_test_mrjmetrics"; },
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
  hooks.setSaveSplitLevel(0);
  prog.setServerSnapshot("{}");
  hooks.setSaveIntervalMs(0);
  savePackCalls = 0;
  rejectFirstSave = true;

  return prog.save({ progress_json: payload, screen: "home", pack_id: "nouns100" }).then(function (res) {
    if (!res || !res.ok) fail("save should succeed after split retry: " + JSON.stringify(res));
    if (savePackCalls < 2) fail("expected main fail + shard save, got " + savePackCalls);
    if (hooks.getSaveSplitLevel() !== 0) fail("split level should reset after success");
    if (prog.lastSaveError() !== "") fail("lastSaveError should clear");

    const cached = store["mrj.wm.progress.zz_test_mrjmetrics"];
    if (!cached) fail("local progress should be written");
    let parsed;
    try {
      parsed = JSON.parse(cached);
    } catch (e) {
      fail("local progress is not JSON");
    }
    if (!parsed || parsed.id !== "zz_test_mrjmetrics") fail("scoped id");
    if (!parsed.progress_json || parsed.progress_json.indexOf("w1") === -1) {
      fail("local progress_json missing pack data");
    }

    rejectFirstSave = false;
    hooks.resetThrottleState();
    hooks.markSessionReady();
    savePackCalls = 0;
    return prog.save({ progress_json: payload, screen: "home", pack_id: "nouns100" }).then(function (res2) {
      if (!res2 || !res2.ok) fail("second save should succeed");
      if (savePackCalls < 1) fail("expected save attempts");
    });
  }).then(function () {
    console.log("PROGRESS_TOO_LARGE_OK");
    process.exit(0);
  });
}

run().catch(function (e) {
  fail(String(e && e.message ? e.message : e));
});
