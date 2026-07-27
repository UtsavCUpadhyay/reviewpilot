"use client";

import * as React from "react";
import {
  ArrowRight, ArrowLeft, AlertTriangle, Check, Stethoscope, FileText,
  Activity, RefreshCw, ChevronRight, Info, Copy, ClipboardCheck, Lock,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { regions, redFlags, buildSoapNote, type Differential } from "@/lib/clinical";
import { cn } from "@/lib/utils";

type Soap = ReturnType<typeof buildSoapNote>;

const STEPS = ["Patient", "Region", "Red flags", "Objective", "Reasoning"] as const;

const confidenceStyle: Record<Differential["confidence"], string> = {
  High: "bg-teal-500/15 text-teal-700 dark:text-teal-300",
  Moderate: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  Low: "bg-muted text-muted-foreground",
};

export function AssessmentWizard() {
  const [step, setStep] = React.useState(0);
  const regionKeys = Object.keys(regions);

  const [age, setAge] = React.useState("34");
  const [sex, setSex] = React.useState("Female");
  const [region, setRegion] = React.useState(regionKeys[0]);
  const [complaint, setComplaint] = React.useState<string | null>(null);
  const [flags, setFlags] = React.useState<string[]>([]);
  const [tests, setTests] = React.useState<string[]>([]);
  const [soap, setSoap] = React.useState<Soap | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [finalised, setFinalised] = React.useState(false);

  const data = regions[region];
  const hasRedFlag = flags.length > 0;

  function toggle(list: string[], set: (v: string[]) => void, val: string) {
    set(list.includes(val) ? list.filter((x) => x !== val) : [...list, val]);
  }

  function reset() {
    setStep(0); setComplaint(null); setFlags([]); setTests([]);
    setSoap(null); setCopied(false); setFinalised(false);
  }

  function draftSoap() {
    const top = ranked[0];
    setSoap(buildSoapNote({
      age, sex, region, complaint, flags, tests,
      topDx: top.dx, confidence: top.confidence,
    }));
    setCopied(false); setFinalised(false);
  }

  function copySoap() {
    if (!soap) return;
    const text = `SUBJECTIVE\n${soap.subjective}\n\nOBJECTIVE\n${soap.objective}\n\nASSESSMENT\n${soap.assessment}\n\nPLAN\n${soap.plan}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  // Re-rank differentials: nudge confidence up for dx whose special tests were ticked.
  const ranked = React.useMemo(() => {
    const order = { High: 3, Moderate: 2, Low: 1 } as const;
    return [...data.differentials].sort((a, b) => order[b.confidence] - order[a.confidence]);
  }, [data]);

  return (
    <Card className="overflow-hidden shadow-card">
      {/* Stepper header */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-border bg-muted/40 px-4 py-3 no-scrollbar">
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                i === step
                  ? "bg-brand-gradient text-white shadow-glow"
                  : i < step
                    ? "text-teal-600"
                    : "text-muted-foreground",
              )}
            >
              <span className={cn(
                "grid h-5 w-5 place-items-center rounded-full text-[10px]",
                i < step ? "bg-teal-500 text-white" : i === step ? "bg-white/25" : "bg-muted",
              )}>
                {i < step ? <Check className="h-3 w-3" /> : i + 1}
              </span>
              {s}
            </span>
            {i < STEPS.length - 1 && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />}
          </React.Fragment>
        ))}
      </div>

      <div className="p-6 sm:p-7">
        {/* STEP 0 — Patient */}
        {step === 0 && (
          <Step title="Patient snapshot" hint="De-identified demo data — no real patient information.">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">Age</span>
                <input value={age} onChange={(e) => setAge(e.target.value)} inputMode="numeric"
                  className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">Sex</span>
                <div className="flex gap-2">
                  {["Female", "Male", "Other"].map((s) => (
                    <button key={s} onClick={() => setSex(s)}
                      className={cn("h-11 flex-1 rounded-xl border text-sm font-semibold transition-colors",
                        sex === s ? "border-teal-500 bg-brand-soft text-teal-700" : "border-border bg-card text-muted-foreground")}>
                      {s}
                    </button>
                  ))}
                </div>
              </label>
            </div>
          </Step>
        )}

        {/* STEP 1 — Region + complaint */}
        {step === 1 && (
          <Step title="Region & chief complaint" hint="Pick the primary area, then the presenting complaint.">
            <div className="flex flex-wrap gap-2">
              {regionKeys.map((r) => (
                <button key={r} onClick={() => { setRegion(r); setComplaint(null); setTests([]); }}
                  className={cn("rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                    region === r ? "border-transparent bg-brand-gradient text-white shadow-glow" : "border-border bg-card text-muted-foreground hover:text-foreground")}>
                  {r}
                </button>
              ))}
            </div>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {data.complaints.map((c) => (
                <button key={c} onClick={() => setComplaint(c)}
                  className={cn("flex items-center gap-2.5 rounded-xl border p-3.5 text-left text-sm font-medium transition-all",
                    complaint === c ? "border-teal-500 bg-brand-soft" : "border-border bg-card hover:border-teal-500/40")}>
                  <span className={cn("grid h-5 w-5 place-items-center rounded-full border",
                    complaint === c ? "border-teal-500 bg-teal-500 text-white" : "border-border")}>
                    {complaint === c && <Check className="h-3 w-3" />}
                  </span>
                  {c}
                </button>
              ))}
            </div>
          </Step>
        )}

        {/* STEP 2 — Red flags */}
        {step === 2 && (
          <Step title="Red-flag screening" hint="Tick anything present. Any positive finding prompts a referral consideration.">
            <div className="grid gap-2.5 sm:grid-cols-2">
              {redFlags.map((f) => (
                <button key={f} onClick={() => toggle(flags, setFlags, f)}
                  className={cn("flex items-center gap-2.5 rounded-xl border p-3 text-left text-sm transition-all",
                    flags.includes(f) ? "border-coral-500 bg-coral-500/10" : "border-border bg-card hover:border-coral-500/40")}>
                  <span className={cn("grid h-5 w-5 shrink-0 place-items-center rounded-md border",
                    flags.includes(f) ? "border-coral-500 bg-coral-500 text-white" : "border-border")}>
                    {flags.includes(f) && <Check className="h-3 w-3" />}
                  </span>
                  {f}
                </button>
              ))}
            </div>
            {hasRedFlag && (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-coral-500/40 bg-coral-500/10 p-3.5 text-sm">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-coral-500" />
                <p><span className="font-semibold">Referral consideration:</span> one or more red flags are present. Consider onward referral / medical review before proceeding with rehab.</p>
              </div>
            )}
          </Step>
        )}

        {/* STEP 3 — Objective / special tests */}
        {step === 3 && (
          <Step title="Objective — special tests" hint={`Select the tests you performed for the ${region.toLowerCase()}.`}>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {data.specialTests.map((t) => (
                <button key={t} onClick={() => toggle(tests, setTests, t)}
                  className={cn("flex items-center gap-2.5 rounded-xl border p-3 text-left text-sm transition-all",
                    tests.includes(t) ? "border-teal-500 bg-brand-soft" : "border-border bg-card hover:border-teal-500/40")}>
                  <span className={cn("grid h-5 w-5 shrink-0 place-items-center rounded-md border",
                    tests.includes(t) ? "border-teal-500 bg-teal-500 text-white" : "border-border")}>
                    {tests.includes(t) && <Check className="h-3 w-3" />}
                  </span>
                  {t}
                </button>
              ))}
            </div>
          </Step>
        )}

        {/* STEP 4 — Reasoning summary */}
        {step === 4 && (
          <div className="animate-fade-up">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-teal-600" />
              <h3 className="font-display text-lg font-bold">Clinical reasoning summary</h3>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {sex}, {age} · {region} · {complaint ?? "complaint not specified"}
              {tests.length > 0 && ` · ${tests.length} test(s) performed`}
            </p>

            {hasRedFlag && (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-coral-500/40 bg-coral-500/10 p-3.5 text-sm">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-coral-500" />
                <p><span className="font-semibold">Red flags present:</span> {flags.join(", ")}. Prioritise appropriate referral / medical review.</p>
              </div>
            )}

            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Suggested differentials — ranked, for your consideration
            </p>
            <div className="mt-3 space-y-3">
              {ranked.map((d, i) => (
                <div key={d.dx} className="rounded-2xl border border-border p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-muted text-xs font-bold">{i + 1}</span>
                    <h4 className="font-display text-base font-bold">{d.dx}</h4>
                    <span className={cn("ml-auto rounded-full px-2.5 py-1 text-[11px] font-bold", confidenceStyle[d.confidence])}>
                      {d.confidence} confidence
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground"><span className="font-semibold text-foreground">Why: </span>{d.rationale}</p>
                  <p className="mt-1.5 flex items-start gap-1.5 text-xs text-muted-foreground">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600" /> {d.evidence}
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <MiniList label="Confirm with" items={d.furtherTests} icon={<Activity className="h-3.5 w-3.5" />} />
                    <MiniList label="Management" items={d.management} icon={<Stethoscope className="h-3.5 w-3.5" />} />
                    <MiniList label="Exercises" items={d.exercises} icon={<Activity className="h-3.5 w-3.5" />} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <Button onClick={draftSoap}><FileText className="h-4 w-4" /> {soap ? "Regenerate SOAP note" : "Draft SOAP note"}</Button>
              <Button variant="outline" onClick={reset}><RefreshCw className="h-4 w-4" /> New assessment</Button>
            </div>

            {/* Editable SOAP note (Phase 3 — instant documentation) */}
            {soap && (
              <div className="mt-6 animate-fade-up rounded-2xl border border-border bg-muted/30 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <FileText className="h-5 w-5 text-teal-600" />
                  <h4 className="font-display text-base font-bold">Draft SOAP note</h4>
                  <span className="rounded-full bg-teal-500/15 px-2.5 py-0.5 text-[11px] font-bold text-teal-600">Editable</span>
                  <div className="ml-auto flex gap-2">
                    <Button size="sm" variant="outline" onClick={copySoap}>
                      {copied ? <><ClipboardCheck className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
                    </Button>
                    <Button size="sm" onClick={() => setFinalised(true)} disabled={finalised}>
                      {finalised ? <><Lock className="h-3.5 w-3.5" /> Finalised</> : <>Finalise &amp; sign</>}
                    </Button>
                  </div>
                </div>

                <div className="mt-4 grid gap-3">
                  {(["subjective", "objective", "assessment", "plan"] as const).map((k) => (
                    <label key={k} className="block">
                      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">{k}</span>
                      <textarea
                        value={soap[k]}
                        disabled={finalised}
                        onChange={(e) => setSoap((prev) => (prev ? { ...prev, [k]: e.target.value } : prev))}
                        rows={k === "plan" ? 6 : 3}
                        className="w-full resize-y rounded-xl border border-input bg-background p-3 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-ring disabled:opacity-70"
                      />
                    </label>
                  ))}
                </div>

                {finalised && (
                  <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-teal-600">
                    <Lock className="h-3.5 w-3.5" /> Note finalised & signed by clinician (demo). In production this locks the version and writes an audit entry.
                  </p>
                )}
              </div>
            )}

            <p className="mt-5 rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Clinician note:</span> these are AI-generated
              suggestions to support — not replace — your clinical reasoning. Sample content is illustrative.
              You make the final diagnosis and management decision.
            </p>
          </div>
        )}

        {/* Nav buttons */}
        {step < 4 && (
          <div className="mt-7 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button
              onClick={() => setStep((s) => Math.min(4, s + 1))}
              disabled={step === 1 && !complaint}
            >
              {step === 3 ? "Generate reasoning" : "Continue"} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

function Step({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-up">
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <p className="mt-1 mb-5 text-sm text-muted-foreground">{hint}</p>
      {children}
    </div>
  );
}

function MiniList({ label, items, icon }: { label: string; items: string[]; icon: React.ReactNode }) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </p>
      <ul className="mt-1.5 space-y-1">
        {items.map((x) => (
          <li key={x} className="text-xs text-foreground/90">• {x}</li>
        ))}
      </ul>
    </div>
  );
}
