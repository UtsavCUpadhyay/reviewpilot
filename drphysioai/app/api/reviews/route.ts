import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/**
 * Accepts a public review submission and stores it as `pending` (moderated).
 * Rate-limited + honeypot to deter spam. RLS only lets anon insert pending rows
 * and only exposes approved ones publicly.
 */
export async function POST(req: Request) {
  const rl = rateLimit(`reviews:${clientIp(req)}`, 4, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  let body: { name?: unknown; location?: unknown; rating?: unknown; title?: unknown; body?: unknown; hp?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot — real users never fill this.
  if (typeof body.hp === "string" && body.hp.trim() !== "") {
    return NextResponse.json({ ok: true }); // silently accept, store nothing
  }

  const name = clean(body.name, 60);
  const location = clean(body.location, 60);
  const title = clean(body.title, 120);
  const text = clean(body.body, 1500);
  const rating = Math.round(Number(body.rating));

  if (name.length < 2) return NextResponse.json({ error: "name_required" }, { status: 400 });
  if (!Number.isFinite(rating) || rating < 1 || rating > 5)
    return NextResponse.json({ error: "rating_invalid" }, { status: 400 });
  if (text.length < 10) return NextResponse.json({ error: "review_too_short" }, { status: 400 });

  try {
    const supabase = createClient();
    const { error } = await supabase.from("reviews").insert({
      name,
      location: location || null,
      rating,
      title: title || null,
      body: text,
      status: "pending",
    });
    if (error) return NextResponse.json({ error: "insert_failed" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
