import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendMonthlyReport } from '@/lib/email'

export async function GET(req: Request) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({error:'Unauthorized'},{status:401})
  }
  const supabase = createServiceClient()
  const { data: profiles } = await supabase.from('profiles').select('id,email,full_name').in('subscription_status',['active','trialing'])
  let sent = 0
  for (const profile of (profiles || [])) {
    const { data: locations } = await supabase.from('locations').select('*').eq('user_id', profile.id)
    if (!locations?.length) continue
    const locIds = locations.map(l => l.id)
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString()
    const monthEnd = new Date(now.getFullYear(), now.getMonth(), 0).toISOString()
    const { data: reviews } = await supabase.from('reviews')
      .select('rating,content,responded').in('location_id', locIds)
      .gte('review_date', monthStart).lte('review_date', monthEnd)
    if (!reviews?.length) continue
    const avgRating = reviews.reduce((s,r) => s+r.rating, 0) / reviews.length
    const responseRate = Math.round((reviews.filter(r=>r.responded).length / reviews.length) * 100)
    const topReview = reviews.filter(r=>r.rating===5 && r.content).sort(()=>Math.random()-0.5)[0]?.content || ''
    const bizName = locations[0].name
    await sendMonthlyReport(profile.email, bizName, {
      totalReviews: reviews.length, avgRating, responsesPosted: reviews.filter(r=>r.responded).length,
      responseRate, ratingChange: 0, topReview: topReview.slice(0, 120)
    })
    sent++
  }
  return NextResponse.json({ sent })
}
