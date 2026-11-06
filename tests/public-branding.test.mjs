import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = name => readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');

test('public marketing uses descriptive branding without the former product name', () => {
  for (const name of ['index.html', 'llms.txt', 'privacy/index.html', 'history/prototypes.html', 'history/original-vision.html']) {
    assert.doesNotMatch(read(name), /\bmatrix\b/i, name);
  }
  assert.match(read('index.html'), /our dynamic creation platform/);
  assert.doesNotMatch(read('index.html'), /proprietary/i);
});

test('public pages do not promote the deferred demo media', () => {
  assert.doesNotMatch(read('index.html'), /tesla-exhibit\.jpg|youtube\.com\/watch/);
  assert.match(read('_config.yml'), /- archive/);
  assert.match(read('_config.yml'), /- assets\/tesla-exhibit\.jpg/);
});

test('the original-vision summary labels AI interpretations and retains license context', () => {
  assert.match(read('history/original-vision.html'), /AI-generated interpretations/);
  assert.match(read('history/original-vision.html'), /Earlier license grants and third-party terms continue to apply/);
  assert.match(read('RIGHTS.md'), /blog contains quotations/);
});
