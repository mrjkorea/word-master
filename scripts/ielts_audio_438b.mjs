#!/usr/bin/env node
/**
 * Generate missing ielts06–10 mp3s with Microsoft Edge TTS (edge-tts CLI).
 * Voice map matches Word Master pack folders; ww_us_m reads "{word}. {definition}".
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PACKS = path.join(ROOT, "packs");
const TODO = path.join(__dirname, "ielts_audio_todo_438b.json");
const EDGE = process.env.EDGE_TTS || path.join(process.env.HOME || "", ".local/bin/edge-tts");

const VOICE_MAP = {
  us_m: "en-US-GuyNeural",
  us_f: "en-US-JennyNeural",
  uk_m: "en-GB-RyanNeural",
  uk_f: "en-GB-SoniaNeural",
  grandma: "en-US-JennyNeural",
  grandpa: "en-US-GuyNeural",
  leo: "en-US-RogerNeural",
  robot: "en-US-ChristopherNeural",
  ww_us_m: "en-US-ChristopherNeural",
};

const PITCH = {
  grandma: "+4Hz",
  grandpa: "-4Hz",
  leo: "+2Hz",
  robot: "-2Hz",
};

function ffmpegCompress(src, dest) {
  const r = spawnSync(
    "ffmpeg",
    ["-y", "-i", src, "-ar", "44100", "-ac", "1", "-b:a", "128k", dest],
    { stdio: "pipe" }
  );
  return r.status === 0;
}

function speakText(job) {
  const { en, voice, def } = job;
  if (voice === "ww_us_m") {
    const d = def || en;
    return `${en}. ${d}`;
  }
  return en;
}

function synth(job) {
  const dest = path.join(PACKS, job.pack, "audio", job.voice, job.id + ".mp3");
  if (fs.existsSync(dest) && fs.statSync(dest).size > 2000) return { ok: true, dest, skip: true };

  const tmpRaw = dest + ".raw.webm";
  const tmpMp3 = dest + ".tmp.mp3";
  const voice = VOICE_MAP[job.voice];
  const text = speakText(job);
  const args = [
    "--voice",
    voice,
    "--text",
    text,
    "--write-media",
    tmpRaw,
  ];
  const pitch = PITCH[job.voice];
  if (pitch) args.push(`--pitch=${pitch}`);

  let r = spawnSync(EDGE, args, { stdio: "pipe", encoding: "utf8" });
  if (r.status !== 0) {
    return { ok: false, dest, err: r.stderr || r.stdout };
  }
  if (!ffmpegCompress(tmpRaw, tmpMp3)) {
    try {
      fs.unlinkSync(tmpRaw);
    } catch (_) {}
    return { ok: false, dest, err: "ffmpeg failed" };
  }
  try {
    fs.unlinkSync(tmpRaw);
  } catch (_) {}
  fs.renameSync(tmpMp3, dest);
  return { ok: true, dest };
}

function main() {
  if (!fs.existsSync(TODO)) {
    console.error("Run build_ielts_packs_438b.mjs first");
    process.exit(1);
  }
  const jobs = JSON.parse(fs.readFileSync(TODO, "utf8"));
  const limit = Number(process.env.LIMIT || 0);
  const slice = limit > 0 ? jobs.slice(0, limit) : jobs;
  let ok = 0;
  let fail = 0;
  for (let i = 0; i < slice.length; i++) {
    const job = slice[i];
    const res = synth(job);
    if (res.ok) {
      ok++;
      if ((i + 1) % 50 === 0) console.log("done", i + 1, "/", slice.length);
    } else {
      fail++;
      console.error("FAIL", job.pack, job.voice, job.en, res.err);
    }
  }
  console.log("TTS complete ok=", ok, "fail=", fail, "engine=edge-tts");
  if (fail) process.exit(1);
}

main();
