import type { Metadata } from "next";
import { MessageCircle, Mail, MapPin, Clock, Building2 } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with DrPhysioAI — WhatsApp, email, and demo requests.",
  alternates: { canonical: "https://drphysioai.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-32 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
          <div className="container-page relative max-w-2xl text-center">
            <span className="eyebrow mx-auto"><MessageCircle className="h-3.5 w-3.5 text-teal-500" /> Contact</span>
            <h1 className="mx-auto mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              We&apos;d love to <span className="text-gradient">hear from you</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Questions, demos, partnerships or support — WhatsApp is the fastest way to reach us.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Contact methods */}
            <div className="space-y-4">
              <a href={site.whatsappLink} className="block">
                <Card className="flex items-center gap-4 p-5 card-hover">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#25D366]/15 text-[#25D366]"><MessageCircle className="h-6 w-6" /></span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-teal-600">Primary · fastest</p>
                    <p className="font-display text-lg font-bold">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">{site.whatsapp}</p>
                  </div>
                </Card>
              </a>
              <a href={`mailto:${site.email}`} className="block">
                <Card className="flex items-center gap-4 p-5 card-hover">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-teal-600"><Mail className="h-6 w-6" /></span>
                  <div>
                    <p className="font-display text-lg font-bold">Email</p>
                    <p className="text-sm text-muted-foreground">{site.email}</p>
                  </div>
                </Card>
              </a>
              <Card className="space-y-3 p-5 text-sm">
                <p className="flex items-center gap-2.5"><Building2 className="h-4 w-4 text-teal-500" /> <span className="font-semibold">{site.name}</span> · Founder {site.founder}</p>
                <p className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-teal-500" /> India · serving clinics worldwide</p>
                <p className="flex items-center gap-2.5"><Clock className="h-4 w-4 text-teal-500" /> Support: Mon–Sat, 9am–8pm IST</p>
              </Card>
            </div>

            {/* Form (stub) */}
            <Card className="p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold">Send a message</h2>
              <p className="mt-1 text-sm text-muted-foreground">We usually reply within one business day.</p>
              <form className="mt-6 space-y-4" action={site.whatsappLink} method="get">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" placeholder="Your name" />
                  <Field label="Email" type="email" placeholder="you@clinic.com" />
                </div>
                <Field label="Clinic / organisation" placeholder="Optional" />
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold">Message</span>
                  <textarea rows={4} placeholder="How can we help?"
                    className="w-full resize-y rounded-xl border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
                </label>
                <Button type="submit" size="lg" className="w-full">Send via WhatsApp</Button>
                <p className="text-center text-xs text-muted-foreground">This opens WhatsApp to send your message. Prefer email? Write to {site.email}.</p>
              </form>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      <input type={type} placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}
