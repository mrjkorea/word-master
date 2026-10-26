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
