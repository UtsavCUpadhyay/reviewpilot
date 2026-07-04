import type { Metadata } from "next";
import { ArrowRight, Stethoscope } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { getLocale } from "@/lib/i18n-server";
import { conditions } from "@/lib/conditions";

export const metadata: Metadata = {
  title: "Conditions We Treat — Online Physiotherapy in India",
  description:
    "Physiotherapy for back pain, neck pain, knee pain, sciatica, frozen shoulder, sports injuries, post-surgical and neuro rehab — online with licensed physiotherapists across India.",
  alternates: { canonical: "https://drphysioai.com/conditions" },
};

export default function ConditionsPage() {
  return (
    <>
      <Navbar locale={getLocale()} />
      <main>
        <section className="relative overflow-hidden pt-32 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
          <div className="container-page relative text-center">
            <span className="eyebrow mx-auto">
              <Stethoscope className="h-3.5 w-3.5 text-teal-500" /> Conditions we treat
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Expert physiotherapy for <span className="text-gradient">every condition</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              From everyday aches to post-surgical and neurological rehab — find your condition and
              start a doctor-guided recovery plan from home.
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="container-page">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {conditions.map((c, i) => (
                <Reveal key={c.slug} delay={(i % 3) * 80}>
                  <a href={`/conditions/${c.slug}`} className="block h-full">
                    <Card className="flex h-full flex-col p-6 card-hover">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-2xl">
                        {c.emoji}
                      </span>
                      <h2 className="mt-4 font-display text-lg font-bold">{c.name}</h2>
                      <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{c.tagline}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-600">
                        Learn more <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </Card>
                  </a>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" asChild>
                <a href="/consultation">Book a consultation <ArrowRight className="h-4 w-4" /></a>
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
