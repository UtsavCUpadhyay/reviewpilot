"use client";

import * as React from "react";
import { BrainCircuit, Send, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { answerFormats, demoAnswer } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Interactive tutor demo. Runs fully client-side with canned answers so it
 * works without an API key — swap `pickAnswer` for a fetch('/api/tutor') call
 * once the Claude-backed route is wired up.
 */
export function AiChatDemo() {
  const [format, setFormat] = React.useState("Short");
  const [typing, setTyping] = React.useState(false);
  const [shown, setShown] = React.useState(demoAnswer.formats["Short"]);

  function choose(next: string) {
    setFormat(next);
    setTyping(true);
    // simulate the tutor "thinking" for a beat
    window.setTimeout(() => {
      setShown(demoAnswer.formats[next]);
      setTyping(false);
    }, 420);
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
          <p className="text-xs text-muted-foreground">Try it — pick an answer style</p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-teal-500/10 px-2.5 py-1 text-[11px] font-semibold text-teal-600">
          <Sparkles className="h-3 w-3" /> Live demo
        </span>
      </div>

      {/* conversation */}
      <div className="space-y-3 px-5 py-5">
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-brand-gradient px-4 py-2.5 text-sm text-white shadow-soft">
          {demoAnswer.question}
        </div>

        <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3 text-sm shadow-soft">
          {typing ? (
            <span className="flex gap-1 py-1">
              <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
            </span>
          ) : (
            <FormattedAnswer text={shown} />
          )}
        </div>
      </div>

      {/* format toggles */}
      <div className="flex flex-wrap gap-2 border-t border-border px-5 py-4">
        {answerFormats.map((f) => (
          <button
            key={f.key}
            onClick={() => choose(f.key)}
            title={f.desc}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all",
              format === f.key
                ? "border-transparent bg-brand-gradient text-white shadow-glow"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {f.key}
          </button>
        ))}
      </div>

      {/* fake input */}
      <div className="flex items-center gap-2 border-t border-border px-5 py-4">
        <div className="flex-1 rounded-full border border-border bg-background/70 px-4 py-2.5 text-sm text-muted-foreground">
          Ask anything — anatomy, OSCE, case studies…
        </div>
        <button
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-gradient text-white shadow-glow"
          aria-label="Send"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
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

/** Minimal renderer for the canned answers: **bold**, tables and line breaks. */
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
