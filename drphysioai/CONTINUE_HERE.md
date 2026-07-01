# DrPhysioAI — Session Handoff / Continue Here

> Read this first when resuming in a new session. Everything below is already
> committed and pushed to branch **`claude/drphysioai-platform-design-ekm6m3`**.
> Nothing from the previous session is lost.

## What this project is

**DrPhysioAI** — India's AI-powered physiotherapy platform: an AI study tutor
for physio students + real online doctor consultations, exercise programs and
live classes. Founder: **Dr. Utsav Chiragkumar Upadhyay** · WhatsApp
**+91 97372 06393** · **UtsavCUpadhyay@gmail.com**.

Built as a **new Next.js 14 app in `drphysioai/`**, alongside the existing
`reviewpilot` app in the same repo (deliberate — chosen by the user).

## Decisions already made (do not re-ask)

1. **Location:** DrPhysioAI lives in `drphysioai/` (a separate app), not by
   replacing ReviewPilot.
2. **First deliverables:** homepage + reusable design system → done.
3. **Stack:** Next.js 14 App Router, TypeScript, Tailwind (token-driven design
   system, light/dark), lucide-react. Animations are CSS + a tiny
   IntersectionObserver `Reveal` — no heavy animation deps (keeps it fast).
4. **Payments:** Shopify is the intended store/checkout layer; Stripe also
   available in the parent repo. Both wire in *after* the store is connected.

## What is DONE (all committed + render-verified via headless Chromium)

- **Design system** — `tailwind.config.ts` + `app/globals.css` (brand gradient
  teal→blue→violet, glassmorphism `.glass`, `.reveal`, shadows, keyframes),
  Plus Jakarta Sans + Inter. Primitives in `components/ui/`: `Button`, `Card`,
  `SectionHeading`, `Reveal`.
- **`/` homepage** — Navbar (glass, mobile drawer, theme toggle), Hero (AI
  console mockup + orbiting cards), Stats, Features, HowItWorks, Consultation
  band, LiveClasses marquee, Testimonials, Pricing, FAQ, CTA, Footer, WhatsApp
  FAB. SEO metadata + `MedicalBusiness` JSON-LD + sitemap/robots/manifest.
- **`/ai`** — AI Learning page with an **interactive tutor demo**
  (`components/site/ai-chat-demo.tsx`) that toggles answer formats
  (Short/Detailed/Table/Flowchart/Simple) client-side; subjects grid; 5 AI
  subscription tiers.
- **`/consultation`** — 3-step **booking widget**
  (`components/site/booking-widget.tsx`): service → date (live 7 days) → slot,
  with a sticky live summary + total. "Confirm & Pay" is stubbed.

All copy is centralised in **`lib/content.ts`** (ready for Hindi/Gujarati i18n).
`npm run build` is clean; all routes are static (~100–104 kB first load).

## KNOWN STUBS (wire these when ready)

- **AI tutor** — `ai-chat-demo.tsx` uses canned answers from `lib/content.ts`
  (`demoAnswer`). Swap `choose()` for a `fetch('/api/tutor')` call. Needs a
  Claude-backed route (`@anthropic-ai/sdk` + `ANTHROPIC_API_KEY`).
- **Booking checkout** — `booking-widget.tsx` `confirm()` fakes success on a
  timer. Replace with a Shopify/Stripe checkout redirect.

## SHOPIFY — the reason for the fresh session

In the previous session, calling `switch-shop` revoked the Shopify token and it
could not be re-authorized inside that running session. **This new session
should have a valid token.** First actions to try:

1. `mcp__Shopify__get-shop-info` → confirm it's the **DrPhysioAI** store
   (previously the connection defaulted to "PawHappiness" — a pet store — so
   verify the name/domain).
2. If it's the wrong store, the user's other stores include PawHappiness and
   shrivyajewell; DrPhysioAI is the target.
3. Then: `search_products` to see catalog, and plan wiring the Pricing +
   "Confirm & Pay" buttons to real Shopify checkout.

> Note: Shopify is a storefront/checkout system, not a foundation for the AI +
> consultation app. Use it as the payments/subscription layer only.

## SUGGESTED NEXT STEPS (user is open to "keep going")

1. Connect Shopify → wire Pricing & booking "Pay" to checkout.
2. **Auth + user dashboard** shell (progress, streaks, consultations, history).
3. **Live Classes** page (schedule + join flow).
4. Make the AI tutor real (`/api/tutor` with Claude).
5. i18n (Hindi/Gujarati) using `lib/content.ts`.

## How to run

```bash
cd drphysioai
npm install
npm run dev     # http://localhost:3000
npm run build   # static production build
```
