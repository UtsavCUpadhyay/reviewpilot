import { NextResponse } from 'next/server'
import { getOAuthUrl } from '@/lib/google/business'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId') || ''
  const locationId = searchParams.get('locationId') || undefined
  const url = getOAuthUrl(userId, locationId)
  return NextResponse.json({ url })
}
