import type { Metadata } from "next";
import { Gift, UserPlus, IndianRupee, HeartHandshake } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { ReferralWidget } from "@/components/site/referral-widget";
import { Reveal } from "@/components/ui/reveal";
import { getLocale } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "Refer & Earn — Give ₹100, Get ₹100 | DrPhysioAI",
  description:
    "Invite friends to DrPhysioAI. They get ₹100 off their first online physiotherapy consultation, and you get ₹100 too. Share your link on WhatsApp in seconds.",
  alternates: { canonical: "https://www.drphysioai.com/refer" },
};

const steps = [
  { icon: Gift, title: "Share your link", desc: "Copy your unique invite link or share it on WhatsApp." },
  { icon: UserPlus, title: "Friend signs up", desc: "They join DrPhysioAI and book their first consultation." },
  { icon: IndianRupee, title: "You both save ₹100", desc: "₹100 off for them — and ₹100 credited to you." },
];

export default function ReferPage() {
  return (
    <>
      <Navbar locale={getLocale()} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
          <div className="container-page relative text-center">
            <span className="eyebrow mx-auto">
              <HeartHandshake className="h-3.5 w-3.5 text-teal-500" /> Refer & Earn
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Share health, <span className="text-gradient">earn rewards</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Help a friend move pain-free — and you both get ₹100 off. It's the easiest way to
              give great physiotherapy and save at the same time.
            </p>
          </div>
        </section>

        {/* Widget */}
        <section className="py-12 sm:py-16">
          <div className="container-page">
            <Reveal>
              <div className="mx-auto max-w-lg">
                <ReferralWidget />
              </div>
            </Reveal>
          </div>
        </section>

        {/* How it works */}
        <section className="relative pb-20 sm:pb-24">
          <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" aria-hidden />
          <div className="container-page relative">
            <div className="grid gap-5 md:grid-cols-3">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 90}>
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-violet-600">
                      <s.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold">{s.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
