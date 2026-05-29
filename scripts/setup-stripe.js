// Run: STRIPE_SECRET_KEY=your_key node scripts/setup-stripe.js
const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

async function setup() {
  console.log('Creating Stripe products...\n')
  const plans = [
    { name: 'Starter', price: 9700, key: 'starter' },
    { name: 'Pro', price: 19700, key: 'pro' },
    { name: 'Agency', price: 39700, key: 'agency' },
  ]
  for (const plan of plans) {
    const product = await stripe.products.create({ name: `ReviewPilot ${plan.name}`, metadata: { plan: plan.key } })
    const price = await stripe.prices.create({ product: product.id, unit_amount: plan.price, currency: 'usd', recurring: { interval: 'month' }, metadata: { plan: plan.key } })
    console.log(`STRIPE_${plan.name.toUpperCase()}_PRICE_ID=${price.id}`)
  }
  console.log('\n✓ Add the above IDs to your Vercel environment variables')
}
setup().catch(console.error)
