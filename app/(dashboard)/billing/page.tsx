// @ts-nocheck
import { createClient } from '@/lib/supabase/server'
import { PLANS } from '@/lib/stripe'
import Link from 'next/link'
import BillingPortalButton from './billing-portal-button'

export default async function BillingPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()
  const currentPlan = PLANS[profile?.plan as keyof typeof PLANS]

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Billing</h1>
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 mb-1">Current Plan</div>
            <div className="text-xl font-bold capitalize" style={{color:'#e3601f'}}>{profile?.plan || 'Trial'}</div>
            <div className="text-sm text-gray-500 mt-1 capitalize">{profile?.subscription_status}</div>
          </div>
          {currentPlan && <div className="text-2xl font-bold text-gray-900">${currentPlan.price}<span className="text-sm font-normal text-gray-400">/mo</span></div>}
        </div>
        {profile?.trial_ends_at && profile.subscription_status === 'trialing' && (
          <div className="mt-4 p-3 rounded-lg text-sm" style={{background:'#fff8f5', color:'#c44d0e'}}>
            Trial ends {new Date(profile.trial_ends_at).toLocaleDateString()}
          </div>
        )}
        {profile?.stripe_customer_id && (
          <div className="mt-4">
            <BillingPortalButton />
          </div>
        )}
      </div>
      <h2 className="font-semibold text-gray-900 mb-4">Upgrade Plan</h2>
      <div className="grid gap-4">
        {Object.entries(PLANS).map(([key, plan]) => (
          <div key={key} className={`bg-white rounded-xl border-2 p-5 flex items-center justify-between ${profile?.plan === key ? 'border-orange-500' : 'border-gray-100'}`}>
            <div>
              <div className="font-semibold text-gray-900">{plan.name} — ${plan.price}/mo</div>
              <div className="text-sm text-gray-500">{plan.locations} location{plan.locations>1?'s':''}</div>
            </div>
            {profile?.plan === key
              ? <span className="text-sm font-medium px-3 py-1 rounded-full" style={{background:'#fff4ee',color:'#e3601f'}}>Current</span>
              : <Link href={`/api/checkout?plan=${key}`} className="text-sm font-medium px-4 py-2 rounded-lg text-white" style={{background:'#e3601f'}}>
                  Upgrade
                </Link>
            }
          </div>
        ))}
      </div>
    </div>
  )
}
