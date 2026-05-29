function getResend() {
  const { Resend } = require('resend')
  return new Resend(process.env.RESEND_API_KEY || 'placeholder')
}

const FROM = process.env.EMAIL_FROM || 'ReviewPilot <hello@reviewpilot.co>'

export async function sendWelcomeEmail(email: string, name: string, plan: string) {
  return getResend().emails.send({
    from: FROM, to: email,
    subject: `You're in! Let's get your first review responded to 🎯`,
    html: `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 20px"><h1 style="color:#1a1a1a">Welcome, ${name}! 🎉</h1><p style="color:#555;line-height:1.7">Your <strong>${plan}</strong> account is ready with a 14-day free trial.</p><p style="color:#555;line-height:1.7">Connect your Google Business Profile to start monitoring reviews.</p><a href="${process.env.NEXT_PUBLIC_APP_URL}/onboarding" style="display:inline-block;background:#e3601f;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:16px">Connect Google Business →</a></div>`
  })
}

export async function sendNegativeReviewAlert(email: string, businessName: string, reviewerName: string, rating: number, content: string, reviewUrl: string) {
  const stars = '⭐'.repeat(rating)
  return getResend().emails.send({
    from: FROM, to: email,
    subject: `⚠️ New ${rating}-star review for ${businessName}`,
    html: `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 20px"><h2 style="color:#c0392b">⚠️ ${stars} Review — ${businessName}</h2><p style="color:#777">From: ${reviewerName}</p><blockquote style="border-left:3px solid #ddd;padding:12px 20px;background:#f9f9f9;color:#444">"${content}"</blockquote><p style="color:#555;margin-top:16px">An AI response has been drafted. Review and post it from your dashboard.</p><a href="${reviewUrl}" style="display:inline-block;background:#1a1a1a;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:16px">View & Respond →</a></div>`
  })
}

export async function sendMonthlyReport(email: string, businessName: string, stats: { totalReviews: number; avgRating: number; responsesPosted: number; responseRate: number; ratingChange: number; topReview: string }) {
  const month = new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
  return getResend().emails.send({
    from: FROM, to: email,
    subject: `${businessName} Review Report — ${month}`,
    html: `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 20px"><h1 style="color:#1a1a1a">${businessName}</h1><h2 style="color:#888;font-weight:normal">${month} Report</h2><div style="display:flex;gap:16px;margin:24px 0;flex-wrap:wrap"><div style="background:#f9f9f7;border-radius:10px;padding:20px;flex:1;min-width:120px"><div style="font-size:32px;font-weight:700">${stats.avgRating.toFixed(1)} ⭐</div><div style="color:#888;font-size:13px">Avg Rating</div></div><div style="background:#f9f9f7;border-radius:10px;padding:20px;flex:1;min-width:120px"><div style="font-size:32px;font-weight:700">${stats.responseRate}%</div><div style="color:#888;font-size:13px">Response Rate</div></div><div style="background:#f9f9f7;border-radius:10px;padding:20px;flex:1;min-width:120px"><div style="font-size:32px;font-weight:700">${stats.totalReviews}</div><div style="color:#888;font-size:13px">New Reviews</div></div></div>${stats.topReview ? `<blockquote style="border-left:3px solid #e3601f;padding:12px 20px;background:#fff8f5;color:#444;font-style:italic">"${stats.topReview}"</blockquote>` : ''}<a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display:inline-block;background:#e3601f;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:24px">View Dashboard →</a></div>`
  })
}

export async function sendTrialEndingEmail(email: string, name: string, daysLeft: number) {
  return getResend().emails.send({
    from: FROM, to: email,
    subject: `Your ReviewPilot trial ends in ${daysLeft} days`,
    html: `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 20px"><h1 style="color:#1a1a1a">Hey ${name}, ${daysLeft} days left on your trial</h1><p style="color:#555;line-height:1.7">Add a payment method to keep your reviews automatically responded to. Plans start at <strong>$97/month</strong>.</p><a href="${process.env.NEXT_PUBLIC_APP_URL}/billing" style="display:inline-block;background:#e3601f;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:16px">Upgrade Now →</a></div>`
  })
}

export async function sendPaymentFailedEmail(email: string, name: string) {
  return getResend().emails.send({
    from: FROM, to: email,
    subject: `Action needed: ReviewPilot payment failed`,
    html: `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 20px"><h1 style="color:#c0392b">Payment Failed</h1><p style="color:#555;line-height:1.7">Hey ${name}, we couldn't process your payment. Update your payment method to resume review automation.</p><a href="${process.env.NEXT_PUBLIC_APP_URL}/billing" style="display:inline-block;background:#c0392b;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:16px">Update Payment Method →</a></div>`
  })
}
