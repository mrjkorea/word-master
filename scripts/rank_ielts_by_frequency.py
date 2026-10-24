#!/usr/bin/env python3
"""
Rank all 1500 IELTS pack words by English corpus frequency (wordfreq zipf).

Reads packs/ielts01.json … ielts15.json (exact word set; no adds/drops).
Writes data/ielts_frequency_order.tsv and refreshes data/ielts_1500.txt.

Tie-break: higher zipf on wordlist "best", then alphabetical on en.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PACKS = ROOT / "packs"
DATA = ROOT / "data"

try:
    from wordfreq import zipf_frequency
except ImportError:
    print("Install wordfreq: pip install wordfreq", file=sys.stderr)
    sys.exit(1)


def load_ielts_words() -> list[dict]:
    rows: list[dict] = []
    seen: set[str] = set()
    for n in range(1, 16):
        pack_id = f"ielts{n:02d}"
        path = PACKS / f"{pack_id}.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        for w in data.get("words") or []:
            wid = str(w.get("id") or "").strip()
            en = str(w.get("en") or "").strip().lower()
            if not wid or not en:
                raise SystemExit(f"bad entry in {pack_id}: {w!r}")
            if wid in seen:
                raise SystemExit(f"duplicate id {wid}")
            seen.add(wid)
            rows.append(
                {
                    "id": wid,
                    "en": en,
                    "word": w,
                    "old_pack": pack_id,
                }
            )
    if len(rows) != 1500:
        raise SystemExit(f"expected 1500 words, got {len(rows)}")
    return rows


def freq_key(en: str) -> tuple[float, float, str]:
    z_large = zipf_frequency(en, "en", wordlist="large")
    z_best = zipf_frequency(en, "en", wordlist="best")
    return (-z_large, -z_best, en)


def main() -> None:
    rows = load_ielts_words()
    rows.sort(key=lambda r: freq_key(r["en"]))

    tsv_path = DATA / "ielts_frequency_order.tsv"
    lines = ["rank\ten\tid\tzipf\told_pack\n"]
    list_lines = [
        "IELTS Master Word List - 1500 Words Ordered by English Corpus Frequency\n",
        "Primary ordering: wordfreq zipf_frequency (en, wordlist=large), tie-break best then A–Z\n",
        "================================================================================\n",
        "\n",
    ]
    for i, r in enumerate(rows, start=1):
        z = zipf_frequency(r["en"], "en", wordlist="large")
        lines.append(f"{i}\t{r['en']}\t{r['id']}\t{z:.4f}\t{r['old_pack']}\n")
        list_lines.append(f"{i:4d}. {r['en']}\n")

    tsv_path.write_text("".join(lines), encoding="utf-8")

    txt_path = DATA / "ielts_1500.txt"
    txt_path.write_text("".join(list_lines), encoding="utf-8")

    print(f"Wrote {tsv_path} ({len(rows)} rows)")
    print(f"Wrote {txt_path}")
    print("Top 5:", ", ".join(r["en"] for r in rows[:5]))
    print("Bottom 5:", ", ".join(r["en"] for r in rows[-5:]))


if __name__ == "__main__":
    main()
