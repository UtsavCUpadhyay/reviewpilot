import { CalendarCheck, MessageCircle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Icon } from "./icon";
import { consultationServices, site } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

export function Consultation() {
  const t = getDict(getLocale()).home.consultation;
  return (
    <section id="consultation" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-70" aria-hidden />
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

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {consultationServices.map((s, i) => (
            <Reveal key={s.icon} delay={(i % 3) * 90}>
              <a href="/consultation" className="block h-full">
                <Card className="flex h-full items-start gap-4 p-6 card-hover">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-violet-600">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold">{t.services[i].title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{t.services[i].desc}</p>
                  </div>
                </Card>
              </a>
            </Reveal>
          ))}
        </div>

        {/* booking CTA band */}
        <Reveal className="mt-8">
          <Card className="flex flex-col items-center gap-6 overflow-hidden bg-brand-gradient p-8 text-white sm:flex-row sm:justify-between sm:p-10">
            <div className="max-w-lg text-center sm:text-left">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                <CalendarCheck className="h-4 w-4" /> {t.band.badge}
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                {t.band.title}
              </h3>
              <p className="mt-2 text-white/85">{t.band.desc}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <Button variant="secondary" size="lg" className="bg-white text-teal-700 hover:bg-white/90" asChild>
                <a href="#pricing">
                  {t.band.book} <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <a
                href={site.whatsappLink}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" /> {site.whatsapp}
              </a>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
