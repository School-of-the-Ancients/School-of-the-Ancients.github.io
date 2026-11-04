/* No Tally request until the visitor chooses to load the form. */
(() => {
  'use strict';
  const button = document.getElementById('load-waitlist');
  const embed = document.getElementById('waitlist-embed');
  const status = document.getElementById('waitlist-status');
  const age = document.getElementById('waitlist-age');
  const note = document.getElementById('waitlist-age-note');
  const direct = document.getElementById('waitlist-direct');
  const eligible = () => age && ['13-17', '18+'].includes(age.value);
  if (!button || !embed || !age) return;
  age.addEventListener('change', () => {
    button.disabled = !eligible();
    if (direct) direct.hidden = !eligible();
    if (note) note.textContent = age.value === 'under13'
      ? 'We cannot accept waitlist signups from people under 13. Please do not submit the form.'
      : age.value === '13-17'
      ? 'Please discuss the experimental service with a parent or guardian. Do not include private or sensitive information.'
      : 'Your selection is used on this page only; it is not sent to Tally.';
    if (!eligible()) {
      embed.querySelector('iframe[data-tally-src]')?.removeAttribute('src');
      embed.hidden = true;
      button.hidden = false;
      if (status) status.textContent = '';
    }
  });
  button.addEventListener('click', () => {
    if (!eligible()) return;
    const frame = embed.querySelector('iframe[data-tally-src]');
    if (!frame || frame.hasAttribute('src')) return;
    const source = new URL(frame.getAttribute('data-tally-src'));
    if (source.origin !== 'https://tally.so' || source.pathname !== '/embed/o99kJN') return;
    frame.src = source.href;
    embed.hidden = false;
    button.hidden = true;
    if (status) status.textContent = 'Signup form loaded below. If it does not appear, use the link to open it on Tally.';
  });
})();
