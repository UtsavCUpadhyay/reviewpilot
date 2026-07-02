"use client";

import * as React from "react";
import { Mail, Loader2, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

/** Requests a password-reset email via Supabase. */
export function ForgotPasswordForm() {
  const supabase = React.useMemo(() => createClient(), []);
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "sent">("idle");
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setError(null);
    setStatus("loading");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/update-password`,
    });
    if (error) {
      setError(error.message);
      setStatus("idle");
    } else {
      setStatus("sent");
    }
  }

  if (status === "sent") {
    return (
      <div className="space-y-4">
        <p className="flex items-start gap-2 rounded-xl border border-teal-500/30 bg-teal-500/10 px-3 py-3 text-sm text-teal-700 dark:text-teal-300">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          If an account exists for <strong>{email}</strong>, a password-reset link is on its way.
          Check your inbox (and spam).
        </p>
        <Button asChild variant="outline" className="w-full">
          <a href="/login"><ArrowLeft className="h-4 w-4" /> Back to log in</a>
        </Button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <label htmlFor="reset-email" className="mb-1.5 block text-sm font-semibold">Email</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Mail className="h-4 w-4" />
          </span>
          <input
            id="reset-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-xl border border-input bg-background px-10 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {error && (
        <p className="flex items-start gap-2 rounded-xl border border-coral-500/30 bg-coral-500/10 px-3 py-2.5 text-sm text-coral-600">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
        ) : (
          "Send reset link"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Remembered it?{" "}
        <a href="/login" className="font-semibold text-teal-600 hover:underline">Log in</a>
      </p>
    </form>
  );
}
