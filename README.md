# MRJ Word Master (web test)

Static phone-test build. Animals pack only (10 words).
Not the Play Store app. Not all 64 packs.

## Public mode (news packs)

`?packsrc=https://mrjkorea.github.io/news-words/packs/<file>.json` opens with **no sign-in and no assignment**,
and saves nothing on the device (`js/public-pack.js` swaps in an in-memory `localStorage`; the
sign-in door `mrj-auth-boot.js` is not loaded; embedded games get the same in-memory storage).
Every other packsrc (TOEIC, Day 2, …) still signs in as before. Test: `node scripts/public_pack_test.js`.

## Culture Class packs

Monthly Culture Class word lists use ids `culture_m01` … `culture_m12` (August: `culture_m08`).
Deep link example:

`https://mrjkorea.github.io/word-master/?packsrc=https://mrjkorea.github.io/word-master/packs/culture_m08.json`

## Teacher unlock and temporary unlock-all

Classroom path locks are temporarily bypassed for all students via `WM_TEMP_UNLOCK_ALL` in
`js/temp-unlock-all.js` (loaded from `index.html`). Set it to `false` or remove that script when
you want real locks; sections then open if progress passes **or** the teacher saved an unlock in
the student progress JSON (Teacher chip → **Start from here** panel).

