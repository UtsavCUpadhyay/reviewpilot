import { Radio, Users, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { liveClasses } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

export function LiveClasses() {
  const t = getDict(getLocale()).home.live;
  // duplicate the list so the marquee loops seamlessly
  const row = [...liveClasses, ...liveClasses];

  return (
    <section id="live" className="relative overflow-hidden py-20 sm:py-28">
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
        <div className="mt-6 flex justify-center">
          <Button variant="outline" asChild>
            <a href="/live-classes">
              {t.seeSchedule} <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      <div className="relative mt-12 flex flex-col gap-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex w-max animate-marquee gap-4">
          {row.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card/70 px-5 py-3 text-sm font-semibold shadow-soft backdrop-blur"
            >
              <Radio className="h-4 w-4 text-coral-500" /> {c}
            </span>
          ))}
        </div>
        <div className="flex w-max animate-marquee gap-4 [animation-direction:reverse]">
          {row.map((c, i) => (
            <span
              key={`b-${c}-${i}`}
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card/70 px-5 py-3 text-sm font-semibold shadow-soft backdrop-blur"
            >
              <Users className="h-4 w-4 text-teal-500" /> {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
