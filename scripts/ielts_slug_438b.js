"use strict";
/** Word Master pack id slug: lowercase, drop hyphens (so-called → socalled). */
function ieltsSlug(en) {
  return String(en || "")
    .toLowerCase()
    .replace(/-/g, "");
}
module.exports = { ieltsSlug };
