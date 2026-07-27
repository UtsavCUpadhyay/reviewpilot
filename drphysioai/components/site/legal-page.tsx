import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ShieldCheck } from "lucide-react";

export type LegalSection = { heading: string; body: string[] };

/** Shared layout for policy / legal pages. */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-32 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
          <div className="container-page relative max-w-3xl">
            <span className="eyebrow"><ShieldCheck className="h-3.5 w-3.5 text-teal-500" /> Legal</span>
            <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: {updated}</p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{intro}</p>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="container-page max-w-3xl space-y-8">
            {sections.map((s, i) => (
              <div key={s.heading}>
                <h2 className="font-display text-xl font-bold">
                  <span className="text-gradient">{String(i + 1).padStart(2, "0")}</span> · {s.heading}
                </h2>
                {s.body.map((p, j) => (
                  <p key={j} className="mt-3 text-sm leading-relaxed text-muted-foreground">{p}</p>
                ))}
              </div>
            ))}

            <div className="rounded-2xl border border-border bg-muted/40 p-5 text-xs text-muted-foreground">
              This document is a plain-language summary provided for the DrPhysioAI platform and is not legal
              advice. Have your final policies reviewed by a qualified lawyer for your jurisdiction before launch.
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
