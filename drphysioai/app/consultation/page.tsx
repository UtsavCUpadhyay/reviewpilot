import type { Metadata } from "next";
import { Stethoscope, CalendarCheck, Video, FileText, BellRing } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { getLocale } from "@/lib/i18n-server";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { BookingWidget } from "@/components/site/booking-widget";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/site/icon";
import { consultationServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Doctor Consultation — Online Physiotherapy from Home",
  description:
    "Book a licensed physiotherapist online in India. Video consultations, exercise prescriptions, post-surgical & sports rehab, with UPI payment and WhatsApp reminders.",
  alternates: { canonical: "https://drphysioai.com/consultation" },
};

const included = [
  { icon: Video, label: "HD video session" },
  { icon: FileText, label: "Exercise plan + report" },
  { icon: BellRing, label: "WhatsApp reminder" },
  { icon: CalendarCheck, label: "Google Calendar invite" },
];

export default function ConsultationPage() {
  return (
    <>
      <Navbar locale={getLocale()} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
          <div className="container-page relative text-center">
            <span className="eyebrow mx-auto">
              <Stethoscope className="h-3.5 w-3.5 text-teal-500" /> Doctor Consultation
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Real physiotherapists, <span className="text-gradient">booked in a minute</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Licensed experts, from the comfort of home. Every registered user gets a
              free 5-minute consultation each month — no card needed.
            </p>
            <div className="mx-auto mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {included.map((i) => (
                <span key={i.label} className="inline-flex items-center gap-1.5">
                  <i.icon className="h-4 w-4 text-teal-500" /> {i.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Booking */}
        <section className="py-16 sm:py-20">
          <div className="container-page">
            <Reveal>
              <Card className="p-6 shadow-card sm:p-8 lg:p-10">
                <BookingWidget />
              </Card>
            </Reveal>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="relative py-16 sm:py-24">
          <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" aria-hidden />
          <div className="container-page relative">
            <SectionHeading
              eyebrow="What we treat"
              title={<>Expert care for <span className="text-gradient">every condition</span></>}
              description="From everyday aches to complex neurological rehab — matched to the right specialist."
            />
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {consultationServices.map((s, i) => (
                <Reveal key={s.title} delay={(i % 3) * 90}>
                  <Card className="flex h-full items-start gap-4 p-6 card-hover">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-violet-600">
                      <Icon name={s.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-base font-bold">{s.title}</h3>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-bold text-muted-foreground">
                          ₹{s.price}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </Card>
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
