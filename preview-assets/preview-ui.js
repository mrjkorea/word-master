/* Preview-only UI for Word Master: language chip pickers that drive the hidden
   #lang-select / #lang-select-boot (value + "change"), and a how-to chip for the path note.
   No game, test, progress or auth logic touched. */
(function () {
  "use strict";
  var labels = [];
  function syncAll() { labels.forEach(function (f) { f(); }); }
  /* Root cause fix (added file only): the app's save step merges the student's previously saved
     state from localStorage back in, and that old copy carries the old "locale", so a new choice
     was overwritten straight away. Write the chosen locale into the saved copies first, then let
     the app's own change handler run as normal. */
  function keepLocale(v) {
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (!k || k.indexOf("mrj.word_factory.state") !== 0) continue;
        var o = JSON.parse(localStorage.getItem(k));
        if (o && typeof o === "object" && o.locale !== v) { o.locale = v; localStorage.setItem(k, JSON.stringify(o)); }
      }
    } catch (e) {}
  }
  function picker(id) {
    var sel = document.getElementById(id);
    if (!sel || !sel.options.length) return false;
    if (sel.getAttribute("data-pv")) return true;
    sel.setAttribute("data-pv", "1");
    var host = sel.closest("label") || sel;
    host.classList.add("pv-hidden-control");
    var wrap = document.createElement("div"); wrap.className = "pv-lang";
    var btn = document.createElement("button"); btn.type = "button"; btn.className = "pv-lang-btn";
    var pop = document.createElement("div"); pop.className = "pv-lang-pop"; pop.hidden = true;
    function label() { btn.textContent = "🌐 " + ((sel.options[sel.selectedIndex] || {}).textContent || ""); }
    function choose(v) {
      keepLocale(v);
      sel.value = v;
      sel.dispatchEvent(new Event("input", { bubbles: true }));
      sel.dispatchEvent(new Event("change", { bubbles: true }));
      syncAll();
    }
    function fill() {
      pop.innerHTML = "";
      Array.prototype.forEach.call(sel.options, function (o) {
        var c = document.createElement("button"); c.type = "button";
        c.className = "pv-lang-chip" + (o.value === sel.value ? " is-on" : "");
        c.textContent = o.textContent;
        c.onclick = function () { choose(o.value); pop.hidden = true; };
        pop.appendChild(c);
      });
    }
    btn.onclick = function () { fill(); pop.hidden = !pop.hidden; };
    document.addEventListener("click", function (e) { if (!wrap.contains(e.target)) pop.hidden = true; });
    sel.addEventListener("change", function () { setTimeout(syncAll, 0); });
    labels.push(label);
    label(); wrap.appendChild(btn); wrap.appendChild(pop);
    host.parentNode.insertBefore(wrap, host.nextSibling);
    return true;
  }
  function howto() {
    var n = document.querySelector(".path-note");
    if (!n || n.getAttribute("data-pv")) return;
    n.setAttribute("data-pv", "1");
    n.classList.add("pv-clamp-note");
    var b = document.createElement("button"); b.type = "button"; b.className = "pv-howto"; b.textContent = "💡 How it works";
    b.onclick = function () { var open = n.classList.toggle("pv-open"); b.textContent = open ? "▲ Close" : "💡 How it works"; };
    n.parentNode.insertBefore(b, n);
  }
  /* keep the chip label in sync when the app re-renders or resets the select */
  setInterval(syncAll, 1000);
  var k = 0;
  (function wait() { var a = picker("lang-select"), c = picker("lang-select-boot"); howto(); if (!(a && c) && k++ < 100) setTimeout(wait, 100); })();
})();
