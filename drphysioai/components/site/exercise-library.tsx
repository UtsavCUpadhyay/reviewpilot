"use client";

import * as React from "react";
import { CheckCircle2, Circle, Flame, Clock, Repeat, Trophy, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { exercises, exerciseCategories, type ExerciseCategory } from "@/lib/exercises";
import { cn } from "@/lib/utils";

type Progress = {
  done: string[]; // slugs completed today
  day: string; // YYYY-MM-DD of `done`
  streak: number;
  lastActive: string; // YYYY-MM-DD the streak was last advanced
  total: number; // lifetime completions
};

const KEY = "dpa_exercise_progress_v1";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}
function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);
}

function load(): Progress {
  if (typeof window === "undefined") return { done: [], day: today(), streak: 0, lastActive: "", total: 0 };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) throw new Error("empty");
    const p = JSON.parse(raw) as Progress;
    // Reset today's completed list if the stored day is stale.
    if (p.day !== today()) p.done = [];
    p.day = today();
    return p;
  } catch {
    return { done: [], day: today(), streak: 0, lastActive: "", total: 0 };
  }
}

export function ExerciseLibrary() {
  const [filter, setFilter] = React.useState<ExerciseCategory | "All">("All");
  const [progress, setProgress] = React.useState<Progress>(() => ({
    done: [],
    day: today(),
    streak: 0,
    lastActive: "",
    total: 0,
  }));
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setProgress(load());
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (hydrated && typeof window !== "undefined") {
      window.localStorage.setItem(KEY, JSON.stringify(progress));
    }
  }, [progress, hydrated]);

  function toggle(slug: string) {
    setProgress((p) => {
      const isDone = p.done.includes(slug);
      const done = isDone ? p.done.filter((s) => s !== slug) : [...p.done, slug];
      let { streak, lastActive, total } = p;

      if (!isDone) {
        total += 1;
        // Advance the streak the first time an exercise is completed today.
        if (lastActive !== today()) {
          const gap = lastActive ? daysBetween(lastActive, today()) : Infinity;
          streak = gap === 1 ? streak + 1 : 1;
          lastActive = today();
        }
      } else {
        total = Math.max(0, total - 1);
      }
      return { ...p, done, streak, lastActive, total };
    });
  }

  const list = filter === "All" ? exercises : exercises.filter((e) => e.category === filter);
  const doneToday = progress.done.length;

  return (
    <div className="space-y-8">
      {/* Progress dashboard */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Flame} tone="text-orange-500" label="Day streak" value={hydrated ? progress.streak : 0} sub={progress.streak === 1 ? "day in a row" : "days in a row"} />
        <StatCard icon={Target} tone="text-teal-500" label="Done today" value={hydrated ? doneToday : 0} sub={`of ${exercises.length} exercises`} />
        <StatCard icon={Trophy} tone="text-violet-500" label="Lifetime" value={hydrated ? progress.total : 0} sub="exercises completed" />
      </div>

      {hydrated && doneToday > 0 && (
        <p className="flex items-center justify-center gap-2 rounded-xl bg-brand-soft px-4 py-3 text-sm font-semibold text-foreground">
          <Flame className="h-4 w-4 text-orange-500" />
          {doneToday === exercises.length
            ? "Incredible — every exercise done today! 🎉"
            : `Great work — ${doneToday} done today. Keep the streak alive!`}
        </p>
      )}

      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {(["All", ...exerciseCategories] as const).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all",
              filter === c
                ? "border-transparent bg-brand-gradient text-white shadow-glow"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Exercise cards */}
      <div className="grid gap-5 md:grid-cols-2">
        {list.map((ex) => {
          const isDone = progress.done.includes(ex.slug);
          return (
            <Card key={ex.slug} className={cn("p-5 transition-shadow", isDone && "ring-1 ring-teal-500/40")}>
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-soft text-xl">
                  {ex.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-bold">{ex.name}</h3>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                      {ex.level}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{ex.target}</p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-teal-500" /> {ex.durationMin} min</span>
                <span className="inline-flex items-center gap-1"><Repeat className="h-3.5 w-3.5 text-teal-500" /> {ex.reps}</span>
                <span className="inline-flex items-center gap-1"><Target className="h-3.5 w-3.5 text-teal-500" /> {ex.category}</span>
              </div>

              <ol className="mt-3 space-y-1.5 text-sm text-foreground/90">
                {ex.steps.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-soft text-[10px] font-bold text-teal-600">
                      {i + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>

              <p className="mt-3 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                <strong className="font-semibold text-foreground/80">Tip:</strong> {ex.cue}
              </p>

              <button
                onClick={() => toggle(ex.slug)}
                className={cn(
                  "mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all",
                  isDone
                    ? "bg-teal-500/10 text-teal-600"
                    : "bg-brand-gradient text-white shadow-glow hover:opacity-95",
                )}
              >
                {isDone ? (
                  <><CheckCircle2 className="h-4 w-4" /> Completed today</>
                ) : (
                  <><Circle className="h-4 w-4" /> Mark as done</>
                )}
              </button>
            </Card>
          );
        })}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Your progress is saved privately on this device. Sign in soon to sync across devices.
      </p>
    </div>
  );
}

function StatCard({
  icon: Icon,
  tone,
  label,
  value,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
  label: string;
  value: number;
  sub: string;
}) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-muted/60", tone)}>
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-2xl font-extrabold leading-none">{value}</p>
        <p className="mt-1 text-xs font-semibold">{label}</p>
        <p className="text-[11px] text-muted-foreground">{sub}</p>
      </div>
    </Card>
  );
}
