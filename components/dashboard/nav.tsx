// @ts-nocheck
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/supabase/types'

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/reviews', label: 'Reviews', icon: '⭐' },
  { href: '/locations', label: 'Locations', icon: '📍' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
  { href: '/billing', label: 'Billing', icon: '💳' },
]

export default function DashboardNav({ profile }: { profile: Profile | null }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <aside className="fixed top-0 left-0 h-full w-64 border-r border-gray-200 flex flex-col" style={{background:'#ffffff'}}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{background:'#e3601f'}}>R</div>
          <span className="font-semibold text-gray-900">ReviewPilot</span>
        </div>
        {profile && (
          <div className="mt-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{background:'#1a1a1a'}}>
              {profile.full_name?.[0] || profile.email[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">{profile.full_name || profile.email}</div>
              <div className="text-xs capitalize font-medium" style={{color:'#e3601f'}}>{profile.plan} plan</div>
            </div>
          </div>
        )}
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {NAV.map(({ href, label, icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              style={active ? {background:'#e3601f'} : {}}>
              <span>{icon}</span>{label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-gray-100">
        <button onClick={signOut} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50">
          <span>🚪</span> Sign Out
        </button>
      </div>
    </aside>
  )
}
