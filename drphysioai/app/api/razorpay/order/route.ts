import { NextResponse } from "next/server";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, getAmountPaise } from "@/lib/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Creates a Razorpay order (server-side, with the secret key).
 * POST { key: catalogKey } -> { orderId, amount, currency, keyId }
 * Returns 503 when Razorpay isn't configured so the client can fall back.
 */
export async function POST(req: Request) {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: { key?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const key = typeof body.key === "string" ? body.key : "";
  const amount = getAmountPaise(key);
  if (!amount) {
    return NextResponse.json({ error: "unknown_item" }, { status: 400 });
  }

  const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");
  try {
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt: `dpa_${Date.now()}`,
        notes: { item: key },
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "order_failed" }, { status: 502 });
    }
    const order = (await res.json()) as { id: string };
    return NextResponse.json({
      orderId: order.id,
      amount,
      currency: "INR",
      keyId: RAZORPAY_KEY_ID,
    });
  } catch {
    return NextResponse.json({ error: "upstream_error" }, { status: 502 });
  }
}
