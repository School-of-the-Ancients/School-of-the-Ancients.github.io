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
  const link = {removeAttribute: key => delete link[key]};
  const direct = {hidden: true, querySelector: () => link};
  const elements = {'load-waitlist': button, 'waitlist-embed': embed, 'waitlist-status': status,
    'waitlist-age': age, 'waitlist-direct': direct, 'waitlist-age-note': {}};
  vm.runInNewContext(source, {document: {getElementById: id => elements[id]}, URL});
  return {frame, button, embed, status, direct, link, ageNote: elements['waitlist-age-note'],
    choose: value => {age.value = value; change();}, click: () => click()};
}
test('does not load Tally until requested and loads only once', () => {
  const p = page();
  assert.equal(p.frame.src, undefined);
  assert.equal(p.embed.hidden, true);
  p.choose('18+');
  assert.equal(p.button.disabled, false);
  assert.equal(p.direct.hidden, false);
  assert.equal(p.link.href, 'https://tally.so/r/o99kJN');
  assert.equal(p.frame.src, undefined);
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
test('only the adult choice opens either Tally route, including with older age options', () => {
  const p = page();
  for (const age of ['', 'under18', '13-17', 'under13', 'unknown']) {
    p.choose(age);
    p.click();
    assert.equal(p.frame.src, undefined, age);
    assert.equal(p.button.disabled, true, age);
    assert.equal(p.direct.hidden, true, age);
    assert.equal(p.link.href, undefined, age);
    assert.match(p.ageNote.textContent, /18 or older to join the waitlist/, age);
  }
});
test('changing the adult choice closes the loaded form and the direct link', () => {
  const p = page();
  p.choose('18+'); p.click();
  assert.ok(p.frame.src);
  p.choose('under18');
  assert.equal(p.frame.src, undefined);
  assert.equal(p.embed.hidden, true);
  assert.equal(p.button.hidden, false);
  assert.equal(p.button.disabled, true);
  assert.equal(p.direct.hidden, true);
  assert.equal(p.link.href, undefined);
  assert.equal(p.status.textContent, '');
  p.choose('18+');
  assert.equal(p.frame.src, undefined);
  p.click();
  assert.ok(p.frame.src);
});
test('homepage has no automatically loaded Tally widget or iframe', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.doesNotMatch(html, /widgets\/embed\.js/);
  assert.doesNotMatch(html, /<iframe\b[^>]*\ssrc=/);
  assert.doesNotMatch(html, /<a\b[^>]*\shref="https:\/\/tally\.so\/r\//);
  assert.match(html, /<button\b[^>]*id="load-waitlist"[^>]*\bdisabled\b/);
  assert.match(html, /<option value="under18">Under 18<\/option><option value="18\+">18 or older<\/option>/);
  for (const path of ['privacy', 'terms', 'copyright']) {
    assert.ok(html.includes(`href="/${path}/"`));
    await readFile(new URL(`../${path}/index.html`, import.meta.url), 'utf8');
  }
});

test('public notices give the same adult age for the waitlist and account signup', async () => {
  for (const path of ['index.html', 'terms/index.html', 'privacy/index.html']) {
    const html = await readFile(new URL(`../${path}`, import.meta.url), 'utf8');
    assert.match(html, /18 or older to join the waitlist or create a School account/, path);
    assert.doesNotMatch(html, /from age 13|13[–-]17|13 to 17/i, path);
  }
});
