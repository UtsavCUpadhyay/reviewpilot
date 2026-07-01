"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { checkoutUrl } from "@/lib/shopify";

interface PlanCtaProps {
  name: string;
  price: string;
  cta: string;
  highlight?: boolean;
}

/**
 * Pricing CTA. Paid plans redirect to Shopify's hosted checkout once the store
 * is wired (see lib/shopify.ts); the Free plan — and any not-yet-mapped paid
 * plan — routes to sign-up as a graceful fallback.
 */
export function PlanCta({ name, price, cta, highlight }: PlanCtaProps) {
  const isPaid = price.replace(/[^\d]/g, "") !== "" && !/^₹?0$/.test(price.trim());
  const href = (isPaid && checkoutUrl([{ key: `plan:${name}` }])) || "/signup";

  return (
    <Button
      variant={highlight ? "primary" : "outline"}
      size="lg"
      className="mt-8 w-full"
      asChild
    >
      <a href={href}>
        {cta}
        {highlight && <Sparkles className="h-4 w-4" />}
      </a>
    </Button>
  );
}
