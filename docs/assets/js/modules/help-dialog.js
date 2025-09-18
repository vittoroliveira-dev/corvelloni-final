export function initHelpDialogs() {
    const supportsDialog = typeof HTMLDialogElement === "function";
    if (!supportsDialog) document.documentElement.classList.add("no-dialog");

    document.querySelectorAll("[data-help-open]").forEach((btn) => {
        const sel = btn.getAttribute("data-help-open");
        const dlg = document.querySelector(sel);
        if (!dlg) return;

        let lastFocus = null;
        let removeFallbackListeners = () => {};

        const getFocusables = () => {
            const list = dlg.querySelectorAll(
                'button, [href], input, select, textarea, details, [tabindex]:not([tabindex="-1"])'
            );
            return Array.from(list).filter(el => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));
        };

        const trapKeydown = (e) => {
            if (e.key !== "Tab") return;
            const focusables = getFocusables();
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        const onEscape = (e) => {
            if (e.key === "Escape") closeDialog();
        };

        const openDialog = () => {
            lastFocus = document.activeElement;

            if (supportsDialog) {
                dlg.showModal();
            } else {
                dlg.removeAttribute("hidden");
                dlg.setAttribute("role", "dialog");
                dlg.setAttribute("aria-modal", "true");

                // listeners do fallback só enquanto aberto
                dlg.addEventListener("keydown", trapKeydown);
                document.addEventListener("keydown", onEscape);

                removeFallbackListeners = () => {
                    dlg.removeEventListener("keydown", trapKeydown);
                    document.removeEventListener("keydown", onEscape);
                    removeFallbackListeners = () => {};
                };
            }

            (dlg.querySelector(".c-help-dialog__close") || getFocusables()[0] || dlg).focus();
        };

        const closeDialog = () => {
            if (supportsDialog) {
                dlg.close();
            } else {
                removeFallbackListeners();
                dlg.setAttribute("hidden", "");
            }
            if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
        };

        // Abertura
        btn.addEventListener("click", openDialog);

        // Fechar com “cancel” só em <dialog>
        if (supportsDialog) {
            dlg.addEventListener("cancel", (e) => {
                e.preventDefault();
                closeDialog();
            });
        }

        // Clique fora fecha
        dlg.addEventListener("click", (e) => {
            if (e.target === dlg) closeDialog();
        });

        // Botões de fechar
        dlg.querySelectorAll("[data-help-close]").forEach((b) => {
            b.addEventListener("click", closeDialog);
        });
    });
}
