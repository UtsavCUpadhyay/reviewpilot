import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createCustomerPortalSession } from '@/lib/stripe'

export async function POST(req: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({error:'Unauthorized'},{status:401})
  const { data: profile } = await supabase.from('profiles').select('stripe_customer_id').eq('id', user.id).single()
  if (!profile?.stripe_customer_id) return NextResponse.json({error:'No customer'},{status:400})
  const session = await createCustomerPortalSession(profile.stripe_customer_id, `${process.env.NEXT_PUBLIC_APP_URL}/billing`)
  return NextResponse.json({ url: session.url })
}
