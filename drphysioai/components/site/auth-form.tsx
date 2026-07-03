"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Mail, Lock, User, Eye, EyeOff, MessageCircle, Loader2, AlertCircle, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Login / signup form wired to Supabase auth (email + password, Google OAuth).
 * Signup stores the full name in user metadata; if the project requires email
 * confirmation, we show a "check your email" state instead of redirecting.
 */
export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const supabase = React.useMemo(() => createClient(), []);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading">("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [info, setInfo] = React.useState<string | null>(null);

  function nextUrl() {
    if (typeof window === "undefined") return "/dashboard";
    return new URLSearchParams(window.location.search).get("next") || "/dashboard";
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setError(null);
    setInfo(null);
    setStatus("loading");

    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name.trim() || null },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextUrl())}`,
          },
        });
        if (error) throw error;
        if (data.session) {
          router.push(nextUrl());
          router.refresh();
        } else {
          setInfo("Almost there! Check your email to confirm your account, then log in.");
          setStatus("idle");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push(nextUrl());
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  async function google() {
    setError(null);
    setInfo(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextUrl())}`,
      },
    });
    if (error) {
      setError("Google sign-in isn't enabled yet — please use email for now.");
    }
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {/* social */}
      <div className="grid gap-2.5 sm:grid-cols-2">
        <SocialButton label="Google" onClick={google}>
          <GoogleGlyph />
        </SocialButton>
        <a
          href={site.whatsappLink}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-card text-sm font-semibold transition-colors hover:bg-muted"
        >
          <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp OTP
        </a>
      </div>

      <div className="flex items-center gap-3 py-1 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or with email <span className="h-px flex-1 bg-border" />
      </div>

      {isSignup && (
        <Field
          icon={<User className="h-4 w-4" />}
          label="Full name"
          type="text"
          placeholder="Aarav Sharma"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <Field
        icon={<Mail className="h-4 w-4" />}
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div>
        <label htmlFor="auth-password" className="mb-1.5 block text-sm font-semibold">Password</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Lock className="h-4 w-4" />
          </span>
          <input
            id="auth-password"
            type={show ? "text" : "password"}
            placeholder="••••••••"
            autoComplete={isSignup ? "new-password" : "current-password"}
            required
            minLength={6}
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
      </div>

      {!isSignup && (
        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" className="h-4 w-4 rounded border-border accent-teal-500" /> Remember me
          </label>
          <a href="/forgot-password" className="font-semibold text-teal-600 hover:underline">Forgot?</a>
        </div>
      )}

      {error && (
        <p className="flex items-start gap-2 rounded-xl border border-coral-500/30 bg-coral-500/10 px-3 py-2.5 text-sm text-coral-600">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
        </p>
      )}
      {info && (
        <p className="flex items-start gap-2 rounded-xl border border-teal-500/30 bg-teal-500/10 px-3 py-2.5 text-sm text-teal-700 dark:text-teal-300">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> {info}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Please wait…</>
        ) : isSignup ? (
          "Create free account"
        ) : (
          "Log in"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {isSignup ? "Already have an account? " : "New to DrPhysioAI? "}
        <a
          href={isSignup ? "/login" : "/signup"}
          className="font-semibold text-teal-600 hover:underline"
        >
          {isSignup ? "Log in" : "Create one free"}
        </a>
      </p>

      {isSignup && (
        <p className="text-center text-xs text-muted-foreground">
          By continuing you agree to our Terms & Privacy Policy.
        </p>
      )}
    </form>
  );
}

function Field({
  icon, label, ...props
}: { icon: React.ReactNode; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = React.useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <input
          id={id}
          {...props}
          className={cn(
            "h-11 w-full rounded-xl border border-input bg-background px-10 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring",
          )}
        />
      </div>
    </div>
  );
}

function SocialButton({
  label, children, onClick,
}: { label: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-card text-sm font-semibold transition-colors hover:bg-muted"
    >
      {children} {label}
    </button>
  );
}

function GoogleGlyph() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  );
}
