// assets/js/app.js
import "./modules/navigation.js";
import "./modules/consent.js";
import "./modules/faq-inline.js";
import "./modules/simples.js";
import "./modules/about.js";

const onReady = (fn) =>
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", fn, { once: true })
    : fn();

const idle = (cb) =>
  "requestIdleCallback" in window
    ? requestIdleCallback(cb, { timeout: 1500 })
    : setTimeout(cb, 0);

function boot(module, prefer) {
  if (typeof module?.[prefer] === "function") return module[prefer]();
  if (typeof module?.default === "function") return module.default();
  for (const fn of ["bootCalculators", "initCltPjCalculator", "initCustoCnpjCalculator"])
    if (typeof module?.[fn] === "function") return module[fn]();
}

onReady(() => {
  if (document.querySelector("[data-help-open]")) {
    idle(() =>
      import("./modules/help-dialog.js")
        .then((m) => m.initHelpDialogs?.())
        .catch((e) => console.error("Falha ao carregar help-dialog.js", e))
    );
  }

  const needCLT = document.querySelector('[data-calc="clt-pj"]');
  const needCusto = document.querySelector('[data-calc="custo-cnpj"],[data-calc="custo-pj"],[data-calc="custo-abertura"],[data-calc="custo-abertura-pj"]');

  if (needCLT) {
    idle(() =>
      import("./modules/clt-vs-pj.js")
        .then((m) => boot(m, "initCltPjCalculator"))
        .catch((e) => console.error("Falha ao carregar clt-vs-pj.js", e))
    );
  }

  if (needCusto) {
    idle(() =>
      import("./modules/custos-abertura-pj.js")
        .then((m) => boot(m, "initCustoCnpjCalculator"))
        .catch((e) => console.error("Falha ao carregar custos-abertura-pj.js", e))
    );
  }
});
