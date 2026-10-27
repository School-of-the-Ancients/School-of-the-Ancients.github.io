# Early-access waitlist setup

The School of the Ancients website is hosted on **GitHub Pages**, which cannot directly store email submissions. The homepage form uses the configured Formspree endpoint below. Do not treat UI availability as proof of successful collection; confirm receipt in the form owner’s dashboard.

## Formspree configuration

- Configured endpoint: `https://formspree.io/f/xvkkkbrq`.
- The homepage form uses **native HTML POST**; its button is enabled without JavaScript.
- It collects a required email, a required explicit consent checkbox, and a source field (`schooloftheancients.com`).
- All submissions go to the Formspree form account that owns the endpoint, not to GitHub or the static site.
- Do not treat the configured action as proof of receipt: a real signup should be verified in the Formspree dashboard.

### Final production smoke test

1. Open https://schooloftheancients.com and check the form appears at the top.
2. Test invalid/empty email and unchecked consent; browser should block submission.
3. Submit a user-owned test email with checked consent and confirm it appears in the Formspree dashboard.
4. Check Formspree confirmation, spam protection and owner notifications. Remove the test submission.
5. Verify the layout on mobile.

## Behavior and privacy

- The site asks for an email and explicit opt-in to occasional early-access announcements.
- On successful native form POST, Formspree manages the response/confirmation flow; the website itself does not falsely claim that signup succeeded.
- With the configured endpoint, the signup button is enabled and submits natively to Formspree.
- Emails are not committed to GitHub, stored in browser localStorage, or sent to project telemetry.
- Formspree is the data processor. Limit dashboard access, apply its retention controls, and fulfill opt-outs/deletion requests.
- Use submitted addresses only for the stated invitation/project-update purpose, not unrelated outreach. Do not bulk-email without honoring unsubscribe/opt-out requests.
- If you later need double opt-in, segments, and automated unsubscribe links, migrate to an email marketing platform and update the site’s signup disclosures.

## Smoke-test checklist

- [x] A real Formspree endpoint is configured in the HTML.
- [x] Submit button is enabled and the form uses native POST.
- [ ] Empty/invalid email cannot be submitted.
- [ ] Unchecked consent cannot be submitted.
- [ ] Valid submission is present in Formspree; do not claim success unless verified.
- [ ] Mobile width displays an accessible input/button without overflow.
- [ ] Formspree confirmation and user opt-out workflow are verified.

Official setup guide: https://help.formspree.io/articles/building-your-form/building-an-html-form/
