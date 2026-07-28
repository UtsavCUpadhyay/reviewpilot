import type { Metadata } from "next";
import { AuthShell } from "@/components/site/auth-shell";
import { AuthForm } from "@/components/site/auth-form";

export const metadata: Metadata = {
  title: "Start free trial",
  description:
    "Start your 7-day free trial of DrPhysioAI — the clinical AI platform for physiotherapists. No card needed.",
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Start your 7-day free trial"
      subtitle="No card needed. The full clinical platform — assessment, documentation and exercise prescription."
    >
      <AuthForm mode="signup" />
    </AuthShell>
  );
}
