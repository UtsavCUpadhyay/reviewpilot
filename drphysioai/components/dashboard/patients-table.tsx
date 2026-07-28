"use client";

import * as React from "react";
import {
  Search, Plus, AlertTriangle, X, Brain, Dumbbell, MessageSquare,
  CalendarClock, FileText, ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  patients, patientStatuses, statusStyle, type Patient, type PatientStatus,
} from "@/lib/patients";
import { cn } from "@/lib/utils";

export function PatientsTable() {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<PatientStatus | null>(null);
  const [selected, setSelected] = React.useState<Patient | null>(null);

  const filtered = patients.filter((p) => {
    const q = query.trim().toLowerCase();
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.condition.toLowerCase().includes(q);
    return matchQ && (!status || p.status === status);
  });

  const counts = patientStatuses.map((s) => ({ s, n: patients.filter((p) => p.status === s).length }));

  return (
    <>
      {/* Stat chips */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {counts.map(({ s, n }) => (
          <Card key={s} className="p-4">
            <p className="font-display text-2xl font-extrabold">{n}</p>
            <span className={cn("mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-bold", statusStyle[s])}>{s}</span>
          </Card>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patients or conditions…"
            className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Chip label="All" active={!status} onClick={() => setStatus(null)} />
          {patientStatuses.map((s) => (
            <Chip key={s} label={s} active={status === s} onClick={() => setStatus(status === s ? null : s)} />
          ))}
        </div>
        <Button size="sm"><Plus className="h-4 w-4" /> Add patient</Button>
      </div>

      {/* Table */}
      <Card className="mt-4 overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="p-4 font-semibold">Patient</th>
                <th className="p-4 font-semibold">Condition</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Last visit</th>
                <th className="p-4 font-semibold">Next</th>
                <th className="p-4 text-right font-semibold">Outcome</th>
                <th className="p-4" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} onClick={() => setSelected(p)}
                  className="cursor-pointer border-b border-border transition-colors last:border-0 hover:bg-muted/40">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                        {p.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}
                      </span>
                      <div>
                        <p className="flex items-center gap-1.5 font-semibold">
                          {p.name}
                          {p.flag && <AlertTriangle className="h-3.5 w-3.5 text-coral-500" aria-label={p.flag} />}
                        </p>
                        <p className="text-xs text-muted-foreground">{p.age}{p.sex} · {p.clinician}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium">{p.condition}</p>
                    <span className="text-xs text-muted-foreground">{p.region}</span>
                  </td>
                  <td className="p-4"><span className={cn("rounded-full px-2.5 py-1 text-[11px] font-bold", statusStyle[p.status])}>{p.status}</span></td>
                  <td className="p-4 text-muted-foreground">{p.lastVisit}</td>
                  <td className="p-4 text-muted-foreground">{p.nextAppt ?? "—"}</td>
                  <td className="p-4 text-right">
                    <span className={cn("font-bold", p.outcome > 0 ? "text-teal-600" : "text-muted-foreground")}>
                      {p.outcome > 0 ? `+${p.outcome}%` : "—"}
                    </span>
                  </td>
                  <td className="p-4 text-right"><ChevronRight className="h-4 w-4 text-muted-foreground" /></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No patients match.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {selected && <PatientDrawer patient={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={cn("rounded-full border px-3 py-1.5 text-xs font-semibold transition-all",
        active ? "border-transparent bg-brand-gradient text-white shadow-glow" : "border-border bg-card text-muted-foreground hover:text-foreground")}>
      {label}
    </button>
  );
}

function PatientDrawer({ patient: p, onClose }: { patient: Patient; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-black/40" onClick={onClose}>
      <div className="h-full w-full max-w-md animate-fade-up overflow-y-auto bg-card p-6 shadow-card" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-gradient font-bold text-white">
              {p.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}
            </span>
            <div>
              <h3 className="font-display text-lg font-bold">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.age}{p.sex} · {p.region}</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-bold", statusStyle[p.status])}>{p.status}</span>
          <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">{p.condition}</span>
        </div>

        {p.flag && (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-coral-500/40 bg-coral-500/10 p-3 text-sm">
            <AlertTriangle className="h-4 w-4 shrink-0 text-coral-500" /> {p.flag}
          </div>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Info label="Last visit" value={p.lastVisit} icon={<FileText className="h-3.5 w-3.5" />} />
          <Info label="Next appt" value={p.nextAppt ?? "None"} icon={<CalendarClock className="h-3.5 w-3.5" />} />
        </div>

        {/* Outcomes */}
        <p className="mt-6 text-xs font-bold uppercase tracking-wider text-muted-foreground">Outcome measures</p>
        <div className="mt-3 space-y-3">
          {p.measures.map((m) => (
            <div key={m.name}>
              <div className="flex justify-between text-sm"><span className="font-semibold">{m.name}</span><span className="text-teal-600">{m.value}%</span></div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${m.value}%` }} />
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between rounded-xl bg-brand-soft p-3 text-sm">
            <span className="font-semibold">Improvement to date</span>
            <span className="font-display text-lg font-extrabold text-teal-600">{p.outcome > 0 ? `+${p.outcome}%` : "—"}</span>
          </div>
        </div>

        {/* Quick actions */}
        <p className="mt-6 text-xs font-bold uppercase tracking-wider text-muted-foreground">Quick actions</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button size="sm" asChild><a href="/assistant"><Brain className="h-4 w-4" /> New assessment</a></Button>
          <Button size="sm" variant="outline" asChild><a href="/exercises"><Dumbbell className="h-4 w-4" /> Prescribe</a></Button>
          <Button size="sm" variant="outline" asChild><a href="/assistant"><FileText className="h-4 w-4" /> Draft note</a></Button>
          <Button size="sm" variant="outline"><MessageSquare className="h-4 w-4" /> Message</Button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border p-3">
      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{icon} {label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
