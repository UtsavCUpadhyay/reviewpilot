import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
  typescript: true,
})

export const PLANS = {
  starter: {
    name: 'Starter',
    price: 97,
    priceId: 'price_1TcDes9l9WDYmACFA09Y5bCg',
    locations: 1,
    features: [
      'AI auto-responses to all reviews',
      '1 business location',
      'Real-time review monitoring',
      'Email notifications',
      'Monthly reports',
    ],
  },
  pro: {
    name: 'Pro',
    price: 197,
    priceId: 'price_1TcDeu9l9WDYmACFEfvGMIIn',
    locations: 3,
    features: [
      'Everything in Starter',
      '3 business locations',
      'SMS review request campaigns',
      'Review sentiment analysis',
      'Priority support',
    ],
  },
  agency: {
    name: 'Agency',
    price: 397,
    priceId: 'price_1TcDex9l9WDYmACFLYXzDPhf',
    locations: 10,
    features: [
      'Everything in Pro',
      '10 business locations',
      'White-label reports',
      'API access',
      'Dedicated onboarding',
    ],
  },
} as const

export type PlanKey = keyof typeof PLANS

export async function createCheckoutSession({
  userId,
  email,
  plan,
  successUrl,
  cancelUrl,
}: {
  userId: string
  email: string
  plan: PlanKey
  successUrl: string
  cancelUrl: string
}) {
  const planConfig = PLANS[plan]

  // Get or create Stripe customer
  const customers = await stripe.customers.list({ email, limit: 1 })
  let customerId = customers.data[0]?.id

  if (!customerId) {
    const customer = await stripe.customers.create({
      email,
      metadata: { user_id: userId },
    })
    customerId = customer.id
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: planConfig.priceId, quantity: 1 }],
    subscription_data: {
      trial_period_days: 14,
      metadata: { plan, user_id: userId },
    },
    metadata: { plan, user_id: userId },
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
  })

  return session
}

export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}

export function getPlanFromPriceId(priceId: string): PlanKey {
  for (const [key, plan] of Object.entries(PLANS)) {
    if (plan.priceId === priceId) return key as PlanKey
  }
  return 'starter'
}

// Lazy Stripe instance to avoid build-time errors
export function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || 'placeholder', { apiVersion: '2024-04-10' as any, typescript: true })
}
