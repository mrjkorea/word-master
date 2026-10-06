#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { bootApp } = require("./load_app_for_test.js");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

function wordsOf(n) {
  const words = [];
  for (let i = 1; i <= n; i++) words.push({ id: "w" + i, en: "word" + i, ko: "ko" + i });
  return words;
}

function setOf(n) {
  return {
    id: "set_all_" + n,
    packId: "nouns100",
    title: "Pack " + n,
    words: wordsOf(n),
    intro: {},
    winsA: {},
    winsB: {},
    winsC: {},
    meetLock: [],
  };
}

const root = path.join(__dirname, "..");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const seatsAt = index.indexOf('id="stand-seats"');
const allAt = index.indexOf('id="seat-all-slot"');
if (seatsAt === -1 || allAt === -1 || allAt < seatsAt) {
  fail("All slot is not after the number seats");
}
const css = fs.readFileSync(path.join(root, "css/app.css"), "utf8");
if (!/button\.seat\.seat-all[\s\S]*min-width:\s*64px/.test(css)) {
  fail("All tile is not wide enough to read All");
}

const api = bootApp();
[5, 100].forEach(function (n) {
  const data = api.renderPackStanding(setOf(n));
  if (!data || data.seats.length !== n) fail("number seats " + n);
  const host = document.querySelector("#stand-seats");
  if (!host || host.children.length !== n) {
    fail("number tiles " + (host && host.children.length));
  }
  for (let i = 0; i < n; i++) {
    if (host.children[i].textContent !== String(i + 1)) {
      fail("seat " + (i + 1) + " text " + host.children[i].textContent);
    }
  }
  const slot = document.querySelector("#seat-all-slot");
  const all = slot && slot.children && slot.children[0];
  if (!all || all.textContent !== "All") {
    fail("renderPackStanding did not add an All tile after the number seats");
  }
  const later = slot.children.filter(function (node) { return node.textContent === "All"; });
  if (later.length !== 1) fail("All tile count " + later.length);
});

console.log("ALL_TILE_OK");
process.exit(0);
