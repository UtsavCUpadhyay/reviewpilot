"use client";

import * as React from "react";
import { Upload, ScanLine, Sparkles, Info, RefreshCw, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "done" | "error";

/**
 * AI posture screening tool. The photo is resized/compressed client-side to a
 * small JPEG data URL (never uploaded raw), then POSTed to `/api/posture`
 * (Claude Vision). Falls back gracefully when the API isn't configured.
 */
export function PostureCheck() {
  const [preview, setPreview] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<Status>("idle");
  const [analysis, setAnalysis] = React.useState<string>("");
  const [notice, setNotice] = React.useState<string | null>(null);
  const [hp, setHp] = React.useState(""); // honeypot
  const inputRef = React.useRef<HTMLInputElement>(null);

  async function onPick(file: File) {
    setNotice(null);
    setStatus("idle");
    setAnalysis("");
    try {
      const dataUrl = await downscaleToJpeg(file, 1024, 0.82);
      setPreview(dataUrl);
      void analyse(dataUrl);
    } catch {
      setNotice("Couldn't read that image — please try a JPG or PNG.");
      setStatus("error");
    }
  }

  async function analyse(image: string) {
    setStatus("loading");
    setNotice(null);
    try {
      const res = await fetch("/api/posture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, hp }),
      });
      if (res.ok) {
        const data = (await res.json()) as { analysis: string };
        setAnalysis(data.analysis);
        setStatus("done");
      } else if (res.status === 503) {
        setStatus("done");
        setAnalysis(
          "**AI posture screening is being switched on.**\n\nOur AI physiotherapist will read your photo and flag common posture patterns — forward head, rounded shoulders, uneven hips — with a simple tip for each. In the meantime, book a consultation and a licensed physiotherapist will assess your posture personally.",
        );
        setNotice("Live AI screening isn't switched on yet — sample guidance shown.");
      } else if (res.status === 429) {
        setStatus("error");
        setNotice("You've run a few checks — please wait a minute and try again.");
      } else {
        throw new Error(`posture ${res.status}`);
      }
    } catch {
      setStatus("error");
      setNotice("Couldn't analyse the photo just now — please try again.");
    }
  }

  function reset() {
    setPreview(null);
    setAnalysis("");
    setStatus("idle");
    setNotice(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <Card className="overflow-hidden p-0 shadow-card">
      {/* header */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-5 py-3.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient">
          <ScanLine className="h-4 w-4 text-white" />
        </span>
        <div>
          <p className="text-sm font-bold leading-none">AI Posture Screening</p>
          <p className="text-xs text-muted-foreground">Upload a side-on, full-body photo</p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-teal-500/10 px-2.5 py-1 text-[11px] font-semibold text-teal-600">
          <Sparkles className="h-3 w-3" /> Claude Vision
        </span>
      </div>

      <div className="grid gap-0 md:grid-cols-2">
        {/* upload / preview */}
        <div className="border-b border-border p-5 md:border-b-0 md:border-r">
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
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void onPick(f);
            }}
          />

          {preview ? (
            <div className="space-y-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Your posture photo"
                className="mx-auto max-h-72 w-auto rounded-xl border border-border object-contain"
              />
              <Button variant="outline" size="sm" className="w-full" onClick={reset}>
                <RefreshCw className="h-4 w-4" /> Try another photo
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-background/50 p-6 text-center transition-colors hover:border-teal-500/50 hover:bg-muted/40"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-soft text-teal-600">
                <Upload className="h-6 w-6" />
              </span>
              <span className="text-sm font-semibold">Tap to upload a photo</span>
              <span className="max-w-[16rem] text-xs text-muted-foreground">
                Stand side-on, full body in frame, against a plain wall for best results.
              </span>
            </button>
          )}

          <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-relaxed text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-500" />
            Your photo is resized in your browser and used only for this screening — we don't store it.
          </p>
        </div>

        {/* result */}
        <div className="p-5">
          {status === "idle" && !analysis && (
            <div className="flex h-full min-h-[16rem] flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
              <ScanLine className="h-8 w-8 text-muted-foreground/40" />
              <p>Your posture screening will appear here.</p>
            </div>
          )}

          {status === "loading" && (
            <div className="flex h-full min-h-[16rem] flex-col items-center justify-center gap-3 text-center text-sm text-muted-foreground">
              <span className="flex gap-1">
                <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
              </span>
              <p>Analysing your posture…</p>
            </div>
          )}

          {analysis && status !== "loading" && (
            <div className="space-y-4">
              <FormattedText text={analysis} />
              <div className="rounded-xl bg-brand-soft p-4">
                <p className="text-xs font-semibold text-foreground">
                  Want a personalised correction plan?
                </p>
                <Button size="sm" className="mt-2 w-full" asChild>
                  <a href="/consultation">Book a physiotherapist →</a>
                </Button>
              </div>
            </div>
          )}

          {notice && (
            <p className="mt-3 flex items-start gap-1.5 text-xs text-muted-foreground">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-500" /> {notice}
            </p>
          )}
        </div>
      </div>

      <p className="border-t border-border bg-muted/30 px-5 py-3 text-[11px] leading-relaxed text-muted-foreground">
        <strong className="font-semibold text-foreground/80">Educational only.</strong> This AI
        screening is general guidance, not a medical diagnosis. For pain or a specific condition,
        consult a licensed physiotherapist.
      </p>
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

/** Minimal renderer: **bold** + line breaks. */
function FormattedText({ text }: { text: string }) {
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {text.split("\n").filter((l) => l.trim()).map((line, i) => (
        <p key={i}>
          {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
            part.startsWith("**") ? (
              <strong key={j} className="font-semibold text-foreground">
                {part.slice(2, -2)}
              </strong>
            ) : (
              <React.Fragment key={j}>{part}</React.Fragment>
            ),
          )}
        </p>
      ))}
    </div>
  );
}

/**
 * Reads a File, draws it to a canvas scaled so the longest edge is `maxEdge`,
 * and returns a compressed JPEG data URL. Keeps payloads small and strips EXIF.
 */
function downscaleToJpeg(file: File, maxEdge: number, quality: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read_failed"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("decode_failed"));
      img.onload = () => {
        const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("no_canvas"));
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
