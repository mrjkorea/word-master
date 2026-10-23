#!/usr/bin/env node
// version.json is generated from WM_BUILD_ID in index.html.
//   node scripts/sync_version.js          -> write version.json from index.html
//   node scripts/sync_version.js --check  -> fail if they differ (CI / before publish)
"use strict";
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");

function readBuild() {
  const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const m = index.match(/window\.WM_BUILD_ID\s*=\s*"([^"]+)"/);
  if (!m) throw new Error("WM_BUILD_ID not found in index.html");
  return m[1];
}
module.exports = { readBuild: readBuild };

if (require.main === module) {
  const build = readBuild();
  const file = path.join(root, "version.json");
  const want = JSON.stringify({ build: build, app: "word-master" }, null, 2) + "\n";
  let have = "";
  try { have = fs.readFileSync(file, "utf8"); } catch (e) {}
  let haveBuild = "";
  try { haveBuild = JSON.parse(have).build; } catch (e) {}
  if (process.argv.includes("--check")) {
    if (haveBuild !== build) {
      console.error("FAIL: version.json build " + JSON.stringify(haveBuild) + " != WM_BUILD_ID " + JSON.stringify(build));
      process.exit(1);
    }
    console.log("VERSION_OK " + build);
  } else {
    fs.writeFileSync(file, want);
    console.log("version.json -> " + build);
  }
}
