"use client";

import * as React from "react";
import { Copy, Check, Gift, MessageCircle, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const KEY = "dpa_referral_code_v1";

/** Generates a friendly, readable referral code like "PHYSIO-7K2Q". */
function makeCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 4; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `PHYSIO-${s}`;
}

export function ReferralWidget() {
  const [code, setCode] = React.useState("PHYSIO-••••");
  const [copied, setCopied] = React.useState(false);
  const [link, setLink] = React.useState("https://drphysioai.com/?ref=PHYSIO");

  React.useEffect(() => {
    let c = "";
    try {
      c = window.localStorage.getItem(KEY) || "";
      if (!c) {
        c = makeCode();
        window.localStorage.setItem(KEY, c);
      }
    } catch {
      c = makeCode();
    }
    setCode(c);
    const origin = typeof window !== "undefined" ? window.location.origin : "https://drphysioai.com";
    setLink(`${origin}/?ref=${c}`);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — user can select manually */
    }
  }

  const shareText = encodeURIComponent(
    `I'm using DrPhysioAI for online physiotherapy & AI health tools 💪 Sign up with my link and we both get ₹100 off: ${link}`,
  );
  const whatsappShare = `https://wa.me/?text=${shareText}`;

  async function nativeShare() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: "DrPhysioAI", text: "Give ₹100, get ₹100 on DrPhysioAI", url: link });
      } catch {
        /* user cancelled */
      }
    } else {
      void copy();
    }
  }

  return (
    <Card className="overflow-hidden p-0 shadow-card">
      <div className="bg-brand-gradient p-6 text-center text-white sm:p-8">
        <Gift className="mx-auto h-9 w-9" />
        <h2 className="mt-3 font-display text-2xl font-bold">Give ₹100, get ₹100</h2>
        <p className="mx-auto mt-1 max-w-sm text-sm text-white/90">
          Share your link. Your friend gets ₹100 off their first consultation — and so do you.
        </p>
      </div>

      <div className="space-y-5 p-6 sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Your referral code</p>
          <p className="mt-1 font-display text-2xl font-extrabold tracking-wider text-gradient">{code}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Your invite link</p>
          <div className="mt-2 flex items-center gap-2">
            <input
              readOnly
              value={link}
              aria-label="Your referral link"
              onFocus={(e) => e.currentTarget.select()}
              className="flex-1 truncate rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none"
            />
            <Button variant="outline" size="sm" onClick={copy} className="shrink-0">
              {copied ? <><Check className="h-4 w-4 text-teal-500" /> Copied</> : <><Copy className="h-4 w-4" /> Copy</>}
            </Button>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <Button asChild className="w-full">
            <a href={whatsappShare} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" /> Share on WhatsApp
            </a>
          </Button>
          <Button variant="outline" className="w-full" onClick={nativeShare}>
            <Share2 className="h-4 w-4" /> Share link
          </Button>
        </div>

        <p className="text-center text-[11px] text-muted-foreground">
          Rewards apply to your friend's first paid consultation. Codes are per person — please don't spam.
        </p>
      </div>
    </Card>
  );
}
