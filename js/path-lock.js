/**
 * Student path lock. Step N+1 stays locked until step N is done for this round.
 * A step only moves locked → open. A new meetLock is a new round.
 */
(function (root, factory) {
  var api = factory();
  if (root) root.PathLock = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this), function () {
  var STEPS = ["intro", "A", "B", "C", "games", "test"];

  function roundKey(set) {
    var ids = [];
    if (set && Array.isArray(set.meetLock) && set.meetLock.length) ids = set.meetLock;
    return ids.join(",");
  }

  function playWordsOf(set) {
    if (!set) return [];
    var words = set.words || [];
    if (set.meetLock && set.meetLock.length) {
      var byId = {};
      words.forEach(function (w) {
        if (w && w.id != null) byId[w.id] = w;
      });
      var out = [];
      set.meetLock.forEach(function (id) {
        if (byId[id]) out.push(byId[id]);
      });
      return out;
    }
    return words.slice();
  }

  function defaultIntroDone(set) {
    var words = playWordsOf(set);
    if (!words.length) return false;
    var intro = (set && set.intro) || {};
    var key = words.map(function (w) { return w.id; }).join(",");
    if (!set || set.tapmapKey !== key) return false;
    for (var i = 0; i < words.length; i++) {
      if (!intro[words[i].id]) return false;
    }
    return true;
  }

  function defaultPartDone(words, wins) {
    wins = wins || {};
    if (!words || !words.length) return false;
    for (var i = 0; i < words.length; i++) {
      if ((wins[words[i].id] || 0) < 2) return false;
    }
    return true;
  }

  function defaultBucket(set, step) {
    if (!set) return {};
    if (step === "A") return set.winsA || {};
    if (step === "B") return set.winsB || {};
    return set.winsC || {};
  }

  function resolveOpts(opts) {
    opts = opts || {};
    return {
      introDone: opts.introDone || defaultIntroDone,
      playWords: opts.playWords || playWordsOf,
      partDone: opts.partDone || defaultPartDone,
      bucket: opts.bucket || defaultBucket,
      now: opts.now || function () { return Date.now(); },
    };
  }

  function book(set) {
    if (!set.roundGames || typeof set.roundGames !== "object") set.roundGames = {};
    return set.roundGames;
  }

  function latchFor(set, create) {
    if (!set.pathHeld || typeof set.pathHeld !== "object") {
      if (!create) return null;
      set.pathHeld = {};
    }
    var key = roundKey(set);
    if (!set.pathHeld[key]) {
      if (!create) return null;
      set.pathHeld[key] = {};
    }
    return set.pathHeld[key];
  }

  function gamesDone(set) {
    if (!set) return false;
    var key = roundKey(set);
    var saved = set.roundGames && set.roundGames[key];
    if (saved && saved.done === true) return true;
    if (set.roundGame && set.roundGame.done === true && set.roundGameKey === key) return true;
    return false;
  }

  function liveFlags(set, o) {
    var words = [];
    try { words = o.playWords(set) || []; } catch (e) { words = []; }
    var flags = { intro: false, A: false, B: false, C: false, games: gamesDone(set) };
    if (!words.length) return flags;
    try { flags.intro = !!o.introDone(set); } catch (e1) { flags.intro = false; }
    try { flags.A = !!o.partDone(words, o.bucket(set, "A")); } catch (e2) { flags.A = false; }
    try { flags.B = !!o.partDone(words, o.bucket(set, "B")); } catch (e3) { flags.B = false; }
    try { flags.C = !!o.partDone(words, o.bucket(set, "C")); } catch (e4) { flags.C = false; }
    return flags;
  }

  function hold(set, opts) {
    var empty = { intro: false, A: false, B: false, C: false, games: false, test: false };
    if (!set) return empty;
    var o;
    try { o = resolveOpts(opts); } catch (e) { return empty; }
    var live = liveFlags(set, o);
    var latch = latchFor(set, true);
    if (live.intro) latch.intro = true;
    if (live.A) latch.A = true;
    if (live.B) latch.B = true;
    if (live.C) latch.C = true;
    if (live.games) latch.games = true;
    var games = !!latch.games;
    return {
      intro: !!latch.intro,
      A: !!latch.A,
      B: !!latch.B,
      C: !!latch.C,
      games: games,
      test: games,
    };
  }

  function can(set, step, opts) {
    var locked = { ok: false, why: "locked", need: "intro" };
    if (!set) return locked;
    var idx = STEPS.indexOf(step);
    if (idx < 0) return locked;
    var done;
    try { done = hold(set, opts); } catch (e) { return locked; }
    for (var i = 0; i < idx; i++) {
      if (!done[STEPS[i]]) return { ok: false, why: "locked", need: STEPS[i] };
    }
    return { ok: true, why: "ok", need: "" };
  }

  function next(set, opts) {
    var done = hold(set, opts);
    for (var i = 0; i < STEPS.length; i++) {
      if (!done[STEPS[i]]) return STEPS[i];
    }
    return null;
  }

  function markGameDone(set, kind, opts) {
    if (!set) return null;
    var o = resolveOpts(opts);
    var key = roundKey(set);
    var at = 0;
    try { at = o.now(); } catch (e) { at = Date.now(); }
    var rec = { done: true, game: kind == null ? "" : String(kind), at: at };
    book(set)[key] = { done: true, game: rec.game, at: rec.at };
    set.roundGame = { done: true, game: rec.game, at: rec.at };
    set.roundGameKey = key;
    var latch = latchFor(set, true);
    latch.games = true;
    return set.roundGame;
  }

  function syncRound(set) {
    if (!set) return;
    var key = roundKey(set);
    set.roundGameKey = key;
    var saved = set.roundGames && set.roundGames[key];
    if (saved && saved.done === true) {
      set.roundGame = { done: true, game: saved.game || "", at: saved.at || 0 };
    } else {
      set.roundGame = { done: false, game: "", at: 0 };
    }
  }

  function isTeacher(search, saved) {
    try {
      if (search == null) search = "";
      search = String(search);
      var q = search.charAt(0) === "?" ? search.slice(1) : search;
      var hasMode = false;
      var modeVal = "";
      var teacherParam = false;
      if (q) {
        var parts = q.split("&");
        for (var i = 0; i < parts.length; i++) {
          var part = parts[i];
          if (!part) continue;
          var eq = part.indexOf("=");
          var k = eq < 0 ? part : part.slice(0, eq);
          var v = eq < 0 ? "" : part.slice(eq + 1);
          try {
            k = decodeURIComponent(k.replace(/\+/g, " "));
            v = decodeURIComponent(v.replace(/\+/g, " "));
          } catch (e1) {
            return false;
          }
          if (k === "mode") {
            hasMode = true;
            modeVal = v;
          }
          if (k === "teacher" && (v === "1" || v === "true")) teacherParam = true;
        }
      }
      if (hasMode) return modeVal === "teacher";
      if (teacherParam) return true;
      return saved === "teacher";
    } catch (e2) {
      return false;
    }
  }

  return {
    STEPS: STEPS,
    hold: hold,
    can: can,
    next: next,
    markGameDone: markGameDone,
    syncRound: syncRound,
    isTeacher: isTeacher,
    roundKey: roundKey,
  };
});
