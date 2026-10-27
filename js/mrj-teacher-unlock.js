/**
 * Teacher PIN unlock (study_teacher_check on MRJ_AUTH.ENDPOINT).
 * Honors MRJSignin / MRJ_AUTH.isTeacher() from the server; session PIN is in-memory only.
 */
(function (root) {
  "use strict";

  var pinUnlocked = false;
  var teacherBtn = null;
  var panelEl = null;

  function auth() {
    return root.MRJ_AUTH || root.MRJSignin || null;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function isMrjTeacher() {
    try {
      var api = auth();
      return !!(api && typeof api.isTeacher === "function" && api.isTeacher());
    } catch (ignore) {
      return false;
    }
  }

  function isUnlocked() {
    return isMrjTeacher() || pinUnlocked;
  }

  function teacherCheck(pin) {
    var a = auth();
    if (a && a.preview) {
      return Promise.resolve(
        a.teacherCheck
          ? a.teacherCheck(pin)
          : { ok: false, message: "Preview has no teacher check." }
      );
    }
    if (!a || !a.ENDPOINT) {
      return Promise.resolve({ ok: false, message: "Sign-in is not loaded." });
    }
    var body = {
      action: "study_teacher_check",
      pin: pin,
      id: a.student && a.student(),
      token: a.token && a.token(),
    };
    return fetch(a.ENDPOINT, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body),
    })
      .then(function (r) {
        return r.json();
      })
      .catch(function () {
        return { ok: false, message: "Network error." };
      })
      .then(function (r) {
        if (r && r.error === "bad_action") {
          return {
            ok: false,
            message: "Teacher check is not on the server yet (deploy backend/teacher-unlock.patch).",
          };
        }
        return r || { ok: false };
      });
  }

  function installRefresh(onRefresh) {
    if (!root.document || typeof onRefresh !== "function") return;
    root.document.addEventListener("mrj-teacher", function () {
      try {
        onRefresh();
      } catch (ignore) {}
    });
    if (isUnlocked()) {
      try {
        onRefresh();
      } catch (ignore2) {}
    }
  }

  function ensurePanel() {
    if (panelEl || !root.document || !root.document.body) return;
    panelEl = root.document.createElement("div");
    panelEl.id = "mrj-teacher-unlock-panel";
    panelEl.className = "mrj-teacher-unlock-panel";
    panelEl.hidden = true;
    root.document.body.appendChild(panelEl);
    root.addEventListener("resize", positionPanel);
    root.addEventListener("orientationchange", positionPanel);
  }

  function positionPanel() {
    if (!panelEl || panelEl.hidden || !teacherBtn) return;
    var r = teacherBtn.getBoundingClientRect();
    panelEl.style.top = r.bottom + 8 + "px";
    panelEl.style.right = Math.max(8, root.innerWidth - r.right) + "px";
  }

  function closePanel() {
    if (!panelEl) return;
    panelEl.hidden = true;
  }

  function applyUnlockState(fireEvent) {
    if (root.document && root.document.body) {
      root.document.body.classList.toggle("mrj-teacher-unlock-active", isUnlocked());
    }
    syncTeacherButton();
    if (!fireEvent || !isUnlocked() || !root.document) return;
    try {
      root.document.dispatchEvent(
        new root.CustomEvent("mrj-teacher", {
          detail: { pin: pinUnlocked, server: isMrjTeacher() },
        })
      );
    } catch (ignore) {
      var ev = root.document.createEvent("Event");
      ev.initEvent("mrj-teacher", true, true);
      root.document.dispatchEvent(ev);
    }
  }

  function openPinPanel() {
    var a = auth();
    var who = a && a.student && a.student();
    if (!who) {
      root.alert("Sign the student in first.");
      return;
    }
    ensurePanel();
    if (!panelEl) return;
    panelEl.hidden = false;
    panelEl.innerHTML =
      '<h3>Teacher</h3>' +
      "<p>Student: <b>" +
      esc(who) +
      "</b></p>" +
      '<label class="sr-only" for="mrj-teacher-pin">Teacher PIN</label>' +
      '<input id="mrj-teacher-pin" type="password" autocomplete="off" placeholder="PIN" />' +
      '<p class="mrj-teacher-unlock-err" id="mrj-teacher-unlock-err"></p>' +
      '<div class="mrj-teacher-unlock-acts">' +
      '<button type="button" class="mrj-teacher-unlock-go" id="mrj-teacher-unlock-go">Unlock</button>' +
      '<button type="button" class="mrj-teacher-unlock-x" id="mrj-teacher-unlock-x">✖</button>' +
      "</div>";
    positionPanel();
    var pin = panelEl.querySelector("#mrj-teacher-pin");
    var err = panelEl.querySelector("#mrj-teacher-unlock-err");
    panelEl.querySelector("#mrj-teacher-unlock-x").onclick = closePanel;
    pin.focus();
    var go = function () {
      err.textContent = "Checking…";
      teacherCheck(String(pin.value || "").trim()).then(function (r) {
        if (r && r.ok) {
          pinUnlocked = true;
          closePanel();
          applyUnlockState(true);
        } else {
          err.textContent = (r && r.message) || "Wrong PIN.";
        }
      });
    };
    panelEl.querySelector("#mrj-teacher-unlock-go").onclick = go;
    pin.onkeydown = function (e) {
      if (e.key === "Enter") go();
    };
  }

  function onTeacherClick() {
    if (isUnlocked()) {
      if (panelEl && !panelEl.hidden) closePanel();
      return;
    }
    if (panelEl && !panelEl.hidden) closePanel();
    else openPinPanel();
  }

  function syncTeacherButton() {
    if (!teacherBtn) return;
    teacherBtn.classList.toggle("is-active", isUnlocked());
    teacherBtn.setAttribute("aria-pressed", isUnlocked() ? "true" : "false");
  }

  function bindTeacherButton(btn) {
    if (!btn) return;
    teacherBtn = btn;
    if (btn.getAttribute("data-mrj-teacher-wired") !== "1") {
      btn.setAttribute("data-mrj-teacher-wired", "1");
      btn.addEventListener("click", onTeacherClick);
    }
    ensurePanel();
    syncTeacherButton();
  }

  root.MRJTeacherUnlock = {
    isMrjTeacher: isMrjTeacher,
    isUnlocked: isUnlocked,
    teacherCheck: teacherCheck,
    installRefresh: installRefresh,
    bindTeacherButton: bindTeacherButton,
    syncTeacherButton: syncTeacherButton,
    lock: function () {
      pinUnlocked = false;
      closePanel();
      applyUnlockState(false);
    },
  };

  if (root.document) {
    root.document.addEventListener("mrj-teacher", function () {
      if (isMrjTeacher()) syncTeacherButton();
    });
    root.document.addEventListener("mrj-auth-ready", function () {
      applyUnlockState(false);
    });
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : this);
