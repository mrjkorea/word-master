/**
 * Compact Word Master cloud progress and split oversized saves across AppProgress rows.
 * Pack shards: word-master@pack/<packId>. Score history: word-master@scores (never dropped).
 */
(function (root, factory) {
  var api = factory();
  if (root) root.MRJ_WM_packSave = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this), function () {
  "use strict";

  var PROGRAM = "word-master";
  var SHARD_PREFIX = PROGRAM + "@pack/";
  var SCORES_PROGRAM = PROGRAM + "@scores";
  var SOFT_CHAR_LIMIT = 450000;
  /** Keep newest rows only so the scores shard stays under AppProgress limits. */
  var SCORE_ROWS_MAX = 800;

  function globalRoot() {
    return typeof window !== "undefined"
      ? window
      : typeof globalThis !== "undefined"
        ? globalThis
        : this;
  }

  function mergeScoreRows(a, b) {
    var mergeFn = globalRoot().MRJ_WM_mergeScoreRows;
    if (mergeFn) return mergeFn(a, b);
    var rows = (Array.isArray(a) ? a : []).concat(Array.isArray(b) ? b : []);
    return rows;
  }

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

  function trimProgress(raw, aggressive, scoreRows) {
    var obj = raw && typeof raw === "object" ? raw : {};
    var out = { v: obj.v || 1 };
    if (obj.studentId) out.studentId = String(obj.studentId);
    if (obj.voice) out.voice = obj.voice;
    if (obj.voiceAt != null) out.voiceAt = Number(obj.voiceAt) || 0;
    if (obj.locale) out.locale = obj.locale;
    if (obj.localeAt != null) out.localeAt = Number(obj.localeAt) || 0;
    if (obj.studySize != null) out.studySize = obj.studySize;
    if (obj.testKind) out.testKind = obj.testKind;
    if (obj.currentPackId) out.currentPackId = String(obj.currentPackId);
    if (isNonEmptyArray(obj.packShardIds)) out.packShardIds = obj.packShardIds.slice();
    if (obj.hasScoresShard) out.hasScoresShard = true;
    if (scoreRows && scoreRows.length) out.scoreRows = scoreRows;
    if (obj.dailyWordLog && obj.dailyWordLog.days && Object.keys(obj.dailyWordLog.days).length) {
      out.dailyWordLog = obj.dailyWordLog;
    }
    var sets = {};
    var src = obj.sets && typeof obj.sets === "object" ? obj.sets : {};
    Object.keys(src).forEach(function (pid) {
      var slim = trimPack(src[pid], aggressive);
      if (slim) sets[pid] = slim;
    });
    if (Object.keys(sets).length) out.sets = sets;
    return out;
  }

  function capScoreRows(rows) {
    rows = Array.isArray(rows) ? rows : [];
    if (rows.length <= SCORE_ROWS_MAX) return rows;
    return rows.slice(0, SCORE_ROWS_MAX);
  }

  function mergedScoreRowsForSave(progressObj, serverScoreRows) {
    var local = progressObj && Array.isArray(progressObj.scoreRows) ? progressObj.scoreRows : [];
    var server = Array.isArray(serverScoreRows) ? serverScoreRows : [];
    return capScoreRows(mergeScoreRows(local, server));
  }

  function packShardPart(packId, mergedObj, aggressive) {
    var v = (mergedObj && mergedObj.v) || 1;
    var sets = mergedObj && mergedObj.sets && typeof mergedObj.sets === "object" ? mergedObj.sets : {};
    var slimSets = {};
    if (sets[packId]) {
      var slim = trimPack(sets[packId], !!aggressive);
      if (slim) slimSets[packId] = slim;
    }
    var shardObj = trimProgress({ v: v, sets: slimSets }, !!aggressive, null);
    return {
      program: shardProgram(packId),
      progress_json: JSON.stringify(shardObj),
    };
  }

  function scoresShardPart(mergedObj) {
    var rows = capScoreRows(
      mergedObj && Array.isArray(mergedObj.scoreRows) ? mergedObj.scoreRows : []
    );
    return {
      program: SCORES_PROGRAM,
      progress_json: JSON.stringify({ v: (mergedObj && mergedObj.v) || 1, scoreRows: rows }),
    };
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

  function isScoresProgram(program) {
    return String(program || "") === SCORES_PROGRAM;
  }

  function packIdFromShardProgram(program) {
    var p = String(program || "");
    if (p.indexOf(SHARD_PREFIX) !== 0) return "";
    return p.slice(SHARD_PREFIX.length);
  }

  function orderPartsForSave(parts) {
    var shell = [];
    var rest = [];
    (parts || []).forEach(function (part) {
      if (part && part.program === PROGRAM) shell.push(part);
      else rest.push(part);
    });
    return rest.concat(shell);
  }

  function packParts(progressObj, options) {
    options = options || {};
    var aggressive = !!options.aggressive;
    var forceSplit = !!options.forceSplit;
    var allowSplit = options.allowSplit !== false;
    var scoreRows = mergedScoreRowsForSave(progressObj, options.serverScoreRows);
    var bodyNoScores = trimProgress(progressObj, aggressive, null);

    if (!allowSplit) {
      var monolith = trimProgress(progressObj, aggressive, scoreRows);
      return [{ program: PROGRAM, progress_json: JSON.stringify(monolith) }];
    }

    var singleBody = trimProgress(progressObj, aggressive, scoreRows);
    var singleJson = JSON.stringify(singleBody);
    if (!forceSplit && singleJson.length <= SOFT_CHAR_LIMIT) {
      return [{ program: PROGRAM, progress_json: singleJson }];
    }
    return orderPartsForSave(splitParts(bodyNoScores, aggressive, scoreRows));
  }

  function splitParts(compact, aggressive, scoreRows) {
    var sets = compact.sets && typeof compact.sets === "object" ? compact.sets : {};
    var packIds = Object.keys(sets);
    var parts = [];
    packIds.forEach(function (pid) {
      var shardObj = trimProgress({ v: compact.v || 1, sets: { [pid]: sets[pid] } }, aggressive, null);
      parts.push({
        program: shardProgram(pid),
        progress_json: JSON.stringify(shardObj),
      });
    });
    var hasScoresShard = scoreRows && scoreRows.length > 0;
    if (hasScoresShard) {
      parts.push(scoresShardPart({ v: compact.v || 1, scoreRows: scoreRows }));
    }
    var shell = {
      v: compact.v || 1,
      studentId: compact.studentId,
      voice: compact.voice,
      voiceAt: compact.voiceAt,
      locale: compact.locale,
      localeAt: compact.localeAt,
      studySize: compact.studySize,
      testKind: compact.testKind,
      currentPackId: compact.currentPackId,
      packShardIds: packIds.slice(),
      hasScoresShard: hasScoresShard,
      sets: {},
    };
    parts.push({
      program: PROGRAM,
      progress_json: JSON.stringify(trimProgress(shell, aggressive, null)),
    });
    return parts;
  }

  function parseShell(mainJson) {
    var base = {};
    try {
      base = JSON.parse(String(mainJson || "{}"));
    } catch (e) {
      return { packShardIds: [], hasScoresShard: false };
    }
    if (!base || typeof base !== "object") {
      return { packShardIds: [], hasScoresShard: false };
    }
    var ids = [];
    if (isNonEmptyArray(base.packShardIds)) {
      ids = base.packShardIds.map(function (id) { return String(id); });
    }
    return {
      packShardIds: ids,
      hasScoresShard: !!base.hasScoresShard,
    };
  }

  function shardIdsFromShell(mainJson) {
    return parseShell(mainJson).packShardIds;
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
    var scoreRows = Array.isArray(base.scoreRows) ? base.scoreRows : [];
    (shardLoads || []).forEach(function (row) {
      if (!row || !row.progress_json) return;
      if (isScoresProgram(row.program)) {
        try {
          var scoresObj = JSON.parse(String(row.progress_json));
          if (scoresObj && Array.isArray(scoresObj.scoreRows)) {
            scoreRows = mergeScoreRows(scoreRows, scoresObj.scoreRows);
          }
        } catch (e1) {}
        return;
      }
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
    delete base.hasScoresShard;
    var merged = trimProgress(base, false, scoreRows.length ? scoreRows : null);
    return JSON.stringify(merged);
  }

  function requiredLoadPrograms(mainJson) {
    var shell = parseShell(mainJson);
    var programs = shell.packShardIds.map(function (pid) {
      return shardProgram(pid);
    });
    if (shell.hasScoresShard) programs.push(SCORES_PROGRAM);
    return programs;
  }

  return {
    PROGRAM: PROGRAM,
    SHARD_PREFIX: SHARD_PREFIX,
    SCORES_PROGRAM: SCORES_PROGRAM,
    SCORE_ROWS_MAX: SCORE_ROWS_MAX,
    SOFT_CHAR_LIMIT: SOFT_CHAR_LIMIT,
    capScoreRows: capScoreRows,
    packShardPart: packShardPart,
    scoresShardPart: scoresShardPart,
    trimProgress: trimProgress,
    trimPack: trimPack,
    packParts: packParts,
    orderPartsForSave: orderPartsForSave,
    mergeLoadedParts: mergeLoadedParts,
    mergedScoreRowsForSave: mergedScoreRowsForSave,
    shardProgram: shardProgram,
    isShardProgram: isShardProgram,
    isScoresProgram: isScoresProgram,
    packIdFromShardProgram: packIdFromShardProgram,
    shardIdsFromShell: shardIdsFromShell,
    parseShell: parseShell,
    requiredLoadPrograms: requiredLoadPrograms,
    jsonByteLength: jsonByteLength,
  };
});
