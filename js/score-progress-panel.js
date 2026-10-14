(function () {
  "use strict";

  function wirePanelProvider() {
    var auth = window.MRJ_AUTH;
    var logApi = window.MRJ_WM_scoreDayLog;
    if (!auth || typeof auth.setPanelRowsProvider !== "function" || !logApi) return;
    auth.setPanelRowsProvider(function () {
      var log = null;
      if (typeof window.MRJ_WM_dailyWordLog === "function") {
        log = window.MRJ_WM_dailyWordLog();
      }
      if (!log || !log.days || !Object.keys(log.days).length) return [];
      return logApi.panelRowsFromLog(log, "word-master");
    });
  }

  function tryWire() {
    if (window.MRJ_AUTH && window.MRJ_AUTH.setPanelRowsProvider) {
      wirePanelProvider();
      return;
    }
    window.addEventListener("mrj-auth-ready", function () {
      wirePanelProvider();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", tryWire);
  } else {
    tryWire();
  }
})();
