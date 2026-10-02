/**
 * External pack URLs (?packsrc=) for Word Master.
 * Only https://mrjkorea.github.io/*.json — assets resolve beside the JSON file.
 */
(function (root, factory) {
  var api = factory();
  if (root) root.PackSrc = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this), function () {
  var PREFIX = "https://mrjkorea.github.io/";

  function isAllowedPackSrc(raw) {
    var s = String(raw || "").trim();
    if (!s) return false;
    if (s.indexOf(PREFIX) !== 0) return false;
    if (s.slice(-5).toLowerCase() !== ".json") return false;
    return true;
  }

  function packFolderFromSrc(src) {
    var s = String(src || "").trim();
    var slash = s.lastIndexOf("/");
    if (slash < 0) return "";
    return s.slice(0, slash);
  }

  function mediaFolderFromSrc(src) {
    var s = String(src || "").trim();
    var parent = packFolderFromSrc(s);
    var slash = s.lastIndexOf("/");
    var file = slash >= 0 ? s.slice(slash + 1) : s;
    var lower = file.toLowerCase();
    if (lower === "pack.json") return parent;
    if (lower.slice(-5) === ".json") {
      return joinUrl(parent, file.slice(0, -5));
    }
    return parent;
  }

  function pictureExtFromSrc(src) {
    return String(src || "").indexOf("/news-words/") >= 0 ? "png" : "jpg";
  }

  function defaultSharedLetters(src) {
    if (String(src || "").indexOf("/news-words/") >= 0) {
      return "https://mrjkorea.github.io/news-words/packs/_shared/audio/letters";
    }
    return "";
  }

  function packIdFromSrc(src) {
    var s = String(src || "").trim();
    var slash = s.lastIndexOf("/");
    var file = slash >= 0 ? s.slice(slash + 1) : s;
    if (file.toLowerCase().endsWith(".json")) file = file.slice(0, -5);
    if (file === "pack") {
      var folder = packFolderFromSrc(s);
      var p = folder.lastIndexOf("/");
      return p >= 0 ? folder.slice(p + 1) : folder;
    }
    return file || "external";
  }

  function joinUrl(base, rel) {
    var b = String(base || "").replace(/\/+$/, "");
    var r = String(rel || "").replace(/^\/+/, "");
    if (!b) return r;
    if (!r) return b;
    return b + "/" + r;
  }

  function packAssetUrl(folder, filename) {
    return joinUrl(folder, filename);
  }

  function siteOriginFromSrc(src) {
    try {
      var u = new URL(String(src || ""));
      return u.origin;
    } catch (e) {
      return "https://mrjkorea.github.io";
    }
  }

  function sharedLettersField(data) {
    if (!data || typeof data !== "object") return "";
    var keys = ["shared_letters", "letters_audio", "letter_audio", "letters"];
    for (var i = 0; i < keys.length; i++) {
      var v = data[keys[i]];
      if (typeof v === "string" && v.trim()) return v.trim();
    }
    return "";
  }

  function resolveSharedLettersBase(packSrc, data) {
    var field = sharedLettersField(data);
    if (!field) return "";
    if (field.indexOf(PREFIX) === 0) return field.replace(/\/+$/, "");
    var origin = siteOriginFromSrc(packSrc);
    if (field.charAt(0) === "/") return (origin + field).replace(/\/+$/, "");
    return joinUrl(packFolderFromSrc(packSrc), field).replace(/\/+$/, "");
  }

  function readPackSrcFromLocation(loc) {
    try {
      var search = loc && loc.search ? String(loc.search) : "";
      if (!search) return "";
      var params = new URLSearchParams(search);
      return params.get("packsrc") || "";
    } catch (e) {
      return "";
    }
  }

  return {
    PREFIX: PREFIX,
    isAllowedPackSrc: isAllowedPackSrc,
    packFolderFromSrc: packFolderFromSrc,
    mediaFolderFromSrc: mediaFolderFromSrc,
    pictureExtFromSrc: pictureExtFromSrc,
    defaultSharedLetters: defaultSharedLetters,
    packIdFromSrc: packIdFromSrc,
    packAssetUrl: packAssetUrl,
    joinUrl: joinUrl,
    sharedLettersField: sharedLettersField,
    resolveSharedLettersBase: resolveSharedLettersBase,
    readPackSrcFromLocation: readPackSrcFromLocation,
  };
});
