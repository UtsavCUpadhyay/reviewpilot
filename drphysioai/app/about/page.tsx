import type { Metadata } from "next";
import { ContentPage, ContentHeading } from "@/components/site/content-page";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "DrPhysioAI — India's AI-powered physiotherapy platform for students and patients, founded by Dr. Utsav Chiragkumar Upadhyay.",
  alternates: { canonical: "https://www.drphysioai.com/about" },
};

export default function AboutPage() {
  return (
    <ContentPage
      eyebrow="About Us"
      title="Physiotherapy, reimagined for India"
      intro="We're building the physiotherapy platform we wish existed — one that teaches students like a great professor and treats patients like family, powered by AI and led by real doctors."
    >
      <ContentHeading>Our story</ContentHeading>
      <p>
        DrPhysioAI was founded by <strong>{site.founder}</strong> — a physiotherapist (BPT,
        Sumandeep Vidyapeeth Deemed University, Vadodara) with a Master of Advanced Public Health
        from Queensland, Australia. He saw two problems every day: students drowning in scattered
        notes with no one to explain concepts at 2am, and patients — especially in smaller towns —
        unable to reach quality physiotherapy care.
      </p>
      <p>
        So we built one platform that solves both: a 24/7 AI study tutor for physiotherapy students,
        and real online consultations, exercise programs and live classes for patients — in English,
        Hindi and Gujarati, at prices made for India.
      </p>

      <ContentHeading>What we believe</ContentHeading>
      <p>
        Care should be accessible, understandable, and affordable. Technology should make expert help
        feel closer, not colder. And every person — student, patient, parent or grandparent — deserves
        a tool that simply works.
      </p>

      <ContentHeading>Say hello</ContentHeading>
      <p>
        Questions, partnerships, or feedback? Reach us on WhatsApp at{" "}
        <a className="font-semibold text-teal-600 hover:underline" href={site.whatsappLink}>
          {site.whatsapp}
        </a>{" "}
        or email{" "}
        <a className="font-semibold text-teal-600 hover:underline" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        .
      </p>
    </ContentPage>
  );
}
