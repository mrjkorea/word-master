/**
 * Teacher-granted unlocks for Word Master (stored in student progress / cloud pack save).
 * A section is open when WM_TEMP_UNLOCK_ALL (js/temp-unlock-all.js) OR normal progress OR teacher unlock.
 */
(function (root, factory) {
  var api = factory();
  if (root) root.WMTeacherStart = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this), function () {
  "use strict";

  var PATH_STEPS = ["intro", "A", "B", "C", "games", "test"];

  function tempUnlockAll() {
    try {
      var g = typeof window !== "undefined" ? window : null;
      return !!(g && g.WM_TEMP_UNLOCK_ALL);
    } catch (e) {
      return false;
    }
  }

  function globalRef() {
    return typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this);
  }

  function alignedStart(startNumber) {
    var SS = globalRef().StartSlice;
    if (SS && typeof SS.alignedStart === "function") {
      return SS.alignedStart(startNumber);
    }
    var start = Math.floor(Number(startNumber));
    if (!(start >= 1)) return 1;
    return Math.floor((start - 1) / 5) * 5 + 1;
  }

  function normPackUnlock(raw) {
    if (!raw || typeof raw !== "object") return { startAt: null, groups: {}, steps: {} };
    var groups = {};
    var steps = {};
    if (raw.groups && typeof raw.groups === "object") {
      Object.keys(raw.groups).forEach(function (k) {
        if (raw.groups[k]) groups[String(k)] = true;
      });
    }
    if (raw.steps && typeof raw.steps === "object") {
      Object.keys(raw.steps).forEach(function (k) {
        if (raw.steps[k]) steps[String(k)] = true;
      });
    }
    var startAt = Number(raw.startAt);
    return {
      startAt: startAt >= 1 ? alignedStart(startAt) : null,
      groups: groups,
      steps: steps,
    };
  }

  function packUnlock(set) {
    if (!set) return normPackUnlock(null);
    return normPackUnlock(set.teacherUnlock);
  }

  function ensurePackUnlock(set) {
    if (!set) return normPackUnlock(null);
    if (!set.teacherUnlock || typeof set.teacherUnlock !== "object") {
      set.teacherUnlock = { startAt: null, groups: {}, steps: {} };
    }
    var u = normPackUnlock(set.teacherUnlock);
    set.teacherUnlock.startAt = u.startAt;
    set.teacherUnlock.groups = u.groups;
    set.teacherUnlock.steps = u.steps;
    return u;
  }

  function mergePackUnlock(a, b) {
    a = normPackUnlock(a);
    b = normPackUnlock(b);
    var groups = {};
    var steps = {};
    Object.keys(a.groups).forEach(function (k) { groups[k] = true; });
    Object.keys(b.groups).forEach(function (k) { groups[k] = true; });
    Object.keys(a.steps).forEach(function (k) { steps[k] = true; });
    Object.keys(b.steps).forEach(function (k) { steps[k] = true; });
    var startAt = a.startAt != null ? a.startAt : b.startAt;
    return { startAt: startAt, groups: groups, steps: steps };
  }

  function normRootUnlock(raw) {
    var packs = {};
    if (raw && raw.packs && typeof raw.packs === "object") {
      Object.keys(raw.packs).forEach(function (pid) {
        if (raw.packs[pid]) packs[String(pid)] = true;
      });
    }
    return { packs: packs };
  }

  function mergeRootUnlock(a, b) {
    a = normRootUnlock(a);
    b = normRootUnlock(b);
    var packs = {};
    Object.keys(a.packs).forEach(function (k) { packs[k] = true; });
    Object.keys(b.packs).forEach(function (k) { packs[k] = true; });
    return { packs: packs };
  }

  function groupStartsForWords(words) {
    words = Array.isArray(words) ? words : [];
    var total = words.length;
    var out = [];
    for (var n = 1; n <= total; n = n + 5) out.push(n);
    return out;
  }

  function isGroupUnlocked(set, startNumber) {
    if (tempUnlockAll()) return true;
    var aligned = alignedStart(startNumber);
    if (aligned <= 1) return true;
    var u = packUnlock(set);
    return !!u.groups[String(aligned)];
  }

  function isPathStepUnlocked(set, step) {
    if (tempUnlockAll()) return true;
    if (!step) return false;
    var u = packUnlock(set);
    return !!u.steps[String(step)];
  }

  function isPackLevelUnlocked(packId, rootUnlock, isPackCleared) {
    return curriculumPackOpen(packId, rootUnlock, isPackCleared);
  }

  /** data-step on home pack tiles: open when every lower step pack is cleared or teacher unlocked. */
  function packCurriculumStep(packId) {
    if (!packId || typeof document === "undefined") return 1;
    var el = document.querySelector('.pack-tile[data-pack="' + packId + '"]');
    if (!el) return 1;
    var n = Number(el.getAttribute("data-step"));
    return n >= 1 ? n : 1;
  }

  function curriculumPackOpen(packId, rootUnlock, isPackCleared) {
    if (tempUnlockAll()) return true;
    rootUnlock = normRootUnlock(rootUnlock);
    if (rootUnlock.packs[String(packId)]) return true;
    var step = packCurriculumStep(packId);
    if (step <= 1) return true;
    isPackCleared = typeof isPackCleared === "function" ? isPackCleared : function () { return false; };
    var tiles = typeof document !== "undefined"
      ? document.querySelectorAll(".pack-tile[data-pack][data-step]")
      : [];
    for (var i = 0; i < tiles.length; i++) {
      var tile = tiles[i];
      var otherStep = Number(tile.getAttribute("data-step"));
      if (!(otherStep > 0 && otherStep < step)) continue;
      var otherId = tile.getAttribute("data-pack");
      if (!otherId) continue;
      if (rootUnlock.packs[String(otherId)]) continue;
      if (!isPackCleared(otherId)) return false;
    }
    return true;
  }

  function unlockGroupOnly(set, startNumber) {
    if (!set) return null;
    var aligned = alignedStart(startNumber);
    ensurePackUnlock(set);
    set.teacherUnlock.groups[String(aligned)] = true;
    return aligned;
  }

  function unlockGroup(set, startNumber) {
    var aligned = unlockGroupOnly(set, startNumber);
    if (aligned != null) set.teacherUnlock.startAt = aligned;
    return aligned;
  }

  function relockGroup(set, startNumber) {
    if (!set) return;
    var aligned = alignedStart(startNumber);
    ensurePackUnlock(set);
    delete set.teacherUnlock.groups[String(aligned)];
    if (Number(set.teacherUnlock.startAt) === aligned) {
      var keys = Object.keys(set.teacherUnlock.groups).map(Number).filter(function (x) { return x >= 1; });
      set.teacherUnlock.startAt = keys.length ? Math.min.apply(null, keys) : null;
    }
  }

  function unlockPathStep(set, step) {
    if (!set || !step) return;
    ensurePackUnlock(set);
    set.teacherUnlock.steps[String(step)] = true;
  }

  function relockPathStep(set, step) {
    if (!set || !step) return;
    ensurePackUnlock(set);
    delete set.teacherUnlock.steps[String(step)];
  }

  function unlockPackLevel(rootUnlock, packId) {
    rootUnlock = normRootUnlock(rootUnlock);
    rootUnlock.packs[String(packId)] = true;
    return rootUnlock;
  }

  function relockPackLevel(rootUnlock, packId) {
    rootUnlock = normRootUnlock(rootUnlock);
    delete rootUnlock.packs[String(packId)];
    return rootUnlock;
  }

  function listOpenSections(set, rootUnlock) {
    var u = packUnlock(set);
    var groups = Object.keys(u.groups).map(Number).sort(function (a, b) { return a - b; });
    var steps = PATH_STEPS.filter(function (s) { return !!u.steps[s]; });
    var packs = Object.keys(normRootUnlock(rootUnlock).packs);
    return { groups: groups, steps: steps, packs: packs, startAt: u.startAt };
  }

  return {
    PATH_STEPS: PATH_STEPS,
    tempUnlockAll: tempUnlockAll,
    alignedStart: alignedStart,
    normPackUnlock: normPackUnlock,
    mergePackUnlock: mergePackUnlock,
    normRootUnlock: normRootUnlock,
    mergeRootUnlock: mergeRootUnlock,
    groupStartsForWords: groupStartsForWords,
    isGroupUnlocked: isGroupUnlocked,
    isPathStepUnlocked: isPathStepUnlocked,
    isPackLevelUnlocked: isPackLevelUnlocked,
    curriculumPackOpen: curriculumPackOpen,
    packCurriculumStep: packCurriculumStep,
    unlockGroup: unlockGroup,
    unlockGroupOnly: unlockGroupOnly,
    relockGroup: relockGroup,
    unlockPathStep: unlockPathStep,
    relockPathStep: relockPathStep,
    unlockPackLevel: unlockPackLevel,
    relockPackLevel: relockPackLevel,
    listOpenSections: listOpenSections,
  };
});
