#!/usr/bin/env node
"use strict";

const fs = require("fs");
const { readBuild, cacheKey, srcAt } = require("./build_id.js");
const path = require("path");

const BUILD = readBuild();
const MRJ_SCORES_CACHE = "20261013-scoresrecv";
const TEST_STUDENT = "zz_test_mrjmetrics";

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

const root = path.join(__dirname, "..");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const version = JSON.parse(fs.readFileSync(path.join(root, "version.json"), "utf8"));
if (version.build !== BUILD) fail("version.json build mismatch");
if (index.indexOf('WM_BUILD_ID="' + BUILD + '"') === -1) fail("WM_BUILD_ID mismatch");
if (index.indexOf("js/app.js?v=" + BUILD) === -1) fail("app.js cache mismatch");
if (!cacheKey(index, "js/progress.js")) fail("progress.js cache mismatch");
if (index.indexOf("mrj-scores.js?v=" + MRJ_SCORES_CACHE) === -1) fail("mrj-scores.js cache mismatch");

const noteScores = [];
const scorePosts = [];
let fetchCalls = 0;

function installGlobals(studentId) {
  global.fetch = function () {
    fetchCalls += 1;
    return Promise.reject(new Error("network blocked in test"));
  };
  global.MRJ_AUTH = {
    student: function () { return studentId; },
    token: function () { return "test-token"; },
    noteScore: function (opts) {
      noteScores.push(Object.assign({}, opts));
      return Promise.resolve({ ok: true });
    },
  };
}

function resetScoreMocks() {
  noteScores.length = 0;
  scorePosts.length = 0;
  fetchCalls = 0;
}

function assertNoBadZero(call, label) {
  if (!call) return;
  const v = call.scoreValue;
  const max = call.scoreMax;
  if (v === 0 && (max == null || max === "" || !isFinite(Number(max)))) {
    fail(label + " has scoreValue 0 without a real total");
  }
}

function expectOnePair(itemId, score, max, pct) {
  if (noteScores.length !== 1) fail("expected one noteScore, got " + noteScores.length);
  if (scorePosts.length !== 1) fail("expected one MRJ_SCORES.post, got " + scorePosts.length);
  const ns = noteScores[0];
  const sp = scorePosts[0];
  if (ns.itemId !== itemId || sp.itemId !== itemId) {
    fail("itemId mismatch ns=" + ns.itemId + " sp=" + sp.itemId);
  }
  if (ns.scoreValue !== score || ns.scoreMax !== max || ns.scorePct !== pct) {
    fail("noteScore fields " + JSON.stringify(ns));
  }
  if (sp.scoreValue !== score || sp.scoreMax !== max) {
    fail("post fields " + JSON.stringify(sp));
  }
  if (!/^\d{4}-\d\d-\d\d$/.test(String(ns.localDate || ""))) {
    fail("noteScore localDate " + ns.localDate);
  }
  assertNoBadZero(ns, "noteScore");
  assertNoBadZero(sp, "post");
}

function wordsOf(n) {
  const words = [];
  for (let i = 1; i <= n; i++) words.push({ id: "w" + i, en: "word" + i, ko: "ko" + i });
  return words;
}

function readySet(packId, n) {
  const set = {
    id: "set_" + packId,
    packId: packId,
    title: packId,
    words: wordsOf(n),
    meetLock: wordsOf(n).map(function (w) { return w.id; }),
    intro: {},
    winsA: {},
    winsB: {},
    winsC: {},
  };
  set.meetLock.forEach(function (id) { set.intro[id] = true; });
  set.meetLock.forEach(function (id) {
    set.winsA[id] = 2;
    set.winsB[id] = 2;
    set.winsC[id] = 2;
  });
  return set;
}

function bootStudentApp() {
  installGlobals(TEST_STUDENT);
  delete require.cache[require.resolve("../mrj-scores.js")];
  delete require.cache[require.resolve("../js/progress-merge.js")];
  delete require.cache[require.resolve("../js/progress.js")];
  delete require.cache[require.resolve("../js/app.js")];
  delete require.cache[require.resolve("./load_app_for_test.js")];
  const { bootApp } = require("./load_app_for_test.js");
  const api = bootApp({ mode: "student" });
  global.MRJ_SCORES.post = function (opts) {
    scorePosts.push(Object.assign({}, opts));
    return Promise.resolve({ status: "mock" });
  };
  return api;
}

const packId = "nouns100";

function withReadyApi() {
  const api = bootStudentApp();
  api.activateSet(readySet(packId, 10));
  api.markRoundGameDone("match");
  return api;
}

resetScoreMocks();
let api = withReadyApi();
api.startEasy();
let quiz = api.getQuiz();
quiz.score = 7;
quiz.mistakes = [{ id: "w1", en: "word1", ko: "ko1" }];
api.finishQuiz();
expectOnePair(packId + ":test_easy", 7, 10, 70);

resetScoreMocks();
api = withReadyApi();
api.startHard();
quiz = api.getQuiz();
quiz.score = 9;
quiz.mistakes = [];
api.finishQuiz();
expectOnePair(packId + ":test_hard", 9, 10, 90);

resetScoreMocks();
api = withReadyApi();
api.startEasy(true);
quiz = api.getQuiz();
quiz.score = 8;
quiz.mistakes = [];
api.finishQuiz();
expectOnePair(packId + ":final", 8, 10, 80);

resetScoreMocks();
api = withReadyApi();
api.armGame("leapfrog");
api.deliverGameDone({
  type: "mrj-wm-game-done",
  game: "leapfrog",
  finished: true,
  correct: 4,
  items: 5,
});
expectOnePair(packId + ":game_leapfrog", 4, 5, 80);

resetScoreMocks();
api = bootStudentApp();
const prog = global.MRJ_WM_progress;
prog.__testHooks.markSessionReady();
prog
  .save({
    progress_json: JSON.stringify(api.slimProgress()),
    screen: "learn",
    pack_id: packId,
  })
  .then(function () {
    if (noteScores.length !== 0 || scorePosts.length !== 0) {
      fail("routine save should not post scores");
    }

    resetScoreMocks();
    installGlobals("");
    delete require.cache[require.resolve("./load_app_for_test.js")];
    delete require.cache[require.resolve("../js/app.js")];
    const { bootApp } = require("./load_app_for_test.js");
    const signedOut = bootApp({ mode: "student" });
    global.MRJ_SCORES.post = function (opts) {
      scorePosts.push(Object.assign({}, opts));
      return Promise.resolve({ status: "mock" });
    };
    signedOut.activateSet(readySet(packId, 10));
    signedOut.markRoundGameDone("match");
    signedOut.startEasy();
    quiz = signedOut.getQuiz();
    quiz.score = 5;
    quiz.mistakes = [];
    signedOut.finishQuiz();
    if (noteScores.length !== 0 || scorePosts.length !== 0) {
      fail("signed-out finishQuiz must not post scores");
    }

    noteScores.forEach(function (c, i) { assertNoBadZero(c, "noteScore#" + i); });
    scorePosts.forEach(function (c, i) { assertNoBadZero(c, "post#" + i); });

    console.log("SCORE_LOG_OK");
    process.exit(0);
  })
  .catch(function (err) {
    fail(String(err && err.message ? err.message : err));
  });
