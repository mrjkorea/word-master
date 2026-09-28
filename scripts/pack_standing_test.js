#!/usr/bin/env node
"use strict";

const { bootApp } = require("./load_app_for_test.js");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

const api = bootApp();
const words = [];
for (let i = 1; i <= 100; i++) {
  words.push({ id: "w" + i, en: "word" + i, ko: "ko" + i });
}
const intro = {};
const winsA = {};
const winsB = {};
const winsC = {};
for (let i = 1; i <= 30; i++) {
  const id = "w" + i;
  intro[id] = true;
  winsA[id] = 2;
  winsB[id] = 2;
  winsC[id] = 2;
}
const meetLock = [];
for (let i = 31; i <= 40; i++) meetLock.push("w" + i);
const set = {
  id: "set_pack_standing",
  packId: "nouns100",
  title: "Nouns 100",
  words: words,
  intro: intro,
  winsA: winsA,
  winsB: winsB,
  winsC: winsC,
  meetLock: meetLock,
};

const data = api.renderPackStanding(set);
if (!data) fail("renderPackStanding returned nothing");
if (data.countText !== "30 / 100 words finished") {
  fail("count text " + data.countText);
}
if (data.leftText.indexOf("70 to go") !== 0) fail("left text " + data.leftText);
if (data.doneCount !== 30) fail("doneCount " + data.doneCount);
if (data.doingCount !== 10) fail("doingCount " + data.doingCount);

const expectNext = [];
for (let i = 31; i <= 40; i++) expectNext.push("w" + i);
if (data.nextIds.join(",") !== expectNext.join(",")) {
  fail("next batch " + data.nextIds.join(","));
}
const nextEn = data.nextWords.map(function (w) { return w.en; }).join(" · ");
if (data.nextText !== "Next 10: " + nextEn) fail("next text " + data.nextText);
if (nextEn !== "word31 · word32 · word33 · word34 · word35 · word36 · word37 · word38 · word39 · word40") {
  fail("next english " + nextEn);
}

const doneSeats = data.seats.filter(function (s) { return s.state === "done"; }).length;
const doingSeats = data.seats.filter(function (s) { return s.state === "doing"; }).length;
const todoSeats = data.seats.filter(function (s) { return s.state === "todo"; }).length;
if (doneSeats !== 30 || doingSeats !== 10 || todoSeats !== 60) {
  fail("seats done=" + doneSeats + " doing=" + doingSeats + " todo=" + todoSeats);
}

const countEl = document.querySelector("#stand-count");
const leftEl = document.querySelector("#stand-left");
const seatsEl = document.querySelector("#stand-seats");
if (!countEl || countEl.textContent !== "30 / 100 words finished") fail("stand-count DOM");
if (!leftEl || leftEl.textContent.indexOf("70 to go") !== 0) fail("stand-left DOM");
if (!seatsEl || seatsEl.children.length !== 100) fail("seat nodes " + (seatsEl && seatsEl.children.length));
const domDone = seatsEl.children.filter(function (n) { return n.className.indexOf("done") !== -1; }).length;
const domDoing = seatsEl.children.filter(function (n) { return n.className.indexOf("doing") !== -1; }).length;
if (domDone !== 30 || domDoing !== 10) fail("DOM seats done=" + domDone + " doing=" + domDoing);

console.log("PACK_STANDING_OK 30/100 next w31-w40 seats 30 done + 10 doing");
process.exit(0);
