export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <div className="space-y-6 text-gray-600">
        <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
        <p>By using ReviewPilot, you agree to these terms. ReviewPilot provides an AI-powered review management service for local businesses.</p>
        <h2 className="text-xl font-semibold text-gray-900">Service</h2>
        <p>ReviewPilot monitors your Google Business Profile reviews and generates AI responses. You are responsible for reviewing and approving responses before they are posted in manual mode.</p>
        <h2 className="text-xl font-semibold text-gray-900">Payment</h2>
        <p>Subscriptions are billed monthly. You may cancel at any time. Refunds are not provided for partial months.</p>
        <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
        <p>Questions? Email hello@reviewpilot.co</p>
      </div>
    </div>
  )
}
