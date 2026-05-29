import { NextResponse } from 'next/server'
import { exchangeCodeForTokens, getBusinessAccounts, getLocations } from '@/lib/google/business'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!

  if (!code || !state) return NextResponse.redirect(`${appUrl}/locations?error=oauth_failed`)

  let userId: string
  try {
    const parsed = JSON.parse(state)
    userId = parsed.userId
  } catch { return NextResponse.redirect(`${appUrl}/locations?error=invalid_state`) }

  try {
    const tokens = await exchangeCodeForTokens(code)
    const accounts = await getBusinessAccounts(tokens.access_token)
    const account = accounts.accounts?.[0]
    if (!account) return NextResponse.redirect(`${appUrl}/locations?error=no_account`)

    const locs = await getLocations(tokens.access_token, account.name)
    const googleLoc = locs.locations?.[0]
    if (!googleLoc) return NextResponse.redirect(`${appUrl}/locations?error=no_location`)

    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString()
    const supabase = createServiceClient()
    const { data: existingLoc } = await supabase.from('locations').select('id').eq('user_id', userId).order('created_at').limit(1).single()

    if (existingLoc) {
      await supabase.from('locations').update({
        google_account_id: account.name.split('/')[1],
        google_location_id: googleLoc.name.split('/')[1],
        google_access_token: tokens.access_token,
        google_refresh_token: tokens.refresh_token,
        google_token_expires_at: expiresAt,
        google_connected: true,
      }).eq('id', existingLoc.id)
    }
    await supabase.from('profiles').update({ onboarding_completed: true }).eq('id', userId)
    return NextResponse.redirect(`${appUrl}/dashboard?connected=1`)
  } catch (err: any) {
    console.error('Google OAuth error:', err)
    return NextResponse.redirect(`${appUrl}/locations?error=oauth_error`)
  }
}
