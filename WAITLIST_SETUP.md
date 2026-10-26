# Early-access waitlist setup

The School of the Ancients website is hosted on **GitHub Pages**, which cannot directly store email submissions. The form on the homepage is intentionally **disabled until a real Formspree endpoint is configured**. Do not treat UI availability as proof of successful collection.

## One-click Formspree setup

Open [the preconfigured School of the Ancients early-access form claim link](https://formspree.io/claim?name=School+of+the+Ancients+Early+Access&project=school-of-the-ancients&field.email=email%2Crequired%2Cmaxlength%3A254&field.consent=text%2Crequired&field.source=text) and sign into your own Formspree account. The form is configured for required email and consent, plus an optional source field to match the homepage. Formspree will create the form when claimed; this link **does not itself create a live form**. Copy the resulting `https://formspree.io/f/...` endpoint and install it below.

If the claim link fails, use manual setup.

## Enable collecting signups

1. Create a Formspree account at https://formspree.io and verify the receiving email address.
2. Create a new form named **School of the Ancients Early Access**. Use an inbox controlled by the School of the Ancients team.
3. Copy the actual form endpoint from Formspree (example format: `https://formspree.io/f/abcdefgh`). Do **not** use that example as a real endpoint.
4. In `index.html`, replace the `PASTE_FORMSPREE_ENDPOINT_HERE` string with the real URL, then publish to GitHub Pages.
5. Visit https://schooloftheancients.com, submit one test signup with consent checked, and verify that **the address actually appears in the Formspree dashboard**. Check the spam/validation flow, mobile layout, and confirmation page.
6. Delete the test submission and configure notification and spam-handling preferences in Formspree.

## Behavior and privacy

- The site asks for an email and explicit opt-in to occasional early-access announcements.
- On successful native form POST, Formspree manages the response/confirmation flow; the website itself does not falsely claim that signup succeeded.
- While unconfigured the submit button stays disabled and the site says signups are pending.
- Emails are not committed to GitHub, stored in browser localStorage, or sent to project telemetry.
- Formspree is the data processor. Limit dashboard access, apply its retention controls, and fulfill opt-outs/deletion requests.
- Use submitted addresses only for the stated invitation/project-update purpose, not unrelated outreach. Do not bulk-email without honoring unsubscribe/opt-out requests.
- If you later need double opt-in, segments, and automated unsubscribe links, migrate to an email marketing platform and update the site’s signup disclosures.

## Smoke-test checklist

- [ ] Without a configured endpoint: submit button is disabled.
- [ ] After configuring a real endpoint: submit button is enabled.
- [ ] Empty/invalid email cannot be submitted.
- [ ] Unchecked consent cannot be submitted.
- [ ] Valid submission is present in Formspree; do not claim success unless verified.
- [ ] Mobile width displays an accessible input/button without overflow.
- [ ] Formspree confirmation and user opt-out workflow are verified.

Official setup guide: https://help.formspree.io/articles/building-your-form/building-an-html-form/
