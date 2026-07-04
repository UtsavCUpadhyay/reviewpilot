import type { ReactNode } from "react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { getLocale } from "@/lib/i18n-server";

/**
 * Shared shell for simple content pages (About, Contact, legal, etc.) — navbar,
 * a gradient title header, a readable prose column, and the footer.
 */
export function ContentPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar locale={getLocale()} />
      <main>
        <section className="relative overflow-hidden pt-32 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
          <div className="container-page relative">
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              {title}
            </h1>
            {intro && (
              <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>
            )}
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="container-page">
            <div className="prose-dpa mx-auto max-w-3xl space-y-5 text-[15px] leading-relaxed text-foreground/90">
              {children}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}

/** Small helper for a section heading inside a content page. */
export function ContentHeading({ children }: { children: ReactNode }) {
  return <h2 className="pt-4 font-display text-xl font-bold text-foreground">{children}</h2>;
}
