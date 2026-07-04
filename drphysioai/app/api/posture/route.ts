import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "claude-opus-4-8";

const SYSTEM = `You are a physiotherapy posture-screening assistant for DrPhysioAI (India).
Analyse the person's visible standing/sitting posture from the photo and give friendly, educational feedback.
Rules:
- This is general education, NOT a medical diagnosis. Be encouraging, never alarming.
- Point out up to 3 visible posture observations (e.g. forward head, rounded shoulders, uneven shoulders/hips, excessive low-back curve). Only mention what is actually visible.
- For each, give one simple, safe suggestion or exercise idea.
- If the image doesn't clearly show a full/side posture, say so and suggest a clear side-on, full-body photo.
- End with one short line encouraging a consultation with a DrPhysioAI physiotherapist for a personalised plan.
- Output short plain text with **bold** labels. No headings, no medical claims, no diagnosis.`;

export async function POST(req: Request) {
  const rl = rateLimit(`posture:${clientIp(req)}`, 8, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: { image?: unknown; hp?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (typeof body.hp === "string" && body.hp.trim() !== "") {
    return NextResponse.json({ error: "bot" }, { status: 400 });
  }

  const image = typeof body.image === "string" ? body.image : "";
  const match = /^data:(image\/(png|jpeg|jpg|webp));base64,(.+)$/.exec(image);
  if (!match) {
    return NextResponse.json({ error: "invalid_image" }, { status: 400 });
  }
  const mediaType = match[1] === "image/jpg" ? "image/jpeg" : match[1];
  const data = match[3];
  if (data.length > 8_000_000) {
    return NextResponse.json({ error: "image_too_large" }, { status: 413 });
  }

  try {
    const client = new Anthropic();
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 800,
      system: SYSTEM,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType as "image/png" | "image/jpeg" | "image/webp",
                data,
              },
            },
            { type: "text", text: "Please screen my posture from this photo." },
          ],
        },
      ],
    });

    const analysis = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    if (!analysis) return NextResponse.json({ error: "empty" }, { status: 502 });
    return NextResponse.json({ analysis });
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      return NextResponse.json({ error: "upstream_error" }, { status: 502 });
    }
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
