(function () {
  "use strict";

  var CP = window.MRJ_WM_classProgress;
  if (!CP) return;

  var state = {
    students: [],
    selectedId: "",
    snapshot: null,
    packId: "",
    loading: false,
    error: "",
  };

  function endpoint() {
    if (window.MRJ_AUTH && window.MRJ_AUTH.ENDPOINT) return window.MRJ_AUTH.ENDPOINT;
    if (window.WM_SIGNIN_URL) return window.WM_SIGNIN_URL;
    return "";
  }

  function authId() {
    if (!window.MRJ_AUTH || typeof window.MRJ_AUTH.student !== "function") return "";
    return String(window.MRJ_AUTH.student() || "").trim();
  }

  function authToken() {
    if (!window.MRJ_AUTH || typeof window.MRJ_AUTH.token !== "function") return "";
    return String(window.MRJ_AUTH.token() || "").trim();
  }

  function postAction(payload) {
    var url = endpoint();
    if (!url) return Promise.resolve({ ok: false, error: "no_endpoint" });
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    }).then(function (res) {
      return res.json().catch(function () {
        return { ok: false, error: "bad_json" };
      });
    });
  }

  function paintStatus(msg) {
    var el = document.getElementById("class-progress-status");
    if (el) el.textContent = msg || "";
  }

  function renderStudentList() {
    var host = document.getElementById("class-progress-students");
    if (!host) return;
    host.innerHTML = "";
    state.students.forEach(function (stu) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "class-student-btn";
      var openable = CP.canOpenStudentSnapshot(stu.id);
      btn.textContent = stu.id + (openable ? "" : " (soon)");
      btn.disabled = !openable;
      btn.classList.toggle("locked", !openable);
      if (stu.id === state.selectedId) btn.classList.add("on");
      btn.addEventListener("click", function () {
        if (!openable) return;
        loadSnapshot(stu.id);
      });
      host.appendChild(btn);
    });
  }

  function renderPackPicker() {
    var host = document.getElementById("class-progress-packs");
    if (!host) return;
    host.innerHTML = "";
    if (!state.snapshot || !state.snapshot.sets) return;
    Object.keys(state.snapshot.sets).forEach(function (pid) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "class-pack-btn";
      btn.textContent = pid;
      btn.classList.toggle("on", pid === state.packId);
      btn.addEventListener("click", function () {
        state.packId = pid;
        renderPackPicker();
        renderWordTable();
      });
      host.appendChild(btn);
    });
  }

  function renderDailyWords() {
    var host = document.getElementById("class-progress-daily");
    if (!host) return;
    host.innerHTML = "";
    if (!state.snapshot) return;
    var SDL = window.MRJ_WM_scoreDayLog;
    if (!SDL) return;
    var days = SDL.summariesByDate(state.snapshot.dailyWordLog, { limit: 30 });
    if (!days.length) {
      host.hidden = true;
      return;
    }
    host.hidden = false;
    var title = document.createElement("h3");
    title.className = "class-progress-daily-title";
    title.textContent = "Words by day";
    host.appendChild(title);
    days.forEach(function (day) {
      var block = document.createElement("div");
      block.className = "class-progress-day";
      var h = document.createElement("h4");
      h.textContent = day.date;
      block.appendChild(h);
      (day.packs || []).forEach(function (p) {
        var pEl = document.createElement("p");
        pEl.className = "class-progress-day-line";
        pEl.textContent = (p.pack ? p.pack + " · " : "") + p.line;
        block.appendChild(pEl);
      });
      host.appendChild(block);
    });
  }

  function renderWordTable() {
    var table = document.getElementById("class-progress-table");
    if (!table) return;
    table.innerHTML = "";
    if (!state.snapshot || !state.packId) return;
    var pack = state.snapshot.sets[state.packId];
    if (!pack) return;
    fetch("packs/" + state.packId + ".json", { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) return { words: [] };
        return res.json();
      })
      .then(function (data) {
        var words = (data && data.words) || [];
        var rows = CP.rowsForPack(state.packId, pack, words);
        var thead = document.createElement("thead");
        thead.innerHTML =
          "<tr><th>Word</th><th>Meet</th><th>Learn</th><th>Dict</th><th>Write</th><th>Test</th></tr>";
        table.appendChild(thead);
        var tbody = document.createElement("tbody");
        rows.forEach(function (row) {
          var tr = document.createElement("tr");
          function cell(done) {
            return done ? "✓" : "·";
          }
          tr.innerHTML =
            "<td>" + row.en + "</td>" +
            "<td>" + cell(row.steps.meet) + "</td>" +
            "<td>" + cell(row.steps.learn) + "</td>" +
            "<td>" + cell(row.steps.dict) + "</td>" +
            "<td>" + cell(row.steps.write) + "</td>" +
            "<td>" + cell(row.steps.test) + "</td>";
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);
      })
      .catch(function () {
        paintStatus("Could not load pack words.");
      });
  }

  function loadSnapshot(studentId) {
    state.selectedId = studentId;
    state.loading = true;
    paintStatus("Loading " + studentId + "…");
    renderStudentList();
    postAction({
      action: "teacher_student_snapshot",
      id: authId(),
      token: authToken(),
      student: studentId,
      program: CP.PROGRAM,
    }).then(function (res) {
      state.loading = false;
      if (!res || !res.ok) {
        state.error = (res && res.error) || "load_failed";
        if (window.MRJ_WM_teacherClassroom) {
          window.MRJ_WM_teacherClassroom.paintIncompleteWarning("");
        }
        paintStatus("Could not load snapshot (" + state.error + ").");
        return;
      }
      var incompleteMeta = window.MRJ_WM_teacherClassroom
        ? window.MRJ_WM_teacherClassroom.applySnapshotIncompleteFlags(res)
        : { incomplete: false, missingShards: [] };
      state.snapshot = CP.parseProgressJson(res.progress_json);
      state.error = "";
      var packs = Object.keys(state.snapshot.sets || {});
      state.packId = packs[0] || "";
      var statusLine = studentId + " · " + packs.length + " pack(s)";
      if (incompleteMeta.incomplete) {
        statusLine += " · incomplete cloud data";
      }
      paintStatus(statusLine);
      renderDailyWords();
      renderPackPicker();
      renderWordTable();
    });
  }

  function loadStudents() {
    state.loading = true;
    paintStatus("Loading class list…");
    postAction({
      action: "teacher_list_students",
      id: authId(),
      token: authToken(),
    }).then(function (res) {
      state.loading = false;
      if (!res || !res.ok || !Array.isArray(res.students)) {
        paintStatus("Could not load students.");
        return;
      }
      state.students = res.students.map(function (s) {
        return { id: String(s.id || s.display || "").trim() };
      }).filter(function (s) { return s.id; });
      paintStatus(state.students.length + " students");
      renderStudentList();
    });
  }

  function openClassProgress() {
    var show = window.MRJ_WM_showScreen;
    if (typeof show === "function") show("class-progress");
    loadStudents();
  }

  function bind() {
    var btn = document.getElementById("btn-class-progress");
    if (btn) btn.addEventListener("click", openClassProgress);
  }

  window.MRJ_WM_openClassProgress = openClassProgress;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
})();
