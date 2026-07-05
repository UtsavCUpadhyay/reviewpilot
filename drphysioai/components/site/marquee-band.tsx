import { ShieldCheck, Star, Clock, IndianRupee, Languages, Video } from "lucide-react";
import { conditions } from "@/lib/conditions";

/**
 * Two edge-faded marquee rows: conditions we treat, and quick trust points.
 * Pure-CSS infinite scroll (duplicated track) — inspired by the moving trust
 * bands on cult.fit / HealthifyMe.
 */
export function MarqueeBand() {
  const trust = [
    { icon: ShieldCheck, text: "Licensed physiotherapists" },
    { icon: Star, text: "4.9★ average rating" },
    { icon: IndianRupee, text: "UPI payments · from ₹499" },
    { icon: Clock, text: "Book in under a minute" },
    { icon: Video, text: "HD video consultations" },
    { icon: Languages, text: "English · हिन्दी · ગુજરાતી" },
  ];

  return (
    <section className="relative overflow-hidden py-8 sm:py-10" aria-label="Conditions we treat">
      {/* Row 1 — conditions, scrolling left */}
      <div className="marquee-mask flex">
        <ul className="flex shrink-0 animate-marquee items-center gap-3 pr-3">
          {[...conditions, ...conditions].map((c, i) => (
            <li
              key={`${c.slug}-${i}`}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card/70 px-4 py-2 text-sm font-semibold shadow-soft backdrop-blur"
            >
              <span className="text-lg">{c.emoji}</span>
              {c.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Row 2 — trust points, scrolling the other way */}
      <div className="marquee-mask mt-3 flex">
        <ul className="flex shrink-0 animate-marquee-reverse items-center gap-3 pr-3">
          {[...trust, ...trust].map((t, i) => (
            <li
              key={`${t.text}-${i}`}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-brand-soft px-4 py-2 text-sm font-semibold text-foreground/80"
            >
              <t.icon className="h-4 w-4 text-teal-600" />
              {t.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
