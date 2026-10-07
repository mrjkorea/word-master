#!/usr/bin/env node
"use strict";

global.window = global;
require("../js/progress-merge.js");

let savePackCalls = 0;
let lastSaveProgressJson = "";

global.fetch = function (_url, opts) {
  const body = JSON.parse(opts.body);
  if (body.action === "save_pack") {
    savePackCalls += 1;
    lastSaveProgressJson = body.progress_json;
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
const merge = global.MRJ_WM_merge;
const hooks = prog.__testHooks;

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

function makeLargeProgress(minChars) {
  const winsA = {};
  let i = 0;
  let json;
  do {
    winsA["word_" + i] = (i % 7) + 1;
    i += 1;
    json = JSON.stringify({
      v: 1,
      sets: {
        bigpack: {
          winsA: winsA,
          winsB: {},
          winsC: {},
          intro: {},
          lastPlayedAt: 1,
        },
      },
    });
  } while (json.length < minChars);
  return json;
}

function resetSaveState() {
  savePackCalls = 0;
  lastSaveProgressJson = "";
  hooks.resetThrottleState();
  hooks.setSaveIntervalMs(0);
  hooks.markSessionReady();
  prog.setServerSnapshot("{}");
}

function testMergeMaxAndEmptyServer() {
  const local = {
    v: 1,
    sets: {
      nouns100: {
        winsA: { w1: 3 },
        testPassed: { w1: 80 },
        lastPlayedAt: 1,
      },
    },
  };
  const remote = {
    v: 1,
    sets: {
      nouns100: {
        winsA: { w1: 1 },
        testPassed: { w1: 50 },
        lastPlayedAt: 99,
      },
    },
  };
  const merged = merge(local, remote);
  if (merged.sets.nouns100.winsA.w1 !== 3) {
    fail("merge should keep max winsA");
  }
  if (merged.sets.nouns100.testPassed.w1 !== 80) {
    fail("merge should keep max testPassed");
  }

  prog.setServerSnapshot(JSON.stringify(remote));
  const saveMerged = prog.mergeSaveProgress(JSON.stringify(local));
  if (!saveMerged.sets.nouns100 || saveMerged.sets.nouns100.testPassed.w1 !== 80) {
    fail("empty/poorer server must not overwrite richer local on save merge");
  }
}

function testSaveGating() {
  hooks.resetThrottleState();
  prog.resetSession();
  const payload = JSON.stringify({
    v: 1,
    sets: { nouns100: { winsA: { a: 1 }, lastPlayedAt: 1 } },
  });
  return prog.save({ progress_json: payload }).then(function (res) {
    if (savePackCalls !== 0) fail("save before load should not post");
    if (!res || res.error !== "not_loaded") fail("expected not_loaded before load");

    savePackCalls = 0;
    global.fetch = function (_url, opts) {
      const body = JSON.parse(opts.body);
      if (body.action === "load_pack") {
        return Promise.resolve({
          json: function () {
            return Promise.resolve({ ok: false, error: "load_failed" });
          },
        });
      }
      if (body.action === "save_pack") savePackCalls += 1;
      return Promise.resolve({
        json: function () {
          return Promise.resolve({ ok: true, saved: true });
        },
      });
    };
    prog.resetSession();
    return prog.load().then(function () {
      return prog.save({ progress_json: payload }).then(function (res2) {
        if (savePackCalls !== 0) fail("save after failed load should not post");
        if (!res2 || res2.error !== "not_loaded") fail("expected not_loaded after failed load");
      });
    });
  });
}

function testLargePayloadWhole() {
  resetSaveState();
  const big = makeLargeProgress(60000);
  if (big.length < 60000) fail("fixture should exceed 60k chars");

  global.fetch = function (_url, opts) {
    const body = JSON.parse(opts.body);
    if (body.action === "save_pack") {
      savePackCalls += 1;
      lastSaveProgressJson = body.progress_json;
    }
    return Promise.resolve({
      json: function () {
        return Promise.resolve({ ok: true, saved: true });
      },
    });
  };

  const inputParsed = JSON.parse(big);
  const inputKeyCount = Object.keys(inputParsed.sets.bigpack.winsA).length;

  return prog.save({ progress_json: big, screen: "set", pack_id: "bigpack" }).then(function () {
    if (savePackCalls !== 1) fail("expected one save_pack for large payload");
    if (lastSaveProgressJson.length < 60000) {
      fail("progress_json was truncated: sent " + lastSaveProgressJson.length + " chars");
    }
    if (lastSaveProgressJson.length <= 45000) {
      fail("progress_json still capped at 45k");
    }
    let parsed;
    try {
      parsed = JSON.parse(lastSaveProgressJson);
    } catch (e) {
      fail("saved progress_json is not valid JSON");
    }
    if (!parsed.sets || !parsed.sets.bigpack) fail("large payload missing pack data");
    const outKeys = Object.keys(parsed.sets.bigpack.winsA || {});
    if (outKeys.length !== inputKeyCount) {
      fail("word keys lost in save: " + outKeys.length + " vs " + inputKeyCount);
    }
  });
}

function run() {
  if (!hooks || !merge) fail("missing test hooks or merge");

  testMergeMaxAndEmptyServer();

  return testSaveGating()
    .then(function () {
      return testLargePayloadWhole();
    })
    .then(function () {
      console.log("PROGRESS_NOCUT_OK");
      process.exit(0);
    });
}

run().catch(function (e) {
  fail(String(e && e.message ? e.message : e));
});
