import { Check, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { plans } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Premium care at an <span className="text-gradient">Indian price</span>
            </>
          }
          description="Start free forever. Upgrade any time. UPI, cards & net-banking with GST invoices — cancel whenever you like."
        />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 100} className="h-full">
              <Card
                className={cn(
                  "relative flex h-full flex-col p-7 card-hover",
                  p.highlight &&
                    "border-transparent shadow-glow ring-2 ring-teal-500/40",
                )}
              >
                {p.highlight && (
                  <>
                    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-brand-soft" />
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gradient px-3 py-1 text-xs font-bold text-white shadow-glow">
                      Most popular
                    </span>
                  </>
                )}
                <div className="relative">
                  <h3 className="font-display text-lg font-bold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-5 flex items-end gap-1">
                    <span className="font-display text-4xl font-extrabold tracking-tight">
                      {p.price}
                    </span>
                    <span className="pb-1 text-sm text-muted-foreground">{p.period}</span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-500/15 text-teal-600">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={p.highlight ? "primary" : "outline"}
                    size="lg"
                    className="mt-8 w-full"
                    asChild
                  >
                    <a href="#login">
                      {p.cta}
                      {p.highlight && <Sparkles className="h-4 w-4" />}
                    </a>
                  </Button>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Every registered user gets{" "}
          <span className="font-semibold text-foreground">1 free 5-min consultation</span> &{" "}
          <span className="font-semibold text-foreground">1 free live class</span> every month.
        </p>
      </div>
    </section>
  );
}
