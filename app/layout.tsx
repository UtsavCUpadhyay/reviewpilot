import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ReviewPilot — AI Review Management for Local Businesses',
  description: 'Automatically respond to every Google review with AI. Monitor, respond, and grow your reputation on autopilot. Try free for 14 days.',
  keywords: 'google review management, ai review responses, reputation management, local business reviews',
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet"/>
      </head>
      <body style={{fontFamily:"'DM Sans', system-ui, sans-serif"}}>{children}</body>
    </html>
  )
}
