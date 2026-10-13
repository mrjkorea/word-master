# mrj-signin: include `word-master@scores` in teacher snapshots

Word Master stores score history in a separate AppProgress row when cloud saves are sharded:

- Program: `word-master@scores`
- JSON: `{ "v": 1, "scoreRows": [ ... ] }`

`teacher_student_snapshot` should merge this row the same way it merges `word-master@pack/<packId>` shards:

1. Load `word-master` shell; if `hasScoresShard` is true, also load `word-master@scores`.
2. If the scores row is missing, set `incomplete: true` and add `"scores"` to `missingShards` (alongside any missing pack ids).
3. Merge `scoreRows` into the returned `progress_json` for the teacher UI.

Until mrj-signin does this, class progress may show pack word steps but not full score history for sharded students.
