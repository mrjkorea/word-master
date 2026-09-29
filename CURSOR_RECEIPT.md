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
