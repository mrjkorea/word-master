/**
 * Pack flags for student packs, read from the pack JSON itself.
 *
 *   "noPictures": true        no picture step and no picture slot anywhere
 *   "startAt": "dictation"    first step for the student; earlier steps count as done
 *   "uiLang": "ko"            Korean interface; the language picker is hidden
 *   "kind": "sentence"        one English sentence plus Korean per card; no Match game
 *
 * Used by mrj-pack packs (Middle School Tests) and any pack that carries the flags.
 * Nothing here changes a pack that has no flags.
 */
(function (root, factory) {
  var api = factory();
  if (root) root.PackFlags = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this), function () {
  "use strict";

  var ORDER = ["intro", "A", "B", "C", "games", "test"];
  var BY_NAME = {
    meet: "intro", intro: "intro", picture: "intro", pictures: "intro",
    learn: "A", a: "A",
    dictation: "B", dictate: "B", spelling: "B", b: "B",
    write: "C", writing: "C", c: "C",
    games: "games", game: "games",
    test: "test",
  };

  function empty() {
    return { noPictures: false, startAt: "", uiLang: "", sentence: false };
  }

  function truthy(v) {
    if (v === true || v === 1) return true;
    return /^(true|yes|1|on)$/i.test(String(v == null ? "" : v).trim());
  }

  function read(data) {
    if (!data || typeof data !== "object") return empty();
    var kind = String(data.kind || "").trim().toLowerCase();
    var start = BY_NAME[String(data.startAt || "").trim().toLowerCase()] || "";
    if (start === "intro") start = "";
    var lang = String(data.uiLang || "").trim();
    if (lang && !/^[a-z]{2,3}(-[A-Za-z]{2,4})?$/.test(lang)) lang = "";
    return {
      noPictures: truthy(data.noPictures),
      startAt: start,
      uiLang: lang,
      sentence: kind === "sentence" || kind === "sentences" || kind === "reading",
    };
  }

  function any(flags) {
    return !!(flags && (flags.noPictures || flags.startAt || flags.uiLang || flags.sentence));
  }

  /** True when the student path must not use this step for this pack. */
  function skips(flags, step) {
    if (!flags) return false;
    var idx = ORDER.indexOf(step);
    if (idx < 0) return false;
    if (flags.noPictures && step === "intro") return true;
    if (flags.startAt) {
      var startIdx = ORDER.indexOf(flags.startAt);
      if (startIdx > 0 && idx < startIdx) return true;
    }
    if (flags.sentence && step === "games") return true;
    return false;
  }

  /** First step the student sees. */
  function firstStep(flags) {
    if (flags && flags.startAt) return flags.startAt;
    if (flags && flags.noPictures) return "A";
    return "intro";
  }

  return {
    ORDER: ORDER,
    read: read,
    empty: empty,
    any: any,
    skips: skips,
    firstStep: firstStep,
  };
});
