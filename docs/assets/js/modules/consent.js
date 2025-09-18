const STORAGE_KEY = "corvelloni-consent-state";
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const banner = document.querySelector("[data-consent-banner]");
const acceptButton = banner?.querySelector("[data-consent-accept]");
const rejectButton = banner?.querySelector("[data-consent-reject]");
let lastFocusedElement = null;
let hasLoadedAnalytics = false;

function safeStorage(action, value) {
  try {
    if (action === "get") return window.localStorage.getItem(STORAGE_KEY);
    if (action === "set") window.localStorage.setItem(STORAGE_KEY, value);
  } catch (e) {
    console.warn("Consentimento: localStorage indisponível", e);
  }
  return null;
}

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
}

function setConsentDefault() {
  ensureDataLayer();
  window.gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function setHtmlConsentState(state) {
  document.documentElement.setAttribute("data-consent", state);
}

function updateConsentState(state) {
  ensureDataLayer();
  const granted = {
    ad_storage: "denied",
    analytics_storage: "granted",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
  const denied = {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
  window.gtag("consent", "update", state === "granted" ? granted : denied);
  setHtmlConsentState(state);
}

function loadAnalytics() {
  if (hasLoadedAnalytics) return;
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") return;
  hasLoadedAnalytics = true;

  const s = document.createElement("script");
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  s.async = true;
  s.addEventListener("load", () => {
    ensureDataLayer();
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      allow_google_signals: false,
    });
  });
  document.head.appendChild(s);
}

function trapFocus(e) {
  if (e.key !== "Tab" || !banner) return;
  const list = banner.querySelectorAll(focusableSelector);
  if (!list.length) return;
  const first = list[0];
  const last = list[list.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault(); last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault(); first.focus();
  }
}

function handleKeydown(e) {
  if (e.key === "Escape") { e.preventDefault(); closeBanner(); }
}

function closeBanner() {
  if (!banner) return;
  banner.classList.remove("is-open");
  banner.setAttribute("hidden", "");
  banner.removeEventListener("keydown", trapFocus);
  document.removeEventListener("keydown", handleKeydown);
  if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
}

function openBanner() {
  if (!banner || !banner.hasAttribute("hidden")) return;
  lastFocusedElement = document.activeElement;
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-modal", "true");

  banner.removeAttribute("hidden");
  requestAnimationFrame(() => banner.classList.add("is-open"));

  banner.addEventListener("keydown", trapFocus);
  document.addEventListener("keydown", handleKeydown);

  (acceptButton || rejectButton || banner).focus();
}

function persistConsent(state) { safeStorage("set", state); }

function applyConsent(state) {
  updateConsentState(state);
  if (state === "granted") loadAnalytics();
}

function handleAccept() { persistConsent("granted"); applyConsent("granted"); closeBanner(); }
function handleReject() { persistConsent("denied"); applyConsent("denied"); closeBanner(); }

function initManageLink() {
  const list = document.querySelector(".c-footer__links");
  if (!list || list.querySelector("[data-consent-open]")) return;
  const li = document.createElement("li");
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = "Gerenciar cookies";
  btn.className = "c-consent__manage-link";
  btn.setAttribute("data-consent-open", "true");
  li.appendChild(btn);
  list.appendChild(li);
}

function bindManageTriggers() {
  document.addEventListener("click", (e) => {
    const el = e.target;
    if (el instanceof HTMLElement && el.closest("[data-consent-open]")) {
      e.preventDefault(); openBanner();
    }
  });
}

function boot() {
  setConsentDefault();
  initManageLink();
  bindManageTriggers();

  if (!banner || !acceptButton || !rejectButton) return;

  const stored = safeStorage("get");
  if (stored === "granted") applyConsent("granted");
  else if (stored === "denied") applyConsent("denied");
  else openBanner();

  acceptButton.addEventListener("click", handleAccept);
  rejectButton.addEventListener("click", handleReject);
}

// só inicia após DOM pronto se o script não for "defer"
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
