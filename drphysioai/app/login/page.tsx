import type { Metadata } from "next";
import { AuthShell } from "@/components/site/auth-shell";
import { AuthForm } from "@/components/site/auth-form";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to DrPhysioAI — your AI physiotherapy tutor and consultations.",
};

export default function LoginPage() {
  return (
    <AuthShell title="Welcome back" subtitle="Log in to continue learning and healing.">
      <AuthForm mode="login" />
    </AuthShell>
  );
}
