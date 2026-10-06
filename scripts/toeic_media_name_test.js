#!/usr/bin/env node
"use strict";

const path = require("path");
const { bootApp } = require("./load_app_for_test.js");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

function fileOf(url) {
  const parts = String(url || "").split("/");
  return parts[parts.length - 1];
}

function assertNamed(url, id, stripped) {
  const file = decodeURIComponent(fileOf(url));
  if (file.indexOf(id + ".") !== 0) {
    fail(url + " should request " + id + ", got " + file);
  }
  if (stripped !== id && file.indexOf(stripped + ".") === 0) {
    fail(url + " dropped the hyphen and requested " + stripped);
  }
}

function installAudio(hold) {
  const clips = [];
  global.Audio = function () {
    const audio = {
      src: "",
      paused: false,
      onended: null,
      onerror: null,
      play: function () {
        clips.push({ src: audio.src, audio: audio });
        if (!hold) {
          return Promise.resolve().then(function () {
            if (typeof audio.onended === "function") audio.onended();
          });
        }
        return Promise.resolve();
      },
      pause: function () { audio.paused = true; },
    };
    return audio;
  };
  return clips;
}

function clearAppCache() {
  delete require.cache[path.resolve(__dirname, "../js/app.js")];
}

const WORDS = [
  { id: "e-book", en: "e-book", ko: "전자책" },
  { id: "o-clock", en: "o'clock", ko: "시" },
  { id: "ice-cream", en: "ice-cream", ko: "아이스크림" },
  { id: "by-law", en: "by-law", ko: "내규" },
  { id: "cat", en: "cat", ko: "고양이" },
];

function activate(WM) {
  WM.activateSet({
    id: "toeic-media",
    packId: "toeic01",
    title: "TOEIC 1–100",
    words: WORDS,
    meetLock: WORDS.map(function (w) { return w.id; }),
    intro: {},
    winsA: {},
    winsB: {},
    winsC: {},
  });
}

function wait(ms) {
  return new Promise(function (resolve) { setTimeout(resolve, ms); });
}

async function main() {
  clearAppCache();
  global.location = { search: "?mode=teacher" };
  const store = {};
  const WM = bootApp();
  const clips = installAudio(false);
  global.sessionStorage = {
    getItem: function (k) { return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null; },
    setItem: function (k, v) { store[k] = String(v); },
  };
  global.MRJ_AUTH = { student: function () { return "tester"; } };
  activate(WM);

  assertNamed(WM.wordPic(WORDS[0]), "e-book", "ebook");
  assertNamed(WM.wordPic(WORDS[1]), "o-clock", "oclock");
  assertNamed(WM.wordPic(WORDS[2]), "ice-cream", "icecream");
  assertNamed(WM.wordPic(WORDS[3]), "by-law", "bylaw");
  assertNamed(WM.wordPic(WORDS[4]), "cat", "cat");

  await WM.speak("o'clock");
  await WM.speak("e-book");
  await WM.speak("cat");
  if (clips[0].src.indexOf("/audio/us_m/o-clock.mp3") < 0) {
    fail("speak(o'clock) played " + clips[0].src);
  }
  if (clips[0].src.indexOf("oclock.mp3") >= 0) fail("speak(o'clock) requested oclock.mp3");
  assertNamed(clips[1].src, "e-book", "ebook");
  assertNamed(clips[2].src, "cat", "cat");

  const wwAt = clips.length;
  await WM.speakWW(WORDS[2]);
  await WM.speakWW(WORDS[3]);
  if (clips[wwAt].src.indexOf("/audio/ww_us_m/ice-cream.mp3") < 0) {
    fail("speakWW ice-cream played " + clips[wwAt].src);
  }
  if (clips[wwAt].src.indexOf("icecream.mp3") >= 0) fail("speakWW requested icecream.mp3");
  assertNamed(clips[wwAt + 1].src, "by-law", "bylaw");

  const shot = WM.shooterPack(WM.currentSet());
  shot.items.forEach(function (it) {
    const word = WORDS.filter(function (w) { return w.en === it.prompt; })[0];
    if (!word) fail("shooter missing word " + it.prompt);
    assertNamed(it.audio, word.id, word.id.replace(/-/g, ""));
  });
  const shotBook = shot.items.filter(function (it) { return it.prompt === "e-book"; })[0];
  const shotClock = shot.items.filter(function (it) { return it.prompt === "o'clock"; })[0];
  if (!shotBook || shotBook.audio.indexOf("ebook.mp3") >= 0) fail("shooter e-book " + (shotBook && shotBook.audio));
  if (!shotClock || shotClock.audio.indexOf("/o-clock.mp3") < 0) fail("shooter o-clock " + (shotClock && shotClock.audio));

  WM.openPortableGame("spellfire");
  const raw = store["mrj.wm.gamepack"];
  if (!raw) fail("spellfire did not store a pack");
  const pack = JSON.parse(raw);
  function spellItem(id) {
    return (pack.items || []).filter(function (it) { return it.item_id === id; })[0];
  }
  const clock = spellItem("o-clock");
  if (!clock || clock.audio.indexOf("/audio/us_m/o-clock.mp3") < 0 || clock.audio.indexOf("oclock.mp3") >= 0) {
    fail("spellfire o-clock audio " + (clock && clock.audio));
  }
  ["e-book", "ice-cream", "by-law", "cat"].forEach(function (id) {
    const it = spellItem(id);
    if (!it) fail("spellfire missing " + id);
    assertNamed(it.audio, id, id.replace(/-/g, ""));
  });

  clearAppCache();
  const WM2 = bootApp();
  const held = installAudio(true);
  activate(WM2);
  WM2.startTapmap();
  if (WM2.tapPhase() !== "explore") fail("meet did not open on explore");
  const tile = {
    classList: { add: function () {}, remove: function () {}, contains: function () { return false; } },
    offsetWidth: 1,
  };
  WM2.currentSet().words.forEach(function (w) { WM2.onTapTile(w, tile); });
  if (WM2.tapPhase() !== "explore") fail("last Meet word moved on before its audio ended");
  const last = held[held.length - 1];
  if (!last || last.src.indexOf("/audio/us_m/") < 0) fail("last Meet word did not play " + (last && last.src));
  const bare = fileOf(last.src);
  if (bare === "ebook.mp3" || bare === "oclock.mp3" || bare === "icecream.mp3" || bare === "bylaw.mp3") {
    fail("last Meet word dropped a hyphen: " + last.src);
  }
  if (typeof last.audio.onended !== "function") fail("speak() did not wait for the clip to end");
  last.audio.onended();
  if (WM2.tapPhase() !== "explore") fail("Meet moved on before the short pause after the word");
  await wait(500);
  if (WM2.tapPhase() !== "listen") fail("Meet did not continue after the last word ended, phase " + WM2.tapPhase());
  const follow = held[held.length - 1];
  if (follow && follow.audio && typeof follow.audio.onended === "function") follow.audio.onended();

  console.log("TOEIC_MEDIA_OK");
}

main().catch(function (err) {
  console.error(err);
  process.exit(1);
});
