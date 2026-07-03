import type { Metadata } from "next";
import { AuthShell } from "@/components/site/auth-shell";
import { UpdatePasswordForm } from "@/components/site/update-password-form";

export const metadata: Metadata = {
  title: "Set a new password",
  description: "Choose a new password for your DrPhysioAI account.",
  robots: { index: false, follow: false },
};

export default function UpdatePasswordPage() {
  return (
    <AuthShell
      title="Set a new password"
      subtitle="Almost done — choose a new password to secure your account."
    >
      <UpdatePasswordForm />
    </AuthShell>
  );
}
