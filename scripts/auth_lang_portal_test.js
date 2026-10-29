#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

const root = path.join(__dirname, "..");
const ui = fs.readFileSync(path.join(root, "preview-assets/preview-ui.js"), "utf8");
const css = fs.readFileSync(path.join(root, "preview-assets/wm-preview.css"), "utf8");

if (ui.indexOf("syncAuthLangPortal") === -1) fail("preview-ui.js missing syncAuthLangPortal");
if (ui.indexOf("mrj-auth-locked") === -1) fail("preview-ui.js must watch mrj-auth-locked");
if (ui.indexOf("pv-lang-auth-portal") === -1) fail("preview-ui.js must use pv-lang-auth-portal");

if (css.indexOf(".pv-lang-auth-portal") === -1) fail("wm-preview.css missing .pv-lang-auth-portal");
if (!/2147483001/.test(css)) fail("portal z-index must beat mrj-auth-gate");

console.log("AUTH_LANG_PORTAL_OK");
process.exit(0);
