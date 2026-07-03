# DrPhysioAI

India's AI-powered physiotherapy platform — an AI study tutor for physiotherapy
students plus real online consultations, exercise programs and live classes.

> **Status:** Foundation — a production-quality homepage + reusable design system.
> This is the benchmark the rest of the platform (AI tutor, booking, dashboards,
> admin, payments, Flutter apps) is built on top of.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with a token-driven design system (light + dark)
- **lucide-react** icons
- Zero heavy animation deps — animations are CSS + a tiny IntersectionObserver
  reveal hook, so the site stays fast (targets Lighthouse ≥ 95).

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Project structure

```
app/
  layout.tsx        Fonts, SEO metadata, JSON-LD, PWA, no-flash theme script
  page.tsx          Homepage — composes the sections below
  globals.css       Design tokens (CSS vars) + utilities (glass, reveal, mesh)
  manifest.ts       PWA manifest  ·  robots.ts / sitemap.ts  ·  icon.svg
components/
  ui/               Design-system primitives (Button, Card, SectionHeading, Reveal)
  site/             Homepage sections (Navbar, Hero, Stats, Features, …, Footer)
lib/
  content.ts        All copy in one place — ready for Hindi / Gujarati i18n
  utils.ts          cn() class merger
tailwind.config.ts  Colour ramps, shadows, gradients, keyframes/animations
```

## Design system

**Brand palette** — a "healing tech" identity:

| Token        | Value      | Use                                  |
| ------------ | ---------- | ------------------------------------ |
| Teal         | `#0fbfb4`  | Primary — trust, recovery            |
| Brand blue   | `#2563eb`  | Gradient mid, links                  |
| Violet       | `#7c3aed`  | AI / intelligence accents            |
| Coral        | `#f43f5e`  | Energy highlights (live classes)     |

- **`bg-brand-gradient`** — teal → blue → violet, used for CTAs, the logo tile
  and the hero glow.
- **Typography** — `Plus Jakarta Sans` (display) + `Inter` (body).
- **Surfaces** — rounded (`rounded-3xl`+), soft shadows (`shadow-soft`,
  `shadow-card`, `shadow-glow`), and **glassmorphism** (`.glass`).
- **Theming** — all colours are HSL CSS variables switched by a `.dark` class on
  `<html>`; a pre-paint script prevents theme flash and respects OS preference.
- **Motion** — `.reveal` scroll animations, `animate-float`, `animate-marquee`,
  `animate-gradient-pan`; all disabled under `prefers-reduced-motion`.

### Reusing the system

```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

<Reveal delay={90}>
  <Card className="p-6 card-hover">
    <h3 className="font-display text-lg font-bold text-gradient">Title</h3>
  </Card>
</Reveal>
```

## Accessibility & performance

- Semantic landmarks, focus-visible rings, `aria-*` on interactive controls.
- `prefers-reduced-motion` fully honoured.
- Mobile-first, responsive to 320px; dark/light with correct `theme-color`.
- Fonts via `next/font` (self-hosted, `display: swap`).

## Roadmap (not built yet)

Auth & dashboards · AI tutor (Claude) with PDF/Drive pipeline · booking &
payments (UPI/Stripe) · live classes · admin panel · community · blog · i18n
(Hindi/Gujarati) · Flutter apps.

## Contact

- **Founder:** Dr. Utsav Chiragkumar Upadhyay
- **WhatsApp:** +91 97372 06393 · **Email:** UtsavCUpadhyay@gmail.com
