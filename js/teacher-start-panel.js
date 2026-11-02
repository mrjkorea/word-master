/**
 * Teacher "start from here" panel — opened from the mrj-auth Teacher chip (top right).
 */
(function (root) {
  "use strict";

  var panelOpen = false;
  var skipChipCapture = false;

  function $(sel) {
    return root.document ? root.document.querySelector(sel) : null;
  }

  function api() {
    return root.WMTeacherStart || null;
  }

  function appHooks() {
    return root.WMTeacherStartHooks || null;
  }

  function teacherActive() {
    try {
      var auth = root.MRJ_AUTH || root.MRJSignin;
      return !!(auth && typeof auth.isTeacher === "function" && auth.isTeacher());
    } catch (e) {
      return false;
    }
  }

  function ensureShell() {
    if (!root.document || !root.document.body) return null;
    var host = $("#teacher-start-panel-root");
    if (host) return host;
    host = root.document.createElement("div");
    host.id = "teacher-start-panel-root";
    host.hidden = true;
    host.setAttribute("aria-hidden", "true");
    root.document.body.appendChild(host);
    return host;
  }

  function closePanel() {
    panelOpen = false;
    var host = ensureShell();
    if (!host) return;
    host.hidden = true;
    host.setAttribute("aria-hidden", "true");
    host.innerHTML = "";
    root.document.body.classList.remove("teacher-start-panel-open");
  }

  function stepLabel(step) {
    var map = {
      intro: "1 Meet",
      A: "2 Learn",
      B: "3 Dictation",
      C: "4 Write",
      games: "5 Games",
      test: "6 Test",
    };
    return map[step] || step;
  }

  function renderPanel() {
    var hooks = appHooks();
    var TU = api();
    if (!hooks || !TU || typeof hooks.getContext !== "function") return;
    var ctx = hooks.getContext();
    if (!ctx || !ctx.studentId) {
      closePanel();
      return;
    }
    var host = ensureShell();
    if (!host) return;
    host.hidden = false;
    host.setAttribute("aria-hidden", "false");
    root.document.body.classList.add("teacher-start-panel-open");
    host.innerHTML = "";

    var backdrop = root.document.createElement("button");
    backdrop.type = "button";
    backdrop.className = "teacher-start-backdrop";
    backdrop.setAttribute("aria-label", "Close");
    backdrop.addEventListener("click", closePanel);

    var dialog = root.document.createElement("div");
    dialog.className = "teacher-start-dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-label", "Teacher unlock");

    var header = root.document.createElement("div");
    header.className = "teacher-start-header";
    var title = root.document.createElement("h2");
    title.textContent = "Start from here";
    var sub = root.document.createElement("p");
    sub.className = "teacher-start-sub";
    sub.textContent = "Student: " + ctx.studentId + (ctx.packTitle ? " · " + ctx.packTitle : "");
    var closeBtn = root.document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "teacher-start-close";
    closeBtn.textContent = "×";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.addEventListener("click", closePanel);
    header.appendChild(title);
    header.appendChild(sub);
    header.appendChild(closeBtn);

    var body = root.document.createElement("div");
    body.className = "teacher-start-body";

    var open = TU.listOpenSections(ctx.set, ctx.rootUnlock);
    if (open.startAt) {
      var startLine = root.document.createElement("p");
      startLine.className = "teacher-start-note";
      startLine.textContent = "Student start point: word " + open.startAt;
      body.appendChild(startLine);
    }

    function addSection(titleText, listEl) {
      var sec = root.document.createElement("section");
      sec.className = "teacher-start-section";
      var h = root.document.createElement("h3");
      h.textContent = titleText;
      sec.appendChild(h);
      sec.appendChild(listEl);
      body.appendChild(sec);
    }

    var pathList = root.document.createElement("ul");
    pathList.className = "teacher-start-list";
    TU.PATH_STEPS.forEach(function (step) {
      var on = !!(ctx.set && TU.isPathStepUnlocked(ctx.set, step));
      var li = root.document.createElement("li");
      var row = root.document.createElement("div");
      row.className = "teacher-start-row";
      var label = root.document.createElement("span");
      label.textContent = stepLabel(step) + (on ? " · open" : "");
      var openBtn = root.document.createElement("button");
      openBtn.type = "button";
      openBtn.className = "teacher-start-action";
      openBtn.textContent = on ? "Re-lock" : "Open";
      openBtn.addEventListener("click", function () {
        if (on) hooks.relockPathStep(ctx.set, step);
        else hooks.unlockPathStep(ctx.set, step);
        hooks.persistAndRefresh();
        renderPanel();
      });
      row.appendChild(label);
      row.appendChild(openBtn);
      li.appendChild(row);
      pathList.appendChild(li);
    });
    addSection("Path steps (this word group)", pathList);

    if (ctx.set && ctx.set.words && ctx.set.words.length) {
      var groupList = root.document.createElement("ul");
      groupList.className = "teacher-start-list";
      TU.groupStartsForWords(ctx.set.words).forEach(function (startN) {
        var onG = TU.isGroupUnlocked(ctx.set, startN);
        var liG = root.document.createElement("li");
        var rowG = root.document.createElement("div");
        rowG.className = "teacher-start-row";
        var labelG = root.document.createElement("span");
        labelG.textContent = "Words " + startN + "–" + Math.min(startN + 4, ctx.set.words.length) +
          (onG ? " · open" : "");
        var startBtn = root.document.createElement("button");
        startBtn.type = "button";
        startBtn.className = "teacher-start-action primary";
        startBtn.textContent = "Start here";
        startBtn.addEventListener("click", function () {
          hooks.startFromGroup(ctx.set, startN);
          hooks.persistAndRefresh();
          renderPanel();
        });
        var lockBtn = root.document.createElement("button");
        lockBtn.type = "button";
        lockBtn.className = "teacher-start-action";
        lockBtn.textContent = onG ? "Re-lock" : "Open only";
        lockBtn.addEventListener("click", function () {
          if (onG) hooks.relockGroup(ctx.set, startN);
          else hooks.unlockGroupOnly(ctx.set, startN);
          hooks.persistAndRefresh();
          renderPanel();
        });
        rowG.appendChild(labelG);
        rowG.appendChild(startBtn);
        rowG.appendChild(lockBtn);
        liG.appendChild(rowG);
        groupList.appendChild(liG);
      });
      addSection("Word groups (every 5 words)", groupList);
    }

    if (typeof hooks.listHomePacks === "function") {
      var packs = hooks.listHomePacks();
      if (packs && packs.length) {
        var packList = root.document.createElement("ul");
        packList.className = "teacher-start-list";
        packs.forEach(function (p) {
          var teacherMarked = !!(ctx.rootUnlock && ctx.rootUnlock.packs && ctx.rootUnlock.packs[p.id]);
          var liP = root.document.createElement("li");
          var rowP = root.document.createElement("div");
          rowP.className = "teacher-start-row";
          var labelP = root.document.createElement("span");
          labelP.textContent = p.label + (teacherMarked ? " · teacher open" : "");
          var btnP = root.document.createElement("button");
          btnP.type = "button";
          btnP.className = "teacher-start-action";
          btnP.textContent = ctx.rootUnlock && ctx.rootUnlock.packs && ctx.rootUnlock.packs[p.id] ? "Re-lock" : "Open level";
          btnP.addEventListener("click", function () {
            if (ctx.rootUnlock && ctx.rootUnlock.packs && ctx.rootUnlock.packs[p.id]) {
              hooks.relockPackLevel(p.id);
            } else {
              hooks.unlockPackLevel(p.id);
            }
            hooks.persistAndRefresh();
            renderPanel();
          });
          rowP.appendChild(labelP);
          rowP.appendChild(btnP);
          liP.appendChild(rowP);
          packList.appendChild(liP);
        });
        addSection("Pack levels (home)", packList);
      }
    }

    var footer = root.document.createElement("div");
    footer.className = "teacher-start-footer";
    var exitBtn = root.document.createElement("button");
    exitBtn.type = "button";
    exitBtn.className = "teacher-start-action";
    exitBtn.textContent = "Exit teacher mode";
    exitBtn.addEventListener("click", function () {
      closePanel();
      skipChipCapture = true;
      var chip = root.document.querySelector(".mrj-auth-teacher-btn");
      if (chip) chip.click();
      skipChipCapture = false;
    });
    footer.appendChild(exitBtn);

    dialog.appendChild(header);
    dialog.appendChild(body);
    dialog.appendChild(footer);
    host.appendChild(backdrop);
    host.appendChild(dialog);
  }

  function openPanel() {
    if (!teacherActive()) return;
    panelOpen = true;
    renderPanel();
  }

  function togglePanel() {
    if (panelOpen) closePanel();
    else openPanel();
  }

  function onChipClickCapture(ev) {
    if (skipChipCapture || !teacherActive()) return;
    var t = ev.target;
    if (!t || !t.closest) return;
    if (!t.closest(".mrj-auth-teacher-btn")) return;
    ev.preventDefault();
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    togglePanel();
  }

  function install() {
    if (!root.document) return;
    root.document.addEventListener("click", onChipClickCapture, true);
    root.document.addEventListener("mrj-teacher", function () {
      if (teacherActive()) openPanel();
    });
    root.document.addEventListener("keydown", function (ev) {
      if (!panelOpen) return;
      if (ev && (ev.key === "Escape" || ev.key === "Esc")) closePanel();
    });
  }

  root.WMTeacherStartPanel = {
    open: openPanel,
    close: closePanel,
    render: renderPanel,
    install: install,
  };

  install();
})(typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : this);
