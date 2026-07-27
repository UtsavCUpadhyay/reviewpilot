import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How DrPhysioAI collects, uses and protects personal and clinical data.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 2026"
      intro="DrPhysioAI is built privacy-by-design. This policy explains what we collect, why, and the choices you have. Because clinicians handle patient data on our platform, we treat that data with particular care."
      sections={[
        { heading: "Who we are", body: ["DrPhysioAI is operated by Dr. Utsav Chiragkumar Upadhyay. You can reach us at UtsavCUpadhyay@gmail.com or on WhatsApp at +91 97372 06393."] },
        { heading: "Data we collect", body: [
          "Account data: name, email, professional details and billing information for clinicians who subscribe.",
          "Clinical content you enter: assessments, notes and exercise programs. Where this relates to patients, the clinician is the data controller and DrPhysioAI acts as a processor.",
          "Usage data: how the product is used, to improve reliability and features.",
        ]},
        { heading: "How we use data", body: ["To provide and improve the service, generate AI suggestions and documentation, process payments, provide support, and meet legal obligations. We do not sell your data."] },
        { heading: "AI processing", body: ["AI suggestions are generated to support clinicians. We minimise the data sent for AI processing and do not use your clinical content to train third-party foundation models without a lawful basis and appropriate safeguards."] },
        { heading: "Security", body: ["We use encryption in transit and at rest, role-based access controls, audit logging, clinic-level data isolation and regular backups. No system is perfectly secure, but we work to protect your data to a high standard."] },
        { heading: "Data sharing", body: ["We share data only with processors needed to run the service (e.g. hosting, payments), under contract, and where required by law."] },
        { heading: "Your rights", body: ["Depending on your jurisdiction, you may have rights to access, correct, export or delete your data. Contact us to exercise them."] },
        { heading: "Retention", body: ["We keep data for as long as your account is active or as needed for legal, clinical-record and accounting obligations, then delete or anonymise it."] },
        { heading: "Contact", body: ["Questions about privacy? Email UtsavCUpadhyay@gmail.com."] },
      ]}
    />
  );
}
