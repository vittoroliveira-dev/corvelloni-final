// assets/js/about.js
export function enableSmoothScroll({ offsetSelector = ".c-header", offset = 0 } = {}) {
  const mql = matchMedia("(prefers-reduced-motion: reduce)");
  const behavior = () => (mql.matches ? "auto" : "smooth");

  const getOffset = () => {
    if (offsetSelector) {
      const el = document.querySelector(offsetSelector);
      if (el) return el.getBoundingClientRect().height;
    }
    return offset;
  };

  const focusTarget = (el) => {
    const hadAttr = el.hasAttribute("tabindex");
    const naturallyFocusable = el.matches("a,button,input,select,textarea,[tabindex]");
    if (!naturallyFocusable && !hadAttr) el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
    if (!naturallyFocusable && !hadAttr) el.removeAttribute("tabindex");
  };

  const scrollToHash = (hash) => {
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + pageYOffset - getOffset();
    scrollTo({ top, behavior: behavior() });
    requestAnimationFrame(() => focusTarget(target));
  };

  // Delegação: um listener só
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]:not([data-skip-smooth])');
    if (!a) return;

    const href = a.getAttribute("href");
    if (!href || href === "#" || href === "#0") return;

    const id = decodeURIComponent(href.slice(1));
    if (!document.getElementById(id)) return; // ignora se não existir alvo

    e.preventDefault();
    history.pushState(null, "", href); // mantém URL coerente
    scrollToHash(href);
  });

  // Se a página já carrega com hash, respeita
  if (location.hash) {
    const run = () => scrollToHash(location.hash);
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", run, { once: true })
      : run();
  }
}

// auto-boot simples
if (!window.__smoothScrollBooted) {
  window.__smoothScrollBooted = true;
  enableSmoothScroll({ offsetSelector: ".c-header" });
}
