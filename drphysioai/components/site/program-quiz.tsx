"use client";

import * as React from "react";
import { ArrowRight, RotateCcw, Sparkles, Stethoscope } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  emoji: string;
  /** Recommendation key this answer maps to (last-answered concern wins). */
  rec?: RecKey;
}
type RecKey =
  | "back-pain" | "neck-pain" | "knee-pain" | "sciatica"
  | "sports-injury" | "post-surgery-rehab" | "neuro-elderly-care"
  | "prenatal" | "student";

const steps: { q: string; options: Option[] }[] = [
  {
    q: "Who is this for?",
    options: [
      { label: "Me", emoji: "🙋" },
      { label: "A parent / elder", emoji: "👵", rec: "neuro-elderly-care" },
      { label: "My child", emoji: "🧒" },
      { label: "I'm a physio student", emoji: "🎓", rec: "student" },
    ],
  },
  {
    q: "What's bothering you most?",
    options: [
      { label: "Back or neck pain", emoji: "🦴", rec: "back-pain" },
      { label: "Knee or joint pain", emoji: "🦵", rec: "knee-pain" },
      { label: "Nerve pain down the leg", emoji: "⚡", rec: "sciatica" },
      { label: "A sports injury", emoji: "🏃", rec: "sports-injury" },
      { label: "Recovering after surgery", emoji: "🩹", rec: "post-surgery-rehab" },
      { label: "Balance / mobility (senior)", emoji: "🧠", rec: "neuro-elderly-care" },
      { label: "Pregnancy-related", emoji: "🤰", rec: "prenatal" },
      { label: "I just want to study/learn", emoji: "📚", rec: "student" },
    ],
  },
  {
    q: "Your main goal?",
    options: [
      { label: "Relieve pain", emoji: "💆" },
      { label: "Get back to activity/sport", emoji: "🏃" },
      { label: "Recover after surgery", emoji: "🩹", rec: "post-surgery-rehab" },
      { label: "Stay independent & balanced", emoji: "🧘", rec: "neuro-elderly-care" },
      { label: "Study smarter for exams", emoji: "🎯", rec: "student" },
    ],
  },
];

const RESULTS: Record<RecKey, { title: string; desc: string; href: string; cta: string }> = {
  "back-pain": { title: "Back & Neck Pain program", desc: "A physio-guided plan to relieve pain and fix posture — from home.", href: "/conditions/back-pain", cta: "See back-pain care" },
  "neck-pain": { title: "Neck & Shoulder program", desc: "Relieve tech-neck and shoulder tension with targeted physiotherapy.", href: "/conditions/neck-pain", cta: "See neck care" },
  "knee-pain": { title: "Knee & Joint program", desc: "Strengthen and protect your joints with arthritis-friendly rehab.", href: "/conditions/knee-pain", cta: "See knee care" },
  "sciatica": { title: "Sciatica relief program", desc: "Nerve-mobilising exercises and strengthening to settle sciatica.", href: "/conditions/sciatica", cta: "See sciatica care" },
  "sports-injury": { title: "Sports Injury rehab", desc: "Recover fully and return to play stronger and safer.", href: "/conditions/sports-injury", cta: "See sports rehab" },
  "post-surgery-rehab": { title: "Post-Surgical rehab", desc: "Safe, staged recovery after surgery, supervised by a physio.", href: "/conditions/post-surgery-rehab", cta: "See post-surgery care" },
  "neuro-elderly-care": { title: "Neuro & Elderly care", desc: "Gentle balance, strength and mobility care for seniors and neuro conditions.", href: "/conditions/neuro-elderly-care", cta: "See senior care" },
  "prenatal": { title: "Prenatal & Postnatal care", desc: "Safe movement and recovery for expecting and new mothers.", href: "/consultation", cta: "Book a consultation" },
  "student": { title: "AI Study Tutor", desc: "Notes, OSCE prep, quizzes and a voice tutor built for physio students.", href: "/ai", cta: "Start learning" },
};

export function ProgramQuiz() {
  const [step, setStep] = React.useState(0);
  const [rec, setRec] = React.useState<RecKey | null>(null);

  function choose(o: Option) {
    if (o.rec) setRec(o.rec); // later concrete answers refine the recommendation
    if (step < steps.length - 1) setStep(step + 1);
    else finish(o.rec);
  }

  function finish(last?: RecKey) {
    setStep(steps.length); // show result
    if (last) setRec(last);
  }

  function reset() {
    setStep(0);
    setRec(null);
  }

  // Result screen
  if (step >= steps.length) {
    const r = RESULTS[rec ?? "back-pain"];
    return (
      <Card className="p-8 text-center shadow-card">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-gradient text-white">
          <Sparkles className="h-7 w-7" />
        </span>
        <p className="mt-4 text-sm font-semibold text-teal-600">Your recommended path</p>
        <h3 className="mt-1 font-display text-2xl font-extrabold">{r.title}</h3>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">{r.desc}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild>
            <a href={r.href}>{r.cta} <ArrowRight className="h-4 w-4" /></a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/consultation"><Stethoscope className="h-4 w-4" /> Book a physio</a>
          </Button>
        </div>
        <button onClick={reset} className="mx-auto mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <RotateCcw className="h-3.5 w-3.5" /> Start over
        </button>
      </Card>
    );
  }

  const current = steps[step];
  return (
    <Card className="p-7 shadow-card sm:p-9">
      {/* progress */}
      <div className="flex items-center gap-2">
        {steps.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i <= step ? "bg-brand-gradient" : "bg-muted",
            )}
          />
        ))}
      </div>
      <p className="mt-5 text-sm font-semibold text-muted-foreground">
        Question {step + 1} of {steps.length}
      </p>
      <h3 className="mt-1 font-display text-2xl font-extrabold">{current.q}</h3>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {current.options.map((o) => (
          <button
            key={o.label}
            onClick={() => choose(o)}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-all hover:border-teal-500/50 hover:bg-brand-soft"
          >
            <span className="text-2xl">{o.emoji}</span>
            <span className="text-sm font-semibold">{o.label}</span>
            <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </Card>
  );
}
