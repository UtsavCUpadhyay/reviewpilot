import { Quote, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Loved across India"
          title={
            <>
              Students recover their marks. <br className="hidden sm:block" />
              <span className="text-gradient">Patients recover their lives.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <Card className="flex h-full flex-col p-7 card-hover">
                <Quote className="h-8 w-8 text-teal-500/40" />
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground">
                  “{t.quote}”
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-gradient font-bold text-white">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
