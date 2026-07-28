import type { Metadata } from "next";
import { Brain, ShieldCheck, BookOpen } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { AssessmentWizard } from "@/components/clinical/assessment-wizard";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { assessmentFlow } from "@/lib/clinical";

export const metadata: Metadata = {
  title: "AI Clinical Assistant — Structured Assessment & Reasoning",
  description:
    "A structured, transparent clinical reasoning assistant for physiotherapists: guided assessment, red-flag screening, ranked differential suggestions with rationale and evidence. Decision support — the clinician decides.",
  alternates: { canonical: "https://drphysioai.com/assistant" },
};

export default function AssistantPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-32 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
          <div className="container-page relative">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow mx-auto">
                <Brain className="h-3.5 w-3.5 text-teal-500" /> AI Clinical Assistant
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                Reason through any case, <span className="text-gradient">step by step</span>
              </h1>
              <p className="mt-5 text-lg text-muted-foreground">
                A structured workflow that screens red flags and suggests ranked
                differentials with clear rationale and evidence — so you decide
                faster, with more confidence.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-teal-500" /> Decision support, you decide</span>
                <span className="inline-flex items-center gap-1.5"><BookOpen className="h-4 w-4 text-teal-500" /> Evidence-referenced</span>
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-3xl">
              <AssessmentWizard />
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="container-page">
            <SectionHeading
              eyebrow="The full workflow"
              title={<>Every step from intake to <span className="text-gradient">progress tracking</span></>}
              description="The demo above covers the core loop. The full assistant walks the entire pathway."
            />
            <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2.5">
              {assessmentFlow.map((s, i) => (
                <Reveal key={s} delay={(i % 6) * 60}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm font-medium shadow-soft backdrop-blur">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-gradient text-[10px] font-bold text-white">{i + 1}</span>
                    {s}
                  </span>
                </Reveal>
              ))}
            </div>

            <Reveal className="mx-auto mt-10 max-w-3xl">
              <Card className="border-teal-500/20 bg-brand-soft p-5 text-center text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Safety &amp; scope:</span> DrPhysioAI is a
                clinical decision-<em>support</em> tool for qualified clinicians. It is not a medical device,
                does not provide a diagnosis, and never replaces professional judgment. Sample content shown is
                illustrative.
              </Card>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
