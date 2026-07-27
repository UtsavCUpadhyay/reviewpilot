import {
  ArrowRight, Brain, Sparkles, ShieldCheck, Check, Info, Stethoscope,
  BadgeCheck, Building2,
} from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/site/icon";
import {
  clinicianAudiences, clinicalModules, platformPillars, saasPlans,
  securityFeatures, evidenceSources,
} from "@/lib/clinical";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ---------------- HERO ---------------- */}
        <section id="top" className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
          <div className="pointer-events-none absolute -right-16 top-32 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl animate-float" aria-hidden />
          <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-fade-up">
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5 text-teal-500" /> The operating system for physiotherapy
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
                Clinical AI that helps you <span className="text-gradient">reason, document &amp; treat</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                DrPhysioAI guides physiotherapists through every stage of care — structured
                assessment, transparent clinical reasoning, instant documentation and evidence-based
                exercise prescription. <span className="font-semibold text-foreground">You always make the final call.</span>
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <a href="/signup">Start 7-day free trial <ArrowRight className="h-4 w-4" /></a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/assistant"><Brain className="h-4 w-4" /> Try the AI assistant</a>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-teal-500" /> Evidence-referenced</span>
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-teal-500" /> Privacy-by-design</span>
                <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4 text-teal-500" /> Clinic &amp; hospital ready</span>
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                {clinicianAudiences.map((a) => (
                  <span key={a} className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">{a}</span>
                ))}
              </div>
            </div>

            {/* reasoning preview card */}
            <div className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:150ms]">
              <div className="absolute inset-6 rounded-[2.5rem] bg-brand-gradient opacity-30 blur-2xl" />
              <Card className="relative p-5 shadow-card">
                <div className="flex items-center gap-2 border-b border-border pb-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient"><Brain className="h-4 w-4 text-white" /></span>
                  <div>
                    <p className="text-sm font-bold leading-none">Clinical reasoning</p>
                    <p className="text-xs text-muted-foreground">Knee · anterior pain · 34F</p>
                  </div>
                  <span className="ml-auto rounded-full bg-teal-500/15 px-2 py-0.5 text-[11px] font-bold text-teal-600">Ranked</span>
                </div>
                <div className="mt-3 space-y-2.5">
                  {[
                    { dx: "Patellofemoral pain", c: "High", w: "bg-teal-500/15 text-teal-600" },
                    { dx: "Meniscal injury", c: "Moderate", w: "bg-amber-500/15 text-amber-600" },
                    { dx: "ACL insufficiency", c: "Low", w: "bg-muted text-muted-foreground" },
                  ].map((d, i) => (
                    <div key={d.dx} className="flex items-center gap-2 rounded-xl border border-border p-2.5 text-sm">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-muted text-xs font-bold">{i + 1}</span>
                      <span className="font-semibold">{d.dx}</span>
                      <span className={cn("ml-auto rounded-full px-2 py-0.5 text-[11px] font-bold", d.w)}>{d.c}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-muted/60 p-2.5 text-xs text-muted-foreground">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600" />
                  Each suggestion shows its rationale + evidence. You decide.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* ---------------- PLATFORM PILLARS ---------------- */}
        <section id="platform" className="py-20 sm:py-28">
          <div className="container-page">
            <SectionHeading
              eyebrow="One platform, whole workflow"
              title={<>Everything from first contact to <span className="text-gradient">discharge</span></>}
              description="Six connected pillars that reduce cognitive load and save clinician time at every step."
            />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {platformPillars.map((p, i) => (
                <Reveal key={p.title} delay={(i % 3) * 90}>
                  <Card className="group h-full p-6 card-hover">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-teal-600 transition-transform group-hover:scale-110">
                      <Icon name={p.icon} className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- CLINICAL MODULES ---------------- */}
        <section id="modules" className="relative py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" aria-hidden />
          <div className="container-page relative">
            <SectionHeading
              eyebrow="Specialty modules"
              title={<>Intelligent modules for <span className="text-gradient">every specialty</span></>}
              description="Each module carries its own assessments, outcome measures, special tests, red flags and evidence."
            />
            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {clinicalModules.map((m, i) => (
                <Reveal key={m.name} delay={(i % 5) * 70}>
                  <Card className="group h-full p-5 card-hover">
                    <span className="text-2xl transition-transform group-hover:scale-110">{m.emoji}</span>
                    <h3 className="mt-3 text-sm font-bold">{m.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{m.conditions}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- ASSISTANT CTA BAND ---------------- */}
        <section className="py-16 sm:py-20">
          <div className="container-page">
            <Reveal>
              <Card className="flex flex-col items-center gap-6 overflow-hidden bg-brand-gradient p-8 text-white sm:flex-row sm:justify-between sm:p-10">
                <div className="max-w-xl text-center sm:text-left">
                  <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                    <Brain className="h-4 w-4" /> AI Clinical Assistant
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">See the reasoning engine in action</h3>
                  <p className="mt-2 text-white/85">Run a live assessment — red-flag screening to ranked differentials with rationale — in under a minute.</p>
                </div>
                <Button variant="secondary" size="lg" className="shrink-0 bg-white text-teal-700 hover:bg-white/90" asChild>
                  <a href="/assistant">Open the assistant <ArrowRight className="h-4 w-4" /></a>
                </Button>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* ---------------- EVIDENCE + SECURITY ---------------- */}
        <section id="security" className="py-20 sm:py-28">
          <div className="container-page grid gap-10 lg:grid-cols-2">
            <Reveal>
              <Card className="h-full p-8">
                <span className="eyebrow"><BadgeCheck className="h-3.5 w-3.5 text-teal-500" /> Evidence-based</span>
                <h3 className="mt-4 font-display text-2xl font-bold">Transparent, referenced suggestions</h3>
                <p className="mt-2 text-sm text-muted-foreground">Every recommendation shows its reasoning and cites supporting sources where available — designed to build clinician confidence, not bypass it.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {evidenceSources.map((e) => (
                    <span key={e} className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium">{e}</span>
                  ))}
                </div>
              </Card>
            </Reveal>
            <Reveal delay={100}>
              <Card className="h-full p-8">
                <span className="eyebrow"><ShieldCheck className="h-3.5 w-3.5 text-teal-500" /> Enterprise security</span>
                <h3 className="mt-4 font-display text-2xl font-bold">Built for clinical data</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {securityFeatures.map((s) => (
                    <div key={s.title} className="flex items-center gap-2.5 text-sm">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-soft text-teal-600">
                        <Icon name={s.icon} className="h-4 w-4" />
                      </span>
                      {s.title}
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* ---------------- PRICING ---------------- */}
        <section id="pricing" className="relative py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" aria-hidden />
          <div className="container-page relative">
            <SectionHeading
              eyebrow="Pricing"
              title={<>Plans for solo clinicians to <span className="text-gradient">whole hospitals</span></>}
              description="Start with a 7-day free trial. Scale from a single physio to multi-site, university and enterprise deployments."
            />
            <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
              {saasPlans.map((p, i) => (
                <Reveal key={p.name} delay={i * 100} className="h-full">
                  <Card className={cn("relative flex h-full flex-col p-7 card-hover", p.highlight && "border-transparent shadow-glow ring-2 ring-teal-500/40")}>
                    {p.highlight && (
                      <>
                        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-brand-soft" />
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gradient px-3 py-1 text-xs font-bold text-white shadow-glow">Most popular</span>
                      </>
                    )}
                    <div className="relative">
                      <h3 className="font-display text-lg font-bold">{p.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                      <div className="mt-5 flex items-end gap-1">
                        <span className="font-display text-3xl font-extrabold tracking-tight">{p.price}</span>
                        <span className="pb-1 text-xs text-muted-foreground">{p.period}</span>
                      </div>
                      <ul className="mt-6 space-y-3">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm">
                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-500/15 text-teal-600"><Check className="h-3.5 w-3.5" /></span>
                            <span className="text-foreground/90">{f}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant={p.highlight ? "primary" : "outline"} size="lg" className="mt-8 w-full" asChild>
                        <a
                          href={p.href}
                          {...(p.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {p.cta}
                        </a>
                      </Button>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              <Stethoscope className="mr-1 inline h-4 w-4 text-teal-500" />
              DrPhysioAI is clinical decision-support for qualified clinicians — not a medical device, and never a replacement for professional judgment.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
