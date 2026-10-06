#!/usr/bin/env node
"use strict";

global.window = global;
require("../js/progress-merge.js");

let savePackCalls = 0;

global.fetch = function (_url, opts) {
  const body = JSON.parse(opts.body);
  if (body.action === "save_pack") savePackCalls += 1;
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

function run() {
  if (!hooks) fail("test hooks missing");

  hooks.resetThrottleState();
  hooks.markSessionReady();
  prog.setServerSnapshot("{}");
  hooks.setSaveIntervalMs(10000);

  const p1 = JSON.stringify({
    v: 1,
    sets: { nouns100: { winsA: { w1: 1 }, intro: { w1: true }, lastPlayedAt: 1 } },
  });

  return prog.save({ progress_json: p1, screen: "set", pack_id: "nouns100" }).then(function () {
    if (savePackCalls !== 1) fail("first save should post once, got " + savePackCalls);

    savePackCalls = 0;
    return prog.save({ progress_json: p1, screen: "set", pack_id: "nouns100" }).then(function (res) {
      if (savePackCalls !== 0) fail("unchanged save should not post");
      if (!res || !res.skipped) fail("expected skipped response");

      const p2 = JSON.stringify({
        v: 1,
        sets: { nouns100: { winsA: { w1: 2 }, intro: { w1: true }, lastPlayedAt: 2 } },
      });
      savePackCalls = 0;
      return prog.save({ progress_json: p2, screen: "set", pack_id: "nouns100" }).then(function (res2) {
        if (savePackCalls !== 0) fail("should rate-limit second post");
        if (!res2 || res2.error !== "rate_limited") fail("expected rate_limited");

        hooks.setSaveIntervalMs(0);
        hooks.resetThrottleState();
        hooks.markSessionReady();
        prog.setServerSnapshot("{}");

        let maxConcurrent = 0;
        let inFlight = 0;
        const origFetch = global.fetch;
        global.fetch = function (url, opts) {
          const body = JSON.parse(opts.body);
          if (body.action === "save_pack") {
            inFlight += 1;
            maxConcurrent = Math.max(maxConcurrent, inFlight);
            return new Promise(function (resolve) {
              setTimeout(function () {
                inFlight -= 1;
                resolve({
                  json: function () {
                    return Promise.resolve({ ok: true, saved: true });
                  },
                });
              }, 40);
            });
          }
          return origFetch(url, opts);
        };

        const pp = JSON.stringify({
          v: 1,
          sets: { nouns100: { winsA: { x: 1 }, lastPlayedAt: 10 } },
        });
        const pp2 = JSON.stringify({
          v: 1,
          sets: { nouns100: { winsA: { x: 2 }, lastPlayedAt: 11 } },
        });
        return Promise.all([
          prog.save({ progress_json: pp, screen: "set", pack_id: "nouns100" }),
          prog.save({ progress_json: pp2, screen: "set", pack_id: "nouns100" }),
        ]).then(function () {
          global.fetch = origFetch;
          if (maxConcurrent > 1) fail("parallel save_pack requests, max=" + maxConcurrent);
          console.log("PROGRESS_SAVE_THROTTLE_OK");
          process.exit(0);
        });
      });
    });
  });
}

run().catch(function (e) {
  fail(String(e && e.message ? e.message : e));
});
