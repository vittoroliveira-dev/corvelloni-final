// assets/js/app.js
import "corvelloni-final/docs/assets/js/modules/navigation.js";
import "corvelloni-final/docs/assets/js/modules/consent.js";
import "corvelloni-final/docs/assets/js/modules/faq-inline.js";
import "corvelloni-final/docs/assets/js/modules/simples.js";
import "corvelloni-final/docs/assets/js/modules/about.js";

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
      import("corvelloni-final/docs/assets/js/modules/help-dialog.js")
        .then((m) => m.initHelpDialogs?.())
        .catch((e) => console.error("Falha ao carregar help-dialog.js", e))
    );
  }

  const needCLT = document.querySelector('[data-calc="clt-pj"]');
  const needCusto = document.querySelector('[data-calc="custo-cnpj"],[data-calc="custo-pj"],[data-calc="custo-abertura"],[data-calc="custo-abertura-pj"]');

  if (needCLT) {
    idle(() =>
      import("corvelloni-final/docs/assets/js/modules/clt-vs-pj.js")
        .then((m) => boot(m, "initCltPjCalculator"))
        .catch((e) => console.error("Falha ao carregar clt-vs-pj.js", e))
    );
  }

  if (needCusto) {
    idle(() =>
      import("corvelloni-final/docs/assets/js/modules/custos-abertura-pj.js")
        .then((m) => boot(m, "initCustoCnpjCalculator"))
        .catch((e) => console.error("Falha ao carregar custos-abertura-pj.js", e))
    );
  }
});
