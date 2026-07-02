import type { Metadata } from "next";
import { Home, Sparkles, Stethoscope, Radio } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

const links = [
  { href: "/ai", label: "AI Learning", icon: Sparkles },
  { href: "/consultation", label: "Consultation", icon: Stethoscope },
  { href: "/live-classes", label: "Live Classes", icon: Radio },
];

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
        <section className="container-page relative flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
          <p className="font-display text-7xl font-extrabold tracking-tight text-gradient sm:text-8xl">
            404
          </p>
          <h1 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
            This page took a rest day
          </h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            The page you&apos;re looking for moved or never existed. Let&apos;s get you back to
            learning and healing.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild>
              <a href="/"><Home className="h-4 w-4" /> Back to home</a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm font-semibold shadow-soft backdrop-blur transition-colors hover:bg-muted"
              >
                <l.icon className="h-4 w-4 text-teal-500" /> {l.label}
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
