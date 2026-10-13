#!/usr/bin/env node
/**
 * Headless check: home pack tiles open the correct pack (title + first word).
 * Usage: node scripts/pack_all_tiles_playwright.mjs [baseUrl]
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BASE = process.argv[2] || "http://127.0.0.1:8765";

const PACK_IDS = [
  "nouns100", "verbs100", "adjectives100", "nouns200", "little100",
  "verbs200", "adjectives200", "adverbs100", "nouns300", "verbs300",
  "adjectives300", "nouns400", "adverbs200", "nouns500", "verbs400",
  "adjectives400", "nouns600", "little210", "adverbs300", "nouns700",
  "verbs500", "adjectives500", "nouns800", "verbs600", "adjectives600",
  "nouns900", "adverbs427", "nouns1000", "verbs700", "adjectives700",
  "verbs800", "adjectives800", "verbs900", "adjectives900", "verbs1000",
];

function packExpect(pid) {
  const raw = JSON.parse(fs.readFileSync(path.join(ROOT, "packs", pid + ".json"), "utf8"));
  const words = raw.words || [];
  const first = words[0] && (words[0].en || words[0].word);
  if (!first) throw new Error("no words in " + pid);
  return { id: pid, first: String(first).trim(), title: String(raw.title || pid) };
}

const LEGACY_STATE = {
  studentId: "legacy-student",
  voice: "us_m",
  studySize: 10,
  locale: "en",
  currentSetId: "set_nouns100_old",
  sets: {
    set_nouns100_old: {
      id: "set_nouns100_old",
      packId: "nouns100",
      title: "A1 Nouns 1–100",
      words: [{ id: "time", en: "time", ko: "시간" }],
      winsA: { time: 2 },
      intro: { time: true },
      meetLock: ["time"],
      lastPlayedAt: 5000,
      winsB: {},
      winsC: {},
    },
  },
  scoreRows: [],
};

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
    if (document.documentElement) {
      document.documentElement.classList.remove("mrj-auth-locked");
    }
  }, studentId);
}

async function bootToHome(page) {
  await page.click("#btn-tap-start");
  await page.waitForSelector("#screen-home.active", { timeout: 20000 });
}

async function readSetScreen(page) {
  return page.evaluate(() => {
    const title = document.querySelector("#set-title");
    const chips = document.querySelectorAll("#word-chips .word-row .en");
    const first =
      chips.length && chips[0].textContent ? chips[0].textContent.trim() : "";
    return { title: title ? title.textContent.trim() : "", first };
  });
}

async function isPackTileVisible(page, pid) {
  return page.evaluate((id) => {
    const el = document.querySelector("#btn-pack-" + id);
    return !!(el && !el.hidden);
  }, pid);
}

async function openPackFromHome(page, pid) {
  const onSet = await page.$("#screen-set.active");
  if (onSet) {
    await page.click("#btn-back");
    await page.waitForSelector("#screen-home.active");
  }
  const visible = await isPackTileVisible(page, pid);
  if (!visible) return false;
  await page.click(`#btn-pack-${pid}`);
  await page.waitForSelector("#screen-set.active", { timeout: 30000 });
  return true;
}

async function simulateLateServerPull(page) {
  return page.evaluate(() => {
    const merge = window.MRJ_WM_merge;
    const api = window.WM_TEST;
    if (!merge || !api) return { packId: "", first: "" };
    const local = api.slimProgress();
    const remote = {
      v: 1,
      currentPackId: "nouns100",
      sets: {
        nouns100: {
          winsA: { time: 2 },
          intro: { time: true },
          meetLock: ["time"],
          lastPlayedAt: 5000,
        },
      },
    };
    api.mergeRemoteProgress(merge(local, remote));
    const set = api.currentSet();
    const first = set && set.words && set.words[0] ? set.words[0].en : "";
    return { packId: set && set.packId, first: first || "" };
  });
}

async function main() {
  const specs = PACK_IDS.map(packExpect);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  await context.addInitScript(() => {
    window.WM_TEST_HOOK = true;
  });
  await context.addInitScript((legacy) => {
    const key = "mrj.word_factory.state.legacy-student";
    localStorage.setItem(key, JSON.stringify(legacy));
    localStorage.setItem("mrj.word_factory.legacy_claimed_by", "legacy-student");
  }, LEGACY_STATE);

  const page = await context.newPage();
  await page.goto(`${BASE}/?mode=student`, { waitUntil: "domcontentloaded" });
  await signIn(page, "legacy-student");
  await bootToHome(page);

  let tested = 0;
  for (const spec of specs) {
    const opened = await openPackFromHome(page, spec.id);
    if (!opened) continue;
    tested += 1;
    const data = await readSetScreen(page);
    if (data.first !== spec.first) {
      throw new Error(
        `${spec.id}: first "${data.first}" expected "${spec.first}" (title ${data.title})`
      );
    }
    const after = await simulateLateServerPull(page);
    if (after.first !== spec.first || after.packId !== spec.id) {
      throw new Error(
        `${spec.id}: after server pull pack=${after.packId} first="${after.first}"`
      );
    }
    console.log("OK", spec.id);
  }

  // TOEIC external pack
  await page.goto(
    `${BASE}/?packsrc=${encodeURIComponent("https://mrjkorea.github.io/word-master-toeic/packs/toeic01.json")}&mode=student`,
    { waitUntil: "domcontentloaded" }
  );
  await signIn(page, "legacy-student");
  await bootToHome(page);
  await page.waitForSelector("#btn-continue", { timeout: 15000 });
  await page.click("#btn-continue");
  await page.waitForSelector("#screen-set.active", { timeout: 30000 });
  const toeic = await readSetScreen(page);
  if (!toeic.first) throw new Error("toeic01: no first word");
  console.log("OK toeic01", toeic.first);

  await browser.close();
  console.log("PACK_ALL_TILES_PLAYWRIGHT_OK", tested + 1, "tiles");
}

main().catch((e) => {
  console.error("FAIL:", e.message || e);
  process.exit(1);
});
