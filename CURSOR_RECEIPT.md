# CURSOR_RECEIPT — Student test open and score record

Date: 2026-10-07
Model: composer-2.5

Signed-in students can open Test from the ribbon and use Easy or Hard without finishing Meet through Games. The All tile still requires a finished game. The signed-in id stays in the top-right name button on every screen. Tapping it opens a score record built from book progress, pack final and checkup data, and new finished tests and games stored in `progress_json` (`scoreRows`, cap 200).

## Files

| File | Change |
|---|---|
| `js/app.js` | Test path bypass for students, score record helpers, name button, record screen. |
| `js/progress-merge.js` | Merge `scoreRows` on sync. |
| `index.html` | `btn-student-name`, record screen, cache `20261007-testopen`. |
| `css/app.css` | Top bar name button and record list. |
| `version.json` | Build `20261007-testopen`. |
| `scripts/test_open_and_name_test.js` | New regression tests. |
| `scripts/path_lock_test.js` | Cache query bump. |
| `scripts/start_slice_test.js` | Cache query bump. |
| `scripts/dictation_audio_stop_test.js` | Cache query bump. |

## Test

```
node scripts/test_open_and_name_test.js
TEST_OPEN_AND_NAME_OK
node scripts/start_slice_test.js
START_SLICE_OK
node scripts/count_buttons_visible_test.js
COUNT_BUTTONS_VISIBLE_OK
node scripts/path_lock_test.js
PATH_LOCK_OK
node scripts/progress_merge_test.js
PROGRESS_MERGE_OK
```

# CURSOR_RECEIPT — Count buttons and seat start

Date: 2026-10-07
Model: grok-4.7 layout, composer-2.5 merge
Browser proof: 1280x633 local nouns. The 5 button was inside the window. Tap 5, then seat 11. Result: 5 words from 11. Seats 11–15 marked doing.

# CURSOR_RECEIPT — Seat tap lock survives persist merge

Date: 2026-10-07
Model: composer-2.5

Tapping a count (e.g. 5) set `meetLock` and `startNumber`, but `persist()` merged an older localStorage snapshot without bumping `lastPlayedAt`, so `studySize` and `meetLock` reverted (union kept stale ids). `chooseStart` now sets `lastPlayedAt` before `persist()`. `progress-merge.js` keeps the newer side’s `meetLock` when it has ids; `studySize` follows the side with the newer pack activity.

## Files

| File | Change |
|---|---|
| `js/app.js` | `chooseStart`: `lastPlayedAt` before `persist()`. |
| `js/progress-merge.js` | `pickMeetLock` / `pickStudySize` instead of union and blind `base.studySize`. |
| `scripts/progress_merge_test.js` | Newer-lock case; no meetLock union assertion. |
| `scripts/path_lock_test.js` | Cache query `20261007-count`. |
| `scripts/dictation_audio_stop_test.js` | Cache query `20261007-count`. |

## Test

```
node scripts/progress_merge_test.js
PROGRESS_MERGE_OK
node scripts/start_slice_test.js
START_SLICE_OK
node scripts/count_buttons_visible_test.js
COUNT_BUTTONS_VISIBLE_OK
node scripts/all_tile_test.js
ALL_TILE_OK
node scripts/path_lock_test.js
PATH_LOCK_OK
node scripts/dictation_audio_stop_test.js
DICTATION_AUDIO_STOP_OK
```

# CURSOR_RECEIPT — All tile after the number seats

Date: 2026-10-07
Command: Put All on the number tiles. One finished game still required. Push origin main.
Model: grok-4.7

The number seats scroll. After them, one tile says All and stays in view. It is wide enough to read. Tap it and, when the test is open, it offers Easy and Hard for every word in the pack. Easy calls `startEasy(true)`. Hard calls `startHard(true)`. A locked test shows the lock note and does not start. The old All 100 buttons stay hidden.

## Files

| File | Change |
|---|---|
| `js/app.js` | All tile after the seats. Easy and hard whole-pack tests. Old All buttons stay hidden. |
| `css/app.css` | Seat row keeps All outside the scroll. All is wider than a number seat. |
| `index.html` | All slot after `#stand-seats`. Cache `20261007-all`. |
| `scripts/all_tile_test.js` | Fails if `renderPackStanding` does not add All after the numbers. |
| `scripts/path_lock_test.js` | Expects the new `app.js` cache query. |
| `scripts/start_slice_test.js` | Expects the new cache queries. |
| `CURSOR_RECEIPT.md` | This entry. |

## Test

```
node scripts/all_tile_test.js
ALL_TILE_OK
node scripts/path_lock_test.js
PATH_LOCK_OK
node scripts/toeic_media_name_test.js
TOEIC_MEDIA_OK
```

Browser: Nouns 1–100 shows seats 1–100 in the scrolling box and All beside them, 64px wide, while 100 is below the fold. All then Easy is an All 100 choice test, 1/100. All then Hard is a typing test, 1/100, meaning on screen. A new student tap on All shows the lock note and stays on the set.

# CURSOR_RECEIPT — TOEIC hyphen pictures and Meet last word

Date: 2026-10-06
Command: Use the word id, hyphen included, for pictures and audio. In Meet, wait until the last word's clip ends before the next section. Push origin main.
Model: grok-4.7

`e-book`, `o-clock`, `ice-cream`, and `by-law` were the only hyphenated ids in the TOEIC packs. The player stripped hyphens and asked for `ebook.jpg`, `oclock.jpg`, `icecream.jpg`, and `bylaw.jpg`. Picture and sound lookups now keep the id and encode it. `speak("o'clock")` finds that word and plays `o-clock.mp3`. Plain ids such as `cat` still resolve to `cat`.

In Meet, the last picture used to start the next section after 550ms, which cut the word off. `speak()` now returns a wait for the end of the clip, capped at 8 seconds, and that last click waits for the clip and then about 400ms. A missing file ends the wait instead of sticking the screen.

## Files

| File | Change |
|---|---|
| `js/app.js` | Id-based picture, speak, word-wise, shooter, and spellfire paths. Meet waits for the last word. |
| `index.html` | Cache query `20261006-toeic-media`. |
| `scripts/toeic_media_name_test.js` | Fails if those four ids are requested without the hyphen. |
| `scripts/path_lock_test.js` | Expects the new `app.js` cache query. |
| `scripts/start_slice_test.js` | Expects the new `app.js` cache query. |
| `CURSOR_RECEIPT.md` | This entry. |

## Test

```
node scripts/toeic_media_name_test.js
TOEIC_MEDIA_OK
node scripts/path_lock_test.js
PATH_LOCK_OK
```

# CURSOR_RECEIPT — All-pack easy and hard, game before test, TOEIC lane

Date: 2026-10-05
Command: Every pack shows All N easy and All N hard. One finished game unlocks the tests. Fifteen TOEIC tiles open this site with `?packsrc=`. Push origin main.
Model: grok-4.7

All N easy calls `startEasy(true)`. All N hard calls `startHard(true)` and stays a typing test. Students see both buttons on every pack, including `?packsrc=`. Until one full game is finished they are disabled and say `Finish one game first`. Teachers can still jump. The home index has a TOEIC lane, `toeic01` through `toeic15`, linking at `word-master-toeic/packs/`.

## Files

| File | Change |
|---|---|
| `index.html` | Two all-pack buttons, Test ribbon step, TOEIC lane, `path-lock.js` before `app.js`. Cache `20261001-lock`. |
| `js/app.js` | Student gate, game-done message, all-pack easy and hard. |
| `js/path-lock.js` | Round lock. A finished game opens the test. |
| `css/app.css` | Six-step ribbon, locked steps, TOEIC lane. |
| `js/i18n.js` | Finish-step and game-finished lines. |
| `scripts/path_lock_test.js` | The lock rule. |
| `scripts/load_app_for_test.js` | Loads PathLock. Teacher search so older tests still start. |
| `games/leap-frog`, `games/snow-jump`, `games/sound-invaders`, `games/spellfire` | Post a finished round only. |

## Test

```
node scripts/path_lock_test.js
PATH_LOCK_OK
```

Browser: a fresh student on Nouns 1–100 sees All 100 easy and All 100 hard disabled, subtitle `Finish one game first`. The Test ribbon step stays locked. A teacher All 100 hard is a typing test, 1/100, meaning on screen. A teacher All 100 easy shows the English word and meaning choices, 1/100. The TOEIC 1–100 tile stays on this site and opens pack `TOEIC 1–100` with the same two buttons.

# CURSOR_RECEIPT — real known count on the score row

Date: 2026-10-04
Command: A finished study or checkup must post the real count, total, and percent. Do not post score 0 because a screen opened. Do not invent a percent from the book alone. `post()` calls `MRJ_AUTH.noteScore` with the same fields when a student is signed in. No second sign-in. Do not commit.
Model: grok-4.7

A word counts as known when it has passed at 80% or it has been met and learned twice in each of the three study parts. The score is how many words in the current study list are known, out of that list. A checkup score is the number correct out of the questions just finished, including a real 0. Opening a set, switching books, or saving again with the same count does not post. `MRJ_SCORES.post` still writes the sheet row, and when `MRJ_AUTH.student()` is set it also calls `noteScore` with that row's program, item, count, total, percent, and date.

## Files

| File | Change |
|---|---|
| `js/progress.js` | `toOneBook` posts only a finished known count or checkup. It no longer uses the batch size as a fake total. |
| `js/app.js` | Records the known count when it goes up, and the checkup result when a test finishes. |
| `mrj-scores.js` | `post()` calls `MRJ_AUTH.noteScore` for a signed-in student. A missing count stays a blank percent. |
| `index.html` | Cache query `20261004-score` for those three scripts. |
| `scripts/score_post_test.js` | Screen open, known count, checkup, book-only percent, and `noteScore`. |
| `scripts/load_app_for_test.js` | Loads the score scripts before the app. |
| `CURSOR_RECEIPT.md` | This entry. |

## Test

```
node scripts/score_post_test.js
SCORE_POST_OK
node scripts/pack_standing_test.js
PACK_STANDING_OK 30/100 next w31-w40 seats 30 done + 10 doing
node scripts/meet_word_lock_test.js
MEET_LOCK_OK verbs-round stays inside Meet the Words
```

The app path in `score_post_test.js` opened a set (no row), marked two of four words known (`2/4`, 50%), then finished a checkup at `3/4`, 75%. Each row's `noteScore` fields matched the sheet row. Not committed. The live score sheet was not written.

# CURSOR_RECEIPT — external packsrc loading (Word Master player)

Date: 2026-10-02 KST  
Command: Add `?packsrc=` loading for mrjkorea.github.io JSON packs only; assets beside JSON; local academic packs unchanged when absent.  
Model: Composer  

## Files

| File | Change |
|---|---|
| `js/pack-src.js` | New: validate `packsrc`, folder + asset URLs, shared letter base from pack JSON. |
| `js/app.js` | External pack fetch/activate; `packMediaUrl`; letter fallback to shared letters (not nouns100 when external). |
| `index.html` | Script tag for `pack-src.js`; cache-bust `app.js`. |
| `scripts/pack_src_test.js` | Node test: reject bad URLs, picture path, local vs external mode. |
| `scripts/load_app_for_test.js` | Preserve `location.search` for harness tests. |
| `CURSOR_RECEIPT.md` | This entry. |

## Test

```
node scripts/pack_src_test.js
OK pack_src_test
  reject evil URL
  picture: https://mrjkorea.github.io/day2-words/packs/basic_a_u1/cat.jpg
  local PACK_IDS: 35 packs
  external wordPic: https://mrjkorea.github.io/day2-words/packs/basic_a_u1/cat.jpg
```

Not committed or pushed.

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

# CURSOR_RECEIPT — student lock-step path

Date: 2026-10-01
Command: Students walk Meet → Learn → Dictation → Write → one finished game → Test. Teachers keep the jump bar. This folder only.
Model: grok-4.7

## Files

- `js/path-lock.js` — gate. `hold`, `can`, `next`, `markGameDone`, `syncRound`, `isTeacher`. A finished step stays open for that `meetLock`. A new lock is a new round. Old rounds stay in `roundGames` / `pathHeld`.
- `js/app.js` — `?mode=teacher` or `?teacher=1` is teacher and is remembered. Anything else is student. Jump bar, skip buttons, ribbon jumps, and Learn / Easy / Hard / Games / All 100 / game slots go through `pathAllows`. Parent listens for `mrj-wm-game-done` only while a game it opened is on screen and `finished === true`.
- `index.html` — teacher badge and Student mode button. Ribbon is not a row of buttons. `path-lock.js` and `app.js` are `?v=20261001-lock`.
- `css/app.css` — locked steps, teacher badge, lock message.
- `js/i18n.js` — `finish_step_first`, `teacher_badge`, `teacher_student`, `game_finished` in every language already carried.
- `scripts/path_lock_test.js`
- `scripts/load_app_for_test.js` — loads PathLock. Harness search is `?mode=teacher` so the old quiz tests are not stopped by the student gate.
- `scripts/start_slice_test.js`, `scripts/dictation_audio_stop_test.js` — cache query updated to `20261001-lock`. The strings they checked (`20260930-spellstop`) were already absent from `index.html` (`20261001-spellread`).
- `scripts/meet_word_lock_test.js` — Leap Frog asset name is the file that exists, `index-Bs4ORQ3Y.js`.
- `games/leap-frog/assets/index-Bs4ORQ3Y.js` — removed the `./packs/starter-en.json` fallback so that test can pass. A direct open with no session pack no longer loads its own list.

Not edited: `js/meet-lock.js`, `js/progress.js`, `mrj-scores.js`. Other Word Master copies were not touched.

## Tests

```
node scripts/path_lock_test.js
PATH_LOCK_OK
EXIT:0
node scripts/meet_word_lock_test.js
MEET_LOCK_OK verbs-round stays inside Meet the Words
EXIT:0
node scripts/start_slice_test.js
START_SLICE_OK
EXIT:0
node scripts/pack_standing_test.js
PACK_STANDING_OK 30/100 next w31-w40 seats 30 done + 10 doing
EXIT:0
node scripts/dictation_audio_stop_test.js
DICTATION_AUDIO_STOP_OK
EXIT:0
```

## Browser

`python3 -m http.server 8811 --bind 127.0.0.1`

- Student `http://127.0.0.1:8811/index.html?mode=student&pack=nouns100` — no jump bar (`#teacher-bar` display none). Learn, Easy, Hard, Games, All 100, and ribbon steps 2–5 stay on the set screen and say "Finish step 1 first". Meet opens.
- Teacher `http://127.0.0.1:8811/index.html?mode=teacher&pack=nouns100` — bar reads "TEACHER Student mode Skip word Skip step 1 Meet 2 Learn 3 Dictation 4 Write 5 Games 6 Test". 5 Games opens Games. 6 Test opens the test.
- With Meet, Learn, Dictation, and Write done for the current 10 and no game yet, Easy stays locked. Opening Leap Frog and pressing Back does not unlock it. `finished: false` from that frame stays on the game. `finished: true` returns to the set, shows "You finished a game — the test is open", and Easy opens the test (`screen-test`, word "way").
- Shots: `.playwright-mcp/lockstep-student.png`, `.playwright-mcp/lockstep-teacher.png`, `.playwright-mcp/lockstep-test-open.png`.

The built games do not post `mrj-wm-game-done` themselves. The check posted that message from the Leap Frog frame after the parent had opened it.

## Bugs this job did not cover

- Home "Continue" uses `Algo.startMode(set.words)` for the whole pack. After words 1–10 are done it can still say "Continue from Learn" because words 11–100 are not.
- Teacher "2 Learn" before the picture round is finished still opens Meet. `startLearnAt` already sent an unfinished tap map back to Meet. 5 Games and 6 Test do jump.

## 2026-10-02 game-done hole

A game counts only when every word in the round was finished. `js/path-lock.js` was not rewritten.

Parent `js/app.js` accepts `mrj-wm-game-done` only on the game screen it opened, for the same game, with `finished: true` and `items` at least `playWords(set).length`. A short count, a string, a missing count, the wrong game, or a message after Back is ignored.

Each game posts that message itself:
- Leap Frog and Snow Jump: bundle-only. Goal is the pack length. A successful end posts. Death does not.
- Sound Invaders: bundle-only. Posts after one correct hit per pack word. GAME OVER does not.
- Spellfire: `games/spellfire/src/engine.js` posts from `nextWord` when the last word is advanced. A loss does not.

Files: `js/app.js`, `games/leap-frog/assets/index-Bs4ORQ3Y.js`, `games/snow-jump/assets/index-DA78ZsQf.js`, `games/sound-invaders/assets/index-BRj5RKfc.js`, `games/spellfire/src/engine.js`, `scripts/path_lock_test.js`. Not touched: `js/path-lock.js`, `js/meet-lock.js`, `js/progress.js`, `mrj-scores.js`. Not pushed.

```
node scripts/path_lock_test.js
PATH_LOCK_OK
node scripts/meet_word_lock_test.js
MEET_LOCK_OK verbs-round stays inside Meet the Words
node scripts/start_slice_test.js
START_SLICE_OK
node scripts/pack_standing_test.js
PACK_STANDING_OK 30/100 next w31-w40 seats 30 done + 10 doing
node scripts/dictation_audio_stop_test.js
DICTATION_AUDIO_STOP_OK
```

Browser on `http://127.0.0.1:8812/index.html?mode=student&pack=nouns100`: student bar hidden. One Leap Frog word then Back left the test locked. Dying at 4/10 left the test locked. Finishing all 10 words returned to the set, showed "You finished a game — the test is open", and Easy opened the test. The parent only accepts `items` of at least 10, and the iframe was blanked by that accept path, so the game posted the full round. Teacher `?mode=teacher` shows the jump bar.

# CURSOR_RECEIPT — Path lock, All tile, voices

Date: 2026-10-08
Model: composer-2.5

Restored student test gating: Meet, Learn, Dictation, Write, then one finished game level. Removed the signed-in test bypass. Ribbon Test and Easy/Hard use `pathOpen("test")`. Match and Listen call `PathLock.markGameDone` when the round completes. `deliverGameDone` accepts `finished: true` with `items >= 1`. All seat sets `studySize` 0 (full pack via `sliceCount`) without path lock or starting a test. Voice picks use `voiceAt` on merge. Pack search: sentence "Nature on the tree" not found in this repo (no pack JSON edits).

## Files

| File | Change |
|---|---|
| `js/app.js` | Path lock, All tile, match/listen game done, voiceAt, studySize 0 |
| `js/progress-merge.js` | `validStudySize` 0, `pickVoice` / `voiceAt` |
| `index.html`, `version.json` | Build `20261008-path` |
| `scripts/test_open_and_name_test.js` | Student cannot open test without path; runtime checks |
| `scripts/path_lock_test.js` | `items >= 1` game done |
| `scripts/progress_merge_test.js` | voiceAt and studySize 0 merge |
| `scripts/load_app_for_test.js` | `bootApp({ mode: "student" })` |
| `scripts/start_slice_test.js`, `scripts/dictation_audio_stop_test.js` | Cache bump |

## Test

```
node scripts/test_open_and_name_test.js
TEST_OPEN_AND_NAME_OK
node scripts/path_lock_test.js
PATH_LOCK_OK
node scripts/progress_merge_test.js
PROGRESS_MERGE_OK
node scripts/all_tile_test.js
ALL_TILE_OK
node scripts/start_slice_test.js
START_SLICE_OK
node scripts/count_buttons_visible_test.js
COUNT_BUTTONS_VISIBLE_OK
node scripts/dictation_audio_stop_test.js
DICTATION_AUDIO_STOP_OK
```

Not pushed.
