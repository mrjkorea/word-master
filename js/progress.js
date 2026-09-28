(function (root) {
  "use strict";

  var LS_KEY = "mrj.wm.progress";

  function fields(payload) {
    var p = payload || {};
    return {
      action: p.action || "",
      name: p.name || "",
      pin: p.pin || "",
      pack_id: p.pack_id || "",
      pack_title: p.pack_title || "",
      screen: p.screen || "",
      word_id: p.word_id || "",
      study_size: p.study_size || 0,
      locale: p.locale || "",
      student_id: p.student_id || "",
      progress_json: p.progress_json || "",
    };
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

  function postRemote(payload) {
    var url = root.WM_PROGRESS_URL;
    if (!url) return Promise.resolve(null);
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields(payload)),
    }).then(function (res) {
      return res.json();
    });
  }

  // Jay 28SEP2026: also log the finished item in the ONE score book.
  function toOneBook(payload) {
    var p = payload || {};
    var prog = null;
    try { prog = JSON.parse(p.progress_json || "null"); } catch (e) {}
    var known = (prog && (prog.known || prog.correct || prog.knownCount)) || 0;
    var total = (prog && (prog.total || prog.studySize)) || p.study_size || 0;
    if (!window.MRJ_SCORES || !total) return Promise.resolve(null);
    return window.MRJ_SCORES.post({
      student: p.name || "",
      program: "word-master",
      appName: "MRJ Word Master",
      source: "word-master",
      bookTitle: p.pack_title || "",
      unitTitle: p.pack_id || "",
      itemId: [p.pack_id || "pack", p.screen || "screen", p.word_id || ""].join(":"),
      itemType: "word_study",
      scoreValue: known,
      scoreMax: total
    });
  }

  function save(payload) {
    var body = fields(payload);
    if (!body.action) body.action = "save";
    writeLocal(body);
    try { toOneBook(body); } catch (e) {}
    return postRemote(body);
  }

  function load(payload) {
    var body = fields(payload || readLocal() || {});
    body.action = "load";
    return postRemote(body);
  }

  root.MRJ_WM_progress = { save: save, load: load };
})(window);
