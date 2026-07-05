import type { Metadata } from "next";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { getLocale } from "@/lib/i18n-server";
import { sortedPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Physiotherapy Blog — Exercises, Pain Relief & Recovery Tips",
  description:
    "Expert physiotherapy advice for India: back and neck pain relief, knee recovery, posture fixes, and study tips for physiotherapy students. Evidence-based guides.",
  alternates: { canonical: "https://www.drphysioai.com/blog" },
};

export default function BlogIndexPage() {
  const posts = sortedPosts();
  const [featured, ...rest] = posts;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "DrPhysioAI Blog",
    url: "https://www.drphysioai.com/blog",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `https://www.drphysioai.com/blog/${p.slug}`,
      datePublished: p.date,
      author: { "@type": "Person", name: p.author },
    })),
  };

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
              <BookOpen className="h-3.5 w-3.5 text-teal-500" /> Physiotherapy Blog
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Move well, <span className="text-gradient">live better</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Evidence-based physiotherapy tips for pain relief, recovery and healthy movement —
              written by licensed physiotherapists.
            </p>
            <div className="mx-auto mt-6 flex flex-wrap justify-center gap-4 text-sm font-semibold">
              <a href="/glossary" className="text-teal-600 hover:underline">Browse the physiotherapy glossary →</a>
              <a href="/conditions" className="text-teal-600 hover:underline">Explore conditions →</a>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="pt-12 sm:pt-16">
          <div className="container-page">
            <Reveal>
              <a href={`/blog/${featured.slug}`} className="group block">
                <Card className="grid gap-0 overflow-hidden p-0 card-hover md:grid-cols-2">
                  <div className="flex items-center justify-center bg-brand-gradient p-10 text-7xl sm:text-8xl">
                    {featured.emoji}
                  </div>
                  <div className="p-7 sm:p-8">
                    <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-bold text-teal-600">
                      {featured.category}
                    </span>
                    <h2 className="mt-3 font-display text-2xl font-bold leading-tight">
                      {featured.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">{featured.excerpt}</p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{featured.author}</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featured.readMin} min</span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-600 group-hover:gap-2 transition-all">
                      Read article <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Card>
              </a>
            </Reveal>
          </div>
        </section>

        {/* Grid */}
        <section className="py-12 sm:py-16">
          <div className="container-page">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 90}>
                  <a href={`/blog/${p.slug}`} className="group block h-full">
                    <Card className="flex h-full flex-col p-6 card-hover">
                      <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-soft text-xl">
                          {p.emoji}
                        </span>
                        <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
                          {p.category}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-lg font-bold leading-tight">{p.title}</h3>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {p.readMin} min</span>
                        <span className="inline-flex items-center gap-1 font-semibold text-teal-600 group-hover:gap-2 transition-all">
                          Read <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </Card>
                  </a>
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
