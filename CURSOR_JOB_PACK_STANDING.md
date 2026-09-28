# Cursor job — Word Master: pack standing + all-100 pack test (Jay 28 Sep 2026)

Workspace: `/Users/andreclouthier/.hermes/projects/mrj-word-master-web` (this folder). Repo `github.com/mrjkorea/word-master`, branch `main`. Live: https://mrjkorea.github.io/word-master/

Jay's request, verbatim intent:
> Students study 10 of a 100-word pack. Next login they must see where they stand in that pack, and what words come next. There is nothing in the interface that shows that. Check their login, see what they did last time, show a record of where they stand in those 100 words. Also add an option to try all 100 words in a pack as a final test. Their information must live in the master sheet online so any computer knows where they stand.

## Hard constraints

- Static GitHub Pages site. No server we host, no new backend service.
- English UI only for new strings. Do NOT touch `js/i18n.js` (15-locale file, fragile inserts). New buttons reuse existing `data-i18n` keys where possible; new text stays plain English hardcoded.
- Keep every existing element id and the existing `MeetLock` laws:
  - `Meet the Words` lock stays the only legal word list for that round.
  - `playWords(set)` / `set.meetLock` must keep being the round list for Learn / Dictation / Write / Games / normal Test.
  - Do not let pack-wide or next-batch words slide into a locked round.
- `state.studySize` stays `5 | 10 | 15 | 20`.
- Only pack-wide behavior when Jay taps the new **All 100 test** button.
- Sheet save payload must stay under ~49,000 chars in `progress_json`.
- No framework, no build step, ES5-style plain JS to match the file.

## 1. Pack standing strip on the pack screen (`index.html` screen-set, `js/app.js`)

Add to `index.html` inside `<section class="screen" id="screen-set">`, after `<p class="pct-line" id="set-pct"></p>`:

```html
<div class="standing" id="pack-standing">
  <div class="standing-head">
    <strong id="stand-count"></strong>
    <em id="stand-left"></em>
  </div>
  <div class="standing-bar"><i id="stand-fill"></i></div>
  <p class="standing-next" id="stand-next"></p>
  <div class="standing-seats" id="stand-seats"></div>
</div>
```

Add matching CSS in `css/app.css` (navy/gold theme, chip style like `.chunk`; 100 seats wrap in rows; seat states `.done` green, `.doing` gold ring, `.todo` muted; ~14px squares with the word number). Must look good on a phone at 360px wide.

`js/app.js` — new function `renderPackStanding(set)`, called from `renderSetHome()` right after `renderStudySize(set)`:

- `doing` = `(set.meetLock && set.meetLock.length) ? set.meetLock : []`
- `doneIds` = every word where `intro[id]` is truthy AND `(winsA[id]||0) >= 2` AND `(winsB[id]||0) >= 2` AND `(winsC[id]||0) >= 2`.
- `#stand-count` = `"30 / 100 words finished"` (numbers from the pack size).
- `#stand-left` = `"70 to go"`.
- `#stand-fill` = width % = done/total.
- `#stand-next` = the next batch: run `window.MeetLock.batchIds(set.words, set.intro||{}, set.winsA||{}, set.winsB||{}, set.winsC||{}, studySize(), 2)`, map through `window.MeetLock.wordsForLock`, and print the English words joined by ` · `. If empty (pack finished), print `"This pack is finished. Try the All 100 test."` Also label it, e.g. `"Next 10: time · year · ..."`.
- `#stand-seats`: one `<span class="seat ...">` per word in `set.words`, text = index+1, `title` = word.en, `class` done / doing / todo. Tapping a seat speaks that word (`unlockSpeech(); speak(w.en);`).

## 2. All-100 pack test (`index.html`, `js/app.js`)

Add one button inside `#screen-set` after the `#btn-games-set` chunk:

```html
<button type="button" class="chunk final" id="btn-final-test">
  <strong id="final-label">All 100 test</strong>
  <em id="final-meta"></em>
</button>
```

`#final-label` = `"All <N> test"` where N = `set.words.length` (so a 100-word pack reads "All 100 test"). `#final-meta` = `"Every word in this pack · pass 80%"`.

Behavior — **no `meetLock` cap, uses the whole pack**:

1. Click → confirm screen is not needed; set `state.finalTest = true`, `persist()`, then `startEasy(true)`.
2. Change `startEasy(wide)` so:
   - `quiz.items = shuffle((wide ? (set.words || []) : playWords(set)).slice())`
   - `quiz.kind = "final"` when `wide`, else `"easy"`. Do the same for `startHard(wide)` → `quiz.kind = "hard"`, and keep the existing `state.testKind` set to `"easy"` / `"hard"` so nothing else breaks.
   - `quiz.wide = !!wide`
3. `renderQuiz()`:
   - `#test-kind` shows `"ALL"` when `quiz.kind === "final"`, else EASY/HARD as today.
   - `#test-ko` shows plain `"All N test"` for final.
   - progress `#test-prog` stays `i / N`.
   - Easy-style multiple choice for the final test (same as easy), using the pack's own words as distractors.
   - The pass line: normal tests keep `PASS_PCT`. Final test uses `PASS_PCT` = 80.
4. `finishQuiz()` — when `quiz.wide`: write results onto the pack, then `persist()`:
   - `set.final = set.final || {}`; store `{ score, total, pct, passed, at: Date.now() }` in `set.final` (NOT a per-word map — keep it small).
   - Store `set.finalWords` as `{ [wordId]: 1 }` only for words the kid MISSED (so the sheet stays tiny), and `set.finalPassedWords` as a plain array of the ids they got right. Actually keep it simpler: store only `set.final = {score,total,pct,passed,at}` plus `set.finalMiss = [ids...]` (array, capped at 200).
   - Do NOT change the per-word `winsA/B/C` from the final test. It is a check-up, not a learning round.
   - Show the score card: `"42 / 100 — 42%"`, then either `"Passed ✅ Pack finished."` (>=80) or `"Needs work — keep learning the words in red."` (<80), plus the missed English words as a list, plus the existing `#btn-test-home`.
5. `#btn-final-test` label must also show the last result when one exists: `#final-meta` = `"Last: 42 / 100 · 42% · 28 Sep"` (KST date, `padStart` month/day), else the default text.
6. Back-compat: if `quiz.wide` is falsy, behavior must be byte-identical to today (same word list, same kinds, same pass rule).

## 3. Online sheet (any computer knows where the kid stands)

`js/progress.js` / `js/progress-config.js`:
- `js/progress-config.js` → set
  ```js
  window.WM_PROGRESS_URL = "https://opponent-turned-typing-cingular.trycloudflare.com/";
  ```
- In `slimProgress()` add `final: state.sets[k].final || null` and `finalMiss` per pack (array, capped 200). Keep total under 49,000 chars — if `JSON.stringify` exceeds 45,000, drop `finalMiss` for the least-recently-played packs until it fits.

`js/app.js`:
- Keep `progressPayload()` / `pullSheet()` as-is in shape (the door at that URL already returns `{ok, found, progress_json}` and writes `Sheet1` of the `MRJ Word Master Progress (web)` sheet, verified 28 Sep 2026).
- After the kid signs in (`#btn-signin-save` handler at ~line 2393) `pullSheet()` already runs — after it resolves, call `renderHome()` and `renderSetHome()` if the set screen is open, so a kid on a **new computer** sees the standing strip and the last final score immediately.
- Show the last final result in the standing strip too: `#stand-left` becomes `"70 to go"` plus, when `set.final` exists, append `" · last all-100: 42%"`.
- Add a tiny sign-in status line on the set screen: reuse `#stand-next` or add `<p class="standing-sync" id="stand-sync"></p>`; set it to `"Saved to Mr. Jay's sheet · <updated KST>"` on a successful save reply, and `"Not saved yet"` if the door is unreachable. The door is a Cloudflare quick tunnel and may be down; the app must keep working offline on `localStorage` and never block the kid.

## 4. Bump cache queries

In `index.html`, bump `?v=` for `css/app.css`, `js/progress-config.js`, `js/progress.js`, `js/app.js` to `20260928-standing`.

## 5. Verify (must actually run, paste output into CURSOR_RECEIPT.md)

1. `node scripts/meet_word_lock_test.js` → passes (lock laws intact).
2. New test `scripts/pack_standing_test.js`: build a 100-word fake pack, mark 30 done, assert `renderPackStanding` data: count 30/100, next batch = words 31–40 (by MeetLock order), seats have 30 `done` + 10 `doing`.
3. New test `scripts/final_test_wide_test.js`: assert `startEasy(true)` queues all 100 words while normal `startEasy()` still queues only the lock batch; assert 80% pass rule.
4. Door end-to-end (real network, must return real JSON):
   ```bash
   curl -s -X POST https://opponent-turned-typing-cingular.trycloudflare.com/ \
     -H 'Content-Type: application/json' \
     -d '{"action":"save","name":"Cursor Check","pin":"1234","pack_id":"nouns100","study_size":10,"progress_json":"{\"v\":1,\"sets\":{\"nouns100\":{\"intro\":{}},\"final\":{\"pct\":42}}}"}'
   curl -s -X POST https://opponent-turned-typing-cingular.trycloudflare.com/ \
     -H 'Content-Type: application/json' \
     -d '{"action":"load","name":"Cursor Check","pin":"1234"}'
   ```
   Second call must return `found: true` and the saved `progress_json`. Delete the probe row afterwards with a direct Sheets API call is NOT required.
5. `git add -A && git commit -m "Word Master: pack standing + all-100 pack test + online standing" && git push origin main`
6. After push: `curl -s https://mrjkorea.github.io/word-master/js/progress-config.js` must show the new `WM_PROGRESS_URL`, and `curl -s https://mrjkorea.github.io/word-master/js/app.js | grep -c stand-count` must be ≥ 1.

## Receipt

Write `CURSOR_RECEIPT.md` in this folder: exact `cursor-agent` command, model used, files changed with line counts, and the raw output of every check in section 5. No receipt = not done.
