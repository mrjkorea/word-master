#!/usr/bin/env node
"use strict";

global.window = global;
require("../js/progress-merge.js");
require("../js/wm-pack-save.js");

const ps = global.MRJ_WM_packSave;
let savedPrograms = [];

global.fetch = function (_url, opts) {
  const body = JSON.parse(opts.body);
  if (body.action === "save_pack") {
    savedPrograms.push({
      program: body.program || "word-master",
      json: body.progress_json,
    });
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

global.localStorage = {
  getItem: function () { return null; },
  setItem: function () {},
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

const serverRow = { at: 100, pack: "nouns100", kind: "final", score: 9, total: 10 };
prog.setServerSnapshot(JSON.stringify({
  v: 1,
  scoreRows: [serverRow],
  sets: {},
}));

hooks.resetThrottleState();
hooks.markSessionReady();
hooks.setSaveIntervalMs(0);
savedPrograms = [];

const incoming = JSON.stringify({
  v: 1,
  sets: { nouns100: { winsA: { w1: 2 }, intro: { w1: true }, lastPlayedAt: 1 } },
});

prog.save({ progress_json: incoming, screen: "home", pack_id: "nouns100" }).then(function (res) {
  if (!res || !res.ok) fail("save failed");
  const main = savedPrograms.find(function (p) { return p.program === "word-master"; });
  if (!main) fail("missing main save");
  const mainObj = JSON.parse(main.json);
  if (!mainObj.scoreRows || !mainObj.scoreRows.length) {
    fail("cloud save must retain server scoreRows in main blob");
  }
  if (!mainObj.scoreRows.some(function (r) { return r.at === 100; })) {
    fail("server score row missing from outbound save");
  }
  console.log("WM_PACK_SCORE_ROWS_PRESERVE_OK");
}).catch(function (e) {
  fail(e.message || e);
});
