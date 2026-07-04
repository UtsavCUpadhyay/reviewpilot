import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, ArrowRight, Lightbulb, Stethoscope, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getLocale } from "@/lib/i18n-server";
import { blogPosts, getPost } from "@/lib/blog";
import { getCondition } from "@/lib/conditions";
import { site } from "@/lib/content";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPost(params.slug);
  if (!p) return { title: "Article not found" };
  return {
    title: `${p.title} — DrPhysioAI`,
    description: p.excerpt,
    keywords: p.keywords,
    alternates: { canonical: `https://drphysioai.com/blog/${p.slug}` },
    openGraph: { title: p.title, description: p.excerpt, type: "article" },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = (post.related ?? []).map(getCondition).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "DrPhysioAI" },
    mainEntityOfPage: `https://drphysioai.com/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
  };

  return (
    <>
      <Navbar locale={getLocale()} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <section className="relative overflow-hidden pt-32 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
          <div className="container-page relative">
            <a href="/blog" className="text-sm font-semibold text-teal-600 hover:underline">
              ← All articles
            </a>
            <div className="mt-4 flex items-center gap-2">
              <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-bold text-teal-600">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> {post.readMin} min read
              </span>
            </div>
            <h1 className="mt-4 max-w-3xl font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              By {post.author} ·{" "}
              {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container-page">
            <article className="mx-auto max-w-3xl space-y-5 text-[15px] leading-relaxed text-foreground/90">
              {post.body.map((block, i) => {
                if (block.type === "h2") {
                  return (
                    <h2 key={i} className="pt-4 font-display text-xl font-bold text-foreground">
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "ul") {
                  return (
                    <ul key={i} className="space-y-2">
                      {block.items.map((it) => (
                        <li key={it} className="flex items-start gap-2.5">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === "tip") {
                  return (
                    <div key={i} className="flex items-start gap-3 rounded-2xl bg-brand-soft p-4">
                      <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                      <p className="text-sm text-foreground/90">{block.text}</p>
                    </div>
                  );
                }
                return <p key={i}>{block.text}</p>;
              })}

              {/* Medical disclaimer */}
              <p className="rounded-xl border border-border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
                This article is general education, not a medical diagnosis. For persistent or severe
                symptoms, consult a licensed physiotherapist.
              </p>
            </article>

            {/* Related conditions */}
            {related.length > 0 && (
              <div className="mx-auto mt-10 max-w-3xl">
                <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  Related conditions
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {related.map((c) => (
                    <a
                      key={c!.slug}
                      href={`/conditions/${c!.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-semibold transition-colors hover:border-teal-500/50"
                    >
                      {c!.emoji} {c!.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mx-auto mt-12 max-w-3xl">
              <Card className="relative overflow-hidden bg-brand-gradient p-8 text-center text-white sm:p-10">
                <h2 className="font-display text-2xl font-bold">Get a plan built for you</h2>
                <p className="mx-auto mt-2 max-w-xl text-sm text-white/90">
                  Talk to a licensed physiotherapist online — one free 5-minute consult every month,
                  video sessions from ₹499, paid instantly by UPI.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <Button variant="secondary" className="bg-white text-teal-700 hover:bg-white/90" asChild>
                    <a href="/consultation"><Stethoscope className="h-4 w-4" /> Book consultation <ArrowRight className="h-4 w-4" /></a>
                  </Button>
                  <Button variant="outline" className="border-white/50 bg-white/10 text-white hover:bg-white/20" asChild>
                    <a href={site.whatsappLink}><MessageCircle className="h-4 w-4" /> WhatsApp us</a>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
