/* No Tally request until the visitor chooses to load the form. */
(() => {
  'use strict';
  const button = document.getElementById('load-waitlist');
  const embed = document.getElementById('waitlist-embed');
  const status = document.getElementById('waitlist-status');
  if (!button || !embed) return;
  button.addEventListener('click', () => {
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
