import type { Metadata } from "next";
import { ContentPage, ContentHeading } from "@/components/site/content-page";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How DrPhysioAI uses cookies and similar technologies.",
  alternates: { canonical: "https://drphysioai.com/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <ContentPage eyebrow="Legal" title="Cookie Policy" intro="What cookies we use and why.">
      <ContentHeading>What cookies do</ContentHeading>
      <p>Cookies are small files stored on your device. We use them to keep you signed in, remember your language and theme, keep the site secure, and understand how the site is used so we can improve it.</p>

      <ContentHeading>Types we use</ContentHeading>
      <p><strong>Essential</strong> — sign-in sessions, security, and preferences (language, light/dark). <strong>Analytics</strong> — anonymous usage to improve the product. We do not use cookies to sell your data.</p>

      <ContentHeading>Your control</ContentHeading>
      <p>You can clear or block cookies in your browser settings, though some features (like staying logged in) may stop working. Questions? Email <a className="font-semibold text-teal-600 hover:underline" href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </ContentPage>
  );
}
