"use client";

import * as React from "react";
import {
  Search, Plus, Check, X, ChevronDown, Printer, ClipboardList, Trash2, Dumbbell,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  exercises, exerciseRegions, exerciseCategories, type Exercise,
} from "@/lib/exercises";
import { cn } from "@/lib/utils";

type Item = { id: string; sets: number; reps: string; frequency: string };

const levelStyle: Record<string, string> = {
  Beginner: "bg-teal-500/15 text-teal-700 dark:text-teal-300",
  Intermediate: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  Advanced: "bg-violet-500/15 text-violet-600 dark:text-violet-300",
};

export function ExerciseLibrary() {
  const [query, setQuery] = React.useState("");
  const [region, setRegion] = React.useState<string | null>(null);
  const [category, setCategory] = React.useState<string | null>(null);
  const [program, setProgram] = React.useState<Item[]>([]);
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const [handout, setHandout] = React.useState(false);

  const filtered = exercises.filter((e) => {
    const q = query.trim().toLowerCase();
    const matchQ = !q || e.name.toLowerCase().includes(q) || e.purpose.toLowerCase().includes(q);
    return matchQ && (!region || e.region === region) && (!category || e.category === category);
  });

  const inProgram = (id: string) => program.some((p) => p.id === id);

  function add(e: Exercise) {
    if (inProgram(e.id)) { setProgram((p) => p.filter((x) => x.id !== e.id)); return; }
    setProgram((p) => [...p, { id: e.id, ...e.dosage }]);
  }
  function update(id: string, key: keyof Omit<Item, "id">, val: string) {
    setProgram((p) => p.map((x) => (x.id === id ? { ...x, [key]: key === "sets" ? Number(val) || 0 : val } : x)));
  }
  const byId = (id: string) => exercises.find((e) => e.id === id)!;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      {/* Library */}
      <div>
        {/* Search + filters */}
        <div className="rounded-2xl border border-border bg-card/60 p-4 shadow-soft backdrop-blur">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search exercises (e.g. quads, balance, nerve)…"
              className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <FilterChip label="All regions" active={!region} onClick={() => setRegion(null)} />
            {exerciseRegions.map((r) => (
              <FilterChip key={r} label={r} active={region === r} onClick={() => setRegion(region === r ? null : r)} />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <FilterChip label="All types" active={!category} onClick={() => setCategory(null)} tone="violet" />
            {exerciseCategories.map((c) => (
              <FilterChip key={c} label={c} active={category === c} onClick={() => setCategory(category === c ? null : c)} tone="violet" />
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">{filtered.length} exercise{filtered.length !== 1 && "s"}</p>

        <div className="mt-3 space-y-3">
          {filtered.map((e) => (
            <Card key={e.id} className="p-4">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-teal-600">
                  <Dumbbell className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-base font-bold">{e.name}</h3>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">{e.region}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">{e.category}</span>
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", levelStyle[e.level])}>{e.level}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{e.purpose}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{e.dosage.sets} × {e.dosage.reps} · {e.dosage.frequency}</span>
                    <button onClick={() => setExpanded(expanded === e.id ? null : e.id)}
                      className="inline-flex items-center gap-1 font-semibold text-teal-600 hover:underline">
                      Details <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", expanded === e.id && "rotate-180")} />
                    </button>
                  </div>
                </div>
                <Button size="sm" variant={inProgram(e.id) ? "outline" : "primary"} onClick={() => add(e)}>
                  {inProgram(e.id) ? <><Check className="h-3.5 w-3.5" /> Added</> : <><Plus className="h-3.5 w-3.5" /> Add</>}
                </Button>
              </div>

              {expanded === e.id && (
                <div className="mt-4 grid gap-4 border-t border-border pt-4 text-sm sm:grid-cols-2">
                  <Detail title="Instructions" items={e.instructions} ordered />
                  <Detail title="Indications" items={e.indications} />
                  <Detail title="Contraindications" items={e.contraindications} tone="coral" />
                  <Detail title="Progressions" items={e.progressions} />
                  <Detail title="Regressions" items={e.regressions} />
                  <Detail title="Common errors" items={e.commonErrors} tone="amber" />
                  <p className="text-xs text-muted-foreground sm:col-span-2"><span className="font-semibold text-foreground">Equipment:</span> {e.equipment}</p>
                </div>
              )}
            </Card>
          ))}
          {filtered.length === 0 && (
            <Card className="p-8 text-center text-sm text-muted-foreground">No exercises match those filters.</Card>
          )}
        </div>
      </div>

      {/* Program builder */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <Card className="p-5 shadow-card">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-teal-600" />
            <h3 className="font-display text-base font-bold">Program</h3>
            <span className="ml-auto rounded-full bg-brand-gradient px-2.5 py-0.5 text-xs font-bold text-white">{program.length}</span>
          </div>

          {program.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Add exercises to build a prescription. Adjust dosage per patient, then export a handout.</p>
          ) : (
            <>
              <div className="mt-4 space-y-3">
                {program.map((it) => {
                  const e = byId(it.id);
                  return (
                    <div key={it.id} className="rounded-xl border border-border p-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold leading-tight">{e.name}</p>
                        <button onClick={() => add(e)} aria-label="Remove" className="text-muted-foreground hover:text-coral-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-2 grid grid-cols-3 gap-1.5">
                        <DoseInput label="Sets" value={String(it.sets)} onChange={(v) => update(it.id, "sets", v)} />
                        <DoseInput label="Reps" value={it.reps} onChange={(v) => update(it.id, "reps", v)} />
                        <DoseInput label="Freq" value={it.frequency} onChange={(v) => update(it.id, "frequency", v)} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1" onClick={() => setHandout(true)}>
                  <Printer className="h-3.5 w-3.5" /> Patient handout
                </Button>
                <Button size="sm" variant="outline" onClick={() => setProgram([])}>Clear</Button>
              </div>
            </>
          )}
        </Card>
      </div>

      {handout && (
        <HandoutModal program={program} byId={byId} onClose={() => setHandout(false)} />
      )}
    </div>
  );
}

function FilterChip({ label, active, onClick, tone = "teal" }: { label: string; active: boolean; onClick: () => void; tone?: "teal" | "violet" }) {
  return (
    <button onClick={onClick}
      className={cn("rounded-full border px-3 py-1 text-xs font-semibold transition-all",
        active
          ? tone === "teal" ? "border-transparent bg-brand-gradient text-white shadow-glow" : "border-violet-500 bg-violet-500/15 text-violet-600"
          : "border-border bg-card text-muted-foreground hover:text-foreground")}>
      {label}
    </button>
  );
}

function Detail({ title, items, ordered, tone }: { title: string; items: string[]; ordered?: boolean; tone?: "coral" | "amber" }) {
  return (
    <div>
      <p className={cn("text-[11px] font-bold uppercase tracking-wider",
        tone === "coral" ? "text-coral-500" : tone === "amber" ? "text-amber-600" : "text-muted-foreground")}>{title}</p>
      <ul className="mt-1.5 space-y-1 text-xs text-foreground/90">
        {items.map((x, i) => <li key={x}>{ordered ? `${i + 1}. ` : "• "}{x}</li>)}
      </ul>
    </div>
  );
}

function DoseInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-0.5 block text-[10px] font-bold uppercase text-muted-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)}
        className="h-8 w-full rounded-lg border border-input bg-background px-2 text-xs outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}

function HandoutModal({ program, byId, onClose }: { program: Item[]; byId: (id: string) => Exercise; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/50 p-4 print:bg-white print:p-0">
      {/* print rule: show only the handout */}
      <style>{`@media print{body *{visibility:hidden}#dpa-handout,#dpa-handout *{visibility:visible}#dpa-handout{position:absolute;inset:0;margin:0;box-shadow:none;border:0}.no-print{display:none!important}}`}</style>
      <div id="dpa-handout" className="my-6 w-full max-w-2xl rounded-3xl bg-white p-8 text-slate-900 shadow-card">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-teal-600">DrPhysioAI · Home Exercise Program</p>
            <h2 className="mt-1 font-display text-2xl font-extrabold">Your exercise plan</h2>
            <p className="text-sm text-slate-500">Prescribed by your physiotherapist · {new Date().toLocaleDateString("en-IN")}</p>
          </div>
          <button onClick={onClose} className="no-print grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        <ol className="mt-6 space-y-4">
          {program.map((it, i) => {
            const e = byId(it.id);
            return (
              <li key={it.id} className="flex gap-3 border-b border-slate-100 pb-4">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal-500/15 text-sm font-bold text-teal-700">{i + 1}</span>
                <div>
                  <p className="font-bold">{e.name}</p>
                  <p className="text-sm text-slate-600">{e.dosage && `${it.sets} sets × ${it.reps} · ${it.frequency}`}</p>
                  <p className="mt-1 text-sm text-slate-600">{e.instructions[0]} {e.instructions[1] ? `Then: ${e.instructions[1].toLowerCase()}.` : ""}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-6 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
          Stop and contact your physiotherapist if you get sharp, worsening, or new symptoms. This plan was prescribed for you — do not share it. It does not replace professional medical advice.
        </p>

        <div className="no-print mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={() => window.print()}><Printer className="h-4 w-4" /> Print / Save PDF</Button>
        </div>
      </div>
    </div>
  );
}
