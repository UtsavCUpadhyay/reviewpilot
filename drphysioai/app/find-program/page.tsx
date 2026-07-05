import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { ProgramQuiz } from "@/components/site/program-quiz";
import { getLocale } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "Find Your Program — Personalised Physiotherapy Recommendation",
  description:
    "Answer 3 quick questions and get a personalised physiotherapy recommendation — pain relief, sports rehab, post-surgery, senior care or student learning.",
  alternates: { canonical: "https://www.drphysioai.com/find-program" },
};

export default function FindProgramPage() {
  return (
    <>
      <Navbar locale={getLocale()} />
      <main>
        <section className="relative overflow-hidden pt-32 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
          <div className="container-page relative text-center">
            <span className="eyebrow mx-auto">
              <Sparkles className="h-3.5 w-3.5 text-teal-500" /> 30-second finder
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Find your perfect <span className="text-gradient">physio program</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              Three quick questions. We&apos;ll point you to exactly the right care or learning path.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container-page max-w-2xl">
            <ProgramQuiz />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
