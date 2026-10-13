/**
 * Compact Word Master cloud progress and split oversized saves across AppProgress rows.
 * Scores live in StudentScoreIndex (note_score); pack blobs omit scoreRows.
 */
(function (root, factory) {
  var api = factory();
  if (root) root.MRJ_WM_packSave = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this), function () {
  "use strict";

  var PROGRAM = "word-master";
  var SHARD_PREFIX = PROGRAM + "@pack/";
  var SOFT_CHAR_LIMIT = 450000;

  function mapHasPositive(m) {
    m = m && typeof m === "object" ? m : {};
    var keys = Object.keys(m);
    for (var i = 0; i < keys.length; i++) {
      if (Number(m[keys[i]]) > 0) return true;
    }
    return false;
  }

  function isNonEmptyArray(a) {
    return Array.isArray(a) && a.length > 0;
  }

  function trimPack(p, aggressive) {
    if (!p || typeof p !== "object") return null;
    var out = {};
    if (p.title) out.title = String(p.title);
    if (mapHasPositive(p.winsA)) out.winsA = p.winsA;
    if (mapHasPositive(p.winsB)) out.winsB = p.winsB;
    if (mapHasPositive(p.winsC)) out.winsC = p.winsC;
    if (p.intro && Object.keys(p.intro).length) out.intro = p.intro;
    if (isNonEmptyArray(p.meetLock)) out.meetLock = p.meetLock.slice();
    if (Number(p.startNumber) >= 1) out.startNumber = Number(p.startNumber);
    if (p.testPassed && Object.keys(p.testPassed).length) out.testPassed = p.testPassed;
    if (p.tapmapKey) out.tapmapKey = String(p.tapmapKey);
    if (p.lastPlayedAt) out.lastPlayedAt = Number(p.lastPlayedAt) || 0;
    if (p.srsTrying) out.srsTrying = true;
    if (p.srsForever) out.srsForever = true;
    if (p.srsStage) out.srsStage = Number(p.srsStage) || 0;
    if (p.srsNextAt != null) out.srsNextAt = p.srsNextAt;
    if (p.final) out.final = p.final;
    if (p.check) out.check = p.check;
    if (isNonEmptyArray(p.finalMiss)) out.finalMiss = p.finalMiss.slice();
    if (!aggressive) {
      if (p.roundGames && Object.keys(p.roundGames).length) out.roundGames = p.roundGames;
      if (p.pathHeld && Object.keys(p.pathHeld).length) out.pathHeld = p.pathHeld;
    }
    if (p.externalPackSrc) out.externalPackSrc = String(p.externalPackSrc);
    if (!Object.keys(out).length) return null;
    return out;
  }

  function trimProgress(raw, aggressive) {
    var obj = raw && typeof raw === "object" ? raw : {};
    var out = { v: obj.v || 1 };
    if (obj.studentId) out.studentId = String(obj.studentId);
    if (obj.voice) out.voice = obj.voice;
    if (obj.voiceAt != null) out.voiceAt = Number(obj.voiceAt) || 0;
    if (obj.locale) out.locale = obj.locale;
    if (obj.studySize != null) out.studySize = obj.studySize;
    if (obj.testKind) out.testKind = obj.testKind;
    if (obj.currentPackId) out.currentPackId = String(obj.currentPackId);
    if (isNonEmptyArray(obj.packShardIds)) out.packShardIds = obj.packShardIds.slice();
    var sets = {};
    var src = obj.sets && typeof obj.sets === "object" ? obj.sets : {};
    Object.keys(src).forEach(function (pid) {
      var slim = trimPack(src[pid], aggressive);
      if (slim) sets[pid] = slim;
    });
    if (Object.keys(sets).length) out.sets = sets;
    return out;
  }

  function jsonByteLength(obj) {
    return JSON.stringify(obj).length;
  }

  function shardProgram(packId) {
    return SHARD_PREFIX + String(packId || "").trim();
  }

  function isShardProgram(program) {
    return String(program || "").indexOf(SHARD_PREFIX) === 0;
  }

  function packIdFromShardProgram(program) {
    var p = String(program || "");
    if (p.indexOf(SHARD_PREFIX) !== 0) return "";
    return p.slice(SHARD_PREFIX.length);
  }

  function packParts(progressObj, options) {
    options = options || {};
    var aggressive = !!options.aggressive;
    var forceSplit = !!options.forceSplit;
    var compact = trimProgress(progressObj, aggressive);
    var singleJson = JSON.stringify(compact);
    if (!forceSplit && singleJson.length <= SOFT_CHAR_LIMIT) {
      return [{ program: PROGRAM, progress_json: singleJson }];
    }
    return splitParts(compact, aggressive);
  }

  function splitParts(compact, aggressive) {
    var sets = compact.sets && typeof compact.sets === "object" ? compact.sets : {};
    var packIds = Object.keys(sets);
    var shell = {
      v: compact.v || 1,
      studentId: compact.studentId,
      voice: compact.voice,
      voiceAt: compact.voiceAt,
      locale: compact.locale,
      studySize: compact.studySize,
      testKind: compact.testKind,
      currentPackId: compact.currentPackId,
      packShardIds: packIds.slice(),
      sets: {},
    };
    var parts = [{ program: PROGRAM, progress_json: JSON.stringify(trimProgress(shell, aggressive)) }];
    packIds.forEach(function (pid) {
      var shardObj = trimProgress({ v: compact.v || 1, sets: { [pid]: sets[pid] } }, aggressive);
      parts.push({
        program: shardProgram(pid),
        progress_json: JSON.stringify(shardObj),
      });
    });
    return parts;
  }

  function mergeLoadedParts(mainJson, shardLoads) {
    var base = {};
    try {
      base = JSON.parse(String(mainJson || "{}"));
    } catch (e) {
      base = {};
    }
    if (!base || typeof base !== "object") base = { v: 1, sets: {} };
    if (!base.sets) base.sets = {};
    (shardLoads || []).forEach(function (row) {
      if (!row || !row.progress_json) return;
      var pid = packIdFromShardProgram(row.program);
      try {
        var obj = JSON.parse(String(row.progress_json));
        if (!obj || !obj.sets) return;
        if (pid && obj.sets[pid]) {
          base.sets[pid] = obj.sets[pid];
        } else {
          Object.keys(obj.sets).forEach(function (k) {
            base.sets[k] = obj.sets[k];
          });
        }
      } catch (e2) {}
    });
    delete base.packShardIds;
    return JSON.stringify(trimProgress(base, false));
  }

  function shardIdsFromShell(mainJson) {
    var base = {};
    try {
      base = JSON.parse(String(mainJson || "{}"));
    } catch (e) {
      return [];
    }
    if (!base || !isNonEmptyArray(base.packShardIds)) return [];
    return base.packShardIds.map(function (id) { return String(id); });
  }

  return {
    PROGRAM: PROGRAM,
    SHARD_PREFIX: SHARD_PREFIX,
    SOFT_CHAR_LIMIT: SOFT_CHAR_LIMIT,
    trimProgress: trimProgress,
    trimPack: trimPack,
    packParts: packParts,
    mergeLoadedParts: mergeLoadedParts,
    shardProgram: shardProgram,
    isShardProgram: isShardProgram,
    packIdFromShardProgram: packIdFromShardProgram,
    shardIdsFromShell: shardIdsFromShell,
    jsonByteLength: jsonByteLength,
  };
});
