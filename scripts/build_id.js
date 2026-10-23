// Test helper: read the build id and check that a script/css is loaded with a ?v= cache key.
"use strict";
const { readBuild } = require("./sync_version.js");
function cacheKey(index, file) {
  const re = new RegExp(file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\?v=([A-Za-z0-9._-]+)");
  const m = index.match(re);
  return m ? m[1] : null;
}
function srcAt(index, file) { return index.indexOf(file + "?v="); }
module.exports = { readBuild, cacheKey, srcAt };
