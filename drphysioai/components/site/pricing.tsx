import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { PlanCta } from "./plan-cta";
import { plans } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { cn } from "@/lib/utils";

export function Pricing() {
  const t = getDict(getLocale()).home.pricing;
  return (
    <section id="pricing" className="relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={
            <>
              {t.titlePre} <span className="text-gradient">{t.titleAccent}</span>
            </>
          }
          description={t.desc}
        />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 100} className="h-full">
              <Card
                className={cn(
                  "relative flex h-full flex-col p-7 card-hover",
                  p.highlight
                    ? "border-transparent shadow-glow ring-2 ring-teal-500/40"
                    : "card-glow",
                )}
              >
                {p.highlight && (
                  <>
                    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-brand-soft" />
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gradient px-3 py-1 text-xs font-bold text-white shadow-glow">
                      {t.mostPopular}
                    </span>
                  </>
                )}
                <div className="relative">
                  <h3 className="font-display text-lg font-bold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.plans[i].desc}</p>
                  <div className="mt-5 flex items-end gap-1">
                    <span className="font-display text-4xl font-extrabold tracking-tight">
                      {p.price}
                    </span>
                    <span className="pb-1 text-sm text-muted-foreground">{t.plans[i].period}</span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {t.plans[i].features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-500/15 text-teal-600">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <PlanCta
                    name={p.name}
                    price={p.price}
                    cta={t.plans[i].cta}
                    highlight={p.highlight}
                  />
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          {t.footNote}
        </p>
      </div>
    </section>
  );
}
