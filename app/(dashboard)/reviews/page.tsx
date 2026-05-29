// @ts-nocheck
import { createClient } from '@/lib/supabase/server'
import ReviewsClient from './reviews-client'

export default async function ReviewsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: locations } = await supabase.from('locations').select('id,name').eq('user_id', user!.id)
  const locationIds = (locations||[]).map(l=>l.id)
  const { data: reviews } = await supabase.from('reviews')
    .select('*').in('location_id', locationIds).order('review_date', {ascending:false}).limit(100)
  return <ReviewsClient reviews={reviews||[]} locations={locations||[]} />
}
