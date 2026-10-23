#!/usr/bin/env node
/**
 * Headless: aligned range picker, set-range banner on stages, pack-6 alt path opens Learn.
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PORT = 8765;
const BASE = `http://127.0.0.1:${PORT}`;

function serveStatic(req, res) {
  let url = req.url || "/";
  if (url.indexOf("?") >= 0) url = url.slice(0, url.indexOf("?"));
  if (url === "/") url = "/index.html";
  const file = path.join(ROOT, decodeURIComponent(url));
  if (!file.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("forbidden");
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    const ext = path.extname(file);
    const types = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".mp3": "audio/mpeg",
      ".jpg": "image/jpeg",
    };
    res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
    res.end(data);
  });
}

async function signIn(page, studentId) {
  await page.evaluate((id) => {
    window.MRJ_AUTH = {
      student: () => id,
      token: () => "test-token",
      signOut: () => {},
    };
    window.dispatchEvent(new CustomEvent("mrj-auth-ready", { detail: { id } }));
    const gate = document.getElementById("mrj-auth-gate");
    if (gate) gate.hidden = true;
    document.documentElement.classList.remove("mrj-auth-locked");
  }, studentId);
}

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

const server = http.createServer(serveStatic);
await new Promise((resolve) => server.listen(PORT, "127.0.0.1", resolve));

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
  await page.goto(BASE + "/?mode=teacher", { waitUntil: "domcontentloaded" });
  await signIn(page, "pw-range-test");
  await page.locator("#btn-tap-start").click({ force: true });
  await page.waitForSelector("#screen-home.active", { timeout: 15000 });

  await page.locator("#btn-pack-nouns100").click({ force: true });
  await page.waitForSelector("#screen-set.active", { timeout: 15000 });

  await page.locator("#study-size button").first().click({ force: true });
  await page.locator("#stand-seats .seat:nth-child(42)").click({ force: true });
  await page.waitForFunction(() => {
    const el = document.querySelector("#set-range-banner");
    return el && !el.hidden && /41–45/.test(el.textContent || "");
  }, { timeout: 10000 });

  let banner = await page.textContent("#set-range-banner");
  if (!/41–45/.test(banner)) fail("set screen banner " + banner);

  for (const screen of ["learn", "test", "games"]) {
    await page.evaluate((name) => {
      if (window.MRJ_WM_showScreen) window.MRJ_WM_showScreen(name);
    }, screen);
    await page.waitForSelector("#screen-" + screen + ".active", { timeout: 5000 });
    banner = await page.textContent("#set-range-banner");
    if (!/41–45/.test(banner)) fail(screen + " banner " + banner);
  }

  await page.goto(BASE + "/?mode=student", { waitUntil: "domcontentloaded" });
  await signIn(page, "pw-range-test");
  await page.locator("#btn-tap-start").click({ force: true });
  await page.waitForSelector("#screen-home.active");
  await page.locator("#btn-pack-verbs200").click({ force: true });
  await page.waitForSelector("#screen-set.active", { timeout: 15000 });

  await page.evaluate(async () => {
    const pack = await fetch("packs/verbs200.json").then((r) => r.json());
    const words = pack.words || [];
    const intro = {};
    const winsA = {};
    const winsB = {};
    const winsC = {};
    for (let i = 0; i < 5; i++) {
      const id = words[i].id;
      intro[id] = true;
      winsA[id] = 2;
      winsB[id] = 2;
      winsC[id] = 2;
    }
    for (let i = 25; i < 30; i++) {
      if (words[i]) intro[words[i].id] = true;
    }
    const setId = "set_verbs200_pw";
    const state = {
      studentId: "pw-range-test",
      voice: "us_m",
      studySize: 5,
      locale: "en",
      currentSetId: setId,
      sets: {
        [setId]: {
          id: setId,
          packId: "verbs200",
          title: pack.title || "Verbs 200",
          words,
          intro,
          winsA,
          winsB,
          winsC,
          meetLock: [],
          startNumber: null,
          testPassed: {},
        },
      },
      scoreRows: [],
    };
    localStorage.setItem("mrj.word_factory.state.pw-range-test", JSON.stringify(state));
    location.reload();
  });

  await page.waitForLoadState("load");
  await page.waitForSelector("#btn-tap-start", { timeout: 15000 });
  await signIn(page, "pw-range-test");
  await page.locator("#btn-tap-start").click({ force: true });
  await page.waitForSelector("#screen-home.active");
  await page.locator("#btn-continue").click({ force: true });
  await page.waitForSelector("#screen-set.active", { timeout: 15000 });

  await page.locator("#stand-seats .seat:nth-child(26)").click({ force: true });
  await page.waitForTimeout(300);

  await page.locator("#btn-intro").click({ force: true });
  await page.waitForSelector("#screen-learn.active, #screen-intro.active", { timeout: 10000 });
  const screen = await page.evaluate(() => {
    const learn = document.querySelector("#screen-learn.active");
    const intro = document.querySelector("#screen-intro.active");
    return learn ? "learn" : intro ? "intro" : "other";
  });
  if (screen !== "learn" && screen !== "intro") fail("pack 6 alt path screen " + screen);
  if (screen === "games") fail("pack 6 alt path jumped to games");

  const onGames = await page.evaluate(() => !!document.querySelector("#screen-games.active"));
  if (onGames) fail("pack 6 alt path opened games instead of learn");

  banner = await page.textContent("#set-range-banner");
  if (!/Verbs 12[6-9]–13\d/.test(banner) && !/Verbs 126–130/.test(banner)) {
    fail("verbs200 banner " + banner);
  }

  console.log("SET_RANGE_BANNER_PLAYWRIGHT_OK");
} finally {
  await browser.close();
  server.close();
}
