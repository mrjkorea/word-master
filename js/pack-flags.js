/**
 * Pack flags for student packs, read from the pack JSON itself.
 *
 *   "noPictures": true        no picture step and no picture slot anywhere
 *   "startAt": "dictation"    first step for the student; earlier steps count as done
 *   "steps": ["dictation","writing","test"]        the only steps this pack has
 *   "skipSteps": ["meet","learn","match"]          steps this pack must not show
 *   "uiLang": "ko"            Korean interface; the language picker is hidden
 *   "langs": ["en","ko"]      the only interface languages allowed
 *   "tts": true              no mp3 files: speak with the device English voice
 *   "kind": "sentence"        one English sentence plus Korean per card; no Match game
 *
 * Used by the mrj-pack packs (Middle School Tests) and any pack that carries the flags.
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
    meet: "intro", meets: "intro", intro: "intro", picture: "intro", pictures: "intro", "meet the words": "intro",
    learn: "A", learning: "A", a: "A",
    dictation: "B", dictate: "B", spelling: "B", b: "B",
    write: "C", writing: "C", c: "C",
    games: "games", game: "games", match: "games",
    test: "test", tests: "test", quiz: "test",
  };

  function empty() {
    return { noPictures: false, startAt: "", uiLang: "", sentence: false, allow: [], skip: [], langs: [], tts: false };
  }

  function truthy(v) {
    if (v === true || v === 1) return true;
    return /^(true|yes|1|on)$/i.test(String(v == null ? "" : v).trim());
  }

  function stepList(v) {
    if (!v) return [];
    var raw = Array.isArray(v) ? v : String(v).split(/[,\s]+/);
    var out = [];
    raw.forEach(function (name) {
      var step = BY_NAME[String(name || "").trim().toLowerCase()] || "";
      if (step && out.indexOf(step) < 0) out.push(step);
    });
    return out.sort(function (x, y) { return ORDER.indexOf(x) - ORDER.indexOf(y); });
  }

  function langList(v) {
    if (!v) return [];
    var raw = Array.isArray(v) ? v : String(v).split(/[,\s]+/);
    var out = [];
    raw.forEach(function (code) {
      var c = String(code || "").trim();
      if (/^[a-z]{2,3}(-[A-Za-z]{2,4})?$/.test(c) && out.indexOf(c) < 0) out.push(c);
    });
    return out;
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
      allow: stepList(data.steps),
      skip: stepList(data.skipSteps),
      langs: langList(data.langs),
      tts: truthy(data.tts),
    };
  }

  function any(flags) {
    return !!(flags && (flags.noPictures || flags.startAt || flags.uiLang || flags.sentence || flags.tts
      || (flags.allow && flags.allow.length) || (flags.skip && flags.skip.length)
      || (flags.langs && flags.langs.length)));
  }

  /** A pack with no mp3 files says so with tts, or is a noPictures pack as before. */
  function usesDeviceSpeech(flags) {
    if (!flags) return false;
    return !!(flags.tts || flags.noPictures);
  }

  /** True when the student path must not use this step for this pack.
   *  A word pack always keeps Meet the Words (intro) and Learn (A).
   *  A sentence pack keeps the short path. */
  function skips(flags, step) {
    if (!flags) return false;
    var idx = ORDER.indexOf(step);
    if (idx < 0) return false;
    if (!flags.sentence && (step === "intro" || step === "A")) return false;
    if (flags.skip && flags.skip.indexOf(step) >= 0) return true;
    if (flags.allow && flags.allow.length && flags.allow.indexOf(step) < 0) return true;
    if (flags.noPictures && step === "intro") return true;
    if (flags.startAt) {
      var startIdx = ORDER.indexOf(flags.startAt);
      if (startIdx > 0 && idx < startIdx) return true;
    }
    if (flags.sentence && step === "games"
      && !(flags.allow && flags.allow.indexOf("games") >= 0)) return true;
    return false;
  }

  /** First step the student sees. A word pack always starts at Meet the Words. */
  function firstStep(flags) {
    if (!flags || !flags.sentence) return "intro";
    if (flags.startAt) return flags.startAt;
    if (flags.allow && flags.allow.length) {
      for (var i = 0; i < ORDER.length; i++) {
        if (flags.allow.indexOf(ORDER[i]) >= 0) return ORDER[i];
      }
    }
    if (flags.noPictures) return "A";
    return "intro";
  }

  /** The interface language this pack asks for, or "". */
  function language(flags) {
    if (!flags) return "";
    if (flags.uiLang) return flags.uiLang;
    if (flags.langs && flags.langs.length) {
      if (flags.langs.indexOf("ko") >= 0) return "ko";
      return flags.langs[0];
    }
    return "";
  }

  /** True when the pack fixes the language, so no picker is shown. */
  function langLocked(flags) {
    if (!flags) return false;
    if (language(flags)) return true;
    return !!(flags.langs && flags.langs.length && flags.langs.length <= 2);
  }

  function langAllowed(flags, code) {
    if (!flags || !flags.langs || !flags.langs.length) return true;
    return flags.langs.indexOf(code) >= 0;
  }

  return {
    ORDER: ORDER,
    read: read,
    empty: empty,
    any: any,
    skips: skips,
    firstStep: firstStep,
    language: language,
    langLocked: langLocked,
    langAllowed: langAllowed,
    usesDeviceSpeech: usesDeviceSpeech,
  };
});
