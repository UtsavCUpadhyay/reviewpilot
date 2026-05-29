// lib/google/business.ts
// Google Business Profile API integration

const GOOGLE_OAUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GMB_API_BASE = 'https://mybusiness.googleapis.com/v4'
const REVIEWS_API_BASE = 'https://mybusinessreviews.googleapis.com/v1'

export function getOAuthUrl(userId: string, locationId?: string): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
    response_type: 'code',
    scope: [
      'https://www.googleapis.com/auth/business.manage',
    ].join(' '),
    access_type: 'offline',
    prompt: 'consent',
    state: JSON.stringify({ userId, locationId }),
  })
  return `${GOOGLE_OAUTH_URL}?${params.toString()}`
}

export async function exchangeCodeForTokens(code: string) {
  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: 'authorization_code',
    }),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Token exchange failed: ${error}`)
  }

  return res.json() as Promise<{
    access_token: string
    refresh_token: string
    expires_in: number
    token_type: string
  }>
}

export async function refreshAccessToken(refreshToken: string) {
  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      grant_type: 'refresh_token',
    }),
  })

  if (!res.ok) throw new Error('Failed to refresh access token')

  return res.json() as Promise<{
    access_token: string
    expires_in: number
  }>
}

export async function getAccessToken(location: {
  google_access_token: string | null
  google_refresh_token: string | null
  google_token_expires_at: string | null
}): Promise<string> {
  const expiresAt = location.google_token_expires_at
    ? new Date(location.google_token_expires_at)
    : new Date(0)

  // Refresh if expiring within 5 minutes
  if (new Date() >= new Date(expiresAt.getTime() - 5 * 60 * 1000)) {
    if (!location.google_refresh_token) {
      throw new Error('No refresh token available')
    }
    const tokens = await refreshAccessToken(location.google_refresh_token)
    return tokens.access_token
  }

  return location.google_access_token!
}

export async function getBusinessAccounts(accessToken: string) {
  const res = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error('Failed to fetch accounts')
  return res.json() as Promise<{ accounts: Array<{ name: string; accountName: string }> }>
}

export async function getLocations(accessToken: string, accountId: string) {
  const res = await fetch(
    `https://mybusinessbusinessinformation.googleapis.com/v1/${accountId}/locations?readMask=name,title,categories,storefrontAddress,websiteUri,regularHours,phoneNumbers`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )
  if (!res.ok) throw new Error('Failed to fetch locations')
  return res.json() as Promise<{ locations: Array<{ name: string; title: string }> }>
}

export interface GoogleReview {
  name: string
  reviewer: {
    profilePhotoUrl?: string
    displayName?: string
    isAnonymous?: boolean
  }
  starRating: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'
  comment?: string
  createTime: string
  updateTime: string
  reviewReply?: {
    comment: string
    updateTime: string
  }
}

const STAR_TO_NUMBER: Record<string, number> = {
  ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5,
}

export function starRatingToNumber(star: string): number {
  return STAR_TO_NUMBER[star] || 0
}

export async function fetchReviews(
  accessToken: string,
  locationName: string,
  pageToken?: string
): Promise<{ reviews: GoogleReview[]; nextPageToken?: string; totalReviewCount?: number }> {
  const params = new URLSearchParams({
    pageSize: '50',
    orderBy: 'updateTime desc',
  })
  if (pageToken) params.set('pageToken', pageToken)

  const res = await fetch(
    `${REVIEWS_API_BASE}/${locationName}/reviews?${params}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Failed to fetch reviews: ${err}`)
  }

  return res.json()
}

export async function postReviewReply(
  accessToken: string,
  reviewName: string,
  replyText: string
): Promise<void> {
  const res = await fetch(`${REVIEWS_API_BASE}/${reviewName}/reply`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comment: replyText }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Failed to post reply: ${err}`)
  }
}

export async function deleteReviewReply(accessToken: string, reviewName: string): Promise<void> {
  const res = await fetch(`${REVIEWS_API_BASE}/${reviewName}/reply`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error('Failed to delete reply')
}
