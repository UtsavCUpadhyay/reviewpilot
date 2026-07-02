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

- **AI tutor** — WIRED. `ai-chat-demo.tsx` is now a real input that POSTs to
  `app/api/tutor/route.ts` (Claude via `@anthropic-ai/sdk`, model
  `claude-opus-4-8`). Set `ANTHROPIC_API_KEY` (server-side; see `.env.example`)
  to go live — without it the route returns 503 and the UI falls back to the
  canned `demoAnswer` samples with a notice. Format toggles re-ask live; in
  fallback they swap the canned sample.
- **Shopify checkout** — LIVE. `lib/shopify.ts` now ships the real DrPhysioAI
  store domain (`drphysioai.com`) + live variant ids for all 8 products, so the
  Pricing (`plan-cta.tsx`) and booking (`booking-widget.tsx` `confirm()`)
  buttons redirect to real Shopify hosted checkout. Env vars still override.
  ⚠️ **Currency:** the store's base currency is **AUD**, but the app UI is
  priced in **₹ INR** — checkout will show A$ amounts until the store currency
  is switched to INR (Settings → General; possible while the store has no real
  orders) or an Indian market is configured. See the Shopify section below.
- **Live Classes join** — `/live-classes` + `live-schedule.tsx` are built with
  a filterable weekly timetable and a reserve dialog; "Reserve my spot" routes
  to sign-up. Wire the join link + reminders to real backend once auth exists.
- **Auth** — WIRED to Supabase. `auth-form.tsx` does real email+password
  sign-up/login (+ Google OAuth button) via `@supabase/ssr`; `middleware.ts`
  gates `/dashboard` (redirects to `/login?next=…`); `app/auth/callback` and
  `app/auth/signout` handle the OAuth/magic-link and sign-out flows.
  **Dedicated project `DrPhysioAI` = `uyakkdalfopuamkacxqd`** (Mumbai
  ap-south-1, ACTIVE) — its own auth users, isolated from the ReviewPilot
  project. Public URL + publishable key baked into `lib/supabase/config.ts`
  (env overridable). Notes: Google OAuth needs a provider client id/secret set
  in the Supabase dashboard; email confirmation is ON by default (signup shows
  a "check your email" state) — disable it in Auth settings for instant signup.
- **`profiles` table** — created in the DrPhysioAI project with RLS + an
  `on_auth_user_created` trigger that auto-inserts a profile (with `full_name`
  from signup metadata). Columns: `streak_days`, `ai_questions`,
  `quiz_accuracy`, `badges` (default 0). The dashboard reads these for the
  greeting + KPI cards, so a new user sees an honest zero-state.
- **Dashboard data** — name, greeting and KPI cards are now real (from
  `profiles`). The "continue learning", "next consultation", "today's goal"
  and activity feed are still illustrative placeholders (no data pipeline yet).

## SHOPIFY — connected & catalog live

Store **DrPhysioAI** (`drphysioai.com`, myshopify `gyvjr4-qz.myshopify.com`).
8 products created (ACTIVE, published to Online Store, availableForSale) and
wired into `lib/shopify.ts` by catalog key → variant id:

| Catalog key | Product | Variant id | Price |
|---|---|---|---|
| `plan:Ultimate Student` | Ultimate Student — Monthly Membership | 48044581552315 | 499 |
| `plan:Complete Care` | Complete Care — Monthly Membership | 48044581585083 | 1499 |
| `service:Video Consultation` | Video Consultation | 48044581617851 | 499 |
| `service:Exercise Prescription` | Exercise Prescription | 48044581650619 | 699 |
| `service:Pain Management` | Pain Management | 48044581683387 | 599 |
| `service:Post-Surgical Rehab` | Post-Surgical Rehab | 48044581716155 | 799 |
| `service:Sports Injury Rehab` | Sports Injury Rehab | 48044581748923 | 799 |
| `service:Neuro & Elderly Care` | Neuro & Elderly Care | 48044581781691 | 699 |

**Open items:**
- **Currency is AUD, app is ₹ INR** — switch store base currency to INR, or set
  up an India market, so checkout amounts match the UI.
- **Plans are one-time products** — real recurring billing needs a Shopify
  subscription app/Selling Plans API (follow-up).
- 4 leftover "Example product" samples can be deleted from the store.

## (historical) SHOPIFY — earlier re-authorization notes

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
4. ~~Make the AI tutor real (`/api/tutor` with Claude).~~ Done → just needs
   `ANTHROPIC_API_KEY` set to switch from sample answers to live.
5. ~~Wire auth to Supabase; gate `/dashboard`.~~ Done.
6. i18n (Hindi/Gujarati) using `lib/content.ts`.
7. Real dashboard/user data (schema + RLS) now that auth exists.

## How to run

```bash
cd drphysioai
npm install
npm run dev     # http://localhost:3000
npm run build   # static production build
```
