/*
 * School of the Ancients: minimal, opt-in GA4 instrumentation.
 * No Google Analytics script, request or cookie is initiated before consent.
 * Do not include student responses, email addresses or Tally submission contents.
 */
(() => {
  "use strict";

  const id = window.SOTA_GA4_MEASUREMENT_ID;
  if (typeof id !== "string" || !/^G-[A-Z0-9]+$/.test(id)) return;

  const preferenceKey = "sota-analytics-consent-v1";
  let enabled = false;
  let banner = null;
  let choice = null;

  try {
    const value = window.localStorage.getItem(preferenceKey);
    if (value === "yes" || value === "no") choice = value;
  } catch {
    // Storage may be disabled. Keep the opt-in banner accessible for this session.
  }

  const preferencesButton = document.getElementById("analytics-preferences");
  if (preferencesButton) {
    preferencesButton.hidden = false;
    preferencesButton.addEventListener("click", showBanner);
  }

  function track(eventName, params = {}) {
    if (enabled && typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }
  }

  function loadAnalytics() {
    if (enabled) return;
    enabled = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", id);

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(script);
  }

  function clearAnalyticsCookies() {
    // Remove only cookies conventionally created by GA4 for this first-party domain.
    const names = document.cookie.split(";").map(part => part.trim().split("=")[0])
      .filter(name => name === "_ga" || name.startsWith("_ga_"));
    for (const name of names) {
      document.cookie = name + "=; Max-Age=0; path=/; SameSite=Lax";
      document.cookie = name + "=; Max-Age=0; path=/; domain=schooloftheancients.com; SameSite=Lax";
    }
  }

  function saveChoice(next) {
    const wasEnabled = enabled;
    choice = next;
    try { window.localStorage.setItem(preferenceKey, next); } catch {}
    if (banner) { banner.remove(); banner = null; }

    if (next === "yes") {
      loadAnalytics();
    } else {
      clearAnalyticsCookies();
      // If consent was revoked in this page, unload the tag by reloading without it.
      if (wasEnabled) window.location.reload();
    }
  }

  function showBanner() {
    if (banner) return;
    const cssId = "sota-analytics-consent-styles";
    if (!document.getElementById(cssId)) {
      const css = document.createElement("style");
      css.id = cssId;
      css.textContent = `
        .sota-analytics-banner{position:fixed;z-index:9999;bottom:16px;left:16px;right:16px;
          max-width:560px;margin:auto;border:1px solid #8b5cf6;border-radius:14px;
          background:#141b35;color:#f3f4f6;padding:18px 20px;
          box-shadow:0 12px 40px #0009;font:15px/1.5 system-ui,-apple-system,sans-serif}
        .sota-analytics-banner p{color:#d1d5db;margin:0 0 13px}
        .sota-analytics-banner strong{display:block;margin-bottom:6px}
        .sota-analytics-actions{display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-end}
        .sota-analytics-actions button{font:inherit;cursor:pointer;border-radius:8px;
          padding:8px 14px;border:1px solid #a78bfa;color:#f3f4f6;background:transparent}
        .sota-analytics-actions .allow{background:#a78bfa;color:#130b2b;font-weight:700}
        .sota-analytics-actions button:focus-visible{outline:3px solid #fff;outline-offset:3px}
      `;
      document.head.appendChild(css);
    }

    banner = document.createElement("aside");
    banner.className = "sota-analytics-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Optional website analytics");
    banner.innerHTML =
      '<strong>Optional website analytics</strong>' +
      '<p>Help us understand visits and improve School of the Ancients. With your permission, Google Analytics measures pages, traffic sources and engagement. We do not send your email or form answers to Analytics. You can change this choice under Analytics preferences.</p>' +
      '<div class="sota-analytics-actions">' +
      '<button type="button" data-consent="no">No thanks</button>' +
      '<button type="button" class="allow" data-consent="yes">Allow analytics</button>' +
      '</div>';
    banner.querySelector('[data-consent="no"]').addEventListener("click", () => saveChoice("no"));
    banner.querySelector('[data-consent="yes"]').addEventListener("click", () => saveChoice("yes"));
    document.body.appendChild(banner);
  }

  if (choice === "yes") loadAnalytics();
  else if (choice !== "no") showBanner();

  // These are interest signals, not conversions or completed Tally signups.
  document.addEventListener("click", (event) => {
    const element = event.target.closest?.("a[data-analytics-event]");
    if (!element) return;
    const eventName = element.getAttribute("data-analytics-event");
    if (eventName !== "waitlist_interest" && eventName !== "demo_click") return;
    track(eventName, { link_location: element.getAttribute("data-analytics-location") || "site" });
  });

  // Embedded forms use postMessage, not a CustomEvent on the parent page.
  // Trust only this form's iframe and origin. Never forward answers or identifiers.
  const submittedEmbeds = new WeakSet();
  window.addEventListener("message", (event) => {
    if (!enabled || event.origin !== "https://tally.so") return;
    const iframe = Array.from(document.querySelectorAll("iframe[data-tally-src]")).find(frame => {
      if (frame.contentWindow !== event.source) return false;
      try {
        const url = new URL(frame.getAttribute("data-tally-src"));
        return url.origin === event.origin && url.pathname === "/embed/o99kJN";
      } catch { return false; }
    });
    if (!iframe) return;
    let message;
    try {
      if (typeof event.data !== "string" || event.data.length > 262144) return;
      message = JSON.parse(event.data);
    } catch { return; }
    if (message?.payload?.formId !== "o99kJN") return;
    if (message.event === "Tally.FormLoaded") {
      submittedEmbeds.delete(iframe);
    } else if (message.event === "Tally.FormSubmitted" && !submittedEmbeds.has(iframe)) {
      submittedEmbeds.add(iframe);
      track("generate_lead", { lead_source: "early_access_waitlist" });
    }
  });
})();
