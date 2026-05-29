import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe as _stripe, getPlanFromPriceId, getStripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'
import { sendWelcomeEmail, sendTrialEndingEmail, sendPaymentFailedEmail } from '@/lib/email'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = headers().get('stripe-signature')!
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch { return NextResponse.json({error:'Bad signature'},{status:400}) }

  const supabase = createServiceClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const s = event.data.object as Stripe.CheckoutSession
      const plan = s.metadata?.plan || 'starter'
      const userId = s.metadata?.user_id
      if (!userId) break
      const planLimits: Record<string,number> = { starter:1, pro:3, agency:10 }
      await supabase.from('profiles').update({
        stripe_customer_id: s.customer as string,
        stripe_subscription_id: s.subscription as string,
        plan, subscription_status: 'active',
        locations_limit: planLimits[plan] || 1
      }).eq('id', userId)
      const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', userId).single()
      await sendWelcomeEmail(s.customer_email!, profile?.full_name || 'there', plan)
      if (process.env.MAKE_ONBOARDING_WEBHOOK) {
        fetch(process.env.MAKE_ONBOARDING_WEBHOOK, {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ userId, email: s.customer_email, plan, timestamp: new Date() })
        }).catch(()=>{})
      }
      break
    }
    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      const plan = getPlanFromPriceId(sub.items.data[0]?.price.id)
      await supabase.from('profiles').update({ plan, subscription_status: sub.status }).eq('stripe_customer_id', sub.customer as string)
      break
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      await supabase.from('profiles').update({ subscription_status: 'canceled' }).eq('stripe_customer_id', sub.customer as string)
      break
    }
    case 'invoice.payment_failed': {
      const inv = event.data.object as Stripe.Invoice
      const { data: profile } = await supabase.from('profiles').select('email,full_name').eq('stripe_customer_id', inv.customer as string).single()
      if (profile) await sendPaymentFailedEmail(profile.email, profile.full_name || 'there')
      break
    }
  }
  return NextResponse.json({ received: true })
}
