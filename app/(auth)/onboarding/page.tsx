'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [businessName, setBusinessName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient() as any

  async function saveBusinessInfo() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: loc } = await supabase.from('locations').insert({
      user_id: user.id, name: businessName, business_type: businessType
    }).select().single()
    if (loc) {
      await supabase.from('response_settings').insert({
        location_id: loc.id, business_name: businessName,
        business_type: businessType, owner_name: ownerName
      })
    }
    setLoading(false)
    setStep(1)
  }

  async function connectGoogle() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const res = await fetch(`/api/auth/google/connect?userId=${user.id}`)
    const { url } = await res.json()
    window.location.href = url
  }

  async function skipGoogle() {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) await supabase.from('profiles').update({ onboarding_completed: true }).eq('id', user.id)
    router.push('/dashboard')
  }

  const steps = ['Business Info', 'Connect Google', 'Done']
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{background:'#fafaf8'}}>
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{background:'#e3601f'}}>R</div>
            <span className="font-semibold text-lg">ReviewPilot</span>
          </div>
          <div className="flex justify-center items-center gap-2 mb-6">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i <= step ? 'text-white' : 'bg-gray-100 text-gray-400'}`}
                     style={i <= step ? {background:'#e3601f'} : {}}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`text-sm ${i === step ? 'font-medium text-gray-900' : 'text-gray-400'}`}>{s}</span>
                {i < steps.length - 1 && <div className="w-6 h-px bg-gray-200 mx-1"/>}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Tell us about your business</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input value={businessName} onChange={e=>setBusinessName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    placeholder="Acme HVAC Services"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                  <select value={businessType} onChange={e=>setBusinessType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm bg-white">
                    <option value="">Select type...</option>
                    {['HVAC','Plumbing','Dental','Medical Spa','Roofing','Restaurant','Retail','Legal','Accounting','Auto Repair','Other'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name (for response sign-offs)</label>
                  <input value={ownerName} onChange={e=>setOwnerName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    placeholder="John Smith"/>
                </div>
                <button onClick={saveBusinessInfo} disabled={!businessName || loading}
                  className="w-full py-3 rounded-xl font-semibold text-white text-sm disabled:opacity-50"
                  style={{background:'#e3601f'}}>
                  {loading ? 'Saving...' : 'Continue →'}
                </button>
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="text-center">
              <div className="text-5xl mb-4">🔗</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Connect Google Business</h2>
              <p className="text-gray-500 text-sm mb-8">Connect your Google Business Profile to start monitoring and auto-responding to reviews.</p>
              <button onClick={connectGoogle}
                className="w-full py-3 rounded-xl font-semibold text-white text-sm mb-3"
                style={{background:'#e3601f'}}>
                Connect Google Business →
              </button>
              <button onClick={skipGoogle} className="w-full py-3 rounded-xl font-medium text-gray-500 text-sm bg-gray-50">
                Skip for now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
