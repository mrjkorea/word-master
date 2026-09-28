> ⚠️ 28 Sep 2026: the tunnel URLs in this file are historical. Word Master no longer
> posts scores to any trycloudflare host. The one score book is MRJ Classroom Metrics
> via `mrj-scores.js`. See `SCORE_SHEET.md`.

# CURSOR_RECEIPT — pack standing + all-100 test

Date: 2026-09-28 17:27 KST

## Command
Interactive Cursor session implementing `CURSOR_JOB_PACK_STANDING.md`.

Model: Grok 4.7

## Files
`js/i18n.js` was not modified.

| File | Change |
|---|---|
| `index.html` | +19 / −4 (479 lines). Standing strip, All 100 button, miss list, `?v=20260928-standing` |
| `css/app.css` | +101 (1032 lines). Navy/gold standing seats, final button, red misses |
| `js/app.js` | +234 / −17 (2924 lines). Standing, wide final test, sheet fields, sync line |
| `js/progress-config.js` | +1 / −1 (1 line). `WM_PROGRESS_URL` tunnel |
| `js/progress.js` | unchanged (66 lines). Cache query bumped in `index.html` only. `slimProgress()` lives in `js/app.js` |
| `scripts/pack_standing_test.js` | new, 79 lines |
| `scripts/final_test_wide_test.js` | new, 88 lines |
| `scripts/load_app_for_test.js` | new, 87 lines |

## 5.1 meet lock

```
$ node scripts/meet_word_lock_test.js
MEET_LOCK_OK verbs-round stays inside Meet the Words
```

## 5.2 pack standing

```
$ node scripts/pack_standing_test.js
PACK_STANDING_OK 30/100 next w31-w40 seats 30 done + 10 doing
```

## 5.3 all-100 wide test

```
$ node scripts/final_test_wide_test.js
FINAL_WIDE_OK all 100 vs lock 10, pass at 80%
```

## 5.4 door

```
$ curl -s -X POST https://script.google.com/macros/s/AKfycbwIBPzcmJYkJP-uURVzyt8_7iF3mzGBTCp-omNA2sF3Hk5oGusHfOlPyhEnDl2XAJu82w/exec \
    -H 'Content-Type: application/json' \
    -d '{"action":"save","name":"Cursor Check","pin":"1234","pack_id":"nouns100","study_size":10,"progress_json":"{\"v\":1,\"sets\":{\"nouns100\":{\"intro\":{}},\"final\":{\"pct\":42}}}"}'
{"ok": true, "found": false, "saved": true, "tab": "Sheet1"}

$ curl -s -X POST https://script.google.com/macros/s/AKfycbwIBPzcmJYkJP-uURVzyt8_7iF3mzGBTCp-omNA2sF3Hk5oGusHfOlPyhEnDl2XAJu82w/exec \
    -H 'Content-Type: application/json' \
    -d '{"action":"load","name":"Cursor Check","pin":"1234"}'
{"ok": true, "found": true, "name": "Cursor Check", "tab": "Sheet1", "progress_json": "{\"v\":1,\"sets\":{\"nouns100\":{\"intro\":{}},\"final\":{\"pct\":42}}}"}
```

## 5.5 git

Recorded after the commit and push below.

## 5.6 live Pages

Recorded after GitHub Pages serves the new files.
