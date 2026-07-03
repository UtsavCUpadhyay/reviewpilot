"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

/** Dark / light toggle that persists to localStorage and respects OS setting. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem("dpa-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("dpa-theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-foreground backdrop-blur transition-colors hover:bg-muted ${className}`}
    >
      <Sun className="h-[1.15rem] w-[1.15rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.15rem] w-[1.15rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
