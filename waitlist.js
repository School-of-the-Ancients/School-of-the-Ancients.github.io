/* No Tally request until the visitor chooses to load the form. */
(() => {
  'use strict';
  const button = document.getElementById('load-waitlist');
  const embed = document.getElementById('waitlist-embed');
  const status = document.getElementById('waitlist-status');
  const age = document.getElementById('waitlist-age');
  const note = document.getElementById('waitlist-age-note');
  const direct = document.getElementById('waitlist-direct');
  if (!button || !embed || !age) return;
  const eligible = () => age.value === '18+';
  function updateAgeGate() {
    const adult = eligible();
    button.disabled = !adult;
    if (direct) {
      const link = direct.querySelector('a');
      if (adult) link.href = 'https://tally.so/r/o99kJN';
      else link.removeAttribute('href');
      direct.hidden = !adult;
    }
    if (note) note.textContent = adult
      ? 'You can now load the signup form or open it on Tally.'
      : 'You must be 18 or older to join the waitlist or create a School account.';
    if (!adult) {
      embed.querySelector('iframe[data-tally-src]')?.removeAttribute('src');
      embed.hidden = true;
      button.hidden = false;
      if (status) status.textContent = '';
    }
  }
  updateAgeGate();
  age.addEventListener('change', updateAgeGate);
  const help = document.getElementById('waitlist-help');
  if (help) help.hidden = true;
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
