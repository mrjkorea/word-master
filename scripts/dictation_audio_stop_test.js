#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const SpellStop = require("../js/spell-stop.js");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

function fakeAudio(src) {
  const audio = {
    src: src,
    paused: false,
    onended: function () {},
    onerror: function () {},
    plays: 0,
    pause: function () { audio.paused = true; },
    play: function () {
      audio.plays += 1;
      audio.paused = false;
      return Promise.resolve();
    },
  };
  return audio;
}

function extractFunction(src, name) {
  const re = new RegExp("(?:async\\s+)?function\\s+" + name + "\\s*\\(");
  const m = re.exec(src);
  if (!m) return "";
  let i = src.indexOf("{", m.index);
  if (i < 0) return "";
  let depth = 0;
  let quote = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (c === "\\") { i += 1; continue; }
      if (c === quote) quote = null;
      continue;
    }
    if (c === "/" && src[i + 1] === "/") {
      const nl = src.indexOf("\n", i);
      if (nl < 0) break;
      i = nl;
      continue;
    }
    if (c === "'" || c === '"' || c === "`") {
      quote = c;
      continue;
    }
    if (c === "{") depth += 1;
    else if (c === "}") {
      depth -= 1;
      if (depth === 0) return src.slice(m.index, i + 1);
    }
  }
  return "";
}

async function main() {
  let cancelled = 0;
  globalThis.speechSynthesis = {
    cancel: function () { cancelled += 1; },
  };

  const letter = fakeAudio("letters/A.mp3");
  SpellStop.bind(letter);
  const nextToken = SpellStop.bump();
  if (typeof nextToken !== "number") fail("bump did not return a number");
  if (!letter.paused) fail("bump did not pause the bound letter");
  if (letter.src !== "") fail("bump did not clear the bound letter src");
  if (letter.onended !== null || letter.onerror !== null) fail("bump left letter handlers");
  if (!cancelled) fail("bump did not cancel speechSynthesis");
  if (SpellStop.token() !== nextToken) fail("token() is not the bump result");
  if (SpellStop.stale(nextToken)) fail("fresh bump token was stale");

  const oldToken = SpellStop.token();
  const oldEl = fakeAudio("letters/B.mp3");
  const pending = oldEl.play();
  const boundNext = fakeAudio("cat.mp3");
  SpellStop.bind(boundNext);
  SpellStop.bump();
  boundNext.src = "cat.mp3";
  boundNext.paused = false;
  await pending.then(function () {
    oldEl.paused = false;
    oldEl.src = "letters/B.mp3";
    SpellStop.settle(oldEl, oldToken);
  });
  if (oldEl === boundNext) fail("old letter and next word were the same element");
  if (!oldEl.paused || oldEl.src !== "") fail("settle did not stop the late letter");
  if (boundNext.paused || boundNext.src !== "cat.mp3") fail("settle stopped the bound next word");
  SpellStop.settle(boundNext, SpellStop.token());
  if (boundNext.paused || boundNext.src !== "cat.mp3") fail("settle ran on a live token");

  const loopToken = SpellStop.token();
  const played = [];
  const letters = ["A", "B", "C"];
  for (let i = 0; i < letters.length; i++) {
    if (SpellStop.stale(loopToken)) break;
    const clip = fakeAudio("letters/" + letters[i] + ".mp3");
    clip.play();
    played.push(letters[i]);
    if (i === 0) SpellStop.bump();
  }
  if (played.join(",") !== "A") fail("letter loop played " + played.join(","));

  const root = path.join(__dirname, "..");
  const app = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
  const advance = extractFunction(app, "advanceLearn");
  const teach = extractFunction(app, "teachSpelling");
  const speak = extractFunction(app, "speak");
  const speakWW = extractFunction(app, "speakWW");
  const speakLetter = extractFunction(app, "speakLetter");
  const playClip = extractFunction(app, "playClip");
  if (!advance) fail("advanceLearn missing");
  if (!teach) fail("teachSpelling missing");
  if (advance.indexOf("SpellStop.bump") === -1) fail("advanceLearn does not call SpellStop.bump");
  if (teach.indexOf("SpellStop.stale") === -1) fail("teachSpelling does not call SpellStop.stale");
  if (!speakLetter) fail("speakLetter missing");
  if (speakLetter.indexOf("SpellStop.bump") !== -1) fail("speakLetter must not bump");
  [speak, speakWW].forEach(function (body, n) {
    const label = n === 0 ? "speak" : "speakWW";
    if (!body) fail(label + " missing");
    if (body.indexOf("playClip") === -1) fail(label + " must route through playClip");
  });
  if (!playClip) fail("playClip missing");
  const bumpAt = playClip.indexOf("SpellStop.bump");
  const audioAt = playClip.indexOf("new Audio");
  const bindAt = playClip.indexOf("SpellStop.bind");
  const playAt = playClip.indexOf(".play()");
  const settleAt = playClip.indexOf("SpellStop.settle");
  if (bumpAt < 0 || audioAt < 0 || bindAt < 0 || playAt < 0 || settleAt < 0) {
    fail("playClip missing bump, Audio, bind, play, or settle");
  }
  if (!(bumpAt < audioAt && audioAt < bindAt && bindAt < playAt && playAt < settleAt)) {
    fail("playClip order is not bump, Audio, bind, play, settle");
  }

  const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const spellSrc = index.indexOf("js/spell-stop.js?v=20260930-spellstop");
  const appSrc = index.indexOf("js/app.js?v=20261007-all");
  if (spellSrc < 0) fail("index.html missing spell-stop cache");
  if (appSrc < 0) fail("index.html missing app.js cache");
  if (spellSrc > appSrc) fail("spell-stop.js must load before app.js");

  console.log("DICTATION_AUDIO_STOP_OK");
  process.exit(0);
}

main().catch(function (err) {
  console.error(err);
  process.exit(1);
});
