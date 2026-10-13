#!/usr/bin/env node
"use strict";

global.window = global;
require("../js/progress-merge.js");
require("../js/wm-pack-save.js");

let saveCalls = [];
const store = {};

global.localStorage = {
  getItem: function (k) {
    return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null;
  },
  setItem: function (k, v) {
    store[k] = String(v);
  },
};

global.fetch = function (_url, opts) {
  const body = JSON.parse(opts.body);
  if (body.action === "save_pack") {
    saveCalls.push(body.program || "word-master");
    if (body.program && body.program.indexOf("verbs100") >= 0) {
      return Promise.resolve({
        json: function () {
          return Promise.resolve({ ok: false, error: "save_failed" });
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
      return Promise.resolve({ ok: true });
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
  sets: {
    nouns100: { winsA: { a: 2 }, intro: { a: true }, lastPlayedAt: 1 },
    verbs100: { winsA: { b: 2 }, intro: { b: true }, lastPlayedAt: 2 },
  },
});

hooks.resetThrottleState();
hooks.markSessionReady();
hooks.setSaveSplitLevel(1);
prog.setServerSnapshot("{}");
hooks.setSaveIntervalMs(0);
saveCalls = [];

prog.save({ progress_json: payload, screen: "home", pack_id: "nouns100" }).then(function (res) {
  if (res && res.ok) fail("save should fail when a shard fails");
  if (saveCalls.indexOf("word-master") >= 0) {
    fail("shell must not be saved after shard failure, order=" + saveCalls.join(","));
  }
  if (saveCalls.length < 2) fail("expected at least two shard attempts");
  const last = hooks.lastSuccessfulPackedJson();
  if (last && last.indexOf("verbs100") !== -1 && last.indexOf("nouns100") !== -1) {
    fail("must not mark full snapshot saved after partial failure");
  }
  console.log("PROGRESS_SHARD_SAVE_FAILURE_OK");
}).catch(function (e) {
  fail(e.message || e);
});
