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
const studyAt = index.indexOf('id="study-size"');
const seatsAt = index.indexOf('id="stand-seats"');
if (studyAt === -1 || seatsAt === -1 || studyAt > seatsAt) {
  fail("index.html puts #study-size after #stand-seats");
}

const css = fs.readFileSync(path.join(root, "css/app.css"), "utf8");
if (!/#screen-set\.active\s*\{[^}]*overflow-y:\s*auto/.test(css)) {
  fail("css/app.css does not set overflow-y: auto on #screen-set.active");
}

console.log("COUNT_BUTTONS_VISIBLE_OK");
process.exit(0);
