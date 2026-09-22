# CURSOR_RECEIPT — Word Master GitHub Pages test
Date: 2026-09-09 19:05 KST

## Command
POST https://api.cursor.com/v1/agents
model: grok-4.6 (effort=high, fast=false)
name: WM GitHub Pages web test
agent: bc-f456169f-c817-4116-828e-b1316f97c680
run: run-6d049b01-ad58-4f90-9db2-dca370461e0e FINISHED 44403ms

Local prep: WM_APK_PACKS=demo10 bash scripts/build_www.sh → ~/.hermes/projects/mrj-word-master-web (26MB, git 05445b9)

## Result
Cloud Grok 4.6: GitHub-not-connected + Mac path not visible on Cloud VM.
No github.io URL. Did not invent one. Did not Cloudflare.

## Blocker
This Mac: `gh` not logged in. No GitHub token in Keychain. SSH github Permission denied.
Same wall as Memory Match Pages 09SEP (github-pages-vite.md).

---

## 2026-09-22 — Jay 22SEP HARD: bilingual meaning() (no translated explanation sentences)

**Command:** Fix `meaning(w)` in `js/app.js` only; append receipt; no pack JSON edits.

**Model:** composer-2.5

**Date:** 2026-09-22

**Files changed:**
- `js/app.js` — `meaning(w)` and `DEMO_FALLBACK` ko glosses (native words, not definition sentences)

**Proof (`meaning()` no longer concatenates with ` · `):**
```
$ rg -n 'function meaning' -A 20 js/app.js | rg ' · ' || echo 'PROOF: no " · " inside meaning() block'
PROOF: no " · " inside meaning() block (grep exit clean)
```

**Behavior:**
- `en`: `w.ww.def.en` (via `wwEn`) else `w.l1.en`; lemma only if no explanation.
- Other locales: `w.l1[loc]` or `w.ko` for `ko` only; no English fallback; no ` · `.

---

## 2026-09-22 — Learn choice cursor (disabled not-allowed)

**Model:** composer-2.5

**Files:** `css/app.css`, `index.html` (stylesheet `?v=20260922-cursor`), `CURSOR_RECEIPT.md`

**Fix:** `button:disabled:not(.choice)` keeps not-allowed on chrome only; `.choice` / `:disabled` / `.good` / `.bad` use `cursor: default` and `opacity: 1`.
