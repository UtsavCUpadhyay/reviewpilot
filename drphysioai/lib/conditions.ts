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
  {
    slug: "arthritis",
    name: "Arthritis & Joint Pain",
    emoji: "🦿",
    tagline: "Stay active and pain-free with physiotherapy for arthritis.",
    overview:
      "Arthritis — most commonly osteoarthritis of the knees, hips and hands — is a leading cause of pain and stiffness with age. Research is clear: the right strengthening and gentle daily movement reduce pain and keep joints working, often as effectively as medication.",
    symptoms: [
      "Joint pain and stiffness, worse in the morning or after rest",
      "Swelling or a grinding sensation in the joint",
      "Reduced range of movement",
      "Difficulty with stairs, squatting or gripping",
      "Pain that eases with gentle activity",
    ],
    causes: [
      "Age-related wear of joint cartilage (osteoarthritis)",
      "Previous joint injury or overuse",
      "Excess load on weight-bearing joints",
      "Inflammatory conditions such as rheumatoid arthritis",
    ],
    howWeHelp: [
      "A physiotherapist grades your exercises so you build strength safely",
      "Low-impact routines that protect the joint while improving fitness",
      "Weight-management and activity coaching to reduce joint load",
      "Flare-up strategies with warmth, pacing and gentle mobility",
    ],
    service: "Exercise Prescription",
    price: 699,
  },
  {
    slug: "plantar-fasciitis",
    name: "Plantar Fasciitis (Heel Pain)",
    emoji: "🦶",
    tagline: "End that first-step morning heel pain with guided care.",
    overview:
      "Plantar fasciitis is the most common cause of heel pain — an irritation of the tissue along the sole of the foot. It responds very well to a simple, consistent stretching and strengthening routine, with most people improving within a few weeks.",
    symptoms: [
      "Sharp heel pain with the first steps in the morning",
      "Pain that eases with movement but returns after rest",
      "Tenderness under the heel or along the arch",
      "Discomfort after long standing or walking",
    ],
    causes: [
      "Tight calves and stiff ankles",
      "Long hours standing on hard surfaces",
      "Unsupportive footwear or sudden increase in activity",
      "Foot mechanics such as flat or high arches",
    ],
    howWeHelp: [
      "A physiotherapist checks your foot and ankle mechanics",
      "Targeted calf and plantar-fascia stretching program",
      "Strengthening for the foot and lower leg",
      "Footwear and load-management advice to stop it returning",
    ],
    service: "Pain Management",
    price: 599,
  },
  {
    slug: "cervical-spondylosis",
    name: "Cervical Spondylosis",
    emoji: "🦴",
    tagline: "Manage age-related neck pain and stiffness from home.",
    overview:
      "Cervical spondylosis is age-related wear in the neck's joints and discs — very common after 50. With gentle exercise, posture care and the right guidance, most people keep it well-managed and stay comfortable.",
    symptoms: [
      "Neck stiffness, especially in the morning",
      "Headaches starting at the base of the skull",
      "Grinding or clicking when turning the head",
      "Occasional pins-and-needles into the arms",
    ],
    causes: [
      "Age-related changes in the cervical spine",
      "Years of forward-head 'tech neck' posture",
      "Weak deep neck and upper-back muscles",
      "Previous neck strain or injury",
    ],
    howWeHelp: [
      "A physiotherapist builds a safe, progressive neck routine",
      "Posture and workstation coaching to reduce strain",
      "Strengthening for the deep neck and shoulder-blade muscles",
      "Guidance on warning signs that need further assessment",
    ],
    service: "Pain Management",
    price: 599,
  },
  {
    slug: "tennis-elbow",
    name: "Tennis & Golfer's Elbow",
    emoji: "💪",
    tagline: "Relieve stubborn elbow pain with loading-based physiotherapy.",
    overview:
      "Tennis elbow (outer) and golfer's elbow (inner) are overuse injuries of the forearm tendons — and you don't need to play either sport to get them. Gradual, guided strengthening is the most effective treatment.",
    symptoms: [
      "Pain on the outer or inner side of the elbow",
      "Weak, painful grip",
      "Discomfort when lifting, twisting or typing",
      "Tenderness over the bony part of the elbow",
    ],
    causes: [
      "Repetitive gripping, typing or lifting",
      "Sudden increase in a new activity",
      "Weak forearm and shoulder muscles",
      "Poor technique in sport or work tasks",
    ],
    howWeHelp: [
      "A physiotherapist confirms the cause and rules out other issues",
      "A progressive tendon-loading program that actually resolves it",
      "Activity and grip modifications to calm the pain",
      "Return-to-work and return-to-sport guidance",
    ],
    service: "Pain Management",
    price: 599,
  },
  {
    slug: "carpal-tunnel",
    name: "Carpal Tunnel Syndrome",
    emoji: "🖐️",
    tagline: "Ease wrist and hand tingling with conservative physiotherapy.",
    overview:
      "Carpal tunnel syndrome is compression of a nerve at the wrist, causing tingling and weakness in the hand. Many mild-to-moderate cases improve with nerve-gliding exercises, splinting and workstation changes — before surgery is ever needed.",
    symptoms: [
      "Tingling or numbness in the thumb, index and middle fingers",
      "Symptoms that wake you at night",
      "Weak grip or dropping objects",
      "Discomfort after typing or phone use",
    ],
    causes: [
      "Repetitive wrist and hand use",
      "Sustained awkward wrist positions",
      "Fluid retention (e.g. in pregnancy)",
      "Wrist injury or arthritis",
    ],
    howWeHelp: [
      "A physiotherapist assesses your symptoms and severity",
      "Nerve-gliding and tendon-gliding exercise programs",
      "Splinting and ergonomic advice for work and sleep",
      "Guidance on when a specialist referral is worthwhile",
    ],
    service: "Pain Management",
    price: 599,
  },
];

export function getCondition(slug: string): Condition | undefined {
  return conditions.find((c) => c.slug === slug);
}
