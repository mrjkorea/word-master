#!/usr/bin/env node
"use strict";

/**
 * Korean locale from remote progress must sync I18n before game packs bake,
 * and changing the language chip must refresh match tiles and open games.
 */

const { bootApp } = require("./load_app_for_test.js");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

function trackingI18n(g) {
  let loc = "en";
  g.WordFactoryI18n = {
    setLocale: function (x) {
      loc = x || "en";
      return loc;
    },
    getLocale: function () {
      return loc;
    },
    fillSelect: function () {},
    applyDom: function () {},
    partName: function (m) { return m; },
    partHint: function () { return ""; },
    t: function (k) { return k; },
  };
  return {
    get: function () { return loc; },
  };
}

const i18n = { get: function () { return "en"; } };
const api = bootApp({
  mode: "student",
  beforeApp: function (g) {
    const t = trackingI18n(g);
    i18n.get = t.get;
  },
});

const area = {
  id: "area",
  en: "area",
  ko: "지역",
  l1: { ko: "지역", en: "a region" },
  ww: { def: "a region" },
};
const city = {
  id: "city",
  en: "city",
  ko: "도시",
  l1: { ko: "도시", en: "a city" },
  ww: { def: "a city" },
};

const set = {
  id: "set_nouns500",
  packId: "nouns500",
  title: "Nouns 500",
  words: [area, city],
  intro: { area: true, city: true },
  winsA: { area: 2, city: 2 },
  winsB: { area: 2, city: 2 },
  winsC: { area: 2, city: 2 },
  meetLock: ["area", "city"],
};
api.activateSet(set);

if (i18n.get() !== "en") fail("boot locale " + i18n.get());
if (api.meaning(area) !== "a region") fail("boot meaning " + api.meaning(area));

api.applyRemote({
  v: 1,
  locale: "ko",
  currentPackId: "nouns500",
  sets: {
    nouns500: {
      title: "Nouns 500",
      words: [],
      meetLock: ["area", "city"],
      intro: { area: true, city: true },
      winsA: { area: 2, city: 2 },
      winsB: { area: 2, city: 2 },
      winsC: { area: 2, city: 2 },
    },
  },
});

if (api.getState().locale !== "ko") fail("state locale " + api.getState().locale);
if (i18n.get() !== "ko") fail("I18n not synced after applyRemote: " + i18n.get());
if (api.localeCode() !== "ko") fail("localeCode " + api.localeCode());
if (api.meaning(area) !== "지역") fail("meaning after remote " + api.meaning(area));

const store = {};
global.sessionStorage = {
  getItem: function (k) { return store[k] == null ? null : store[k]; },
  setItem: function (k, v) { store[k] = String(v); },
};
global.MRJ_AUTH = { student: function () { return "ko-student"; } };

api.openPortableGame("snowjump");
const raw = store["mrj.wm.gamepack"];
if (!raw) fail("no gamepack");
const pack = JSON.parse(raw);
const q = (pack.items || []).find(function (it) { return it.item_id === "area"; });
if (!q || q.question !== "지역") fail("snow question " + JSON.stringify(q));
if (pack.ui_locale !== "ko") fail("snow ui_locale " + pack.ui_locale);

api.applyLocale("en");
api.startMatch();
const mg0 = api.getMatchGame();
const ko0 = (mg0 && mg0.tiles || []).find(function (t) { return t.side === "ko"; });
if (!ko0 || ko0.text !== "a region") fail("match en tile " + JSON.stringify(ko0 && ko0.text));

api.applyLocale("ko");
const mg1 = api.getMatchGame();
const ko1 = (mg1 && mg1.tiles || []).find(function (t) { return t.side === "ko"; });
if (!ko1 || ko1.text !== "지역") fail("match ko tile " + JSON.stringify(ko1 && ko1.text));

api.armGame("leapfrog");
api.applyLocale("en");
store["mrj.wm.gamepack"] = "";
api.applyLocale("ko");
const raw2 = store["mrj.wm.gamepack"];
if (!raw2) fail("open game not refreshed on locale change");
const pack2 = JSON.parse(raw2);
const q2item = (pack2.items || []).find(function (it) { return it.item_id === "area"; });
if (!q2item || q2item.question !== "지역") fail("refreshed game question " + JSON.stringify(q2item));

console.log("GAME_LOCALE_SYNC_OK");
process.exit(0);
