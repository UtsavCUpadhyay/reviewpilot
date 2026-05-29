import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { fetchReviews, starRatingToNumber, getAccessToken, postReviewReply } from '@/lib/google/business'
import { generateReviewResponse, detectSentiment } from '@/lib/ai'
import { sendNegativeReviewAlert } from '@/lib/email'

export const maxDuration = 300

export async function GET(req: Request) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({error:'Unauthorized'},{status:401})
  }
  const supabase = createServiceClient()
  const { data: locations } = await supabase.from('locations')
    .select('*, profiles!inner(subscription_status,email), response_settings(*)')
    .not('google_refresh_token','is',null)
    .eq('google_connected', true)

  if (!locations?.length) return NextResponse.json({ processed: 0 })

  let processed = 0
  for (const loc of locations) {
    if (!['active','trialing'].includes((loc as any).profiles?.subscription_status)) continue
    try {
      const accessToken = await getAccessToken(loc)
      const locationName = `accounts/${loc.google_account_id}/locations/${loc.google_location_id}`
      const { reviews } = await fetchReviews(accessToken, locationName)
      for (const gr of (reviews || [])) {
        const { data: existing } = await supabase.from('reviews').select('id').eq('google_review_id', gr.name).single()
        if (existing) continue
        const rating = starRatingToNumber(gr.starRating)
        const settings = (loc as any).response_settings
        let aiResponse: string | null = null
        if (!gr.reviewReply) {
          aiResponse = await generateReviewResponse({
            rating, reviewContent: gr.comment || null,
            reviewerName: gr.reviewer?.displayName || null,
            locationName: loc.name, settings
          })
        }
        const autoPost = loc.auto_respond && rating >= (loc.auto_respond_threshold || 3) && !gr.reviewReply
        const { data: saved } = await supabase.from('reviews').insert({
          location_id: loc.id, google_review_id: gr.name,
          reviewer_name: gr.reviewer?.displayName || null,
          rating, content: gr.comment || null,
          review_date: gr.createTime,
          response_text: aiResponse,
          response_generated_at: aiResponse ? new Date().toISOString() : null,
          sentiment: detectSentiment(rating, gr.comment || null),
          status: gr.reviewReply ? 'posted' : aiResponse ? 'ai_generated' : 'pending',
          responded: !!gr.reviewReply,
          response_source: gr.reviewReply ? 'manual' : null
        }).select().single()

        if (autoPost && aiResponse && saved) {
          await postReviewReply(accessToken, gr.name, aiResponse)
          await supabase.from('reviews').update({ responded: true, response_posted_at: new Date().toISOString(), status: 'posted', response_source: 'ai' }).eq('id', saved.id)
        }

        if (rating <= 2 && (loc as any).profiles?.email) {
          sendNegativeReviewAlert(
            (loc as any).profiles.email, loc.name,
            gr.reviewer?.displayName || 'Anonymous', rating,
            gr.comment || '', `${process.env.NEXT_PUBLIC_APP_URL}/reviews`
          ).catch(()=>{})
        }
      }
      await supabase.from('locations').update({ last_polled_at: new Date().toISOString() }).eq('id', loc.id)
      processed++
    } catch (err: any) {
      await supabase.from('automation_log').insert({ location_id: loc.id, action: 'poll_reviews', status: 'failed', error_message: err.message })
    }
  }
  return NextResponse.json({ processed, timestamp: new Date() })
}
