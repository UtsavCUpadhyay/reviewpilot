import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { answerFormats } from "@/lib/content";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * DrPhysioAI tutor endpoint — answers physiotherapy study questions with Claude.
 *
 * POST { question: string, format?: string } -> { answer: string }
 *
 * Falls back gracefully: with no ANTHROPIC_API_KEY set it returns 503 so the
 * client can show the canned sample answers instead of erroring.
 */

const MODEL = "claude-opus-4-8";

const FORMAT_GUIDE: Record<string, string> = {
  Short: "Answer in 2–3 crisp sentences. Use **bold** for key terms.",
  Detailed:
    "Give a thorough, exam-ready explanation in 1–2 short paragraphs. Use **bold** for key terms; no headings.",
  Table:
    "Answer as a GitHub-flavoured markdown table only (pipes and a header separator row). No prose before or after.",
  Flowchart:
    "Answer as a top-to-bottom set of numbered steps / a decision path, one step per line, using arrows (→) and indentation. No table, no paragraphs.",
  Simple:
    "Explain in plain, everyday language with a relatable analogy, as if to a nervous first-year student. No jargon.",
};

const SYSTEM = `You are DrPhysioAI, an expert physiotherapy study tutor for students in India (BPT/MPT and allied health).
Teach clearly and accurately, grounded in standard physiotherapy, anatomy, physiology, biomechanics, neuro and ortho curricula.
Rules:
- Answer only the physiotherapy/health-sciences study question asked. If a question is off-topic or asks for a diagnosis/treatment for a real patient, briefly say you're a study tutor and suggest booking a real consultation on DrPhysioAI.
- Be accurate; do not invent facts. Keep it tight and useful for exams and OSCEs.
- Output plain text with light markdown only (**bold**, and pipe tables when asked). Do not use headings (#) or code fences.`;

export async function POST(req: Request) {
  // Anti-abuse: cap requests per IP so bots can't run up AI costs.
  const rl = rateLimit(`tutor:${clientIp(req)}`, 20, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: { question?: unknown; format?: unknown; hp?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: real users never fill the hidden field; bots often do.
  if (typeof body.hp === "string" && body.hp.trim() !== "") {
    return NextResponse.json({ error: "bot" }, { status: 400 });
  }

  const question = typeof body.question === "string" ? body.question.trim() : "";
  if (!question) {
    return NextResponse.json({ error: "missing_question" }, { status: 400 });
  }
  if (question.length > 800) {
    return NextResponse.json({ error: "question_too_long" }, { status: 400 });
  }

  const format =
    typeof body.format === "string" && answerFormats.some((f) => f.key === body.format)
      ? body.format
      : "Short";

  try {
    const client = new Anthropic();
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 1500,
      system: SYSTEM,
      messages: [
        {
          role: "user",
          content: `${FORMAT_GUIDE[format]}\n\nQuestion: ${question}`,
        },
      ],
    });

    const answer = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    if (!answer) {
      return NextResponse.json({ error: "empty_answer" }, { status: 502 });
    }

    return NextResponse.json({ answer, format });
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      // Surface auth/rate issues distinctly so the client can fall back cleanly.
      const status = err.status === 429 ? 429 : 502;
      return NextResponse.json({ error: "upstream_error" }, { status });
    }
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
