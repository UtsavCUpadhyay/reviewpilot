import type { Metadata } from "next";
import { Target, Eye, Heart, ShieldCheck, Sparkles, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "The story, mission and vision behind DrPhysioAI — the clinical operating system for physiotherapy.",
  alternates: { canonical: "https://drphysioai.com/about" },
};

const values = [
  { icon: ShieldCheck, title: "Clinician-first", desc: "The clinician always decides. We build tools that increase confidence, never replace judgment." },
  { icon: Sparkles, title: "Transparent AI", desc: "Every suggestion shows its reasoning and evidence. No black boxes in clinical work." },
  { icon: Heart, title: "Better outcomes", desc: "We measure success by patient outcomes and time given back to clinicians." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-32 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
          <div className="container-page relative max-w-3xl text-center">
            <span className="eyebrow mx-auto"><Sparkles className="h-3.5 w-3.5 text-teal-500" /> Our story</span>
            <h1 className="mx-auto mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Building the operating system for <span className="text-gradient">physiotherapy</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              DrPhysioAI was founded by a physiotherapist who believes clinicians should
              spend less time on paperwork and more time with patients — supported by AI
              that reasons transparently and respects clinical judgment.
            </p>
          </div>
        </section>

        {/* Mission / Vision */}
        <section className="py-16 sm:py-24">
          <div className="container-page grid gap-6 lg:grid-cols-2">
            <Reveal>
              <Card className="h-full p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-teal-600"><Target className="h-6 w-6" /></span>
                <h2 className="mt-5 font-display text-2xl font-bold">Our mission</h2>
                <p className="mt-2 text-muted-foreground">To give every physiotherapist a trustworthy AI partner that supports clinical reasoning, cuts documentation time, and helps deliver evidence-based care — anywhere in the world.</p>
              </Card>
            </Reveal>
            <Reveal delay={100}>
              <Card className="h-full p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-violet-600"><Eye className="h-6 w-6" /></span>
                <h2 className="mt-5 font-display text-2xl font-bold">Our vision</h2>
                <p className="mt-2 text-muted-foreground">A global standard for digital physiotherapy — used across clinics, hospitals, universities and sports teams — where great care is faster, more consistent, and more accessible.</p>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 sm:py-24">
          <div className="container-page">
            <SectionHeading eyebrow="Why DrPhysioAI" title={<>What we <span className="text-gradient">believe</span></>} />
            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 90}>
                  <Card className="h-full p-6 card-hover">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-teal-600"><v.icon className="h-6 w-6" /></span>
                    <h3 className="mt-5 font-display text-lg font-bold">{v.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="py-16 sm:py-24">
          <div className="container-page">
            <Reveal>
              <Card className="flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:text-left sm:p-10">
                <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-brand-gradient font-display text-2xl font-extrabold text-white">UC</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-600">Founder</p>
                  <h3 className="mt-1 font-display text-xl font-bold">{site.founder}</h3>
                  <p className="mt-1 text-sm font-semibold text-muted-foreground">
                    BPT, Sumandeep Vidyapeeth Deemed University (Vadodara) · Master of Advanced Public Health, Queensland, Australia
                  </p>
                  <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                    A physiotherapist on a mission to make world-class clinical reasoning and
                    documentation available to every practitioner — from a solo home-visit physio
                    to a hospital rehabilitation department.
                  </p>
                  <a href={site.whatsappLink} className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-bold text-white">
                    <MessageCircle className="h-4 w-4" /> {site.whatsapp}
                  </a>
                </div>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24">
          <div className="container-page text-center">
            <Button size="lg" asChild><a href="/pricing">Start your 7-day free trial</a></Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
