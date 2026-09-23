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

---

## 2026-09-22 — Desktop hardware keyboard for Learn B/C and Hard test

**Model:** composer-2.5

**Files:** `js/app.js`, `css/app.css`, `index.html` (`?v=20260922-kb`), `CURSOR_RECEIPT.md`

**Change:** `(hover: hover) and (pointer: fine)` and not `(pointer: coarse)` sets `body.kb-desk` and hides `.az-pad` via CSS; Check/Delete and typed line stay. Physical keys use `e.code` KeyA–KeyZ → `onAz`, Backspace → `delAz`, Enter → check — only on Learn B/C or Hard test, not in form fields or modifier shortcuts. Phones keep the pad; BT keyboard may still type. No `export/linux/mrj-word-factory/js/app.js` in this repo.

**Proof:** `node --check js/app.js` exit 0.

## 2026-09-23 — Meet lock (Verbs 101–200 leak)

**Model:** grok-4.7 (cursor-agent started the lock; finish after timeout)
**Command:** `node scripts/meet_word_lock_test.js`
**Result:** `MEET_LOCK_OK verbs-round stays inside Meet the Words` exit 0
**Files:** `js/meet-lock.js`, `js/app.js`, `index.html`, `games/spellfire/src/engine.js`, leap-frog and snow-jump assets, `scripts/meet_word_lock_test.js`
**Law:** Dictation, Write, Test, Listen, and games use only the Meet the Words list. No slide. No animals/nouns fallback.
