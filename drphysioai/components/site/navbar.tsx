"use client";

import * as React from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/content";
import { getDict, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Navbar({ locale = "en" }: { locale?: Locale }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const d = getDict(locale);
  const nav = [
    { label: d.nav.aiLearning, href: "/ai" },
    { label: d.nav.consultation, href: "/consultation" },
    { label: d.nav.conditions, href: "/conditions" },
    { label: d.nav.exercise, href: "/exercises" },
    { label: d.nav.liveClasses, href: "/live-classes" },
    { label: d.nav.blog, href: "/blog" },
    { label: d.nav.pricing, href: "/#pricing" },
  ];

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="container-page">
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
            scrolled ? "glass shadow-soft" : "bg-transparent",
          )}
        >
          <a href="/" aria-label="DrPhysioAI home">
            <Logo />
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} className="hidden sm:block" />
            <ThemeToggle className="hidden sm:inline-flex" />
            <Button variant="outline" size="sm" className="hidden md:inline-flex" asChild>
              <a href="/login">{d.actions.login}</a>
            </Button>
            <Button size="sm" className="hidden sm:inline-flex" asChild>
              <a href="/signup">{d.actions.startFree}</a>
            </Button>
            <button
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/60 lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="container-page lg:hidden">
          <div className="mt-2 animate-fade-up rounded-2xl glass p-4 shadow-card">
            <div className="flex flex-col gap-1">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
              <ThemeToggle />
              <LanguageSwitcher locale={locale} />
              <Button className="flex-1" asChild>
                <a href={site.whatsappLink} onClick={() => setOpen(false)}>
                  <MessageCircle className="h-4 w-4" /> {d.actions.whatsapp}
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
