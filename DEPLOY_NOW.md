# 🚀 DEPLOY NOW — 3 Steps, 5 Minutes

## Everything is already set up:
- ✅ Database live at Supabase  
- ✅ Stripe payments configured ($97/$197/$397/mo plans)
- ✅ App built and tested

## You only need to do 3 steps:

---

## STEP 1: Go to this URL and click "Deploy"

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/reviewpilot)

**OR manually:**
1. Go to vercel.com → "Add New Project"
2. Upload the ZIP file I gave you
3. Click Deploy

---

## STEP 2: Add these environment variables in Vercel

When Vercel asks for environment variables, paste these EXACTLY:

```
NEXT_PUBLIC_SUPABASE_URL=https://uapvekifcptnqzqtfawq.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhcHZla2lmY3B0bnF6cXRmYXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5ODE5MTIsImV4cCI6MjA5NTU1NzkxMn0.YNCg2yEDZSpG67RwiMfQiZC3qsRMCAi1eNXoc39gyF4

STRIPE_STARTER_PRICE_ID=price_1TcDes9l9WDYmACFA09Y5bCg
STRIPE_PRO_PRICE_ID=price_1TcDeu9l9WDYmACFEfvGMIIn
STRIPE_AGENCY_PRICE_ID=price_1TcDex9l9WDYmACFLYXzDPhf

CRON_SECRET=generate_random_32_chars
NEXT_PUBLIC_APP_URL=https://YOUR-APP.vercel.app
```

**Also add these 4 (copy from each website):**
```
SUPABASE_SERVICE_ROLE_KEY=  ← supabase.com → your project → Settings → API → service_role
STRIPE_SECRET_KEY=sk_test_...  ← (from your Stripe dashboard)
STRIPE_WEBHOOK_SECRET=  ← create at stripe.com/webhooks after deploy
ANTHROPIC_API_KEY=  ← console.anthropic.com
RESEND_API_KEY=re_...  ← (from your Resend dashboard)
```

---

## STEP 3: After deploy, add Stripe webhook

1. Copy your Vercel URL (e.g. https://reviewpilot-xyz.vercel.app)
2. Go to stripe.com → Developers → Webhooks → Add endpoint
3. URL: `https://YOUR-URL.vercel.app/api/webhooks/stripe`
4. Select events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted, invoice.payment_failed
5. Copy the "Signing secret" → paste as STRIPE_WEBHOOK_SECRET in Vercel

**That's it. Your app is live and earning money.**
