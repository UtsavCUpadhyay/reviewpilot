// @ts-nocheck
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function NewLocationPage() {
  const [name, setName] = useState('')
  const [bizType, setBizType] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: loc } = await supabase.from('locations').insert({ user_id: user.id, name, business_type: bizType }).select().single()
    if (loc) {
      await supabase.from('response_settings').insert({ location_id: loc.id, business_name: name, business_type: bizType })
    }
    router.push('/locations')
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Location</h1>
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              placeholder="Acme Services"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
            <select value={bizType} onChange={e=>setBizType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm bg-white">
              <option value="">Select...</option>
              {['HVAC','Plumbing','Dental','Medical Spa','Roofing','Restaurant','Retail','Legal','Auto Repair','Other'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={!name || loading}
            className="w-full py-3 rounded-xl text-white font-medium text-sm disabled:opacity-50"
            style={{background:'#e3601f'}}>
            {loading ? 'Creating...' : 'Create Location'}
          </button>
        </form>
      </div>
    </div>
  )
}
