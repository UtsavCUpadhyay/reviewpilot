/**
 * DrPhysioAI — Shopify checkout wiring.
 *
 * We use Shopify's *hosted* checkout via **cart permalinks**:
 *
 *     https://<shop-domain>/cart/<variantId>:<qty>[,<variantId>:<qty>...]
 *
 * which lands the buyer straight on Shopify's secure checkout (UPI, cards,
 * net-banking, GST invoice). No Storefront API token is needed at runtime —
 * only the shop domain and the numeric *variant* ids of the matching products.
 *
 * ── To go live (once the DrPhysioAI Shopify store is connected) ────────────
 *   1. Set the shop domain:
 *        NEXT_PUBLIC_SHOPIFY_DOMAIN = drphysioai.myshopify.com   (or custom domain)
 *   2. Map each catalog key below to its Shopify variant id. Either edit the
 *      `variantIds` map in this file, or pass a JSON override via env:
 *        NEXT_PUBLIC_SHOPIFY_VARIANTS = {"plan:Complete Care":"4711122233",...}
 *      (Get the ids from Shopify → `search_products` / the product admin.)
 *
 * Until both are set, `checkoutUrl()` returns `null` and the UI falls back to a
 * WhatsApp / sign-up flow, so nothing breaks in the meantime.
 */

/** Storefront domain. Defaults to the live DrPhysioAI store; env can override. */
export const SHOPIFY_DOMAIN = (
  process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN ?? "drphysioai.com"
).trim();

/**
 * DrPhysioAI catalog key → Shopify variant id (numeric, as a string).
 * Keys are stable app-side ids; fill the values after connecting the store.
 * Leave a value empty to keep that item on the WhatsApp fallback.
 */
const codeDefaults: Record<string, string> = {
  // Live variant ids from the DrPhysioAI Shopify store (drphysioai.com).
  // Subscription plans (Pricing section) — Free has no variant (it's sign-up only).
  "plan:Ultimate Student": "48044581552315",
  "plan:Complete Care": "48044581585083",
  // Consultation services (booking widget).
  "service:Video Consultation": "48044581617851",
  "service:Exercise Prescription": "48044581650619",
  "service:Pain Management": "48044581683387",
  "service:Post-Surgical Rehab": "48044581716155",
  "service:Sports Injury Rehab": "48044581748923",
  "service:Neuro & Elderly Care": "48044581781691",
};

/** Optional JSON override from env, merged over the in-code defaults. */
function envOverrides(): Record<string, string> {
  const raw = process.env.NEXT_PUBLIC_SHOPIFY_VARIANTS;
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {};
  }
}

export const variantIds: Record<string, string> = { ...codeDefaults, ...envOverrides() };

/** Returns a configured variant id for a catalog key, or `null` if unmapped. */
export function getVariantId(key: string): string | null {
  const id = variantIds[key];
  return id && id.trim() ? id.trim() : null;
}

export interface CheckoutItem {
  /** Catalog key, e.g. `plan:Complete Care` or `service:Video Consultation`. */
  key: string;
  quantity?: number;
}

/**
 * Builds a Shopify cart-permalink checkout URL for the given items.
 * Returns `null` if the store domain isn't set or any item is unmapped — the
 * caller should then fall back (WhatsApp / sign-up) instead of a broken link.
 */
export function checkoutUrl(
  items: CheckoutItem[],
  opts?: { note?: string },
): string | null {
  if (!SHOPIFY_DOMAIN || items.length === 0) return null;

  const parts: string[] = [];
  for (const item of items) {
    const id = getVariantId(item.key);
    if (!id) return null; // unmapped → fall back rather than link somewhere wrong
    parts.push(`${id}:${Math.max(1, item.quantity ?? 1)}`);
  }

  const url = new URL(`https://${SHOPIFY_DOMAIN}/cart/${parts.join(",")}`);
  url.searchParams.set("ref", "drphysioai");
  // Carry booking context through to the order (best-effort; harmless if ignored).
  if (opts?.note) url.searchParams.set("note", opts.note);
  return url.toString();
}

/** True once a store domain is configured (used to tweak CTA copy/behaviour). */
export const isShopifyConfigured = Boolean(SHOPIFY_DOMAIN);
