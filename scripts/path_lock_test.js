#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const PathLock = require("../js/path-lock.js");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

function words(ids) {
  return ids.map(function (id) { return { id: id, en: id, ko: id }; });
}

function fresh(ids) {
  return {
    words: words(ids),
    meetLock: ids.slice(),
    intro: {},
    tapmapKey: "",
    winsA: {},
    winsB: {},
    winsC: {},
  };
}

function meet(set) {
  const ids = set.meetLock.slice();
  set.tapmapKey = ids.join(",");
  ids.forEach(function (id) { set.intro[id] = true; });
}

function wins(set, bucket) {
  set.meetLock.forEach(function (id) { bucket[id] = 2; });
}

function assertLocked(set, step) {
  const gate = PathLock.can(set, step);
  if (gate.ok) fail(step + " should be locked");
  if (gate.why !== "locked") fail(step + " why " + gate.why);
}

const round = fresh(["w1", "w2"]);
const held0 = PathLock.hold(round);
if (PathLock.next(round) !== "intro") fail("fresh next " + PathLock.next(round));
if (!PathLock.can(round, "intro").ok) fail("fresh intro closed");
["A", "B", "C", "games", "test"].forEach(function (step) {
  assertLocked(round, step);
  if (held0[step]) fail("fresh held " + step);
});

meet(round);
if (!PathLock.can(round, "A").ok) fail("meet done should open A");
const bGate = PathLock.can(round, "B");
if (bGate.ok || bGate.need !== "A" || bGate.why !== "locked") {
  fail("can B " + JSON.stringify(bGate));
}
assertLocked(round, "C");

wins(round, round.winsA);
if (!PathLock.can(round, "B").ok) fail("learn done should open B");
assertLocked(round, "C");

wins(round, round.winsB);
if (!PathLock.can(round, "C").ok) fail("B done should open C");
assertLocked(round, "games");

wins(round, round.winsC);
if (!PathLock.can(round, "games").ok) fail("C done should open games");
assertLocked(round, "test");
if (PathLock.hold(round).test) fail("games open must not hold the test");

const opened = PathLock.hold(round);
if (!opened.C || opened.games) fail("C held, games not, before a completion");

const rec = PathLock.markGameDone(round, "leapfrog", { now: function () { return 1000; } });
if (!rec || rec.done !== true || rec.game !== "leapfrog" || rec.at !== 1000) {
  fail("markGameDone record " + JSON.stringify(rec));
}
if (!PathLock.can(round, "test").ok) fail("finished game should open the test");
const after = PathLock.hold(round);
if (!after.C || !after.games) fail("C and games must stay held");
if (PathLock.next(round) !== null) fail("finished path next " + PathLock.next(round));

round.intro = {};
round.tapmapKey = "";
round.winsA = {};
round.winsB = {};
round.winsC = {};
["intro", "A", "B", "C", "games", "test"].forEach(function (step) {
  if (!PathLock.can(round, step).ok) fail("replay relocked " + step);
});
if (PathLock.next(round) !== null) fail("replay next " + PathLock.next(round));

const again = PathLock.hold(round);
if (!again.intro || !again.A || !again.B || !again.C || !again.games) {
  fail("replay hold dropped a finished step");
}

round.words = round.words.concat(words(["w3", "w4"]));
round.meetLock = ["w3", "w4"];
PathLock.syncRound(round);
if (PathLock.next(round) !== "intro") fail("new round next " + PathLock.next(round));
["A", "B", "C", "games", "test"].forEach(assertLocked.bind(null, round));
if (round.roundGame && round.roundGame.done) fail("new round kept the game flag");

round.meetLock = ["w1", "w2"];
PathLock.syncRound(round);
if (!PathLock.hold(round).games || !PathLock.can(round, "test").ok) {
  fail("old round no longer reads as done");
}
if (PathLock.next(round) !== null) fail("old round next " + PathLock.next(round));

if (!PathLock.isTeacher("?mode=teacher", "")) fail("?mode=teacher");
if (!PathLock.isTeacher("?teacher=1", "")) fail("?teacher=1");
if (PathLock.isTeacher("?mode=student", "teacher")) fail("?mode=student must win");
["", "banana", null, undefined].forEach(function (search) {
  if (PathLock.isTeacher(search, "")) fail("fail closed for " + String(search));
  if (PathLock.isTeacher(search, null)) fail("fail closed saved null " + String(search));
  if (PathLock.isTeacher(search, undefined)) fail("fail closed saved undefined " + String(search));
});
if (PathLock.isTeacher("?mode=banana", "teacher")) fail("garbled mode opened teacher");
if (!PathLock.isTeacher("", "teacher")) fail("saved teacher should stick when the flag is absent");
if (!PathLock.isTeacher("?pack=nouns100", "teacher")) fail("pack flag must not clear a saved teacher");

const root = path.join(__dirname, "..");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
if (index.indexOf("js/path-lock.js") === -1) fail("index.html does not load path-lock.js");
if (index.indexOf("js/path-lock.js") > index.indexOf("js/app.js")) {
  fail("path-lock.js must load before app.js");
}
if (index.indexOf("js/path-lock.js?v=20261001-lock") === -1) fail("path-lock cache");
if (index.indexOf("js/app.js?v=20261007-allrows") === -1) fail("app cache");

const { bootApp } = require("./load_app_for_test");
const api = bootApp();
const ready = fresh(["w1", "w2"]);
meet(ready);
wins(ready, ready.winsA);
wins(ready, ready.winsB);
wins(ready, ready.winsC);
ready.id = "round-game";
ready.title = "Round";
ready.packId = "nouns100";
api.activateSet(ready);
if (!PathLock.can(api.currentSet(), "games").ok) fail("parent fixture did not open games");
if (PathLock.can(api.currentSet(), "test").ok) fail("parent fixture opened the test early");

function doneMsg(game, items, finished) {
  return { type: "mrj-wm-game-done", game: game, items: items, finished: finished !== false };
}
api.armGame("leapfrog");
api.deliverGameDone(doneMsg("leapfrog", 1));
if (api.currentSet().roundGame && api.currentSet().roundGame.done) {
  fail("items below the round length marked the game done");
}
if (PathLock.can(api.currentSet(), "test").ok) fail("items below the round length opened the test");
api.deliverGameDone(doneMsg("leapfrog", "2"));
if (api.currentSet().roundGame && api.currentSet().roundGame.done) fail("string items opened the test");
api.deliverGameDone({ type: "mrj-wm-game-done", game: "leapfrog", finished: true });
if (api.currentSet().roundGame && api.currentSet().roundGame.done) fail("missing items opened the test");
api.deliverGameDone(doneMsg("leapfrog", 2, false));
if (api.currentSet().roundGame && api.currentSet().roundGame.done) fail("finished false opened the test");
api.deliverGameDone(doneMsg("spellfire", 2));
if (api.currentSet().roundGame && api.currentSet().roundGame.done) fail("a different game opened the test");
api.deliverGameDone(doneMsg("banana", 2));
if (api.currentSet().roundGame && api.currentSet().roundGame.done) fail("unknown game opened the test");
api.leaveGame();
api.deliverGameDone(doneMsg("leapfrog", 2));
if (api.currentSet().roundGame && api.currentSet().roundGame.done) fail("a message off the game screen opened the test");
if (PathLock.can(api.currentSet(), "test").ok) fail("test opened without a full round");

api.armGame("leapfrog");
api.deliverGameDone(doneMsg("leapfrog", 2));
if (!api.currentSet().roundGame || api.currentSet().roundGame.done !== true || api.currentSet().roundGame.game !== "leapfrog") {
  fail("full round did not mark the game " + JSON.stringify(api.currentSet().roundGame));
}
if (!PathLock.can(api.currentSet(), "test").ok) fail("full round did not open the test");
if (api.screenName() === "playgame") fail("full round stayed on the game");

function mustInclude(rel, needle) {
  const text = fs.readFileSync(path.join(root, rel), "utf8");
  if (text.indexOf(needle) === -1) fail(rel + " missing " + needle);
  return text;
}
mustInclude("games/leap-frog/assets/index-Bs4ORQ3Y.js", 'game:"leapfrog"');
mustInclude("games/leap-frog/assets/index-Bs4ORQ3Y.js", "((e.items&&e.items.length)||0)-c.corrects");
const snow = mustInclude("games/snow-jump/assets/index-DA78ZsQf.js", 'game:"snowjump"');
if (snow.indexOf("((e.items&&e.items.length)||0)-c.corrects") === -1) fail("snow jump still ends at a fixed count");
const invaders = mustInclude("games/sound-invaders/assets/index-BRj5RKfc.js", 'game:"soundinvaders"');
const overAt = invaders.indexOf('title:"GAME OVER"');
if (overAt < 0 || invaders.slice(overAt, overAt + 700).indexOf("mrj-wm-game-done") !== -1) {
  fail("sound invaders posts on game over");
}
const spell = mustInclude("games/spellfire/src/engine.js", 'game: "spellfire"');
const loseAt = spell.indexOf("function loseRound");
const tapAt = spell.indexOf("function tapWindow");
if (loseAt < 0 || tapAt < loseAt || spell.slice(loseAt, tapAt).indexOf("postGameDone") !== -1) {
  fail("spellfire posts on a loss");
}
if (spell.indexOf("function postGameDone") === -1 || spell.indexOf("if (n) postGameDone();") === -1) {
  fail("spellfire does not post from the finished round");
}

console.log("PATH_LOCK_OK");
process.exit(0);
