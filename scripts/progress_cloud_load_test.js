#!/usr/bin/env node
"use strict";

global.window = global;
require("../js/progress-merge.js");
require("../js/wm-pack-save.js");

const ps = global.MRJ_WM_packSave;
const store = {};

global.localStorage = {
  getItem: function (k) {
    return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null;
  },
  setItem: function (k, v) {
    store[k] = String(v);
  },
};

const shardPayload = {
  v: 1,
  sets: {
    verbs100: { winsA: { be: 2 }, intro: { be: true }, lastPlayedAt: 5 },
  },
};

const shell = {
  v: 1,
  currentPackId: "verbs100",
  packShardIds: ["verbs100"],
  sets: {},
};

global.fetch = function (_url, opts) {
  const body = JSON.parse(opts.body);
  if (body.action === "load_pack" && body.program === "word-master") {
    return Promise.resolve({
      json: function () {
        return Promise.resolve({
          ok: true,
          found: true,
          progress_json: JSON.stringify(shell),
        });
      },
    });
  }
  if (body.action === "load_pack" && body.program === ps.shardProgram("verbs100")) {
    return Promise.resolve({
      json: function () {
        return Promise.resolve({
          ok: true,
          found: true,
          progress_json: JSON.stringify(shardPayload),
        });
      },
    });
  }
  return Promise.resolve({
    json: function () {
      return Promise.resolve({ ok: true, found: false });
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

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

prog.load().then(function (res) {
  if (!res || !res.ok || !res.found) fail("load failed");
  const merged = JSON.parse(res.progress_json);
  if (!merged.sets || !merged.sets.verbs100) fail("verbs100 missing after shard load");
  if (!merged.sets.verbs100.intro.be) fail("merged intro missing");
  console.log("PROGRESS_CLOUD_LOAD_OK");
}).catch(function (e) {
  fail(e.message || e);
});
