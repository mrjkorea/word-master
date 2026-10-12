#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

const root = path.join(__dirname, "..");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "js", "app.js"), "utf8");
const frog = fs.readFileSync(path.join(root, "games", "leap-frog", "index.html"), "utf8");

if (index.indexOf('id="games-lock-note"') === -1) fail("games screen has no lock note");
if (index.indexOf('id="btn-games-need"') === -1) fail("games screen has no jump button");
if (app.indexOf('const gamesNote = $("#games-lock-note")') === -1) fail("lock note is not painted on the games screen");
if (app.indexOf("function showGamesScreen()") === -1) fail("games screen does not check the path");
if (app.indexOf("function roundReadyForGame") === -1) fail("finished round is not recognized");
if (app.indexOf("if (roundReadyForGame(set)) return goGames();") === -1) fail("the jump still restarts a finished round");
if (app.indexOf("PathLock.can(set, step, pathOpts())") === -1) fail("the lock still uses a different word list");
if (app.indexOf('if (!pathOpen("games")) return;') === -1) fail("a locked tap can still open a game");

const gamesBlock = index.slice(index.indexOf('id="screen-games"'), index.indexOf('id="screen-playgame"'));
if (gamesBlock.indexOf("games-lock-note") === -1) fail("lock note is not inside the games screen");
if (gamesBlock.indexOf("path-lock-note") !== -1) fail("games screen still uses the hidden set note only");

if (frog.indexOf("mrj-auth-boot.js") === -1) fail("standalone Leap Frog lost its door");
if (frog.indexOf("pack=session") === -1) fail("embedded Leap Frog still always loads the door");
if (frog.indexOf("window.parent !== window") === -1) fail("iframe Leap Frog still always loads the door");
const bootAt = frog.indexOf("mrj-auth-boot.js");
const embedAt = frog.indexOf("if (embedded) return;");
if (embedAt < 0 || embedAt > bootAt) fail("the door script is not behind the embed check");

console.log("GAMES_LOCK_NOTE_OK");
