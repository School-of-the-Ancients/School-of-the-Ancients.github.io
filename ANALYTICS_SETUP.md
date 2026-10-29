# School of the Ancients — Search Console + GA4 setup

The website source now supports Google Analytics 4 (GA4) visitor/engagement metrics and Google Search Console (GSC) organic search reporting. **Neither is automatically connected to a Google account.** The GA4 script intentionally does nothing until a valid, site-specific measurement ID is configured; do not reuse the measurement ID from a different project.

## 1. Create the GA4 property and web stream

1. Sign in at https://analytics.google.com/ with the Google account that should own the site's data.
2. Create/select an Analytics account and a **GA4 property** for **School of the Ancients** (timezone: Denver; use the correct business settings).
3. Under **Admin → Data streams**, create a **Web** stream for **https://schooloftheancients.com/**.
4. Copy the stream's **Measurement ID** (`G-...`). This is a public tag identifier, **not** an API secret.
5. In the website repository, edit `analytics-config.js` and replace the empty string in `window.SOTA_GA4_MEASUREMENT_ID = "";` with that exact ID. Commit/publish it. The tag will load on the home and history pages only after the visitor chooses **Allow analytics**.
6. Visit the live site, consent, and use Analytics **Realtime** and/or https://tagassistant.google.com/ to confirm `page_view` and custom events. Ad blockers and consent choices will reduce the measured total.

### GA4 events

- `page_view`, `session_start`, `user_engagement`: ordinary GA4 reporting after consent.
- `waitlist_interest`: a visitor clicked an on-site waitlist CTA. **Not** a signup.
- `demo_click`: a visitor clicked the Quest demo link.
- `generate_lead` with `lead_source=early_access_waitlist`: Tally `Tally.FormSubmitted` event from the embedded waitlist form. No email addresses or form content sent.
- Mark `generate_lead` as a **key event** in GA4 after validating with a test submission.
- To see bounce rate, use GA4 **Reports → Engagement** (customize the report to include bounce rate if needed). GA4 defines bounce as sessions that were not engaged.

GA4 cannot measure visitors who do not consent with this basic opt-in approach. This is deliberate. The site offers an **Analytics preferences** control to change the choice, and stops loading the tag when permission is declined/revoked. Review site disclosures and compliance obligations before broad launch.

## 2. Verify schooloftheancients.com in Search Console

1. Sign in at https://search.google.com/search-console/.
2. **Recommended:** choose **Domain property** and enter `schooloftheancients.com`. Google will provide a unique **DNS TXT** verification string. Add **Google's exact value** at the DNS manager for this domain (not in GitHub). Domain properties include the main site and subdomains. Keep the TXT record installed.
3. **Alternative:** choose **URL-prefix property** `https://schooloftheancients.com/`; Google can verify with an HTML file or HTML meta tag. If using an HTML file, publish Google's **exact supplied filename and contents** at the website root. Do not invent a verification value. This property would exclude other subdomains.
4. Verify in Google. Then submit `https://schooloftheancients.com/sitemap.xml` under **Sitemaps**. Use **URL inspection** for the homepage and original-vision page as needed.
5. Link GSC and GA4 in Analytics admin (Product links → Search Console links) if supported by your property permissions.

Search Console tracks Google Search impressions, clicks, queries, search CTR, ranking position, and indexing. **It does not track website bounce rate or all visitors; that is GA4.** Search and analytics data may take time to appear.

## 3. Deployment and checks

- Confirm both pages load, the consent dialog is keyboard-accessible, and **No thanks** sends no Google tracking requests.
- Confirm the banner appears only when a valid GA4 ID exists; no fictitious ID is committed.
- Confirm the 3 CTA events fire only after consent and test Tally completion is counted once.
- Verify `robots.txt` and `sitemap.xml` remain published.

## Scope

The code here covers the main static GitHub Pages site and its original-vision page, **not** the separate alpha/beta applications. Add separate tags and privacy/consent handling to them only after deciding whether their traffic should share a GA4 stream. Do not send lesson transcripts, student identifiers, learner records, Tally form values or private 3D scene data as analytics parameters.
