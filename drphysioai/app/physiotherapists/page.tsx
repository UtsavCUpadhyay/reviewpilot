import type { Metadata } from "next";
import { Star, BadgeCheck, Languages, Briefcase, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { getLocale } from "@/lib/i18n-server";
import { physios } from "@/lib/physios";

export const metadata: Metadata = {
  title: "Our Physiotherapists — Licensed Experts Online",
  description:
    "Meet DrPhysioAI's licensed physiotherapists — sports, orthopaedic, pain, post-surgical, prenatal and senior-care experts consulting online across India in English, Hindi and Gujarati.",
  alternates: { canonical: "https://drphysioai.com/physiotherapists" },
};

export default function PhysiotherapistsPage() {
  return (
    <>
      <Navbar locale={getLocale()} />
      <main>
        <section className="relative overflow-hidden pt-32 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
          <div className="container-page relative text-center">
            <span className="eyebrow mx-auto">
              <BadgeCheck className="h-3.5 w-3.5 text-teal-500" /> Verified experts
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Meet your <span className="text-gradient">physiotherapists</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Real, licensed physiotherapists — not chatbots. Each consultation is with an expert who
              watches your movement and builds a plan just for you.
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="container-page">
            <div className="grid gap-5 sm:grid-cols-2">
              {physios.map((p, i) => (
                <Reveal key={p.name} delay={(i % 2) * 90}>
                  <Card className="flex h-full flex-col p-6 card-hover sm:flex-row sm:items-start sm:gap-5">
                    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-2xl font-extrabold text-white">
                      {p.name.replace("Dr. ", "").charAt(0)}
                    </span>
                    <div className="mt-4 flex-1 sm:mt-0">
                      <div className="flex items-center gap-2">
                        <h2 className="font-display text-lg font-bold">{p.name}</h2>
                        <BadgeCheck className="h-4 w-4 text-teal-500" aria-label="Verified" />
                      </div>
                      <p className="text-sm text-muted-foreground">{p.title}</p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {p.rating}
                          <span className="font-normal text-muted-foreground">({p.reviews.toLocaleString("en-IN")})</span>
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Briefcase className="h-3.5 w-3.5" /> {p.experienceYears}+ yrs
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Languages className="h-3.5 w-3.5" /> {p.languages.join(", ")}
                        </span>
                      </div>

                      <p className="mt-3 text-sm text-foreground/90">{p.bio}</p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.specialties.map((s) => (
                          <span key={s} className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-teal-700">
                            {s}
                          </span>
                        ))}
                      </div>

                      <Button size="sm" className="mt-4" asChild>
                        <a href="/consultation">Book with {p.name.split(" ")[1]} <ArrowRight className="h-3.5 w-3.5" /></a>
                      </Button>
                    </div>
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
