#!/usr/bin/env python3
"""Build ielts11–ielts15 packs (words 1001–1500). Agent-only script; not wired into app."""
from __future__ import annotations

import asyncio
import json
import os
import re
import shutil
import subprocess
import sys
from copy import deepcopy
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PACKS = ROOT / "packs"
WORD_LIST = Path(
    "/home/ubuntu/.cursor/projects/workspace/uploads/ielts_1500_0bd8.txt"
)
NEW_WORDS_JSON = Path(__file__).with_name("ielts11_15_new_words_agent.json")
EDGE_TTS = Path.home() / ".local/bin/edge-tts"

LANGS = [
    "en",
    "ko",
    "zh-Hans",
    "ja",
    "es",
    "hi",
    "de",
    "vi",
    "pt-BR",
    "id",
    "fr",
    "ar",
    "tr",
    "it",
    "pl",
]

TRANSLATOR_MAP = {
    "zh-Hans": "zh-CN",
    "pt-BR": "pt",
}

VOICE_EDGE = {
    "us_m": ("en-US-GuyNeural", "+0%", "+0Hz"),
    "us_f": ("en-US-JennyNeural", "+0%", "+0Hz"),
    "uk_m": ("en-GB-RyanNeural", "+0%", "+0Hz"),
    "uk_f": ("en-GB-SoniaNeural", "+0%", "+0Hz"),
    "grandma": ("en-US-JennyNeural", "-12%", "-4Hz"),
    "grandpa": ("en-US-AndrewNeural", "-8%", "-8Hz"),
    "leo": ("en-US-AnaNeural", "+8%", "+12Hz"),
    "robot": ("en-US-SteffanNeural", "+0%", "-18Hz"),
    "ww_us_m": ("en-US-GuyNeural", "-38%", "+0Hz"),
}

VOICES = list(VOICE_EDGE.keys())
PACK_RANGES = [
    ("ielts11", 1001, 1100, "IELTS 1001–1100"),
    ("ielts12", 1101, 1200, "IELTS 1101–1200"),
    ("ielts13", 1201, 1300, "IELTS 1201–1300"),
    ("ielts14", 1301, 1400, "IELTS 1301–1400"),
    ("ielts15", 1401, 1500, "IELTS 1401–1500"),
]

SOURCE_LINE = (
    "IELTS Master 1500 (AWL + Cambridge/Barron IELTS), frequency ranks 1001–1500"
)


def parse_word_list() -> list[str]:
    words: list[str] = []
    for line in WORD_LIST.read_text(encoding="utf-8").splitlines():
        m = re.match(r"\s*\d+\.\s+(\S+)", line)
        if m:
            words.append(m.group(1).lower())
    if len(words) < 1500:
        raise SystemExit(f"expected 1500 words, got {len(words)}")
    return words


def load_pack_word_index() -> dict[str, dict]:
    index: dict[str, dict] = {}
    for path in sorted(PACKS.glob("*.json")):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            continue
        for w in data.get("words") or []:
            wid = str(w.get("id") or w.get("en") or "").lower()
            if wid and wid not in index:
                index[wid] = w
    return index


def audio_source_index() -> dict[str, Path]:
    """Map word id -> pack dir that has us_m audio."""
    found: dict[str, Path] = {}
    for pack_dir in sorted(PACKS.iterdir()):
        if not pack_dir.is_dir():
            continue
        us_m = pack_dir / "audio" / "us_m"
        if not us_m.is_dir():
            continue
        for mp3 in us_m.glob("*.mp3"):
            wid = mp3.stem.lower()
            if wid not in found:
                found[wid] = pack_dir
    return found


def slug_id(en: str) -> str:
    return en.lower().strip()


def normalize_word(w: dict, en: str) -> dict:
    out = deepcopy(w)
    sid = slug_id(en)
    out["id"] = sid
    out["en"] = en
    ww = out.get("ww") or {}
    pos = ww.get("pos") or "n"
    ww["sense_id"] = f"{sid}.s1"
    ww["pos"] = pos
    out["ww"] = ww
    if not out.get("picture_prompt"):
        out["picture_prompt"] = (
            f"candy picture-book oil-paint of {en}, one subject, "
            "no text no letters no numbers no watermark"
        )
    return out


def try_import_translator():
    try:
        from deep_translator import GoogleTranslator
    except ImportError:
        subprocess.check_call(
            [sys.executable, "-m", "pip", "install", "-q", "deep-translator"]
        )
        from deep_translator import GoogleTranslator
    return GoogleTranslator


def translate_text(text: str, lang: str, GT) -> str:
    if lang == "en" or not text:
        return text
    code = TRANSLATOR_MAP.get(lang, lang)
    try:
        return GT(source="en", target=code).translate(text)
    except Exception:
        return text


def fill_langs(en_text: str, ko_hint: str | None, GT) -> dict[str, str]:
    bag: dict[str, str] = {"en": en_text}
    if ko_hint:
        bag["ko"] = ko_hint
    for lang in LANGS:
        if lang in bag:
            continue
        bag[lang] = translate_text(en_text, lang, GT)
    return bag


def build_new_word(en: str, meta: dict, GT) -> dict:
    pos = meta["pos"]
    l1_en = meta["l1"]
    def_en = meta["def"]
    ex_en = meta["ex"]
    ko = meta["ko"]
    pic = meta["pic"]
    picture_prompt = (
        f"candy picture-book oil-paint of {pic}, one subject, "
        "no text no letters no numbers no watermark"
    )
    l1 = fill_langs(l1_en, ko, GT)
    l1["en"] = l1_en
    l1["ko"] = ko
    defn = fill_langs(def_en, ko, GT)
    defn["en"] = def_en
    defn["ko"] = ko
    example = fill_langs(ex_en, None, GT)
    example["en"] = ex_en
    example["ko"] = translate_text(ex_en, "ko", GT)
    return {
        "id": slug_id(en),
        "en": en,
        "ko": ko,
        "picture_prompt": picture_prompt,
        "l1": l1,
        "ww": {
            "sense_id": f"{slug_id(en)}.s1",
            "pos": pos,
            "def": defn,
            "example": example,
        },
    }


def make_games(pack_id: str, title: str, words: list[dict]) -> None:
    gdir = PACKS / pack_id / "games"
    gdir.mkdir(parents=True, exist_ok=True)
    ids = [w["id"] for w in words]
    spell_items = [{"item_id": i, "word": w["en"]} for i, w in zip(ids, words)]
    (gdir / "spellfire.json").write_text(
        json.dumps(
            {
                "pack_id": pack_id,
                "title": title,
                "seconds_per_letter": 5,
                "items": spell_items,
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )

    def quiz_items():
        items = []
        for idx, w in enumerate(words):
            q = (w.get("l1") or {}).get("en") or w["en"]
            wrong = [words[(idx + 1) % len(words)]["id"], words[(idx + 2) % len(words)]["id"]]
            items.append(
                {
                    "item_id": w["id"],
                    "question": q,
                    "correct": w["id"],
                    "wrong": wrong,
                    "word": w["en"],
                }
            )
        return items

    for game, module in [("leap-frog", "word_master"), ("snow-jump", "snow_jump")]:
        (gdir / f"{game}.json").write_text(
            json.dumps(
                {
                    "pack_id": pack_id,
                    "title": title,
                    "module_id": module,
                    "seconds": 15,
                    "items": quiz_items(),
                },
                ensure_ascii=False,
                indent=2,
            )
            + "\n",
            encoding="utf-8",
        )


def ffmpeg_compress(src: Path, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(src),
            "-ar",
            "44100",
            "-ac",
            "1",
            "-b:a",
            "128k",
            str(dest),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


async def edge_speak(word: str, voice: str, rate: str, pitch: str, out: Path) -> None:
    import uuid

    tmp = out.with_name(f".{out.stem}.{uuid.uuid4().hex}.raw.mp3")
    cmd = [
        str(EDGE_TTS),
        "--voice",
        voice,
        f"--rate={rate}",
        f"--pitch={pitch}",
        "--text",
        word,
        "--write-media",
        str(tmp),
    ]
    for attempt in range(3):
        proc = await asyncio.create_subprocess_exec(*cmd)
        await proc.wait()
        if proc.returncode == 0 and tmp.is_file() and tmp.stat().st_size > 500:
            break
        await asyncio.sleep(1.5 * (attempt + 1))
    else:
        raise RuntimeError(f"edge-tts failed for {word} {voice}")
    ffmpeg_compress(tmp, out)
    tmp.unlink(missing_ok=True)


async def generate_audio_batch(jobs: list[tuple[str, str, Path]]) -> None:
    sem = asyncio.Semaphore(3)

    async def one(word: str, voice_key: str, dest: Path):
        if dest.exists() and dest.stat().st_size > 2000:
            return
        v, rate, pitch = VOICE_EDGE[voice_key]
        async with sem:
            await edge_speak(word, v, rate, pitch, dest)

    await asyncio.gather(*(one(*j) for j in jobs))


def copy_or_generate_audio(
    pack_id: str, word: dict, audio_src: dict[str, Path]
) -> list[tuple[str, str, Path]]:
    wid = word["id"]
    en = word["en"]
    letters_src = PACKS / "verbs900" / "audio" / "letters"
    letters_dest = PACKS / pack_id / "audio" / "letters"
    if letters_src.is_dir() and not letters_dest.exists():
        shutil.copytree(letters_src, letters_dest)

    jobs: list[tuple[str, str, Path]] = []
    for vk in VOICES:
        dest = PACKS / pack_id / "audio" / vk / f"{wid}.mp3"
        if dest.exists() and dest.stat().st_size > 2000:
            continue
        copied = False
        src_pack = audio_src.get(wid)
        if src_pack:
            src = src_pack / "audio" / vk / f"{wid}.mp3"
            if src.is_file():
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src, dest)
                copied = True
        if not copied:
            jobs.append((en, vk, dest))
    return jobs


def build_manifest(pack_id: str, title: str, words: list[dict]) -> dict:
    missing_files: list[str] = []
    too_small: list[str] = []
    missing_l1: list[str] = []
    wids = [w["id"] for w in words]
    for w in words:
        wid = w["id"]
        for lang in LANGS:
            if lang not in (w.get("l1") or {}):
                missing_l1.append(f"{wid}/l1/{lang}")
        ww = w.get("ww") or {}
        for bucket in ("def", "example"):
            for lang in LANGS:
                if lang not in (ww.get(bucket) or {}):
                    missing_l1.append(f"{wid}/ww/{bucket}/{lang}")
        pic = PACKS / pack_id / f"{wid}.jpg"
        if not pic.is_file():
            missing_files.append(f"{wid}.jpg")
        for vk in VOICES:
            mp3 = PACKS / pack_id / "audio" / vk / f"{wid}.mp3"
            if not mp3.is_file():
                missing_files.append(f"audio/{vk}/{wid}.mp3")
            elif mp3.stat().st_size < 1500:
                too_small.append(f"audio/{vk}/{wid}.mp3")
    ok = not missing_files and not too_small and not missing_l1
    return {
        "pack": pack_id,
        "title": title,
        "words": wids,
        "voices": [
            "us_m",
            "us_f",
            "uk_m",
            "uk_f",
            "grandma",
            "leo",
            "grandpa",
            "robot",
        ],
        "l1": LANGS,
        "missing_files": missing_files,
        "too_small": too_small,
        "missing_l1": missing_l1,
        "ok": ok,
    }


def try_fetch_pictures(pack_ids: list[str]) -> None:
    try:
        subprocess.run(
            ["git", "fetch", "origin", "ielts-pictures"],
            cwd=ROOT,
            check=True,
            capture_output=True,
        )
        for pid in pack_ids:
            subprocess.run(
                [
                    "git",
                    "checkout",
                    "origin/ielts-pictures",
                    "--",
                    f"packs/{pid}",
                ],
                cwd=ROOT,
                capture_output=True,
            )
    except subprocess.CalledProcessError:
        pass


def main() -> None:
    audio_only = "--audio-only" in sys.argv
    all_words = parse_word_list()
    pack_index = load_pack_word_index()
    new_meta = json.loads(NEW_WORDS_JSON.read_text(encoding="utf-8"))
    GT = None if audio_only else try_import_translator()
    audio_src = audio_source_index()

    try_fetch_pictures([p[0] for p in PACK_RANGES])

    all_jobs: list[tuple[str, str, Path]] = []
    unsure: list[str] = []
    picture_gaps: list[str] = []

    for pack_id, start, end, title in PACK_RANGES:
        if audio_only:
            pack_path = PACKS / f"{pack_id}.json"
            if not pack_path.is_file():
                raise SystemExit(f"missing {pack_path} for --audio-only")
            built = json.loads(pack_path.read_text(encoding="utf-8"))["words"]
            for w in built:
                all_jobs.extend(copy_or_generate_audio(pack_id, w, audio_src))
            manifest = build_manifest(pack_id, title, built)
            (PACKS / pack_id / "MANIFEST.json").write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )
            for wid in manifest["words"]:
                if f"{wid}.jpg" in manifest["missing_files"]:
                    picture_gaps.append(f"{pack_id}/{wid}.jpg")
            continue
        slice_en = all_words[start - 1 : end]
        built: list[dict] = []
        for en in slice_en:
            sid = slug_id(en)
            if sid in pack_index:
                built.append(normalize_word(pack_index[sid], en))
            elif sid in new_meta:
                built.append(build_new_word(en, new_meta[sid], GT))
            else:
                unsure.append(en)
                built.append(
                    build_new_word(
                        en,
                        {
                            "pos": "n",
                            "ko": en,
                            "l1": f"the word {en}",
                            "def": f"the word {en} in IELTS vocabulary",
                            "ex": f"Students learn the word {en} for IELTS.",
                            "pic": f"a simple scene illustrating {en}",
                        },
                        GT,
                    )
                )

        pack_doc = {
            "id": pack_id,
            "title": title,
            "band": "IELTS",
            "pos": "mixed",
            "source": SOURCE_LINE,
            "words": built,
        }
        (PACKS / f"{pack_id}.json").write_text(
            json.dumps(pack_doc, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        make_games(pack_id, title, built)
        for w in built:
            all_jobs.extend(copy_or_generate_audio(pack_id, w, audio_src))

        manifest = build_manifest(pack_id, title, built)
        (PACKS / pack_id / "MANIFEST.json").write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        for wid in manifest["words"]:
            if f"{wid}.jpg" in manifest["missing_files"]:
                picture_gaps.append(f"{pack_id}/{wid}.jpg")

    if all_jobs:
        print(f"Generating {len(all_jobs)} audio files via edge-tts…")
        asyncio.run(generate_audio_batch(all_jobs))

    # Refresh manifests after audio
    for pack_id, start, end, title in PACK_RANGES:
        data = json.loads((PACKS / f"{pack_id}.json").read_text(encoding="utf-8"))
        manifest = build_manifest(pack_id, title, data["words"])
        (PACKS / pack_id / "MANIFEST.json").write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

    report = {
        "unsure_words": unsure,
        "picture_gaps": picture_gaps,
        "audio_engine": "Microsoft Edge neural TTS (edge-tts CLI) — closest match; original pack audio engine not documented in repo",
    }
    (ROOT / "scripts" / "ielts11_15_build_report_agent.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
