import type { Metadata } from "next";
import { Radio, CalendarDays, Gift } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { getLocale } from "@/lib/i18n-server";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { LiveSchedule } from "@/components/site/live-schedule";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/site/icon";
import { liveClassHighlights, liveClassSchedule, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Live Exercise Classes — Join Physio-Led Sessions from Home",
  description:
    "Weekly live physiotherapy-led exercise classes in India — back & neck pain relief, senior balance, prenatal, mobility and sports performance. Join from home; one class every month included with membership.",
  alternates: { canonical: "https://drphysioai.com/live-classes" },
};

const weeklyCount = liveClassSchedule.length;

export default function LiveClassesPage() {
  return (
    <>
      <Navbar locale={getLocale()} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
          <div className="container-page relative text-center">
            <span className="eyebrow mx-auto">
              <Radio className="h-3.5 w-3.5 text-coral-500" /> Live Classes
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Move with a physio, <span className="text-gradient">live from home</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              {weeklyCount} guided sessions every week — from back-pain relief and senior
              balance to prenatal care and sports performance. Real-time coaching, small
              groups, one class every month included with membership.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild>
                <a href="#schedule">
                  <CalendarDays className="h-4 w-4" /> See this week&apos;s schedule
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/signup">
                  <Gift className="h-4 w-4" /> Join for ₹199/month
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Why live */}
        <section className="py-16 sm:py-20">
          <div className="container-page">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {liveClassHighlights.map((h, i) => (
                <Reveal key={h.title} delay={(i % 4) * 80}>
                  <Card className="flex h-full flex-col p-6 card-hover">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-teal-600">
                      <Icon name={h.icon} className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-display text-base font-bold">{h.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{h.desc}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section id="schedule" className="relative py-16 sm:py-24">
          <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" aria-hidden />
          <div className="container-page relative">
            <SectionHeading
              eyebrow="Weekly schedule"
              title={<>This week, <span className="text-gradient">live in IST</span></>}
              description="Filter by focus, then reserve your spot. All times are India Standard Time; replays stay available for 7 days."
            />
            <div className="mt-12">
              <LiveSchedule />
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="py-16 sm:py-20">
          <div className="container-page">
            <Reveal>
              <Card className="relative overflow-hidden p-8 text-center shadow-card sm:p-12">
                <div className="pointer-events-none absolute inset-0 bg-brand-soft" aria-hidden />
                <div className="relative">
                  <h2 className="font-display text-2xl font-bold sm:text-3xl">
                    Unlimited live classes with <span className="text-gradient">Complete Care</span>
                  </h2>
                  <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                    Every membership includes one class a month. Go unlimited — plus a
                    personal physiotherapist and monthly 1:1 consultations — with Complete Care.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <Button size="lg" asChild>
                      <a href="/#pricing">View plans</a>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <a href={site.whatsappLink}>Ask on WhatsApp</a>
                    </Button>
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
