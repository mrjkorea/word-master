/**
 * Optional Sign in for a news pack. It never locks the page.
 * Anonymous play stays open. A signed-in student keeps their save.
 */
(function () {
  "use strict";
  if (!window.WM_PUBLIC_PACK) return;

  var panel = document.getElementById("wm-public-signin-panel");
  var slot = document.getElementById("wm-public-signin-slot");
  var closeBtn = document.getElementById("wm-public-signin-close");
  var mounted = false;

  function buttons() {
    return document.querySelectorAll("[data-wm-signin]");
  }

  function showButtons(on) {
    var list = buttons();
    for (var i = 0; i < list.length; i++) list[i].hidden = !on;
  }

  function openPanel() {
    if (!panel) return;
    panel.hidden = false;
    mountOnce();
  }

  function mountOnce() {
    if (mounted) return;
    if (!slot || !window.MRJ_AUTH || typeof window.MRJ_AUTH.mount !== "function") return;
    mounted = true;
    window.MRJ_AUTH.mount(slot, {
      app: "word-master",
      onReady: function (info) {
        info = info || {};
        var id = info.id != null ? info.id : (window.MRJ_AUTH.student ? window.MRJ_AUTH.student() : "");
        if (id) {
          if (panel) panel.hidden = true;
          showButtons(false);
        }
        try {
          document.dispatchEvent(new CustomEvent("mrj-auth-ready", {
            bubbles: true,
            detail: {
              id: id,
              progress: info.progress != null ? info.progress : [],
              progressError: info.progressError != null ? info.progressError : ""
            }
          }));
        } catch (e) {}
      }
    });
  }

  var list = buttons();
  for (var i = 0; i < list.length; i++) {
    list[i].hidden = false;
    list[i].addEventListener("click", openPanel);
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      if (panel) panel.hidden = true;
    });
  }
  document.addEventListener("click", function (ev) {
    var target = ev.target;
    if (target && target.id === "btn-signout") showButtons(true);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountOnce);
  } else {
    mountOnce();
  }
})();
