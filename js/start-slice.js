/**
 * Student-chosen start word and batch size.
 * Green seats come from testPassed or a finished learn cycle. Failing later never clears testPassed.
 */
(function (root, factory) {
  var api = factory();
  if (root) root.StartSlice = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this), function () {
  var PASS_PCT = 80;

  function sliceFrom(words, startNumber, count) {
    words = Array.isArray(words) ? words : [];
    var total = words.length;
    var start = Math.floor(Number(startNumber));
    if (!(start >= 1)) start = 1;
    var n = Math.floor(Number(count));
    if (!(n >= 0)) n = 0;
    if (!total) return { startNumber: start, ids: [], words: [] };
    if (start > total) start = total;
    var slice = words.slice(start - 1, start - 1 + n);
    return {
      startNumber: start,
      ids: slice.map(function (w) { return w.id; }),
      words: slice,
    };
  }

  function isGreen(word, set) {
    if (!word || !set || word.id == null) return false;
    var id = word.id;
    var passed = set.testPassed;
    if (passed && Object.prototype.hasOwnProperty.call(passed, id) && Number(passed[id]) >= PASS_PCT) {
      return true;
    }
    var intro = set.intro || {};
    if (!intro[id]) return false;
    var winsA = set.winsA || {};
    var winsB = set.winsB || {};
    var winsC = set.winsC || {};
    return (winsA[id] || 0) >= 2 && (winsB[id] || 0) >= 2 && (winsC[id] || 0) >= 2;
  }

  function markPassed(set, ids, pct) {
    if (!set) return;
    var n = Number(pct);
    if (!(n >= PASS_PCT)) return;
    if (!set.testPassed || typeof set.testPassed !== "object") set.testPassed = {};
    (ids || []).forEach(function (id) {
      if (id == null || id === "") return;
      set.testPassed[id] = n;
    });
  }

  return {
    PASS_PCT: PASS_PCT,
    sliceFrom: sliceFrom,
    isGreen: isGreen,
    markPassed: markPassed,
  };
});
