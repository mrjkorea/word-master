#!/usr/bin/env node
import { createRequire } from "module";
import fs from "fs";
import path from "path";
const require = createRequire(import.meta.url);
const common = require("./ielts_pack_common.js");

const packs = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["ielts01", "ielts02", "ielts03", "ielts04", "ielts05"];

for (const packId of packs) {
  const words = JSON.parse(fs.readFileSync(path.join(common.ROOT, "packs", packId + ".json"), "utf8")).words;
  const missing = common.fillAudioGaps(packId, words, {});
  const pack = { title: packId };
  common.writeManifest(packId, { title: packId }, words, { missing_files: missing.map((x) => "audio/" + x) });
  console.log(packId, "filled, remaining gaps", missing.length);
}
