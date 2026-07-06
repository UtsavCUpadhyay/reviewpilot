"use client";

import * as React from "react";
import { Star, Send, CheckCircle2, Loader2, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "done" | "error";

/** Public review submission form. Posts to /api/reviews; the review is stored
 *  as pending and appears once approved. */
export function ReviewForm() {
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [hp, setHp] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [msg, setMsg] = React.useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    if (rating < 1) return setMsg("Please pick a star rating.");
    if (name.trim().length < 2) return setMsg("Please enter your name.");
    if (body.trim().length < 10) return setMsg("Please write a little more in your review.");
    setMsg(null);
    setStatus("loading");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location, rating, title, body, hp }),
      });
      if (res.ok) {
        setStatus("done");
      } else if (res.status === 429) {
        setStatus("error");
        setMsg("You've submitted a few times — please wait a minute and try again.");
      } else {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setStatus("error");
        setMsg(errorText(data.error));
      }
    } catch {
      setStatus("error");
      setMsg("Couldn't send your review just now — please try again.");
    }
  }

  if (status === "done") {
    return (
      <Card className="p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal-500/15 text-teal-600">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-4 font-display text-xl font-bold">Thank you! 🙏</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          Your review has been submitted and will appear here once our team approves it. We really
          appreciate you sharing your experience.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8">
      <h3 className="font-display text-xl font-bold">Leave a review</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Share your experience to help others. Reviews appear after a quick check.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        {/* honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          className="hidden"
        />

        {/* Star rating */}
        <div>
          <label className="text-sm font-semibold">Your rating</label>
          <div className="mt-1.5 flex gap-1" role="radiogroup" aria-label="Star rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                aria-checked={rating === n}
                role="radio"
                onClick={() => setRating(n)}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                className="rounded-md p-0.5 transition-transform hover:scale-110 active:scale-95"
              >
                <Star
                  className={cn(
                    "h-8 w-8 transition-colors",
                    (hover || rating) >= n
                      ? "fill-amber-400 text-amber-400"
                      : "fill-transparent text-muted-foreground/40",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your name" value={name} onChange={setName} maxLength={60} placeholder="e.g. Rahul M." required />
          <Field label="City (optional)" value={location} onChange={setLocation} maxLength={60} placeholder="e.g. Ahmedabad" />
        </div>

        <Field label="Headline (optional)" value={title} onChange={setTitle} maxLength={120} placeholder="Sum it up in a few words" />

        <div>
          <label className="text-sm font-semibold">Your review</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={1500}
            rows={5}
            required
            placeholder="Tell us about your experience with DrPhysioAI…"
            className="mt-1.5 w-full rounded-xl border border-border bg-background/70 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-teal-500/50"
          />
        </div>

        {msg && (
          <p className="flex items-start gap-1.5 text-sm text-coral-500">
            <Info className="mt-0.5 h-4 w-4 shrink-0" /> {msg}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
          {status === "loading" ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
          ) : (
            <><Send className="h-4 w-4" /> Submit review</>
          )}
        </Button>
        <p className="text-center text-[11px] text-muted-foreground">
          By submitting, you agree your review may be published on DrPhysioAI. No medical or personal
          health details, please.
        </p>
      </form>
    </Card>
  );
}

function Field({
  label,
  value,
  onChange,
  ...props
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-border bg-background/70 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-teal-500/50"
        {...props}
      />
    </div>
  );
}

function errorText(code?: string): string {
  switch (code) {
    case "name_required": return "Please enter your name.";
    case "rating_invalid": return "Please pick a star rating.";
    case "review_too_short": return "Please write a little more in your review.";
    default: return "Couldn't send your review just now — please try again.";
  }
}
