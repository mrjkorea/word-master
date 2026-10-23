#!/usr/bin/env python3
"""Re-translate the 83 agent-authored IELTS words after rate-limit failures."""
import json
import re
import sys
import time
from pathlib import Path

from deep_translator import GoogleTranslator
from deep_translator.exceptions import TooManyRequests

ROOT = Path(__file__).resolve().parents[1]
PACKS = ROOT / "packs"
NEW = json.loads(
    (Path(__file__).parent / "ielts11_15_new_words_agent.json").read_text(
        encoding="utf-8"
    )
)
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
MAP = {"zh-Hans": "zh-CN", "pt-BR": "pt"}
PACKS_IDS = ["ielts11", "ielts12", "ielts13", "ielts14", "ielts15"]


def tr(text: str, lang: str, cache: dict) -> str:
    if lang == "en" or not text:
        return text
    key = (lang, text)
    if key in cache:
        return cache[key]
    code = MAP.get(lang, lang)
    for attempt in range(8):
        try:
            out = GoogleTranslator(source="en", target=code).translate(text)
            cache[key] = out
            time.sleep(0.35)
            return out
        except TooManyRequests:
            time.sleep(2 ** attempt)
    cache[key] = text
    return text


def fill(en: str, ko: str, cache: dict) -> dict[str, str]:
    bag = {"en": en, "ko": ko}
    for lang in LANGS:
        if lang in bag:
            continue
        bag[lang] = tr(en, lang, cache)
    return bag


def main() -> None:
    cache: dict = {}
    for pid in PACKS_IDS:
        path = PACKS / f"{pid}.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        changed = 0
        for w in data["words"]:
            wid = w["id"]
            if wid not in NEW:
                continue
            meta = NEW[wid]
            w["l1"] = fill(meta["l1"], meta["ko"], cache)
            w["ww"]["def"] = fill(meta["def"], meta["ko"], cache)
            ex = fill(meta["ex"], None, cache)
            ex["ko"] = tr(meta["ex"], "ko", cache)
            w["ww"]["example"] = ex
            changed += 1
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{pid}: updated {changed} words", flush=True)
        # refresh games l1 questions
        gdir = PACKS / pid / "games"
        for name in ("leap-frog.json", "snow-jump.json"):
            gp = gdir / name
            if not gp.is_file():
                continue
            g = json.loads(gp.read_text(encoding="utf-8"))
            by_id = {w["id"]: w for w in data["words"]}
            for item in g.get("items", []):
                wid = item.get("item_id")
                if wid in by_id:
                    item["question"] = (by_id[wid].get("l1") or {}).get("en") or by_id[wid]["en"]
            gp.write_text(json.dumps(g, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
