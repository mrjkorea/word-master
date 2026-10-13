#!/usr/bin/env node
"use strict";

const { bootApp } = require("./load_app_for_test.js");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

const api = bootApp({ mode: "student" });
const internalId = "set_internal_uid_xyz";
const packId = "verbs200";

api.activateSet({
  id: internalId,
  packId: packId,
  title: "Verbs 101–200",
  words: [{ id: "sell", en: "sell", ko: "팔다" }],
  intro: { sell: true },
  winsA: { sell: 2 },
  winsB: { sell: 2 },
  winsC: { sell: 2 },
  meetLock: ["sell"],
});

const mem = api.memoryPack(api.currentSet());
const shoot = api.shooterPack(api.currentSet());
if (!mem || mem.pack_id !== packId) {
  fail("memoryPack pack_id " + JSON.stringify(mem && mem.pack_id));
}
if (!shoot || shoot.pack_id !== packId) {
  fail("shooterPack pack_id " + JSON.stringify(shoot && shoot.pack_id));
}

console.log("GAME_PACK_ID_OK");
