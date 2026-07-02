import { Navbar } from "@/components/site/navbar";
import { getLocale } from "@/lib/i18n-server";
import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { Features } from "@/components/site/features";
import { HowItWorks } from "@/components/site/how-it-works";
import { Consultation } from "@/components/site/consultation";
import { LiveClasses } from "@/components/site/live-classes";
import { Testimonials } from "@/components/site/testimonials";
import { Pricing } from "@/components/site/pricing";
import { FAQ } from "@/components/site/faq";
import { CTA } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";

export default function HomePage() {
  return (
    <>
      <Navbar locale={getLocale()} />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <Consultation />
        <LiveClasses />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
