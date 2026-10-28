# Early-access waitlist setup

The School of the Ancients website is hosted on **GitHub Pages**, which cannot directly store email submissions. The homepage embeds a published Tally form in the early-access section. Submissions are stored in a private Google Sheet connected to that form. Do not treat the embed appearing on the page as proof of successful collection; confirm receipt in Tally or the connected sheet.

## Tally configuration

- Form ID: `o99kJN`.
- Share URL: `https://tally.so/r/o99kJN`.
- Embed: `https://tally.so/embed/o99kJN` with `alignLeft=1`, `hideTitle=1`, `transparentBackground=1`, `dynamicHeight=1`, and `source=schooloftheancients.com`.
- The page uses Tally’s standard iframe embed and loads `https://tally.so/widgets/embed.js`.
- The form collects a required email and a required consent checkbox. The hidden field named `source` is filled from the `source` URL parameter.
- If JavaScript is blocked, the section shows a plain link to `https://tally.so/r/o99kJN` with the same `source` parameter.
- Submissions go to the Tally form and its private Google Sheet, not to GitHub or the static site.

### Production smoke test

1. Open https://schooloftheancients.com and confirm the embedded form appears in the early-access section.
2. Submit a user-owned test email with checked consent and confirm it appears in Tally and the private Google Sheet, including `source=schooloftheancients.com`.
3. Remove the test submission.
4. Check the layout on mobile and desktop.
5. With JavaScript disabled, confirm the plain link to the Tally form is available.

## Behavior and privacy

- The form asks for an email and explicit opt-in to occasional early-access announcements.
- Tally handles submission. The website does not claim that signup succeeded.
- Emails are not committed to GitHub, stored in browser localStorage, or sent to project telemetry.
- Signups are collected through Tally and stored in a private Google Sheet. They are not shared publicly.
- People can opt out by replying to any email or asking to be removed.
- Limit access to the Tally form and the sheet, and fulfill opt-out and deletion requests.
- Use submitted addresses only for the stated invitation and project-update purpose.

## Smoke-test checklist

- [x] Homepage embeds Tally form `o99kJN` and passes `source=schooloftheancients.com`.
- [x] A plain link fallback is present when JavaScript is blocked.
- [ ] A valid submission is present in Tally and the private Google Sheet, including the source value.
- [ ] Mobile and desktop layouts show the embed without overflow.
- [ ] Opt-out by reply or a removal request can be fulfilled by the form owner.

Embed guide: https://tally.so/help/embed-your-form
