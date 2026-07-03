import type { Metadata } from "next";
import { AuthShell } from "@/components/site/auth-shell";
import { ForgotPasswordForm } from "@/components/site/forgot-password-form";

export const metadata: Metadata = {
  title: "Reset your password",
  description: "Reset your DrPhysioAI account password.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your email and we'll send you a secure link to set a new one."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
