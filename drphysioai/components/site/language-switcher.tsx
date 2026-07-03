"use client";

import * as React from "react";
import { Globe, Check } from "lucide-react";
import {
  locales, localeNames, localeShort, LOCALE_COOKIE, type Locale,
} from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Language picker — sets the `locale` cookie and reloads to re-render in it. */
export function LanguageSwitcher({ locale, className }: { locale: Locale; className?: string }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function choose(l: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
    setOpen(false);
    window.location.reload();
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        aria-expanded={open}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 text-sm font-semibold transition-colors hover:bg-muted"
      >
        <Globe className="h-4 w-4" /> {localeShort[locale]}
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-2xl border border-border bg-card p-1 shadow-card">
          {locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => choose(l)}
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors hover:bg-muted",
                l === locale ? "font-bold text-teal-600" : "text-foreground",
              )}
            >
              {localeNames[l]} {l === locale && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
