import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "./icon";
import { steps } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

export function HowItWorks() {
  const t = getDict(getLocale()).home.how;
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={
            <>
              {t.titlePre} <br className="hidden sm:block" />
              <span className="text-gradient">{t.titleAccent}</span>
            </>
          }
          description={t.desc}
        />

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          {/* connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />

          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120} className="relative text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                <Icon name={s.icon} className="h-7 w-7" />
              </div>
              <span className="mt-4 block font-display text-sm font-extrabold tracking-widest text-muted-foreground">
                {t.stepWord} {s.n}
              </span>
              <h3 className="mt-1 font-display text-xl font-bold">{t.steps[i].title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
                {t.steps[i].desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
