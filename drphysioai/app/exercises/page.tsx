import type { Metadata } from "next";
import { Dumbbell, Sparkles } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ExerciseLibrary } from "@/components/clinical/exercise-library";

export const metadata: Metadata = {
  title: "Exercise Library & Prescription",
  description:
    "Search an evidence-tagged physiotherapy exercise library and build a home exercise program with adjustable dosage, progressions and a printable patient handout.",
  alternates: { canonical: "https://drphysioai.com/exercises" },
};

export default function ExercisesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-32 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
          <div className="container-page relative">
            <div className="max-w-2xl">
              <span className="eyebrow">
                <Dumbbell className="h-3.5 w-3.5 text-teal-500" /> Exercise engine
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                Prescribe in seconds, <span className="text-gradient">progress with confidence</span>
              </h1>
              <p className="mt-5 text-lg text-muted-foreground">
                Search the library, adjust dosage per patient, and export a clear
                home program — complete with progressions, regressions and a
                patient handout.
              </p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-teal-500" /> Illustrative sample library — dosage is a clinician-adjustable default, not a prescription.
              </p>
            </div>

            <div className="mt-12 pb-8">
              <ExerciseLibrary />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
