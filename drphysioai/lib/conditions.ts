/**
 * Condition landing pages — the SEO/organic-traffic engine.
 * Each condition gets its own page (/conditions/<slug>) targeting how Indians
 * search ("back pain physiotherapy", "sciatica treatment at home").
 */

export interface Condition {
  slug: string;
  name: string;
  emoji: string;
  /** Short SEO-friendly tagline. */
  tagline: string;
  overview: string;
  symptoms: string[];
  causes: string[];
  howWeHelp: string[];
  /** Matches a consultationServices title for the booking CTA. */
  service: string;
  price: number;
}

export const conditions: Condition[] = [
  {
    slug: "back-pain",
    name: "Back Pain",
    emoji: "🦴",
    tagline: "Online physiotherapy for back pain — relief without leaving home.",
    overview:
      "Back pain is one of the most common reasons Indians visit a physiotherapist — from desk-job stiffness to disc issues. Most cases improve dramatically with the right movement, posture correction and a guided home program, no surgery needed.",
    symptoms: [
      "Dull or sharp pain in the lower or upper back",
      "Stiffness, especially in the morning",
      "Pain that worsens with sitting or bending",
      "Radiating pain into the hips or legs",
      "Difficulty standing straight after sitting",
    ],
    causes: [
      "Long hours sitting with poor posture",
      "Weak core and back muscles",
      "Lifting heavy weights incorrectly",
      "Disc bulge, sciatica or age-related changes",
    ],
    howWeHelp: [
      "A licensed physiotherapist assesses your posture and movement over video",
      "A personalised home-exercise program that adapts as you improve",
      "Posture and ergonomics coaching for your desk and daily habits",
      "Progress tracking with check-ins on WhatsApp",
    ],
    service: "Pain Management",
    price: 599,
  },
  {
    slug: "neck-pain",
    name: "Neck & Shoulder Pain",
    emoji: "💆",
    tagline: "Tech-neck and shoulder pain relief with guided physiotherapy.",
    overview:
      "Hours on phones and laptops have made neck and shoulder pain an epidemic. Targeted mobility work, strengthening and posture resets relieve tension and prevent it from coming back.",
    symptoms: [
      "Stiff, achy neck and shoulders",
      "Headaches starting from the neck",
      "Pain when turning the head",
      "Tingling into the arms or hands",
      "Tightness after screen time",
    ],
    causes: [
      "Looking down at phones/laptops (tech-neck)",
      "Poor workstation setup",
      "Stress-related muscle tension",
      "Weak upper-back muscles",
    ],
    howWeHelp: [
      "Physio-led assessment of your neck and posture",
      "Decompression and mobility routines you can do at a desk",
      "Strengthening for the upper back and shoulders",
      "Ergonomic fixes tailored to your workspace",
    ],
    service: "Pain Management",
    price: 599,
  },
  {
    slug: "knee-pain",
    name: "Knee & Joint Pain",
    emoji: "🦵",
    tagline: "Knee pain and arthritis care — move without the ache.",
    overview:
      "Knee pain — from overuse, injury or arthritis — responds very well to physiotherapy. Strengthening the right muscles and improving movement takes load off the joint and keeps you active.",
    symptoms: [
      "Pain going up or down stairs",
      "Swelling or stiffness in the knee",
      "Grinding or clicking sensations",
      "Pain after standing or walking",
      "Knee giving way or feeling unstable",
    ],
    causes: [
      "Osteoarthritis and age-related wear",
      "Weak thigh (quadriceps) muscles",
      "Sports or overuse injuries",
      "Excess body weight loading the joint",
    ],
    howWeHelp: [
      "Assessment to find the real cause of your knee pain",
      "Arthritis-friendly strengthening that protects the joint",
      "A safe, progressive home program",
      "Guidance on activity, footwear and weight management",
    ],
    service: "Pain Management",
    price: 599,
  },
  {
    slug: "sciatica",
    name: "Sciatica",
    emoji: "⚡",
    tagline: "Sciatica relief with physiotherapist-guided exercises.",
    overview:
      "Sciatica — pain radiating from the lower back down the leg — is often frightening but highly treatable. Specific nerve-mobilising and strengthening exercises usually settle it without surgery.",
    symptoms: [
      "Sharp or burning pain down one leg",
      "Tingling or numbness in the leg or foot",
      "Pain that worsens when sitting",
      "Weakness in the leg",
      "Lower-back pain with leg symptoms",
    ],
    causes: [
      "Disc bulge pressing on the sciatic nerve",
      "Tight or spasming muscles (piriformis)",
      "Prolonged sitting",
      "Poor lifting technique",
    ],
    howWeHelp: [
      "Careful physio assessment to confirm sciatica",
      "Nerve-gliding and directional exercises for relief",
      "Core and glute strengthening to prevent recurrence",
      "Clear red-flag guidance on when to see a doctor",
    ],
    service: "Pain Management",
    price: 599,
  },
  {
    slug: "frozen-shoulder",
    name: "Frozen Shoulder",
    emoji: "🧊",
    tagline: "Restore shoulder movement with structured physiotherapy.",
    overview:
      "Frozen shoulder causes stiffness and pain that can last months. A structured, staged physiotherapy program restores range of motion and gets you back to daily activities.",
    symptoms: [
      "Gradual loss of shoulder movement",
      "Pain reaching overhead or behind the back",
      "Difficulty dressing or sleeping on the side",
      "Stiffness that worsens over weeks",
      "Aching deep in the shoulder",
    ],
    causes: [
      "Idiopathic (often no clear cause)",
      "After injury or immobilisation",
      "Diabetes (higher risk)",
      "Thyroid conditions",
    ],
    howWeHelp: [
      "Stage-appropriate mobility and stretching",
      "Pain-managed progression so you don't flare up",
      "Strengthening as movement returns",
      "Home routines you can do daily",
    ],
    service: "Post-Surgical Rehab",
    price: 799,
  },
  {
    slug: "sports-injury",
    name: "Sports Injury",
    emoji: "🏃",
    tagline: "Return to play stronger and safer with sports physiotherapy.",
    overview:
      "From sprains and strains to ligament injuries, sports physiotherapy helps you recover fully and reduce the risk of re-injury — with a return-to-play plan built around your sport.",
    symptoms: [
      "Pain or swelling after activity",
      "Reduced strength or range of motion",
      "Instability in a joint",
      "Recurring niggles that won't settle",
      "Difficulty returning to your sport",
    ],
    causes: [
      "Sprains, strains and ligament tears",
      "Overtraining without recovery",
      "Poor technique or warm-up",
      "Muscle imbalances",
    ],
    howWeHelp: [
      "Injury assessment and staged rehab",
      "Sport-specific strengthening and agility work",
      "A clear return-to-play timeline",
      "Prehab to prevent the injury coming back",
    ],
    service: "Sports Injury Rehab",
    price: 799,
  },
  {
    slug: "post-surgery-rehab",
    name: "Post-Surgical Rehab",
    emoji: "🩹",
    tagline: "Guided recovery after surgery, step by step, from home.",
    overview:
      "Recovery after surgery — knee, hip, spine or shoulder — is faster and safer with structured physiotherapy. We guide each stage so you regain strength and movement with confidence.",
    symptoms: [
      "Stiffness and weakness after an operation",
      "Uncertainty about which exercises are safe",
      "Difficulty walking or moving normally",
      "Swelling around the surgical area",
      "Fear of doing too much or too little",
    ],
    causes: [
      "Knee/hip replacement",
      "Ligament (ACL) reconstruction",
      "Spine surgery",
      "Shoulder or other orthopaedic surgery",
    ],
    howWeHelp: [
      "Protocol-based rehab matched to your surgery",
      "Safe, staged progression supervised by a physio",
      "Home exercises with video guidance",
      "Regular check-ins so you never feel lost",
    ],
    service: "Post-Surgical Rehab",
    price: 799,
  },
  {
    slug: "neuro-elderly-care",
    name: "Neuro & Elderly Care",
    emoji: "🧠",
    tagline: "Gentle, expert physiotherapy for neuro conditions and seniors.",
    overview:
      "Stroke recovery, Parkinson's, balance problems and general elderly care benefit hugely from patient, expert physiotherapy — improving strength, balance and independence at home.",
    symptoms: [
      "Weakness on one side of the body",
      "Balance problems or falls",
      "Difficulty walking or with coordination",
      "Stiffness and reduced mobility",
      "Loss of confidence in daily activities",
    ],
    causes: [
      "Stroke or neurological conditions",
      "Parkinson's disease",
      "Age-related muscle loss",
      "Post-illness deconditioning",
    ],
    howWeHelp: [
      "Gentle, senior-friendly assessment and plans",
      "Balance and falls-prevention training",
      "Strength and mobility for independence",
      "Large-font, easy tools and caregiver guidance",
    ],
    service: "Neuro & Elderly Care",
    price: 699,
  },
];

export function getCondition(slug: string): Condition | undefined {
  return conditions.find((c) => c.slug === slug);
}
