import { MessageCircle, Mail, ShieldCheck, Languages, Sparkles, Stethoscope } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/content";

/**
 * "Meet the Founder" section — built around Dr. Utsav.
 *
 * PHOTO SLOT: to show a real headshot, drop the image in `public/` (e.g.
 * `public/founder.jpg`) and set FOUNDER_PHOTO to its path ("/founder.jpg").
 * While it's empty, a branded monogram avatar is shown instead — so the layout
 * looks finished either way.
 */
const FOUNDER_PHOTO = ""; // e.g. "/founder.jpg"

const trust = [
  { icon: Stethoscope, text: "Licensed physiotherapist" },
  { icon: Sparkles, text: "Founder, DrPhysioAI" },
  { icon: Languages, text: "English · हिन्दी · ગુજરાતી" },
  { icon: ShieldCheck, text: "Made in India" },
];

export function Founder() {
  return (
    <section id="founder" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-70" aria-hidden />
      <div className="container-page relative">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Avatar / photo */}
          <Reveal className="mx-auto w-full max-w-xs">
            <div className="relative">
              {/* glow behind */}
              <div className="absolute inset-4 rounded-[2.5rem] bg-brand-gradient opacity-30 blur-2xl" aria-hidden />

              <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/40 bg-brand-gradient p-1 shadow-card">
                <div className="grid h-full w-full place-items-center overflow-hidden rounded-[1.75rem] bg-card">
                  {FOUNDER_PHOTO ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={FOUNDER_PHOTO}
                      alt="Dr. Utsav Chiragkumar Upadhyay, Founder of DrPhysioAI"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-display text-7xl font-extrabold text-gradient">DU</span>
                  )}
                </div>
              </div>

              {/* floating accent chip */}
              <div className="absolute -bottom-4 -right-3 hidden animate-float rounded-2xl glass px-3.5 py-2.5 shadow-card sm:flex sm:items-center sm:gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-500/15 text-teal-600">
                  <Stethoscope className="h-4 w-4" />
                </span>
                <div className="text-xs">
                  <p className="font-bold leading-none">Dr. Utsav</p>
                  <p className="text-muted-foreground">Founder & Physio</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal delay={120}>
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5 text-teal-500" /> Meet the Founder
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl">
              Built by a physiotherapist, <span className="text-gradient">for India</span>
            </h2>
            <p className="mt-3 text-lg font-semibold">Dr. Utsav Chiragkumar Upadhyay</p>
            <p className="mt-4 max-w-xl text-muted-foreground">
              A practising physiotherapist who saw two problems every day: students drowning in
              scattered notes with no one to explain concepts at 2am, and patients — especially in
              smaller towns — unable to reach quality physiotherapy care. DrPhysioAI is his answer:
              one platform that teaches students like a great professor and treats patients like family.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {trust.map((t) => (
                <span
                  key={t.text}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur"
                >
                  <t.icon className="h-3.5 w-3.5 text-teal-500" /> {t.text}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <a href={site.whatsappLink}>
                  <MessageCircle className="h-4 w-4" /> Message Dr. Utsav
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={`mailto:${site.email}`}>
                  <Mail className="h-4 w-4" /> {site.email}
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
