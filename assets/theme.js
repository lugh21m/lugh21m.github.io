(() => {
  const storageKey = "lugh21-theme";
  const root = document.documentElement;
  const options = [
    { value: "light", label: "Hell" },
    { value: "dark", label: "Dunkel" },
    { value: "system", label: "System" }
  ];
  const stickyTop = 24;

  const isValid = (value) => ["light", "dark", "system"].includes(value);

  const safeGet = () => {
    try {
      const value = localStorage.getItem(storageKey);
      return isValid(value) ? value : "light";
    } catch (error) {
      return "light";
    }
  };

  const safeSet = (value) => {
    try {
      localStorage.setItem(storageKey, value);
    } catch (error) {
      /* ignore */
    }
  };

  const applyTheme = (value) => {
    if (value === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", value || "light");
    }
  };

  const ensureStyles = () => {
    if (document.getElementById("theme-switcher-styles")) return;
    const style = document.createElement("style");
    style.id = "theme-switcher-styles";
    style.textContent = `
:root {
  --theme-switch-bg: rgba(255,255,255,0.7);
  --theme-switch-border: rgba(0,0,0,0.12);
  --theme-switch-shadow: 0 10px 24px rgba(0,0,0,0.12);
  --theme-switch-text: var(--fg, var(--text, var(--ink, currentColor)));
  --theme-switch-top: ${stickyTop}px;
  --theme-switch-edge-gap: 12px;
}
:root[data-theme="dark"] {
  --theme-switch-bg: rgba(15,17,20,0.7);
  --theme-switch-border: rgba(255,255,255,0.14);
  --theme-switch-shadow: 0 12px 28px rgba(0,0,0,0.45);
  --theme-switch-text: var(--fg, var(--text, var(--ink, currentColor)));
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --theme-switch-bg: rgba(15,17,20,0.7);
    --theme-switch-border: rgba(255,255,255,0.14);
    --theme-switch-shadow: 0 12px 28px rgba(0,0,0,0.45);
    --theme-switch-text: var(--fg, var(--text, var(--ink, currentColor)));
  }
}
.theme-switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--theme-switch-border);
  background: var(--theme-switch-bg);
  box-shadow: var(--theme-switch-shadow);
  backdrop-filter: blur(6px);
  color: var(--theme-switch-text);
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  flex: 0 0 auto;
}
.theme-switch--header {
  margin-left: 0;
  align-self: center;
}
.theme-switch-placeholder {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  width: calc(var(--theme-switch-width, 0px) + var(--theme-switch-edge-gap, 0px));
  height: var(--theme-switch-height, 0px);
  pointer-events: none;
}
.theme-switch__label {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.7;
}
.theme-switch__select {
  font: inherit;
  color: inherit;
  border: 0;
  background: transparent;
  padding: 2px 18px 2px 6px;
  cursor: pointer;
  appearance: none;
}
.theme-switch__select:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
  border-radius: 999px;
}
.theme-switch__caret {
  position: relative;
  display: inline-flex;
  align-items: center;
}
.theme-switch__caret::after {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg);
  margin-left: -12px;
  pointer-events: none;
  opacity: 0.7;
}
.theme-switch-slot {
  display: flex;
  justify-content: flex-end;
}
.theme-switch--sticky {
  position: sticky;
  top: var(--theme-switch-top);
  z-index: 60;
  align-self: flex-start;
}
.theme-switch--fixed {
  position: fixed;
  z-index: 80;
}
.theme-switch--floating {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 999;
}
@media (max-width: 640px) {
  .theme-switch {
    font-size: 11px;
  }
}
`;
    document.head.appendChild(style);
  };

  const buildSwitcher = () => {
    const wrapper = document.createElement("label");
    wrapper.className = "theme-switch";
    wrapper.setAttribute("aria-label", "Theme");

    const label = document.createElement("span");
    label.className = "theme-switch__label";
    label.textContent = "Theme";

    const caret = document.createElement("span");
    caret.className = "theme-switch__caret";

    const select = document.createElement("select");
    select.className = "theme-switch__select";
    select.setAttribute("name", "theme");
    select.setAttribute("aria-label", "Theme");

    options.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = option.value;
      opt.textContent = option.label;
      select.appendChild(opt);
    });

    select.addEventListener("change", () => {
      const value = select.value;
      safeSet(value);
      applyTheme(value);
      syncActive(wrapper, value);
    });

    caret.appendChild(select);
    wrapper.appendChild(label);
    wrapper.appendChild(caret);

    return wrapper;
  };

  const syncActive = (wrapper, value) => {
    const current = value || "system";
    const select = wrapper.querySelector("select");
    if (select) {
      select.value = current;
    }
  };

  const mountSwitcher = () => {
    if (document.querySelector(".theme-switch")) return;
    const wrapper = buildSwitcher();
    const isReadPost = Boolean(document.querySelector("main article.post"));

    const findHeaderTarget = () => {
      const targets = [
        "header .links",
        "header nav",
        ".header-right",
        ".site-header",
        "header"
      ];
      for (const selector of targets) {
        const el = document.querySelector(selector);
        if (el) return el;
      }
      return null;
    };

    if (isReadPost) {
      const headerTarget = findHeaderTarget();
      const ensurePlaceholder = (target) => {
        let placeholder = target.querySelector(".theme-switch-placeholder");
        if (!placeholder) {
          placeholder = document.createElement("span");
          placeholder.className = "theme-switch-placeholder";
          target.appendChild(placeholder);
        }
        return placeholder;
      };
      if (headerTarget) {
        headerTarget.appendChild(wrapper);
        wrapper.classList.add("theme-switch--header");
      } else {
        const header = document.querySelector("header");
        if (header) {
          header.appendChild(wrapper);
          wrapper.classList.add("theme-switch--header");
        }
      }

      const applyFixedPosition = (rect) => {
        const anchor =
          document.querySelector("main article.post") ||
          document.querySelector(".post") ||
          document.querySelector(".container");
        const anchorRect = anchor ? anchor.getBoundingClientRect() : null;
        const minInset = 8;
        const edgeGapValue = getComputedStyle(root).getPropertyValue("--theme-switch-edge-gap");
        const edgeGap = Number.parseFloat(edgeGapValue) || 12;
        const desiredLeft = anchorRect
          ? anchorRect.right - rect.width - edgeGap
          : rect.left;
        const left = Math.min(
          Math.max(minInset, desiredLeft),
          window.innerWidth - rect.width - minInset
        );
        const top = Math.max(minInset, rect.top);
        wrapper.style.left = `${left}px`;
        wrapper.style.top = `${top}px`;
      };

      const toFixed = () => {
        const rect = wrapper.getBoundingClientRect();
        const target = headerTarget || document.querySelector("header");
        if (target) {
          ensurePlaceholder(target);
        }
        wrapper.classList.remove("theme-switch--header");
        wrapper.classList.add("theme-switch--fixed");
        document.body.appendChild(wrapper);
        root.style.setProperty("--theme-switch-width", `${rect.width}px`);
        root.style.setProperty("--theme-switch-height", `${rect.height}px`);
        applyFixedPosition(rect);
      };

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
          requestAnimationFrame(toFixed);
        }, { once: true });
      } else {
        requestAnimationFrame(toFixed);
      }

      const onResize = () => {
        const rect = wrapper.getBoundingClientRect();
        root.style.setProperty("--theme-switch-width", `${rect.width}px`);
        root.style.setProperty("--theme-switch-height", `${rect.height}px`);
        applyFixedPosition(rect);
      };
      window.addEventListener("resize", onResize);
      window.addEventListener("orientationchange", onResize);

      syncActive(wrapper, safeGet());
      return;
    }

    const target = findHeaderTarget();
    if (target) {
      target.appendChild(wrapper);
      wrapper.classList.add("theme-switch--header");
    } else {
      wrapper.classList.add("theme-switch--floating");
      document.body.appendChild(wrapper);
    }

    syncActive(wrapper, safeGet());
  };

  const boot = () => {
    ensureStyles();
    mountSwitcher();

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    if (media.addEventListener) {
      media.addEventListener("change", () => {
        if (safeGet() === "system") {
          const wrapper = document.querySelector(".theme-switch");
          if (wrapper) syncActive(wrapper, "system");
        }
      });
    }
  };

  const stored = safeGet();
  applyTheme(stored);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
