import { Sparkles, MessageCircle, Stethoscope } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/content";

export function CTA() {
  return (
    <section id="demo" className="relative py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-5xl bg-brand-gradient bg-[length:200%_200%] p-10 text-center text-white shadow-glow animate-gradient-pan sm:p-16">
            <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 -right-8 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> Join 1.7 lakh+ learners & patients
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
              Learn. Recover. Move better — starting today.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">
              Your personal AI physiotherapist and a real doctor, in one app.
              Free to start — no card needed.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-teal-700 hover:bg-white/90"
                asChild
              >
                <a href="#pricing">
                  Start Free <Sparkles className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/50 bg-white/10 text-white hover:bg-white/20"
                asChild
              >
                <a href="#consultation">
                  <Stethoscope className="h-4 w-4" /> Book Consultation
                </a>
              </Button>
              <a
                href={site.whatsappLink}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold shadow-card transition-transform hover:scale-[1.03]"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
