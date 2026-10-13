(function (root) {
  "use strict";

  var PROGRAM = "word-master";
  var LS_KEY_PREFIX = "mrj.wm.progress.";

  function studentStorageKey(id) {
    return String(id || "").trim().toLowerCase().replace(/\s+/g, " ");
  }

  function localStorageKeyForStudent() {
    var k = studentStorageKey(authStudentId());
    return k ? LS_KEY_PREFIX + k : null;
  }
  var SAVE_INTERVAL_MS = 17000;
  var hydrated = false;
  var loadDone = false;
  var pendingSave = null;
  var retryTimer = null;
  var rateLimitTimer = null;
  var retryAttempt = 0;
  var lastSaveError = "";
  var serverProgressSnapshot = null;
  var inFlightSave = false;
  var lastSuccessfulPackedJson = "";
  var lastRemoteSaveAt = 0;
  var unloadHooksInstalled = false;
  var sessionSeq = 0;
  var saveSplitLevel = 0;

  function packSaveApi() {
    return root.MRJ_WM_packSave || null;
  }

  function progressKeyForId(id) {
    var k = studentStorageKey(id);
    return k ? LS_KEY_PREFIX + k : null;
  }

  function saveInflightStale(reqSeq, reqId) {
    return reqSeq !== sessionSeq
      || studentStorageKey(authStudentId()) !== studentStorageKey(reqId);
  }

  function mergeFn() {
    return root.MRJ_WM_merge
      || (root.MRJ_WM_progress && root.MRJ_WM_progress.merge);
  }

  function parseProgressJson(raw) {
    if (raw && typeof raw === "object") return raw;
    try {
      var parsed = JSON.parse(String(raw == null ? "{}" : raw));
      return parsed && typeof parsed === "object" ? parsed : { v: 1, sets: {} };
    } catch (e) {
      return { v: 1, sets: {} };
    }
  }

  function localProgressJson() {
    var cached = readLocal();
    if (!cached || !cached.progress_json) return null;
    var norm = studentStorageKey(authStudentId());
    if (!norm || cached.id !== norm) return null;
    return cached.progress_json;
  }

  function mergeSaveProgress(incomingJson) {
    var merge = mergeFn();
    var merged = parseProgressJson(incomingJson);
    if (!merge) return merged;
    var serverObj = null;
    if (serverProgressSnapshot) {
      serverObj = parseProgressJson(serverProgressSnapshot);
      merged = merge(merged, serverObj);
    }
    var localJson = localProgressJson();
    if (localJson) {
      var localObj = parseProgressJson(localJson);
      var poorer = root.MRJ_WM_progressIsStrictlyPoorer;
      if (!serverObj || (poorer && poorer(serverObj, localObj))) {
        merged = merge(merged, localObj);
      }
    }
    return merged;
  }

  function authStudentId() {
    if (!root.MRJ_AUTH || typeof root.MRJ_AUTH.student !== "function") return "";
    return String(root.MRJ_AUTH.student() || "").trim();
  }

  function authToken() {
    if (!root.MRJ_AUTH || typeof root.MRJ_AUTH.token !== "function") return "";
    return String(root.MRJ_AUTH.token() || "").trim();
  }

  function endpoint() {
    if (root.MRJ_AUTH && root.MRJ_AUTH.ENDPOINT) return root.MRJ_AUTH.ENDPOINT;
    if (root.WM_SIGNIN_URL) return root.WM_SIGNIN_URL;
    return "";
  }

  function readLocal() {
    var key = localStorageKeyForStudent();
    if (!key) return null;
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch (e) {
      return null;
    }
  }

  function writeLocal(payload, forId) {
    var sid = forId != null ? forId : authStudentId();
    var norm = studentStorageKey(sid);
    var key = progressKeyForId(sid);
    if (!key) return;
    try {
      var stored = Object.assign({}, payload || {}, { id: norm });
      localStorage.setItem(key, JSON.stringify(stored));
    } catch (e) {}
  }

  function postRemote(payload, transport) {
    var url = endpoint();
    if (!url) return Promise.resolve({ ok: false, error: "no_endpoint" });
    var bodyStr = JSON.stringify(payload);
    transport = transport || {};
    if (transport.beacon && root.navigator && typeof root.navigator.sendBeacon === "function") {
      try {
        var sent = root.navigator.sendBeacon(
          url,
          new Blob([bodyStr], { type: "text/plain;charset=utf-8" })
        );
        return Promise.resolve(
          sent ? { ok: true, saved: true, beacon: true } : { ok: false, error: "beacon_failed" }
        );
      } catch (e) {
        return Promise.resolve({ ok: false, error: "beacon_failed" });
      }
    }
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: bodyStr,
      redirect: "follow",
      keepalive: !!transport.keepalive,
    }).then(function (res) {
      return res.json().catch(function () {
        return { ok: false, error: "bad_json" };
      });
    });
  }

  function dispatchSaveStatus(ok, detail) {
    try {
      if (!root.dispatchEvent) return;
      root.dispatchEvent(
        new CustomEvent("mrj-wm-save-status", {
          detail: { ok: !!ok, error: detail && detail.error ? String(detail.error) : "" },
        })
      );
    } catch (e) {}
  }

  function countKnownInProgress(progressJson) {
    var prog = null;
    try {
      prog = typeof progressJson === "string" ? JSON.parse(progressJson) : progressJson;
    } catch (e) {
      return { known: 0, total: 0 };
    }
    if (!prog || !prog.sets) return { known: 0, total: 0 };
    var known = 0;
    var total = 0;
    Object.keys(prog.sets).forEach(function (pid) {
      var s = prog.sets[pid] || {};
      var ids = Array.isArray(s.meetLock) && s.meetLock.length
        ? s.meetLock
        : Object.keys(s.intro || {});
      ids.forEach(function (id) {
        total += 1;
        var passed = (s.testPassed || {})[id];
        if (passed != null && Number(passed) >= 80) {
          known += 1;
          return;
        }
        var intro = (s.intro || {})[id];
        if (!intro) return;
        var wa = (s.winsA || {})[id] || 0;
        var wb = (s.winsB || {})[id] || 0;
        var wc = (s.winsC || {})[id] || 0;
        if (wa >= 2 && wb >= 2 && wc >= 2) known += 1;
      });
    });
    return { known: known, total: total };
  }

  function logResult(r) {
    r = r || {};
    var student = authStudentId();
    if (!student) return;
    var total = Number(r.total);
    var score = Number(r.score);
    if (!isFinite(score) || !isFinite(total) || !(total > 0)) return;
    var packId = String(r.packId || "").trim();
    var kind = String(r.kind || "").trim();
    if (!packId || !kind) return;
    var itemId = packId + ":" + kind;
    var pct = Math.round(100 * score / total);
    var localDateStr =
      root.MRJ_SCORES && typeof root.MRJ_SCORES.localDate === "function"
        ? root.MRJ_SCORES.localDate()
        : "";
    if (root.MRJ_AUTH && typeof root.MRJ_AUTH.noteScore === "function") {
      try {
        root.MRJ_AUTH
          .noteScore({
            program: PROGRAM,
            itemId: itemId,
            scoreValue: score,
            scoreMax: total,
            scorePct: pct,
            localDate: localDateStr,
          })
          .catch(function () {});
      } catch (e) {}
    }
    if (root.MRJ_SCORES && typeof root.MRJ_SCORES.post === "function") {
      try {
        root.MRJ_SCORES
          .post({
            student: student,
            program: PROGRAM,
            appName: "MRJ Word Master",
            source: "word-master",
            bookTitle: r.packTitle || "",
            unitTitle: packId,
            itemId: itemId,
            itemType: kind,
            scoreValue: score,
            scoreMax: total,
            correctness: pct >= 80 ? "correct" : "incorrect",
            metadata: r.meta || {},
          })
          .catch(function () {});
      } catch (e) {}
    }
  }

  function clearRetryTimer() {
    if (retryTimer) {
      clearTimeout(retryTimer);
      retryTimer = null;
    }
  }

  function clearRateLimitTimer() {
    if (rateLimitTimer) {
      clearTimeout(rateLimitTimer);
      rateLimitTimer = null;
    }
  }

  function scheduleRetry(body, reqId, reqSeq) {
    clearRetryTimer();
    retryAttempt += 1;
    var delay = Math.min(30000, 2000 * Math.pow(2, Math.min(retryAttempt, 4)));
    retryTimer = setTimeout(function () {
      retryTimer = null;
      if (saveInflightStale(reqSeq, reqId)) return;
      flushSave(body, { isRetry: true, forId: reqId });
    }, delay);
  }

  function buildPackedSave(body, packOptions) {
    packOptions = packOptions || {};
    var mergedProgress = mergeSaveProgress(body.progress_json || "{}");
    var ps = packSaveApi();
    var parts;
    if (ps) {
      parts = ps.packParts(mergedProgress, {
        forceSplit: !!packOptions.forceSplit || saveSplitLevel > 0,
        aggressive: !!packOptions.aggressive || saveSplitLevel > 1,
      });
    } else {
      parts = [{
        program: PROGRAM,
        progress_json: JSON.stringify(mergedProgress),
      }];
    }
    var mergedJson = JSON.stringify(mergedProgress);
    return {
      body: body,
      parts: parts,
      progressJson: mergedJson,
    };
  }

  function canonicalProgressJson(jsonStr) {
    var merge = mergeFn();
    var parsed = parseProgressJson(jsonStr);
    if (!merge) return jsonStr;
    return JSON.stringify(merge(parsed, parsed));
  }

  function unchangedSinceLastSave(progressJson) {
    if (!lastSuccessfulPackedJson) return false;
    var next = canonicalProgressJson(progressJson);
    if (next === lastSuccessfulPackedJson) return true;
    var merge = mergeFn();
    if (!merge) return false;
    var prev = parseProgressJson(lastSuccessfulPackedJson);
    var combined = merge(parseProgressJson(next), prev);
    return JSON.stringify(combined) === JSON.stringify(prev);
  }

  function scheduleRateLimitedFlush() {
    if (rateLimitTimer || inFlightSave || !pendingSave) return;
    if (!loadDone || !hydrated) return;
    var wait = SAVE_INTERVAL_MS - (Date.now() - lastRemoteSaveAt);
    if (wait <= 0 || lastRemoteSaveAt <= 0) {
      flushSave(pendingSave, {});
      return;
    }
    rateLimitTimer = setTimeout(function () {
      rateLimitTimer = null;
      if (pendingSave) flushSave(pendingSave, {});
    }, wait);
  }

  function isTooLargeSaveError(res) {
    return !!(res && res.error === "too_large");
  }

  function writeLocalProgress(body, progressJson, reqId) {
    try {
      var localBody = Object.assign({}, body, { progress_json: progressJson });
      writeLocal(localBody, reqId);
    } catch (e) {}
  }

  function afterAllPartsSaved(body, progressJson, res, transport, reqId) {
    retryAttempt = 0;
    saveSplitLevel = 0;
    lastSaveError = "";
    lastRemoteSaveAt = Date.now();
    var canonicalJson = canonicalProgressJson(progressJson);
    lastSuccessfulPackedJson = canonicalJson;
    serverProgressSnapshot = canonicalJson;
    writeLocalProgress(body, canonicalJson, reqId);
    dispatchSaveStatus(true, res);
    if (pendingSave === body) pendingSave = null;
    return res;
  }

  function escalatePackSave(body, progressJson, transport, reqId, reqSeq) {
    writeLocalProgress(body, progressJson, reqId);
    if (saveSplitLevel < 2) {
      saveSplitLevel += 1;
      if (!transport || !transport.beacon) {
        return flushSave(body, { isRetry: true, forId: reqId, fromTooLarge: true });
      }
    }
    lastSaveError = "too_large";
    if (!transport || !transport.beacon) {
      dispatchSaveStatus(false, { error: "too_large" });
      scheduleRetry(body, reqId, reqSeq);
    }
    return Promise.resolve({ ok: false, error: "too_large" });
  }

  function savePackParts(built, token, transport, reqId, reqSeq) {
    var parts = built.parts || [];
    var idx = 0;
    function saveNext(prevRes) {
      if (prevRes && isTooLargeSaveError(prevRes)) {
        inFlightSave = false;
        return escalatePackSave(built.body, built.progressJson, transport, reqId, reqSeq);
      }
      if (prevRes && !(prevRes.ok && prevRes.saved !== false && !prevRes.error)) {
        inFlightSave = false;
        lastSaveError = (prevRes && prevRes.error) || "save_failed";
        if (!transport || !transport.beacon) {
          dispatchSaveStatus(false, prevRes);
          scheduleRetry(built.body, reqId, reqSeq);
        }
        return Promise.resolve(prevRes);
      }
      if (idx >= parts.length) {
        inFlightSave = false;
        return Promise.resolve(afterAllPartsSaved(
          built.body,
          built.progressJson,
          prevRes || { ok: true, saved: true },
          transport,
          reqId
        ));
      }
      var part = parts[idx];
      idx += 1;
      return postRemote({
        action: "save_pack",
        id: reqId,
        token: token,
        program: part.program || PROGRAM,
        progress_json: part.progress_json,
      }, transport).then(saveNext);
    }
    return saveNext(null);
  }

  function afterSaveAttempt(body, progressJson, res, transport, reqId, reqSeq) {
    var ok = !!(res && res.ok && res.saved !== false && !res.error);
    if (ok) {
      return afterAllPartsSaved(body, progressJson, res, transport, reqId);
    }
    lastSaveError = (res && res.error) || "save_failed";
    if (isTooLargeSaveError(res)) {
      return escalatePackSave(body, progressJson, transport, reqId, reqSeq);
    }
    if (!transport || !transport.beacon) {
      dispatchSaveStatus(false, res);
      scheduleRetry(body, reqId, reqSeq);
    }
    return res;
  }

  function finishStaleInflightSave(body, progressJson, res, reqId) {
    inFlightSave = false;
    var ok = !!(res && res.ok && res.saved !== false && !res.error);
    if (ok) {
      var canonicalJson = canonicalProgressJson(progressJson);
      writeLocal(Object.assign({}, body, { progress_json: canonicalJson }), reqId);
    }
    if (pendingSave) scheduleRateLimitedFlush();
    return { ok: false, error: "stale" };
  }

  function flushSave(body, options) {
    options = options || {};
    if (!body) body = pendingSave;
    if (!body) return Promise.resolve(null);
    if (options.forId != null
      && studentStorageKey(options.forId) !== studentStorageKey(authStudentId())) {
      return Promise.resolve({ ok: false, error: "student_changed" });
    }
    var id = authStudentId();
    var token = authToken();
    if (!id || !token) {
      dispatchSaveStatus(false, { error: "no_auth" });
      return Promise.resolve({ ok: false, error: "no_auth" });
    }
    if (!loadDone || !hydrated) {
      pendingSave = body;
      return Promise.resolve({ ok: false, error: "not_loaded" });
    }
    if (inFlightSave) {
      pendingSave = body;
      return Promise.resolve({ ok: false, error: "in_flight" });
    }

    var packOpts = {
      forceSplit: !!(options.fromTooLarge || saveSplitLevel > 0),
      aggressive: saveSplitLevel > 1,
    };
    var built = buildPackedSave(body, packOpts);
    var outboundJson = canonicalProgressJson(built.progressJson);
    if (unchangedSinceLastSave(outboundJson)) {
      if (pendingSave === body) pendingSave = null;
      dispatchSaveStatus(true, { skipped: true });
      return Promise.resolve({ ok: true, skipped: true });
    }

    var bypassRateLimit = !!(options.isRetry || options.forceUnload || options.fromTooLarge);
    if (!bypassRateLimit && lastRemoteSaveAt > 0) {
      var elapsed = Date.now() - lastRemoteSaveAt;
      if (elapsed < SAVE_INTERVAL_MS) {
        pendingSave = body;
        scheduleRateLimitedFlush();
        return Promise.resolve({ ok: false, error: "rate_limited" });
      }
    }
    var transport = {};
    if (options.forceUnload) {
      transport.beacon = true;
      if (!root.navigator || typeof root.navigator.sendBeacon !== "function") {
        transport.keepalive = true;
      }
    }

    var reqId = id;
    var reqSeq = sessionSeq;
    inFlightSave = true;
    clearRateLimitTimer();
    return savePackParts(built, token, transport, reqId, reqSeq).then(function (res) {
      if (saveInflightStale(reqSeq, reqId)) {
        return finishStaleInflightSave(built.body, outboundJson, res, reqId);
      }
      if (pendingSave && pendingSave !== body) {
        scheduleRateLimitedFlush();
      }
      return res;
    }).catch(function () {
      if (saveInflightStale(reqSeq, reqId)) {
        inFlightSave = false;
        if (pendingSave) scheduleRateLimitedFlush();
        return { ok: false, error: "stale" };
      }
      inFlightSave = false;
      lastSaveError = "network";
      if (!transport.beacon) {
        dispatchSaveStatus(false, { error: "network" });
        scheduleRetry(built.body, reqId, reqSeq);
      }
      if (pendingSave && pendingSave !== body) {
        scheduleRateLimitedFlush();
      }
      return { ok: false, error: "network" };
    });
  }

  function save(payload) {
    var id = authStudentId();
    if (!id) return Promise.resolve(null);
    var body = payload || {};
    if (!body.progress_json) return Promise.resolve(null);
    pendingSave = body;
    clearRetryTimer();
    return flushSave(body, {});
  }

  function load() {
    var id = authStudentId();
    var token = authToken();
    if (!id || !token) {
      return Promise.resolve({ ok: false, error: "no_auth" });
    }
    hydrated = false;
    loadDone = false;
    var loadSeq = sessionSeq;
    var loadId = id;
    function loadShardParts(mainRes, shardIds) {
      var ps = packSaveApi();
      if (!ps || !shardIds.length) return Promise.resolve(mainRes);
      var token = authToken();
      return Promise.all(shardIds.map(function (pid) {
        return postRemote({
          action: "load_pack",
          id: loadId,
          token: token,
          program: ps.shardProgram(pid),
        });
      })).then(function (shardRows) {
        var loads = [];
        shardRows.forEach(function (row, i) {
          if (row && row.ok && row.found && row.progress_json) {
            loads.push({
              program: ps.shardProgram(shardIds[i]),
              progress_json: row.progress_json,
            });
          }
        });
        var merged = ps.mergeLoadedParts(mainRes.progress_json, loads);
        serverProgressSnapshot = merged;
        return Object.assign({}, mainRes, { progress_json: merged });
      });
    }

    return postRemote({
      action: "load_pack",
      id: id,
      token: token,
      program: PROGRAM,
    }).then(function (res) {
      if (loadSeq !== sessionSeq
        || studentStorageKey(authStudentId()) !== studentStorageKey(loadId)) {
        return { ok: false, error: "stale" };
      }
      loadDone = true;
      hydrated = !!(res && res.ok);
      var finish = function (finalRes) {
        if (hydrated && pendingSave && pendingSave.progress_json) {
          flushSave(pendingSave, {});
        }
        return finalRes;
      };
      if (res && res.ok && res.found && res.progress_json) {
        var ps = packSaveApi();
        var shardIds = ps ? ps.shardIdsFromShell(res.progress_json) : [];
        if (shardIds.length) {
          return loadShardParts(res, shardIds).then(function (mergedRes) {
            return finish(mergedRes);
          });
        }
        serverProgressSnapshot = String(res.progress_json);
        return finish(res);
      }
      if (res && res.ok) {
        serverProgressSnapshot = null;
      }
      return finish(res);
    }).catch(function () {
      if (loadSeq !== sessionSeq
        || studentStorageKey(authStudentId()) !== studentStorageKey(loadId)) {
        return { ok: false, error: "stale" };
      }
      loadDone = true;
      hydrated = false;
      return { ok: false, error: "load_failed" };
    });
  }

  function resetSession() {
    sessionSeq += 1;
    hydrated = false;
    loadDone = false;
    pendingSave = null;
    // Keep serverProgressSnapshot until the next load_pack completes.
    retryAttempt = 0;
    lastSaveError = "";
    clearRetryTimer();
    clearRateLimitTimer();
  }

  function isReadyToSave() {
    return loadDone && hydrated && !!authStudentId() && !!authToken();
  }

  function flushOnPageHide() {
    if (!isReadyToSave()) return;
    clearRateLimitTimer();
    var body = pendingSave;
    if (!body) return;
    flushSave(body, { forceUnload: true });
  }

  function installUnloadFlush() {
    if (unloadHooksInstalled) return;
    unloadHooksInstalled = true;
    if (typeof document !== "undefined" && document.addEventListener) {
      document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "hidden") flushOnPageHide();
      });
    }
    if (root.addEventListener) {
      root.addEventListener("pagehide", flushOnPageHide);
    }
  }

  installUnloadFlush();

  root.MRJ_WM_progress = {
    save: save,
    load: load,
    logResult: logResult,
    resetSession: resetSession,
    isReadyToSave: isReadyToSave,
    merge: root.MRJ_WM_merge,
    countKnownInProgress: countKnownInProgress,
    program: PROGRAM,
    saveIntervalMs: SAVE_INTERVAL_MS,
    lastSaveError: function () { return lastSaveError; },
    mergeSaveProgress: mergeSaveProgress,
    setServerSnapshot: function (json) {
      serverProgressSnapshot = json == null ? null : String(json);
    },
    __testHooks: {
      setSaveIntervalMs: function (ms) {
        SAVE_INTERVAL_MS = Math.max(0, Number(ms) || 0);
      },
      markSessionReady: function () {
        loadDone = true;
        hydrated = true;
      },
      resetThrottleState: function () {
        lastRemoteSaveAt = 0;
        lastSuccessfulPackedJson = "";
        inFlightSave = false;
        pendingSave = null;
        clearRateLimitTimer();
        clearRetryTimer();
      },
      isInFlight: function () { return inFlightSave; },
      hasRetryScheduled: function () { return !!retryTimer; },
      lastSuccessfulPackedJson: function () { return lastSuccessfulPackedJson; },
      getSaveSplitLevel: function () { return saveSplitLevel; },
      setSaveSplitLevel: function (n) { saveSplitLevel = Math.max(0, Number(n) || 0); },
    },
  };
})(typeof window !== "undefined" ? window : global);
