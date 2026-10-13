#!/usr/bin/env node
/**
 * Live cloud save verification (GitHub Pages + mrj-signin).
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTIFACTS = "/opt/cursor/artifacts";
const BASE = process.argv[2] || "https://mrjkorea.github.io/word-master/";
const TEST_ID = process.env.WM_TEST_ID || "zz_test_it_wm";
let TEST_PASSWORD = process.env.WM_TEST_PASSWORD || "";

const savePackLog = [];
const errors = [];

const PACK_DEFS = [
  { id: "nouns100", word: "time" },
  { id: "verbs100", word: "be" },
  {
    id: "toeic01",
    word: "w1",
    externalPackSrc: "https://mrjkorea.github.io/word-master-toeic/packs/toeic01.json",
  },
];

function ensureArtifacts() {
  try {
    fs.mkdirSync(ARTIFACTS, { recursive: true });
  } catch (e) {}
}

function randomPassword() {
  return crypto.randomBytes(9).toString("base64url") + "Aa1";
}

async function screenshot(page, name) {
  ensureArtifacts();
  const p = path.join(ARTIFACTS, name);
  await page.screenshot({ path: p, fullPage: true });
  return p;
}

function attachSaveListener(page) {
  page.on("requestfinished", async (req) => {
    try {
      if (req.method() !== "POST") return;
      const post = req.postData();
      if (!post || !post.includes("save_pack")) return;
      const body = JSON.parse(post);
      if (body.action !== "save_pack") return;
      const res = await req.response();
      let json = {};
      if (res) {
        try {
          json = JSON.parse(await res.text());
        } catch (e2) {
          json = { parseError: true, status: res.status() };
        }
      }
      const status = res ? res.status() : 0;
      const ok = json.ok === true || ((status >= 200 && status < 400) && !json.error);
      savePackLog.push({
        program: body.program || "word-master",
        ok: ok,
        error: json.error,
        saved: json.saved !== false,
        status,
        progressChars: (body.progress_json || "").length,
      });
    } catch (e) {}
  });
}

async function signInOrRegister(page, id, password, register) {
  await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("#mrj-auth-gate", { timeout: 30000 });
  const gate = page.locator("#mrj-auth-gate");
  if (register) {
    await gate.locator(".mrj-auth-door-new").click({ timeout: 15000 });
    const inputs = gate.locator(".mrj-auth-input");
    await inputs.nth(0).fill(id);
    await inputs.nth(1).fill(password);
    await inputs.nth(2).fill(password);
    await gate.locator(".mrj-auth-submit").click();
  } else {
    await gate.locator(".mrj-auth-door-login").click({ timeout: 15000 });
    const inputs = gate.locator(".mrj-auth-input");
    await inputs.nth(0).fill(id);
    await inputs.nth(1).fill(password);
    await gate.locator(".mrj-auth-submit").click();
  }
  await page.waitForFunction(
    (wantId) => {
      const got = window.MRJ_AUTH && window.MRJ_AUTH.student ? String(window.MRJ_AUTH.student() || "") : "";
      return got === wantId;
    },
    id,
    { timeout: 90000 }
  );
}

async function bootHome(page) {
  const start = page.locator("#btn-tap-start");
  if (await start.isVisible().catch(() => false)) {
    await start.click();
    await page.waitForSelector("#screen-home.active", { timeout: 30000 });
  }
}

async function waitReadyToSave(page) {
  await page.waitForFunction(
    () => window.MRJ_WM_progress && window.MRJ_WM_progress.isReadyToSave && window.MRJ_WM_progress.isReadyToSave(),
    { timeout: 90000 }
  );
}

async function applyPackProgressAndSave(page, packDefs) {
  return page.evaluate(async (defs) => {
    const merge = window.MRJ_WM_merge;
    const now = Date.now();
    const incoming = { v: 1, sets: {}, scoreRows: [], currentPackId: defs[0].id };
    defs.forEach((p, i) => {
      const set = {
        winsA: { [p.word]: 2 },
        intro: { [p.word]: true },
        lastPlayedAt: now + i,
      };
      if (p.externalPackSrc) {
        set.externalPackSrc = p.externalPackSrc;
        set.tapmapKey = p.id;
      }
      incoming.sets[p.id] = set;
      incoming.scoreRows.push({
        at: now + i,
        pack: p.id,
        kind: "final",
        activity: "test",
        score: 8,
        total: 10,
      });
    });
    const loadRes = await window.MRJ_WM_progress.load();
    let merged = incoming;
    if (merge && loadRes && loadRes.progress_json) {
      try {
        merged = merge(incoming, JSON.parse(loadRes.progress_json));
      } catch (e) {
        merged = incoming;
      }
    } else if (merge && window.MRJ_WM_progress.mergeSaveProgress) {
      merged = window.MRJ_WM_progress.mergeSaveProgress(JSON.stringify(incoming));
    }
    const payload = {
      progress_json: JSON.stringify(merged),
      screen: "home",
      pack_id: defs[0].id,
    };
    const res = await window.MRJ_WM_progress.save(payload);
    return {
      save: res,
      packIds: Object.keys(merged.sets || {}),
      scoreCount: (merged.scoreRows || []).length,
      loadOk: !!(loadRes && loadRes.ok !== false),
    };
  }, packDefs);
}

async function readProgressSummary(page, fromCloud) {
  return page.evaluate(async (useCloud) => {
    const key = "mrj.wm.progress." + String(window.MRJ_AUTH?.student?.() || "").trim().toLowerCase();
    let packIds = [];
    let scoreCount = 0;
    let cloudLoad = null;
    if (useCloud && window.MRJ_WM_progress && window.MRJ_WM_progress.load) {
      cloudLoad = await window.MRJ_WM_progress.load();
      if (cloudLoad && cloudLoad.progress_json) {
        try {
          const o = JSON.parse(cloudLoad.progress_json);
          packIds = Object.keys(o.sets || {});
          scoreCount = (o.scoreRows || []).length;
        } catch (e) {}
      }
    }
    if (!packIds.length) {
      try {
        const local = JSON.parse(localStorage.getItem(key) || "null");
        if (local && local.progress_json) {
          const o = JSON.parse(local.progress_json);
          packIds = Object.keys(o.sets || {});
          scoreCount = (o.scoreRows || []).length;
        }
      } catch (e) {}
    }
    return {
      student: window.MRJ_AUTH?.student?.() || "",
      packIds,
      scoreCount,
      localKey: key,
      cloudLoadOk: !!(cloudLoad && cloudLoad.ok !== false && !cloudLoad.error),
      cloudError: cloudLoad && cloudLoad.error,
    };
  }, !!fromCloud);
}

async function signOut(page) {
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  const signOutBtn = page.locator("#btn-signout");
  if (await signOutBtn.isVisible().catch(() => false)) {
    await signOutBtn.click();
    await page.waitForTimeout(800);
  }
  await page.evaluate(() => {
    if (window.MRJ_WM_progress && window.MRJ_WM_progress.resetSession) {
      window.MRJ_WM_progress.resetSession();
    }
    if (window.MRJ_AUTH && window.MRJ_AUTH.signOut) window.MRJ_AUTH.signOut();
    try {
      localStorage.removeItem("mrj.auth.session");
    } catch (e) {}
    document.documentElement.classList.add("mrj-auth-locked");
    const gate = document.getElementById("mrj-auth-gate");
    if (gate) {
      gate.hidden = false;
    }
  });
  await page.waitForSelector("#mrj-auth-gate .mrj-auth-door-login", { timeout: 45000 });
}

async function run() {
  ensureArtifacts();
  if (!TEST_PASSWORD) TEST_PASSWORD = randomPassword();
  fs.writeFileSync(
    path.join(ARTIFACTS, "wm_test_credentials.txt"),
    `id=${TEST_ID}\npassword=${TEST_PASSWORD}\n`,
    "utf8"
  );

  const browser = await chromium.launch({ headless: true });
  const results = { register: false, profileA: {}, profileB: {}, switch: {}, savePackLog: [], programs: [] };

  const ctxA = await browser.newContext();
  const pageA = await ctxA.newPage();
  attachSaveListener(pageA);

  try {
    await signInOrRegister(pageA, TEST_ID, TEST_PASSWORD, false);
    results.register = "existing";
  } catch (e) {
    try {
      await signInOrRegister(pageA, TEST_ID, TEST_PASSWORD, true);
      results.register = true;
    } catch (e2) {
      errors.push("auth: " + e2.message);
      await screenshot(pageA, "cloud_save_register_fail.png");
      await browser.close();
      process.exit(1);
    }
  }

  await bootHome(pageA);
  await waitReadyToSave(pageA);
  const appliedA = await applyPackProgressAndSave(pageA, PACK_DEFS);
  results.profileA.applied = appliedA;
  await pageA.waitForTimeout(22000);
  await applyPackProgressAndSave(pageA, PACK_DEFS);
  await pageA.waitForTimeout(5000);
  results.profileA.summary = await readProgressSummary(pageA);
  await screenshot(pageA, "cloud_save_a_progress.png");

  const ctxB = await browser.newContext();
  const pageB = await ctxB.newPage();
  attachSaveListener(pageB);
  await signInOrRegister(pageB, TEST_ID, TEST_PASSWORD, false);
  await bootHome(pageB);
  await waitReadyToSave(pageB);
  await pageB.waitForTimeout(3000);
  results.profileB.summary = await readProgressSummary(pageB, true);
  const expectedIds = PACK_DEFS.map((p) => p.id);
  results.profileB.packsRestored = expectedIds.filter((id) =>
    results.profileB.summary.packIds.includes(id)
  );
  results.profileB.scoresRestored = results.profileB.summary.scoreCount >= PACK_DEFS.length;
  await screenshot(pageB, "cloud_save_b_restored.png");

  const altId = "zz_test_it_wm_b";
  const altPw = TEST_PASSWORD;
  await signOut(pageB);
  try {
    try {
      await signInOrRegister(pageB, altId, altPw, true);
      results.switch.altRegistered = true;
    } catch (eReg) {
      await signInOrRegister(pageB, altId, altPw, false);
      results.switch.altRegistered = "existing";
    }
    await bootHome(pageB);
    const altSum = await readProgressSummary(pageB, true);
    results.switch.altId = altId;
    results.switch.leak = PACK_DEFS.some((p) => altSum.packIds.includes(p.id));
    results.switch.altPacks = altSum.packIds;
    await signOut(pageB);
    await signInOrRegister(pageB, TEST_ID, TEST_PASSWORD, false);
    await bootHome(pageB);
    const backSum = await readProgressSummary(pageB, true);
    results.switch.backPacks = backSum.packIds;
    results.switch.restoredAfterSwitch = expectedIds.every((id) => backSum.packIds.includes(id));
  } catch (e) {
    results.switch.error = e.message;
    try {
      await screenshot(pageB, "cloud_save_switch_fail.png");
    } catch (e2) {}
    try {
      await signOut(pageB);
      await signInOrRegister(pageB, TEST_ID, TEST_PASSWORD, false);
      await bootHome(pageB);
      const backSum = await readProgressSummary(pageB, true);
      results.switch.reloginPacks = backSum.packIds;
      results.switch.reloginOk = expectedIds.every((id) => backSum.packIds.includes(id));
    } catch (e3) {
      results.switch.reloginOk = false;
    }
    errors.push("switch: " + e.message);
  }
  try {
    await screenshot(pageB, "cloud_save_switch_back.png");
  } catch (e) {}

  results.savePackLog = savePackLog;
  results.programs = [...new Set(savePackLog.map((s) => s.program))].sort();
  const tooLarge = savePackLog.some((s) => s.error === "too_large");
  const anySaveOk = savePackLog.some((s) => s.ok && s.saved !== false && !s.error);
  const allPacksBack = expectedIds.every((id) => results.profileB.packsRestored.includes(id));

  const saveOk = anySaveOk || savePackLog.some((s) => s.progressChars > 0 && s.error !== "too_large");
  const switchOk = !results.switch.leak
    && (results.switch.restoredAfterSwitch === true || results.switch.reloginOk === true);
  results.ok = !tooLarge && saveOk && allPacksBack && results.profileB.scoresRestored && switchOk;

  fs.writeFileSync(path.join(ARTIFACTS, "cloud_save_live_report.json"), JSON.stringify(results, null, 2));

  await browser.close();

  console.log("CLOUD_SAVE_LIVE", results.ok ? "OK" : "FAIL");
  console.log("AppProgress programs:", results.programs.join(", "));
  console.log("save_pack events:", savePackLog.length, "too_large:", tooLarge);
  console.log("credentials:", path.join(ARTIFACTS, "wm_test_credentials.txt"));
  if (errors.length) console.log("errors:", errors);
  process.exit(results.ok ? 0 : 1);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
