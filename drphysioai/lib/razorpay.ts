/**
 * DrPhysioAI — Razorpay (INR / UPI / cards / net-banking) checkout config.
 *
 * Native Indian payments, settling to an Indian bank. Server routes create an
 * order with the secret key; the browser opens Razorpay Checkout; a verify
 * route validates the signature.
 *
 * ── To go live ─────────────────────────────────────────────────────────────
 *   1. Create a Razorpay account (razorpay.com) — Test keys are available
 *      instantly; complete KYC to accept real money.
 *   2. Set these environment variables (in Vercel → Settings → Environment
 *      Variables), then redeploy:
 *        NEXT_PUBLIC_RAZORPAY_KEY_ID = rzp_test_xxx  (or rzp_live_xxx)   [public]
 *        RAZORPAY_KEY_SECRET         = your key secret                   [server only]
 *
 * Until the KEY_ID is set, the pay buttons fall back to the existing flow, so
 * nothing breaks in the meantime.
 */

/** Public key id (safe in the browser). Empty until configured. */
export const RAZORPAY_KEY_ID = (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "").trim();

/** Secret key — server-side only, never exposed to the browser. */
export const RAZORPAY_KEY_SECRET = (process.env.RAZORPAY_KEY_SECRET ?? "").trim();

/** True once a public key id is present (client-checkable). */
export const isRazorpayConfigured = Boolean(RAZORPAY_KEY_ID);

/**
 * Amount in paise (₹ × 100) per catalog key. Keep in sync with lib/content.ts
 * (plans) and consultationServices. This is the source of truth for charges.
 */
export const itemAmountsPaise: Record<string, number> = {
  "plan:Ultimate Student": 49900, // ₹499 / month
  "plan:Complete Care": 149900, // ₹1,499 / month
  "service:Video Consultation": 49900, // ₹499
  "service:Exercise Prescription": 69900, // ₹699
  "service:Pain Management": 59900, // ₹599
  "service:Post-Surgical Rehab": 79900, // ₹799
  "service:Sports Injury Rehab": 79900, // ₹799
  "service:Neuro & Elderly Care": 69900, // ₹699
};

/** Returns the charge (in paise) for a catalog key, or null if unknown. */
export function getAmountPaise(key: string): number | null {
  const amt = itemAmountsPaise[key];
  return typeof amt === "number" && amt > 0 ? amt : null;
}
