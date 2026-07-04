import type { Metadata } from "next";
import { ContentPage, ContentHeading } from "@/components/site/content-page";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of DrPhysioAI.",
  alternates: { canonical: "https://drphysioai.com/terms" },
};

export default function TermsPage() {
  return (
    <ContentPage eyebrow="Legal" title="Terms of Service" intro="The basics of using DrPhysioAI, in plain language.">
      <p className="text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}. Please have these reviewed by a legal professional before commercial reliance.</p>

      <ContentHeading>Using the platform</ContentHeading>
      <p>DrPhysioAI provides educational content, an AI study tutor, and access to consultations and classes with licensed physiotherapists. You agree to use it lawfully and to provide accurate information.</p>

      <ContentHeading>Not emergency care</ContentHeading>
      <p>DrPhysioAI is not a substitute for emergency medical care or in-person diagnosis. In an emergency, contact your local hospital or emergency services immediately.</p>

      <ContentHeading>Payments &amp; plans</ContentHeading>
      <p>Paid plans and consultations are billed as shown at checkout. Taxes may apply. See our <a className="font-semibold text-teal-600 hover:underline" href="/refund-policy">Refund Policy</a> for cancellations and refunds.</p>

      <ContentHeading>Accounts</ContentHeading>
      <p>You are responsible for keeping your login secure. We may suspend accounts that abuse the service or violate these terms.</p>

      <ContentHeading>Contact</ContentHeading>
      <p>Questions? Email <a className="font-semibold text-teal-600 hover:underline" href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </ContentPage>
  );
}
