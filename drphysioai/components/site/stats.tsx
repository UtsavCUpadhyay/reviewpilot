import { Reveal } from "@/components/ui/reveal";
import { stats } from "@/lib/content";

export function Stats() {
  return (
    <section className="container-page relative -mt-4 py-14 sm:py-20">
      <div className="grid grid-cols-2 gap-4 rounded-4xl border border-border bg-card/60 p-6 shadow-soft backdrop-blur sm:p-8 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 90}
            className="flex flex-col items-center text-center"
          >
            <span className="font-display text-3xl font-extrabold tracking-tight text-gradient sm:text-4xl">
              {s.value}
            </span>
            <span className="mt-1 text-sm font-semibold">{s.label}</span>
            <span className="text-xs text-muted-foreground">{s.hint}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
