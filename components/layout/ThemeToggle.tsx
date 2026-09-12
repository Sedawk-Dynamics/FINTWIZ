"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export const THEME_KEY = "fintwiz-theme";

type Choice = "light" | "dark";

/**
 * Theme control.
 *
 * The palette itself is pure CSS: every token is a `light-dark()` pair and the
 * system preference resolves before first paint with no JavaScript at all.
 * This component only handles an explicit override, which it applies by setting
 * `data-theme` on <html>.
 *
 * There is no pre-hydration bootstrap script. Rendering a <script> from a React
 * component breaks hydration in React 19, and the only thing such a script
 * bought us was the stored override, which affects a minority of visitors and
 * is applied in a layout effect before paint.
 *
 * The DOM is the single source of truth, read through useSyncExternalStore, so
 * the button state can never drift from the palette on screen.
 */

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
}

function getSnapshot(): boolean {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === "dark") return true;
  if (explicit === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/** The server cannot know the visitor's system setting or stored choice. */
function getServerSnapshot(): boolean {
  return false;
}

function readStored(): Choice | null {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
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

  // Restore a stored override before the browser paints the hydrated tree.
  // Visitors who have never used the toggle skip this entirely, because CSS
  // has already resolved their system preference.
  React.useLayoutEffect(() => {
    const stored = readStored();
    if (stored) document.documentElement.dataset.theme = stored;
  }, []);

  const toggle = React.useCallback(() => {
    const next: Choice = getSnapshot() ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
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
