// @ts-nocheck
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LocationDetail from './location-detail'

export default async function LocationPage({ params }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: location } = await supabase.from('locations')
    .select('*, response_settings(*)').eq('id', params.id).eq('user_id', user.id).single()
  if (!location) redirect('/locations')
  return <LocationDetail location={location} />
}
