/* Preview-only UI for Word Master: language chip pickers that drive the hidden
   #lang-select / #lang-select-boot (value + "change"), and a how-to chip for the path note.
   No game, test, progress or auth logic touched. */
(function () {
  "use strict";
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
    function fill() {
      pop.innerHTML = "";
      Array.prototype.forEach.call(sel.options, function (o) {
        var c = document.createElement("button"); c.type = "button";
        c.className = "pv-lang-chip" + (o.value === sel.value ? " is-on" : "");
        c.textContent = o.textContent;
        c.onclick = function () { sel.value = o.value; sel.dispatchEvent(new Event("change", { bubbles: true })); label(); pop.hidden = true; };
        pop.appendChild(c);
      });
    }
    btn.onclick = function () { fill(); pop.hidden = !pop.hidden; };
    document.addEventListener("click", function (e) { if (!wrap.contains(e.target)) pop.hidden = true; });
    sel.addEventListener("change", label);
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
  var k = 0;
  (function wait() { var a = picker("lang-select"), c = picker("lang-select-boot"); howto(); if (!(a && c) && k++ < 100) setTimeout(wait, 100); })();
})();
