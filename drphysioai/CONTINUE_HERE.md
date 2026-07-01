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
- **`/login` + `/signup`** — split-screen `AuthShell` + reusable `AuthForm`
  (Google / WhatsApp-OTP / email). UI-only; `onSubmit` is a stub → wire to
  Supabase auth.
- **`/dashboard`** — `DashboardShell` (sidebar + topbar, mobile drawer) with
  KPI cards (streak, AI questions, accuracy, badges), continue-learning
  progress, next-consultation card, today's goal, activity feed. Mock data;
  `robots: noindex`.

All copy is centralised in **`lib/content.ts`** (ready for Hindi/Gujarati i18n).
`npm run build` is clean; all routes are static (~100–104 kB first load).

## KNOWN STUBS (wire these when ready)

- **AI tutor** — `ai-chat-demo.tsx` uses canned answers from `lib/content.ts`
  (`demoAnswer`). Swap `choose()` for a `fetch('/api/tutor')` call. Needs a
  Claude-backed route (`@anthropic-ai/sdk` + `ANTHROPIC_API_KEY`).
- **Shopify checkout** — WIRED but not yet live. `lib/shopify.ts` builds real
  Shopify cart-permalink checkout URLs; Pricing (`plan-cta.tsx`) and booking
  (`booking-widget.tsx` `confirm()`) both call it. It stays inert (graceful
  fallback to sign-up / WhatsApp) until `NEXT_PUBLIC_SHOPIFY_DOMAIN` + the
  variant-id map are set — see `.env.example`. Fill those once the DrPhysioAI
  store is re-authorized (Shopify MCP token expired; see below).
- **Live Classes join** — `/live-classes` + `live-schedule.tsx` are built with
  a filterable weekly timetable and a reserve dialog; "Reserve my spot" routes
  to sign-up. Wire the join link + reminders to real backend once auth exists.
- **Auth** — `auth-form.tsx` `onSubmit` is a no-op. Wire to Supabase auth;
  gate `/dashboard` behind a session.
- **Dashboard data** — all mock/hard-coded. Replace with real user data once
  auth + DB are in place.

## SHOPIFY — still needs re-authorization

As of the latest session the Shopify MCP token was **expired again**
(`get-shop-info` / `search_products` both returned "requires re-authorization").
It can't be re-authorized inside a non-interactive session — the user must
re-connect Shopify (claude.ai connector settings, or `/mcp` in an interactive
CLI session). So the store still hasn't been verified and no live product/
variant ids have been pulled.

The checkout code is nonetheless done and waiting (see `lib/shopify.ts`). Once
Shopify is back:

1. `mcp__Shopify__get-shop-info` → confirm it's the **DrPhysioAI** store
   (NOT "PawHappiness" or "shrivyajewell").
2. `search_products` → get the numeric **variant** ids for the plans/services.
3. Set `NEXT_PUBLIC_SHOPIFY_DOMAIN` + `NEXT_PUBLIC_SHOPIFY_VARIANTS` (JSON map,
   keys like `plan:Complete Care`, `service:Video Consultation` — see
   `.env.example` and the `codeDefaults` map in `lib/shopify.ts`). Checkout goes
   live with no further code changes.

> Note: Shopify is a storefront/checkout system, not a foundation for the AI +
> consultation app. Use it as the payments/subscription layer only.

## SUGGESTED NEXT STEPS (user is open to "keep going")

1. ~~Connect Shopify → wire Pricing & booking "Pay" to checkout.~~ Checkout is
   **wired** (`lib/shopify.ts`); just needs the store re-authorized + env ids.
2. ~~Auth + user dashboard shell.~~ Auth screens + dashboard shell done (auth
   `onSubmit` still a stub → Supabase).
3. ~~**Live Classes** page (schedule + join flow).~~ Done → `/live-classes`.
4. Make the AI tutor real (`/api/tutor` with Claude).
5. Wire auth to Supabase; gate `/dashboard`.
6. i18n (Hindi/Gujarati) using `lib/content.ts`.

## How to run

```bash
cd drphysioai
npm install
npm run dev     # http://localhost:3000
npm run build   # static production build
```
