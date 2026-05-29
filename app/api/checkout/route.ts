import { NextResponse } from 'next/server'
import { createCheckoutSession, PLANS } from '@/lib/stripe'
import type { PlanKey } from '@/lib/stripe'

export async function POST(req: Request) {
  const { plan, userId, email } = await req.json()
  if (!PLANS[plan as PlanKey]) return NextResponse.json({error:'Invalid plan'},{status:400})
  const session = await createCheckoutSession({
    userId, email, plan: plan as PlanKey,
    successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=1`,
    cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
  })
  return NextResponse.json({ url: session.url })
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const plan = searchParams.get('plan') as PlanKey
  const { createClient } = await import('@/lib/supabase/server')
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL('/login', req.url))
  const session = await createCheckoutSession({
    userId: user.id, email: user.email!, plan,
    successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=1`,
    cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
  })
  return NextResponse.redirect(session.url!)
}
