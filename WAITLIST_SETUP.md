# Early-access waitlist setup

The School of the Ancients website is hosted on **GitHub Pages**, which cannot directly store email submissions. The homepage embeds a published Tally form in the early-access section. Submissions are stored in a private Google Sheet connected to that form. Do not treat the embed appearing on the page as proof of successful collection; confirm receipt in Tally or the connected sheet.

## Tally configuration

- Form ID: `o99kJN`.
- Share URL: `https://tally.so/r/o99kJN`.
- Embed: `https://tally.so/embed/o99kJN` with `alignLeft=1`, `hideTitle=1`, and `transparentBackground=1`.
- The homepage displays an age selector before loading the iframe or enabling the direct link. Only “18 or older” unlocks these options. Selecting “Load signup form” then connects to Tally. The age selection stays in the visitor’s browser.
- With JavaScript disabled, the site provides a contact address for waitlist help.
- The public share URL is managed in Tally. Keep its eligibility requirement in the form itself so it also applies to visitors who use a saved link.
- Submissions go to the Tally form and its private Google Sheet, not to GitHub or the static site.

### Production smoke test

1. Open the early-access section on mobile and desktop. Check that leaving the age blank or selecting “Under 18” keeps the form and direct link closed.
2. Select “18 or older.” Check that the direct link opens the published form and that “Load signup form” loads the iframe. Switch back to “Under 18” and check that both routes close again.
3. Open the Tally share URL directly and check that a new applicant must confirm they are 18 or older to join.
4. With JavaScript disabled, check that waitlist help is visible.
5. When verifying delivery, use an authorized test signup and check its receipt in Tally and the connected sheet.

## Behavior and privacy

- The form asks for an email and explicit opt-in to occasional early-access announcements.
- Tally handles submission. The website does not claim that signup succeeded.
- Emails are not committed to GitHub, stored in browser localStorage, or sent to project telemetry.
- Signups are collected through Tally and stored in a private Google Sheet. They are not shared publicly.
- People can opt out by replying to any email or asking to be removed.
- Limit access to the Tally form and the sheet, and fulfill opt-out and deletion requests.
- Use submitted addresses only for the stated invitation and project-update purpose.

## Smoke-test checklist

- [ ] Both homepage routes enforce the adult age selection.
- [ ] The standalone form requires an adult declaration.
- [ ] A valid submission reaches Tally and the private Google Sheet.
- [ ] Mobile and desktop layouts show the embed without overflow.
- [ ] Opt-out by reply or a removal request can be fulfilled by the form owner.

Embed guide: https://tally.so/help/embed-your-form
