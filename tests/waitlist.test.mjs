import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const source = await readFile(new URL('../waitlist.js', import.meta.url), 'utf8');
function page(url = 'https://tally.so/embed/o99kJN?alignLeft=1') {
  let click;
  let change;
  const frame = {hasAttribute: () => 'src' in frame, getAttribute: () => url, removeAttribute: key => delete frame[key]};
  const button = {addEventListener: (type, fn) => { if (type === 'click') click = fn; }};
  const embed = {hidden: true, querySelector: () => frame};
  const status = {};
  const age = {value: '', addEventListener: (type, fn) => { change = fn; }};
  const direct = {hidden: true};
  const elements = {'load-waitlist': button, 'waitlist-embed': embed, 'waitlist-status': status,
    'waitlist-age': age, 'waitlist-direct': direct, 'waitlist-age-note': {}};
  vm.runInNewContext(source, {document: {getElementById: id => elements[id]}, URL});
  return {frame, button, embed, status, direct, choose: value => {age.value = value; change();}, click: () => click()};
}
test('does not load Tally until requested and loads only once', () => {
  const p = page();
  assert.equal(p.frame.src, undefined);
  assert.equal(p.embed.hidden, true);
  p.choose('13-17');
  p.click();
  assert.equal(p.frame.src, 'https://tally.so/embed/o99kJN?alignLeft=1');
  assert.equal(p.embed.hidden, false);
  assert.equal(p.button.hidden, true);
  assert.match(p.status.textContent, /loaded below/);
  p.click();
  assert.equal(p.frame.src, 'https://tally.so/embed/o99kJN?alignLeft=1');
});
test('refuses a changed origin or another form', () => {
  for (const url of ['https://attacker.invalid/embed/o99kJN', 'https://tally.so/embed/another']) {
    const p = page(url); p.choose('18+'); p.click();
    assert.equal(p.frame.src, undefined);
    assert.equal(p.embed.hidden, true);
  }
});
test('missing or under-13 age keeps both Tally routes closed', () => {
  const p = page(); p.click();
  assert.equal(p.frame.src, undefined);
  p.choose('under13'); p.click();
  assert.equal(p.frame.src, undefined);
  assert.equal(p.direct.hidden, true);
  p.choose('18+'); p.click();
  assert.ok(p.frame.src);
  p.choose('under13');
  assert.equal(p.frame.src, undefined);
  assert.equal(p.embed.hidden, true);
});
test('homepage has no automatically loaded Tally widget or iframe', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.doesNotMatch(html, /widgets\/embed\.js/);
  assert.doesNotMatch(html, /<iframe\b[^>]*\ssrc=/);
  for (const path of ['privacy', 'terms', 'copyright']) {
    assert.ok(html.includes(`href="/${path}/"`));
    await readFile(new URL(`../${path}/index.html`, import.meta.url), 'utf8');
  }
});
