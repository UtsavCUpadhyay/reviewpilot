import type { Metadata } from "next";
import { Dumbbell, Flame, ScanLine, Video } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { ExerciseLibrary } from "@/components/site/exercise-library";
import { Button } from "@/components/ui/button";
import { getLocale } from "@/lib/i18n-server";
import { exercises } from "@/lib/exercises";

export const metadata: Metadata = {
  title: "Home Exercise Library — Physiotherapist-Approved Routines",
  description:
    "Follow safe, equipment-free physiotherapy exercises for back, neck, knee, shoulder and posture. Track your progress and build a daily streak on DrPhysioAI.",
  alternates: { canonical: "https://www.drphysioai.com/exercises" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "DrPhysioAI Home Exercise Library",
  numberOfItems: exercises.length,
  itemListElement: exercises.map((e, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: e.name,
    description: e.target,
  })),
};

export default function ExercisesPage() {
  return (
    <>
      <Navbar locale={getLocale()} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
          <div className="container-page relative text-center">
            <span className="eyebrow mx-auto">
              <Dumbbell className="h-3.5 w-3.5 text-teal-500" /> Exercise Library
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Move better, <span className="text-gradient">every single day</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Safe, equipment-free routines approved by physiotherapists. Mark each one done,
              build a daily streak, and watch your consistency grow.
            </p>
            <div className="mx-auto mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Flame className="h-4 w-4 text-orange-500" /> Streak tracking</span>
              <span className="inline-flex items-center gap-1.5"><Dumbbell className="h-4 w-4 text-teal-500" /> No equipment</span>
              <span className="inline-flex items-center gap-1.5"><ScanLine className="h-4 w-4 text-teal-500" /> Physio-approved</span>
            </div>
            <div className="mx-auto mt-6 flex flex-wrap justify-center gap-4 text-sm font-semibold">
              <a href="/posture-check" className="text-teal-600 hover:underline">Check your posture with AI →</a>
              <a href="/find-program" className="text-teal-600 hover:underline">Find your program →</a>
            </div>
          </div>
        </section>

        {/* Library */}
        <section className="py-14 sm:py-16">
          <div className="container-page">
            <ExerciseLibrary />
          </div>
        </section>

        {/* CTA */}
        <section className="relative pb-20 sm:pb-24">
          <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" aria-hidden />
          <div className="container-page relative">
            <div className="mx-auto max-w-3xl rounded-3xl bg-brand-gradient p-8 text-center text-white shadow-glow sm:p-10">
              <Video className="mx-auto h-8 w-8" />
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">Want a plan built for you?</h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-white/90">
                A licensed physiotherapist can tailor these exercises to your body, pain and goals —
                with a follow-up plan and WhatsApp reminders.
              </p>
              <Button variant="secondary" className="mt-5" asChild>
                <a href="/consultation">Book a consultation →</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
