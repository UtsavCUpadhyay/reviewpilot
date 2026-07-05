import type { Metadata } from "next";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { getLocale } from "@/lib/i18n-server";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { AiChatDemo } from "@/components/site/ai-chat-demo";
import { Features } from "@/components/site/features";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { aiSubjects, aiPlans, answerFormats } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AI Learning — Your 24/7 Physiotherapy Tutor",
  description:
    "Notes, concepts, MCQs, OSCE and case studies for physiotherapy students — explained short, detailed, in tables or flowcharts. Powered by AI, reviewed by doctors.",
  alternates: { canonical: "https://www.drphysioai.com/ai" },
};

export default function AiLearningPage() {
  return (
    <>
      <Navbar locale={getLocale()} />
      <main>
        {/* Hero + live demo */}
        <section className="relative overflow-hidden pt-32 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
          <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-up">
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5 text-teal-500" /> AI Learning
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                The AI tutor built for <span className="text-gradient">physiotherapy</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                Ask anything across every physio subject and get an answer in the
                exact style you need — short, detailed, tables or flowcharts. Then
                turn it into flashcards, MCQs and a revision plan in one tap.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <a href="#ai-plans">
                    Get Started <Sparkles className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#subjects">Explore subjects</a>
                </Button>
              </div>
            </div>

            <div className="animate-fade-up [animation-delay:150ms]">
              <AiChatDemo />
            </div>
          </div>
        </section>

        {/* Answer formats */}
        <section className="py-20 sm:py-28">
          <div className="container-page">
            <SectionHeading
              eyebrow="Any style you learn best"
              title={<>One question, <span className="text-gradient">seven ways</span> to understand it</>}
              description="Every learner is different. Switch the answer format until it clicks — the demo above is live, try it."
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {answerFormats.map((f, i) => (
                <Reveal key={f.key} delay={(i % 5) * 80}>
                  <Card className="h-full p-5 text-center card-hover">
                    <p className="font-display text-base font-bold text-gradient">{f.key}</p>
                    <p className="mt-1.5 text-xs text-muted-foreground">{f.desc}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Subjects */}
        <section id="subjects" className="relative py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" aria-hidden />
          <div className="container-page relative">
            <SectionHeading
              eyebrow="Every subject, every year"
              title={<>From <span className="text-gradient">first-year anatomy</span> to final-year clinicals</>}
              description="Thousands of doctor-reviewed topics, organised the way your university teaches them."
            />
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {aiSubjects.map((s, i) => (
                <Reveal key={s.name} delay={(i % 4) * 80}>
                  <a href="/signup" className="block h-full">
                    <Card className="group flex h-full items-center gap-3 p-4 card-hover">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-xl transition-transform group-hover:scale-110">
                        {s.emoji}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.topics}+ topics</p>
                      </div>
                    </Card>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Reuse the AI feature grid from the homepage */}
        <Features />

        {/* AI subscription tiers */}
        <section id="ai-plans" className="py-20 sm:py-28">
          <div className="container-page">
            <SectionHeading
              eyebrow="AI Subscriptions"
              title={<>Learn smart, upgrade when you&apos;re <span className="text-gradient">ready to top the class</span></>}
              description="Plans from ₹199/month. Every tier unlocks more of the AI tutor — priced for Indian students."
            />
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {aiPlans.map((p, i) => (
                <Reveal key={p.name} delay={(i % 5) * 80} className="h-full">
                  <Card
                    className={cn(
                      "relative flex h-full flex-col p-6 card-hover",
                      p.highlight && "border-transparent shadow-glow ring-2 ring-teal-500/40",
                    )}
                  >
                    {p.highlight && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold text-white shadow-glow">
                        Best value
                      </span>
                    )}
                    <h3 className="font-display text-base font-bold">{p.name}</h3>
                    <div className="mt-3 flex items-end gap-1">
                      <span className="font-display text-3xl font-extrabold tracking-tight">{p.price}</span>
                      <span className="pb-1 text-xs text-muted-foreground">{p.period}</span>
                    </div>
                    <ul className="mt-5 flex-1 space-y-2.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600" />
                          <span className="text-foreground/90">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={p.highlight ? "primary" : "outline"}
                      size="sm"
                      className="mt-6 w-full"
                      asChild
                    >
                      <a href="/signup">
                        Choose {p.name} <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
