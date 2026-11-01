import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const source = await readFile(new URL('../analytics.js', import.meta.url), 'utf8');

function page({consent = 'yes', id = 'G-TEST'} = {}) {
  const events = new Map();
  const frameWindow = {};
  const frame = {contentWindow: frameWindow, getAttribute: () => 'https://tally.so/embed/o99kJN?hideTitle=1'};
  const window = {SOTA_GA4_MEASUREMENT_ID: id, dataLayer: [],
    localStorage: {getItem: () => consent}, addEventListener: (name, callback) => events.set(name, callback)};
  const document = {getElementById: () => null, createElement: () => ({}),
    head: {appendChild() {}}, addEventListener() {}, querySelectorAll: () => [frame]};
  vm.runInNewContext(source, {window, document, URL, Date});
  return {window, events, frame, send(overrides = {}) {
    events.get('message')?.({origin: 'https://tally.so', source: frameWindow,
      data: JSON.stringify({event: 'Tally.FormSubmitted', payload: {formId: 'o99kJN', email: 'never-forward@example.invalid'}}),
      ...overrides});
  }, leads() { return window.dataLayer.filter(call => call[0] === 'event'); }};
}

test('counts the real iframe message and sends only the fixed lead source', () => {
  const p = page(); p.send();
  assert.deepEqual(JSON.parse(JSON.stringify(p.leads().map(call => Array.from(call)))), [
    ['event', 'generate_lead', {lead_source: 'early_access_waitlist'}],
  ]);
});

test('rejects other origins, windows, forms, malformed and oversized messages', () => {
  const p = page();
  for (const message of [
    {origin: 'https://attacker.invalid'}, {source: {}}, {data: 'not json'},
    {data: JSON.stringify({event: 'Tally.FormSubmitted', payload: {formId: 'another'}})},
    {data: 'x'.repeat(262145)}, {data: null},
  ]) p.send(message);
  assert.equal(p.leads().length, 0);
  p.frame.getAttribute = () => 'https://tally.so/embed/another'; p.send();
  assert.equal(p.leads().length, 0);
});

test('deduplicates delivery until the verified form reloads', () => {
  const p = page(); p.send(); p.send();
  assert.equal(p.leads().length, 1);
  p.send({data: JSON.stringify({event: 'Tally.FormLoaded', payload: {formId: 'o99kJN'}})});
  p.send(); assert.equal(p.leads().length, 2);
});

test('does not load or send analytics when consent is declined', () => {
  const p = page({consent: 'no'}); p.send();
  assert.equal(p.window.gtag, undefined);
  assert.equal(p.leads().length, 0);
});

test('a missing measurement ID remains disabled', () => {
  const p = page({id: ''}); p.send();
  assert.equal(p.events.size, 0);
  assert.equal(p.leads().length, 0);
});
