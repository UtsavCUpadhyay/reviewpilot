import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  Flame, Sparkles, CalendarClock, Trophy, ArrowRight, Video,
  BookOpen, Target, CheckCircle2, PlayCircle,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your DrPhysioAI dashboard — progress, streaks, consultations and activity.",
  robots: { index: false, follow: false },
};

const toneMap: Record<string, string> = {
  coral: "bg-coral-500/15 text-coral-500",
  teal: "bg-teal-500/15 text-teal-600",
  violet: "bg-violet-500/15 text-violet-600",
  amber: "bg-amber-500/15 text-amber-600",
};

const continueLearning = [
  { title: "Rotator cuff & impingement", subject: "Orthopaedics", pct: 72 },
  { title: "Gait cycle & phases", subject: "Biomechanics", pct: 45 },
  { title: "Stroke rehabilitation", subject: "Neurology", pct: 20 },
];

const activity = [
  { icon: CheckCircle2, text: "Completed daily quiz — 9/10", time: "2h ago", tone: "teal" },
  { icon: Video, text: "Consultation with Dr. Mehta booked", time: "Yesterday", tone: "violet" },
  { icon: BookOpen, text: "Generated notes: ‘ACL rehab protocol’", time: "Yesterday", tone: "teal" },
  { icon: Trophy, text: "Earned badge: 7-day streak 🔥", time: "2 days ago", tone: "amber" },
];

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware already gates this route; this is a defence-in-depth check.
  if (!user) redirect("/login?next=/dashboard");

  // Real per-user stats from the profiles table (auto-created on signup).
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, streak_days, ai_questions, quiz_accuracy, badges")
    .eq("id", user.id)
    .maybeSingle();

  const fullName =
    profile?.full_name?.trim() ||
    (user.user_metadata?.full_name as string | undefined)?.trim() ||
    user.email?.split("@")[0] ||
    "there";
  const firstName = fullName.split(" ")[0];

  const kpis = [
    { icon: Flame, label: "Day streak", value: `${profile?.streak_days ?? 0}`, sub: "days in a row", tone: "coral" },
    { icon: Sparkles, label: "AI questions", value: `${profile?.ai_questions ?? 0}`, sub: "this month", tone: "teal" },
    { icon: Target, label: "Quiz accuracy", value: `${profile?.quiz_accuracy ?? 0}%`, sub: "across quizzes", tone: "violet" },
    { icon: Trophy, label: "Badges", value: `${profile?.badges ?? 0}`, sub: "earned", tone: "amber" },
  ];

  return (
    <DashboardShell user={{ name: fullName, email: user.email }}>
      {/* Greeting */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Good evening, {firstName} 👋
          </h1>
          <p className="mt-1 text-muted-foreground">
            {(profile?.streak_days ?? 0) > 0
              ? `You're on a ${profile?.streak_days}-day streak — keep it going!`
              : "Ask the AI tutor or book a consultation to get started."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild><a href="/ai"><Sparkles className="h-4 w-4" /> Ask AI Tutor</a></Button>
          <Button variant="outline" asChild><a href="/consultation">Book</a></Button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label} className="p-5">
            <div className="flex items-center justify-between">
              <span className={`grid h-10 w-10 place-items-center rounded-xl ${toneMap[k.tone]}`}>
                <k.icon className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-4 font-display text-3xl font-extrabold tracking-tight">{k.value}</p>
            <p className="text-sm font-semibold">{k.label}</p>
            <p className="text-xs text-muted-foreground">{k.sub}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Continue learning */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Continue learning</h2>
            <a href="/ai" className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:underline">
              All topics <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="mt-5 space-y-4">
            {continueLearning.map((c) => (
              <div key={c.title} className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-teal-600">
                  <PlayCircle className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-semibold">{c.title}</p>
                    <span className="text-xs font-semibold text-muted-foreground">{c.pct}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{c.subject}</p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming consultation */}
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="bg-brand-gradient p-5 text-white">
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold">
                <CalendarClock className="h-4 w-4" /> Next consultation
              </p>
              <p className="mt-2 font-display text-lg font-bold">Dr. Mehta · Video</p>
              <p className="text-sm text-white/85">Tomorrow · 10:30 AM · 30 min</p>
            </div>
            <div className="p-4">
              <Button className="w-full" asChild>
                <a href="/consultation"><Video className="h-4 w-4" /> Join / manage</a>
              </Button>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-teal-600" />
              <h3 className="font-display text-base font-bold">Today&apos;s goal</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">3 of 5 tasks done</p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-3/5 rounded-full bg-brand-gradient" />
            </div>
          </Card>
        </div>
      </div>

      {/* Recent activity */}
      <Card className="mt-6 p-6">
        <h2 className="font-display text-lg font-bold">Recent activity</h2>
        <ul className="mt-4 space-y-3">
          {activity.map((a, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${toneMap[a.tone]}`}>
                <a.icon className="h-[1.15rem] w-[1.15rem]" />
              </span>
              <p className="flex-1 text-sm">{a.text}</p>
              <span className="text-xs text-muted-foreground">{a.time}</span>
            </li>
          ))}
        </ul>
      </Card>
    </DashboardShell>
  );
}
