"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { getDict, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function FAQ({ locale = "en" }: { locale?: Locale }) {
  const [open, setOpen] = React.useState<number | null>(0);
  const t = getDict(locale).home.faq;

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-page max-w-3xl">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />

        <div className="mt-12 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card/60 shadow-soft backdrop-blur">
          {t.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold">{f.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                      isOpen && "rotate-180 text-teal-600",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
