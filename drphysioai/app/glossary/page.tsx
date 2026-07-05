import type { Metadata } from "next";
import { BookOpen, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { Card } from "@/components/ui/card";
import { getLocale } from "@/lib/i18n-server";
import { glossary, glossaryByLetter } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Physiotherapy Glossary — Common Terms Explained Simply",
  description:
    "A plain-English A–Z of physiotherapy terms — from arthritis and sciatica to range of motion and tendinopathy. Understand your diagnosis and treatment.",
  alternates: { canonical: "https://drphysioai.com/glossary" },
};

export default function GlossaryPage() {
  const groups = glossaryByLetter();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "DrPhysioAI Physiotherapy Glossary",
    url: "https://drphysioai.com/glossary",
    hasDefinedTerm: glossary.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
    })),
  };

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
              <BookOpen className="h-3.5 w-3.5 text-teal-500" /> Physiotherapy Glossary
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Physio terms, <span className="text-gradient">in plain English</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Confused by a word your doctor or report used? Here's an A–Z of common physiotherapy
              terms, explained simply — so you understand your body and your care.
            </p>

            {/* A–Z jump nav */}
            <div className="mx-auto mt-7 flex flex-wrap justify-center gap-1.5">
              {groups.map((g) => (
                <a
                  key={g.letter}
                  href={`#letter-${g.letter}`}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-card/60 text-sm font-bold text-muted-foreground transition-colors hover:border-teal-500/50 hover:text-teal-600"
                >
                  {g.letter}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Terms */}
        <section className="py-14 sm:py-20">
          <div className="container-page space-y-10">
            {groups.map((g) => (
              <div key={g.letter} id={`letter-${g.letter}`} className="scroll-mt-28">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient font-display text-lg font-extrabold text-white">
                    {g.letter}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {g.terms.map((t) => (
                    <Card key={t.term} className="p-5">
                      <h2 className="font-display text-base font-bold">{t.term}</h2>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.definition}</p>
                      {t.related && (
                        <a
                          href={`/conditions/${t.related}`}
                          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal-600 hover:gap-2 transition-all"
                        >
                          Learn more <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
