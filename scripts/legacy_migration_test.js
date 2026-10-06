"use strict";

const store = {};

function studentStorageKey(id) {
  return String(id || "").trim().toLowerCase().replace(/\s+/g, " ");
}

const LS_STATE_LEGACY = "mrj.word_factory.state";
const LS_STATE_BACKUP = "mrj.word_factory.state.shared_backup";
const LS_LEGACY_CLAIMED = "mrj.word_factory.legacy_claimed_by";

function legacyHasPlayableSets(parsed) {
  if (!parsed || !parsed.sets || typeof parsed.sets !== "object") return false;
  return Object.keys(parsed.sets).length > 0;
}

function legacyOwnerStorageKey(parsed) {
  if (!parsed || typeof parsed !== "object") return "";
  const acct = studentStorageKey(parsed.accountName || "");
  if (acct) return acct;
  const sid = String(parsed.studentId || "").trim();
  const sidKey = studentStorageKey(sid);
  const disp = studentStorageKey(parsed.displayName || "");
  if (sidKey && !/^stu[_-]/i.test(sid)) return sidKey;
  if (disp && !/^stu[_-]/i.test(parsed.displayName || "")) return disp;
  return "";
}

function consumeLegacyIfEligible(id) {
  const key = studentStorageKey(id);
  if (!key) return null;
  const legacy = store[LS_STATE_LEGACY] || "";
  if (!legacy) return null;
  let parsed = null;
  try {
    parsed = JSON.parse(legacy);
  } catch (e) {
    return null;
  }
  if (!legacyHasPlayableSets(parsed)) return null;
  const owner = legacyOwnerStorageKey(parsed);
  if (owner) {
    if (owner !== key) return null;
  } else {
    const claimedKey = studentStorageKey(store[LS_LEGACY_CLAIMED] || "");
    if (claimedKey && claimedKey !== key) return null;
    store[LS_LEGACY_CLAIMED] = id;
  }
  store[LS_STATE_BACKUP] = legacy;
  delete store[LS_STATE_LEGACY];
  return parsed;
}

const legacy = {
  studentId: "stu_abc123",
  sets: { set_nouns100: { packId: "nouns100", winsA: { w1: 1 } } },
};
store[LS_STATE_LEGACY] = JSON.stringify(legacy);

if (legacyOwnerStorageKey(legacy)) {
  console.error("expected anonymous legacy");
  process.exit(1);
}

const first = consumeLegacyIfEligible("minji");
if (!first || store[LS_STATE_LEGACY]) {
  console.error("first claim failed");
  process.exit(1);
}
if (store[LS_LEGACY_CLAIMED] !== "minji") {
  console.error("claim marker wrong");
  process.exit(1);
}

store[LS_STATE_LEGACY] = JSON.stringify(legacy);
const second = consumeLegacyIfEligible("otherkid");
if (second) {
  console.error("second student should not consume");
  process.exit(1);
}

const owned = {
  studentId: "minji",
  displayName: "minji",
  sets: { set_nouns100: { packId: "nouns100" } },
};
store[LS_STATE_LEGACY] = JSON.stringify(owned);
const wrong = consumeLegacyIfEligible("otherkid");
if (wrong) {
  console.error("owned legacy leaked to wrong student");
  process.exit(1);
}
const right = consumeLegacyIfEligible("minji");
if (!right) {
  console.error("owner should receive legacy");
  process.exit(1);
}

console.log("LEGACY_MIGRATION_OK");
process.exit(0);
