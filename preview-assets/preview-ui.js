/* Preview-only UI for Word Master: language chip picker on #lang-select (value + "change"),
   and a how-to chip for the path note. No game, test, progress or auth logic touched. */
(function () {
  "use strict";

  var outsideCloseBound = false;

  function bindOutsideClose(wrap, pop) {
    if (outsideCloseBound) return;
    outsideCloseBound = true;
    document.addEventListener(
      "click",
      function (e) {
        document.querySelectorAll(".pv-lang-pop").forEach(function (p) {
          if (p.hidden) return;
          var w = p.closest(".pv-lang");
          if (w && !w.contains(e.target)) p.hidden = true;
        });
      },
      true
    );
  }

  function picker(id) {
    var sel = document.getElementById(id);
    if (!sel || !sel.options.length) return false;
    if (sel.getAttribute("data-pv")) return true;
    sel.setAttribute("data-pv", "1");
    var host = sel.closest("label") || sel;
    host.classList.add("pv-hidden-control");
    sel.setAttribute("tabindex", "-1");
    sel.setAttribute("aria-hidden", "true");

    var wrap = document.createElement("div");
    wrap.className = "pv-lang";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pv-lang-btn";
    btn.setAttribute("aria-haspopup", "listbox");
    btn.setAttribute("aria-expanded", "false");
    var pop = document.createElement("div");
    pop.className = "pv-lang-pop";
    pop.hidden = true;
    pop.setAttribute("role", "listbox");

    function label() {
      btn.textContent = "🌐 " + ((sel.options[sel.selectedIndex] || {}).textContent || "");
    }

    function setOpen(open) {
      pop.hidden = !open;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }

    function fill() {
      pop.innerHTML = "";
      Array.prototype.forEach.call(sel.options, function (o) {
        var c = document.createElement("button");
        c.type = "button";
        c.className = "pv-lang-chip" + (o.value === sel.value ? " is-on" : "");
        c.textContent = o.textContent;
        c.setAttribute("role", "option");
        c.setAttribute("aria-selected", o.value === sel.value ? "true" : "false");
        c.addEventListener("click", function (ev) {
          ev.stopPropagation();
          sel.value = o.value;
          sel.dispatchEvent(new Event("change", { bubbles: true }));
          label();
          setOpen(false);
        });
        pop.appendChild(c);
      });
    }

    function toggle(ev) {
      if (ev) ev.stopPropagation();
      var open = pop.hidden;
      if (open) fill();
      setOpen(open);
    }

    btn.addEventListener("click", toggle);
    wrap.addEventListener("click", function (ev) {
      if (ev.target === wrap) toggle(ev);
    });

    sel.addEventListener("change", label);
    bindOutsideClose(wrap, pop);
    label();
    wrap.appendChild(btn);
    wrap.appendChild(pop);
    host.parentNode.insertBefore(wrap, host.nextSibling);
    return true;
  }

  function howto() {
    var n = document.querySelector(".path-note");
    if (!n || n.getAttribute("data-pv")) return;
    n.setAttribute("data-pv", "1");
    n.classList.add("pv-clamp-note");
    var b = document.createElement("button");
    b.type = "button";
    b.className = "pv-howto";
    b.textContent = "💡 How it works";
    b.onclick = function () {
      var open = n.classList.toggle("pv-open");
      b.textContent = open ? "▲ Close" : "💡 How it works";
    };
    n.parentNode.insertBefore(b, n);
  }

  var k = 0;
  (function wait() {
    var ok = picker("lang-select");
    howto();
    if (!ok && k++ < 100) setTimeout(wait, 100);
  })();
})();
