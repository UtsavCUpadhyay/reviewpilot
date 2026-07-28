import type { Metadata } from "next";
import { AuthShell } from "@/components/site/auth-shell";
import { AuthForm } from "@/components/site/auth-form";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your DrPhysioAI clinical workspace.",
};

export default function LoginPage() {
  return (
    <AuthShell title="Welcome back" subtitle="Log in to your clinical workspace.">
      <AuthForm mode="login" />
    </AuthShell>
  );
}
