import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "./icon";
import { aiFeatures } from "@/lib/content";

export function Features() {
  return (
    <section id="ai" className="relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="AI Learning"
          title={
            <>
              An AI tutor that explains like your{" "}
              <span className="text-gradient">favourite professor</span>
            </>
          }
          description="From first-year anatomy to final-year OSCE — get notes, revision, quizzes and voice answers tailored to exactly how you learn."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aiFeatures.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 90}>
              <Card className="group h-full p-6 card-hover">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-teal-600 transition-transform duration-300 group-hover:scale-110">
                    <Icon name={f.icon} className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {f.tag}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
