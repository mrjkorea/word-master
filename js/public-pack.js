/**
 * Public mode for Word Master.
 * ?packsrc=https://mrjkorea.github.io/news-words/packs/<file>.json opens with no
 * sign-in wall. Play is allowed with no account. The sign-in door
 * (mrj-auth-boot.js) is not loaded. A Sign in button can still open the
 * account form. This page keeps the real localStorage so a signed-in student
 * can save. Game frames may still call WM_useMemoryStorage. Load after
 * pack-src.js, before everything else.
 */
(function (root) {
  "use strict";
  function memoryStorage() {
    var m = Object.create(null);
    return {
      getItem: function (k) { k = String(k); return k in m ? m[k] : null; },
      setItem: function (k, v) { m[String(k)] = String(v); },
      removeItem: function (k) { delete m[String(k)]; },
      clear: function () { m = Object.create(null); },
      key: function (i) { var ks = Object.keys(m); return i >= 0 && i < ks.length ? ks[i] : null; },
      get length() { return Object.keys(m).length; },
    };
  }

  function useMemoryStorage(win) {
    try {
      Object.defineProperty(win, "localStorage", { value: memoryStorage(), configurable: true, writable: false });
      return true;
    } catch (e) {
      return false;
    }
  }

  var pub = false;
  try {
    var PackSrc = root.PackSrc;
    pub = !!(PackSrc && PackSrc.isPublicPackSrc(PackSrc.readPackSrcFromLocation(root.location)));
  } catch (e) {
    pub = false;
  }
  root.WM_PUBLIC_PACK = pub;
  root.WM_useMemoryStorage = useMemoryStorage;
  if (pub) {
    try { root.document.documentElement.classList.add("wm-public"); } catch (e) {}
  }
})(typeof window !== "undefined" ? window : globalThis);
