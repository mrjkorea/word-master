#!/usr/bin/env python3
"""Offline translations for the 83 new IELTS words (Argos Translate)."""
import json
from pathlib import Path

import argostranslate.package
import argostranslate.translate

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
ARGOS = {
    "ko": "ko",
    "zh-Hans": "zh",
    "ja": "ja",
    "es": "es",
    "hi": "hi",
    "de": "de",
    "vi": "vi",
    "pt-BR": "pt",
    "id": "id",
    "fr": "fr",
    "ar": "ar",
    "tr": "tr",
    "it": "it",
    "pl": "pl",
}
PACK_IDS = ["ielts11", "ielts12", "ielts13", "ielts14", "ielts15"]

argostranslate.package.update_package_index()
installed = argostranslate.translate.get_installed_languages()
by_code = {lang.code: lang for lang in installed}


def tr(text: str, lang: str) -> str:
    if lang == "en" or not text:
        return text
    code = ARGOS.get(lang)
    if not code:
        return text
    src = by_code.get("en")
    tgt = by_code.get(code)
    if not src or not tgt:
        return text
    return src.get_translation(tgt).translate(text)


def fill(en: str, ko: str) -> dict[str, str]:
    bag = {"en": en, "ko": ko}
    for lang in LANGS:
        if lang in bag:
            continue
        bag[lang] = tr(en, lang)
    return bag


def main() -> None:
    for pid in PACK_IDS:
        path = PACKS / f"{pid}.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        n = 0
        for w in data["words"]:
            wid = w["id"]
            if wid not in NEW:
                continue
            meta = NEW[wid]
            w["l1"] = fill(meta["l1"], meta["ko"])
            w["ww"]["def"] = fill(meta["def"], meta["ko"])
            ex = fill(meta["ex"], tr(meta["ex"], "ko"))
            ex["ko"] = tr(meta["ex"], "ko")
            w["ww"]["example"] = ex
            n += 1
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        gdir = PACKS / pid / "games"
        by_id = {w["id"]: w for w in data["words"]}
        for name in ("leap-frog.json", "snow-jump.json"):
            gp = gdir / name
            g = json.loads(gp.read_text(encoding="utf-8"))
            for item in g.get("items", []):
                wid = item.get("item_id")
                if wid in by_id:
                    item["question"] = (by_id[wid].get("l1") or {}).get("en") or by_id[wid]["en"]
            gp.write_text(json.dumps(g, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{pid}: {n} words translated")


if __name__ == "__main__":
    main()
