# Word Master GitHub Pages build is broken by repo size (28 Sep 2026)

## Symptom
`https://mrjkorea.github.io/word-master/js/progress-config.js` still served the OLD
content after a push to `main`. GitHub Actions: `pages build and deployment` →
`failure` (step: **Upload artifact**). Earlier run: `cancelled`.

## Cause
- Pages `build_type=legacy`, serving the **repo root of `main`**.
- `packs/*/audio/` = **1.0 GB**, ~36,450 files. Whole repo ≈ 1.9 GB.
- Pages re-uploads the entire repo as the site artifact on every push → the upload
  fails or times out. Nothing to do with the score-sheet change.

## Fix (before the next content push)
1. Move `packs/*/audio/` out of the Pages repo. Options:
   - one GitHub Release asset per pack (audio-<pack>.zip) + a small downloader, or
   - keep audio in the Drive pack factory and load by public URL.
2. Keep the Pages repo to code + JSON + small assets (< ~200 MB total).
3. Re-run Pages deploy, then verify:
   ```bash
   curl -sS https://mrjkorea.github.io/word-master/js/progress-config.js
   curl -sS https://mrjkorea.github.io/word-master/mrj-scores.js | head -3
   ```
4. Reload on a phone and confirm one finished item lands a row in
   `MRJ Classroom Metrics` → tab `ClassroomMetrics`.

## Do not
- Do not add more audio to this repo.
- Do not point any app at a trycloudflare tunnel for scores.
