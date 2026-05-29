import Anthropic from '@anthropic-ai/sdk'
import type { ResponseSettings } from './supabase/types'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

interface GenerateResponseParams {
  rating: number
  reviewContent: string | null
  reviewerName: string | null
  locationName: string
  settings: ResponseSettings | null
}

export async function generateReviewResponse(params: GenerateResponseParams): Promise<string> {
  const { rating, reviewContent, reviewerName, locationName, settings } = params

  const businessName = settings?.business_name || locationName
  const businessType = settings?.business_type || 'local business'
  const ownerName = settings?.owner_name
  const tone = 'professional and warm'
  const maxLength = settings?.max_response_length || 200
  const includeReviewerName = settings?.include_reviewer_name ?? true
  const customInstructions = settings?.custom_instructions || ''

  const sentiment = rating >= 4 ? 'positive' : rating === 3 ? 'neutral' : 'negative'
  const reviewerDisplay = includeReviewerName && reviewerName ? reviewerName : null

  const systemPrompt = `You write authentic, human Google Business review responses for ${businessName}, a ${businessType}.

CRITICAL RULES:
- Sound genuinely human, NOT like AI or corporate speak
- Keep response under ${maxLength} characters  
- Each response must be UNIQUE — never copy-paste or sound templated
- For NEGATIVE reviews: acknowledge the specific issue, apologize sincerely, invite offline resolution. Never be defensive. Never discount publicly.
- For POSITIVE reviews: reference something SPECIFIC from their review (not just "glad you enjoyed it"). Feel genuine.
- For NEUTRAL reviews: acknowledge, address any concern, invite them back
- If no review text: respond warmly to the star rating
- End with a subtle invitation to return (not "we hope to see you again!" — be creative)
${ownerName ? `- Sign off naturally as ${ownerName}` : '- Do not add a signature'}
${customInstructions ? `\nOWNER INSTRUCTIONS:\n${customInstructions}` : ''}

NEVER:
- Start with "Thank you for your review" (too generic)
- Use emojis
- Mention competitors
- Offer discounts or free things in the reply
- Sound defensive or make excuses`

  // Use custom templates if they exist
  let templateHint = ''
  if (sentiment === 'positive' && settings?.positive_template) {
    templateHint = `\nUse this as inspiration (adapt, don't copy): "${settings.positive_template}"`
  } else if (sentiment === 'negative' && settings?.negative_template) {
    templateHint = `\nUse this as inspiration (adapt, don't copy): "${settings.negative_template}"`
  } else if (sentiment === 'neutral' && settings?.neutral_template) {
    templateHint = `\nUse this as inspiration (adapt, don't copy): "${settings.neutral_template}"`
  }

  const userMessage = `Write a response to this ${rating}-star Google review.

Reviewer: ${reviewerDisplay || 'A customer'}
Review text: ${reviewContent ? `"${reviewContent}"` : '(No written review, just a star rating)'}
${templateHint}

Return ONLY the response text. Nothing else. No labels, no quotation marks around the full response.`

  const message = await anthropic.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 300,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  })

  return (message.content[0] as { type: 'text'; text: string }).text.trim()
}

export async function generateBulkResponses(
  reviews: Array<{
    id: string
    rating: number
    content: string | null
    reviewer_name: string | null
  }>,
  locationName: string,
  settings: ResponseSettings | null
): Promise<Map<string, string>> {
  const results = new Map<string, string>()

  // Process in batches of 5 to respect rate limits
  const batchSize = 5
  for (let i = 0; i < reviews.length; i += batchSize) {
    const batch = reviews.slice(i, i + batchSize)
    await Promise.all(
      batch.map(async (review) => {
        try {
          const response = await generateReviewResponse({
            rating: review.rating,
            reviewContent: review.content,
            reviewerName: review.reviewer_name,
            locationName,
            settings,
          })
          results.set(review.id, response)
        } catch (error) {
          console.error(`Failed to generate response for review ${review.id}:`, error)
        }
      })
    )
    // Small delay between batches
    if (i + batchSize < reviews.length) {
      await new Promise(r => setTimeout(r, 1000))
    }
  }

  return results
}

export function detectSentiment(rating: number, content: string | null): 'positive' | 'neutral' | 'negative' {
  if (rating >= 4) return 'positive'
  if (rating === 3) return 'neutral'
  return 'negative'
}
