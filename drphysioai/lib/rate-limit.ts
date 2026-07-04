/**
 * Lightweight in-memory rate limiter + IP helper for API routes.
 *
 * This is a first line of defence against bots/abuse (protects AI + payment
 * costs). It's per-instance (not distributed) — for stronger protection add
 * Upstash Redis or Vercel Firewall / Cloudflare Turnstile (see README).
 */

interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();

/** Returns the caller's best-guess IP from proxy headers. */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  return (xff?.split(",")[0] || req.headers.get("x-real-ip") || "unknown").trim();
}

/**
 * Fixed-window rate limit. Returns { ok, retryAfter (seconds) }.
 * @param key    unique bucket (e.g. `tutor:<ip>`)
 * @param limit  max requests per window
 * @param windowMs window length in ms
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { ok: boolean; retryAfter: number } {
  const now = Date.now();

  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (store.size > 5000) {
    for (const [k, v] of store) if (v.resetAt <= now) store.delete(k);
  }

  const entry = store.get(key);
  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > limit) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}
