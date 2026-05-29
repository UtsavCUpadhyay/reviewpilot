export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
        <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
        <h2 className="text-xl font-semibold text-gray-900">Data We Collect</h2>
        <p>We collect your email address, business name, and Google Business Profile review data necessary to provide the ReviewPilot service. We never sell your data to third parties.</p>
        <h2 className="text-xl font-semibold text-gray-900">How We Use Your Data</h2>
        <p>Your data is used solely to power the ReviewPilot service: monitoring reviews, generating AI responses, and sending you reports and notifications.</p>
        <h2 className="text-xl font-semibold text-gray-900">Data Security</h2>
        <p>All data is encrypted at rest and in transit. Google OAuth tokens are stored encrypted. We use Supabase with row-level security.</p>
        <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
        <p>Questions? Email us at privacy@reviewpilot.co</p>
      </div>
    </div>
  )
}
