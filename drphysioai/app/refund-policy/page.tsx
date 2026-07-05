import type { Metadata } from "next";
import { ContentPage, ContentHeading } from "@/components/site/content-page";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "How cancellations and refunds work at DrPhysioAI.",
  alternates: { canonical: "https://www.drphysioai.com/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <ContentPage eyebrow="Legal" title="Refund & Cancellation Policy" intro="Fair, simple rules for cancellations and refunds.">
      <ContentHeading>Consultations</ContentHeading>
      <p>You can cancel or reschedule a consultation up to 4 hours before the appointment for a full refund. Cancellations after that, or no-shows, may not be eligible for a refund.</p>

      <ContentHeading>Subscriptions</ContentHeading>
      <p>Monthly plans can be cancelled any time and will not renew for the next cycle. Access continues until the end of the paid period. Partial-month refunds are generally not provided.</p>

      <ContentHeading>Live classes</ContentHeading>
      <p>Reserved live-class spots can be cancelled up to 2 hours before the class. Classes included with membership are not separately refundable but can be rescheduled subject to availability.</p>

      <ContentHeading>How to request</ContentHeading>
      <p>Email <a className="font-semibold text-teal-600 hover:underline" href={`mailto:${site.email}`}>{site.email}</a> or WhatsApp {site.whatsapp} with your order details. Approved refunds are returned to the original payment method, usually within 5–7 business days.</p>
    </ContentPage>
  );
}
