#!/usr/bin/env node
"use strict";

global.window = global;
require("../js/progress-merge.js");
require("../js/wm-pack-save.js");

const ps = global.MRJ_WM_packSave;
const store = {};
let saveCalls = 0;

global.localStorage = {
  getItem: function (k) {
    return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null;
  },
  setItem: function (k, v) {
    store[k] = String(v);
  },
};

const shell = {
  v: 1,
  packShardIds: ["nouns100", "verbs100"],
  hasScoresShard: false,
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
  if (body.action === "load_pack" && body.program === ps.shardProgram("nouns100")) {
    return Promise.resolve({
      json: function () {
        return Promise.resolve({
          ok: true,
          found: true,
          progress_json: JSON.stringify({
            v: 1,
            sets: { nouns100: { winsA: { time: 2 }, intro: { time: true }, lastPlayedAt: 1 } },
          }),
        });
      },
    });
  }
  if (body.action === "load_pack" && body.program === ps.shardProgram("verbs100")) {
    return Promise.resolve({
      json: function () {
        return Promise.resolve({ ok: true, found: false, progress_json: "" });
      },
    });
  }
  if (body.action === "save_pack") {
    saveCalls += 1;
    return Promise.resolve({
      json: function () {
        return Promise.resolve({ ok: true, saved: true });
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
const hooks = prog.__testHooks;

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

store["mrj.wm.progress.zz_test_mrjmetrics"] = JSON.stringify({
  id: "zz_test_mrjmetrics",
  progress_json: JSON.stringify({
    v: 1,
    sets: { localonly: { winsA: { x: 1 }, lastPlayedAt: 99 } },
  }),
});

hooks.markSessionReady();
saveCalls = 0;

prog.load().then(function (res) {
  if (!res || res.error !== "missing_shard") fail("expected missing_shard " + JSON.stringify(res));
  if (hooks.isCloudLoadBlocked() !== true) fail("cloud load should be blocked");
  if (prog.isReadyToSave()) fail("must not be ready to save over cloud");
  return prog.save({
    progress_json: JSON.stringify({ v: 1, sets: { localonly: { winsA: { x: 2 }, lastPlayedAt: 100 } } }),
    screen: "home",
    pack_id: "localonly",
  });
}).then(function (saveRes) {
  if (saveCalls !== 0) fail("save must not run when load blocked, calls=" + saveCalls);
  console.log("PROGRESS_MISSING_SHARD_LOAD_OK");
}).catch(function (e) {
  fail(e.message || e);
});
