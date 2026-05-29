import Link from 'next/link'
import { Metadata } from 'next'
import { PLANS } from '@/lib/stripe'

export const metadata: Metadata = {
  title: 'ReviewPilot — AI Review Management. Every Review Answered.',
  description: 'Stop ignoring Google reviews. ReviewPilot monitors your reviews 24/7 and responds with AI that sounds genuinely human. Try free for 14 days.',
}

const TESTIMONIALS = [
  {
    quote: "We went from 40% response rate to 100% overnight. The AI responses are indistinguishable from ones I'd write myself.",
    name: "Marcus T.",
    role: "HVAC Owner, Phoenix",
    rating: 5,
    avatar: "MT",
  },
  {
    quote: "I used to spend 2 hours a week on review responses. Now it's zero. And our average rating went from 4.1 to 4.6.",
    name: "Dr. Sarah K.",
    role: "Dental Practice, Austin",
    rating: 5,
    avatar: "SK",
  },
  {
    quote: "The negative review handling is what sold me. It responds professionally before I even see the review.",
    name: "Ryan M.",
    role: "Roofing Company, Denver",
    rating: 5,
    avatar: "RM",
  },
]

const FAQS = [
  {
    q: "Does the AI actually sound human?",
    a: "Yes. We specifically train responses to avoid the robotic AI patterns. Each response references something specific from the review and uses natural language. Most of our customers say reviewers have complimented their responses.",
  },
  {
    q: "What if I don't like a response before it posts?",
    a: "You control this. You can set ReviewPilot to (a) auto-post all responses, (b) auto-post for 4-5 star reviews and queue negative ones for your review, or (c) queue all for manual approval. Completely up to you.",
  },
  {
    q: "Which review platforms do you support?",
    a: "Google Business Profile is fully supported (the most important one). Yelp and TripAdvisor integrations are in beta for Pro and Agency plans.",
  },
  {
    q: "How does the Google connection work?",
    a: "You connect via Google OAuth — the same way you'd sign in with Google on any app. We only request permission to read and respond to reviews. We never post anything on your behalf that you haven't configured.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, cancel anytime from your dashboard. No contracts, no cancellation fees. Your data is yours.",
  },
  {
    q: "Does ReviewPilot work for multi-location businesses?",
    a: "Absolutely. The Pro plan covers 3 locations, Agency covers 10. Each location has its own settings, tone, and response style.",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-body)' }}>
      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-black/5"
           style={{ background: 'rgba(255,255,255,0.92)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                 style={{ background: '#e3601f' }}>R</div>
            <span className="font-semibold text-gray-900 text-lg tracking-tight">ReviewPilot</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-gray-900 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Sign in
            </Link>
            <Link href="/signup"
              className="text-sm font-semibold text-white px-4 py-2 rounded-lg transition-all hover:opacity-90 active:scale-95"
              style={{ background: '#e3601f' }}>
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-6 text-center" style={{ background: 'linear-gradient(180deg, #fff8f5 0%, #ffffff 60%)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full mb-6 border"
               style={{ background: '#fff4ee', borderColor: '#fdd5bb', color: '#c44d0e' }}>
            <span className="animate-pulse-ring w-2 h-2 rounded-full inline-block" style={{ background: '#e3601f' }}></span>
            AI is responding to reviews right now for 200+ businesses
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6 tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}>
            Every review,
            <br />
            <span style={{ color: '#e3601f' }}>answered.</span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            ReviewPilot monitors your Google reviews 24/7 and responds with AI that sounds
            genuinely human — in your voice, your tone, your brand.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup"
              className="inline-flex items-center gap-2 text-base font-semibold text-white px-8 py-4 rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
              style={{ background: '#e3601f', boxShadow: '0 8px 30px rgba(227, 96, 31, 0.35)' }}>
              Start 14-Day Free Trial
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <p className="text-sm text-gray-400">No credit card required · Cancel anytime</p>
          </div>

          {/* Social proof strip */}
          <div className="mt-14 flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
            {[
              { stat: '100%', label: 'Response rate' },
              { stat: '4.8★', label: 'Avg rating improvement' },
              { stat: '2hrs', label: 'Saved per week' },
              { stat: '200+', label: 'Local businesses' },
            ].map(({ stat, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stat}</div>
                <div className="text-sm text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO / SCREENSHOT ────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100"
               style={{ background: '#1a1a1a' }}>
            {/* Fake browser chrome */}
            <div className="px-4 py-3 flex items-center gap-2 border-b border-white/10">
              <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }}></div>
              <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }}></div>
              <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }}></div>
              <div className="ml-4 flex-1 bg-white/10 rounded-md px-3 py-1 text-xs text-white/40">
                app.reviewpilot.co/reviews
              </div>
            </div>
            {/* Dashboard preview */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Stats */}
              <div className="md:col-span-3 grid grid-cols-3 gap-3">
                {[
                  { label: 'Avg Rating', value: '4.7 ⭐', change: '+0.3 this month' },
                  { label: 'Response Rate', value: '100%', change: 'vs 23% before' },
                  { label: 'Reviews This Month', value: '47', change: '12 negative — all handled' },
                ].map(({ label, value, change }) => (
                  <div key={label} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="text-xs text-white/40 mb-1">{label}</div>
                    <div className="text-xl font-bold text-white">{value}</div>
                    <div className="text-xs mt-1" style={{ color: '#e3601f' }}>{change}</div>
                  </div>
                ))}
              </div>
              {/* Sample reviews */}
              {[
                { name: 'Jennifer L.', rating: 5, text: 'Best HVAC company I\'ve used. Fast, professional, fair pricing.', response: 'Thank you so much, Jennifer! Fast and fair is exactly what we aim for — really appreciate you taking the time to share that.' },
                { name: 'Robert H.', rating: 2, text: 'Showed up 2 hours late with no call.', response: 'Robert, I sincerely apologize — that\'s not the standard we hold ourselves to. I\'d like to make this right. Please reach out directly at our number.' },
              ].map(({ name, rating, text, response }) => (
                <div key={name} className="md:col-span-3 lg:col-span-1 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                         style={{ background: '#e3601f', color: 'white' }}>
                      {name[0]}
                    </div>
                    <span className="text-white text-sm font-medium">{name}</span>
                    <span className="text-yellow-400 text-xs">{'★'.repeat(rating)}{'☆'.repeat(5-rating)}</span>
                  </div>
                  <p className="text-white/60 text-xs mb-3 leading-relaxed">{text}</p>
                  <div className="rounded-lg p-3" style={{ background: 'rgba(227,96,31,0.1)', borderLeft: '2px solid #e3601f' }}>
                    <div className="text-xs font-medium mb-1" style={{ color: '#e3601f' }}>AI Response — Posted automatically</div>
                    <p className="text-white/70 text-xs leading-relaxed">{response}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Everything on autopilot
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Set it up once. ReviewPilot handles everything else.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🤖',
                title: 'AI-Powered Responses',
                desc: 'Every review gets a thoughtful, human-sounding response tailored to the content. Not templates. Actual AI.',
              },
              {
                icon: '⚡',
                title: '24/7 Monitoring',
                desc: 'New reviews are detected within the hour. You\'ll never find out about a negative review three weeks late.',
              },
              {
                icon: '🎭',
                title: 'Your Voice, Your Tone',
                desc: 'Configure your business personality once. Every response sounds like you wrote it.',
              },
              {
                icon: '🚨',
                title: 'Instant Negative Alerts',
                desc: 'Get notified immediately when a 1-2 star review comes in. AI drafts a response and flags it for your review.',
              },
              {
                icon: '📬',
                title: 'Review Request Campaigns',
                desc: 'Send SMS or email requests to happy customers. Convert satisfied customers into 5-star reviews automatically.',
              },
              {
                icon: '📊',
                title: 'Monthly Reports',
                desc: 'Auto-generated reports show your rating trends, response rate, and top reviews. Sent to your inbox.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-14"
              style={{ fontFamily: 'var(--font-display)' }}>
            Local businesses love it
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ quote, name, role, avatar }) => (
              <div key={name} className="rounded-2xl p-6 border border-gray-100 bg-white">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" style={{ color: '#f59e0b' }} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-5 text-sm">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                       style={{ background: '#e3601f' }}>{avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{name}</div>
                    <div className="text-gray-400 text-xs">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────── */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Simple, predictable pricing
            </h2>
            <p className="text-gray-500 text-lg">14-day free trial on all plans. No credit card required to start.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(PLANS).map(([key, plan], index) => {
              const isPopular = key === 'pro'
              return (
                <div key={key}
                     className={`rounded-2xl p-8 border-2 relative transition-shadow hover:shadow-lg ${isPopular ? 'border-orange-500 shadow-lg' : 'border-gray-200 bg-white'}`}
                     style={isPopular ? { background: '#1a1a1a', borderColor: '#e3601f' } : {}}>
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="text-xs font-bold text-white px-3 py-1 rounded-full"
                            style={{ background: '#e3601f' }}>MOST POPULAR</span>
                    </div>
                  )}
                  <div className={`text-sm font-semibold mb-1 ${isPopular ? 'text-orange-400' : 'text-gray-500'}`}>
                    {plan.name}
                  </div>
                  <div className={`text-4xl font-bold mb-1 ${isPopular ? 'text-white' : 'text-gray-900'}`}>
                    ${plan.price}
                    <span className={`text-base font-normal ${isPopular ? 'text-white/50' : 'text-gray-400'}`}>/mo</span>
                  </div>
                  <div className={`text-sm mb-6 ${isPopular ? 'text-white/50' : 'text-gray-400'}`}>
                    Up to {plan.locations} location{plan.locations > 1 ? 's' : ''}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className={`flex items-start gap-2 text-sm ${isPopular ? 'text-white/80' : 'text-gray-600'}`}>
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#e3601f' }} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/signup?plan=${key}`}
                    className="block text-center py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
                    style={isPopular
                      ? { background: '#e3601f', color: 'white' }
                      : { background: '#f5f5f3', color: '#1a1a1a' }}>
                    Start Free Trial
                  </Link>
                </div>
              )
            })}
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            Need something custom? <a href="mailto:hello@reviewpilot.co" className="underline hover:text-gray-600">Contact us</a>
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-14"
              style={{ fontFamily: 'var(--font-display)' }}>
            Common questions
          </h2>
          <div className="space-y-6">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="border-b border-gray-100 pb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="py-20 px-6 text-center" style={{ background: '#1a1a1a' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Your reviews can't wait.
          </h2>
          <p className="text-white/50 text-lg mb-10">
            Every unanswered review is a lost customer. Start your free trial and have AI
            responding to reviews within the next 10 minutes.
          </p>
          <Link href="/signup"
            className="inline-flex items-center gap-2 text-base font-semibold text-white px-8 py-4 rounded-xl transition-all hover:opacity-90"
            style={{ background: '#e3601f', boxShadow: '0 8px 30px rgba(227, 96, 31, 0.4)' }}>
            Start Free Trial — No Card Required
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="py-10 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
                 style={{ background: '#e3601f' }}>R</div>
            <span className="font-semibold text-gray-700">ReviewPilot</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms</Link>
            <a href="mailto:hello@reviewpilot.co" className="hover:text-gray-600 transition-colors">Contact</a>
          </div>
          <p className="text-gray-400 text-sm">© 2025 ReviewPilot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
