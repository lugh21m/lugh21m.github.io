(() => {
  const nav = document.querySelector(".main-nav");
  const toggle = document.querySelector(".menu-btn");
  const yearEl = document.querySelector("[data-year]");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const next = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(next));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
