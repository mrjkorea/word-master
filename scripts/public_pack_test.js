#!/usr/bin/env node
"use strict";
/**
 * Public mode: ?packsrc=https://mrjkorea.github.io/news-words/packs/news-*.json
 * plays with no sign-in and writes nothing to localStorage.
 * Any other packsrc (e.g. TOEIC, Day 2) still needs sign-in.
 * Usage: node scripts/public_pack_test.js            (runs both cases)
 */
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

const NEWS = "https://mrjkorea.github.io/news-words/packs/news-2026-10-16.json";
const TOEIC = "https://mrjkorea.github.io/word-master-toeic/packs/toeic01.json";
const DAY2 = "https://mrjkorea.github.io/day2-words/packs/basic_a_u1.json";

const PackSrc = require("../js/pack-src.js");
if (!PackSrc.isPublicPackSrc(NEWS)) fail("news pack should be public");
if (PackSrc.isPublicPackSrc(TOEIC)) fail("toeic pack must not be public");
if (PackSrc.isPublicPackSrc(DAY2)) fail("day2 pack must not be public");
if (PackSrc.isPublicPackSrc("https://mrjkorea.github.io/news-words/packs/x/../../word-master/a.json")) fail("no subfolders");
if (PackSrc.isPublicPackSrc("https://evil.example/news-words/packs/news-1.json")) fail("other host");
if (PackSrc.isPublicPackSrc("https://mrjkorea.github.io/news-words/packs/news-1.json?x=1")) fail("query");

const index = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const at = function (s) { return index.indexOf(s); };
if (at("js/public-pack.js") === -1) fail("index.html must load js/public-pack.js");
if (at("js/pack-src.js") > at("js/public-pack.js")) fail("pack-src.js must load before public-pack.js");
if (at("js/public-pack.js") > at("mrj-auth-boot.js")) fail("public-pack.js must run before the sign-in door");
if (!/if \(!window\.WM_PUBLIC_PACK\)[\s\S]{0,400}mrj-auth-boot\.js/.test(index)) fail("sign-in door must be skipped in public mode");
if (at("js/public-pack.js") > at("js/app.js")) fail("public-pack.js before app.js");

function runCase(src) {
  const { bootApp } = require("./load_app_for_test.js");
  global.location = { search: "?packsrc=" + encodeURIComponent(src) };
  let writes = 0;
  const api = bootApp({
    beforeApp: function (g) {
      const real = g.localStorage;
      Object.defineProperty(g, "localStorage", {
        value: {
          getItem: real.getItem,
          setItem: function () { writes += 1; },
          removeItem: function () { writes += 1; },
        },
        configurable: true,
        writable: true,
      });
      require("../js/public-pack.js");
    },
  });
  api.persist();
  api.logEvent({ activity_id: "x", correct: true });
  api.saveStateToStorage();
  return { pub: !!global.WM_PUBLIC_PACK, mode: api.isPublicMode(), canPlay: api.canPlay(), writes: writes };
}

if (process.argv[2] === "--case") {
  process.stdout.write(JSON.stringify(runCase(process.argv[3])));
  process.exit(0);
}

function child(src) {
  const r = spawnSync(process.execPath, [__filename, "--case", src], { encoding: "utf8" });
  if (r.status !== 0) fail("child failed: " + r.stderr);
  return JSON.parse(r.stdout.trim().split("\n").pop());
}

const news = child(NEWS);
if (!news.pub || !news.mode) fail("news pack not in public mode: " + JSON.stringify(news));
if (!news.canPlay) fail("news pack must play with no sign-in");
if (news.writes !== 0) fail("public mode wrote to the real localStorage: " + news.writes);

const toeic = child(TOEIC);
if (toeic.pub || toeic.mode) fail("toeic must not be public");
if (toeic.canPlay) fail("toeic must still need sign-in");

console.log("PUBLIC_PACK_OK");
