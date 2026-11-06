/**
 * Version watch (calm, and quiet mid-activity).
 *
 * Jay 2026-11-06, in class: a page kept saying "there is an update" with no way to
 * cancel it, and a reload gave back the same cached page. The shared rule
 * (~/OpenBot/Shared/UPDATE-NOTICE-RULE.md) is now:
 *   - the notice is a small bar, never a blocking dialog; buttons Later and Reload;
 *   - Later hides it for 6 hours, and it never asks twice within 10 minutes;
 *   - Reload adds ?_v=<build> so the browser must fetch a fresh page;
 *   - it never appears while a student is mid-activity (test, learn, game, listen).
 *
 * It still never blocks the page (no confirm/alert) and shows at most once per
 * remote build per browser session.
 */
(function (root) {
  "use strict";

  var LOCAL_BUILD = root.WM_BUILD_ID || "";
  var CHECK_MS = 10 * 60 * 1000;
  var SOON_MS = 3 * 60 * 1000;
  var GAP_MS = 10 * 60 * 1000;
  var SNOOZE_MS = 6 * 60 * 60 * 1000;
  var KEYS = {
    seen: "mrj.wm.updateBannerShown",
    snooze: "mrj.wm.updateSnoozeUntil",
    asked: "mrj.wm.updateAskedAt",
  };
  // Screens where a student is doing the work: a bar must wait for the finish.
  var BUSY_SCREENS = ["test", "learn", "intro", "match", "listen", "playgame"];
  var timer = null;
  var soon = null;
  var shownThisPage = false;

  function get(key) {
    try {
      return (root.sessionStorage && root.sessionStorage.getItem(key)) ||
        (root.localStorage && root.localStorage.getItem(key)) || "";
    } catch (e) {
      return "";
    }
  }
  function set(key, value) {
    try { if (root.sessionStorage) root.sessionStorage.setItem(key, value); } catch (e) {}
    try { if (root.localStorage) root.localStorage.setItem(key, value); } catch (e) {}
  }
  function seen(remote) {
    try { return !!root.sessionStorage && root.sessionStorage.getItem(KEYS.seen) === remote; } catch (e) { return false; }
  }
  function markSeen(remote) {
    try { if (root.sessionStorage) root.sessionStorage.setItem(KEYS.seen, remote); } catch (e) {}
  }
  function snoozed() {
    var until = Number(get(KEYS.snooze)) || 0;
    return Date.now() < until;
  }
  function gapOk() {
    var last = Number(get(KEYS.asked)) || 0;
    if (last && Date.now() - last < GAP_MS) return false;
    set(KEYS.asked, String(Date.now()));
    return true;
  }

  function busy() {
    var doc = root.document;
    if (!doc) return false;
    try {
      var screen = doc.querySelector(".screen.active");
      var name = screen ? String(screen.getAttribute("data-screen") || screen.id || "") : "";
      if (name && name.indexOf("screen-") === 0) name = name.slice(7);
      if (BUSY_SCREENS.indexOf(name) >= 0) return true;
      if (doc.getElementById("try-again-layer")) return true;
      if (doc.getElementById("wm-update-banner")) return true;
    } catch (e) {}
    return false;
  }

  function reloadNow(remote) {
    try {
      var url = new URL(root.location.href);
      url.searchParams.set("_v", remote || String(Date.now()));
      root.location.replace(url.toString());
    } catch (e) {
      try { root.location.reload(); } catch (e2) {}
    }
  }

  function showBanner(remote) {
    var doc = root.document;
    if (!doc || !doc.body || shownThisPage) return;
    shownThisPage = true;
    markSeen(remote);
    var bar = doc.createElement("div");
    bar.id = "wm-update-banner";
    bar.setAttribute("role", "status");
    bar.style.cssText = "position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:9999;max-width:calc(100vw - 20px);" +
      "background:#fff8d6;color:#333;border:1px solid #e0c96a;border-radius:10px;padding:6px 10px;" +
      "font:14px/1.3 system-ui,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.15);display:flex;gap:8px;align-items:center";
    var txt = doc.createElement("span");
    txt.textContent = "Word Master has an update. Reload so your work saves.";
    txt.style.cssText = "flex:1;min-width:0";
    var later = doc.createElement("button");
    later.type = "button";
    later.textContent = "Later";
    later.setAttribute("aria-label", "Close the update notice for 6 hours");
    later.style.cssText = "font:inherit;padding:4px 8px;cursor:pointer;flex:0 0 auto;border:1px solid #e0c96a;background:#fff;border-radius:8px";
    later.addEventListener("click", function () {
      try { set(KEYS.snooze, String(Date.now() + SNOOZE_MS)); } catch (e) {}
      if (bar.parentNode) bar.parentNode.removeChild(bar);
    });
    var go = doc.createElement("button");
    go.type = "button";
    go.textContent = "Reload";
    go.style.cssText = "font:inherit;padding:4px 10px;cursor:pointer;flex:0 0 auto;border:0;background:#0033b8;color:#fff;border-radius:8px";
    go.addEventListener("click", function () { reloadNow(remote); });
    bar.appendChild(txt);
    bar.appendChild(later);
    bar.appendChild(go);
    doc.body.appendChild(bar);
  }

  // A real mismatch was found but the student is busy: look again soon, quietly.
  function checkSoon() {
    if (soon) return;
    soon = setTimeout(function () {
      soon = null;
      check();
    }, SOON_MS);
  }

  function check() {
    if (!LOCAL_BUILD || shownThisPage || typeof fetch !== "function") return;
    if (snoozed()) return;
    fetch("version.json?_=" + Date.now(), { cache: "no-store" })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (data) {
        var remote = data && data.build ? String(data.build) : "";
        if (!remote || remote === LOCAL_BUILD) return;
        if (seen(remote)) return; // already told this session (or the reload did not help): stay quiet
        if (root.document && root.document.visibilityState === "hidden") { checkSoon(); return; }
        if (busy()) { checkSoon(); return; }
        if (!gapOk()) { checkSoon(); return; }
        showBanner(remote);
      })
      .catch(function () {});
  }

  function arm() {
    if (timer) return;
    timer = setInterval(check, CHECK_MS);
    setTimeout(check, 30000);
  }

  root.WMVersionWatch = { check: check, _showBanner: showBanner, _busy: busy };

  if (root.document && root.document.readyState === "loading") {
    root.document.addEventListener("DOMContentLoaded", arm);
  } else {
    arm();
  }
})(window);
