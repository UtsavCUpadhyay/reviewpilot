import type { Metadata } from "next";
import {
  Users, CalendarClock, FileText, TrendingUp, ArrowRight, Video, MapPin,
  Brain, ClipboardCheck, AlertTriangle, Clock, Dumbbell,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Practice Dashboard",
  description: "Clinician practice dashboard — caseload, appointments, documentation queue and outcomes.",
  robots: { index: false, follow: false },
};

const kpis = [
  { icon: Users, label: "Active patients", value: "48", sub: "6 new this week", tone: "teal" },
  { icon: CalendarClock, label: "Today's appointments", value: "9", sub: "2 telehealth", tone: "violet" },
  { icon: FileText, label: "Notes to finalise", value: "5", sub: "action needed", tone: "amber" },
  { icon: TrendingUp, label: "Avg outcome ↑", value: "+34%", sub: "last 90 days", tone: "teal" },
];

const toneMap: Record<string, string> = {
  teal: "bg-teal-500/15 text-teal-600",
  violet: "bg-violet-500/15 text-violet-600",
  amber: "bg-amber-500/15 text-amber-600",
  coral: "bg-coral-500/15 text-coral-500",
};

const schedule = [
  { time: "09:00", name: "Ananya R.", type: "Initial assessment", mode: "clinic", tag: "Knee" },
  { time: "10:00", name: "Rakesh M.", type: "Follow-up", mode: "video", tag: "Post-op knee" },
  { time: "11:30", name: "Priya S.", type: "Review + outcome", mode: "clinic", tag: "Low back" },
  { time: "14:00", name: "Sunil K.", type: "Follow-up", mode: "video", tag: "Shoulder" },
  { time: "15:30", name: "Meera D.", type: "Initial assessment", mode: "clinic", tag: "Neck" },
];

const docQueue = [
  { name: "Ananya R.", doc: "Initial assessment", due: "Due today", urgent: true },
  { name: "Rakesh M.", doc: "Progress note", due: "Due today", urgent: true },
  { name: "Vikram P.", doc: "Discharge report", due: "2 days", urgent: false },
  { name: "Sana Q.", doc: "Insurance letter", due: "3 days", urgent: false },
];

const outcomes = [
  { measure: "NPRS (pain)", value: 72 },
  { measure: "LEFS", value: 61 },
  { measure: "PSFS", value: 80 },
  { measure: "Oswestry ↓", value: 54 },
];

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Good morning, Dr. Utsav 👋
          </h1>
          <p className="mt-1 text-muted-foreground">
            9 patients today · 5 notes waiting to be finalised.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild><a href="/assistant"><Brain className="h-4 w-4" /> New assessment</a></Button>
          <Button variant="outline" asChild><a href="/exercises"><Dumbbell className="h-4 w-4" /> Prescribe</a></Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label} className="p-5">
            <span className={cn("grid h-10 w-10 place-items-center rounded-xl", toneMap[k.tone])}>
              <k.icon className="h-5 w-5" />
            </span>
            <p className="mt-4 font-display text-3xl font-extrabold tracking-tight">{k.value}</p>
            <p className="text-sm font-semibold">{k.label}</p>
            <p className="text-xs text-muted-foreground">{k.sub}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Today's schedule */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Today&apos;s schedule</h2>
            <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:underline">
              Full calendar <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="mt-4 divide-y divide-border">
            {schedule.map((s) => (
              <div key={s.time} className="flex items-center gap-4 py-3">
                <div className="w-14 shrink-0 text-sm font-bold tabular-nums">{s.time}</div>
                <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  s.mode === "video" ? "bg-violet-500/15 text-violet-600" : "bg-teal-500/15 text-teal-600")}>
                  {s.mode === "video" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.type}</p>
                </div>
                <span className="hidden rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground sm:inline">{s.tag}</span>
                <Button size="sm" variant="outline" asChild><a href="/assistant">Open</a></Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Documentation queue */}
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-teal-600" />
            <h2 className="font-display text-lg font-bold">Documentation</h2>
            <span className="ml-auto rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold text-amber-600">5 pending</span>
          </div>
          <div className="mt-4 space-y-2.5">
            {docQueue.map((d) => (
              <div key={d.name + d.doc} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg",
                  d.urgent ? "bg-coral-500/15 text-coral-500" : "bg-muted text-muted-foreground")}>
                  {d.urgent ? <AlertTriangle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{d.doc}</p>
                  <p className="text-xs text-muted-foreground">{d.name} · {d.due}</p>
                </div>
                <ClipboardCheck className="h-4 w-4 text-teal-600" />
              </div>
            ))}
          </div>
          <Button className="mt-4 w-full" size="sm" asChild><a href="/assistant">Finalise notes</a></Button>
        </Card>
      </div>

      {/* Outcomes snapshot */}
      <Card className="mt-6 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-teal-600" />
            <h2 className="font-display text-lg font-bold">Outcome measures — caseload average</h2>
          </div>
          <span className="text-xs text-muted-foreground">last 90 days</span>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((o) => (
            <div key={o.measure}>
              <div className="flex items-end justify-between">
                <span className="text-sm font-semibold">{o.measure}</span>
                <span className="text-sm font-bold text-teal-600">{o.value}%</span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${o.value}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          Illustrative demo data. Connect your caseload to populate real, per-patient outcome trends.
        </p>
      </Card>
    </DashboardShell>
  );
}
