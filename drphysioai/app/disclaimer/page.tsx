import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Clinical & Medical Disclaimer",
  description: "Important information about the intended use and limits of DrPhysioAI.",
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Clinical & Medical Disclaimer"
      updated="July 2026"
      intro="Please read this carefully. It defines what DrPhysioAI is — and, importantly, what it is not."
      sections={[
        { heading: "Decision support, not a decision-maker", body: ["DrPhysioAI is a clinical decision-support tool for qualified clinicians. It offers suggestions, structured assessment workflows, ranked differentials with rationale, and documentation drafts. Every output is a suggestion to support the clinician's own reasoning — never a substitute for it."] },
        { heading: "Not a medical device; not a diagnosis", body: ["The platform does not diagnose conditions, prescribe treatment, or practise medicine. It must not be relied upon as the sole basis for any clinical decision. The treating physiotherapist makes and is responsible for all clinical judgments."] },
        { heading: "Not for emergencies", body: ["DrPhysioAI is not for use in medical emergencies. If a patient may be seriously unwell, arrange urgent medical care or contact local emergency services immediately."] },
        { heading: "Red flags & referral", body: ["The platform includes red-flag prompts to aid screening, but these are not exhaustive. Clinicians must apply their own judgment and refer appropriately."] },
        { heading: "Sample content", body: ["Demonstration content on this site (example assessments, differentials, exercises and dosages) is illustrative only and not validated clinical guidance."] },
        { heading: "No clinician–patient relationship", body: ["Use of this website does not create a clinician–patient relationship with DrPhysioAI or its operator."] },
        { heading: "Your professional responsibility", body: ["Clinicians remain fully responsible for practising within their competence, scope and local regulations, and for the accuracy of any documentation they finalise."] },
      ]}
    />
  );
}
