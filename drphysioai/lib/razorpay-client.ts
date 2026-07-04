"use client";

import { RAZORPAY_KEY_ID } from "./razorpay";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    Razorpay?: any;
  }
}

/** True when a public Razorpay key is configured (so we can show native ₹ checkout). */
export const razorpayEnabled = Boolean(RAZORPAY_KEY_ID);

let scriptPromise: Promise<void> | null = null;
function loadCheckoutScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.Razorpay) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("razorpay_script_failed"));
    document.body.appendChild(s);
  });
  return scriptPromise;
}

export type PayResult = "success" | "dismissed" | "not_configured" | "error" | "verify_failed";

/**
 * Opens Razorpay Checkout for a catalog item (₹ / UPI / cards / net-banking),
 * then verifies the payment signature. Returns the outcome.
 */
export async function payWithRazorpay(opts: {
  itemKey: string;
  description: string;
  prefill?: { name?: string; email?: string; contact?: string };
}): Promise<PayResult> {
  try {
    const orderRes = await fetch("/api/razorpay/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: opts.itemKey }),
    });
    if (orderRes.status === 503) return "not_configured";
    if (!orderRes.ok) return "error";

    const { orderId, amount, keyId } = (await orderRes.json()) as {
      orderId: string;
      amount: number;
      keyId: string;
    };

    await loadCheckoutScript();
    if (!window.Razorpay) return "error";

    return await new Promise<PayResult>((resolve) => {
      const rzp = new window.Razorpay({
        key: keyId,
        order_id: orderId,
        amount,
        currency: "INR",
        name: "DrPhysioAI",
        description: opts.description,
        prefill: opts.prefill ?? {},
        theme: { color: "#0d9488" },
        handler: async (resp: any) => {
          try {
            const v = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId,
                paymentId: resp.razorpay_payment_id,
                signature: resp.razorpay_signature,
              }),
            });
            const { ok } = (await v.json()) as { ok: boolean };
            resolve(ok ? "success" : "verify_failed");
          } catch {
            resolve("verify_failed");
          }
        },
        modal: { ondismiss: () => resolve("dismissed") },
      });
      rzp.open();
    });
  } catch {
    return "error";
  }
}
