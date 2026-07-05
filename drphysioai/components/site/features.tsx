import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "./icon";
import { aiFeatures } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

export function Features() {
  const t = getDict(getLocale()).home.features;
  return (
    <section id="ai" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40" aria-hidden />
      <div className="container-page relative">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={
            <>
              {t.titlePre} <span className="text-gradient">{t.titleAccent}</span>
            </>
          }
          description={t.desc}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aiFeatures.map((f, i) => (
            <Reveal key={f.icon} delay={(i % 3) * 90}>
              <Card className="group h-full p-6 card-glow card-hover">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-teal-600 transition-transform duration-300 group-hover:scale-110">
                    <Icon name={f.icon} className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {t.items[i].tag}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{t.items[i].title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t.items[i].desc}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
