"use client";

import * as React from "react";
import { BrainCircuit, Send, Sparkles, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { answerFormats, demoAnswer } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Interactive AI tutor. Sends the question + chosen format to `/api/tutor`
 * (Claude-backed). If the route isn't configured yet (no ANTHROPIC_API_KEY) or
 * a call fails, it falls back to the canned sample answers so the demo always
 * works — with a small notice so the state is honest.
 */
export function AiChatDemo() {
  const [question, setQuestion] = React.useState(demoAnswer.question);
  const [asked, setAsked] = React.useState(demoAnswer.question);
  const [format, setFormat] = React.useState("Short");
  const [answer, setAnswer] = React.useState(demoAnswer.formats["Short"]);
  const [status, setStatus] = React.useState<"idle" | "loading">("idle");
  const [live, setLive] = React.useState(false);
  const [notice, setNotice] = React.useState<string | null>(null);

  const canned = (fmt: string) => demoAnswer.formats[fmt] ?? demoAnswer.formats["Short"];

  async function ask(q: string, fmt: string) {
    const query = q.trim();
    if (!query || status === "loading") return;
    setAsked(query);
    setStatus("loading");
    setNotice(null);
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query, format: fmt }),
      });
      if (res.ok) {
        const data = (await res.json()) as { answer: string };
        setAnswer(data.answer);
        setLive(true);
      } else if (res.status === 503) {
        setAnswer(canned(fmt));
        setLive(false);
        setNotice("Live AI tutor isn't switched on yet — here's a sample answer.");
      } else {
        throw new Error(`tutor ${res.status}`);
      }
    } catch {
      setAnswer(canned(fmt));
      setLive(false);
      setNotice("Couldn't reach the tutor just now — showing a sample answer.");
    } finally {
      setStatus("idle");
    }
  }

  function choose(next: string) {
    setFormat(next);
    if (live) {
      // Re-ask the same question in the new format.
      ask(asked, next);
    } else {
      // Demo mode — just swap the canned sample.
      setAnswer(canned(next));
      setNotice(null);
    }
  }

  return (
    <Card className="overflow-hidden p-0 shadow-card">
      {/* header */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-5 py-3.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient">
          <BrainCircuit className="h-4 w-4 text-white" />
        </span>
        <div>
          <p className="text-sm font-bold leading-none">DrPhysioAI Tutor</p>
          <p className="text-xs text-muted-foreground">Ask anything — pick an answer style</p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-teal-500/10 px-2.5 py-1 text-[11px] font-semibold text-teal-600">
          <Sparkles className="h-3 w-3" /> {live ? "Live AI" : "Try it"}
        </span>
      </div>

      {/* conversation */}
      <div className="space-y-3 px-5 py-5">
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-brand-gradient px-4 py-2.5 text-sm text-white shadow-soft">
          {asked}
        </div>

        <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3 text-sm shadow-soft">
          {status === "loading" ? (
            <span className="flex gap-1 py-1">
              <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
            </span>
          ) : (
            <FormattedAnswer text={answer} />
          )}
        </div>

        {notice && (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5 text-teal-500" /> {notice}
          </p>
        )}
      </div>

      {/* format toggles */}
      <div className="flex flex-wrap gap-2 border-t border-border px-5 py-4">
        {answerFormats.map((f) => (
          <button
            key={f.key}
            onClick={() => choose(f.key)}
            disabled={status === "loading"}
            title={f.desc}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all disabled:opacity-50",
              format === f.key
                ? "border-transparent bg-brand-gradient text-white shadow-glow"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {f.key}
          </button>
        ))}
      </div>

      {/* input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(question, format);
        }}
        className="flex items-center gap-2 border-t border-border px-5 py-4"
      >
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={800}
          placeholder="Ask anything — anatomy, OSCE, case studies…"
          aria-label="Ask the tutor a question"
          className="flex-1 rounded-full border border-border bg-background/70 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-teal-500/50"
        />
        <button
          type="submit"
          disabled={status === "loading" || !question.trim()}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-gradient text-white shadow-glow transition-opacity disabled:opacity-50"
          aria-label="Send"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </Card>
  );
}

function Dot({ delay = "0ms" }: { delay?: string }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60"
      style={{ animationDelay: delay }}
    />
  );
}

/** Minimal renderer for tutor answers: **bold**, tables and line breaks. */
function FormattedAnswer({ text }: { text: string }) {
  if (text.includes("|")) {
    const rows = text.trim().split("\n").map((r) =>
      r.split("|").map((c) => c.trim()).filter(Boolean),
    );
    const [head, , ...body] = rows; // skip the markdown separator row
    return (
      <table className="w-full text-left text-xs">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} className="border-b border-border pb-1.5 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          {body.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className="border-b border-border/60 py-1.5 pr-3">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <p className="whitespace-pre-line leading-relaxed">
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") ? (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </p>
  );
}
