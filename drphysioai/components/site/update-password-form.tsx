"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

/**
 * Sets a new password. Reached from the reset email link, which establishes a
 * short-lived recovery session; `updateUser` then persists the new password.
 */
export function UpdatePasswordForm() {
  const supabase = React.useMemo(() => createClient(), []);
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading">("idle");
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setError(null);
    setStatus("loading");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(
        error.message.includes("session")
          ? "This reset link has expired. Please request a new one."
          : error.message,
      );
      setStatus("idle");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <label htmlFor="new-password" className="mb-1.5 block text-sm font-semibold">New password</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Lock className="h-4 w-4" />
          </span>
          <input
            id="new-password"
            type={show ? "text" : "password"}
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 w-full rounded-xl border border-input bg-background px-10 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">At least 6 characters.</p>
      </div>

      {error && (
        <p className="flex items-start gap-2 rounded-xl border border-coral-500/30 bg-coral-500/10 px-3 py-2.5 text-sm text-coral-600">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Updating…</>
        ) : (
          "Update password & continue"
        )}
      </Button>
    </form>
  );
}
