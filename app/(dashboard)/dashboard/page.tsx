// @ts-nocheck
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()
  const { data: locations } = await supabase.from('locations').select('*').eq('user_id', user!.id)
  const { data: recentReviews } = await supabase.from('reviews')
    .select('*, locations(name)').in('location_id', (locations||[]).map(l=>l.id))
    .order('review_date', { ascending: false }).limit(5)

  const totalReviews = locations?.reduce((s,l) => s + l.total_reviews, 0) || 0
  const totalResponded = locations?.reduce((s,l) => s + l.total_responded, 0) || 0
  const responseRate = totalReviews > 0 ? Math.round((totalResponded/totalReviews)*100) : 0
  const avgRating = locations?.length ? (locations.reduce((s,l) => s + (l.avg_rating||0), 0) / locations.length).toFixed(1) : '—'

  const stats = [
    { label: 'Avg Rating', value: avgRating + (avgRating !== '—' ? ' ⭐' : ''), sub: 'Across all locations' },
    { label: 'Response Rate', value: responseRate + '%', sub: `${totalResponded} of ${totalReviews} reviews` },
    { label: 'Locations', value: String(locations?.length || 0), sub: 'Connected to Google' },
    { label: 'Plan', value: profile?.plan || 'trial', sub: profile?.subscription_status || 'trialing', isPlan: true },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, {profile?.full_name?.split(' ')[0] || 'there'} 👋</p>
        </div>
        <Link href="/locations/new"
          className="px-4 py-2 rounded-lg text-white text-sm font-medium"
          style={{background:'#e3601f'}}>
          + Add Location
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, sub, isPlan }) => (
          <div key={label} className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{label}</div>
            <div className={`text-2xl font-bold mb-1 ${isPlan ? 'capitalize' : ''}`} style={isPlan ? {color:'#e3601f'} : {color:'#1a1a1a'}}>{value}</div>
            <div className="text-xs text-gray-400 capitalize">{sub}</div>
          </div>
        ))}
      </div>

      {/* No locations CTA */}
      {!locations?.length && (
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-12 text-center mb-8">
          <div className="text-4xl mb-4">📍</div>
          <h3 className="font-semibold text-gray-900 mb-2">Add your first location</h3>
          <p className="text-gray-500 text-sm mb-6">Connect your Google Business Profile to start monitoring and responding to reviews automatically.</p>
          <Link href="/locations/new" className="px-6 py-3 rounded-xl text-white font-medium text-sm" style={{background:'#e3601f'}}>
            Add Location →
          </Link>
        </div>
      )}

      {/* Recent reviews */}
      {recentReviews && recentReviews.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Reviews</h2>
            <Link href="/reviews" className="text-sm font-medium" style={{color:'#e3601f'}}>View all →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentReviews.map((review: any) => (
              <div key={review.id} className="px-6 py-4 flex items-start gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{background:'#1a1a1a'}}>
                  {(review.reviewer_name || '?')[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 text-sm">{review.reviewer_name || 'Anonymous'}</span>
                    <span className="text-yellow-400 text-xs">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${review.responded ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                      {review.responded ? 'Responded' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm truncate">{review.content || '(No text)'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
