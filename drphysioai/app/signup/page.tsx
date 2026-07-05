import type { Metadata } from "next";
import { AuthShell } from "@/components/site/auth-shell";
import { AuthForm } from "@/components/site/auth-form";

export const metadata: Metadata = {
  title: "Sign up",
  description:
    "Create your DrPhysioAI account — AI notes, a monthly consultation and a live class every month from ₹199.",
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Plans from ₹199/month. Get AI learning + a monthly consultation & live class."
    >
      <AuthForm mode="signup" />
    </AuthShell>
  );
}
