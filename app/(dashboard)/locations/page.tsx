// @ts-nocheck
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function LocationsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: locations } = await supabase.from('locations').select('*').eq('user_id', user!.id)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Locations</h1>
        <Link href="/locations/new" className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{background:'#e3601f'}}>
          + Add Location
        </Link>
      </div>
      <div className="space-y-3">
        {locations?.map(loc => (
          <div key={loc.id} className="bg-white rounded-xl border border-gray-100 p-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900">{loc.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${loc.google_connected ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {loc.google_connected ? '✓ Google Connected' : 'Not Connected'}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${loc.auto_respond ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                  {loc.auto_respond ? '🤖 Auto-respond ON' : 'Manual mode'}
                </span>
              </div>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>⭐ {loc.avg_rating?.toFixed(1) || '—'}</span>
                <span>{loc.total_reviews} reviews</span>
                <span>{loc.total_responded} responded</span>
              </div>
            </div>
            <Link href={`/locations/${loc.id}`} className="text-sm font-medium" style={{color:'#e3601f'}}>Manage →</Link>
          </div>
        ))}
        {!locations?.length && (
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-12 text-center">
            <div className="text-3xl mb-3">📍</div>
            <p className="text-gray-500 text-sm mb-4">No locations yet. Add your first business location.</p>
            <Link href="/locations/new" className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{background:'#e3601f'}}>
              Add Location
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
