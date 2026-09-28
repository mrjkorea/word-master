# Word Master GitHub Pages — Creativity

Mac has **no** GitHub login. Publisher = Fujimoto + account **mrjkorea**.

Full steps: `~/.hermes/profiles/research/GITHUB_PAGES.md`  
How-to: `~/.hermes/projects/_github-pages-six-games/HOW_TO_GITHUB_PAGES.md`

Slug: `word-master` → `https://mrjkorea.github.io/word-master/` after Fujimoto publishes.

## 🔴 One score book (28 Sep 2026 Jay)
Every app writes scores to **MRJ Classroom Metrics**
`1bpgekxlektvwpsef1PmIkxPiDuHrkVXFaAy-OmwqL5c` (tab `ClassroomMetrics`).
Load `mrj-scores.js` and post with `MRJ_SCORES.post(...)`. Side sheets and
trycloudflare tunnels are dead. Read `SCORE_SHEET.md`.

## ⚠️ Pages build blows up on repo size (28 Sep 2026)
- Live page serves from the **repo root of `main`** (`build_type=legacy`).
- Pages rebuilds the WHOLE repo every push. This repo carries **1.0 GB of pack
  audio** (`packs/*/audio/`, ~36,450 files), so the build fails or is cancelled
  and the live page can go stale right after a push.
- Fix before the next content push: move `packs/*/audio/` out of the Pages repo
  (GitHub Release asset or the Drive pack factory) and reference it by URL.
  Tracked in `plans/word-master-pages-build-break.md`.
- Quick check after a push:
  ```bash
  curl -sS https://mrjkorea.github.io/word-master/js/progress-config.js
  ```
