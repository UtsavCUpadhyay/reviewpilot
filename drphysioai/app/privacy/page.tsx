import type { Metadata } from "next";
import { ContentPage, ContentHeading } from "@/components/site/content-page";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How DrPhysioAI collects, uses and protects your personal and health information.",
  alternates: { canonical: "https://www.drphysioai.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <ContentPage eyebrow="Legal" title="Privacy Policy" intro="Your privacy and health data matter. This explains what we collect and why.">
      <p className="text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}. This is a plain-language summary; please have it reviewed by a legal professional before relying on it commercially.</p>

      <ContentHeading>What we collect</ContentHeading>
      <p>Account details (name, email), the questions you ask the AI tutor, and — for consultations — the booking and health information you choose to share. Payments are processed securely by our payment partners; we do not store your full card details.</p>

      <ContentHeading>How we use it</ContentHeading>
      <p>To provide learning and consultation services, personalise your experience, process payments, send reminders, and improve the platform. We do not sell your personal data.</p>

      <ContentHeading>Data security</ContentHeading>
      <p>Data is stored with reputable providers using encryption in transit and access controls. No system is perfectly secure, but we take reasonable measures to protect your information.</p>

      <ContentHeading>Your choices</ContentHeading>
      <p>You can request access to, correction of, or deletion of your data at any time by emailing <a className="font-semibold text-teal-600 hover:underline" href={`mailto:${site.email}`}>{site.email}</a>.</p>

      <ContentHeading>Contact</ContentHeading>
      <p>Questions about privacy? Email <a className="font-semibold text-teal-600 hover:underline" href={`mailto:${site.email}`}>{site.email}</a> or WhatsApp {site.whatsapp}.</p>
    </ContentPage>
  );
}
