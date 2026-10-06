#!/usr/bin/env node
"use strict";

const https = require("https");

const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwtJTUO3gbcMrlAwsn1feWxyp7Rw2cxpfe1bOT9v2rxmQHa2Tlc6pFNWAjU6ZAdlD6kFQ/exec";

function get(url) {
  return new Promise(function (resolve, reject) {
    https
      .get(url, function (res) {
        let body = "";
        res.on("data", function (c) { body += c; });
        res.on("end", function () { resolve({ status: res.statusCode, body }); });
      })
      .on("error", reject);
  });
}

function postJson(payload) {
  return new Promise(function (resolve, reject) {
    const req = https.request(
      ENDPOINT,
      { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" } },
      function (res) {
        if (res.statusCode === 302 && res.headers.location) {
          get(res.headers.location).then(resolve).catch(reject);
          return;
        }
        let body = "";
        res.on("data", function (c) { body += c; });
        res.on("end", function () { resolve({ status: res.statusCode, body }); });
      }
    );
    req.on("error", reject);
    req.write(JSON.stringify(payload));
    req.end();
  });
}

async function main() {
  const health = await get(ENDPOINT);
  console.log("GET", health.body.trim());

  const load = await postJson({
    action: "load_pack",
    id: "zz_test_mrjmetrics",
    token: "bad",
    program: "word-master",
  });
  console.log("load_pack word-master", load.body.trim());

  const big = "x".repeat(50000);
  const save = await postJson({
    action: "save_pack",
    id: "zz_test_mrjmetrics",
    token: "bad",
    program: "word-master",
    progress_json: big,
  });
  console.log("save_pack oversized (no auth)", save.body.trim());
}

main().catch(function (err) {
  console.error(err);
  process.exit(1);
});
