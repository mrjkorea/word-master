#!/usr/bin/env node
/**
 * Build IELTS vocabulary packs for Word Master.
 *
 * Usage:
 *   node scripts/generate_ielts_pack.mjs --pack 1 [--pack 2 ...] [--force-audio]
 *   node scripts/generate_ielts_pack.mjs --pack 1-5
 *   node scripts/generate_ielts_pack.mjs --manifest-only --pack 6
 *
 * Requires: ffmpeg, edge-tts (pip install edge-tts) for words missing copied audio.
 */
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const common = require("./ielts_pack_common.js");

function parseArgs(argv) {
  const packs = [];
  let force = false;
  let skipTts = false;
  let manifestOnly = false;
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--force-audio") force = true;
    else if (a === "--skip-tts") skipTts = true;
    else if (a === "--manifest-only") manifestOnly = true;
    else if (a === "--pack" && argv[i + 1]) {
      const spec = argv[++i];
      if (spec.includes("-")) {
        const [a0, b0] = spec.split("-").map(Number);
        for (let p = a0; p <= b0; p++) packs.push(p);
      } else packs.push(Number(spec));
    }
  }
  if (!packs.length) packs.push(1, 2, 3, 4, 5);
  return { packs, force, skipTts, manifestOnly };
}

const { packs, force, skipTts, manifestOnly } = parseArgs(process.argv);
const packIndex = common.loadPackWordIndex();
const overrides = common.loadOverrides();

for (const n of packs) {
  if (n < 1 || n > 15) {
    console.error("Pack number must be 1–15, got", n);
    process.exit(1);
  }
  if (manifestOnly) {
    const { id, lo, hi } = common.packRange(n);
    const list = common.parseWordList(require("path").join(common.ROOT, "data", "ielts_1500.txt"));
    const slice = list.filter((w) => w.rank >= lo && w.rank <= hi);
    const words = slice.map((row) => common.resolveWord(row.en, packIndex, overrides));
    const pack = common.buildPackJson(n, words);
    const manifest = common.writeManifest(id, pack, words, { missing_files: [] });
    console.log(id, "pictures missing:", manifest.missing_files.filter((f) => f.endsWith(".jpg")).length);
    continue;
  }
  const result = common.writePack(n, packIndex, overrides, { force, skipTts });
  const picMiss = result.manifest.missing_files.filter((f) => f.endsWith(".jpg"));
  console.log(
    "OK",
    result.id,
    result.words + " words",
    "audio gaps:",
    result.missingAudio.length,
    "picture gaps:",
    picMiss.length
  );
}
