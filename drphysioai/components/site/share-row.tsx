"use client";

import * as React from "react";
import { MessageCircle, Facebook, Link2, Check, Share2 } from "lucide-react";

/**
 * One-tap share row (WhatsApp-first — that's how India shares). Builds the full
 * URL on the client; falls back to the canonical www domain during SSR.
 */
export function ShareRow({ path, title }: { path: string; title: string }) {
  const [copied, setCopied] = React.useState(false);
  const [url, setUrl] = React.useState(`https://www.drphysioai.com${path}`);

  React.useEffect(() => {
    if (typeof window !== "undefined") setUrl(window.location.href);
  }, []);

  const text = `${title} — via DrPhysioAI`;
  const enc = encodeURIComponent;
  const whatsapp = `https://wa.me/?text=${enc(`${text}\n${url}`)}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`;
  const twitter = `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  }

  async function nativeShare() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        /* cancelled */
      }
    } else {
      void copy();
    }
  }

  const btn =
    "inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-all hover:text-foreground active:scale-95";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-foreground">Share:</span>
      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on WhatsApp">
        <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp
      </a>
      <a href={facebook} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on Facebook">
        <Facebook className="h-4 w-4 text-[#1877F2]" /> Facebook
      </a>
      <a href={twitter} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on X">
        <span className="font-bold">𝕏</span>
      </a>
      <button type="button" onClick={copy} className={btn} aria-label="Copy link">
        {copied ? <><Check className="h-4 w-4 text-teal-500" /> Copied</> : <><Link2 className="h-4 w-4" /> Copy link</>}
      </button>
      <button type="button" onClick={nativeShare} className={`${btn} sm:hidden`} aria-label="Share">
        <Share2 className="h-4 w-4" /> More
      </button>
    </div>
  );
}
