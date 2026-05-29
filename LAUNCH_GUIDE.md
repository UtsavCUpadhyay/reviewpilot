# 🚀 ReviewPilot — Complete Launch Guide
## Do These Steps in Order — Takes ~2 Hours Total

---

## STEP 1: Create GitHub Repo (5 min)

1. Go to https://github.com/new
2. Name: `reviewpilot` (private)
3. Don't initialize (you have code already)
4. Run these commands in your terminal:
```bash
git remote add origin https://github.com/YOUR_USERNAME/reviewpilot.git
git push -u origin main
```

---

## STEP 2: Set Up Supabase (15 min)

1. Go to https://supabase.com → New Project
2. Name it `reviewpilot`, note your password
3. Once created, go to **Settings → API**
4. Copy: `Project URL` and `anon public` key
5. Go to **SQL Editor** → paste the entire contents of `supabase/migrations/001_initial.sql` → Run
6. Go to **Authentication → URL Configuration**:
   - Site URL: `https://YOUR_DOMAIN.vercel.app`
   - Redirect URLs: add `https://YOUR_DOMAIN.vercel.app/**`

---

## STEP 3: Set Up Stripe (15 min)

1. Go to https://stripe.com → Create account
2. Go to **Products → Add Product**:
   - Create 3 products:
   - "Starter" → $97/month recurring → copy Price ID
   - "Pro" → $197/month recurring → copy Price ID  
   - "Agency" → $397/month recurring → copy Price ID
3. **Developers → Webhooks → Add endpoint**:
   - URL: `https://YOUR_DOMAIN.vercel.app/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
   - Copy the webhook signing secret
4. Enable **Stripe Billing → Customer Portal** (Settings → Billing → Customer portal)

---

## STEP 4: Set Up Google OAuth (20 min)

1. Go to https://console.cloud.google.com
2. New project → Enable these APIs:
   - **Google My Business API**
   - **Business Profile Performance API**
3. Go to **APIs & Services → Credentials → Create OAuth 2.0 Client ID**
   - Type: Web Application
   - Authorized redirect URI: `https://YOUR_DOMAIN.vercel.app/api/auth/google/callback`
4. Copy Client ID and Client Secret

---

## STEP 5: Set Up Resend (5 min)

1. Go to https://resend.com → Sign up
2. Add your domain (or use their sandbox to start)
3. Go to **API Keys → Create API Key**
4. Copy the key

---

## STEP 6: Deploy to Vercel (15 min)

1. Go to https://vercel.com → Import from GitHub → select `reviewpilot`
2. Framework: Next.js (auto-detected)
3. **Add ALL Environment Variables** (Settings → Environment Variables):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_AGENCY_PRICE_ID=price_...

GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-...
GOOGLE_REDIRECT_URI=https://YOUR_DOMAIN.vercel.app/api/auth/google/callback

ANTHROPIC_API_KEY=sk-ant-...

RESEND_API_KEY=re_...
EMAIL_FROM=ReviewPilot <hello@yourdomain.com>

CRON_SECRET=generate_random_32_chars_here

NEXT_PUBLIC_APP_URL=https://YOUR_DOMAIN.vercel.app
```

4. Click **Deploy**
5. Go to **Settings → Functions → Cron Jobs** — verify crons are registered

---

## STEP 7: Upgrade Vercel Plan (2 min)

Cron jobs require Vercel Pro ($20/mo). Upgrade at vercel.com/account/billing.

---

## STEP 8: Add Custom Domain (10 min) — Optional but recommended

1. Buy domain at Namecheap ($10-15/yr) — suggested: `reviewpilot.co` or `replybot.io`
2. In Vercel: Settings → Domains → Add your domain
3. Update DNS records at your registrar
4. Update `NEXT_PUBLIC_APP_URL` env var
5. Update Supabase Auth redirect URLs
6. Update Google OAuth redirect URI

---

## STEP 9: Test Everything (20 min)

- [ ] Go to your site, click "Start Free Trial"
- [ ] Create account, go through onboarding
- [ ] Stripe checkout appears → use test card `4242 4242 4242 4242`
- [ ] Land on dashboard
- [ ] Add a location
- [ ] Stripe webhook shows successful in Stripe dashboard
- [ ] Profile shows correct plan

---

## STEP 10: Launch 🚀 (Day 1-7)

### Quick wins (do all of these):
1. **Product Hunt** — Submit at producthunt.com (free, can drive 100s of signups)
2. **Reddit** — Post to r/smallbusiness, r/entrepreneur: "I built a tool that responds to Google reviews automatically. 14-day free trial."
3. **Cold outreach** — Google "HVAC company [your city]" → find ones with unanswered reviews → email them
4. **IndieHackers** — Post your launch story
5. **Twitter/X** — Post demo video (record Loom of the dashboard)

### Cold email template:
```
Subject: Found 3 unanswered reviews on your Google listing

Hi [Name],

I was looking up HVAC companies in [City] and noticed [Business] has 
3 unanswered Google reviews — including a 2-star one from last month.

Unanswered negative reviews can cost 30% of potential customers.

I built a tool that automatically responds to every review using AI 
— sounds human, matches your tone, handles negative reviews professionally.

Free 14-day trial, no credit card: [your-domain.com]

Worth 2 minutes to try?

[Your name]
```

---

## MONTHLY OPERATING COSTS

| Service | Cost |
|---------|------|
| Vercel Pro | $20 |
| Supabase | $0 (free tier scales to 500MB) |
| Anthropic API | ~$0.02/response × volume |
| Resend | $0 (3k emails/mo free) |
| **Total fixed** | **~$20/mo** |

**Break-even: 1 customer.**

---

## REVENUE PROJECTIONS

| Customers | MRR |
|-----------|-----|
| 10 | ~$1,200 |
| 25 | ~$3,500 |
| 50 | ~$7,000 |
| 100 | ~$14,000 |

---

## SUPPORT

All support is handled by:
1. This README (most questions answered)
2. Email to hello@[yourdomain].com (only real escalations)

Set up a canned response in Gmail for common questions.

---

*Built with Next.js 14 · Supabase · Stripe · Claude AI · Vercel*
