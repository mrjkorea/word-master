/**
 * Teacher class progress (mrj-signin teacher_list_students / teacher_student_snapshot).
 * Server must merge word-master@scores when hasScoresShard (see plans/mrj-signin-teacher-snapshot-scores.md).
 */
(function (root, factory) {
  var api = factory();
  if (root) root.MRJ_WM_classProgress = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this), function () {
  "use strict";

  var PROGRAM = "word-master";
  var OPENABLE_SNAPSHOT_IDS = ["zz_test_mrjmetrics"];
  var PASS_PCT = 80;

  function studentKey(id) {
    return String(id || "").trim().toLowerCase().replace(/\s+/g, " ");
  }

  function canOpenStudentSnapshot(id) {
    var key = studentKey(id);
    for (var i = 0; i < OPENABLE_SNAPSHOT_IDS.length; i++) {
      if (studentKey(OPENABLE_SNAPSHOT_IDS[i]) === key) return true;
    }
    return false;
  }

  function wordIdsForPack(pack) {
    if (!pack || typeof pack !== "object") return [];
    var seen = {};
    var out = [];
    function add(id) {
      var k = String(id || "");
      if (!k || seen[k]) return;
      seen[k] = true;
      out.push(k);
    }
    if (Array.isArray(pack.meetLock)) pack.meetLock.forEach(add);
    Object.keys(pack.intro || {}).forEach(add);
    Object.keys(pack.winsA || {}).forEach(add);
    Object.keys(pack.winsB || {}).forEach(add);
    Object.keys(pack.winsC || {}).forEach(add);
    Object.keys(pack.testPassed || {}).forEach(add);
    return out;
  }

  function stepFlags(pack, wordId) {
    pack = pack || {};
    var intro = pack.intro || {};
    var wa = pack.winsA || {};
    var wb = pack.winsB || {};
    var wc = pack.winsC || {};
    var tp = pack.testPassed || {};
    var passed = Object.prototype.hasOwnProperty.call(tp, wordId) && Number(tp[wordId]) >= PASS_PCT;
    return {
      meet: !!intro[wordId],
      learn: (wa[wordId] || 0) >= 2,
      dict: (wb[wordId] || 0) >= 2,
      write: (wc[wordId] || 0) >= 2,
      test: passed,
    };
  }

  function rowsForPack(packId, pack, words) {
    var ids = wordIdsForPack(pack);
    var byId = {};
    (words || []).forEach(function (w) {
      if (w && w.id != null) byId[String(w.id)] = w;
    });
    return ids.map(function (id) {
      var w = byId[id] || { id: id, en: id };
      return {
        packId: packId,
        id: id,
        en: String(w.en || id),
        steps: stepFlags(pack, id),
      };
    });
  }

  function parseProgressJson(raw) {
    if (raw && typeof raw === "object") return raw;
    try {
      return JSON.parse(String(raw || "{}"));
    } catch (e) {
      return { v: 1, sets: {} };
    }
  }

  return {
    PROGRAM: PROGRAM,
    OPENABLE_SNAPSHOT_IDS: OPENABLE_SNAPSHOT_IDS,
    canOpenStudentSnapshot: canOpenStudentSnapshot,
    wordIdsForPack: wordIdsForPack,
    stepFlags: stepFlags,
    rowsForPack: rowsForPack,
    parseProgressJson: parseProgressJson,
    studentKey: studentKey,
  };
});
