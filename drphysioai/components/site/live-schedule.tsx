"use client";

import * as React from "react";
import {
  Radio, Clock, Users, Signal, CalendarPlus, X, Check, MessageCircle, ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  liveClassSchedule, liveClassCategories, site,
  type LiveClass, type LiveClassCategory,
} from "@/lib/content";
import { cn } from "@/lib/utils";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const DAY_LABEL: Record<string, string> = {
  Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday",
  Fri: "Friday", Sat: "Saturday", Sun: "Sunday",
};

export function LiveSchedule() {
  const [category, setCategory] = React.useState<LiveClassCategory>("All");
  const [joining, setJoining] = React.useState<LiveClass | null>(null);

  const filtered = React.useMemo(
    () =>
      category === "All"
        ? liveClassSchedule
        : liveClassSchedule.filter((c) => c.category === category),
    [category],
  );

  const byDay = React.useMemo(
    () =>
      DAYS.map((day) => ({
        day,
        classes: filtered.filter((c) => c.day === day),
      })).filter((d) => d.classes.length > 0),
    [filtered],
  );

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {liveClassCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-all",
              category === c
                ? "border-transparent bg-brand-gradient text-white shadow-glow"
                : "border-border bg-card text-muted-foreground hover:border-teal-500/40 hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Timetable */}
      <div className="mt-12 space-y-10">
        {byDay.map(({ day, classes }) => (
          <div key={day} className="grid gap-5 lg:grid-cols-[140px_1fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <h3 className="font-display text-lg font-bold">{DAY_LABEL[day]}</h3>
              <p className="text-sm text-muted-foreground">
                {classes.length} {classes.length === 1 ? "class" : "classes"}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {classes.map((c) => (
                <ClassCard key={`${c.day}-${c.time}`} c={c} onJoin={() => setJoining(c)} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {joining && <JoinDialog c={joining} onClose={() => setJoining(null)} />}
    </>
  );
}

function ClassCard({ c, onJoin }: { c: LiveClass; onJoin: () => void }) {
  const low = c.spots <= 6;
  return (
    <Card className="flex h-full flex-col p-5 card-hover">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-bold text-teal-700">
          <Clock className="h-3.5 w-3.5" /> {c.time}
        </span>
        {c.free && (
          <span className="rounded-full bg-teal-500/15 px-2.5 py-1 text-[11px] font-bold text-teal-600">
            Free monthly class
          </span>
        )}
      </div>

      <h4 className="mt-3 font-display text-base font-bold">{c.title}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{c.focus}</p>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Signal className="h-3.5 w-3.5 text-violet-500" /> {c.level}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Radio className="h-3.5 w-3.5 text-coral-500" /> {c.mins} min
        </span>
        <span className={cn("inline-flex items-center gap-1.5", low && "font-semibold text-coral-500")}>
          <Users className="h-3.5 w-3.5" />
          {low ? `Only ${c.spots} spots left` : `${c.spots} spots left`}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
        <span className="text-xs text-muted-foreground">with {c.instructor}</span>
        <Button size="sm" onClick={onJoin}>
          Reserve <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </Card>
  );
}

function JoinDialog({ c, onClose }: { c: LiveClass; onClose: () => void }) {
  const [done, setDone] = React.useState(false);

  // Lock scroll while the dialog is open.
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <Card
        className="relative w-full max-w-md p-6 shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>

        {done ? (
          <div className="py-4 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal-500/15 text-teal-600">
              <Check className="h-7 w-7" />
            </span>
            <h3 className="mt-4 font-display text-xl font-bold">Spot reserved 🎉</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {c.title} · {DAY_LABEL[c.day]} {c.time} IST
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Your one-tap join link + WhatsApp reminder will arrive before the class.
            </p>
            <Button className="mt-5 w-full" asChild>
              <a href="/signup">
                Finish sign-up <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        ) : (
          <>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-bold text-teal-700">
              <Radio className="h-3.5 w-3.5" /> Live class
            </span>
            <h3 className="mt-3 font-display text-xl font-bold">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.focus}</p>

            <dl className="mt-4 space-y-2.5 rounded-2xl bg-muted/60 p-4 text-sm">
              <Row label="When" value={`${DAY_LABEL[c.day]}, ${c.time} IST`} />
              <Row label="Duration" value={`${c.mins} minutes`} />
              <Row label="Level" value={c.level} />
              <Row label="Physiotherapist" value={c.instructor} />
              <Row
                label="Availability"
                value={c.spots <= 6 ? `Only ${c.spots} spots left` : `${c.spots} of ${c.capacity} open`}
              />
            </dl>

            <p className="mt-3 text-xs text-muted-foreground">
              {c.free
                ? "Included free with every DrPhysioAI membership — one free class each month."
                : "Included in Complete Care, or reserve a single seat at checkout."}
            </p>

            <Button className="mt-4 w-full" size="lg" onClick={() => setDone(true)}>
              <CalendarPlus className="h-4 w-4" /> Reserve my spot
            </Button>
            <a
              href={site.whatsappLink}
              className="mt-3 flex items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" /> Reserve via WhatsApp
            </a>
          </>
        )}
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}
