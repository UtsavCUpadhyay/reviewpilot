import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const SITE_URL = "https://drphysioai.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DrPhysioAI — The Clinical AI Platform for Physiotherapists",
    template: "%s · DrPhysioAI",
  },
  description:
    "DrPhysioAI is the AI-powered clinical operating system for physiotherapists: structured assessment, transparent clinical reasoning with ranked differentials, instant SOAP documentation, evidence-based exercise prescription and practice management. Decision support — the clinician decides.",
  keywords: [
    "physiotherapy software", "clinical reasoning assistant", "physio SOAP notes",
    "assessment workflow", "exercise prescription software", "outcome measures",
    "physiotherapy SaaS", "rehab clinical decision support", "practice management physio",
    "DrPhysioAI",
  ],
  authors: [{ name: "Dr. Utsav Chiragkumar Upadhyay" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "DrPhysioAI",
    title: "DrPhysioAI — The Clinical AI Platform for Physiotherapists",
    description:
      "Structured assessment, transparent reasoning, instant documentation and exercise prescription — the operating system for physiotherapy.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DrPhysioAI — The Clinical AI Platform for Physiotherapists",
    description:
      "AI clinical decision-support for physiotherapists. The clinician always decides.",
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1c" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Set theme before paint to avoid a flash of the wrong colour scheme.
const themeScript = `
(function(){try{var t=localStorage.getItem('dpa-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DrPhysioAI",
  applicationCategory: "HealthApplication",
  description:
    "AI-powered clinical decision-support platform for physiotherapists: assessment, clinical reasoning, documentation and exercise prescription.",
  url: SITE_URL,
  operatingSystem: "Web",
  offers: { "@type": "Offer", category: "SaaS subscription" },
  author: { "@type": "Person", name: "Dr. Utsav Chiragkumar Upadhyay" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
