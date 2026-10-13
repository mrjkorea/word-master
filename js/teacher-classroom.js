/**
 * Teacher classroom snapshot helpers (mrj-signin teacher_student_snapshot).
 */
(function (root, factory) {
  var api = factory();
  if (root) root.MRJ_WM_teacherClassroom = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this), function () {
  "use strict";

  function normalizeMissingShards(list) {
    if (!Array.isArray(list)) return [];
    return list.map(function (id) {
      return String(id || "").trim();
    }).filter(function (id) { return !!id; });
  }

  function incompleteFromSnapshotResponse(res) {
    res = res && typeof res === "object" ? res : {};
    return {
      incomplete: !!res.incomplete,
      missingShards: normalizeMissingShards(res.missingShards),
    };
  }

  function formatIncompleteWarning(missingShards) {
    var packs = normalizeMissingShards(missingShards);
    if (!packs.length) {
      return "Warning: This student’s cloud save is incomplete. Some pack progress could not be loaded from the server.";
    }
    return "Warning: This student’s cloud save is incomplete. Missing packs: " + packs.join(", ") + ".";
  }

  function paintIncompleteWarning(message) {
    if (typeof document === "undefined") return;
    var el = document.getElementById("class-progress-incomplete-warn");
    if (!el) return;
    var text = String(message || "").trim();
    if (!text) {
      el.textContent = "";
      el.hidden = true;
      return;
    }
    el.textContent = text;
    el.hidden = false;
  }

  function applySnapshotIncompleteFlags(res) {
    var meta = incompleteFromSnapshotResponse(res);
    if (meta.incomplete) {
      paintIncompleteWarning(formatIncompleteWarning(meta.missingShards));
    } else {
      paintIncompleteWarning("");
    }
    return meta;
  }

  return {
    normalizeMissingShards: normalizeMissingShards,
    incompleteFromSnapshotResponse: incompleteFromSnapshotResponse,
    formatIncompleteWarning: formatIncompleteWarning,
    paintIncompleteWarning: paintIncompleteWarning,
    applySnapshotIncompleteFlags: applySnapshotIncompleteFlags,
  };
});
