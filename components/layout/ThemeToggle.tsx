"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export const THEME_KEY = "fintwiz-theme";

/**
 * Runs before paint, so the correct theme is applied on the very first frame
 * and there is no flash of the wrong palette. Injected in the document head.
 */
export const themeInitScript = `(function(){try{var k="${THEME_KEY}";var s=localStorage.getItem(k);var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");document.documentElement.style.colorScheme=d?"dark":"light";}catch(e){}})();`;

/**
 * The document element is the source of truth for the theme, because the
 * pre-paint script above sets it before React exists. Reading it through
 * useSyncExternalStore keeps that single source rather than mirroring it into
 * component state, and gives a correct server snapshot during hydration.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

/** The server cannot know the visitor's stored preference. */
function getServerSnapshot() {
  return false;
}

export function ThemeToggle({
  className,
  onField = false,
}: {
  className?: string;
  onField?: boolean;
}) {
  const isDark = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const toggle = React.useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      // Storage is unavailable in some private modes. The toggle still works
      // for this page view, it just will not persist.
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      className={cn(
        "relative inline-flex size-9 items-center justify-center rounded-md border",
        "transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        onField
          ? "border-field-border text-field-muted hover:border-field-foreground hover:text-field-foreground"
          : "border-border text-slate hover:border-ink hover:text-ink",
        className,
      )}
    >
      <Sun
        aria-hidden="true"
        className={cn(
          "absolute size-[1.05rem] transition-all duration-300",
          isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-50 -rotate-90 opacity-0",
        )}
      />
      <Moon
        aria-hidden="true"
        className={cn(
          "absolute size-[1.05rem] transition-all duration-300",
          isDark
            ? "scale-50 rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100",
        )}
      />
    </button>
  );
}
