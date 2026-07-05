import { useCallback, useEffect, useState } from "react";

function applyTheme(next) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {
    /* storage unavailable — non-fatal */
  }
}

/**
 * Reads the theme set pre-paint by the inline script in index.html. Writers
 * update the <html data-theme> attribute directly; a MutationObserver keeps
 * every hook instance (Nav, Terminal, …) in sync with that single source.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      const next = root.getAttribute("data-theme") || "dark";
      setThemeState((current) => (current === next ? current : next));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const set = useCallback((next) => {
    if (next !== "dark" && next !== "light") return;
    applyTheme(next);
    setThemeState(next);
  }, []);

  const toggle = useCallback(() => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    setThemeState(next);
  }, []);

  return { theme, toggle, set };
}
