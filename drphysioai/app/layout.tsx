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
    default: "DrPhysioAI — Your Personal AI Physiotherapist",
    template: "%s · DrPhysioAI",
  },
  description:
    "Learn, recover and move better with DrPhysioAI — India's AI-powered physiotherapy platform. AI study tutor for physio students plus real online consultations, exercise programs and live classes.",
  keywords: [
    "physiotherapy", "AI physiotherapist", "physio notes", "BPT exam prep",
    "online physiotherapy consultation India", "exercise programs", "OSCE practice",
    "physiotherapy students", "back pain", "knee pain", "rehab", "DrPhysioAI",
  ],
  authors: [{ name: "Dr. Utsav Chiragkumar Upadhyay" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "DrPhysioAI",
    title: "DrPhysioAI — Your Personal AI Physiotherapist",
    description:
      "AI study tutor for physiotherapy students + real online consultations, exercise programs and live classes. Learn. Recover. Move better.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DrPhysioAI — Your Personal AI Physiotherapist",
    description:
      "India's AI-powered physiotherapy learning & consultation platform.",
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
  "@type": "MedicalBusiness",
  name: "DrPhysioAI",
  description:
    "AI-powered physiotherapy learning and online consultation platform in India.",
  url: SITE_URL,
  telephone: "+91-97372-06393",
  email: "UtsavCUpadhyay@gmail.com",
  medicalSpecialty: "Physiotherapy",
  areaServed: "IN",
  founder: { "@type": "Person", name: "Dr. Utsav Chiragkumar Upadhyay" },
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
