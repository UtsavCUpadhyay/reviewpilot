import type { Metadata } from "next";
import { Fragment } from "react";
import { Check, Minus, Sparkles, ShieldCheck, Stethoscope } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { saasPlans, planComparison, pricingFaqs } from "@/lib/clinical";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing — Plans for clinicians, clinics & enterprises",
  description:
    "Simple DrPhysioAI pricing: Solo, Clinic and Enterprise. 7-day free trial, cancel anytime. Compare features across plans.",
  alternates: { canonical: "https://drphysioai.com/pricing" },
};

function extLink(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
          <div className="container-page relative text-center">
            <span className="eyebrow mx-auto"><Sparkles className="h-3.5 w-3.5 text-teal-500" /> Pricing</span>
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Simple plans, <span className="text-gradient">7-day free trial</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Start free, cancel anytime. From a single physiotherapist to a whole
              hospital — pay only for what your practice needs.
            </p>
          </div>
        </section>

        {/* Plan cards */}
        <section className="py-14 sm:py-16">
          <div className="container-page grid items-stretch gap-6 lg:grid-cols-3">
            {saasPlans.map((p, i) => (
              <Reveal key={p.name} delay={i * 90} className="h-full">
                <Card className={cn("relative flex h-full flex-col p-7 card-hover", p.highlight && "border-transparent shadow-glow ring-2 ring-teal-500/40")}>
                  {p.highlight && (
                    <>
                      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-brand-soft" />
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gradient px-3 py-1 text-xs font-bold text-white shadow-glow">Most popular</span>
                    </>
                  )}
                  <div className="relative">
                    <h3 className="font-display text-lg font-bold">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                    <div className="mt-5 flex items-end gap-1">
                      <span className="font-display text-4xl font-extrabold tracking-tight">{p.price}</span>
                      <span className="pb-1 text-xs text-muted-foreground">{p.period}</span>
                    </div>
                    <ul className="mt-6 space-y-3">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-500/15 text-teal-600"><Check className="h-3.5 w-3.5" /></span>
                          <span className="text-foreground/90">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant={p.highlight ? "primary" : "outline"} size="lg" className="mt-8 w-full" asChild>
                      <a href={p.href} {...extLink(p.href)}>{p.cta}</a>
                    </Button>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
          <p className="container-page mt-6 text-center text-xs text-muted-foreground">
            Prices shown per month. Taxes/GST calculated at checkout. Solo & Clinic checkout securely; Enterprise is custom-quoted.
          </p>
        </section>

        {/* Comparison table */}
        <section className="py-16 sm:py-24">
          <div className="container-page">
            <SectionHeading eyebrow="Compare" title={<>Every feature, <span className="text-gradient">side by side</span></>} />
            <div className="mt-12 overflow-x-auto rounded-3xl border border-border shadow-soft">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-4 text-left font-display text-base font-bold">Feature</th>
                    {["Solo", "Clinic", "Enterprise"].map((n) => (
                      <th key={n} className={cn("p-4 text-center font-display text-base font-bold", n === "Clinic" && "text-teal-600")}>{n}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {planComparison.map((grp) => (
                    <Fragment key={grp.group}>
                      <tr className="bg-muted/30">
                        <td colSpan={4} className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{grp.group}</td>
                      </tr>
                      {grp.rows.map((r) => (
                        <tr key={r.feature} className="border-t border-border">
                          <td className="p-4 text-foreground/90">{r.feature}</td>
                          {[r.solo, r.clinic, r.enterprise].map((v, i) => (
                            <td key={i} className="p-4 text-center">
                              {typeof v === "string"
                                ? <span className="text-sm font-semibold">{v}</span>
                                : v
                                  ? <Check className="mx-auto h-5 w-5 text-teal-600" />
                                  : <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" />}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                  <tr className="border-t border-border bg-muted/30">
                    <td className="p-4 font-bold">Price</td>
                    {saasPlans.map((p) => (
                      <td key={p.name} className="p-4 text-center">
                        <span className="font-display text-lg font-extrabold">{p.price}</span>
                        <span className="block text-[11px] text-muted-foreground">{p.period}</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4" />
                    {saasPlans.map((p) => (
                      <td key={p.name} className="p-4 text-center">
                        <Button size="sm" variant={p.highlight ? "primary" : "outline"} asChild>
                          <a href={p.href} {...extLink(p.href)}>{p.cta}</a>
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-24">
          <div className="container-page max-w-3xl">
            <SectionHeading eyebrow="Pricing FAQ" title="Good to know" />
            <div className="mt-10 space-y-3">
              {pricingFaqs.map((f) => (
                <Reveal key={f.q}>
                  <Card className="p-5">
                    <h3 className="font-display text-base font-bold">{f.q}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{f.a}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-teal-500" /> 7-day free trial</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-teal-500" /> Cancel anytime</span>
              <span className="inline-flex items-center gap-1.5"><Stethoscope className="h-4 w-4 text-teal-500" /> Decision-support, clinician decides</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
