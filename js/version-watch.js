/**
 * Version watch (calm). Checks version.json now and then. If the live build is
 * different from this page's WM_BUILD_ID it shows a SMALL banner with a Reload
 * button. It never blocks the page (no confirm/alert), never re-checks on window
 * focus, and shows at most once per remote build per browser session. If the page
 * was reloaded and the mismatch is still there, it stays quiet.
 */
(function (root) {
  "use strict";

  var LOCAL_BUILD = root.WM_BUILD_ID || "";
  var CHECK_MS = 10 * 60 * 1000;
  var KEY = "mrj.wm.updateBannerShown";
  var timer = null;
  var shownThisPage = false;

  function seen(remote) {
    try { return root.sessionStorage && root.sessionStorage.getItem(KEY) === remote; } catch (e) { return false; }
  }
  function markSeen(remote) {
    try { if (root.sessionStorage) root.sessionStorage.setItem(KEY, remote); } catch (e) {}
  }

  function showBanner(remote) {
    var doc = root.document;
    if (!doc || !doc.body || shownThisPage) return;
    shownThisPage = true;
    markSeen(remote);
    var bar = doc.createElement("div");
    bar.id = "wm-update-banner";
    bar.setAttribute("role", "status");
    bar.style.cssText = "position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:9999;" +
      "background:#fff8d6;color:#333;border:1px solid #e0c96a;border-radius:10px;padding:6px 10px;" +
      "font:14px/1.3 system-ui,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.15);display:flex;gap:8px;align-items:center";
    var txt = doc.createElement("span");
    txt.textContent = "Word Master has an update.";
    var go = doc.createElement("button");
    go.type = "button";
    go.textContent = "Reload";
    go.style.cssText = "font:inherit;padding:2px 8px;cursor:pointer";
    go.addEventListener("click", function () { root.location.reload(); });
    var x = doc.createElement("button");
    x.type = "button";
    x.setAttribute("aria-label", "Close");
    x.textContent = "\u00d7";
    x.style.cssText = "font:inherit;border:0;background:none;cursor:pointer";
    x.addEventListener("click", function () { if (bar.parentNode) bar.parentNode.removeChild(bar); });
    bar.appendChild(txt);
    bar.appendChild(go);
    bar.appendChild(x);
    doc.body.appendChild(bar);
  }

  function check() {
    if (!LOCAL_BUILD || shownThisPage || typeof fetch !== "function") return;
    fetch("version.json?_=" + Date.now(), { cache: "no-store" })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (data) {
        var remote = data && data.build ? String(data.build) : "";
        if (!remote || remote === LOCAL_BUILD) return;
        if (seen(remote)) return; // already told this session (or reload did not help): stay quiet
        showBanner(remote);
      })
      .catch(function () {});
  }

  function arm() {
    if (timer) return;
    timer = setInterval(check, CHECK_MS);
    setTimeout(check, 30000);
  }

  root.WMVersionWatch = { check: check, _showBanner: showBanner };

  if (root.document && root.document.readyState === "loading") {
    root.document.addEventListener("DOMContentLoaded", arm);
  } else {
    arm();
  }
})(window);
