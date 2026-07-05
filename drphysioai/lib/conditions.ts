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

/**
 * Recommended home-exercise program per condition — a curated list of slugs
 * from lib/exercises. Rendered on each condition page and links into the
 * exercise library.
 */
export const conditionExercises: Record<string, string[]> = {
  "back-pain": ["pelvic-tilt", "cat-cow-stretch", "bird-dog", "glute-bridge", "dead-bug"],
  "neck-pain": ["chin-tucks", "neck-side-stretch", "wall-angels", "thoracic-extension"],
  "knee-pain": ["quad-sets", "straight-leg-raise", "glute-bridge", "standing-calf-raise"],
  "sciatica": ["piriformis-stretch", "sciatic-nerve-glide", "pelvic-tilt", "hamstring-stretch", "glute-bridge"],
  "frozen-shoulder": ["pendulum-swings", "towel-shoulder-stretch", "wall-finger-walk"],
  "sports-injury": ["hamstring-stretch", "glute-bridge", "side-plank", "clamshell", "ankle-mobility"],
  "post-surgery-rehab": ["quad-sets", "straight-leg-raise", "glute-bridge", "ankle-mobility"],
  "neuro-elderly-care": ["standing-calf-raise", "glute-bridge", "clamshell", "ankle-mobility"],
  "arthritis": ["quad-sets", "straight-leg-raise", "glute-bridge", "clamshell"],
  "plantar-fasciitis": ["calf-stretch", "plantar-fascia-roll", "standing-calf-raise", "ankle-mobility"],
  "cervical-spondylosis": ["chin-tucks", "neck-side-stretch", "wall-angels", "thoracic-extension"],
  "tennis-elbow": ["wrist-flexor-extensor-stretch"],
  "carpal-tunnel": ["wrist-flexor-extensor-stretch"],
};

/** Condition-specific FAQs — rendered on each page with FAQPage JSON-LD. */
export const conditionFaqs: Record<string, { q: string; a: string }[]> = {
  "back-pain": [
    { q: "How long does back pain take to get better?", a: "Most everyday (mechanical) back pain improves within 2–6 weeks with the right movement and posture care. Pain lasting longer, or spreading down the leg, should be assessed by a physiotherapist." },
    { q: "Should I rest or stay active with back pain?", a: "Staying gently active helps most back pain more than bed rest. Short walks and the right exercises keep the spine healthy — avoid only what sharply worsens the pain." },
    { q: "Can online physiotherapy really help back pain?", a: "Yes. For most back pain, a video assessment plus a personalised home-exercise plan and posture coaching is very effective — no clinic visit needed." },
  ],
  "neck-pain": [
    { q: "Why does my neck hurt from my phone and laptop?", a: "Looking down for hours loads the neck muscles — often called 'tech neck'. Raising your screen, taking breaks, and doing chin-tucks and stretches usually settles it." },
    { q: "Are neck cracks or clicks dangerous?", a: "Painless clicking is usually harmless. But if you have persistent pain, headaches, or tingling into the arms, get assessed by a physiotherapist." },
    { q: "What's the fastest way to relieve neck stiffness?", a: "Gentle range-of-motion, heat, chin-tucks and upper-back mobility give the quickest relief, alongside better screen and desk posture." },
  ],
  "knee-pain": [
    { q: "Do I need surgery for knee pain?", a: "Most knee pain — including early arthritis — improves with strengthening and does not need surgery. Building the muscles around the knee is one of the most effective treatments." },
    { q: "Is it safe to exercise with knee pain?", a: "Usually yes. Mild discomfort during exercise that settles within a day is fine. A physiotherapist can grade the exercises so you strengthen safely." },
    { q: "What exercises are best for knee pain?", a: "Quad sets, straight-leg raises and glute bridges are safe starting points because they strengthen the knee without heavy joint loading." },
  ],
  "sciatica": [
    { q: "How do I know if it's sciatica?", a: "Sciatica is pain that travels from the lower back or buttock down one leg, often with tingling or numbness. A physiotherapist can confirm the cause." },
    { q: "What makes sciatica worse?", a: "Prolonged sitting, and coughing or sneezing, often aggravate sciatica. Gentle movement and nerve glides usually help more than rest." },
    { q: "When is sciatica an emergency?", a: "Seek urgent care if you develop leg weakness, or any change in bladder or bowel control — these are rare but serious warning signs." },
  ],
  "frozen-shoulder": [
    { q: "How long does frozen shoulder last?", a: "Frozen shoulder moves through freezing, frozen and thawing stages and can take 12–18 months to fully settle — physiotherapy speeds up recovery and reduces stiffness." },
    { q: "Should I push through the pain to loosen it?", a: "No. Gentle, frequent stretching to a comfortable range works better than forcing it. Aggressive stretching in the painful stage can flare it up." },
    { q: "What helps a frozen shoulder at home?", a: "Pendulum swings, towel stretches and wall finger-walks — done little and often, with heat beforehand — restore movement over time." },
  ],
  "sports-injury": [
    { q: "Should I use ice or heat on a new injury?", a: "For a fresh injury, relative rest, gentle movement and ice for comfort are sensible early on. A physiotherapist will guide when to progress to loading and heat." },
    { q: "How soon can I return to sport?", a: "Return depends on the injury and how it responds to progressive loading — rushing back is the main cause of re-injury. A staged plan gets you back safely." },
    { q: "Can physiotherapy prevent future injuries?", a: "Yes — strength, mobility and movement-technique work significantly reduce the risk of the injury coming back." },
  ],
  "post-surgery-rehab": [
    { q: "When should I start physiotherapy after surgery?", a: "It depends on the operation, but guided rehab often begins within days to weeks. Following a protocol matched to your surgery is key to a safe recovery." },
    { q: "Can I do rehab at home after surgery?", a: "Much post-surgical rehab can be done at home with a physiotherapist guiding you over video and progressing the exercises safely at each stage." },
    { q: "What if an exercise hurts after surgery?", a: "Some discomfort is expected, but sharp or increasing pain is a signal to ease off and check in with your physiotherapist." },
  ],
  "neuro-elderly-care": [
    { q: "Can physiotherapy help after a stroke?", a: "Yes. The brain keeps rewiring for months and years, and regular task-focused physiotherapy helps rebuild strength, balance and independence." },
    { q: "How can we prevent falls in older adults?", a: "Balance training, leg strengthening and home-safety advice substantially reduce falls. A physiotherapist can assess and build a tailored program." },
    { q: "Is physiotherapy safe for elderly patients?", a: "Absolutely — programs are gentle, paced and matched to the person's ability, with caregiver guidance where helpful." },
  ],
  "arthritis": [
    { q: "Will exercise damage my arthritic joints?", a: "No — appropriate exercise protects joints and reduces pain. Movement nourishes cartilage; the key is the right type and dose, which a physiotherapist can set." },
    { q: "What's the best exercise for arthritis?", a: "Low-impact strengthening (quad sets, bridges) plus gentle activity like walking, cycling or pool work protects joints while keeping you fit." },
    { q: "Can I reduce arthritis pain without medication?", a: "Many people reduce pain through strengthening, movement, weight management and pacing — often alongside, and sometimes instead of, medication." },
  ],
  "plantar-fasciitis": [
    { q: "Why is heel pain worst in the morning?", a: "The plantar fascia tightens overnight, so the first steps stretch it suddenly. Gentle calf and foot stretches before getting up make mornings easier." },
    { q: "How long does plantar fasciitis take to heal?", a: "With consistent stretching and load management, most cases improve within a few weeks to a few months." },
    { q: "Do I need special shoes for plantar fasciitis?", a: "Supportive footwear helps, and avoiding barefoot walking on hard floors. A physiotherapist can advise on footwear and any inserts." },
  ],
  "cervical-spondylosis": [
    { q: "Is cervical spondylosis serious?", a: "It's a common age-related change and usually manageable with exercise and posture care. Seek assessment if you get arm weakness, numbness or clumsiness." },
    { q: "What exercises help cervical spondylosis?", a: "Chin-tucks, gentle neck rotations, and shoulder-blade and upper-back strengthening keep the neck mobile and supported." },
    { q: "Can neck pain from spondylosis be cured?", a: "The changes don't reverse, but symptoms can be well-controlled — most people stay comfortable with the right routine and habits." },
  ],
  "tennis-elbow": [
    { q: "How long does tennis elbow take to recover?", a: "Tendon problems are slow to settle — often several weeks to a few months. A progressive strengthening program is the most reliable path." },
    { q: "Should I rest my elbow completely?", a: "Complete rest rarely fixes tennis elbow. Modifying aggravating activities while doing graded strengthening works far better." },
    { q: "Do I need a brace for tennis elbow?", a: "A strap can ease symptoms during activity, but it's an aid, not a cure — the strengthening program is what resolves it." },
  ],
  "carpal-tunnel": [
    { q: "Can carpal tunnel go away without surgery?", a: "Many mild-to-moderate cases improve with nerve-gliding exercises, night splinting and workstation changes, avoiding surgery." },
    { q: "Why is carpal tunnel worse at night?", a: "Wrist positions during sleep can compress the nerve, so symptoms often wake you. A neutral wrist splint at night usually helps." },
    { q: "What exercises help carpal tunnel?", a: "Nerve-gliding and tendon-gliding movements, plus wrist and forearm stretches, can ease symptoms — a physiotherapist will show the correct technique." },
  ],
};
