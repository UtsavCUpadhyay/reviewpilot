import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of the DrPhysioAI clinical platform.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="July 2026"
      intro="These terms govern your use of DrPhysioAI. By creating an account or using the platform you agree to them. Please read the clinical-use and liability sections carefully."
      sections={[
        { heading: "Who can use DrPhysioAI", body: ["The clinical features are intended for qualified physiotherapists and healthcare professionals, and students under supervision. You are responsible for using the platform within your scope of practice and applicable regulations."] },
        { heading: "Clinical decision support only", body: ["DrPhysioAI provides suggestions, structured workflows and documentation aids. It does not diagnose, does not practise medicine, and is not a medical device. The treating clinician is solely responsible for all clinical decisions and patient care."] },
        { heading: "Subscriptions & trials", body: [
          "Plans start with a 7-day free trial. After the trial, the plan bills at the stated price until cancelled.",
          "You can cancel at any time; access continues until the end of the current billing period. Taxes/GST may apply and are shown at checkout.",
        ]},
        { heading: "Acceptable use", body: ["You agree not to misuse the platform, attempt to breach security, upload unlawful content, or use outputs in a way that endangers patients or violates professional standards."] },
        { heading: "Your content", body: ["You retain ownership of the clinical content you create. You grant us the limited rights needed to host and process it to provide the service."] },
        { heading: "Availability", body: ["We aim for high availability but do not guarantee uninterrupted service. We may update features over time."] },
        { heading: "Limitation of liability", body: ["To the maximum extent permitted by law, DrPhysioAI is not liable for clinical outcomes or for indirect or consequential losses. Nothing limits liability that cannot be limited by law."] },
        { heading: "Termination", body: ["You may close your account at any time. We may suspend accounts that breach these terms."] },
        { heading: "Contact", body: ["Questions? Email UtsavCUpadhyay@gmail.com."] },
      ]}
    />
  );
}
