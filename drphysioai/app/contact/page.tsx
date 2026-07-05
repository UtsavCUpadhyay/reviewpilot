import type { Metadata } from "next";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { ContentPage, ContentHeading } from "@/components/site/content-page";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with DrPhysioAI — WhatsApp, email, or reach out about careers and partnerships.",
  alternates: { canonical: "https://www.drphysioai.com/contact" },
};

export default function ContactPage() {
  return (
    <ContentPage
      eyebrow="Contact"
      title="We'd love to hear from you"
      intro="Whether you're a student, patient, clinic, or want to join the team — reach out and we'll get back quickly."
    >
      <ul className="not-prose space-y-3">
        <li>
          <a href={site.whatsappLink} className="flex items-center gap-3 font-semibold text-teal-600 hover:underline">
            <MessageCircle className="h-5 w-5 text-[#25D366]" /> WhatsApp: {site.whatsapp}
          </a>
        </li>
        <li>
          <a href={`mailto:${site.email}`} className="flex items-center gap-3 font-semibold text-teal-600 hover:underline">
            <Mail className="h-5 w-5" /> {site.email}
          </a>
        </li>
        <li className="flex items-center gap-3 text-muted-foreground">
          <MapPin className="h-5 w-5" /> Gujarat, India · Serving all of India
        </li>
      </ul>

      <ContentHeading>Careers &amp; partnerships</ContentHeading>
      <p>
        We&apos;re a young team building something big. If you&apos;re a physiotherapist, engineer,
        designer or creator who wants to shape India&apos;s best physio platform, email us with a
        line about yourself — we read everything.
      </p>
    </ContentPage>
  );
}
