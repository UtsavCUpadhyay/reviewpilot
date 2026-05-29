// @ts-nocheck
'use client'
export default function BillingPortalButton() {
  async function openPortal() {
    const res = await fetch('/api/billing/portal', { method: 'POST' })
    const { url } = await res.json()
    if (url) window.location.href = url
  }
  return (
    <button onClick={openPortal} className="text-sm font-medium px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
      Manage Subscription →
    </button>
  )
}
