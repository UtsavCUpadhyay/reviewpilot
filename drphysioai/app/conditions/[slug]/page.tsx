import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, AlertCircle, Activity, ArrowRight, MessageCircle, Stethoscope } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getLocale } from "@/lib/i18n-server";
import { conditions, getCondition } from "@/lib/conditions";
import { site } from "@/lib/content";

export function generateStaticParams() {
  return conditions.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCondition(params.slug);
  if (!c) return { title: "Condition not found" };
  return {
    title: `${c.name} — Online Physiotherapy Treatment in India`,
    description: c.tagline + " " + c.overview.slice(0, 110),
    alternates: { canonical: `https://drphysioai.com/conditions/${c.slug}` },
  };
}

export default function ConditionPage({ params }: { params: { slug: string } }) {
  const c = getCondition(params.slug);
  if (!c) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${c.name} — Physiotherapy Treatment`,
    about: { "@type": "MedicalCondition", name: c.name },
    audience: "https://schema.org/Patient",
    url: `https://drphysioai.com/conditions/${c.slug}`,
    provider: { "@type": "MedicalBusiness", name: "DrPhysioAI" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar locale={getLocale()} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
          <div className="container-page relative">
            <a href="/conditions" className="text-sm font-semibold text-teal-600 hover:underline">
              ← All conditions
            </a>
            <div className="mt-4 flex items-center gap-4">
              <span className="grid h-16 w-16 place-items-center rounded-3xl bg-brand-soft text-4xl">
                {c.emoji}
              </span>
              <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                {c.name}
              </h1>
            </div>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{c.overview}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="/consultation">
                  <Stethoscope className="h-4 w-4" /> Book — ₹{c.price} ({c.service})
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={site.whatsappLink}>
                  <MessageCircle className="h-4 w-4 text-[#25D366]" /> Ask on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="container-page grid gap-6 lg:grid-cols-2">
            {/* Symptoms */}
            <Card className="p-7">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-coral-500" />
                <h2 className="font-display text-lg font-bold">Common symptoms</h2>
              </div>
              <ul className="mt-4 space-y-2.5">
                {c.symptoms.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-500" />
                    <span className="text-foreground/90">{s}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Causes */}
            <Card className="p-7">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-violet-500" />
                <h2 className="font-display text-lg font-bold">Common causes</h2>
              </div>
              <ul className="mt-4 space-y-2.5">
                {c.causes.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                    <span className="text-foreground/90">{s}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* How we help */}
            <Card className="p-7 lg:col-span-2">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal-600" />
                <h2 className="font-display text-lg font-bold">How DrPhysioAI helps</h2>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {c.howWeHelp.map((s) => (
                  <div key={s} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-500/15 text-teal-600">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-foreground/90">{s}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* CTA band */}
        <section className="pb-16 sm:pb-24">
          <div className="container-page">
            <Card className="relative overflow-hidden bg-brand-gradient p-8 text-center text-white sm:p-12">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Start your {c.name.toLowerCase()} recovery today
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-white/85">
                Talk to a licensed physiotherapist online and get a personalised plan — with a
                monthly consultation included in membership from ₹199.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button variant="secondary" size="lg" className="bg-white text-teal-700 hover:bg-white/90" asChild>
                  <a href="/consultation">Book consultation <ArrowRight className="h-4 w-4" /></a>
                </Button>
                <Button variant="outline" size="lg" className="border-white/50 bg-white/10 text-white hover:bg-white/20" asChild>
                  <a href="/find-program">Find my program</a>
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
