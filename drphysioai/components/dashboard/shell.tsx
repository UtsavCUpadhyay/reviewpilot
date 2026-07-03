"use client";

import * as React from "react";
import {
  LayoutDashboard, Sparkles, CalendarDays, Activity, FileText,
  Trophy, Bookmark, CreditCard, Settings, Menu, X, Bell, Search, LogOut,
} from "lucide-react";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: Sparkles, label: "AI Learning" },
  { icon: CalendarDays, label: "Consultations" },
  { icon: Activity, label: "Exercise Programs" },
  { icon: Trophy, label: "Achievements" },
  { icon: FileText, label: "Reports" },
  { icon: Bookmark, label: "Bookmarks" },
  { icon: CreditCard, label: "Payments" },
  { icon: Settings, label: "Settings" },
];

export function DashboardShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: { name: string; email?: string | null };
}) {
  const [open, setOpen] = React.useState(false);
  const initial = (user?.name || "A").trim().charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <a href="/"><Logo /></a>
          <button className="lg:hidden" aria-label="Close menu" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="space-y-1 px-3 py-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                item.active
                  ? "bg-brand-soft text-teal-700 dark:text-teal-300"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-[1.15rem] w-[1.15rem]" /> {item.label}
            </a>
          ))}
        </nav>

        <div className="absolute inset-x-3 bottom-4 rounded-2xl bg-brand-gradient p-4 text-white">
          <p className="text-sm font-bold">Go Ultimate</p>
          <p className="mt-1 text-xs text-white/85">Unlimited AI, OSCE & case studies.</p>
          <a
            href="/#pricing"
            className="mt-3 inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-bold text-teal-700"
          >
            Upgrade ₹499/mo
          </a>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur sm:px-6">
          <button className="lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative hidden max-w-sm flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search notes, topics, exercises…"
              className="h-10 w-full rounded-full border border-input bg-background pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <button className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card" aria-label="Notifications">
              <Bell className="h-[1.15rem] w-[1.15rem]" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-coral-500" />
            </button>
            <span
              title={user?.email ?? undefined}
              className="grid h-10 w-10 place-items-center rounded-full bg-brand-gradient font-bold text-white"
            >
              {initial}
            </span>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                aria-label="Sign out"
                title="Sign out"
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <LogOut className="h-[1.15rem] w-[1.15rem]" />
              </button>
            </form>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
