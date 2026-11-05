#!/usr/bin/env node
/**
 * Day 2 Words "Try again" (TRY_AGAIN_SPEC).
 * Proves the two halves that are pure logic:
 *   1. progress.logResult posts every try and gives try 2+ its own item id,
 *      so the score book appends a row and never overwrites try 1.
 *   2. the cloud save keeps the try log (tryN / tryRows) instead of dropping it.
 *
 * Run: node scripts/test-day2-try-again.mjs
 */
'use strict';

const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const fails = [];

function t(name, fn) {
  return Promise.resolve()
    .then(fn)
    .then(() => console.log('ok   ' + name))
    .catch((e) => {
      fails.push(name + ': ' + e.message);
      console.log('FAIL ' + name + ' — ' + e.message);
    });
}

function loadProgress() {
  const posts = [];
  const notes = [];
  const sandbox = {
    console,
    setInterval,
    clearInterval,
    setTimeout,
    clearTimeout,
    Promise,
    JSON,
    Date,
    Math,
    Object,
    Array,
    String,
    Number,
    isFinite,
    encodeURIComponent,
    localStorage: {
      _s: {},
      getItem(k) { return k in this._s ? this._s[k] : null; },
      setItem(k, v) { this._s[k] = String(v); },
      removeItem(k) { delete this._s[k]; },
    },
    MRJ_AUTH: {
      student: () => 'Test Student',
      token: () => 'tok',
      noteScore: (o) => {
        notes.push(o);
        return Promise.resolve({ ok: true });
      },
    },
    MRJ_SCORES: {
      localDate: () => '2026-11-06',
      post: (o) => {
        posts.push(o);
        return Promise.resolve({ status: 'ok' });
      },
    },
  };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  vm.createContext(sandbox);
  const src = fs.readFileSync(path.join(root, 'js/progress.js'), 'utf8');
  vm.runInContext(src, sandbox, { filename: 'progress.js' });
  return { api: sandbox.MRJ_WM_progress, posts, notes };
}

function loadPackSave() {
  const sandbox = { console, module: { exports: {} }, exports: {} };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  const src = fs.readFileSync(path.join(root, 'js/wm-pack-save.js'), 'utf8');
  vm.runInContext(src, sandbox, { filename: 'wm-pack-save.js' });
  return sandbox.module.exports;
}

(async function main() {
  await t('try 1 keeps the old item id, so no existing row changes', () => {
    const { api, posts, notes } = loadProgress();
    api.logResult({ packId: 'basic_a_u1', packTitle: 'Numbers 1 to 10', kind: 'final', score: 9, total: 10, meta: {} });
    assert.equal(posts.length, 1);
    assert.equal(posts[0].itemId, 'basic_a_u1:final');
    assert.equal(posts[0].metadata.attempt, 1);
    assert.equal(posts[0].metadata.re_attempt, false);
    assert.equal(notes[0].itemId, 'basic_a_u1:final');
  });

  await t('try 2 gets its own item id and says re_attempt', () => {
    const { api, posts } = loadProgress();
    api.logResult({ packId: 'basic_a_u1', kind: 'final', score: 9, total: 10, attempt: 1, meta: {} });
    api.logResult({ packId: 'basic_a_u1', kind: 'final', score: 8, total: 10, attempt: 2, meta: { misses: ['c'] } });
    assert.equal(posts.length, 2);
    assert.equal(posts[0].itemId, 'basic_a_u1:final');
    assert.equal(posts[1].itemId, 'basic_a_u1:final#t2');
    assert.notEqual(posts[0].itemId, posts[1].itemId, 'try 1 cannot be overwritten by try 2');
    assert.equal(posts[1].metadata.attempt, 2);
    assert.equal(posts[1].metadata.re_attempt, true);
    assert.deepEqual(posts[1].metadata.misses, ['c'], 'the old metadata is kept');
    assert.equal(posts[1].scoreValue, 8);
    assert.equal(posts[1].correctness, 'correct');
  });

  await t('try 3 keeps counting up, never back to an earlier id', () => {
    const { api, posts } = loadProgress();
    api.logResult({ packId: 'int2a_u3', kind: 'test_hard', score: 10, total: 10, attempt: 3, meta: {} });
    assert.equal(posts[0].itemId, 'int2a_u3:test_hard#t3');
    assert.equal(posts[0].metadata.re_attempt, true);
  });

  await t('a pack record with no try log still saves as before', () => {
    const save = loadPackSave();
    const out = save.trimProgress({ v: 1, sets: { basic_a_u1: { title: 'Numbers', winsA: { a: 2 } } } }, false, []);
    assert.deepEqual(Object.keys(out.sets.basic_a_u1).sort(), ['title', 'winsA']);
  });

  await t('the try log survives the cloud save', () => {
    const save = loadPackSave();
    const out = save.trimProgress({
      v: 1,
      sets: {
        basic_a_u1: {
          title: 'Numbers',
          tryN: 2,
          tryRows: [
            { n: 1, kind: 'final', at: 1, score: 9, total: 10, pct: 90, pass: true, source: 'student' },
            { n: 2, kind: 'final', at: 2, score: 8, total: 10, pct: 80, pass: true, source: 'student' },
          ],
        },
      },
    }, false, []);
    const set = out.sets.basic_a_u1;
    assert.equal(set.tryN, 2);
    assert.equal(set.tryRows.length, 2, 'both tries are kept');
    assert.equal(set.tryRows[0].score, 9);
  });

  if (fails.length) {
    console.error('\n' + fails.length + ' failed');
    process.exit(1);
  }
  console.log('\nDay 2 Try again: all checks passed');
})();
