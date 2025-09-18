// Mantém apenas um <details> aberto e delega o clique no summary
document.addEventListener("click", (e) => {
  const sum = e.target.closest(".c-faq-inline__summary");
  if (!sum) return;
  const current = sum.parentElement; // <details>
  const list = current.closest(".c-faq-inline__list");
  if (!list) return;
  // fecha outros
  list.querySelectorAll("details[open]").forEach((d) => {
    if (d !== current) d.removeAttribute("open");
  });
});
