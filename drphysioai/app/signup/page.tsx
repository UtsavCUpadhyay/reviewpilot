import type { Metadata } from "next";
import { AuthShell } from "@/components/site/auth-shell";
import { AuthForm } from "@/components/site/auth-form";

export const metadata: Metadata = {
  title: "Sign up free",
  description:
    "Create a free DrPhysioAI account — AI notes, a free monthly consultation and a free live class every month.",
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Start free today"
      subtitle="No card needed. Get AI learning + a free consultation & live class every month."
    >
      <AuthForm mode="signup" />
    </AuthShell>
  );
}
