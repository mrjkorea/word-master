#!/usr/bin/env node
/**
 * CoS-style check: signed-in student must have one visible .mrj-auth-teacher-btn.
 * Loads live mrj-signin scripts from GitHub Pages (network required).
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PORT = 8766;
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
    };
    res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
    res.end(data);
  });
}

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

async function waitForTeacherBtn(page) {
  await page.waitForFunction(
    () => document.querySelectorAll(".mrj-auth-teacher-btn").length === 1,
    { timeout: 45000 }
  );
}

async function assertTeacherVisible(page, label) {
  const info = await page.evaluate(() => {
    const nodes = document.querySelectorAll(".mrj-auth-teacher-btn");
    const btn = nodes[0];
    if (!btn || nodes.length !== 1) {
      return { ok: false, reason: "count=" + nodes.length };
    }
    if (btn.hidden) return { ok: false, reason: "hidden attr" };
    const style = window.getComputedStyle(btn);
    if (style.display === "none" || style.visibility === "hidden") {
      return { ok: false, reason: "display/visibility" };
    }
    const r = btn.getBoundingClientRect();
    if (!r || r.width < 1 || r.height < 1) {
      return { ok: false, reason: "zero box" };
    }
    return { ok: true, text: (btn.textContent || "").trim(), w: r.width, h: r.height };
  });
  if (!info.ok) fail(label + ": " + info.reason);
  return info;
}

async function signIn(page, studentId) {
  await page.waitForFunction(
    () => window.MRJ_AUTH && window.MRJ_AUTH._test && typeof window.MRJ_AUTH._test.finish === "function",
    { timeout: 45000 }
  );
  await page.evaluate((id) => {
    window.MRJ_AUTH._test.finish(id, "test-token", [], "");
    const gate = document.getElementById("mrj-auth-gate");
    if (gate) gate.hidden = true;
    document.documentElement.classList.remove("mrj-auth-locked");
  }, studentId);
}

const server = http.createServer(serveStatic);
await new Promise((resolve) => server.listen(PORT, "127.0.0.1", resolve));

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.addInitScript(() => {
  window.MRJ_AUTH_TEST_MODE = true;
});

try {
  await page.goto(BASE + "/index.html", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForFunction(
    () => window.MRJ_AUTH && window.MRJ_AUTH._test && typeof window.MRJ_AUTH._test.finish === "function",
    { timeout: 45000 }
  );
  await page.evaluate((id) => {
    window.MRJ_AUTH._test.finish(id, "test-token", [], "");
    const gate = document.getElementById("mrj-auth-gate");
    if (gate) gate.hidden = true;
    document.documentElement.classList.remove("mrj-auth-locked");
  }, "zz_test_it_wm");
  await waitForTeacherBtn(page);
  await assertTeacherVisible(page, "after sign-in on boot");

  const legacy = await page.locator("#btn-teacher").count();
  if (legacy !== 0) fail("must not have #btn-teacher");

  await page.locator("#btn-tap-start").click({ force: true });
  await page.waitForSelector("#screen-home.active", { timeout: 15000 });
  await assertTeacherVisible(page, "after tap to start");

  console.log("AUTH_TEACHER_CHIP_OK");
} catch (e) {
  fail(e && e.message ? e.message : String(e));
} finally {
  await browser.close();
  server.close();
}
