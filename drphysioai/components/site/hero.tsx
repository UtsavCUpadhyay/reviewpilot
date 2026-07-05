import {
  Play,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Star,
  Activity,
  BrainCircuit,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

export function Hero() {
  const d = getDict(getLocale());
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
      {/* soft floating blobs */}
      <div
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl animate-float-slow"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 top-40 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl animate-float"
        aria-hidden
      />

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left: copy */}
          <div className="animate-fade-up">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5 text-teal-500" />
              {d.hero.badge}
            </span>

            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {d.hero.titleLead} <br className="hidden sm:block" />
              <span className="text-gradient-animated">{d.hero.titleAccent}</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">{d.hero.subtitleStrong}</span>{" "}
              {d.hero.subtitleRest}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" className="shine" asChild>
                <a href="#pricing">
                  {d.hero.ctaStart} <Sparkles className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#consultation">
                  <Stethoscope className="h-4 w-4" /> {d.hero.ctaBook}
                </a>
              </Button>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:text-teal-600"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card shadow-soft">
                  <Play className="h-4 w-4 fill-current" />
                </span>
                {d.hero.watchDemo}
              </a>
            </div>

            {/* trust row */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <div className="flex -space-x-1">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="h-6 w-6 rounded-full border-2 border-background bg-brand-gradient"
                    />
                  ))}
                </div>
                {d.hero.trustUsers}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {d.hero.trustRating}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-teal-500" /> {d.hero.trustReviewed}
              </span>
            </div>

            {/* audience chips */}
            <div className="mt-7 flex flex-wrap gap-2">
              {d.audiences.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Right: floating AI console */}
          <div className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:150ms]">
            <HeroConsole />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Glassmorphic mock of the AI tutor + orbiting stat cards. */
function HeroConsole() {
  return (
    <div className="relative">
      {/* glow ring behind */}
      <div className="absolute inset-6 rounded-[2.5rem] bg-brand-gradient opacity-30 blur-2xl" />

      <div className="relative rounded-[2rem] glass p-5 shadow-card">
        <div className="flex items-center gap-2 pb-4">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient">
            <BrainCircuit className="h-4 w-4 text-white" />
          </span>
          <div>
            <p className="text-sm font-bold leading-none">DrPhysioAI Tutor</p>
            <p className="text-xs text-muted-foreground">Online · replies instantly</p>
          </div>
          <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-teal-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-teal-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
            </span>
            Live
          </span>
        </div>

        {/* chat bubbles */}
        <div className="space-y-3">
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-brand-gradient px-4 py-2.5 text-sm text-white shadow-soft">
            Explain the SITS muscles simply, with a table.
          </div>
          <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3 text-sm shadow-soft">
            <p className="font-semibold">Rotator cuff — “SITS”</p>
            <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">S</span><span>Supraspinatus — abduction</span>
              <span className="font-semibold text-foreground">I</span><span>Infraspinatus — external rotation</span>
              <span className="font-semibold text-foreground">T</span><span>Teres minor — external rotation</span>
              <span className="font-semibold text-foreground">S</span><span>Subscapularis — internal rotation</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-teal-500/10 px-2 py-0.5 text-[11px] font-semibold text-teal-600">
              <Sparkles className="h-3 w-3" /> Flashcards generated
            </div>
          </div>
        </div>

        {/* input */}
        <div className="mt-4 flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2.5">
          <span className="text-sm text-muted-foreground">Ask anything…</span>
          <span className="ml-auto grid h-8 w-8 place-items-center rounded-full bg-brand-gradient text-white">
            <MessageCircle className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* orbiting cards */}
      <div className="absolute -left-6 -top-6 hidden animate-float rounded-2xl glass px-3.5 py-2.5 shadow-card sm:flex sm:items-center sm:gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-500/15 text-teal-600">
          <Activity className="h-4 w-4" />
        </span>
        <div className="text-xs">
          <p className="font-bold leading-none">Recovery 92%</p>
          <p className="text-muted-foreground">Knee program</p>
        </div>
      </div>

      <div className="absolute -bottom-5 -right-4 hidden animate-float-slow rounded-2xl glass px-3.5 py-2.5 shadow-card sm:flex sm:items-center sm:gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet-500/15 text-violet-600">
          <Star className="h-4 w-4 fill-current" />
        </span>
        <div className="text-xs">
          <p className="font-bold leading-none">7-day streak 🔥</p>
          <p className="text-muted-foreground">+120 XP today</p>
        </div>
      </div>

      <a
        href={site.whatsappLink}
        className="absolute -right-3 top-1/3 hidden animate-float rounded-full bg-[#25D366] px-3 py-2 text-xs font-bold text-white shadow-card md:inline-flex md:items-center md:gap-1.5"
      >
        <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
      </a>
    </div>
  );
}
