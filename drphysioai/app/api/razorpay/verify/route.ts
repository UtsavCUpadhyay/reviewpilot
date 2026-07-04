import { NextResponse } from "next/server";
import crypto from "crypto";
import { RAZORPAY_KEY_SECRET } from "@/lib/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Verifies a Razorpay payment signature after checkout.
 * POST { orderId, paymentId, signature } -> { ok: boolean }
 */
export async function POST(req: Request) {
  if (!RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let body: { orderId?: unknown; paymentId?: unknown; signature?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const orderId = typeof body.orderId === "string" ? body.orderId : "";
  const paymentId = typeof body.paymentId === "string" ? body.paymentId : "";
  const signature = typeof body.signature === "string" ? body.signature : "";
  if (!orderId || !paymentId || !signature) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const expected = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  // Constant-time compare to avoid timing leaks.
  const ok =
    expected.length === signature.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));

  return NextResponse.json({ ok });
}
