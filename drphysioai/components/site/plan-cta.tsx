"use client";

import * as React from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { checkoutUrl } from "@/lib/shopify";
import { razorpayEnabled, payWithRazorpay } from "@/lib/razorpay-client";

interface PlanCtaProps {
  name: string;
  price: string;
  cta: string;
  highlight?: boolean;
}

/**
 * Pricing CTA. Paid plans use native ₹ Razorpay checkout when configured;
 * otherwise they fall back to Shopify checkout, then to sign-up.
 */
export function PlanCta({ name, price, cta, highlight }: PlanCtaProps) {
  const [busy, setBusy] = React.useState(false);
  const isPaid = /\d/.test(price) && !/^₹?\s*0$/.test(price.trim());
  const variant = highlight ? "primary" : "outline";

  const label = busy ? (
    <><Loader2 className="h-4 w-4 animate-spin" /> Please wait…</>
  ) : (
    <>{cta}{highlight && <Sparkles className="h-4 w-4" />}</>
  );

  // Native ₹ / UPI checkout via Razorpay.
  if (isPaid && razorpayEnabled) {
    return (
      <Button
        variant={variant}
        size="lg"
        className="mt-8 w-full"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          const result = await payWithRazorpay({
            itemKey: `plan:${name}`,
            description: `${name} — monthly membership`,
          });
          setBusy(false);
          if (result === "success") window.location.href = "/signup?paid=1";
        }}
      >
        {label}
      </Button>
    );
  }

  // Fallback: Shopify checkout when configured, else sign-up.
  const href = (isPaid && checkoutUrl([{ key: `plan:${name}` }])) || "/signup";
  return (
    <Button variant={variant} size="lg" className="mt-8 w-full" asChild>
      <a href={href}>
        {cta}
        {highlight && <Sparkles className="h-4 w-4" />}
      </a>
    </Button>
  );
}
