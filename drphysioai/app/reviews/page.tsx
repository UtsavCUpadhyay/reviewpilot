import type { Metadata } from "next";
import { Star, Quote, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { ReviewForm } from "@/components/site/review-form";
import { createClient } from "@/lib/supabase/server";
import { getLocale } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reviews — What Our Patients & Students Say",
  description:
    "Real reviews from DrPhysioAI patients and physiotherapy students across India. Read their experiences and leave your own.",
  alternates: { canonical: "https://www.drphysioai.com/reviews" },
};

type Review = {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  title: string | null;
  body: string;
  created_at: string;
};

function Stars({ n, className = "" }: { n: number; className?: string }) {
  return (
    <div className={`flex ${className}`} aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i <= n ? "fill-amber-400 text-amber-400" : "fill-transparent text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

export default async function ReviewsPage() {
  let reviews: Review[] = [];
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("reviews")
      .select("id, name, location, rating, title, body, created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(60);
    reviews = (data as Review[]) ?? [];
  } catch {
    reviews = [];
  }

  const count = reviews.length;
  const avg = count ? reviews.reduce((s, r) => s + r.rating, 0) / count : 0;

  const jsonLd = count
    ? {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "DrPhysioAI",
        url: "https://www.drphysioai.com",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: avg.toFixed(1),
          reviewCount: count,
          bestRating: 5,
          worstRating: 1,
        },
        review: reviews.slice(0, 12).map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.name },
          reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
          reviewBody: r.body,
          datePublished: r.created_at.slice(0, 10),
        })),
      }
    : null;

  return (
    <>
      <Navbar locale={getLocale()} />
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
          <div className="container-page relative text-center">
            <span className="eyebrow mx-auto">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> Reviews
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Loved by patients & <span className="text-gradient">students across India</span>
            </h1>
            {count > 0 && (
              <div className="mx-auto mt-6 inline-flex items-center gap-3 rounded-full border border-border bg-card/60 px-5 py-2.5 shadow-soft backdrop-blur">
                <span className="font-display text-2xl font-extrabold text-gradient">{avg.toFixed(1)}</span>
                <Stars n={Math.round(avg)} />
                <span className="text-sm text-muted-foreground">{count} review{count !== 1 ? "s" : ""}</span>
              </div>
            )}
          </div>
        </section>

        {/* Reviews grid */}
        <section className="py-14 sm:py-16">
          <div className="container-page">
            {count > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((r, i) => (
                  <Reveal key={r.id} delay={(i % 3) * 80}>
                    <Card className="flex h-full flex-col p-6">
                      <div className="flex items-center justify-between">
                        <Stars n={r.rating} />
                        <Quote className="h-5 w-5 text-teal-500/40" />
                      </div>
                      {r.title && <h3 className="mt-3 font-display text-base font-bold">{r.title}</h3>}
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/90">{r.body}</p>
                      <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                          {r.name.slice(0, 1).toUpperCase()}
                        </span>
                        <div className="text-xs">
                          <p className="font-bold">{r.name}</p>
                          {r.location && <p className="text-muted-foreground">{r.location}</p>}
                        </div>
                      </div>
                    </Card>
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                Be the first to share your experience — leave a review below.
              </p>
            )}
          </div>
        </section>

        {/* Leave a review */}
        <section className="relative pb-20 sm:pb-24">
          <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" aria-hidden />
          <div className="container-page relative">
            <div className="mx-auto max-w-2xl">
              <ReviewForm />
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Prefer WhatsApp? You can also{" "}
                <a href="https://wa.me/919737206393" className="inline-flex items-center gap-1 font-semibold text-teal-600 hover:underline">
                  <MessageCircle className="h-3.5 w-3.5" /> message us your feedback
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
