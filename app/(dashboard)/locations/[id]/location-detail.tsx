// @ts-nocheck
'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LocationDetail({ location }) {
  const supabase = createClient()
  const settings = location.response_settings || {}
  const [autoRespond, setAutoRespond] = useState(location.auto_respond)
  const [tone, setTone] = useState(location.response_tone || 'professional')
  const [ownerName, setOwnerName] = useState(settings.owner_name || '')
  const [customInstructions, setCustomInstructions] = useState(settings.custom_instructions || '')
  const [threshold, setThreshold] = useState(location.auto_respond_threshold || 3)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [connecting, setConnecting] = useState(false)

  async function save() {
    setSaving(true)
    await (supabase as any).from('locations').update({ auto_respond: autoRespond, response_tone: tone, auto_respond_threshold: threshold }).eq('id', location.id)
    const base = { owner_name: ownerName, custom_instructions: customInstructions }
    if (settings.id) {
      await (supabase as any).from('response_settings').update(base).eq('id', settings.id)
    } else {
      await (supabase as any).from('response_settings').insert({ location_id: location.id, ...base })
    }
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  async function connectGoogle() {
    setConnecting(true)
    const { data: { user } } = await supabase.auth.getUser()
    const res = await fetch(`/api/auth/google/connect?userId=${user.id}&locationId=${location.id}`)
    const { url } = await res.json()
    window.location.href = url
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{location.name}</h1>
        <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${location.google_connected ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
          {location.google_connected ? '✓ Google Connected' : '⚠ Not Connected'}
        </span>
      </div>

      {!location.google_connected && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div>
            <div className="font-medium text-orange-900 text-sm">Connect Google Business Profile</div>
            <div className="text-orange-700 text-xs mt-0.5">Required to monitor reviews</div>
          </div>
          <button onClick={connectGoogle} disabled={connecting}
            className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{background:'#e3601f'}}>
            {connecting ? 'Redirecting...' : 'Connect →'}
          </button>
        </div>
      )}

      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-semibold text-gray-900">Auto-Respond</div>
              <div className="text-gray-500 text-sm">AI posts responses automatically</div>
            </div>
            <button onClick={() => setAutoRespond(!autoRespond)}
              className={`relative w-12 h-6 rounded-full transition-colors ${autoRespond ? 'bg-orange-500' : 'bg-gray-200'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${autoRespond ? 'translate-x-7' : 'translate-x-1'}`}/>
            </button>
          </div>
          {autoRespond && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Auto-respond for reviews rated ≥</label>
              <select value={threshold} onChange={e => setThreshold(Number(e.target.value))}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none">
                <option value={1}>1★ (all reviews)</option>
                <option value={2}>2★ and above</option>
                <option value={3}>3★ and above (recommended)</option>
                <option value={4}>4★ and above</option>
                <option value={5}>5★ only</option>
              </select>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Response Style</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
              <select value={tone} onChange={e => setTone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white">
                <option value="professional">Professional & Warm</option>
                <option value="friendly">Friendly & Casual</option>
                <option value="formal">Formal</option>
                <option value="casual">Very Casual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sign responses as</label>
              <input value={ownerName} onChange={e => setOwnerName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your name (optional)"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Custom AI instructions</label>
              <textarea value={customInstructions} onChange={e => setCustomInstructions(e.target.value)} rows={3}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="E.g. Always mention our 24/7 service. We specialize in residential HVAC in Phoenix."/>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 mb-3">Performance</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'Avg Rating', value: location.avg_rating ? location.avg_rating.toFixed(1) + ' ⭐' : '—' },
              { label: 'Total Reviews', value: location.total_reviews || 0 },
              { label: 'Response Rate', value: location.total_reviews > 0 ? Math.round((location.total_responded / location.total_reviews) * 100) + '%' : '—' },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-xl font-bold text-gray-900">{value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={save} disabled={saving}
          className="w-full py-3 rounded-xl text-white font-semibold text-sm"
          style={{background:'#e3601f', opacity: saving ? 0.6 : 1}}>
          {saved ? '✓ Saved!' : saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}
