(function (root) {
  "use strict";

  var PROGRAM = "word-master";
  var LS_KEY = "mrj.wm.progress";
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
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch (e) {
      return null;
    }
  }

  function writeLocal(payload) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(payload || {}));
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

  function maybePostScore(payload) {
    var p = payload || {};
    if (p.scoreKind === "known" || p.scoreKind === "checkup") {
      var value = Number(p.scoreValue);
      var max = Number(p.scoreMax);
      if (!isFinite(value) || !isFinite(max) || !(max > 0)) return Promise.resolve(null);
      var student = authStudentId();
      if (!student) return Promise.resolve(null);
      var itemId = [p.pack_id || "pack", p.scoreKind, p.pack_id || ""].join(":");
      if (root.MRJ_AUTH && typeof root.MRJ_AUTH.noteScore === "function") {
        return root.MRJ_AUTH.noteScore({
          program: "word-master",
          itemId: itemId,
          scoreValue: value,
          scoreMax: max,
        }).catch(function () {
          return null;
        });
      }
      if (!window.MRJ_SCORES) return Promise.resolve(null);
      return window.MRJ_SCORES.post({
        student: student,
        program: "word-master",
        appName: "MRJ Word Master",
        source: "word-master",
        bookTitle: p.pack_title || "",
        unitTitle: p.pack_id || "",
        itemId: itemId,
        itemType: p.scoreKind === "checkup" ? "checkup" : "word_study",
        scoreValue: value,
        scoreMax: max,
      });
    }
    return Promise.resolve(null);
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

  function scheduleRetry(body) {
    clearRetryTimer();
    retryAttempt += 1;
    var delay = Math.min(30000, 2000 * Math.pow(2, Math.min(retryAttempt, 4)));
    retryTimer = setTimeout(function () {
      retryTimer = null;
      flushSave(body, { isRetry: true });
    }, delay);
  }

  function buildPackedSave(body) {
    var mergedProgress = mergeSaveProgress(body.progress_json || "{}");
    var mergedBody = Object.assign({}, body, {
      progress_json: JSON.stringify(mergedProgress),
    });
    return {
      body: mergedBody,
      progressJson: mergedBody.progress_json || "{}",
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

  function afterSaveAttempt(body, progressJson, res, transport) {
    var ok = !!(res && res.ok && res.saved !== false && !res.error);
    if (ok) {
      retryAttempt = 0;
      lastSaveError = "";
      lastRemoteSaveAt = Date.now();
      var canonicalJson = canonicalProgressJson(progressJson);
      lastSuccessfulPackedJson = canonicalJson;
      serverProgressSnapshot = canonicalJson;
      body = Object.assign({}, body, { progress_json: canonicalJson });
      writeLocal(body);
      dispatchSaveStatus(true, res);
      if (pendingSave === body) pendingSave = null;
      return res;
    }
    lastSaveError = (res && res.error) || "save_failed";
    if (!transport || !transport.beacon) {
      dispatchSaveStatus(false, res);
      scheduleRetry(body);
    }
    return res;
  }

  function flushSave(body, options) {
    options = options || {};
    if (!body) body = pendingSave;
    if (!body) return Promise.resolve(null);
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

    var built = buildPackedSave(body);
    var outboundJson = canonicalProgressJson(built.progressJson);
    if (unchangedSinceLastSave(outboundJson)) {
      if (pendingSave === body) pendingSave = null;
      dispatchSaveStatus(true, { skipped: true });
      return Promise.resolve({ ok: true, skipped: true });
    }

    var bypassRateLimit = !!(options.isRetry || options.forceUnload);
    if (!bypassRateLimit && lastRemoteSaveAt > 0) {
      var elapsed = Date.now() - lastRemoteSaveAt;
      if (elapsed < SAVE_INTERVAL_MS) {
        pendingSave = body;
        scheduleRateLimitedFlush();
        return Promise.resolve({ ok: false, error: "rate_limited" });
      }
    }
    var req = {
      action: "save_pack",
      id: id,
      token: token,
      program: PROGRAM,
      progress_json: outboundJson,
    };
    var transport = {};
    if (options.forceUnload) {
      transport.beacon = true;
      if (!root.navigator || typeof root.navigator.sendBeacon !== "function") {
        transport.keepalive = true;
      }
    }

    inFlightSave = true;
    clearRateLimitTimer();
    return postRemote(req, transport).then(function (res) {
      inFlightSave = false;
      var out = afterSaveAttempt(built.body, outboundJson, res, transport);
      if (pendingSave && pendingSave !== body) {
        scheduleRateLimitedFlush();
      }
      return out;
    }).catch(function () {
      inFlightSave = false;
      lastSaveError = "network";
      if (!transport.beacon) {
        dispatchSaveStatus(false, { error: "network" });
        scheduleRetry(built.body);
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
    try {
      maybePostScore(body);
    } catch (e) {}
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
    return postRemote({
      action: "load_pack",
      id: id,
      token: token,
      program: PROGRAM,
    }).then(function (res) {
      loadDone = true;
      hydrated = !!(res && res.ok);
      if (res && res.ok && res.found && res.progress_json) {
        serverProgressSnapshot = String(res.progress_json);
      } else if (res && res.ok) {
        serverProgressSnapshot = null;
      }
      if (hydrated && pendingSave && pendingSave.progress_json) {
        var snap = pendingSave;
        flushSave(snap, {});
      }
      return res;
    }).catch(function () {
      loadDone = true;
      hydrated = false;
      return { ok: false, error: "load_failed" };
    });
  }

  function resetSession() {
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
      lastSuccessfulPackedJson: function () { return lastSuccessfulPackedJson; },
    },
  };
})(typeof window !== "undefined" ? window : global);
