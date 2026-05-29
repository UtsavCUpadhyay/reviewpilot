import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/server'
import { postReviewReply, getAccessToken } from '@/lib/google/business'

export async function POST(req: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({error:'Unauthorized'},{status:401})

  const { reviewId, responseText } = await req.json()
  const service = createServiceClient()

  const { data: review } = await service.from('reviews').select('*, locations(*)').eq('id', reviewId).single()
  if (!review) return NextResponse.json({error:'Not found'},{status:404})

  const location = (review as any).locations
  try {
    const accessToken = await getAccessToken(location)
    await postReviewReply(accessToken, review.google_review_id, responseText)
    await service.from('reviews').update({
      responded: true, response_text: responseText,
      response_posted_at: new Date().toISOString(),
      response_source: 'manual', status: 'posted'
    }).eq('id', reviewId)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
