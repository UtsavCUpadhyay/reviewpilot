// @ts-nocheck
'use client'
export const dynamic = 'force-dynamic'
import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function SignupForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'pro'
  const supabase = createClient()

  async function handleSignup(e) {
    e.preventDefault()
    setLoading(true); setError('')
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: name } }
    })
    if (error) { setError(error.message); setLoading(false); return }
    if (data.user) {
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan, userId: data.user.id, email })
        })
        const { url } = await res.json()
        if (url) window.location.href = url
        else router.push('/onboarding')
      } catch { router.push('/onboarding') }
    }
  }

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      {error && <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg">{error}</div>}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input type="text" value={name} onChange={e=>setName(e.target.value)} required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
          placeholder="John Smith"/>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
          placeholder="you@company.com"/>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={8}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
          placeholder="Min. 8 characters"/>
      </div>
      <button type="submit" disabled={loading}
        className="w-full py-3 rounded-xl font-semibold text-white text-sm disabled:opacity-60"
        style={{background:'#e3601f'}}>
        {loading ? 'Creating account...' : 'Create Free Account →'}
      </button>
    </form>
  )
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{background:'#fafaf8'}}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{background:'#e3601f'}}>R</div>
            <span className="font-semibold text-lg">ReviewPilot</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Start your free trial</h1>
          <p className="text-gray-500 text-sm mt-1">14 days free · No credit card required</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100 rounded-xl"/>}>
            <SignupForm />
          </Suspense>
          <p className="text-center text-xs text-gray-400 mt-4">By signing up, you agree to our Terms & Privacy Policy</p>
          <p className="text-center text-sm text-gray-500 mt-3">
            Already have an account? <Link href="/login" className="font-medium" style={{color:'#e3601f'}}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
