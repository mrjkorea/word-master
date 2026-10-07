(function (root) {
  "use strict";

  function maxNum(a, b) {
    var x = Number(a);
    var y = Number(b);
    if (!isFinite(x)) x = 0;
    if (!isFinite(y)) y = 0;
    return Math.max(x, y);
  }

  function mergeCountMaps(a, b) {
    a = a && typeof a === "object" ? a : {};
    b = b && typeof b === "object" ? b : {};
    var out = {};
    var keys = Object.keys(a);
    Object.keys(b).forEach(function (k) {
      if (keys.indexOf(k) === -1) keys.push(k);
    });
    keys.forEach(function (k) {
      out[k] = maxNum(a[k], b[k]);
    });
    return out;
  }

  function mergeTestPassed(a, b) {
    return mergeCountMaps(a, b);
  }

  function mergeIntro(a, b) {
    a = a && typeof a === "object" ? a : {};
    b = b && typeof b === "object" ? b : {};
    var out = {};
    var keys = Object.keys(a);
    Object.keys(b).forEach(function (k) {
      if (keys.indexOf(k) === -1) keys.push(k);
    });
    keys.forEach(function (k) {
      out[k] = !!(a[k] || b[k]);
    });
    return out;
  }

  function meetLockHasIds(list) {
    if (!Array.isArray(list) || !list.length) return false;
    for (var i = 0; i < list.length; i++) {
      if (list[i] != null && list[i] !== "") return true;
    }
    return false;
  }

  function copyMeetLock(list) {
    if (!Array.isArray(list)) return [];
    return list.filter(function (id) {
      return id != null && id !== "";
    });
  }

  function pickMeetLock(a, b) {
    var aAt = a && a.lastPlayedAt ? Number(a.lastPlayedAt) : 0;
    var bAt = b && b.lastPlayedAt ? Number(b.lastPlayedAt) : 0;
    var newer = bAt >= aAt ? b : a;
    var older = bAt >= aAt ? a : b;
    if (meetLockHasIds(newer && newer.meetLock)) {
      return copyMeetLock(newer.meetLock);
    }
    return copyMeetLock(older && older.meetLock);
  }

  function validStudySize(n) {
    n = Number(n);
    return n === 5 || n === 10 || n === 15 || n === 20;
  }

  function pickStudySize(local, remote, localAt, remoteAt) {
    var newer = remoteAt >= localAt ? remote : local;
    var older = remoteAt >= localAt ? local : remote;
    if (validStudySize(newer && newer.studySize)) return Number(newer.studySize);
    if (validStudySize(older && older.studySize)) return Number(older.studySize);
    return 10;
  }

  function mergeShallowObjects(a, b) {
    a = a && typeof a === "object" ? a : {};
    b = b && typeof b === "object" ? b : {};
    var out = {};
    Object.keys(a).forEach(function (k) {
      out[k] = a[k];
    });
    Object.keys(b).forEach(function (k) {
      if (out[k] == null) out[k] = b[k];
    });
    return out;
  }

  function pickStartNumber(a, b) {
    var aAt = a && a.lastPlayedAt ? Number(a.lastPlayedAt) : 0;
    var bAt = b && b.lastPlayedAt ? Number(b.lastPlayedAt) : 0;
    var newer = bAt >= aAt ? b : a;
    var older = bAt >= aAt ? a : b;
    var nNew = newer && Number(newer.startNumber) >= 1 ? Number(newer.startNumber) : null;
    var nOld = older && Number(older.startNumber) >= 1 ? Number(older.startNumber) : null;
    return nNew != null ? nNew : nOld;
  }

  function mergeScoreBlock(a, b) {
    if (!a && !b) return null;
    if (!a) return b;
    if (!b) return a;
    var aAt = Number(a.at) || 0;
    var bAt = Number(b.at) || 0;
    return bAt >= aAt ? b : a;
  }

  function mapHasPositive(m) {
    m = m && typeof m === "object" ? m : {};
    var keys = Object.keys(m);
    for (var i = 0; i < keys.length; i++) {
      if (Number(m[keys[i]]) > 0) return true;
    }
    return false;
  }

  function packProgressEmpty(p) {
    if (!p || typeof p !== "object") return true;
    if (mapHasPositive(p.winsA) || mapHasPositive(p.winsB) || mapHasPositive(p.winsC)) {
      return false;
    }
    if (p.intro && Object.keys(p.intro).length) return false;
    if (Array.isArray(p.meetLock) && p.meetLock.length) return false;
    if (p.testPassed && Object.keys(p.testPassed).length) return false;
    if (p.final || p.check) return false;
    return true;
  }

  function mergePack(a, b) {
    if (!a) return b || {};
    if (!b) return a || {};
    return {
      title: b.title || a.title || "",
      winsA: mergeCountMaps(a.winsA, b.winsA),
      winsB: mergeCountMaps(a.winsB, b.winsB),
      winsC: mergeCountMaps(a.winsC, b.winsC),
      intro: mergeIntro(a.intro, b.intro),
      meetLock: pickMeetLock(a, b),
      startNumber: pickStartNumber(a, b),
      testPassed: mergeTestPassed(a.testPassed, b.testPassed),
      tapmapKey: b.tapmapKey || a.tapmapKey || "",
      lastPlayedAt: maxNum(a.lastPlayedAt, b.lastPlayedAt),
      srsTrying: !!(a.srsTrying || b.srsTrying),
      srsForever: !!(a.srsForever || b.srsForever),
      srsStage: maxNum(a.srsStage, b.srsStage),
      srsNextAt: a.srsNextAt != null && b.srsNextAt != null
        ? (Number(b.srsNextAt) >= Number(a.srsNextAt) ? b.srsNextAt : a.srsNextAt)
        : (a.srsNextAt != null ? a.srsNextAt : b.srsNextAt),
      final: mergeScoreBlock(a.final, b.final),
      check: mergeScoreBlock(a.check, b.check),
      finalMiss: (Array.isArray(b.finalMiss) && b.finalMiss.length ? b.finalMiss : a.finalMiss) || [],
      roundGames: mergeShallowObjects(a.roundGames, b.roundGames),
      pathHeld: mergeShallowObjects(a.pathHeld, b.pathHeld),
    };
  }

  function countNonEmptyPacks(prog) {
    prog = prog && typeof prog === "object" ? prog : { sets: {} };
    var sets = prog.sets && typeof prog.sets === "object" ? prog.sets : {};
    var n = 0;
    Object.keys(sets).forEach(function (pid) {
      if (!packProgressEmpty(sets[pid])) n += 1;
    });
    return n;
  }

  /** True when candidate would lose pack data compared to baseline (server/local). */
  function progressIsStrictlyPoorer(candidate, baseline) {
    candidate = candidate && typeof candidate === "object" ? candidate : { sets: {} };
    baseline = baseline && typeof baseline === "object" ? baseline : { sets: {} };
    var cSets = candidate.sets && typeof candidate.sets === "object" ? candidate.sets : {};
    var bSets = baseline.sets && typeof baseline.sets === "object" ? baseline.sets : {};
    var keys = Object.keys(bSets);
    for (var i = 0; i < keys.length; i++) {
      var pid = keys[i];
      var basePack = bSets[pid];
      if (packProgressEmpty(basePack)) continue;
      var candPack = cSets[pid];
      if (!candPack || packProgressEmpty(candPack)) return true;
    }
    return countNonEmptyPacks(candidate) < countNonEmptyPacks(baseline);
  }

  function mergeProgress(local, remote) {
    local = local && typeof local === "object" ? local : { v: 1, sets: {} };
    remote = remote && typeof remote === "object" ? remote : { v: 1, sets: {} };
    var localSets = local.sets && typeof local.sets === "object" ? local.sets : {};
    var remoteSets = remote.sets && typeof remote.sets === "object" ? remote.sets : {};
    var keys = Object.keys(localSets);
    Object.keys(remoteSets).forEach(function (k) {
      if (keys.indexOf(k) === -1) keys.push(k);
    });
    var sets = {};
    keys.forEach(function (pid) {
      var localP = localSets[pid];
      var remoteP = remoteSets[pid];
      if (packProgressEmpty(remoteP) && !packProgressEmpty(localP)) {
        sets[pid] = mergePack(remoteP, localP);
      } else {
        sets[pid] = mergePack(localP, remoteP);
      }
    });
    var localAt = 0;
    var remoteAt = 0;
    keys.forEach(function (pid) {
      localAt = maxNum(localAt, localSets[pid] && localSets[pid].lastPlayedAt);
      remoteAt = maxNum(remoteAt, remoteSets[pid] && remoteSets[pid].lastPlayedAt);
    });
    var preferRemote = remoteAt >= localAt;
    var base = preferRemote ? remote : local;
    var other = preferRemote ? local : remote;
    var currentPackId = base.currentPackId || other.currentPackId || "";
    if (packProgressEmpty(sets[currentPackId])) {
      for (var pi = 0; pi < keys.length; pi++) {
        if (!packProgressEmpty(sets[keys[pi]])) {
          currentPackId = keys[pi];
          break;
        }
      }
    }
    return {
      v: 1,
      studentId: base.studentId || other.studentId || "",
      voice: base.voice || other.voice || "us_m",
      locale: base.locale || other.locale || "en",
      studySize: pickStudySize(local, remote, localAt, remoteAt),
      testKind: base.testKind || other.testKind || "easy",
      currentPackId: currentPackId,
      sets: sets,
    };
  }

  root.MRJ_WM_merge = mergeProgress;
  root.MRJ_WM_mergePack = mergePack;
  root.MRJ_WM_packProgressEmpty = packProgressEmpty;
  root.MRJ_WM_countNonEmptyPacks = countNonEmptyPacks;
  root.MRJ_WM_progressIsStrictlyPoorer = progressIsStrictlyPoorer;
})(typeof window !== "undefined" ? window : global);
