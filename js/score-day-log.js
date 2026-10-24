/**
 * Per-day study word log for Word Master cloud progress (dailyWordLog).
 * Global word numbers follow pack tile ranges (e.g. nouns200 → 101–200).
 */
(function (root, factory) {
  var api = factory();
  if (root) root.MRJ_WM_scoreDayLog = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this), function () {
  "use strict";

  function localDateKey(at) {
    var d = at ? new Date(Number(at) || at) : new Date();
    if (isNaN(d.getTime())) d = new Date();
    var pad = function (n) {
      return (n < 10 ? "0" : "") + n;
    };
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  function packWordBase(packId) {
    var id = String(packId || "");
    var ielts = id.match(/^ielts(\d{2})$/);
    if (ielts) {
      var p = parseInt(ielts[1], 10);
      if (isFinite(p) && p >= 1) return (p - 1) * 100 + 1;
    }
    var m = id.match(/(\d+)\s*$/);
    if (!m) return 1;
    var n = parseInt(m[1], 10);
    if (!isFinite(n) || n < 1) return 1;
    if (n >= 100) return n - 99;
    return 1;
  }

  function wordIndexInPack(words, wordId) {
    if (!Array.isArray(words) || !wordId) return 0;
    for (var i = 0; i < words.length; i++) {
      if (words[i] && String(words[i].id) === String(wordId)) return i + 1;
    }
    return 0;
  }

  function globalWordNumber(packId, indexInPack) {
    var idx = Math.max(1, Math.floor(Number(indexInPack)) || 1);
    return packWordBase(packId) + idx - 1;
  }

  function rangeLabel(fromNum, toNum) {
    var a = Math.min(fromNum, toNum);
    var b = Math.max(fromNum, toNum);
    if (!a && !b) return "";
    if (a === b) return "Word " + a;
    return "Words " + a + "–" + b;
  }

  function wordsLine(ens, max) {
    var list = (ens || []).filter(Boolean);
    var lim = max == null ? 24 : Math.max(1, max | 0);
    if (list.length <= lim) return list.join(", ");
    return list.slice(0, lim).join(", ") + " …";
  }

  function emptyLog() {
    return { v: 1, days: {} };
  }

  function normalizeLog(raw) {
    if (!raw || typeof raw !== "object") return emptyLog();
    var days = raw.days && typeof raw.days === "object" ? raw.days : {};
    return { v: 1, days: days };
  }

  function dayPackKey(dateKey, packId) {
    return String(dateKey || "") + "|" + String(packId || "");
  }

  function mergeWordEntry(existing, word, packId, indexInPack) {
    existing = existing || { ids: [], ens: [], from: 0, to: 0 };
    var id = word && word.id != null ? String(word.id) : "";
    var en = word && word.en != null ? String(word.en).trim() : id;
    if (!id) return existing;
    var ids = Array.isArray(existing.ids) ? existing.ids.slice() : [];
    var ens = Array.isArray(existing.ens) ? existing.ens.slice() : [];
    if (ids.indexOf(id) === -1) {
      ids.push(id);
      ens.push(en || id);
    }
    var g = globalWordNumber(packId, indexInPack);
    var from = existing.from > 0 ? existing.from : g;
    var to = existing.to > 0 ? existing.to : g;
    if (g > 0) {
      from = from > 0 ? Math.min(from, g) : g;
      to = to > 0 ? Math.max(to, g) : g;
    }
    return { ids: ids, ens: ens, from: from, to: to };
  }

  function recordWords(progressObj, packId, words, packWords, at) {
    if (!progressObj || !packId) return progressObj;
    var list = Array.isArray(words) ? words : [];
    if (!list.length) return progressObj;
    var dateKey = localDateKey(at || Date.now());
    var log = normalizeLog(progressObj.dailyWordLog);
    var key = dayPackKey(dateKey, packId);
    var entry = log.days[key] || { ids: [], ens: [], from: 0, to: 0, pack: packId, date: dateKey };
    list.forEach(function (w) {
      if (!w) return;
      var idx = wordIndexInPack(packWords, w.id);
      entry = mergeWordEntry(entry, w, packId, idx);
      entry.pack = packId;
      entry.date = dateKey;
    });
    entry.at = Number(at) || Date.now();
    log.days[key] = entry;
    progressObj.dailyWordLog = log;
    return progressObj;
  }

  function mergeEntries(ea, eb) {
    if (!ea) return eb;
    if (!eb) return ea;
    var packId = ea.pack || eb.pack;
    var seen = {};
    var ids = [];
    var ens = [];
    function addList(src) {
      (src.ids || []).forEach(function (id, i) {
        var k = String(id);
        if (!k || seen[k]) return;
        seen[k] = true;
        ids.push(k);
        ens.push((src.ens || [])[i] || k);
      });
    }
    addList(ea);
    addList(eb);
    var from = 0;
    var to = 0;
    [ea, eb].forEach(function (e) {
      if (e.from > 0) from = from > 0 ? Math.min(from, e.from) : e.from;
      if (e.to > 0) to = to > 0 ? Math.max(to, e.to) : e.to;
    });
    return {
      pack: packId,
      date: ea.date || eb.date,
      ids: ids,
      ens: ens,
      from: from,
      to: to,
      at: Math.max(Number(ea.at) || 0, Number(eb.at) || 0),
    };
  }

  function mergeDailyLogs(a, b) {
    var la = normalizeLog(a);
    var lb = normalizeLog(b);
    var out = { v: 1, days: {} };
    var keys = {};
    Object.keys(la.days).forEach(function (k) {
      keys[k] = 1;
    });
    Object.keys(lb.days).forEach(function (k) {
      keys[k] = 1;
    });
    Object.keys(keys).forEach(function (k) {
      out.days[k] = mergeEntries(la.days[k], lb.days[k]);
    });
    return out;
  }

  function formatDayLine(entry) {
    if (!entry) return "";
    var head = rangeLabel(entry.from, entry.to);
    var body = wordsLine(entry.ens, 32);
    if (head && body) return head + ": " + body;
    return head || body || "";
  }

  function summariesByDate(log, opts) {
    opts = opts || {};
    var normalized = normalizeLog(log);
    var byDate = {};
    Object.keys(normalized.days).forEach(function (key) {
      var e = normalized.days[key];
      if (!e) return;
      var dk = e.date || key.split("|")[0];
      if (!byDate[dk]) byDate[dk] = [];
      var line = formatDayLine(e);
      if (!line) return;
      var pack = e.pack || key.split("|")[1] || "";
      byDate[dk].push({
        pack: pack,
        line: line,
        from: e.from,
        to: e.to,
        ens: (e.ens || []).slice(),
      });
    });
    var dates = Object.keys(byDate).sort().reverse();
    if (opts.limit) dates = dates.slice(0, opts.limit);
    return dates.map(function (date) {
      return { date: date, packs: byDate[date] };
    });
  }

  function panelRowsFromLog(log, program) {
    var prog = String(program || "word-master");
    var rows = [];
    summariesByDate(log, { limit: 120 }).forEach(function (day) {
      (day.packs || []).forEach(function (p) {
        rows.push({
          program: prog,
          item_id: String(p.pack) + ":daily:" + day.date,
          label: p.line,
          local_date: day.date,
          scoreText: p.pack,
        });
      });
    });
    return rows;
  }

  return {
    localDateKey: localDateKey,
    packWordBase: packWordBase,
    wordIndexInPack: wordIndexInPack,
    globalWordNumber: globalWordNumber,
    rangeLabel: rangeLabel,
    wordsLine: wordsLine,
    emptyLog: emptyLog,
    normalizeLog: normalizeLog,
    recordWords: recordWords,
    mergeDailyLogs: mergeDailyLogs,
    formatDayLine: formatDayLine,
    summariesByDate: summariesByDate,
    panelRowsFromLog: panelRowsFromLog,
  };
});
