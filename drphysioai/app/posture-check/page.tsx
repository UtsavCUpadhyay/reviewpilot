import type { Metadata } from "next";
import { ScanLine, Camera, Sparkles, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { PostureCheck } from "@/components/site/posture-check";
import { Reveal } from "@/components/ui/reveal";
import { getLocale } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "Free AI Posture Check — Screen Your Posture in Seconds",
  description:
    "Upload a photo and get an instant AI posture screening. DrPhysioAI's AI physiotherapist spots forward head, rounded shoulders and uneven hips — with simple tips. Free, private, India.",
  alternates: { canonical: "https://drphysioai.com/posture-check" },
};

const steps = [
  { icon: Camera, title: "Snap a side-on photo", desc: "Stand sideways, full body in frame, against a plain wall." },
  { icon: ScanLine, title: "AI reads your posture", desc: "Claude Vision flags common patterns in a few seconds." },
  { icon: Sparkles, title: "Get simple tips", desc: "Clear observations plus a safe suggestion for each." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "AI Posture Check",
  url: "https://drphysioai.com/posture-check",
  description:
    "Free AI posture screening tool. Upload a photo to spot common posture patterns and get simple correction tips from DrPhysioAI.",
  about: { "@type": "MedicalCondition", name: "Posture assessment" },
  publisher: { "@type": "MedicalBusiness", name: "DrPhysioAI" },
};

export default function PostureCheckPage() {
  return (
    <>
      <Navbar locale={getLocale()} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
          <div className="container-page relative text-center">
            <span className="eyebrow mx-auto">
              <ScanLine className="h-3.5 w-3.5 text-teal-500" /> AI Posture Check
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Check your posture with <span className="text-gradient">AI, in seconds</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Upload one photo and our AI physiotherapist screens your standing posture —
              forward head, rounded shoulders, uneven hips — with a simple tip for each. Free and private.
            </p>
            <div className="mx-auto mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-teal-500" /> Instant result</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-teal-500" /> Photo never stored</span>
              <span className="inline-flex items-center gap-1.5"><Camera className="h-4 w-4 text-teal-500" /> No signup needed</span>
            </div>
          </div>
        </section>

        {/* Tool */}
        <section className="py-14 sm:py-16">
          <div className="container-page">
            <Reveal>
              <div className="mx-auto max-w-3xl">
                <PostureCheck />
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
