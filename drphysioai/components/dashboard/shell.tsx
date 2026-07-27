"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, CalendarDays, Brain, FileText,
  Dumbbell, TrendingUp, CreditCard, Settings, Menu, X, Bell, Search,
} from "lucide-react";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Users, label: "Patients", href: "/patients" },
  { icon: CalendarDays, label: "Appointments", href: "#" },
  { icon: Brain, label: "Assessments", href: "/assistant" },
  { icon: FileText, label: "Documentation", href: "/assistant" },
  { icon: Dumbbell, label: "Exercise Library", href: "/exercises" },
  { icon: TrendingUp, label: "Outcomes", href: "#" },
  { icon: CreditCard, label: "Billing", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

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
          {navItems.map((item) => {
            const active = item.href !== "#" && pathname === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-soft text-teal-700 dark:text-teal-300"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="h-[1.15rem] w-[1.15rem]" /> {item.label}
              </a>
            );
          })}
        </nav>

        <div className="absolute inset-x-3 bottom-4 rounded-2xl bg-brand-gradient p-4 text-white">
          <p className="text-sm font-bold">Trial · 5 days left</p>
          <p className="mt-1 text-xs text-white/85">Upgrade to keep your caseload & notes.</p>
          <a
            href="/#pricing"
            className="mt-3 inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-bold text-teal-700"
          >
            See plans
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
              placeholder="Search patients, notes, assessments…"
              className="h-10 w-full rounded-full border border-input bg-background pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <button className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card" aria-label="Notifications">
              <Bell className="h-[1.15rem] w-[1.15rem]" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-coral-500" />
            </button>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-gradient font-bold text-white">U</span>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
