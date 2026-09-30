# CURSOR_RECEIPT — shared MRJ sign-in

Date: 2026-09-29 17:20 KST

Word Master uses the shared door at `mrj-signin`. It does not keep a second name, PIN, or skip login. Scores use the id from `mrj-auth-ready` (`event.detail.id`, also `MRJ_AUTH.student()`). An empty id does not start practice and does not post a score. Not pushed.

## Files

| File | Change |
|---|---|
| `index.html` | Shared door tags before the app scripts. Removed the name screen, sign-in card, PIN field, and Skip button. |
| `js/app.js` | Waits for `mrj-auth-ready`. That id is the only student id. Empty id stays on the boot screen. Sign out returns to the shared door. |
| `js/progress.js` | Score and progress posts use `MRJ_AUTH.student()` only. A missing id or a typed name is not saved. |
| `js/progress-config.js` | Comment now points at the shared door. |
| `CURSOR_RECEIPT.md` | This list. |

# CURSOR_RECEIPT — Space Shooter in the game selection

Date: 2026-09-29
Command: Put Space Shooter (Sound Invaders) in every Word Master game selection. Session pack `?pack=session`, local build at `games/sound-invaders/index.html`, picker button `data-game="soundinvaders"`.
Model: grok-4.7-medium

## Files

- `index.html` — Space Shooter button, `data-game="soundinvaders"`.
- `js/app.js` — `soundinvaders` opens `games/sound-invaders/index.html` with the current set's English words and `../../` mp3 paths.
- `games/sound-invaders/` — built Sound Invaders.
- Receipt only. Not part of the push. MeetLock, i18n.js, scores, and auth were not edited.

## Verify

```
test -f each games/sound-invaders/index.html
OK mrj-word-master-web
OK mrj-news-words
OK day2-words
OK mrj-word-factory

rg -n 'data-game="soundinvaders"'
mrj-word-master-web/index.html:404
mrj-news-words/index.html:316
day2-words/play.html:519
mrj-word-factory/index.html:356

rg -n 'soundinvaders:'
mrj-word-master-web/js/app.js:2555
mrj-news-words/js/app.js:2076
day2-words/js/app.js:2257
mrj-word-factory/js/app.js:2165

node normalizeSessionItem({correct:"cat", wrong:["dog"]})
{"item_id":"cat","prompt":"cat","correct":"cat","wrong":["dog"],"audio":null}
```

## Push SHAs

- mrjkorea/word-master `a73ffb2c8abd80a43b7896f13cab9415d77c2413`
- mrjkorea/news-words `0b1b3e3dcfb2f561f05d17c9425b4f7123928695`
- mrjkorea/day2-words `ff566d52859c67cd7c488689e98cad76cc14e41b`

# CURSOR_RECEIPT — hear English, rocks in the chosen language

Date: 2026-09-29
Command: Space Shooter hears the English mp3. Rocks show the Word Master language. `npm run build` in sound-invaders (`base: ./`). Copy `dist/` into `games/sound-invaders/`.
Model: grok-4.7-medium

## Files

- `js/app.js` — `rockLabel` next to `meaning`. `shooterPack` sets `correct`/`prompt` to `w.en`, `label` to the chosen-language word, `wrong` to other rock labels. Empty labels dropped. Audio stays the English mp3.
- `index.html` — `js/app.js?v=20260929-l1shoot`.
- `games/sound-invaders/` — rebuilt game. Rock words are a canvas sprite, not helvetiker.
- Receipt only. Not part of the push. `js/i18n.js` and meet-lock were not edited.

## Checks

- Korean `rockLabel` is `고양이`. English `rockLabel` is `cat`.
- Built `games/sound-invaders/assets/index-BRj5RKfc.js` has no `helvetiker` and no `TextGeometry`. It uses `CanvasTexture`.

## Push SHAs

- mrjkorea/word-master `f05bce0946f79947e6b8200eeb0fae4c749d4913`
- mrjkorea/news-words `f94e026d56e74ea9733c132d380b5469c43c10d1`
- mrjkorea/day2-words `c851e83e60fbf12eccd82fec13cc664025b4ca03`
- mrj-word-factory: not pushed

# CURSOR_RECEIPT — start any word, green at 80%

Date: 2026-09-30
Command: Students pick any start word and any batch size (5, 10, 15, 20). That slice is Meet, Learn, Dictation, Write, Games, and the normal test. 80% or higher turns those word ids green and a later fail does not clear them. Saved on the existing progress_json as startNumber and testPassed.
Model: grok-4.7

## Files

- `js/start-slice.js` — sliceFrom, isGreen, markPassed.
- `js/app.js` — chooseStart, seat taps, pass marking, slim progress.
- `css/app.css` — 32px seats, scroll, green plus gold ring.
- `index.html` — hint, slice line, script order, cache `?v=20260930-start`.
- `scripts/start_slice_test.js` — slice, 80/79/70, chooseStart, progress round-trip.
- `scripts/load_app_for_test.js` — load StartSlice before app.js.

## Tests

```
node scripts/start_slice_test.js
START_SLICE_OK
node scripts/pack_standing_test.js
PACK_STANDING_OK 30/100 next w31-w40 seats 30 done + 10 doing
node scripts/meet_word_lock_test.js
MEET_LOCK_OK verbs-round stays inside Meet the Words
```

# CURSOR_RECEIPT — stop dictation spelling audio

Date: 2026-09-30
Command: Fix the dictation spelling-audio leak. Cancel the letter clip when the next word starts. Do not revert start-word / green-seat work.
Model: grok-4.7

## Files

- `js/spell-stop.js` — bump, token, stale, bind, settle.
- `js/app.js` — speak, speakWW, speakLetter, teachSpelling, advanceLearn.
- `index.html` — spell-stop before app.js, `?v=20260930-spellstop`.
- `scripts/dictation_audio_stop_test.js`
- `scripts/load_app_for_test.js` — load SpellStop before app.js.
- `scripts/start_slice_test.js` — app.js cache query is now `20260930-spellstop`.

## Tests

```
node scripts/dictation_audio_stop_test.js
DICTATION_AUDIO_STOP_OK
node scripts/start_slice_test.js
START_SLICE_OK
node scripts/pack_standing_test.js
PACK_STANDING_OK 30/100 next w31-w40 seats 30 done + 10 doing
node scripts/meet_word_lock_test.js
MEET_LOCK_OK verbs-round stays inside Meet the Words
```
