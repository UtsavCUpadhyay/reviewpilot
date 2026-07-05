import type { Metadata } from "next";
import { ContentPage, ContentHeading } from "@/components/site/content-page";

export const metadata: Metadata = {
  title: "Medical Disclaimer",
  description: "Important information about the educational nature of DrPhysioAI.",
  alternates: { canonical: "https://www.drphysioai.com/medical-disclaimer" },
};

export default function MedicalDisclaimerPage() {
  return (
    <ContentPage eyebrow="Legal" title="Medical Disclaimer" intro="Please read this carefully before acting on any content.">
      <ContentHeading>Educational purpose</ContentHeading>
      <p>The AI tutor, notes, and general content on DrPhysioAI are for <strong>education and information only</strong>. They are not medical advice, diagnosis, or treatment, and should not replace consultation with a qualified healthcare professional.</p>

      <ContentHeading>Consultations</ContentHeading>
      <p>Consultations are provided by licensed physiotherapists and are intended to support — not replace — your primary medical care. Always share your full history and follow up with an in-person doctor when needed.</p>

      <ContentHeading>Emergencies</ContentHeading>
      <p>DrPhysioAI is <strong>not for medical emergencies</strong>. If you experience a medical emergency, contact your local hospital or emergency services immediately.</p>

      <ContentHeading>No guarantees</ContentHeading>
      <p>Individual results vary. Following any exercise or program is at your own discretion; stop and seek help if you feel pain or discomfort.</p>
    </ContentPage>
  );
}
