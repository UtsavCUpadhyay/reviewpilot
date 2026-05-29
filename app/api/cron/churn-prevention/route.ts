import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendTrialEndingEmail } from '@/lib/email'

export async function GET(req: Request) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({error:'Unauthorized'},{status:401})
  }
  const supabase = createServiceClient()
  const threeDaysFromNow = new Date(Date.now() + 3*24*60*60*1000).toISOString()
  const tomorrow = new Date(Date.now() + 24*60*60*1000).toISOString()
  const { data: trialEnding } = await supabase.from('profiles')
    .select('email,full_name').eq('subscription_status','trialing')
    .gte('trial_ends_at', tomorrow).lte('trial_ends_at', threeDaysFromNow)
  let sent = 0
  for (const p of (trialEnding || [])) {
    await sendTrialEndingEmail(p.email, p.full_name || 'there', 3)
    sent++
  }
  return NextResponse.json({ sent })
}
